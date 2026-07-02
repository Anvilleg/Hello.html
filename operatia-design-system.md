# OPERATIA — DESIGN SYSTEM
## Documento de referencia para Claude Design
**Versión 1.0 · Junio 2026 · Confidencial**
**Empresa:** JVstratica SAS — Operatia
**Productos:** Druker IA · ICRE · Portal de Consultores

---

## INSTRUCCIONES DE USO

Este documento es la fuente única de verdad visual de Operatia. Cuando diseñes cualquier interfaz, componente, presentación o material para Operatia o Druker IA, aplica estos tokens, principios y patrones sin excepción. Nunca uses fondos blancos, colores brillantes de startup, ni tipografías serif. El estilo es: sofisticado, denso, institucional, dark-first.

---

## 1. IDENTIDAD DE MARCA

### 1.1 Quiénes somos
**Operatia** es la empresa que construye infraestructura de inteligencia para la toma de decisiones gerenciales en Latinoamérica. Operatia no es una app de productividad ni un chatbot — es un sistema de asesoría ejecutiva potenciado por IA.

**Druker IA** es el producto principal: el primer asesor gerencial de IA diseñado para el contexto latinoamericano. No valida, no motiva, no entretiene. Hace las preguntas incómodas que revelan la realidad de la empresa.

**ICRE** (Índice de Confiabilidad en la Toma de Decisiones) es la métrica propietaria de Operatia: 7 dimensiones que miden la calidad del proceso decisional de un gerente, de 0 a 100.

**Portal de Consultores** es la herramienta B2B que permite a consultores y programas de fortalecimiento gerencial (como Comfama ONE) tener visibilidad en tiempo real del contexto decisional de cada empresa que acompañan.

### 1.2 Personalidad visual
| Atributo | Descripción |
|---|---|
| **Sofisticado** | No es una startup colorida. Es una firma de advisory. |
| **Denso** | Mucha información bien organizada, no espacios vacíos |
| **Confiable** | Dark palette institucional, tipografía limpia |
| **Directo** | Sin adornos innecesarios. Cada elemento cumple una función |
| **Latinoamericano** | Cálido dentro del rigor. No frío como software europeo |

