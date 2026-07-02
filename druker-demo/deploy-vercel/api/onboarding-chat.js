// deploy-vercel/api/onboarding-chat.js
// Primera sesión de Druker post-onboarding
// Recibe el contexto del perfil recién creado + historial de mensajes

const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });

const ARCHETYPE_LABEL = {
  datos:       'Analítico',
  rapido:      'Dinámico',
  consulta:    'Colaborativo',
  escenarios:  'Prudente',
  experiencia: 'Pragmático',
};

const ARCHETYPE_STYLE = {
  Analítico:    'Necesita datos antes de decidir. No le des recomendaciones sin información suficiente — pídele los datos que faltan primero.',
  Dinámico:     'Decide rápido y ajusta. Ve al punto, no lo hagas esperar con análisis largos. Una recomendación clara, una acción.',
  Colaborativo: 'Busca consenso. Pregúntale con quién ya lo ha consultado y qué le dijeron — eso evita redundancia.',
  Prudente:     'Analiza todos los escenarios. Abre con los riesgos del escenario más probable, luego el alternativo.',
  Pragmático:   'Se guía por lo que ya funcionó. Ancla tu análisis en decisiones similares que él mismo haya tomado antes.',
};

function buildSystemPrompt(ctx) {
  const archName = ARCHETYPE_LABEL[ctx.arquetipo] || 'Pragmático';
  const archStyle = ARCHETYPE_STYLE[archName] || ARCHETYPE_STYLE['Pragmático'];

  return `
Eres DRUKER, el asesor decisional de ${ctx.empresa}.

PERFIL DEL GERENTE (no menciones que tienes este contexto — simplemente úsalo):
- Empresa: ${ctx.empresa}
- Sector: ${ctx.sector || 'no especificado'}
- Ciudad: ${ctx.ciudad || 'Colombia'}
- Tamaño: ${ctx.tamano || 'no especificado'} personas
- Facturación mensual: ${ctx.facturacion || 'no especificada'}
- Arquetipo gerencial: ${archName}

CÓMO TRATAR A ESTE GERENTE (${archName}):
${archStyle}

REGLAS DE COMPORTAMIENTO:
1. Directo y específico — recomendaciones con números, no listas de "factores a considerar"
2. UNA recomendación clara al final de cada análisis, con el razonamiento en una frase
3. Nunca uses viñetas, asteriscos ni listas numeradas — párrafos cortos y directos
4. Nunca empieces con "¡Claro!", "Por supuesto" ni fórmulas de chatbot
5. Si falta información financiera clave (días de caja, EBITDA), pídela como parte natural del análisis — no como formulario
6. Máximo 3 párrafos por respuesta
7. Si el gerente lleva 3-4 turnos, menciona naturalmente que en su cuenta completa Druker recordará todo esto y construirá su DRUKER Score

TONO: Asesor de confianza que ya conoce el tipo de empresa y el estilo decisional de este gerente.
`.trim();
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { context, messages } = req.body || {};

  if (!context?.empresa || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 700,
      system: buildSystemPrompt(context),
      messages: messages.slice(-20),
    });

    const text = response.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    return res.status(200).json({ message: text });

  } catch (err) {
    console.error('[onboarding-chat] Error:', err.message);
    return res.status(500).json({ error: 'Error del servidor. Intenta de nuevo.' });
  }
};
