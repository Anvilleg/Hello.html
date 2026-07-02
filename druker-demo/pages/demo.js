// pages/demo.js
// URL pública: operatia.co/demo
// Sin login · Sin registro · Sin límite visible

import Head from 'next/head';
import DemoHeader from '../components/DemoHeader';
import DemoChat from '../components/DemoChat';

const S = {
  page: {
    minHeight: '100vh',
    background: '#0d1a22',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, -apple-system, sans-serif',
  },
  nav: {
    background: '#0a1219',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '0 24px',
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  },
  logoIcon: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    background: '#2d9b8a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  logoText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: '-0.01em',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  navLink: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.55)',
    textDecoration: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    transition: 'color 0.15s ease',
  },
  navCTA: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    fontWeight: '600',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '7px 16px',
    background: '#2d9b8a',
    borderRadius: '7px',
    transition: 'background 0.15s ease',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '820px',
    width: '100%',
    margin: '0 auto',
    minHeight: 0,
  },
  chatWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    height: 'calc(100vh - 52px)',
  },
};

export default function DemoPage() {
  return (
    <>
      <Head>
        <title>Demo de Druker IA · Operatia</title>
        <meta
          name="description"
          content="Habla con Druker, el primer asesor gerencial de IA para PyMEs colombianas. Demo gratuito sin registro."
        />
        <meta property="og:title" content="Demo de Druker IA" />
        <meta
          property="og:description"
          content="Druker ya conoce a Carlos Mendoza de Servitek SAS. Entra y continúa la conversación."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={S.page}>
        {/* Nav */}
        <nav style={S.nav}>
          <a href="/" style={S.logo}>
            <div style={S.logoIcon}>D</div>
            <span style={S.logoText}>Druker IA</span>
          </a>
          <div style={S.navRight}>
            <a href="/inicio" style={S.navLink}>¿Qué es Druker?</a>
            <a
              href="/onboarding"
              style={S.navCTA}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#3aafa9')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#2d9b8a')}
            >
              Crear cuenta gratis →
            </a>
          </div>
        </nav>

        {/* Cuerpo: header de empresa + chat */}
        <main style={S.main}>
          <div style={S.chatWrap}>
            <DemoHeader />
            <DemoChat />
          </div>
        </main>
      </div>
    </>
  );
}