### 1.3 Lo que Operatia NUNCA es visualmente
- No es una app de wellness o mindfulness (sin gradientes pasteles)
- No es un SaaS genérico americano (sin azules corporativos #0066CC)
- No es un producto de consumo masivo (sin ilustraciones planas tipo Mailchimp)
- No es una herramienta financiera fría (sin grises sin personalidad)

### 1.4 Referencias visuales
- **Tono**: Linear.app, Raycast, Vercel Dashboard
- **Densidad**: Notion, Airtable en dark mode
- **Institucionalidad**: Consultoras de estrategia como McKinsey.com
- **Calor latinoamericano**: Colores teal y gold que evocan confianza sin frialdad

---

## 2. SISTEMA DE COLOR

### 2.1 Paleta de fondos

```
--color-bg-base:        #0d1a22    /* Fondo principal de toda la app */
--color-bg-surface:     #132430    /* Cards de primer nivel, paneles */
--color-bg-elevated:    #1a2f3c    /* Cards internas, inputs, tooltips */
--color-bg-overlay:     #0a1219    /* Sidebars, modales, drawers */
--color-bg-scrim:       rgba(10,18,25,0.85)   /* Overlays sobre contenido */
```

### 2.2 Colores de marca

```
--color-brand-teal:     #2d9b8a    /* Color primario — logo, CTAs, estados activos */
--color-brand-teal-lt:  #3aafa9    /* Hover sobre teal, borders activos */
--color-brand-teal-dim: rgba(45,155,138,0.15)  /* Fondos tintados teal */
--color-brand-teal-border: rgba(45,155,138,0.30) /* Borders tintados teal */

--color-brand-gold:     #e8a020    /* Acento — resultados, highlights, alertas suaves */
--color-brand-gold-lt:  #f0b040    /* Hover sobre gold */
--color-brand-gold-dim: rgba(232,160,32,0.15)  /* Fondos tintados gold */
--color-brand-gold-border: rgba(232,160,32,0.30) /* Borders tintados gold */
```

### 2.3 Texto

```
--color-text-primary:   #FFFFFF           /* Texto principal */
--color-text-secondary: rgba(255,255,255,0.75)  /* Texto de soporte */
--color-text-muted:     rgba(255,255,255,0.45)  /* Metadata, placeholders */
--color-text-disabled:  rgba(255,255,255,0.25)  /* Elementos deshabilitados */
--color-text-label:     #2d9b8a           /* Labels uppercase teal */
--color-text-gold:      #e8a020           /* Texto acento gold */
--color-text-inverse:   #0d1a22           /* Texto sobre fondos claros */
```

### 2.4 Bordes

```
--color-border-subtle:  rgba(255,255,255,0.06)  /* Separadores mínimos */
--color-border-default: rgba(255,255,255,0.12)  /* Bordes de cards */
--color-border-strong:  rgba(255,255,255,0.20)  /* Bordes de inputs */
--color-border-active:  #2d9b8a                 /* Input en foco, seleccionado */
--color-border-gold:    #e8a020                 /* Bordes de acento gold */
--color-border-danger:  #e05555                 /* Inputs en error */
```

### 2.5 Semánticos

```
--color-success:        #4caf78    /* Confirmaciones, estados ok */
--color-success-dim:    rgba(76,175,120,0.15)
--color-warning:        #e8a020    /* Advertencias, pendientes */
--color-warning-dim:    rgba(232,160,32,0.15)
--color-danger:         #e05555    /* Errores, alertas críticas */
--color-danger-dim:     rgba(224,85,85,0.15)
--color-info:           #3aafa9    /* Información neutral */
--color-info-dim:       rgba(58,175,169,0.15)
```

### 2.6 Zonas del ICRE (escala 0–100)

```
--color-icre-critical:  #e05555    /* 0–40   Zona Crítica */
--color-icre-risk:      #e8a020    /* 41–60  Zona de Riesgo */
--color-icre-develop:   #f0c030    /* 61–74  Zona de Desarrollo */
--color-icre-solid:     #2d9b8a    /* 75–89  Zona Sólida */
--color-icre-excellent: #4caf78    /* 90–100 Zona de Excelencia */
```

**Regla**: El color del ICRE se aplica a: borde del badge, glow del badge, barra de progreso, etiqueta de zona. Nunca al fondo del badge completo.

### 2.7 Uso de color — reglas

| Situación | Color |
|---|---|
| CTA principal, acción confirmada | `--color-brand-teal` |
| Resultado positivo, insight clave | `--color-brand-gold` |
| Alerta de caja, riesgo financiero | `--color-danger` |
| Sesgo detectado | `--color-warning` |
| Decisión registrada | `--color-success` |
| Modo rápido / urgente | `--color-brand-gold` |
| Modo reflexivo / análisis | `--color-brand-teal` |

---

## 3. TIPOGRAFÍA

### 3.1 Familias

```
--font-sans: 'Inter', 'DM Sans', -apple-system, system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

**Inter** para toda la interfaz. **JetBrains Mono** solo para datos numéricos en dashboards (ICRE score, montos en COP/USD, timestamps).

### 3.2 Escala tipográfica

```
--text-2xs:  10px / line-height: 1.4  /* Timestamps, metadata mínima */
--text-xs:   11px / line-height: 1.4  /* Labels uppercase, badges */
--text-sm:   13px / line-height: 1.5  /* Texto secundario, captions */
--text-base: 15px / line-height: 1.7  /* Cuerpo del chat, párrafos */
--text-md:   17px / line-height: 1.5  /* Subtítulos, nombres */
--text-lg:   20px / line-height: 1.3  /* Títulos de sección */
--text-xl:   26px / line-height: 1.2  /* Títulos de pantalla */
--text-2xl:  34px / line-height: 1.15 /* Hero titles */
--text-3xl:  44px / line-height: 1.1  /* Portadas, landing */
```

### 3.3 Pesos

```
--weight-regular:  400
--weight-medium:   500
--weight-semibold: 600
--weight-bold:     700
```

### 3.4 Tracking (letter-spacing)

```
--tracking-tight:  -0.025em   /* Headings grandes */
--tracking-normal:  0em
--tracking-wide:    0.05em    /* Subtítulos */
--tracking-wider:   0.08em    /* Labels uppercase */
--tracking-widest:  0.12em    /* Section markers (COMFAMA / ONE) */
```

### 3.5 Estilos definidos

**Section Label** — encabezados de sección tipo ONE-pager
```
font-size: 11px
font-weight: 500
letter-spacing: 0.12em
text-transform: uppercase
color: var(--color-text-label)    /* teal */
```

**Chat Message Body** — mensajes de Druker y del gerente
```
font-size: 15px
font-weight: 400
line-height: 1.7
color: var(--color-text-primary)
```

**Card Title**
```
font-size: 15px
font-weight: 600
letter-spacing: -0.01em
color: var(--color-text-primary)
```

**ICRE Score Number**
```
font-family: var(--font-mono)
font-size: 28px
font-weight: 700
color: [color de zona ICRE]
```

**Decision Tag**
```
font-size: 11px
font-weight: 500
letter-spacing: 0.04em
text-transform: uppercase
```

---

## 4. ESPACIADO Y LAYOUT

### 4.1 Escala de espaciado (base 4px)

```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
--space-32: 128px
```

### 4.2 Border radius

```
--radius-xs:   4px    /* checkboxes, tags pequeños */
--radius-sm:   6px    /* inputs, badges */
--radius-md:   10px   /* cards estándar, buttons */
--radius-lg:   16px   /* panels, modales */
--radius-xl:   24px   /* hero cards, drawers */
--radius-full: 9999px /* pills, avatares, chips */
```

### 4.3 Layout del chat (Druker IA Web)

```
Estructura:
├── Sidebar izquierda: 260px fijo, bg: var(--color-bg-overlay)
├── Área de chat: flex-1, bg: var(--color-bg-base)
│   ├── Header: 56px, bg: var(--color-bg-overlay), border-bottom
│   ├── Messages area: scroll, padding: 24px, max-width: 760px, centrado
│   └── Input area: fixed bottom, bg: var(--color-bg-elevated), blur backdrop
└── Panel derecho (opcional): 320px, contexto del gerente

Max-width de mensajes:
- Druker (IA): 680px
- Gerente (usuario): 560px, alineados a la derecha
```

### 4.4 Layout del Portal de Consultores

```
Grid de tarjetas empresas: 3 columnas, gap: 24px, responsive a 2 y 1
Header con filtros: sticky top
Tarjeta empresa: min-height 180px, border-radius: var(--radius-md)
Drawer de detalle: 480px desde la derecha, overlay oscuro
```

### 4.5 Layout ICRE Dashboard

```
Hero metric: ICRE badge centrado + zona + variación vs período anterior
Grid de dimensiones: 7 tarjetas en 2 columnas (la 7ª ocupa el ancho)
Timeline de decisiones: scroll horizontal, altura fija 120px
Radar chart: 360px × 360px centrado
```

---

## 5. COMPONENTES

### 5.1 Chat Bubble — Druker (IA)

```
background:     var(--color-bg-surface)
border-left:    3px solid var(--color-brand-teal)
border-radius:  0 var(--radius-md) var(--radius-md) var(--radius-md)
padding:        16px 20px
max-width:      680px
align:          left

Avatar "D":
  width: 32px, height: 32px
  background: var(--color-brand-teal)
  border-radius: var(--radius-sm)
  font: 700 15px Inter, color: white
  margin-right: 12px

Timestamp: text-xs, color: var(--color-text-muted), al hover del bubble
```

### 5.2 Chat Bubble — Gerente (Usuario)

```
background:     var(--color-bg-elevated)
border-right:   3px solid rgba(255,255,255,0.15)
border-radius:  var(--radius-md) 0 var(--radius-md) var(--radius-md)
padding:        14px 18px
max-width:      560px
align:          right

Avatar: iniciales del gerente, círculo 32px, bg: rgba(255,255,255,0.1)
```

### 5.3 ICRE Badge (Score Principal)

```
Forma: círculo
Tamaños:
  - lg: 96px (dashboard principal)
  - md: 64px (tarjeta empresa en portal)
  - sm: 40px (lista compacta)

Capas:
  1. Fondo: var(--color-bg-elevated)
  2. Anillo: 3px stroke, color según zona ICRE
  3. Número: font-mono bold, color según zona
  4. Label "ICRE": text-xs uppercase, color: var(--color-text-muted)
  5. Glow: box-shadow 0 0 20px [color-zona] con 20% opacity

Animación al actualizar: counter animado de 0 a score en 1.2s ease-out
```

### 5.4 Card Estándar

```
background:     var(--color-bg-surface)
border:         1px solid var(--color-border-default)
border-radius:  var(--radius-md)
padding:        20px 24px
transition:     border-color 0.2s ease

Hover:
  border-color: var(--color-border-strong)
  box-shadow: var(--shadow-md)
```

### 5.5 Card con Borde Izquierdo de Color (patrón ONE-pager)

```
background:     var(--color-bg-surface)
border-left:    3px solid [color-tipo]
border-radius:  0 var(--radius-md) var(--radius-md) 0
padding:        20px 24px

Tipos de borde:
  - Problema / Alerta:    var(--color-brand-gold)
  - Solución / Positivo:  var(--color-brand-teal)
  - Error / Crítico:      var(--color-danger)
  - Decisión activa:      var(--color-brand-teal)
  - Sesgo detectado:      var(--color-warning)
  - Insight estratégico:  var(--color-brand-gold)
```

### 5.6 Botón Primario

```
background:      var(--color-brand-teal)
color:           #FFFFFF
border-radius:   var(--radius-md)
padding:         10px 20px
font:            600 14px Inter
border:          none
transition:      all 0.2s ease

Hover:
  background: var(--color-brand-teal-lt)
  box-shadow: var(--shadow-teal)

Disabled:
  opacity: 0.4
  cursor: not-allowed
```

### 5.7 Botón Secundario

```
background:   transparent
border:       1px solid var(--color-border-default)
color:        var(--color-text-secondary)
border-radius: var(--radius-md)
padding:      10px 20px
font:         500 14px Inter

Hover:
  border-color: var(--color-brand-teal)
  color: var(--color-text-primary)
```

### 5.8 Botón Ghost (solo texto)

```
background: transparent
border: none
color: var(--color-text-muted)
padding: 8px 12px
font: 500 13px Inter

Hover: color var(--color-text-primary)
```

### 5.9 Input de texto

```
background:     var(--color-bg-elevated)
border:         1px solid var(--color-border-strong)
border-radius:  var(--radius-sm)
padding:        10px 14px
font:           400 15px Inter
color:          var(--color-text-primary)
outline:        none

Focus:
  border-color: var(--color-border-active)
  box-shadow: 0 0 0 3px rgba(45,155,138,0.15)

Placeholder: color var(--color-text-muted)
Error: border-color var(--color-border-danger)
```

### 5.10 Chat Input (Druker)

```
background:     var(--color-bg-elevated)
border:         1px solid var(--color-border-strong)
border-radius:  var(--radius-lg)
padding:        14px 52px 14px 18px
font:           400 15px Inter
resize:         none
min-height:     52px, max-height: 200px
backdrop-filter: blur(8px)

Botón enviar: posición absoluta derecha, teal, circle 32px
```

### 5.11 Tag / Chip de Decisión

```
Tipos (según CategoriaDecision):
  financiero:  bg rgba(232,160,32,0.12),  border rgba(232,160,32,0.25), text #e8a020
  personas:    bg rgba(76,175,120,0.12),  border rgba(76,175,120,0.25), text #4caf78
  estrategico: bg rgba(45,155,138,0.12),  border rgba(45,155,138,0.25), text #2d9b8a
  operativo:   bg rgba(255,255,255,0.06), border rgba(255,255,255,0.15), text #ffffffbf
  cliente:     bg rgba(58,175,169,0.12),  border rgba(58,175,169,0.25), text #3aafa9

Forma: pill (border-radius: full)
Padding: 3px 10px
Font: 500 11px Inter, uppercase, tracking 0.04em
```

### 5.12 Badge de Sesgo Detectado

```
background:   rgba(232,160,32,0.10)
border:       1px solid rgba(232,160,32,0.30)
border-radius: var(--radius-sm)
padding:      8px 12px
font:         500 12px Inter
color:        var(--color-brand-gold)
icon:         ⚠ izquierda, 14px
```

### 5.13 Barra de Progreso ICRE (histórico)

```
Track: bg var(--color-bg-elevated), height 6px, radius full
Fill:  color según zona, transición animada
Dots:  cada sesión = punto 8px sobre la línea
Hover sobre dot: tooltip con fecha + score + zona
```

### 5.14 Separador de sección

```
Una línea horizontal:
  border-top: 1px solid var(--color-border-subtle)
  margin: 24px 0

Con label:
  display: flex, align-items: center
  gap: 12px
  label: text-xs uppercase, color var(--color-text-muted), tracking-wider
  líneas: flex-1, border-top subtle
```

---

## 6. SOMBRAS Y EFECTOS

```css
--shadow-sm:    0 1px 3px rgba(0,0,0,0.40);
--shadow-md:    0 4px 16px rgba(0,0,0,0.50);
--shadow-lg:    0 8px 32px rgba(0,0,0,0.60);
--shadow-xl:    0 16px 48px rgba(0,0,0,0.70);

/* Glows de marca */
--shadow-teal:  0 0 20px rgba(45,155,138,0.18);
--shadow-gold:  0 0 20px rgba(232,160,32,0.18);
--shadow-danger:0 0 20px rgba(224,85,85,0.18);

/* Blur */
--blur-sm:  blur(4px);
--blur-md:  blur(8px);
--blur-lg:  blur(16px);
```

Uso del blur: **solo en** el área de input del chat, sidebars flotantes, y overlays. No en cards estáticas.

---

## 7. ICONOGRAFÍA

Sistema: **Lucide Icons** (preferido) o **Phosphor Icons** (peso Regular o Light).

Tamaños:
```
inline en texto:  14px
navegación:       18px
acciones:         16px
hero / vacío:     48px
```

Color por estado:
```
default:   var(--color-text-muted)
hover:     var(--color-text-secondary)
active:    var(--color-brand-teal)
danger:    var(--color-danger)
```

Iconos específicos por función:
```
Druker IA (logo):         D en cuadrado teal redondeado
Decisión registrada:      check-circle, color success
Sesgo detectado:          alert-triangle, color warning
ICRE score:               activity o bar-chart-2
Modo rápido:              zap
Modo reflexivo:           compass
Portal Consultores:       layout-dashboard
Nueva sesión:             plus-circle
Historial:                clock
```

---

## 8. ANIMACIONES Y TRANSICIONES

```css
/* Duraciones */
--duration-fast:    150ms
--duration-normal:  250ms
--duration-slow:    400ms
--duration-counter: 1200ms  /* Solo para ICRE score animado */

/* Easings */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1)
--ease-in:      cubic-bezier(0.4, 0, 1, 1)
--ease-out:     cubic-bezier(0, 0, 0.2, 1)
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1)  /* para badges y chips */
```

Reglas:
- Hover de botones y cards: `var(--duration-fast)` con `--ease-default`
- Entrada de modales y drawers: `var(--duration-slow)` con `--ease-out`, slide desde el lado
- ICRE badge al actualizarse: counter animado `var(--duration-counter)` + glow pulse
- Mensajes del chat: fade-in + slide-up desde 8px, `var(--duration-normal)`
- Sin animaciones innecesarias. Cada animación debe tener propósito funcional.

---

## 9. PATRONES DE INTERFAZ

### 9.1 Estado vacío (empty states)

```
Icono grande centrado: 48px, color var(--color-text-disabled)
Título: text-md, semibold, color var(--color-text-secondary)
Subtítulo: text-sm, color var(--color-text-muted), max-width 280px, centrado
CTA opcional: botón primario o ghost
```

### 9.2 Estado de carga

```
Skeleton loader: bg var(--color-bg-elevated), shimmer animation subtle
  shimmer: gradiente de izquierda a derecha, de transparent a rgba(255,255,255,0.04)
  animación: 1.5s infinito

