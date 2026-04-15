export const personalInfo = {
  name: "Juan David Torres Barreto",
  title: {
    en: "Fullstack Developer | Backend Developer",
    es: "Desarrollador Fullstack | Backend Developer",
  },
  email: "judatoba02@gmail.com",
  phone: "+57 3142484885",
  location: "Villavicencio, Meta, Colombia",
  github: "https://github.com/juandavidtb02",
  linkedin: "https://www.linkedin.com/in/juan-david-torres-barreto-62a786255/",
  whatsapp: "https://wa.me/573142484885",
};

export const experiences = [
  {
    id: 1,
    company: "ENTERNOVA SAS",
    position: {
      en: "Backend Developer",
      es: "Desarrollador Backend",
    },
    startDate: "2025-04",
    endDate: null,
    description: {
      en: "Developed REST APIs using .NET 8 following Clean Architecture principles with microservices architectural style. Worked in Scrum teams using Azure DevOps for CI/CD pipelines, backlog management and project tracking.",
      es: "Desarrollé APIs REST usando .NET 8 siguiendo principios de Clean Architecture con estilo arquitectónico de microservicios. Trabajé en equipos Scrum utilizando Azure DevOps para CI/CD, gestión de backlog y seguimiento del proyecto.",
    },
    technologies: [
      ".NET 8",
      "C#",
      "REST API",
      "Azure DevOps",
      "Clean Architecture",
      "Scrum",
    ],
  },
  {
    id: 2,
    company: "IGNICION GAMES S.A",
    position: {
      en: "Web Developer",
      es: "Desarrollador Web",
    },
    startDate: "2023-12",
    endDate: "2025-01",
    description: {
      en: "Worked as a frontend developer using ReactJS, Next.js and TypeScript to build optimized interfaces integrated with RESTful APIs.",
      es: "Trabajé como desarrollador frontend utilizando ReactJS, Next.js y TypeScript para construir interfaces optimizadas integradas con APIs REST.",
    },
    technologies: ["ReactJS", "Next.js", "TypeScript", "REST API"],
  },
  {
    id: 3,
    company: "MERCAORINOQUIA",
    position: {
      en: "Fullstack Developer",
      es: "Desarrollador Fullstack",
    },
    startDate: "2023-04",
    endDate: "2024-12",
    description: {
      en: "Developed a web platform connecting farmers with consumers using Django REST Framework and React with TailwindCSS.",
      es: "Desarrollé una plataforma web que conecta campesinos con consumidores usando Django REST Framework y React con TailwindCSS.",
    },
    technologies: ["Django", "ReactJS", "TailwindCSS", "PostgreSQL"],
  },
  {
    id: 4,
    company: "DENTISTORE",
    position: {
      en: "Fullstack Developer",
      es: "Desarrollador Fullstack",
    },
    startDate: "2022-07",
    endDate: "2022-12",
    description: {
      en: "Built an online dental store with product pages, cart and checkout flow using Django REST API and React frontend.",
      es: "Desarrollé una tienda online de productos odontológicos con carrito y proceso de compra usando Django REST API y React.",
    },
    technologies: ["Django", "ReactJS", "REST API"],
  },
];

export const skills = {
  frontend: [
    { name: "ReactJS", level: 90 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "REST APIs", level: 90 },
  ],
  backend: [
    { name: ".NET Core", level: 90 },
    { name: "C#", level: 85 },
    { name: "Python", level: 80 },
    { name: "Django", level: 80 },
    { name: "PostgreSQL", level: 85 },
    { name: "MySQL", level: 80 },
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 80 },
    { name: "Azure DevOps", level: 75 },
    { name: "Clean Architecture", level: 85 },
  ],
};

export const projects = [
  {
    id: 1,
    name: "MERCAORINOQUIA",
    description: {
      en: "Web platform that connects farmers with consumers, allowing the publication of ads and sale of agricultural products. Complete system with user, product and transaction management.",
      es: "Plataforma web que conecta agricultores con consumidores, permitiendo la publicación de anuncios y venta de productos agrícolas. Sistema completo con gestión de usuarios, productos y transacciones.",
    },
    technologies: ["Django", "React", "PostgreSQL", "TailwindCSS"],
    image: "/mercaorinoquia.png",
    demoUrl: "https://mercaorinoquia.netlify.app/",
    repoUrl: "https://github.com/DanielAlferez/Mercaorinoquia-Backend",
  },
  {
    id: 2,
    name: "DENTISTORE",
    description: {
      en: "Online store specialized in dental products with responsive design. Includes shopping cart, inventory management and integrated payment system.",
      es: "Tienda en línea especializada en productos dentales con diseño responsive. Incluye carrito de compras, gestión de inventario y sistema de pagos integrado.",
    },
    technologies: ["Django", "React", "MySQL", "Bootstrap"],
    image: "/dentistore.png",
    demoUrl: "https://dentistore.netlify.app/",
    repoUrl: "https://github.com/juandavidtb02/Backend-dentistore",
  },
  {
    id: 3,
    name: "Tour de Francia App",
    description: {
      en: "Monolithic web application developed in PHP with PostgreSQL for Tour de France information management. Includes dynamic pages built with HTML, CSS and vanilla JavaScript.",
      es: "Aplicación web monolítica desarrollada en PHP con PostgreSQL para la gestión de información del Tour de Francia. Incluye páginas dinámicas construidas con HTML, CSS y JavaScript vanilla.",
    },
    technologies: ["PHP", "PostgreSQL", "HTML", "CSS", "JavaScript"],
    image: "/tourfrancia.jpg",
    demoUrl: "#",
    repoUrl: "https://github.com/juandavidtb02/tour-francia-php",
  },
  {
    id: 4,
    name: "Interactive Portfolio",
    description: {
      en: "Personal developer portfolio with retro arcade design, gamified achievement system, bilingual support, animated background, and contact form with email integration.",
      es: "Portafolio personal con diseño retro arcade, sistema de logros estilo videojuegos, soporte bilingüe, fondo animado y formulario de contacto con integración de email.",
    },
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Resend"],
    image: "/portafolio.png",
    demoUrl: "https://jdtb-portfolio-v2-mu.vercel.app/",
    disableDemoButton: true,
    repoUrl: "https://github.com/juandavidtb02/jdtb-portfolio-v2",
  },
];

export const education = [
  {
    id: 1,
    institution: "Universidad de los Llanos",
    program: {
      en: "Systems Engineer",
      es: "Ingeniero de Sistemas",
    },
    startDate: "2019",
    endDate: "2024",
  },
  {
    id: 2,
    institution: "Escuela Normal Superior de Villavicencio",
    program: {
      en: "Academic Bachelor with emphasis in Pedagogy",
      es: "Bachiller Académico con énfasis en Pedagogía",
    },
    startDate: "2013",
    endDate: "2018",
  },
];

export const extracurricular = [
  {
    id: 1,
    role: {
      en: "Data Structures Programming Tutor",
      es: "Tutor de Programación en Estructuras de Datos",
    },
    organization: "Universidad de los Llanos",
  },
  {
    id: 2,
    role: {
      en: "Frontend Developer — Scrib App",
      es: "Desarrollador Frontend — Scrib App",
    },
    organization: "IGNICION GAMES S.A",
  },
];
