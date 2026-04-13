const questions = [
  {
    day: 1,
    title: "Passion",
    subtitle: "Discover What You Truly Love",
    description: "Let's explore what excites you and brings you joy.",
    color: "#e85d4a",
    bg: "#fff5f3",
    icon: "♥",
    questions: [
      {
        id: 1,
        type: "writing",
        question: "If you could become the best in the world at one thing, what would it be?",
        hint: "Think beyond limits — what truly excites you?",
        suggestions: [
          "Software Developer","UI/UX Designer","Entrepreneur","Content Creator",
          "Writer","Digital Marketer","Data Analyst","Photographer",
          "Public Speaker","Teacher","Artist","Video Creator"
        ]
      },
      {
        id: 2,
        type: "writing",
        question: "What activity makes you lose track of time completely?",
        hint: "Something you enjoy so much that hours feel like minutes.",
        suggestions: [
          "Coding","Designing","Video editing","Writing blogs",
          "Watching tutorials","Gaming","Reading books",
          "Brainstorming ideas","Helping others","Learning new skills"
        ]
      },
      {
        id: 3,
        type: "writing",
        question: "What would you happily do even if you were not paid?",
        hint: "This reveals your true passion.",
        suggestions: [
          "Teaching others","Building projects","Creating content",
          "Helping people","Traveling","Volunteering",
          "Designing","Writing","Mentoring"
        ]
      },
      {
        id: 4,
        type: "multi",
        question: "Which of these activities do you genuinely enjoy?",
        instruction: "Select up to 2",
        options: [
          "Coding","Designing","Teaching","Traveling",
          "Managing people","Content creation","Researching",
          "Planning","Problem-solving","Networking","Other"
        ]
      },
      {
        id: 5,
        type: "multi",
        question: "What type of work excites you the most?",
        instruction: "Select up to 2",
        options: [
          "Building products","Solving problems","Helping others",
          "Leading teams","Exploring ideas","Creating content",
          "Analyzing data","Innovating solutions","Other"
        ]
      },
      {
        id: 6,
        type: "mcq",
        question: "Which of these gives you the deepest satisfaction?",
        options: [
          "Creating something meaningful",
          "Solving complex challenges",
          "Helping people grow",
          "Leading and inspiring others",
          "Expressing creativity",
          "Achieving goals",
          "Other"
        ]
      }
    ]
  },

  {
    day: 2,
    title: "Lifestyle",
    subtitle: "Design Your Ideal Life",
    description: "Let's understand the kind of life you truly want.",
    color: "#f0942a",
    bg: "#fff8f0",
    icon: "☀",
    questions: [
      {
        id: 7,
        type: "writing",
        question: "Describe your ideal daily life.",
        hint: "How do you want your day to look from morning to night?",
        suggestions: [
          "Flexible work","Remote work","Travel lifestyle",
          "Stable routine","Creative environment",
          "Team collaboration","Independent work"
        ]
      },
      {
        id: 8,
        type: "writing",
        question: "Where do you see yourself working?",
        hint: "Think about environment, not just job.",
        suggestions: [
          "Remote","Office","Hybrid","Travel-based",
          "Startup","Corporate","Freelance","Own business"
        ]
      },
      {
        id: 9,
        type: "writing",
        question: "What kind of lifestyle do you dream of?",
        hint: "What does your dream life feel like?",
        suggestions: [
          "Freedom","Luxury","Simple life",
          "Adventurous life","Digital nomad",
          "Financial independence","Balanced life"
        ]
      },
      {
        id: 10,
        type: "multi",
        question: "What do you value the most in life?",
        instruction: "Select up to 2",
        options: [
          "Freedom","Stability","Growth",
          "Comfort","Adventure","Recognition",
          "Independence","Other"
        ]
      },
      {
        id: 11,
        type: "multi",
        question: "Which work environments suit you best?",
        instruction: "Select up to 2",
        options: [
          "Remote","Office","Startup",
          "Corporate","Travel-based",
          "Independent","Collaborative","Other"
        ]
      },
      {
        id: 12,
        type: "mcq",
        question: "If you had to choose one, what matters most?",
        options: [
          "Freedom even with risk",
          "Stability with routine",
          "High income despite pressure",
          "Balanced lifestyle",
          "Creative freedom",
          "Flexible work",
          "Other"
        ]
      }
    ]
  },

  {
    day: 3,
    title: "Skills",
    subtitle: "Understand Your Strengths",
    description: "Let's identify what you are good at.",
    color: "#3a9e6e",
    bg: "#f0fbf5",
    icon: "◈",
    questions: [
      {
        id: 13,
        type: "writing",
        question: "What are you naturally good at?",
        hint: "Things you can do easily compared to others.",
        suggestions: [
          "Problem-solving","Creativity","Communication",
          "Leadership","Coding","Designing"
        ]
      },
      {
        id: 14,
        type: "writing",
        question: "What skills have you developed over time?",
        hint: "",
        suggestions: [
          "Programming","Design","Writing",
          "Public speaking","Marketing",
          "Data analysis","Teamwork"
        ]
      },
      {
        id: 15,
        type: "writing",
        question: "What do people often appreciate about you?",
        hint: "",
        suggestions: [
          "Creativity","Helping nature",
          "Ideas","Hard work",
          "Leadership","Consistency"
        ]
      },
      {
        id: 16,
        type: "multi",
        question: "Which of these skills do you have?",
        instruction: "Select up to 2",
        options: [
          "Technical","Creative","Communication",
          "Leadership","Problem-solving","Analytical","Other"
        ]
      },
      {
        id: 17,
        type: "multi",
        question: "What kind of problems do you enjoy solving?",
        instruction: "Select up to 2",
        options: [
          "Technical","Business","People-related",
          "Creative","Strategy","Optimization","Other"
        ]
      },
      {
        id: 18,
        type: "mcq",
        question: "In a team, which role fits you best?",
        options: [
          "Builder (Doer)",
          "Thinker (Idea generator)",
          "Leader",
          "Supporter",
          "Planner",
          "Coordinator",
          "Other"
        ]
      }
    ]
  },

  {
    day: 4,
    title: "Career",
    subtitle: "Money & Work Style",
    description: "Let's understand how you want to earn and grow.",
    color: "#5b6af0",
    bg: "#f3f4ff",
    icon: "◆",
    questions: [
      {
        id: 19,
        type: "writing",
        question: "How would you ideally like to earn money?",
        hint: "",
        suggestions: [
          "Full-time job","Freelancing",
          "Startup","Content creation",
          "Consulting","Investments"
        ]
      },
      {
        id: 20,
        type: "writing",
        question: "What work would you continue even during tough times?",
        hint: "This shows long-term commitment.",
        suggestions: [
          "Coding","Teaching",
          "Helping others","Building products"
        ]
      },
      {
        id: 21,
        type: "writing",
        question: "What does financial success mean to you?",
        hint: "",
        suggestions: [
          "Freedom","Security",
          "Luxury","Stability",
          "Independence"
        ]
      },
      {
        id: 22,
        type: "multi",
        question: "Which earning methods interest you?",
        instruction: "Select up to 2",
        options: [
          "Freelancing","Job",
          "Startup","Remote work",
          "Content creation","Investments","Other"
        ]
      },
      {
        id: 23,
        type: "multi",
        question: "What motivates you financially?",
        instruction: "Select up to 2",
        options: [
          "High income","Stability",
          "Freedom","Growth",
          "Recognition","Independence","Other"
        ]
      },
      {
        id: 24,
        type: "mcq",
        question: "Choose one:",
        options: [
          "Stable job",
          "Freelance lifestyle",
          "Business ownership",
          "Remote job",
          "Multiple income streams",
          "Flexible work",
          "Other"
        ]
      }
    ]
  },

  {
    day: 5,
    title: "Purpose",
    subtitle: "Your Impact",
    description: "Let's discover what truly matters to you.",
    color: "#9b59b6",
    bg: "#faf0ff",
    icon: "★",
    questions: [
      {
        id: 25,
        type: "writing",
        question: "What impact do you want to create in the world?",
        hint: "",
        suggestions: ["Help people","Build products","Educate","Innovate"]
      },
      {
        id: 26,
        type: "writing",
        question: "What problems matter deeply to you?",
        hint: "",
        suggestions: ["Education","Technology","Environment","Mental health"]
      },
      {
        id: 27,
        type: "writing",
        question: "How do you want people to remember you?",
        hint: "",
        suggestions: ["Helpful","Innovative","Leader","Creator"]
      },
      {
        id: 28,
        type: "multi",
        question: "How do you like helping others?",
        instruction: "Select up to 2",
        options: [
          "Teaching","Solving problems",
          "Building tools","Emotional support",
          "Leading change","Mentoring","Other"
        ]
      },
      {
        id: 29,
        type: "multi",
        question: "What value do you provide?",
        instruction: "Select up to 2",
        options: [
          "Knowledge","Innovation",
          "Support","Creativity",
          "Solutions","Guidance","Other"
        ]
      },
      {
        id: 30,
        type: "mcq",
        question: "What drives you the most?",
        options: [
          "Helping people",
          "Building impact",
          "Money",
          "Recognition",
          "Growth",
          "Purpose",
          "Other"
        ]
      }
    ]
  },

  {
    day: 6,
    title: "Vision",
    subtitle: "Future & Mindset",
    description: "Let's define your long-term direction.",
    color: "#2196a8",
    bg: "#f0fafb",
    icon: "◎",
    questions: [
      {
        id: 31,
        type: "writing",
        question: "What is your long-term goal?",
        hint: "",
        suggestions: [
          "Start a company","Stable career",
          "Travel the world","Leadership role"
        ]
      },
      {
        id: 32,
        type: "writing",
        question: "How do you handle failure?",
        hint: "",
        suggestions: ["Learn and retry","Analyze mistakes","Adapt quickly"]
      },
      {
        id: 33,
        type: "writing",
        question: "What kind of future do you want to build?",
        hint: "",
        suggestions: ["Innovative","Secure","Flexible","Creative"]
      },
      {
        id: 34,
        type: "multi",
        question: "Which mindset describes you best?",
        instruction: "Select up to 2",
        options: [
          "Risk-taker","Safe player",
          "Growth mindset","Creative thinker",
          "Logical thinker","Adaptive","Other"
        ]
      },
      {
        id: 35,
        type: "multi",
        question: "Where do you want to work?",
        instruction: "Select up to 2",
        options: [
          "Global","Local",
          "Remote","Startup",
          "Corporate","Freelance","Other"
        ]
      },
      {
        id: 36,
        type: "mcq",
        question: "Which approach suits you most?",
        options: [
          "Take risks and build",
          "Improve existing systems",
          "Follow structured paths",
          "Explore multiple paths",
          "Innovate continuously",
          "Build something new",
          "Other"
        ]
      }
    ]
  }
];

export default questions;