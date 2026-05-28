type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
    introEyebrow: string;
    introTitle: string;
    introPills: readonly string[];
  } & Required<TSection>;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "ALVIN CODER",
    fullName: "Fiston Alvin",
    email: "fistonalvin@gmail.com",
  },
  hero: {
    name: "Alvin Fiston",
    p: [
      "Full Stack Developer · I build web apps & software systems,",
      "sell trading bots, and mentor developers — Kigali, Rwanda.",
    ],
  },
  contact: {
    p: "Get in touch",
    h2: "Contact.",
    introEyebrow: "You're exactly where you need to be",
    introTitle:
      "Got ideas, goals, or markets to automate — I've got you covered.",
    introPills: [
      "Idea → product",
      "Websites & systems",
      "Learn how to code",
      "Coding mentor",
      "Expert Advisors & bots",
    ] as const,
    content:
      "Tell me what's on your mind: a build you need shipped, a skill you want to learn, mentorship to level up faster, or a proven Forex EA you can rely on — I'm here.",
    form: {
      name: {
        span: "Your Name",
        placeholder: "What's your name?",
      },
      email: { span: "Your Email", placeholder: "What's your email?" },
      message: {
        span: "Your Message",
        placeholder: "What do you want to say?",
      },
    },
  },
  sections: {
    about: {
      p: "Introduction",
      h2: "Overview.",
      content: `Full Stack Developer building web apps and software systems that solve real problems. I work with TypeScript, React, and Node.js to deliver clean, scalable solutions. I also mentor developers 1-on-1 and sell trading bots — automated programs that trade Forex on your behalf, 24/7, while you sleep.`,
    },
    experience: {
      p: "What I have done so far",
      h2: "Work Experience.",
    },
    feedbacks: {
      p: "What others say",
      h2: "Testimonials.",
    },
    works: {
      p: "My work",
      h2: "Projects.",
      content: `Following projects showcases my skills and experience through
    real-world examples of my work. Each project is briefly described with
    links to code repositories and live demos in it. It reflects my
    ability to solve complex problems, work with different technologies,
    and manage projects effectively.`,
    },
  },
};
