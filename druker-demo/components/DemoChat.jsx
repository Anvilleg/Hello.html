// components/DemoChat.jsx
import { useState, useRef, useEffect } from 'react';
import DemoCTA from './DemoCTA';

// Turnos 1 y 2 son ESTÁTICOS — no cuestan tokens
const INITIAL_MESSAGES = [
  {
    role: 'user',
    content: `Druker, necesito pensar contigo algo que me tiene con la cabeza dando vueltas. Me llegó un cliente grande — Textilcol SA, empresa textil de Cali. Me están ofreciendo un contrato de mantenimiento por $80 millones de pesos. Nunca hemos tenido un contrato tan grande. No sé si aceptar o si nos va a quebrar la operación.`,
  },
  {
    role: 'assistant',
    content: `Carlos, entiendo el nudo. $80 millones es casi el 29% de tu facturación mensual promedio en un solo contrato — eso cambia la estructura de riesgo de Servitek de forma significativa, para bien o para mal.

Antes de darte una recomendación, necesito hacerte tres preguntas que determinan todo lo demás:

Primero, ¿cuánto tiempo tienes para decidir? ¿Textilcol te presiona con una fecha? Segundo, ¿el contrato es por proyecto único o es recurrente mensual? Y tercero, ¿tienes alguna referencia de Textilcol — cómo pagan, cómo tratan a sus proveedores?

Con eso, puedo darte una respuesta que puedas llevar a una reunión de junta.`,
  },
];

const S = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  bubbleWrap: (role) => ({
    display: 'flex',
    justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
    gap: '10px',
    alignItems: 'flex-start',
  }),
  avatar: (role) => ({
    width: '32px',
    height: '32px',
    borderRadius: role === 'assistant' ? '6px' : '50%',
    background: role === 'assistant' ? '#2d9b8a' : 'rgba(255,255,255,0.10)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, sans-serif',
    fontSize: role === 'assistant' ? '13px' : '12px',
    fontWeight: '700',
    color: '#FFFFFF',
    flexShrink: 0,
    order: role === 'user' ? 1 : 0,
  }),
  bubble: (role) => ({
    maxWidth: role === 'assistant' ? '680px' : '560px',
    padding: '14px 18px',
    borderRadius: role === 'assistant'
      ? '0 10px 10px 10px'
      : '10px 0 10px 10px',
    background: role === 'assistant' ? '#132430' : '#1a2f3c',
    borderLeft: role === 'assistant' ? '3px solid #2d9b8a' : 'none',
    borderRight: role === 'user' ? '3px solid rgba(255,255,255,0.15)' : 'none',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#FFFFFF',
    whiteSpace: 'pre-wrap',
  }),
  typing: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 24px',
  },
  typingDots: {
    display: 'flex',
    gap: '4px',
    padding: '12px 16px',
    background: '#132430',
    borderLeft: '3px solid #2d9b8a',
    borderRadius: '0 10px 10px 10px',
  },
  dot: (delay) => ({
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#2d9b8a',
    animation: 'druker-pulse 1.2s ease-in-out infinite',
    animationDelay: delay,
  }),
  inputArea: {
    padding: '16px 24px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    background: '#0d1a22',
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
  },
  textarea: {
    flex: 1,
    background: '#1a2f3c',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    padding: '12px 16px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    color: '#FFFFFF',
    resize: 'none',
    outline: 'none',
    lineHeight: '1.5',
    minHeight: '48px',
    maxHeight: '180px',
    transition: 'border-color 0.15s ease',
  },
  btn: (disabled) => ({
    padding: '12px 18px',
    background: disabled ? 'rgba(45,155,138,0.35)' : '#2d9b8a',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    flexShrink: 0,
    transition: 'background 0.15s ease',
    alignSelf: 'flex-end',
  }),
  hint: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    color: 'rgba(255,255,255,0.30)',
    marginTop: '6px',
    textAlign: 'right',
  },
  error: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    color: '#e05555',
    marginTop: '8px',
    padding: '8px 12px',
    background: 'rgba(224,85,85,0.10)',
    border: '1px solid rgba(224,85,85,0.25)',
    borderRadius: '6px',
  },
};

export default function DemoChat() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [ctaDismissed, setCtaDismissed] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, showCTA]);

  useEffect(() => {
    // Enfocar el input al cargar la página
    textareaRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setShowCTA(true);
          setCtaDismissed(false);
        } else {
          setError(data.error || 'Algo salió mal. Intenta de nuevo.');
        }
        return;
      }

      setMessages([...newMessages, { role: 'assistant', content: data.message }]);

      if (data.showCTA && !ctaDismissed) {
        setShowCTA(true);
      }

      // Analytics (agrega tu tracker preferido aquí)
      if (typeof window !== 'undefined') {
        window.gtag?.('event', 'demo_message_sent', { turn: data.turnCount });
        window.posthog?.capture('demo_message_sent', { turn: data.turnCount });
        if (data.showCTA) {
          window.gtag?.('event', 'demo_cta_shown', { turn: data.turnCount });
          window.posthog?.capture('demo_cta_shown', { turn: data.turnCount });
        }
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCtaClick = () => {
    window.gtag?.('event', 'demo_cta_clicked');
    window.posthog?.capture('demo_cta_clicked');
  };

  return (
    <>
      <style>{`
        @keyframes druker-pulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.85); }
          30% { opacity: 1; transform: scale(1); }
        }
        .druker-textarea:focus {
          border-color: #2d9b8a !important;
          box-shadow: 0 0 0 3px rgba(45,155,138,0.12);
        }
        .druker-send-btn:hover:not(:disabled) {
          background: #3aafa9 !important;
        }
      `}</style>

      <div style={S.container}>
        {/* Área de mensajes */}
        <div style={S.messages}>
          {messages.map((msg, i) => (
            <div key={i} style={S.bubbleWrap(msg.role)}>
              <div style={S.avatar(msg.role)}>
                {msg.role === 'assistant' ? 'D' : 'CM'}
              </div>
              <div style={S.bubble(msg.role)}>{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div style={S.typing}>
              <div style={S.avatar('assistant')}>D</div>
              <div style={S.typingDots}>
                <div style={S.dot('0s')} />
                <div style={S.dot('0.2s')} />
                <div style={S.dot('0.4s')} />
              </div>
            </div>
          )}

          {/* CTA — aparece después del turno 4, no interrumpe */}
          {showCTA && !ctaDismissed && (
            <DemoCTA
              onDismiss={() => {
                setCtaDismissed(true);
                setShowCTA(false);
                window.posthog?.capture('demo_cta_dismissed');
              }}
              onCtaClick={handleCtaClick}
            />
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={S.inputArea}>
          <div style={S.inputRow}>
            <textarea
              ref={textareaRef}
              className="druker-textarea"
              style={S.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Respóndele a Druker..."
              rows={2}
              disabled={loading}
            />
            <button
              className="druker-send-btn"
              style={S.btn(!input.trim() || loading)}
              onClick={sendMessage}
              disabled={!input.trim() || loading}
            >
              {loading ? 'Analizando...' : 'Enviar →'}
            </button>
          </div>
          <div style={S.hint}>Enter para enviar · Shift+Enter para nueva línea</div>
          {error && <div style={S.error}>{error}</div>}
        </div>
      </div>
    </>
  );
}
