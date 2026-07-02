// pages/api/demo-chat.js
import Anthropic from '@anthropic-ai/sdk';
import { getDemoSystemPrompt } from '../../lib/demo-context';

const client = new Anthropic();

// Rate limiting en memoria: máx 20 mensajes por IP en 24h
// Para producción con múltiples instancias, reemplazar con Redis/Upstash
const rateLimitMap = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // ── Rate limit por IP ──────────────────────────────────────
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000;
  const maxMessages = parseInt(process.env.DEMO_RATE_LIMIT_MSGS || '20');

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 0, firstRequest: now });
  }
  const ipData = rateLimitMap.get(ip);
  if (now - ipData.firstRequest > windowMs) {
    ipData.count = 0;
    ipData.firstRequest = now;
  }
  if (ipData.count >= maxMessages) {
    return res.status(429).json({
      error: 'Límite del demo alcanzado',
      message: 'Crea tu cuenta gratis para continuar sin límites',
      cta: '/onboarding',
    });
  }
  ipData.count++;

  // ── Validar body ───────────────────────────────────────────
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Mensajes inválidos' });
  }

  // Máximo 20 turnos en el historial para controlar tokens
  const trimmedMessages = messages.slice(-20);

  // ── Llamada a Anthropic ────────────────────────────────────
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: parseInt(process.env.DEMO_MAX_TOKENS || '800'),
      system: getDemoSystemPrompt(),
      messages: trimmedMessages,
    });

    const text = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');

    return res.status(200).json({
      message: text,
      turnCount: ipData.count,
      showCTA: ipData.count >= 4,
    });
  } catch (error) {
    console.error('[demo-chat] Error:', error);
    return res.status(500).json({ error: 'Error del servidor. Intenta de nuevo.' });
  }
}
