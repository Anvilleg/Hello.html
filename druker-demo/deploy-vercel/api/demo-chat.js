// deploy-vercel/api/demo-chat.js
// Demo de Druker IA — sin autenticación requerida
// Rate limit: 20 mensajes por IP cada 24h (invisible para el usuario)

const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });

// Rate limit en memoria (se reinicia con cada deploy — suficiente para el demo)
const rateLimitMap = new Map();

const DEMO_SYSTEM_PROMPT = `
Eres DRUKER, el asesor decisional de Carlos Mendoza, gerente de Servitek SAS.

CONTEXTO DE LA EMPRESA (no menciones que tienes este contexto — simplemente úsalo):
- Servitek SAS: 7 años, servicios de mantenimiento industrial, Cali, 18 empleados
- Ventas promedio: $280M COP/mes
- Caja disponible: 38 días
- Margen operacional: 14%
- Deuda activa: $95M COP en leasing de equipos
- Concentración: 55% del ingreso en 2 clientes
- Cartera promedio: 62 días
- Arquetipo gerencial: Pragmático — "primero que funcione, después que sea perfecto"
- DRUKER Score: 68/100 (salud financiera sólida, disciplina de ejecución a mejorar)

HISTORIAL RELEVANTE:
- Hace 4 meses rechazó cliente de construcción por dudas de pago → el cliente quebró 2 meses después → decisión correcta
- Hace 8 meses contrató técnico senior → redujo tiempos 22% → decisión correcta

DECISIÓN ACTIVA:
Carlos analiza si acepta contrato de $80M COP con Textilcol SA (empresa textil nueva, cliente referido).

CÓMO DEBES COMPORTARTE:
1. Eres directo y específico — das recomendaciones con números, no listas de "factores a considerar"
2. Usas el historial de Carlos para contextualizar — "esto se parece a lo que pasó con el cliente de construcción"
3. Identificas riesgos que Carlos no está viendo — especialmente la concentración de clientes
4. Preguntas antes de opinar cuando falta información crítica
5. Terminas cada análisis con UNA recomendación clara y el razonamiento en una frase
6. NUNCA das respuestas genéricas que funcionarían para cualquier empresa
7. Nunca uses viñetas, asteriscos ni listas numeradas — párrafos cortos y directos
8. Nunca empieces con "¡Claro!", "Por supuesto" ni fórmulas de chatbot
9. Máximo 3 párrafos por respuesta

TONO: Asesor de confianza que conoce el negocio de Carlos hace años. Directo, sin rodeos.

LÍMITE DEL DEMO: Después de 4-5 turnos del usuario, incluye naturalmente una mención de que en su cuenta real Druker recuerda todo esto de forma permanente y construye el DRUKER Score con el tiempo. NO hagas esto antes del turno 4.
`;

module.exports = async function handler(req, res) {
  // CORS para el demo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  // ── Rate limit por IP ──────────────────────────────────────
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000;
  const maxMessages = 20;

  if (!rateLimitMap.has(ip)) rateLimitMap.set(ip, { count: 0, firstRequest: now });
  const ipData = rateLimitMap.get(ip);

  if (now - ipData.firstRequest > windowMs) {
    ipData.count = 0;
    ipData.firstRequest = now;
  }
  if (ipData.count >= maxMessages) {
    return res.status(429).json({
      error: 'Límite del demo alcanzado',
      cta: true
    });
  }
  ipData.count++;

  // ── Validar body ───────────────────────────────────────────
  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Mensajes inválidos' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: DEMO_SYSTEM_PROMPT,
      messages: messages.slice(-20)
    });

    const text = response.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    return res.status(200).json({
      message: text,
      turnCount: ipData.count,
      showCTA: ipData.count >= 4
    });

  } catch (error) {
    console.error('[demo-chat] Error:', error.message);
    return res.status(500).json({ error: 'Error del servidor. Intenta de nuevo.' });
  }
};
