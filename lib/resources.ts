export const questions = [
  {
    title: "¿Qué necesito para una primera consulta?",
    answer: "Prepara un resumen breve con los hechos, las fechas importantes y los documentos que ya tienes. Si te notificaron una resolución o hay una audiencia próxima, indícalo al escribir. Puedes comenzar aunque todavía te falten antecedentes.",
  },
  {
    title: "¿Puedo solicitar una reunión virtual?",
    answer: "Sí. Selecciona videollamada al solicitar la reunión y, si quieres, indica una fecha y una franja horaria de preferencia. La reunión se coordina una vez confirmada la disponibilidad del estudio.",
  },
  {
    title: "¿Cómo se definen los honorarios?",
    answer: "La propuesta depende del alcance del encargo, los antecedentes y las gestiones que requiera el caso. Puedes solicitar una evaluación y revisar la propuesta de honorarios antes de contratar.",
  },
] as const;

export const guides = [
  {
    slug: "preparar-un-reclamo",
    category: "Defensa institucional",
    title: "Cómo preparar un reclamo ante una institución",
    summary: "Ordena los hechos, identifica a quién corresponde acudir y reúne los documentos que respaldan tu solicitud.",
    sections: [
      { title: "Ordena lo que ocurrió", text: "Escribe una cronología con fechas, personas o entidades involucradas y las respuestas que recibiste. Identifica qué quieres que revise la institución y qué solución estás solicitando." },
      { title: "Reúne los respaldos", text: "Revisa contratos, comprobantes, correos, resoluciones y números de atención. Conserva los originales y reúne copias legibles con nombres que permitan ubicarlas fácilmente." },
      { title: "Comprueba el canal y los plazos", text: "En el sitio oficial del organismo, revisa qué procedimiento corresponde, si exige alguna gestión previa y cómo se cuentan los plazos. Si hay una resolución notificada o más de una vía posible, consulta antes de decidir cómo proceder." },
    ],
    sources: [{ label: "LeyChile · Biblioteca del Congreso Nacional", href: "https://www.bcn.cl/leychile/" }],
  },
  {
    slug: "orientacion-ante-conflictos-laborales",
    category: "Derecho laboral",
    title: "Conflictos laborales: cuándo acudir a la Dirección del Trabajo",
    summary: "Distingue entre una consulta, una denuncia y un reclamo por despido antes de preparar tus antecedentes.",
    sections: [
      { title: "Identifica el tipo de problema", text: "Los problemas con la jornada, las remuneraciones o las condiciones de trabajo pueden requerir una gestión distinta de un reclamo por despido. Revisa los trámites de la Dirección del Trabajo según tu situación." },
      { title: "Prepara la información del trabajo", text: "Ten a mano el contrato, anexos, liquidaciones y comunicaciones pertinentes. Si la relación laboral terminó, identifica la fecha, la forma en que se informó y los documentos que recibiste." },
      { title: "Consulta por la vía adecuada", text: "Revisa los requisitos de ingreso en Mi DT o en la Inspección del Trabajo. Si necesitas evaluar una acción judicial o tienes una fecha próxima, solicita orientación considerando tus antecedentes." },
    ],
    sources: [
      { label: "Dirección del Trabajo · Denuncia laboral", href: "https://www.dt.gob.cl/portal/1626/w3-article-126452.html" },
      { label: "Dirección del Trabajo · Reclamo por despido", href: "https://dt.gob.cl/portal/1626/w3-article-125086.html" },
    ],
  },
  {
    slug: "reclamo-ante-sernac",
    category: "Derechos del consumidor",
    title: "Problemas con una empresa: cómo preparar un reclamo ante el SERNAC",
    summary: "Identifica la compra o servicio, explica qué respuesta buscas y reúne los respaldos antes de reclamar.",
    sections: [
      { title: "Describe la compra o contratación", text: "Indica el nombre de la empresa, la fecha, el producto o servicio y qué ocurrió. Si ya contactaste a la empresa, registra por qué canal lo hiciste y qué respuesta obtuviste." },
      { title: "Adjunta documentos que aclaren el caso", text: "Según corresponda, reúne la boleta, el contrato, capturas de la oferta, correos o números de ticket. Explica con claridad la solución que estás solicitando." },
      { title: "Revisa el canal oficial", text: "El SERNAC dispone de un Portal del Consumidor para ingresar reclamos. Si el problema pertenece a un sector regulado o persiste después de la gestión, conviene revisar qué otras vías pueden corresponder." },
    ],
    sources: [{ label: "SERNAC · Ingresar un reclamo contra una empresa", href: "https://www.sernac.cl/portal/617/w3-article-9178.html" }],
  },
] as const;

export const defenseSteps = [
  { short: "Escucha", title: "Toda defensa comienza escuchando.", text: "En la primera conversación, una persona explica la situación que la trajo al estudio. Identificamos qué necesita, qué le preocupa y si existen fechas que requieren atención." },
  { short: "Antecedentes", title: "Cada detalle ayuda a entender el caso.", text: "Construimos una cronología y revisamos las comunicaciones y los documentos. La información disponible permite identificar qué falta y qué preguntas conviene resolver." },
  { short: "Estrategia", title: "Las alternativas se evalúan antes de decidir.", text: "Con los antecedentes a la vista, el equipo compara vías posibles, explica sus riesgos y define con la persona los siguientes pasos." },
  { short: "Preparación", title: "La estrategia se convierte en acciones.", text: "En este ejemplo se prepara una audiencia. Se ordenan los respaldos y los argumentos, y se conversa con la persona sobre qué esperar en esa etapa." },
  { short: "Seguimiento", title: "Cada decisión abre una nueva etapa.", text: "Después de la audiencia, el equipo explica qué se resolvió y qué gestiones pueden quedar pendientes. Los próximos pasos dependen de los antecedentes y del resultado de cada caso." },
] as const;

export const institutionGroups = [
  { title: "Trabajo y protección social", items: [
    { name: "Dirección del Trabajo", topic: "Relaciones laborales", href: "https://www.dt.gob.cl/" },
    { name: "Superintendencia de Salud", topic: "Isapres, salud y prestadores", href: "https://www.superdesalud.gob.cl/" },
    { name: "Superintendencia de Pensiones", topic: "Pensiones y seguro de cesantía", href: "https://www.spensiones.cl/" },
    { name: "Superintendencia de Seguridad Social", topic: "Licencias médicas y seguridad social", href: "https://www.suseso.cl/" },
  ] },
  { title: "Consumo y servicios", items: [
    { name: "Servicio Nacional del Consumidor", topic: "Protección de consumidores", href: "https://www.sernac.cl/" },
    { name: "Superintendencia de Educación", topic: "Educación escolar", href: "https://www.supereduc.cl/" },
    { name: "Superintendencia de Servicios Sanitarios", topic: "Agua potable y alcantarillado", href: "https://www.siss.gob.cl/" },
    { name: "Superintendencia de Electricidad y Combustibles", topic: "Electricidad, gas y seguridad", href: "https://www.sec.cl/" },
  ] },
  { title: "Estado y regulación", items: [
    { name: "Servicio de Impuestos Internos", topic: "Tributación y obligaciones fiscales", href: "https://www.sii.cl/" },
    { name: "Contraloría General de la República", topic: "Legalidad administrativa y función pública", href: "https://www.contraloria.cl/" },
    { name: "Superintendencia del Medio Ambiente", topic: "Fiscalización ambiental", href: "https://portal.sma.gob.cl/" },
    { name: "Comisión para el Mercado Financiero", topic: "Mercado financiero, valores y seguros", href: "https://www.cmfchile.cl/" },
  ] },
] as const;
