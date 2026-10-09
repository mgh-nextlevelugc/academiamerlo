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
    a: "Los módulos son grabados y puedes avanzar a tu ritmo. La modalidad VIP suma encuentros en vivo y espacios de consulta.",
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
    q: "¿Necesito experiencia en periodismo?",
    a: "No. El programa está pensado tanto para quienes quieren empezar como para quienes ya cubren fútbol y buscan especializarse. También puedes hacerlo si quieres entender mejor el mercado de pases.",
  },
  {
    q: "¿Cómo funciona?",
    a: "Los módulos son grabados y puedes avanzar a tu ritmo. La modalidad VIP suma encuentros en vivo y espacios de consulta.",
  },
  {
    q: "¿Hasta cuándo tengo acceso?",
    a: "El acceso al programa es de por vida. Puedes volver a las clases y los materiales cuando lo necesites.",
  },
  {
    q: "¿Puedo pagar en cuotas?",
    a: "Las opciones disponibles dependen de tu país y del medio de pago. Puedes consultarlas en Hotmart antes de confirmar la compra.",
  },
  {
    q: "¿Qué pasa si el programa no es para mí?",
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
