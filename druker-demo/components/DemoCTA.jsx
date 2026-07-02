// components/DemoCTA.jsx
// Aparece después del turno 4 — nunca antes
// No interrumpe la conversación — aparece como tarjeta adicional debajo del chat

const S = {
  wrap: {
    margin: '20px 0',
    padding: '20px 24px',
    background: '#132430',
    border: '1px solid rgba(45,155,138,0.25)',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(45,155,138,0.08)',
  },
  eyebrow: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    color: '#2d9b8a',
    marginBottom: '10px',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: '14px',
    letterSpacing: '-0.01em',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
    marginBottom: '20px',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: '1.5',
  },
  checkIcon: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: 'rgba(76,175,120,0.20)',
    border: '1px solid rgba(76,175,120,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '1px',
    fontSize: '9px',
    color: '#4caf78',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 20px',
    background: '#2d9b8a',
    color: '#FFFFFF',
    borderRadius: '8px',
    border: 'none',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background 0.15s ease',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 16px',
    background: 'transparent',
    color: 'rgba(255,255,255,0.55)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.12)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.15s ease, border-color 0.15s ease',
  },
};

const features = [
  'Recuerda esta conversación y todas las siguientes',
  'Construye tu DRUKER Score con cada decisión',
  'Aprende tu contexto financiero real (Siigo / Alegra)',
  'Registra resultados y detecta tus patrones de decisión',
];

export default function DemoCTA({ onDismiss }) {
  return (
    <div style={S.wrap}>
      <div style={S.eyebrow}>Estás en el demo de Druker</div>
      <div style={S.title}>En tu cuenta real, Druker hace mucho más:</div>
      <div style={S.items}>
        {features.map((f, i) => (
          <div key={i} style={S.item}>
            <div style={S.checkIcon}>✓</div>
            <span>{f}</span>
          </div>
        ))}
      </div>
      <div style={S.actions}>
        <a
          href="/onboarding"
          style={S.btnPrimary}
          onMouseEnter={e => (e.currentTarget.style.background = '#3aafa9')}
          onMouseLeave={e => (e.currentTarget.style.background = '#2d9b8a')}
        >
          Crear mi cuenta — 30 días gratis →
        </a>
        <button
          onClick={onDismiss}
          style={S.btnSecondary}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          Seguir en el demo
        </button>
      </div>
    </div>
  );
}
