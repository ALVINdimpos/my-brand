import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TTestimonial,
  TProject,
} from "../types";

import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  adminatete,
  imena,
  bizcotap,
  sseindelvery,
  sseincargo,
  sseinsante,
  threejs,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "Development",
    subtitle: "Software · Web · Systems",
    tag: "Build",
    description:
      "End-to-end engineering — from sleek marketing sites to full-blown business systems and custom software tailored to your workflow.",
    highlights: [
      "Software development (desktop & cross-platform apps)",
      "Website development (landing, e-commerce, dashboards)",
      "System development (ERPs, internal tools, APIs)",
    ],
    iconType: "code",
    accentFrom: "#00cea8",
    accentTo: "#2f80ed",
  },
  {
    title: "Mentorship",
    subtitle: "1-on-1 Coding Coach",
    tag: "Teach",
    description:
      "Learn to code with a real builder. Personalized roadmaps, live pair-programming, and project-based mentorship to get you from zero to shipping.",
    highlights: [
      "Beginner-friendly intro to programming",
      "Modern web stack (React, Node, TypeScript)",
      "Career guidance, portfolio & interview prep",
    ],
    iconType: "mentor",
    accentFrom: "#f5af19",
    accentTo: "#f12711",
  },
  {
    title: "Trading Bots",
    subtitle: "I Sell Trading Bots for MT4 / MT5",
    tag: "Trade",
    description:
      "I sell trading bots — automated programs you install on MT4 or MT5 that trade Forex for you, 24/7. No manual work, no emotions, just your account running on autopilot while you sleep.",
    highlights: [
      "TINGA TINGA ROBOT — adaptive trend strategy",
      "PIPS GHOST ROBOT EA V7 — precision scalper",
      "Setup, optimization & lifetime updates",
    ],
    iconType: "bot",
    accentFrom: "#bf61ff",
    accentTo: "#ec008c",
  },
];

const technologies: TTechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences: TExperience[] = [
  {
    title: "Full Stack Developer",
    companyName: "Imena Softek Ltd",
    icon: imena,
    iconBg: "#383E56",
    date: "Jul 2023 - Dec 2023",
    points: [
      "Engineered and sustained web applications utilizing React.js and allied technologies.",
      "Collaborated seamlessly with cross-functional teams, comprising designers, product managers, and fellow developers, to craft top-notch products.",
      "Executed responsive design techniques, ensuring optimal cross-browser compatibility.",
      "Participated actively in code reviews, offering constructive feedback to enhance the overall development process.",
    ],
  },
  {
    title: "Full Stack Developer",
    companyName: "Bizcotap",
    icon: bizcotap,
    iconBg: "#383E56",
    date: "November 2023 - Present",
    points: [
      "Developed and sustained web applications leveraging React.js and other pertinent technologies.",
      "Worked collaboratively within cross-functional teams, engaging with designers, product managers, and fellow developers to deliver high-caliber products.",
      "Implemented responsive design principles, guaranteeing optimal cross-browser performance.",
      "Played a pivotal role in code reviews, offering valuable feedback to fellow developers for continual improvement.",
    ],
  },
  {
    title: "Full Stack Developer",
    companyName: "ADMINATETE",
    icon: adminatete,
    iconBg: "#E6DEDD",
    date: "Aug 2023 - Present",
    points: [
      "Championed the development and maintenance of web applications, utilizing React.js and other cutting-edge technologies.",
      "Collaborated seamlessly with cross-functional teams, including designers, product managers, and developers, to deliver premium-quality products.",
      "Implemented responsive design strategies, ensuring a seamless experience across various browsers.",
      "Engaged actively in code reviews, contributing constructive feedback to foster a collaborative and high-performing development culture.",
    ],
  },
];


const testimonials: TTestimonial[] = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Alvin proved me wrong.",
    name: "Harerimana Hussein",
    designation: "CEO",
    company: "Ssein Inc",
    image: "",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Alvin does.",
    name: "Fredrick Mwizerwa",
    designation: "COO",
    company: "The eye visibility magazine",
    image: "",
  },
  {
    testimonial:
      "After Alvin optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Rwanda Art Council",
    designation: "ORG",
    company: "RAC",
    image: "",
  },
];

const projects: TProject[] = [
  {
    name: "SSEIN DELIVERY",
    category: "Delivery Platform",
    description:
      "A landing page for a delivery app that allows users to order food, groceries, and other items from local stores and have them delivered to their door.",
    image: sseindelvery,
    sourceCodeLink: "https://github.com/ALVINdimpos",
    liveSiteLink: "",
  },
  {
    name: "SSEIN CARGO",
    category: "Logistics System",
    description:
      "Robust and user-friendly web application designed to streamline and optimize cargo management processes. Tailored for businesses involved in logistics, shipping, and transportation.",
    image: sseincargo,
    sourceCodeLink: "https://github.com/ALVINdimpos",
    liveSiteLink: "",
  },
  {
    name: "SSEIN SANTE",
    category: "Healthcare App",
    description:
      "A web application that allows users to book appointments with doctors, view their medical records, and chat with doctors online.",
    image: sseinsante,
    sourceCodeLink: "https://github.com/ALVINdimpos",
    liveSiteLink: "",
  },
];

export { services, technologies, experiences, testimonials, projects };
