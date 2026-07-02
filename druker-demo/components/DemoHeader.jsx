// components/DemoHeader.jsx
import { useState } from 'react';
import { DEMO_COMPANY } from '../lib/demo-context';

const S = {
  wrap: {
    background: '#132430',
    borderBottom: '1px solid rgba(255,255,255,0.10)',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    minWidth: 0,
  },
  icon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: 'rgba(45,155,138,0.20)',
    border: '1px solid rgba(45,155,138,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0,
  },
  info: { minWidth: 0 },
  name: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: '-0.01em',
    marginBottom: '2px',
  },
  meta: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    color: 'rgba(255,255,255,0.50)',
    marginBottom: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  metrics: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.70)',
  },
  metricHighlight: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  decision: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '6px',
    padding: '5px 10px',
    background: 'rgba(232,160,32,0.12)',
    border: '1px solid rgba(232,160,32,0.25)',
    borderRadius: '6px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    color: '#e8a020',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
    position: 'relative',
    cursor: 'default',
  },
  badge: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: '2.5px solid #2d9b8a',
    background: '#0d1a22',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 16px rgba(45,155,138,0.18)',
  },
  scoreNum: {
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: '18px',
    fontWeight: '700',
    color: '#2d9b8a',
    lineHeight: '1',
  },
  scoreMax: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '9px',
    color: 'rgba(255,255,255,0.40)',
    lineHeight: '1',
  },
  scoreLabel: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '9px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.45)',
  },
  tooltip: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '8px',
    background: '#1a2f3c',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    padding: '10px 14px',
    width: '220px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    color: 'rgba(255,255,255,0.70)',
    lineHeight: '1.6',
    zIndex: 10,
    boxShadow: '0 8px 24px rgba(0,0,0,0.50)',
    pointerEvents: 'none',
  },
  demoBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '3px 10px',
    background: 'rgba(45,155,138,0.12)',
    border: '1px solid rgba(45,155,138,0.25)',
    borderRadius: '9999px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '10px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#2d9b8a',
    marginBottom: '12px',
  },
};

export default function DemoHeader() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      {/* Banda superior — aviso demo */}
      <div style={{ background: '#0a1219', padding: '6px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>
          Demo pre-cargado ·
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.70)' }}>
          Estás en la sesión de <strong style={{ color: '#FFFFFF' }}>Carlos Mendoza · Servitek SAS</strong>
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
          · Sin registro requerido
        </span>
      </div>

      {/* Header principal con datos de la empresa */}
      <div style={S.wrap}>
        <div style={S.left}>
          <div style={S.icon}>🏭</div>
          <div style={S.info}>
            <div style={S.name}>{DEMO_COMPANY.nombre}</div>
            <div style={S.meta}>
              {DEMO_COMPANY.gerente} · {DEMO_COMPANY.arquetipo} · {DEMO_COMPANY.ciudad} · {DEMO_COMPANY.empleados} empleados
            </div>
            <div style={S.metrics}>
              Caja:&nbsp;<span style={S.metricHighlight}>{DEMO_COMPANY.dias_caja} días</span>
              &nbsp;·&nbsp;Ventas: <span style={S.metricHighlight}>$280M/mes</span>
              &nbsp;·&nbsp;Margen: <span style={S.metricHighlight}>{DEMO_COMPANY.margen_operacional}</span>
            </div>
            <div style={S.decision}>
              <span>📌</span>
              <span>Decisión activa: {DEMO_COMPANY.decision_abierta}</span>
            </div>
          </div>
        </div>

        {/* DRUKER Score badge */}
        <div
          style={S.right}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div style={S.badge}>
            <span style={S.scoreNum}>{DEMO_COMPANY.druker_score}</span>
            <span style={S.scoreMax}>/100</span>
          </div>
          <span style={S.scoreLabel}>DRUKER Score</span>
          {showTooltip && (
            <div style={S.tooltip}>
              Este score se construye con cada decisión que registras. En tu cuenta real, crece con el tiempo y mide 7 dimensiones de calidad decisional.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
