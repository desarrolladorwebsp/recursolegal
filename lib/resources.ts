export const questions = [
  {
    title: "¿Qué áreas del derecho aborda Recurso Legal?",
    answer: "Ofrecemos asesoría y representación jurídica en distintas áreas del derecho, brindando soluciones integrales y personalizadas a personas y empresas.",
  },
  {
    title: "¿Cómo puedo agendar una consulta jurídica?",
    answer: "Puedes agendar una consulta a través de nuestro sitio web o escribiendo a contacto@recursolegal.cl. Nuestro equipo te orientará para coordinar tu atención.",
  },
  {
    title: "¿La primera consulta jurídica tiene algún costo?",
    answer: "El valor de la consulta será informado previamente, considerando la naturaleza del asunto y la especialidad jurídica requerida.",
  },
  {
    title: "¿En qué consiste la primera consulta con un abogado?",
    answer: "Analizamos tus antecedentes, aclaramos tus dudas y evaluamos las alternativas jurídicas disponibles para proteger tus derechos e intereses.",
  },
  {
    title: "¿Cómo se determinan los honorarios profesionales?",
    answer: "Los honorarios se establecen considerando la naturaleza, complejidad y alcance del servicio requerido, procurando entregar una propuesta clara y transparente.",
  },
  {
    title: "¿Existen facilidades y modalidades de pago?",
    answer: "Las modalidades y facilidades de pago podrán acordarse según las características del servicio contratado y las condiciones de cada caso.",
  },
  {
    title: "¿Ofrecen atención presencial y asesoría jurídica en línea?",
    answer: "Sí. Contamos con atención presencial en Santiago y Ñuñoa, además de atención virtual, facilitando el acceso a nuestros servicios jurídicos.",
  },
  {
    title: "¿Pueden representarme en cualquier región de Chile?",
    answer: "Sí. Brindamos asesoría y representación jurídica a personas y empresas de todo Chile, considerando las particularidades de cada asunto.",
  },
  {
    title: "¿Mi información está protegida por el secreto profesional?",
    answer: "Sí. La información que nos confíes será tratada con estricta confidencialidad, respetando el secreto profesional y las obligaciones legales y éticas correspondientes.",
  },
  {
    title: "¿Quién estará a cargo de mi caso?",
    answer: "Tu caso será atendido por profesionales con conocimientos y experiencia en el área jurídica correspondiente, procurando una atención cercana, responsable y personalizada.",
  },
  {
    title: "¿Cuánto tiempo puede durar mi procedimiento y cuáles son sus posibilidades de éxito?",
    answer: "La duración y las posibilidades de éxito dependen de las circunstancias de cada caso. Nuestro equipo evaluará tus antecedentes y te entregará una orientación objetiva y realista, sin garantizar resultados.",
  },
  {
    title: "¿Cómo podré conocer el estado y los avances de mi causa?",
    answer: "Mantendremos una comunicación contigo a través de los canales acordados, informándote sobre los avances relevantes de tu causa y las actuaciones que correspondan.",
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
  { phase: "Te escuchamos", label: "Conversación inicial", title: "Toda defensa comienza escuchando.", text: "Conocemos tu situación y lo que necesitas. Una conversación clara, respetuosa y confidencial es nuestro punto de partida." },
  { phase: "Los antecedentes", label: "Estudio de antecedentes", title: "Los hechos importan. Cada detalle también.", text: "Reunimos y estudiamos los antecedentes disponibles para comprender el contexto, identificar información relevante y preparar los siguientes pasos." },
  { phase: "Estrategia y defensa", label: "Trabajo estratégico", title: "Una defensa preparada, no improvisada.", text: "Nuestro equipo evalúa los antecedentes, contrasta alternativas y construye una estrategia de defensa ajustada a las circunstancias del caso." },
  { phase: "Vamos a audiencia", label: "Ingreso a audiencia", title: "La preparación nos acompaña.", text: "Llegamos a la audiencia con una estrategia fundada, un equipo preparado y el compromiso de defender tus derechos en cada intervención." },
  { phase: "Ganamos", label: "Resultado ficticio favorable", title: "Un resultado favorable. Una historia posible.", text: "En esta simulación ficticia, el tribunal dicta una resolución favorable tras escuchar los argumentos y examinar los antecedentes. Cada caso real es distinto y ningún resultado está garantizado." },
] as const;
