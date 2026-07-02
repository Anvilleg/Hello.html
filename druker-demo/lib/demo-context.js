// lib/demo-context.js
// Empresa ficticia pre-cargada para el demo de Druker IA en operatia.co/demo

const DEMO_COMPANY = {
  // ── IDENTIDAD ──
  nombre: 'Servitek SAS',
  sector: 'Servicios de mantenimiento industrial',
  ciudad: 'Cali, Valle del Cauca',
  empleados: 18,
  anos_operacion: 7,
  gerente: 'Carlos Mendoza',

  // ── FINANCIERO ──
  ventas_mes_promedio: '$280,000,000 COP',
  dias_caja: 38,
  margen_operacional: '14%',
  deuda_activa: '$95,000,000 COP (leasing de equipos)',
  concentracion_clientes: '55% en 2 clientes principales',
  cartera_promedio: '62 días',

  // ── SITUACIÓN ACTUAL ──
  tension_principal:
    'Un cliente nuevo grande llegó referido — industria textil. Proyectos de $80M COP. Carlos no sabe si la operación actual soporta ese volumen sin contratar.',
  decision_abierta:
    '¿Acepto el contrato de Textilcol SA o espero a tener más capacidad?',

  // ── HISTORIAL DE DECISIONES ──
  decisiones_recientes: [
    {
      fecha: 'Hace 4 meses',
      decision: 'Rechazó un contrato de $45M COP con empresa de construcción',
      razon: 'Dudas sobre capacidad de pago del cliente',
      resultado:
        'El cliente entró en liquidación 2 meses después. La decisión fue correcta.',
    },
    {
      fecha: 'Hace 8 meses',
      decision: 'Contrató a un técnico senior a $4.2M COP/mes',
      razon: 'Cubrir crecimiento de demanda',
      resultado:
        'El técnico redujo los tiempos de servicio en 22% y permitió tomar 3 contratos adicionales.',
    },
  ],

  // ── ICRE / SCORE ──
  druker_score: 68,
  dimensiones: {
    salud_financiera: 22,     // de 30
    calidad_decisional: 14,   // de 20
    velocidad_decisional: 11, // de 15
    disciplina_ejecucion: 9,  // de 15
    resultado_decisiones: 7,  // de 10
    gestion_riesgo: 5,        // de 10
    aprendizaje: 0,           // pendiente — no ha cerrado 2 ciclos
  },

  // ── ARQUETIPO ──
  arquetipo: 'Gerente Pragmático',
  arquetipo_frase: 'Primero que funcione, después que sea perfecto',
};

const getDemoSystemPrompt = () => `
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
5. Terminas cada análisis con UNA recomendación clara y el razonamiento que la sostiene
6. NUNCA das respuestas genéricas que funcionarían para cualquier empresa

CÓMO HABLAS:
- Nunca uses viñetas, asteriscos ni listas numeradas — las ideas van en párrafos cortos
- Nunca empieces con "¡Claro!", "Por supuesto", "Entiendo tu preocupación" ni fórmulas de chatbot
- Máximo 3 párrafos por respuesta
- Directo, sin rodeos, sin eufemismos

TONO: Habla como un asesor de confianza que conoce el negocio de Carlos hace años. Si algo es un riesgo real, lo llamas riesgo real.

LÍMITE DEL DEMO: Después de 4-5 turnos del usuario, incluye naturalmente (sin interrumpir el análisis) una mención de que en su cuenta real Druker recuerda todo esto de forma permanente y construye el DRUKER Score con el tiempo. NO hagas esto antes del turno 4.
`;

module.exports = { DEMO_COMPANY, getDemoSystemPrompt };
