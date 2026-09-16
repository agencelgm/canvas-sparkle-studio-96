// Configuration de la lead page "Agence marketing" et de ses 3 pages de suite.
// Modifier ici les liens (videos, formulaire, calendrier) sans toucher aux composants.

import invitationRendezVousAsset from "@/assets/invitation-rendez-vous.mp4.asset.json";
import reponseBudgetFormationAsset from "@/assets/reponse-budget-formation.mp4.asset.json";

export const leadAgenceConfig = {
  // Formulaire de qualification GoHighLevel.
  ghlFormId: "gh8AD48uUTKRQ2OVU2Hp",
  ghlFormHeight: 1677,
  ghlFormName: "Formulaire de qualification - Lead agence",

  // Calendrier de reservation GoHighLevel.
  ghlCalendarUrl: "https://api.leadconnectorhq.com/widget/booking/xODhTrJbA4RlzuKr4nDr",
  ghlCalendarIframeId: "xODhTrJbA4RlzuKr4nDr_1789562218339",

  ghlEmbedScriptSrc: "https://link.msgsndr.com/js/form_embed.js",

  // Emplacements video : coller ici les liens quand les videos sont pretes.
  // Formats acceptes : YouTube, Vimeo, ou fichier .mp4.
  videos: {
    rendezVous: invitationRendezVousAsset.url,
    rendezVousConfirme: "",
    formation: reponseBudgetFormationAsset.url,
  },

  whatsappUrl: "https://wa.me/2250798172339",
  whatsappChannelUrl: "https://whatsapp.com/channel/0029Va5QvIu6BIEdk2Gbcq0U",

  // Chemins des pages.
  leadPath: "/lead-agence-marketing",
  rendezVousPath: "/lead-agence-marketing/rendez-vous",
  rendezVousConfirmePath: "/lead-agence-marketing/rendez-vous-confirme",
  formationPath: "/lead-agence-marketing/formation",
} as const;

export const formationWhatsappUrl = `${leadAgenceConfig.whatsappUrl}?text=${encodeURIComponent(
  "Bonjour, je veux m'inscrire a la formation publicite Facebook de LGM.",
)}`;

export const rendezVousWhatsappUrl = `${leadAgenceConfig.whatsappUrl}?text=${encodeURIComponent(
  "Bonjour, je viens de remplir le formulaire de qualification et je souhaite reserver un appel.",
)}`;