Typing indicator (Druker escribiendo):
  3 dots pulsando, color var(--color-brand-teal)
  en bubble de Druker con bg var(--color-bg-surface)
```

### 9.3 Notificaciones / Toasts

```
Posición: esquina superior derecha
border-radius: var(--radius-md)
padding: 12px 16px
max-width: 360px
sombra: var(--shadow-lg)
borde izquierdo: 3px solid [color según tipo]
duración: 4s, fade-out en 0.5s

Tipos:
  success:  borde --color-success,  icono check-circle
  warning:  borde --color-warning,  icono alert-triangle
  error:    borde --color-danger,   icono x-circle
  info:     borde --color-brand-teal, icono info
```

### 9.4 Tooltips

```
bg: #1a2f3c (elevado sobre todo)
border: 1px solid var(--color-border-default)
border-radius: var(--radius-sm)
padding: 6px 10px
font: 400 12px Inter
color: var(--color-text-secondary)
sombra: var(--shadow-md)
max-width: 240px
delay de entrada: 400ms
```

### 9.5 Sidebar de navegación (Druker IA)

```
width: 260px
bg: var(--color-bg-overlay)
border-right: 1px solid var(--color-border-subtle)

Header: logo Druker IA 20px + nombre empresa en text-sm muted
Nav items: padding 8px 12px, radius var(--radius-sm)
  Active: bg var(--color-brand-teal-dim), color white, icono teal
  Hover: bg rgba(255,255,255,0.04)

