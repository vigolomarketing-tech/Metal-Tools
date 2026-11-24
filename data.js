// CONFIG — Metal Tools (demo Vigolo Web Studio)
// Todo lo que cambia de un comercio a otro vive acá.
// Lo marcado con "PENDIENTE CLIENTE" hay que confirmarlo con el dueño.

const CONFIG = {
  negocio: {
    nombre: "Metal Tools",
    rubro: "Maquinaria industrial",
    localidad: "Arroyito, Córdoba",
    eslogan: "Soluciones que potencian tu industria",
    bajada:
      "Somos importadores directos de aparejos eléctricos, punzonadoras y máquinas para tu taller. Stock con entrega inmediata, financiación a 120 días y envíos a todo el país.",
    logo: "img/logo-mark.webp",
    logoCompleto: "img/logo-completo.webp",
  },

  colores: {
    primario: "#EDB253", // ámbar del logo
    primarioOscuro: "#D79A2F",
    tinta: "#1E2026",
    acero: "#4A4D55",
    crema: "#FBF6EC",
  },

  contacto: {
    whatsapp: "5493518733225", // 549 + área 351 + 8733225
    mensajeWhatsapp: "¡Hola Metal Tools! Vi su web y quería consultar por una máquina.",
    telefono: "+54 9 3518 73-3225",
    telefonoLink: "+5493518733225",
    instagram: "https://instagram.com/metaltools__",
    instagramUser: "@metaltools__",
    facebook: "", // PENDIENTE CLIENTE: link de la página "METAL TOOLS" de Facebook
    email: "", // PENDIENTE CLIENTE
    direccion: "Rivadavia 332, Oficina 5, Arroyito, Córdoba",
    mapsEmbed:
      "https://www.google.com/maps?q=Rivadavia+332,+Arroyito,+C%C3%B3rdoba,+Argentina&output=embed",
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Rivadavia+332,+Arroyito,+C%C3%B3rdoba,+Argentina",
  },

  // 0 = domingo ... 6 = sábado
  horarios: {
    0: [],
    1: [["09:00", "18:00"]],
    2: [["09:00", "18:00"]],
    3: [["09:00", "18:00"]],
    4: [["09:00", "18:00"]],
    5: [["09:00", "18:00"]],
    6: [],
  },
  horariosTexto: "Lunes a viernes de 9:00 a 18:00",

  beneficios: [
    { icono: "ship", titulo: "Importadores directos", texto: "Sin intermediarios: traemos las máquinas nosotros y llegás al mejor precio." },
    { icono: "box", titulo: "Stock con entrega inmediata", texto: "Equipos disponibles para que tu taller no frene esperando." },
    { icono: "card", titulo: "Financiación a 120 días", texto: "Equipá tu taller hoy y pagalo en cómodos plazos." },
    { icono: "truck", titulo: "Envíos a todo el país", texto: "Despachamos desde Arroyito a donde estés, con seguimiento." },
  ],

  // Cada producto sale de acá. foto: "producto" = foto de catálogo sobre fondo claro, "taller" = foto real a pantalla completa
  productos: [
    {
      id: "aparejos",
      nombre: "Aparejos eléctricos",
      etiqueta: "Elevación",
      resumen: "De cable de acero, para grúas monoviga, puentes, pórticos y grúas de brazo. De 3, 5 y 10 toneladas.",
      descripcion:
        "Equipo compacto y versátil de elevación, ideal para montarse en grúas de una sola viga, puentes, pórticos y grúas de brazo. Optimiza la eficiencia laboral y mejora las condiciones de trabajo en entornos industriales que requieren carga y descarga constante.",
      foto: "producto",
      imagen: "img/aparejo-verde.webp",
      imagen2: "img/aparejo-kit.webp",
      alt: "Aparejo eléctrico industrial verde con carro de traslación, gancho y control pendiente",
      destacados: ["3, 5 y 10 toneladas", "Control remoto y pendiente", "Carro de traslación eléctrico incluido"],
      specs: [
        ["Capacidad", "3 t · 5 t · 10 t"],
        ["Altura de elevación", "6 m · 9 m · 12 m"],
        ["Velocidad de elevación", "8 | 0,8 m/min (velocidad doble)"],
        ["Cable de acero", "15 mm"],
        ["Alimentación", "380 V · 50 Hz · trifásica"],
        ["Comando", "Controlador remoto y pendiente"],
        ["Incluye", "Carro de traslación eléctrico"],
      ],
    },
    {
      id: "punzonadora",
      nombre: "Punzonadora industrial",
      etiqueta: "Punzonado y cizallado",
      resumen: "Máquina multifuncional de punzonado y cizallado: perforaciones precisas y cortes limpios en menos tiempo.",
      descripcion:
        "Combina punzonado y cizallado en una sola unidad versátil y eficiente. Diseñada para ofrecer alta precisión y productividad, es ideal para el procesamiento de láminas, placas y perfiles metálicos.",
      foto: "producto",
      imagen: "img/punzonadora.webp",
      alt: "Punzonadora y cizalladora industrial roja y negra con motor y tablero de comando",
      destacados: ["Punzonado + cizallado en uno", "Láminas, placas y perfiles", "Alta precisión y productividad"],
      specs: [
        ["Funciones", "Punzonado y cizallado"],
        ["Material", "Láminas, placas y perfiles metálicos"],
        ["Capacidad y potencia", "Consultá el modelo que necesitás"], // PENDIENTE CLIENTE: ficha técnica
      ],
    },
    {
      id: "removedora",
      nombre: "Removedora de cintas de frenos",
      etiqueta: "Taller mecánico",
      resumen: "Agilizá las reparaciones de frenos: extraé remaches de forma rápida, limpia y precisa.",
      descripcion:
        "Dejá atrás el trabajo manual pesado. La removedora de cintas de frenos Metal Tools extrae los remaches de forma rápida, limpia y precisa, con menos tiempo por trabajo y más productividad para tu taller. Con tablero de comando digital.",
      foto: "taller",
      imagen: "img/removedora.webp",
      alt: "Removedora de cintas de frenos Metal Tools con tablero de comando digital",
      destacados: ["Menos tiempo por trabajo", "Tablero de comando digital", "Más productividad para tu taller"],
      specs: [
        ["Uso", "Remoción de cintas y remaches de frenos"],
        ["Comando", "Tablero digital con llave"],
        ["Medidas y potencia", "Consultá por WhatsApp"], // PENDIENTE CLIENTE: ficha técnica
      ],
    },
  ],

  configurador: {
    capacidades: [3, 5, 10], // toneladas
    alturas: [6, 9, 12], // metros
  },

  pasos: [
    { titulo: "Escribinos", texto: "Contanos qué máquina necesitás por WhatsApp. Sin vueltas." },
    { titulo: "Te asesoramos y cotizamos", texto: "Te ayudamos a elegir el equipo justo para tu taller y te pasamos el presupuesto." },
    { titulo: "Financiás y te lo enviamos", texto: "Pagalo hasta en 120 días y lo despachamos a todo el país." },
  ],

  galeria: [
    { imagen: "img/taller-aparejos.webp", titulo: "Aparejos en stock", texto: "Equipos listos para despachar.", alt: "Fila de aparejos eléctricos verdes en el depósito de Metal Tools" },
    { imagen: "img/taller-punzonadoras.webp", titulo: "Punzonadoras listas", texto: "Entrega inmediata y envíos a todo el país.", alt: "Punzonadoras industriales rojas alineadas en el depósito" },
  ],

  seo: {
    titulo: "Maquinaria industrial en Arroyito | Metal Tools",
    descripcion:
      "Importadores directos de aparejos eléctricos, punzonadoras y removedoras de frenos en Arroyito, Córdoba. Stock inmediato, 120 días de financiación y envíos al país.",
    ogImage: "img/og.jpg",
    tipoSchema: "Store",
  },
};
