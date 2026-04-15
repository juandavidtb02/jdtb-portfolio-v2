export type AchievementId =
  | "scroll_footer"
  | "activate_war"
  | "change_language"
  | "download_cv"
  | "complete_all";

export interface Achievement {
  id: AchievementId;
  icon: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "scroll_footer",
    icon: "🧭",
    name: { en: "Explorer", es: "Explorador" },
    description: {
      en: "Scrolled through the entire page.",
      es: "Recorriste toda la página.",
    },
  },
  {
    id: "activate_war",
    icon: "⚔️",
    name: { en: "War Mode Activated", es: "Modo Guerra Activado" },
    description: {
      en: "Activated the war mode.",
      es: "Activaste el modo guerra.",
    },
  },
  {
    id: "change_language",
    icon: "🌍",
    name: { en: "Polyglot", es: "Políglota" },
    description: {
      en: "Changed the language.",
      es: "Cambiaste el idioma.",
    },
  },
  {
    id: "download_cv",
    icon: "📄",
    name: { en: "Prepared Recruiter", es: "Reclutador Preparado" },
    description: {
      en: "Downloaded the CV.",
      es: "Descargaste el CV.",
    },
  },
  {
    id: "complete_all",
    icon: "👑",
    name: { en: "Platinum", es: "Platinado" },
    description: {
      en: "Unlocked all achievements.",
      es: "Desbloqueaste todos los logros.",
    },
  },
];

export const PREREQUISITE_IDS: AchievementId[] = [
  "scroll_footer",
  "activate_war",
  "change_language",
  "download_cv",
];
