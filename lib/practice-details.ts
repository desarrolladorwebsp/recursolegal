import type { practices } from "./content";

type SpecialtyId = Exclude<(typeof practices)[number]["id"], "institucional">;

export type PracticeDetails = {
  summary: string;
  introduction: string;
  about: string;
  topics: readonly string[];
  reasons: readonly string[];
};

// Textos aprobados en Recurso Legal V18.
export const practiceDetails: Record<SpecialtyId, PracticeDetails> = {
  laboral: {
    summary: "Defensa y asesoría en relaciones de trabajo.",
    introduction: "Estrategia y acompañamiento ante conflictos laborales.",
    about: "Asesoría, prevención y defensa en conflictos laborales, con un enfoque estratégico y práctico.",
    topics: [
      "Despidos y terminación de contrato",
      "Indemnizaciones y finiquitos",
      "Acoso laboral y ambiente de trabajo",
      "Contratos de trabajo",
      "Negociación colectiva y sindicatos",
      "Cumplimiento normativo laboral",
    ],
    reasons: [
      "Protección de derechos laborales",
      "Revisión de plazos y antecedentes",
      "Prevención de conflictos y riesgos",
      "Orientación para trabajadores y empleadores",
    ],
  },
  civil: {
    summary: "Soluciones rigurosas para conflictos y relaciones jurídicas.",
    introduction: "Claridad, preparación y criterio en cada etapa del proceso.",
    about: "Orientación y representación en conflictos patrimoniales, obligaciones y contratos.",
    topics: [
      "Incumplimiento de contratos",
      "Cobro de deudas",
      "Indemnización de perjuicios",
      "Arrendamientos y restitución de inmuebles",
      "Herencias y posesión efectiva",
      "Conflictos de propiedad",
    ],
    reasons: [
      "Protección del patrimonio",
      "Soluciones a conflictos contractuales",
      "Evaluación de alternativas judiciales",
      "Prevención de controversias",
    ],
  },
  penal: {
    summary: "Defensa estratégica y representación jurídica.",
    introduction: "Una defensa sólida comienza con una estrategia diseñada para cada caso.",
    about: "Defensa y representación jurídica durante las distintas etapas del procedimiento penal.",
    topics: [
      "Defensa de imputados",
      "Querellas y representación de víctimas",
      "Delitos contra la propiedad",
      "Delitos económicos",
      "Medidas cautelares",
      "Procedimientos y recursos penales",
    ],
    reasons: [
      "Protección de garantías procesales",
      "Evaluación temprana de antecedentes",
      "Acompañamiento durante el proceso",
      "Estrategia ajustada a cada caso",
    ],
  },
  familia: {
    summary: "Acompañamiento jurídico en asuntos familiares.",
    introduction: "Un enfoque cuidadoso para decisiones que importan.",
    about: "Orientación y acompañamiento en conflictos familiares con atención a las circunstancias de cada persona.",
    topics: [
      "Pensiones de alimentos",
      "Divorcio y compensación económica",
      "Cuidado personal",
      "Relación directa y regular",
      "Violencia intrafamiliar",
      "Filiación y reconocimiento",
    ],
    reasons: [
      "Protección de derechos de niños y familias",
      "Soluciones adaptadas a cada situación",
      "Orientación sobre acuerdos y mediación",
      "Acompañamiento en decisiones sensibles",
    ],
  },
  empresas: {
    summary: "Asesoría jurídica con visión estratégica de negocio.",
    introduction: "Decisiones informadas para proteger y desarrollar proyectos.",
    about: "Asesoría jurídica para la creación, operación y protección de negocios.",
    topics: [
      "Constitución y modificación de sociedades",
      "Contratos comerciales",
      "Gobierno corporativo",
      "Cobranza y conflictos comerciales",
      "Insolvencia y reorganización",
      "Cumplimiento y prevención de riesgos",
    ],
    reasons: [
      "Seguridad jurídica en decisiones comerciales",
      "Prevención de contingencias",
      "Protección de intereses empresariales",
      "Apoyo al crecimiento del negocio",
    ],
  },
  regulatorio: {
    summary: "Orientación jurídica ante exigencias normativas.",
    introduction: "Análisis preventivo y representación en materias regulatorias.",
    about: "Asesoría y representación frente a exigencias normativas y actuaciones de organismos públicos.",
    topics: [
      "Procedimientos administrativos sancionatorios",
      "Permisos y autorizaciones",
      "Fiscalizaciones y multas",
      "Recursos administrativos",
      "Cumplimiento sectorial",
      "Contratación pública",
    ],
    reasons: [
      "Comprensión de obligaciones normativas",
      "Revisión de plazos administrativos",
      "Prevención de sanciones",
      "Defensa frente a actuaciones administrativas",
    ],
  },
};

export function isPracticeTopic(area: string, topic: string) {
  return Object.entries(practiceDetails).some(([id, { topics }]) => id === area && topics.includes(topic));
}