Sección "Sesiones anteriores": label uppercase 11px muted + lista
Footer: avatar gerente + nombre + botón configuración
```

---

## 10. PRODUCTOS — GUÍAS ESPECÍFICAS

### 10.1 Druker IA — Chat Web

El chat es el corazón del producto. El diseño no compite con la conversación.

**Reglas específicas:**
- El área de mensajes tiene `max-width: 760px` centrado en pantalla
- Sin decoración excesiva en los bubbles — el contenido es lo que importa
- Los mensajes de Druker que contienen preguntas estratégicas pueden tener un borde gold sutil
- Las acciones registradas (`ACTION: guardarDecision`) se muestran como confirmación discreta en teal, no como alerta
- Los sesgos detectados aparecen en un badge warning entre el mensaje de Druker y el siguiente input
- El ICRE no se muestra en el chat a menos que el gerente lo pida — vive en el dashboard

### 10.2 Druker IA — WhatsApp

No hay diseño de interfaz propio. El diseño aquí es el de la respuesta de texto:
- Máximo 3 párrafos por mensaje
- Sin formato Markdown (WhatsApp lo muestra mal)
- El tono es el mismo: directo, sin saludos de chatbot
- Los iconos se usan sparingly: ✓ para confirmaciones, → para acciones sugeridas

### 10.3 ICRE Dashboard

```
Hero: ICRE total centrado, grande, zona en color
Sub-headline: "vs. sesión anterior: +[X] puntos" en color de tendencia
Grid de 7 dimensiones: cada una con score / max, barra de color, nombre
Radar chart: opcional para vista comparativa multi-período
Histórico: línea temporal scrolleable con dots de sesión
Decisiones del período: lista con chips de tipo y estado
```

Dimensiones del ICRE:
1. **SF** – Seguimiento Financiero (peso /25)
2. **CD** – Calidad Decisional (peso /20)
3. **DE** – Detección de Sesgos (peso /18)
4. **RD** – Rigor Decisional (peso /12)
5. **RE** – Resolución Efectiva (peso /10)
6. **CaD** – Cadencia Decisional (peso /5)
7. **ACS** – Alineación Estratégica (peso /10)

### 10.4 Portal de Consultores

**Principio:** El consultor necesita escanear 20-50 empresas en 30 segundos y saber dónde enfocar atención.

```
Vista listado: tabla densa con
  - Nombre empresa
  - ICRE badge (sm, 40px)
  - Última sesión (fecha + días)
  - Decisiones activas (número)
  - Semáforo de actividad (verde/amarillo/rojo)
  - Sesgo dominante (chip)

