"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.education": "Education",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "Hello, I'm",
    "hero.title": "Fullstack Developer | Backend Developer",
    "hero.description":
      "Systems Engineer passionate about technology, software development and problem solving. Experienced in building scalable applications using modern web technologies and clean architecture principles.",
    "hero.downloadCV": "Download CV",
    "hero.viewProjects": "View Projects",
    "hero.status": "Available for hire",

    // About
    "about.title": "About Me",
    "about.subtitle": "Player Profile",
    "about.description":
      "I'm a Systems Engineer passionate about technology and problem solving. My goal is to become a highly skilled professional and contribute to the development of innovative software solutions. I have strong knowledge in programming, databases, networking, security and software development. I adapt quickly to new technologies and enjoy learning continuously.",
    "about.stats.experience": "Years XP",
    "about.stats.projects": "Projects",
    "about.stats.technologies": "Tech Stack",

    // Experience
    "experience.title": "Experience",
    "experience.subtitle": "Quest Log",
    "experience.present": "Present",

    // Skills
    "skills.title": "Skills",
    "skills.subtitle": "Power Stats",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools & DevOps",

    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "Achievement Unlocked",
    "projects.viewDemo": "Live Demo",
    "projects.viewCode": "Source Code",

    // Education
    "education.title": "Education",
    "education.subtitle": "Training Completed",

    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Send Message",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.whatsapp": "Message on WhatsApp",
    "contact.success": "Message sent successfully!",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "your@email.com",
    "contact.messagePlaceholder": "Write your message here...",

    // Footer
    "footer.rights": "All rights reserved",
    "footer.madeWith": "Made with",

    // Game
    "game.title": "BONUS STAGE",
    "game.subtitle":
      "Take a break and play a classic! Destroy all invaders to win.",
    "game.controls": "Use arrow keys or A/D to move, SPACE to shoot",
    "game.controlsMobile": "On mobile: tap to shoot, drag to move",
    "game.start": "START GAME",
    "game.playAgain": "PLAY AGAIN",
    "game.easterEgg": "Click me!",
    "game.hint": "Try clicking me...",
    "game.secretTitle": "ACHIEVEMENT UNLOCKED!",
    "game.secretMsg": "You found the secret invader!",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.experience": "Experiencia",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.education": "Educación",
    "nav.contact": "Contacto",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.title": "Desarrollador Fullstack | Backend Developer",
    "hero.description":
      "Ingeniero de sistemas apasionado por la tecnología, el desarrollo de software y la resolución de problemas. Experiencia construyendo aplicaciones escalables usando tecnologías modernas y principios de arquitectura limpia.",
    "hero.downloadCV": "Descargar CV",
    "hero.viewProjects": "Ver Proyectos",
    "hero.status": "Disponible para contratar",

    // About
    "about.title": "Sobre Mí",
    "about.subtitle": "Perfil del Jugador",
    "about.description":
      "Soy ingeniero de sistemas apasionado por la tecnología y la resolución de problemas. Mi objetivo es convertirme en un profesional altamente capacitado y contribuir al desarrollo de soluciones innovadoras. Tengo conocimientos en programación, bases de datos, redes, seguridad informática y desarrollo de software. Me adapto rápidamente a nuevas tecnologías y disfruto aprender constantemente.",
    "about.stats.experience": "Años XP",
    "about.stats.projects": "Proyectos",
    "about.stats.technologies": "Tech Stack",

    // Experience
    "experience.title": "Experiencia",
    "experience.subtitle": "Registro de Misiones",
    "experience.present": "Presente",

    // Skills
    "skills.title": "Habilidades",
    "skills.subtitle": "Estadísticas de Poder",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Herramientas y DevOps",

    // Projects
    "projects.title": "Proyectos",
    "projects.subtitle": "Logros Desbloqueados",
    "projects.viewDemo": "Ver Demo",
    "projects.viewCode": "Ver Código",

    // Education
    "education.title": "Educación",
    "education.subtitle": "Entrenamiento Completado",

    // Contact
    "contact.title": "Contacto",
    "contact.subtitle": "Enviar Mensaje",
    "contact.name": "Nombre",
    "contact.email": "Correo",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.whatsapp": "Mensaje por WhatsApp",
    "contact.success": "Mensaje enviado exitosamente!",
    "contact.namePlaceholder": "Tu nombre",
    "contact.emailPlaceholder": "tu@correo.com",
    "contact.messagePlaceholder": "Escribe tu mensaje aquí...",

    // Footer
    "footer.rights": "Todos los derechos reservados",
    "footer.madeWith": "Hecho con",

    // Game
    "game.title": "ETAPA BONUS",
    "game.subtitle":
      "Toma un descanso y juega un clásico! Destruye todos los invasores para ganar.",
    "game.controls":
      "Usa las flechas o A/D para moverte, ESPACIO para disparar",
    "game.controlsMobile":
      "En móvil: toca para disparar, arrastra para moverte",
    "game.start": "INICIAR JUEGO",
    "game.playAgain": "JUGAR DE NUEVO",
    "game.easterEgg": "Haz clic!",
    "game.hint": "Intenta hacerme clic...",
    "game.secretTitle": "LOGRO DESBLOQUEADO!",
    "game.secretMsg": "Encontraste al invasor secreto!",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-language") as Language;
    if (saved && (saved === "es" || saved === "en")) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("portfolio-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
