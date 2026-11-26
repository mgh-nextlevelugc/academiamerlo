// Copy y datos portados 1:1 desde merlo-v3.4/waitlist.html + inscripciones.html.
// No reescribir textos, cifras ni claims sin volver a revisar el prototipo fuente.

export const journeyModules = [
  {
    n: "01",
    title: "Fundamentos",
    waitlist: "Cómo se mueve el mercado y quién decide.",
    venta:
      "Entiende cómo se mueve el mercado. Quién participa, quién decide y qué hay detrás de cada negociación.",
  },
  {
    n: "02",
    title: "Credibilidad",
    waitlist: "Rumor no es información: cuida tu palabra.",
    venta:
      "Distingue un rumor de una información. Aprende a contrastar y a cuidar lo más valioso: tu palabra.",
  },
  {
    n: "03",
    title: "Fuentes",
    waitlist: "Construye y protege tu red propia.",
    venta: "Construye, cultiva y protege una red propia de contactos.",
  },
  {
    n: "04",
    title: "Tiempos",
    waitlist: "Certero antes que primero.",
    venta:
      "Certero antes que primero: cuándo publicar, cuándo esperar y cuándo volver a preguntar.",
  },
  {
    n: "05",
    title: "Marca",
    waitlist: "Tu marca personal y tu comunidad.",
    venta:
      "Construye tu marca personal: posicionamiento, credibilidad y cómo leer a tu comunidad sin obedecerla.",
  },
  {
    // El contenido grabado es "mapa regional y construir carrera". Titularlo
    // solo "Carrera" dejaba afuera la mitad regional y encerraba el módulo en
    // una salida laboral, cuando también le sirve a quien nunca va a ejercer.
    n: "06",
    title: "El mapa",
    waitlist: "El mercado país por país, para trabajarlo o para leerlo.",
    venta:
      "El mercado país por país: para construir carrera dentro del oficio, o para leerlo como quien lo trabaja desde adentro.",
  },
] as const;

export const audienceNumbers = [
  {
    label: "1.000M+",
    numericValue: 1000,
    suffix: "M+",
    captionLines: ["visualizaciones acumuladas", "de su contenido"],
  },
  {
    label: "80M+",
    numericValue: 80,
    suffix: "M+",
    captionLines: ["visualizaciones mensuales", "en meses de mercado"],
  },
  {
    label: "1M+",
    numericValue: 1,
    suffix: "M+",
    captionLines: ["seguidores entre Instagram,", "X, TikTok y YouTube"],
  },
] as const;

export const audienceSource =
  "Cifras aproximadas de los canales de César Luis Merlo · septiembre 2026.";

export const trayectoriaLinks = [
  {
    href: "https://www.tycsports.com/racing-club/brian-mansilla-el-futbol-como-salvacion-el-sueno-de-volver-a-racing-y-la-promesa-de-jugar-en-newells-20200402.html",
    name: "TyC Sports",
    note: "Nota firmada",
  },
  {
    href: "https://www.uol.com.br/esporte/futebol/ultimas-noticias/2025/08/25/uol-traz-reforco-da-argentina-para-a-coluna-mercado-da-bola.htm/",
    name: "UOL",
    note: "Columnista · Mercado da Bola",
  },
  {
    href: "https://www.am.com.mx/author/cesar-luis-merlo",
    name: "Superdeportivo",
    note: "Autor",
  },
  // Olé y Radio La Red enlazan al sitio del medio, no a una nota firmada:
  // la trayectoria la confirmó César, pero no hay una página de autor suya
  // en ninguno de los dos para apuntar. Por eso la nota al pie ya no dice
  // "cada nombre enlaza a una fuente".
  {
    href: "https://www.ole.com.ar",
    name: "Olé",
    note: "Colaboración",
  },
  {
    href: "https://www.lared.am",
    name: "Radio La Red",
    note: "Colaboración",
  },
] as const;

export const citadoPorLinks = [
  {
    href: "https://www.espn.com.mx/futbol/mexico/nota/_/id/13757469/toluca-adelanta-america-fichaje-luan-palmeiras",
    name: "ESPN",
    note: "Citó su información",
  },
  {
    href: "https://us.marca.com/soccer/mercado-fichajes/2024/08/17/66bfd5a246163f461d8b4586.html",
    name: "MARCA",
    note: "Citó su información",
  },
  {
    href: "https://www.foxsports.com.mx/2025/11/30/caixinha-regresa-a-la-liga-mx-fc-juarez-llega-a-un-acuerdo-con-el-entrenador-portugues/",
    name: "FOX Sports",
    note: "Citó su información",
  },
] as const;

// Verificados uno por uno. Ojo: el link de YouTube que figura hoy en el
// linktree de César (@cesarluismerlo3493) devuelve 404; el canal vivo es
// @cesarluismerloCLM.
export const cesarSocials = [
  { name: "Instagram", href: "https://www.instagram.com/clmerlo5/" },
  { name: "X", href: "https://x.com/clmerlo" },
  { name: "YouTube", href: "https://www.youtube.com/@cesarluismerloCLM" },
  { name: "TikTok", href: "https://www.tiktok.com/@clmerlo5" },
] as const;

