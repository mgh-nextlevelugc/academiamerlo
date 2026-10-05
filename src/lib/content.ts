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
    n: "06",
    title: "Carrera",
    waitlist: "El oficio país por país.",
    venta:
      "El oficio país por país: mercados, oportunidades y cómo construir tu camino profesional.",
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
  {
    href: "https://www.encancha.cl/autor/cesar-luis-merlo/",
    name: "En Cancha",
    note: "Autor",
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

export const audienceTabs = [
  {
    id: "periodismo",
    tab: "Periodismo",
    kicker: "Periodistas y creadores",
    title: "Que tu próxima historia\nempiece contigo.",
    body: "Quieres empezar, ya cubres fútbol o tienes tu propio canal. Aprende a construir fuentes y a decidir qué información está lista para publicarse.",
  },
  {
    id: "analisis",
    tab: "Análisis",
    kicker: "Analistas y apostadores",
    title: "Más contexto.\nMejores preguntas.",
    body: "Sigues estadísticas, analizas partidos o apuestas y quieres entender de dónde sale la información que circula. Conoce el método periodístico para contrastar versiones y leer el mercado con criterio.",
  },
  {
    id: "fans",
    tab: "Fans",
    kicker: "Fans del fútbol",
    title: "Vive el mercado\ndesde otro lugar.",
    body: "Sigues cada ventana, debates cada pase y quieres entender qué hay detrás de un rumor. Entra en la lógica de las fuentes, los tiempos y las negociaciones.",
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
    a: "No. El curso está pensado tanto para quienes quieren empezar como para quienes ya cubren fútbol y buscan especializarse. También puedes hacerlo si quieres entender mejor el mercado de pases.",
  },
  {
    q: "¿Cómo se cursa?",
    a: "Los módulos son grabados y puedes avanzar a tu ritmo. La modalidad VIP suma encuentros en vivo y espacios de consulta.",
  },
  {
    q: "¿Anotarme en la lista reserva una vacante?",
    a: "La lista te permite recibir el aviso de apertura. No es una compra ni una inscripción al curso.",
  },
  {
    q: "¿Cuándo voy a recibir novedades?",
    a: "Te vamos a escribir cuando esté confirmada la apertura, con la información del curso y las opciones de inscripción.",
  },
] as const;

export const faqVenta = [
  {
    q: "¿Necesito experiencia en periodismo?",
    a: "No. El curso está pensado tanto para quienes quieren empezar como para quienes ya cubren fútbol y buscan especializarse. También puedes hacerlo si quieres entender mejor el mercado de pases.",
  },
  {
    q: "¿Cómo se cursa?",
    a: "Los módulos son grabados y puedes avanzar a tu ritmo. La modalidad VIP suma encuentros en vivo y espacios de consulta.",
  },
  {
    q: "¿Hasta cuándo tengo acceso?",
    a: "El acceso al curso es de por vida. Puedes volver a las clases y los materiales cuando lo necesites.",
  },
  {
    q: "¿Puedo pagar en cuotas?",
    a: "Las opciones disponibles dependen de tu país y del medio de pago. Puedes consultarlas en Hotmart antes de confirmar la compra.",
  },
  {
    q: "¿Qué pasa si el curso no es para mí?",
    a: "Tienes 7 días desde la compra para solicitar la devolución a través de Hotmart.",
  },
] as const;

export const courseFacts = [
  { strong: "6 módulos", span: "26 lecciones" },
  { strong: "Online", span: "y a tu ritmo" },
  { strong: "+45 materiales", span: "para aplicar" },
] as const;

export const pricingPlans = [
  {
    id: "standard" as const,
    label: "Curso completo",
    name: "Standard",
    price: "174",
    features: [
      "Los 6 módulos del curso",
      "Materiales descargables y quizzes",
      "Acceso al Discord público",
      "Certificado firmado por César",
      "Una actualización del curso por año",
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
