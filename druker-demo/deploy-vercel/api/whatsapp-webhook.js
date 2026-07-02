// /api/whatsapp-webhook.js
// Recibe mensajes entrantes de WhatsApp y responde con Druker IA.

import crypto    from 'crypto';
import Anthropic from '@anthropic-ai/sdk';

const WA_PHONE_NUMBER_ID = process.env.WA_PHONE_NUMBER_ID;
const WA_ACCESS_TOKEN    = process.env.WA_ACCESS_TOKEN;
const VERIFY_TOKEN       = process.env.WA_WEBHOOK_VERIFY_TOKEN || 'druker-wa-hook';
const APP_SECRET         = process.env.WA_APP_SECRET || '';
const AT_TOKEN           = process.env.AIRTABLE_TOKEN;
const AT_BASE            = process.env.AIRTABLE_BASE;
const AT_HDR             = { Authorization: 'Bearer ' + AT_TOKEN, 'Content-Type': 'application/json' };

const client  = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const WA_URL  = `https://graph.facebook.com/v20.0/${WA_PHONE_NUMBER_ID}/messages`;

const WA_SYSTEM = `Eres DRUKER en WhatsApp. Mismo asesor, canal diferente.

## REGLAS DE CANAL
- Respuestas cortas: máximo 3 párrafos, idealmente 1-2.
- Sin markdown complejo. Usa *negrita* solo para énfasis clave.
- No uses listas con viñetas — escribe en prosa directa.
- Si el tema necesita análisis profundo, documentos o ver métricas: "Para esto es mejor que entremos a operatia.co/chat — ahí tienes todo el contexto."
- Para decisiones rápidas, check-ins y sesgos del momento: respondes aquí directamente.

## QUIÉN ERES
Asesor de confianza. Directo, sin rodeos. Conoces al gerente por su nombre y sus patrones.
No eres un bot — no dices "¡Claro!", "Por supuesto" ni frases de asistente.
Si algo no cuadra, lo dices: "Espera — eso no cierra."

## DETECCIÓN DE DECISIONES
Si el gerente describe una decisión real, al final de tu respuesta agrega exactamente esta línea:
[DECISION: titulo en máx 8 palabras | categoria: Financiera/Operativa/Estratégica/RRHH/Comercial]
Si no hay decisión clara, no agregues esa línea.`;

// ── AIRTABLE HELPERS ─────────────────────────────────────────
async function atGet(path) {
  const r = await fetch(`https://api.airtable.com/v0/${AT_BASE}/${path}`, { headers: AT_HDR });
  return r.json();
}
async function atPost(table, fields) {
  const r = await fetch(`https://api.airtable.com/v0/${AT_BASE}/${table}`, {
    method: 'POST', headers: AT_HDR, body: JSON.stringify({ fields, typecast: true })
  });
  return r.json();
}

// ── BUSCAR CLIENTE POR CELULAR ───────────────────────────────
async function buscarClientePorCelular(numero) {
  const num    = String(numero).replace(/\D/g, '');
  const num57  = num.startsWith('57') ? num : '57' + num;
  const numSin = num.startsWith('57') ? num.slice(2) : num;
  const f = encodeURIComponent(
    `OR({Celular}="${num}",{Celular}="${num57}",{Celular}="${numSin}",{Celular}="+${num57}")`
  );
  const d = await atGet(`Clientes?filterByFormula=${f}&maxRecords=1` +
    `&fields[]=ClienteId&fields[]=EmpresaId&fields[]=NombreGerente&fields[]=Nombre` +
    `&fields[]=Estado&fields[]=Email&fields[]=FechaTrialInicio`);
  return d.records?.[0] || null;
}

// ── CARGAR PERFIL GERENTE ────────────────────────────────────
async function cargarPerfil(clienteId) {
  const f = encodeURIComponent(`{ClienteId}="${clienteId}"`);
  const d = await atGet(`PerfilGerente?filterByFormula=${f}&maxRecords=1` +
    `&fields[]=EstiloDecisional&fields[]=PerfilDecisional&fields[]=PatronesObservados&fields[]=MapaCognitivo`);
  return d.records?.[0]?.fields || {};
}

// ── CARGAR HISTORIAL WA ──────────────────────────────────────
async function cargarHistorialWA(clienteId, limite = 6) {
  const f = encodeURIComponent(`AND({ClienteId}="${clienteId}",{Canal}="WhatsApp")`);
  const d = await atGet(`Conversaciones?filterByFormula=${f}&maxRecords=${limite}` +
    `&sort[0][field]=Fecha&sort[0][direction]=desc&fields[]=Mensajes&fields[]=Fecha`);
  const recs = (d.records || []).reverse();
  const msgs = [];
  for (const rec of recs) {
    try { msgs.push(...JSON.parse(rec.fields.Mensajes || '[]')); } catch(_) {}
  }
  return msgs.slice(-10);
}

// ── GUARDAR CONVERSACIÓN WA ──────────────────────────────────
async function guardarConversacionWA(clienteId, mensajes) {
  await atPost('Conversaciones', {
    ClienteId: clienteId,
    Canal:     'WhatsApp',
    Fecha:     new Date().toISOString(),
    Mensajes:  JSON.stringify(mensajes)
  });
}

// ── GUARDAR DECISIÓN DETECTADA ───────────────────────────────
async function guardarDecision(clienteId, titulo, categoria) {
  await atPost('tblOkNbeF0bvk4Lln', {
    ClienteId:         clienteId,
    Titulo:            titulo,
    CategoriaDecision: categoria,
    Fecha:             new Date().toISOString().slice(0, 10),
    Canal:             'WhatsApp',
    Estado:            'En proceso'
  });
}