export const audienceTabs = [
  {
    id: "periodismo",
    tab: "Periodismo",
    kicker: "Periodistas y creadores",
    title: "Que tu próxima historia\nempiece contigo.",
    body: "Quieres empezar, ya cubres fútbol o tienes tu propio canal. Aprende a construir fuentes y a decidir qué información está lista para publicarse.",
  },
  {
    // Sin la palabra "apuestas": es un flanco de políticas para Meta Ads y
    // encierra la pestaña en un solo perfil. Quien apuesta se reconoce igual
    // en "tomas decisiones con la información que circula".
    id: "analisis",
    tab: "Análisis",
    kicker: "Analistas y lectores del mercado",
    title: "Más contexto.\nMejores preguntas.",
    body: "Tomas decisiones con la información que circula. Aprende a distinguir qué está confirmado, qué es una operación y qué es humo, antes de que el mercado lo confirme.",
  },
  {
    id: "fans",
    tab: "Fans",
    kicker: "Fans del fútbol",
    title: "Sé el que avisa.",
    body: "Entiendes cada rumor, cada «tengo entendido que» y cada placa de último momento antes de que explote. La misma lógica de fuentes, tiempos y negociaciones que usa quien la publica.",
  },
] as const;

export const editorialPhrases = [
  "La noticia no se mancha.",
  "Certero antes que primero.",
  "El oficio se aprende.",
] as const;

export const faqWaitlist = [
  {
    q: "¿Necesito experiencia en periodismo?",
    a: "No. El programa está pensado tanto para quienes quieren empezar como para quienes ya cubren fútbol y buscan especializarse. También puedes hacerlo si quieres entender mejor el mercado de pases.",
  },
  {
    q: "¿Cómo funciona?",
    a: "Los módulos son grabados. Empiezas por el Módulo 1 y cada módulo siguiente se habilita al aprobar el quiz del anterior. Los módulos 4 a 6 se habilitan a partir del día 8 desde tu compra. La modalidad VIP suma encuentros en vivo y espacios de consulta.",
  },
  {
    q: "¿Me sirve si no quiero ser periodista?",
    a: "Sí. El método para publicar información es el mismo que para leerla: vas a entender el mercado como quien lo trabaja por dentro.",
  },
  {
    q: "¿Anotarme en la lista reserva una vacante?",
    a: "La lista te permite recibir el aviso de apertura. No es una compra ni una inscripción al programa.",
  },
  {
    q: "¿Cuándo voy a recibir novedades?",
    a: "Te vamos a escribir cuando esté confirmada la apertura, con la información del programa y las opciones de inscripción.",
  },
] as const;

export const faqVenta = [
  {
    q: "¿Cuál es la diferencia entre la comunidad de WhatsApp y la academia?",
    a: "La comunidad es una suscripción mensual para recibir en WhatsApp la información de mercado que César confirma. La academia es el programa para aprender el método: seis módulos grabados con materiales, quizzes y certificado. Son independientes y puedes tener los dos.",
  },
  {
    q: "¿Necesito experiencia en periodismo?",
    a: "No. El programa está pensado tanto para quienes quieren empezar como para quienes ya cubren fútbol y buscan especializarse. También puedes hacerlo si quieres entender mejor el mercado de pases.",
  },
  {
    q: "¿Cómo funciona?",
    a: "Los módulos son grabados. Empiezas por el Módulo 1 y cada módulo siguiente se habilita al aprobar el quiz del anterior. Los módulos 4 a 6 se habilitan a partir del día 8 desde tu compra. La modalidad VIP suma encuentros en vivo y espacios de consulta.",
  },
  {
    q: "¿Hasta cuándo tengo acceso?",
    a: "El acceso al programa es de por vida. Puedes volver a las clases y los materiales cuando lo necesites.",
  },
  {
    q: "¿Puedo pagar en cuotas?",
    a: "El precio es de pago único. Los medios de pago disponibles dependen de tu país y se muestran en Hotmart antes de confirmar la compra.",
  },
  {
    q: "¿Qué pasa si el programa no es para mí?",
    a: "Tienes 7 días desde la compra para solicitar la devolución a través de Hotmart.",
  },
] as const;

export const courseFacts = [
  { strong: "6 módulos", span: "26 lecciones" },
  { strong: "Online", span: "módulo a módulo" },
  { strong: "+45 materiales", span: "para aplicar" },
] as const;