Vista tarjeta: grid 3 columnas, más visual, ICRE badge md (64px)

Detalle empresa (drawer derecho):
  - Header: nombre + ICRE badge lg + zona
  - Historial ICRE: línea temporal
  - Última sesión: resumen + decisiones
  - Mapa cognitivo: sesgos frecuentes + patrones
  - Botón: "Abrir sesión" → abre Druker IA en contexto del gerente
```

---

## 11. MATERIALES DE VENTAS Y COMUNICACIÓN

### 11.1 ONE-pager / Propuesta comercial

**Estructura visual:**
- Fondo: `var(--color-bg-base)` — nunca blanco
- Header: logo + nombre propuesta + etiqueta "Confidencial"
- Sección label: uppercase teal, 11px, tracking amplio
- Headline principal: 34px bold, tracking tight, blanco
- Subtítulo: 17px, color muted
- Cards problema/solución: borde izquierdo gold (problema) y teal (solución)
- "Propuesta en 2 momentos": Momento 1 bg teal oscuro, Momento 2 bg negro
- Resultados: texto gold + icono check teal
- Footer: oscuro con datos de contacto

### 11.2 Presentación PPT/Slides

**Paleta para slides:**
```
Fondo principal:  #0d1a22
Fondo alternativo: #132430 (slides de contenido denso)
Texto:            #FFFFFF y rgba(255,255,255,0.75)
Acento 1:         #2d9b8a
Acento 2:         #e8a020
```

**Reglas de slides:**
- Máximo 1 idea principal por slide
- Sin bullet points genéricos — datos y frases directas
- Tablas comparativas sobre fondos dark con borders sutiles
- Screenshots del producto siempre con sombra lg y border radius lg
- Nunca usar plantillas de PowerPoint genéricas

---

## 12. VOZ Y TONO EN LA INTERFAZ

El copy de la UI refleja la personalidad de Druker: directo, sin condescendencia, latinoamericano.

| Situación | Mal copy | Buen copy |
|---|---|---|
| Input placeholder | "Escribe tu mensaje aquí..." | "¿Qué decisión tienes encima?" |
| Estado vacío (sin sesiones) | "¡Empieza tu primera sesión!" | "Ninguna sesión aún. ¿Qué está pasando?" |
| Decisión guardada | "¡Tu decisión ha sido registrada exitosamente!" | "✓ Registrada. La verás en operatia.co/decisiones" |
| Error de conexión | "Ha ocurrido un error inesperado" | "Sin conexión. Revisa tu red e intenta de nuevo." |
| Sesgo detectado | "Hemos detectado un posible sesgo cognitivo" | "Sesgo de confirmación — estás descartando datos que contradicen la conclusión." |
| Onboarding | "¡Bienvenido a Druker IA!" | "Hola [nombre]. ¿Qué decisión tienes encima ahora mismo?" |
| ICRE mejoró | "¡Excelente progreso en tu índice!" | "ICRE: 71 → 78. La calidad decisional mejoró 7 puntos este mes." |

**Reglas de voz UI:**
- Sin exclamaciones innecesarias
- Sin "por favor" en acciones del sistema (sí en instrucciones del usuario)
- Los números van siempre en negrita o mono cuando son métricas
- Los nombres de los gerentes van con mayúscula inicial, sin títulos (no "Sr. Andrés")
- Los errores explican qué pasó y qué hacer — no solo qué falló

---

## 13. ACCESIBILIDAD

- Contraste mínimo texto sobre fondo: 4.5:1 (WCAG AA)
- Todos los elementos interactivos tienen estado focus visible con outline teal
- No usar solo color para transmitir información — siempre acompañar con icono o texto
- Tamaño mínimo de target táctil: 44×44px
- Los charts y visualizaciones del ICRE tienen alternativa textual

---

## 14. PROMPT MAESTRO PARA CLAUDE DESIGN

Cuando uses este design system en Claude, inicia cada solicitud de diseño con:

```
Diseña usando el design system de Operatia / Druker IA:

OBLIGATORIO:
- Dark theme: fondo base #0d1a22, superficies #132430 y #1a2f3c
- Brand teal #2d9b8a (primario), gold #e8a020 (acento)
- Tipografía Inter, texto blanco y semitransparente
- Bordes: rgba(255,255,255,0.08-0.20), nunca líneas blancas sólidas
- Cards con borde izquierdo de color según tipo de contenido
- Labels de sección: 11px uppercase teal, tracking 0.12em
- Sin fondos blancos. Sin colores brillantes. Sin gradientes pasteles.
- Sombras oscuras y profundas (dark brand).
- Tono visual: sofisticado, denso, institucional latinoamericano.

[Describe aquí el componente o pantalla específica]
```

---

*Operatia Design System v1.0 — Junio 2026*
*JVstratica SAS — operatia.co — drukeria@operatia.co*
*Documento confidencial de uso interno*