// ── ENVIAR MENSAJE WA ─────────────────────────────────────────
async function enviarMensajeWA(to, text) {
  const chunks = [];
  for (let i = 0; i < text.length; i += 4000) chunks.push(text.slice(i, i + 4000));
  for (const chunk of chunks) {
    await fetch(WA_URL, {
      method:  'POST',
      headers: { Authorization: `Bearer ${WA_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: chunk, preview_url: false }
      })
    });
  }
}

// ── PARSEAR RESPUESTA DE CLAUDE ──────────────────────────────
function parsearRespuesta(texto) {
  const decMatch = texto.match(/\[DECISION:\s*([^|]+)\|\s*categoria:\s*([^\]]+)\]/i);
  const textoLimpio = texto.replace(/\[DECISION:[^\]]+\]/gi, '').trim();
  return {
    texto:    textoLimpio,
    decision: decMatch ? { titulo: decMatch[1].trim(), categoria: decMatch[2].trim() } : null
  };
}

// ── CONSTRUIR SYSTEM PROMPT CON PERFIL ───────────────────────
function buildSystem(cliente, perfil) {
  const fields  = cliente.fields || {};
  const nombre  = fields.NombreGerente || 'el gerente';
  const empresa = fields.Nombre || '';
  let sys = WA_SYSTEM;
  sys += `\n\n## PERFIL DEL GERENTE\nNombre: ${nombre}\nEmpresa: ${empresa}\nArquetipo: ${perfil.EstiloDecisional || 'No definido'}`;
  if (perfil.PerfilDecisional)   sys += `\n\nPerfil decisional:\n${perfil.PerfilDecisional.slice(0, 800)}`;
  if (perfil.PatronesObservados) sys += `\n\nPatrones observados:\n${perfil.PatronesObservados.slice(0, 800)}`;
  if (perfil.MapaCognitivo)      sys += `\n\nMapa cognitivo:\n${perfil.MapaCognitivo.slice(0, 600)}`;
  return sys;
}

// ── HANDLER PRINCIPAL ────────────────────────────────────────
export default async function handler(req, res) {

  // GET: verificación del webhook
  if (req.method === 'GET') {
    const mode      = req.query['hub.mode'];
    const token     = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('[WA webhook] Verificado ✓');
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  if (req.method !== 'POST') return res.status(405).end();

  try {
    const body  = req.body;
    const entry  = body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value  = change?.value;

    const msg = value?.messages?.[0];
    if (!msg || msg.type !== 'text') return res.status(200).json({ ok: true });

    const from = msg.from;
    const text = msg.text?.body?.trim();
    if (!text) return res.status(200).json({ ok: true });

    console.log(`[WA webhook] Mensaje de ${from}: ${text.slice(0, 80)}`);

    // ── Buscar cliente ────────────────────────────────────
    const clienteRecord = await buscarClientePorCelular(from);
    if (!clienteRecord || !clienteRecord.fields) {
      await enviarMensajeWA(from,
        'No encontré tu cuenta en Druker IA. Regístrate en operatia.co/onboarding o escríbenos a contacto@jvstratica.com');
      return res.status(200).json({ ok: true });
    }

    const fields    = clienteRecord.fields;
    const estado    = fields.Estado;
    const clienteId = fields.ClienteId;

    // Verificar acceso activo
    if (estado === 'Inactivo') {
      await enviarMensajeWA(from, 'Tu cuenta está inactiva. Escríbenos a contacto@jvstratica.com para reactivarla.');
      return res.status(200).json({ ok: true });
    }
    if (estado === 'Trial' && fields.FechaTrialInicio) {
      const dias = Math.floor((Date.now() - new Date(fields.FechaTrialInicio + 'T00:00:00')) / 86400000);
      if (dias >= 30) {
        await enviarMensajeWA(from, 'Tu período de prueba terminó. Activa tu suscripción en operatia.co/inicio');
        return res.status(200).json({ ok: true });
      }
    }

    const primerNombre = (fields.NombreGerente || 'Gerente').split(' ')[0];

    // ── Cargar perfil e historial en paralelo ─────────────
    const [perfil, historial] = await Promise.all([
      cargarPerfil(clienteId),
      cargarHistorialWA(clienteId)
    ]);

    // ── Construir mensajes para Claude ────────────────────
    const messages = [
      ...historial,
      { role: 'user', content: text }
    ];

    // ── Llamar a Claude ───────────────────────────────────
    const systemPrompt = buildSystem(clienteRecord, perfil);
    const response = await client.messages.create(
      {
        model:      'claude-sonnet-4-5',
        max_tokens: 600,
        system:     [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
        messages
      },
      { headers: { 'anthropic-beta': 'prompt-caching-2024-07-31' } }
    );

    const rawRespuesta = response.content[0]?.text || 'No pude procesar tu mensaje. Intenta de nuevo.';
    const { texto: respuesta, decision } = parsearRespuesta(rawRespuesta);

    // ── Enviar respuesta ──────────────────────────────────
    await enviarMensajeWA(from, respuesta);

    // ── Guardar conversación y decisión en paralelo ───────
    const nuevosMensajes = [
      { role: 'user',      content: text      },
      { role: 'assistant', content: respuesta }
    ];
    await Promise.all([
      guardarConversacionWA(clienteId, nuevosMensajes),
      decision ? guardarDecision(clienteId, decision.titulo, decision.categoria) : Promise.resolve()
    ]);

    console.log(`[WA webhook] Respuesta enviada a ${primerNombre} (${from})`);

  } catch(e) {
    console.error('[WA webhook] Error:', e.message);
  }

  return res.status(200).json({ ok: true });
}