export const pricingPlans = [
  {
    id: "standard" as const,
    label: "Programa completo",
    name: "Standard",
    price: "174",
    features: [
      "Los 6 módulos del programa",
      "Materiales descargables y quizzes",
      "Acceso al Discord público",
      "Certificado firmado por César",
      "Una actualización del programa por año",
    ],
    cta: "Elegir Standard",
    vip: false,
  },
  {
    id: "vip" as const,
    label: "Con acompañamiento de César",
    name: "VIP",
    price: "497",
    features: [
      "Todo lo incluido en Standard",
      "Encuentros en vivo con César",
      "Sesiones de consulta y feedback",
      "Comunidad privada en Discord",
      "Certificado VIP",
    ],
    cta: "Elegir VIP",
    vip: true,
  },
] as const;

// Identidad y copy de comercio. Renombre: editar name y reemplazar el archivo
// logo. El escudo AM es provisional hasta recibir el logo de la comunidad.
export const parteContent = {
  name: "El Parte de Merlo",
  logo: "/parte-logo.png",
  tagline: "La información de mercado que César confirma, directo en tu WhatsApp.",
  label: "Comunidad privada de WhatsApp",
  tierLabel: "Para seguir el mercado",
  price: "5.99",
  currency: "US$",
  period: "al mes",
  billing: "Suscripción mensual",
  description:
    "La comunidad privada de WhatsApp de César Luis Merlo, periodista especializado en el mercado de pases del fútbol latinoamericano.",
  benefitsTitle: "Qué recibes",
  benefits: [
    "La información de mercado que César confirma, directo en tu WhatsApp.",
    "Contexto para entender cada movimiento: qué está cerrado, qué está avanzado y qué es solo ruido.",
    "Acceso a la comunidad mientras tu suscripción esté activa.",
  ],
  publishing: "Solo publican los administradores.",
  howTitle: "Cómo funciona",
  steps: [
    "Te suscribes con pago mensual.",
    "Dejas el número asociado a tu WhatsApp, con código de país. Es el único dato que usamos para agregarte.",
  ],
  accessStep: (hours: number) => `El equipo te agrega a la comunidad en un plazo máximo de ${hours} horas.`,
  cta: "Suscribirme en Hotmart",
  discoverCta: "Conocer la comunidad",
  comingSoon: "Próximamente",
  localCurrency: "Hotmart muestra el precio en tu moneda al pagar.",
  supportPrompt: "¿Dejaste un número equivocado? Escríbenos a",
  supportEmail: "info@roikon.com",
  waitlistInvitation: "Mientras esperas la apertura, recibe la información de César en tu WhatsApp.",
  academyInvitation: "¿Quieres aprender el método? Conoce Academia Merlo.",
  academyCta: "Ver el programa",
  thanks: {
    title: (name: string) => `Gracias por suscribirte a ${name}`,
    heading: (name: string) => `Tu suscripción a ${name} está activa.`,
    description: "Información de acceso a la comunidad privada de WhatsApp de César Luis Merlo.",
    access: (hours: number) => `El equipo te agrega a la comunidad de WhatsApp en un plazo máximo de ${hours} horas, al número que dejaste al comprar.`,
    cancellation: "Puedes cancelar cuando quieras desde tu cuenta de Hotmart.",
    cta: "Ir a mi cuenta de Hotmart",
  },
} as const;

export const academyThanksContent = {
  title: "Gracias por unirte",
  description: "Los próximos pasos para acceder a Academia Merlo desde Hotmart.",
  label: "Academia Merlo",
  heading: "Ya eres parte de Academia Merlo.",
  steps: [
    { title: "Revisa tu email", text: "Hotmart te envía el acceso al programa." },
    { title: "Empieza por el Módulo 1", text: "Entra al área de miembros y empieza por el Módulo 1. Cada módulo siguiente se habilita al aprobar el quiz del anterior, y los módulos 4 a 6 a partir del día 8." },
    { title: "Si compraste VIP", text: "El equipo te escribe por email con el calendario de encuentros en vivo." },
  ],
  note: "Si no ves el email en unos minutos, revisa spam o promociones.",
  cta: "Ir a mis cursos en Hotmart",
} as const;

export const pricingContent = {
  label: "Elige cómo quieres aprender",
  title: "El mismo método. Dos formas de vivirlo.",
  description: "Elige Standard para hacer el programa completo o suma encuentros en vivo y feedback de César con VIP.",
  billing: "Pago único · acceso de por vida",
  guidanceTitle: "¿No sabes cuál elegir?",
  guidance: "Standard es el método completo. VIP es el método con César revisando tu trabajo.",
  guarantee: "Pago a través de Hotmart · Garantía de devolución de 7 días",
  payments: "Los medios de pago disponibles se muestran en el checkout, en tu moneda local.",
  comingSoon: "Próximamente",
} as const;

export const commerceContent = {
  skip: "Ir al contenido",
  home: "Volver al inicio",
  homeLabel: "Academia Merlo, inicio",
  brand: "Academia Merlo",
  socialDescription: "Periodismo en el mercado de pases con César Luis Merlo",
  motto: "La noticia no se mancha.",
  legal: "Información legal",
  privacy: "Privacidad",
  terms: "Términos",
} as const;
