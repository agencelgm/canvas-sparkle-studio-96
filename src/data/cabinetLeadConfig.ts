// Configuration de la page lead "Cabinets comptables".
// Modifier ici les montants et les liens sans toucher aux composants.

export const cabinetLeadConfig = {
  // Montant affiché comme point de départ de l'accompagnement mensuel.
  anchorMonthly: 405000,
  // En dessous de ce budget mensuel, le lead ne voit pas le calendrier de RDV.
  qualifiedMinBudget: 50000,
  // À partir de ce budget, le lead est marqué "priorite" dans Supabase
  // (répondre "Oui" au budget de 405 000 => priorite).
  priorityMinBudget: 405000,

  ghlCalendarUrl: "https://api.leadconnectorhq.com/widget/booking/xODhTrJbA4RlzuKr4nDr",
  ghlCalendarIframeId: "xODhTrJbA4RlzuKr4nDr_1785529732045",
  ghlEmbedScriptSrc: "https://link.msgsndr.com/js/form_embed.js",

  whatsappChannelUrl: "https://whatsapp.com/channel/0029Va5QvIu6BIEdk2Gbcq0U",

  leadPath: "/cabinets-comptables",
  merciPath: "/cabinets-comptables/merci",
} as const;
