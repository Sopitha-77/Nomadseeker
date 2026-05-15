const questions = {
  // ================= ENTREPRENEUR TRACK =================
  entrepreneur: [
    {
      day: 1,
      title: "Entrepreneurial Passion",
      subtitle: "What You Love to Build",
      questions: [
        // MCQs (Questions 1-3)
        { id: 1, type: "mcq", question: "What excites you most in business?", options: ["Building products", "Solving market gaps", "Creating brands", "Scaling ideas", "Leading teams", "Making money", "Innovating", "Disrupting industries"] },
        { id: 2, type: "mcq", question: "What kind of problems attract you?", options: ["Market inefficiencies", "Customer pain points", "Tech challenges", "Growth bottlenecks", "Financial gaps", "Operational issues", "Scaling challenges", "Innovation gaps"] },
        { id: 3, type: "mcq", question: "What energizes your work style?", options: ["Starting new ideas", "Closing deals", "Building systems", "Experimenting", "Networking", "Pitching", "Strategy planning", "Execution"] },
        // Multi-Select (Questions 4-6)
        { id: 4, type: "multi", question: "What type of business do you gravitate toward?", instruction: "Select up to 2", options: ["Digital products", "Service-based", "Marketplace", "SaaS", "E-commerce", "Consulting", "Content-driven", "Community-based", "Other"] },
        { id: 5, type: "multi", question: "What keeps you engaged long-term?", instruction: "Select up to 2", options: ["Growth", "Money", "Impact", "Freedom", "Challenge", "Recognition", "Innovation", "Ownership", "Other"] },
        { id: 6, type: "multi", question: "What content do you consume most?", instruction: "Select up to 2", options: ["Startups", "Business strategies", "Investments", "Marketing", "Tech trends", "Case studies", "Leadership", "Scaling systems", "Other"] },
        // Writing/Suggestions (Questions 7-10)
        { id: 7, type: "writing", question: "What type of business would you build even without funding?", suggestions: ["Digital product", "Service business", "Community platform", "Content business", "Consulting", "Marketplace", "SaaS tool", "Local service", "Online course", "Creative agency"] },
        { id: 8, type: "writing", question: "What problems do you feel obsessed to solve?", suggestions: ["Customer pain points", "Market inefficiencies", "Tech challenges", "Process gaps", "Education access", "Healthcare access", "Financial inclusion", "Environmental issues", "Productivity tools", "Communication barriers"] },
        { id: 9, type: "writing", question: "What kind of impact do you want your business to create?", suggestions: ["Economic growth", "Social change", "Tech innovation", "Job creation", "Environmental sustainability", "Education access", "Financial freedom", "Community building", "Industry disruption", "Global reach"] },
        { id: 10, type: "writing", question: "What entrepreneurial interests drive you the most?", suggestions: ["Build", "Scale", "Sell", "Innovate", "Lead", "Invest", "Create", "Disrupt", "Problem-solve", "Connect"] }
      ]
    },
    {
      day: 2,
      title: "Entrepreneurial Skills",
      subtitle: "What You're Good At",
      questions: [
        { id: 11, type: "mcq", question: "Your strongest entrepreneurial skill?", options: ["Sales", "Marketing", "Product building", "Networking", "Strategy", "Leadership", "Finance", "Negotiation"] },
        { id: 12, type: "mcq", question: "How do you approach opportunities?", options: ["Quickly act", "Analyze deeply", "Test ideas", "Build MVP", "Validate market", "Observe trends", "Take risks", "Collaborate"] },
        { id: 13, type: "mcq", question: "What do people value you for?", options: ["Ideas", "Execution", "Leadership", "Communication", "Problem-solving", "Vision", "Adaptability", "Decision-making"] },
        { id: 14, type: "multi", question: "Your execution style?", instruction: "Select up to 2", options: ["Fast & aggressive", "Planned & structured", "Experimental", "Delegation-focused", "Solo execution", "Team-driven", "Data-driven", "Intuition-driven", "Other"] },
        { id: 15, type: "multi", question: "Your strength in business growth?", instruction: "Select up to 2", options: ["Customer acquisition", "Retention", "Product development", "Branding", "Scaling", "Partnerships", "Automation", "Monetization", "Other"] },
        { id: 16, type: "multi", question: "How do you learn business?", instruction: "Select up to 2", options: ["Doing", "Failing", "Mentorship", "Courses", "Networking", "Reading", "Case studies", "Experimentation", "Other"] },
        { id: 17, type: "writing", question: "What business skills have you already mastered?", suggestions: ["Sales", "Marketing", "Leadership", "Strategy", "Finance", "Operations", "Product development", "Negotiation", "Public speaking", "Team building"] },
        { id: 18, type: "writing", question: "What skill is your biggest unfair advantage?", suggestions: ["Problem-solving", "Communication", "Technical skills", "Creativity", "Networking", "Strategy", "Execution", "Leadership", "Analytics", "Sales"] },
        { id: 19, type: "writing", question: "Where do you struggle the most in business?", suggestions: ["Sales", "Marketing", "Finance", "Operations", "Team building", "Scaling", "Product development", "Time management", "Delegation", "Strategy"] },
        { id: 20, type: "writing", question: "What is your entrepreneurial role identity?", suggestions: ["Founder", "Builder", "Seller", "Strategist", "Operator", "Innovator", "Leader", "Investor", "Visionary", "Executor"] }
      ]
    },
    {
      day: 3,
      title: "Freedom & Lifestyle",
      subtitle: "Why You Choose Entrepreneurship",
      questions: [
        { id: 21, type: "mcq", question: "Why did you choose entrepreneurship?", options: ["Freedom", "Money", "Control", "Passion", "Growth", "Impact", "Escape 9-5", "Legacy"] },
        { id: 22, type: "mcq", question: "Your ideal work lifestyle?", options: ["Remote", "Travel-based", "Office setup", "Flexible", "High-intensity", "Minimal", "Team-driven", "Independent"] },
        { id: 23, type: "mcq", question: "Income preference?", options: ["High risk high reward", "Stable growth", "Passive income", "Multiple streams", "Equity-based", "Recurring revenue", "Quick cash flow", "Long-term wealth"] },
        { id: 24, type: "multi", question: "Daily routine style?", instruction: "Select up to 2", options: ["Structured", "Flexible", "Hustle-driven", "Balanced", "Opportunistic", "System-driven", "Dynamic", "Minimalist", "Other"] },
        { id: 25, type: "multi", question: "What does freedom mean to you?", instruction: "Select up to 2", options: ["Time", "Money", "Location", "Decisions", "Creativity", "Independence", "Growth", "Peace", "Other"] },
        { id: 26, type: "multi", question: "Work environment preference?", instruction: "Select up to 2", options: ["Solo", "Team", "Startup chaos", "Structured system", "Remote", "Co-working", "Travel", "Hybrid", "Other"] },
        { id: 27, type: "writing", question: "What does your ideal entrepreneur lifestyle look like?", suggestions: ["Location freedom", "Travel", "Flexible schedule", "Financial freedom", "Work-life balance", "Global reach", "Passion projects", "Family time", "Continuous growth", "Creative freedom"] },
        { id: 28, type: "writing", question: "What are you trying to escape from?", suggestions: ["9-5", "Corporate politics", "Limited growth", "Boredom", "Financial stress", "Lack of control", "Toxic environment", "Commute", "Micromanagement", "Stagnation"] },
        { id: 29, type: "writing", question: "What kind of freedom do you truly want?", suggestions: ["Time freedom", "Financial freedom", "Location freedom", "Creative freedom", "Decision freedom", "Growth freedom", "Relationship freedom", "Purpose freedom", "Learning freedom", "Impact freedom"] },
        { id: 30, type: "writing", question: "What matters most in your life right now?", suggestions: ["Freedom", "Money", "Growth", "Impact", "Stability", "Family", "Health", "Legacy", "Purpose", "Happiness"] }
      ]
    },
    {
      day: 4,
      title: "Wealth & Business Mindset",
      subtitle: "Your Financial Philosophy",
      questions: [
        { id: 31, type: "mcq", question: "Your wealth goal?", options: ["Financial freedom", "Millionaire", "Billionaire", "Passive income", "Business empire", "Investments", "Lifestyle wealth", "Legacy wealth"] },
        { id: 32, type: "mcq", question: "Your money mindset?", options: ["Risk-taker", "Safe player", "Strategic investor", "Growth-focused", "Experimental", "Long-term thinker", "Short-term gains", "Diversified"] },
        { id: 33, type: "mcq", question: "How do you make money?", options: ["Skills", "Business", "Investments", "Network", "Digital assets", "Systems", "Products", "Services"] },
        { id: 34, type: "multi", question: "Your growth approach?", instruction: "Select up to 2", options: ["Fast scaling", "Sustainable", "Aggressive", "Lean", "Experimental", "Data-driven", "Opportunistic", "Strategic", "Other"] },
        { id: 35, type: "multi", question: "Your risk tolerance?", instruction: "Select up to 2", options: ["Very high", "High", "Moderate", "Low", "Calculated", "Experimental", "Strategic", "Safe", "Other"] },
        { id: 36, type: "multi", question: "Your financial decision style?", instruction: "Select up to 2", options: ["Instinct", "Data", "Advice", "Trends", "Experience", "Experiment", "Analysis", "Risk-based", "Other"] },
        { id: 37, type: "writing", question: "What does wealth mean to you?", suggestions: ["Financial security", "Freedom", "Assets", "Passive income", "Legacy", "Security", "Opportunity", "Choice", "Stability", "Independence"] },
        { id: 38, type: "writing", question: "What financial risks are you willing to take?", suggestions: ["Investing savings", "Leaving job", "Borrowing capital", "Bootstrapping", "Equity dilution", "Market uncertainty", "Personal guarantee", "Time investment", "Skill pivoting", "Business model changes"] },
        { id: 39, type: "writing", question: "How do you plan to build long-term wealth?", suggestions: ["Business", "Real estate", "Stocks", "Multiple income", "Brand", "Investment portfolio", "Network effects", "Intellectual property", "Automated systems", "Digital assets"] },
        { id: 40, type: "writing", question: "What is your wealth identity?", suggestions: ["Earner", "Builder", "Investor", "Creator", "Owner", "Scaler", "Trader", "Strategist", "Steward", "Operator"] }
      ]
    },
    {
      day: 5,
      title: "Purpose & Market Impact",
      subtitle: "Your Mission & Contribution",
      questions: [
        { id: 41, type: "mcq", question: "Who do you want to serve?", options: ["Startups", "Businesses", "Creators", "Freelancers", "Students", "Corporates", "Communities", "Global audience"] },
        { id: 42, type: "mcq", question: "What impact do you want to create?", options: ["Economic", "Social", "Technological", "Educational", "Creative", "Financial", "Cultural", "Global"] },
        { id: 43, type: "mcq", question: "Why does your business exist?", options: ["Solve problems", "Make money", "Create change", "Innovate", "Empower people", "Build systems", "Scale impact", "Disrupt markets"] },
        { id: 44, type: "multi", question: "Your contribution style?", instruction: "Select up to 2", options: ["Build", "Lead", "Teach", "Scale", "Innovate", "Solve", "Connect", "Invest", "Other"] },
        { id: 45, type: "multi", question: "What drives your mission?", instruction: "Select up to 2", options: ["Purpose", "Passion", "Money", "Growth", "Legacy", "Impact", "Vision", "Freedom", "Other"] },
        { id: 46, type: "multi", question: "What problem excites you most?", instruction: "Select up to 2", options: ["Business growth", "Tech innovation", "Finance", "Social change", "Education", "Productivity", "Scaling", "Automation", "Other"] },
        { id: 47, type: "writing", question: "What problem are you obsessed with solving?", suggestions: ["Market gap", "Customer pain", "Skill gap", "Access issue", "Inefficiency", "Friction point", "Communication gap", "Trust deficit", "Opportunity gap", "Resource distribution"] },
        { id: 48, type: "writing", question: "Who benefits most from your business?", suggestions: ["Customers", "Society", "Employees", "Community", "Partners", "Industry", "Future generations", "Local economy", "Global citizens", "Marginalized groups"] },
        { id: 49, type: "writing", question: "What change do you want to bring to the world?", suggestions: ["Education", "Finance", "Tech access", "Sustainability", "Healthcare", "Financial inclusion", "Creative expression", "Community building", "Opportunity creation", "Systemic improvement"] },
        { id: 50, type: "writing", question: "What is your ultimate purpose driver?", suggestions: ["Money", "Impact", "Freedom", "Growth", "Legacy", "Service", "Innovation", "Power", "Love", "Truth"] }
      ]
    },
    {
      day: 6,
      title: "Vision & Ikigai Alignment",
      subtitle: "Your Ultimate Purpose",
      questions: [
        { id: 51, type: "mcq", question: "Your 10-year vision?", options: ["Global business owner", "Serial entrepreneur", "Investor", "Industry leader", "Digital nomad", "Thought leader", "Startup mentor", "Wealth creator"] },
        { id: 52, type: "mcq", question: "Identity you align with?", options: ["Founder", "Builder", "Leader", "Innovator", "Strategist", "Investor", "Visionary", "Creator"] },
        { id: 53, type: "mcq", question: "What does success mean to you?", options: ["Wealth", "Freedom", "Impact", "Growth", "Recognition", "Balance", "Power", "Legacy"] },
        { id: 54, type: "multi", question: "Your long-term focus?", instruction: "Select up to 2", options: ["Scale", "Mastery", "Wealth", "Innovation", "Impact", "Freedom", "Leadership", "Systems", "Other"] },
        { id: 55, type: "multi", question: "Your business model preference?", instruction: "Select up to 2", options: ["SaaS", "Digital products", "Agency", "Marketplace", "E-commerce", "Consulting", "Community", "Hybrid", "Other"] },
        { id: 56, type: "multi", question: "Your Ikigai core?", instruction: "Select up to 2", options: ["Passion", "Skills", "Money", "Impact", "Freedom", "Growth", "Vision", "Purpose", "Other"] },
        { id: 57, type: "writing", question: "What kind of entrepreneur do you want to become?", suggestions: ["Visionary", "Creator", "Leader", "Builder", "Innovator", "Strategist", "Disruptor", "Mentor", "Investor", "Scaler"] },
        { id: 58, type: "writing", question: "What does your business look like in 10 years?", suggestions: ["Global", "Scaled", "Strong brand", "Loyal users", "Multiple streams", "Innovative products", "Talented team", "Sustainable growth", "Market leadership", "Positive impact"] },
        { id: 59, type: "writing", question: "What legacy will you leave behind?", suggestions: ["Business", "Impact", "Innovation", "Community", "Wealth", "Knowledge", "Opportunities", "Change", "Inspiration", "Systems"] },
        { id: 60, type: "writing", question: "What is your Ikigai alignment?", suggestions: ["Passion", "Purpose", "Impact", "Service", "Mission", "Vocation", "Profession", "Calling", "Destiny", "Flow"] }
      ]
    }
  ],

  // ================= MANAGERIAL TRACK =================
  managerial: [
    {
      day: 1,
      title: "Leadership Passion",
      subtitle: "What You Love to Lead",
      questions: [
        { id: 1, type: "mcq", question: "What excites you most at work?", options: ["Leading teams", "Solving problems", "Managing operations", "Driving results", "Mentoring people", "Planning strategies", "Improving systems", "Achieving targets"] },
        { id: 2, type: "mcq", question: "What kind of challenges attract you?", options: ["Team conflicts", "Performance issues", "Process gaps", "Deadline pressure", "Resource allocation", "Strategic decisions", "Scaling teams", "Crisis management"] },
        { id: 3, type: "mcq", question: "What energizes your role daily?", options: ["Team coordination", "Decision-making", "Performance tracking", "Communication", "Planning", "Problem-solving", "Execution", "Optimization"] },
        { id: 4, type: "multi", question: "What type of role suits you best?", instruction: "Select up to 2", options: ["Team manager", "Operations head", "Project manager", "Department lead", "Business manager", "Strategy manager", "HR leader", "Delivery manager", "Other"] },
        { id: 5, type: "multi", question: "What keeps you engaged long-term?", instruction: "Select up to 2", options: ["Stability", "Growth", "Team success", "Recognition", "Responsibility", "Influence", "Structure", "Achievement", "Other"] },
        { id: 6, type: "multi", question: "What content do you consume most?", instruction: "Select up to 2", options: ["Leadership", "Management", "Productivity", "Business strategy", "Communication", "Psychology", "Case studies", "Organizational growth", "Other"] },
        { id: 7, type: "writing", question: "What kind of team do you love managing?", suggestions: ["Startups", "Corporates", "Technical teams", "Sales teams", "Operations teams", "Creative teams", "Remote teams", "Cross-functional groups", "Project teams", "Department units"] },
        { id: 8, type: "writing", question: "What leadership moments fulfill you?", suggestions: ["Team success", "Mentoring success", "Conflict solving", "Process improvement", "Goal completion", "Crisis handled", "Team growth", "Recognition received", "Impact created", "Problems solved"] },
        { id: 9, type: "writing", question: "What motivates you to take responsibility?", suggestions: ["Ownership satisfaction", "Team reliance", "Challenge excitement", "Growth opportunity", "Impact creation", "Problem ownership", "Trust received", "Outcome control", "Legacy building", "Difference making"] },
        { id: 10, type: "writing", question: "What is your core managerial drive?", suggestions: ["Stability", "Growth", "Responsibility", "Influence", "Achievement", "Impact", "Leadership", "Recognition", "Service", "Mastery"] }
      ]
    },
    {
      day: 2,
      title: "Managerial Skills",
      subtitle: "What You're Good At",
      questions: [
        { id: 11, type: "mcq", question: "Your strongest managerial skill?", options: ["Communication", "Planning", "Execution", "Delegation", "Decision-making", "Problem-solving", "Team management", "Coordination"] },
        { id: 12, type: "mcq", question: "How do you handle decisions?", options: ["Data-driven", "Experience-based", "Team input", "Quick judgment", "Strategic thinking", "Risk evaluation", "Logical analysis", "Balanced approach"] },
        { id: 13, type: "mcq", question: "What do people rely on you for?", options: ["Guidance", "Organization", "Problem-solving", "Conflict resolution", "Execution", "Leadership", "Planning", "Accountability"] },
        { id: 14, type: "multi", question: "Your management style?", instruction: "Select up to 2", options: ["Structured", "Flexible", "Supportive", "Directive", "Collaborative", "Analytical", "Results-driven", "People-focused", "Other"] },
        { id: 15, type: "multi", question: "Your strength in operations?", instruction: "Select up to 2", options: ["Planning", "Execution", "Monitoring", "Optimization", "Delegation", "Reporting", "Coordination", "Process design", "Other"] },
        { id: 16, type: "multi", question: "How do you learn management?", instruction: "Select up to 2", options: ["Experience", "Mentorship", "Books", "Training", "Observation", "Feedback", "Case studies", "Practice", "Other"] },
        { id: 17, type: "writing", question: "What managerial skills have you mastered?", suggestions: ["Planning", "Communication", "Delegation", "Problem-solving", "Decision-making", "Team building", "Performance management", "Conflict resolution", "Resource allocation", "Strategic thinking"] },
        { id: 18, type: "writing", question: "What is your biggest strength as a leader?", suggestions: ["Empathy", "Vision", "Execution", "Communication", "Strategic thinking", "Problem-solving", "Team building", "Decision-making", "Coaching ability", "Crisis management"] },
        { id: 19, type: "writing", question: "Where do you struggle in managing teams or work?", suggestions: ["Delegation", "Conflict resolution", "Time management", "Strategic planning", "Performance feedback", "Resource allocation", "Change management", "Decision speed", "Work-life boundaries", "Difficult conversations"] },
        { id: 20, type: "writing", question: "What is your managerial role identity?", suggestions: ["Leader", "Planner", "Executor", "Strategist", "Coordinator", "Operator", "Coach", "Decision-maker", "Facilitator", "Change agent"] }
      ]
    },
    {
      day: 3,
      title: "Work Style & Stability",
      subtitle: "Why You Choose Management",
      questions: [
        { id: 21, type: "mcq", question: "Why do you prefer managerial roles?", options: ["Stability", "Responsibility", "Growth", "Leadership", "Structure", "Influence", "Impact", "Recognition"] },
        { id: 22, type: "mcq", question: "Ideal work environment?", options: ["Office", "Hybrid", "Structured system", "Team-based", "Corporate", "Organized setup", "Process-driven", "Goal-oriented"] },
        { id: 23, type: "mcq", question: "Work-life preference?", options: ["Balanced", "Work-focused", "Stable routine", "Flexible", "Structured", "High-responsibility", "Team-centered", "Result-driven"] },
        { id: 24, type: "multi", question: "Income preference?", instruction: "Select up to 2", options: ["Stable salary", "Incremental growth", "Performance-based", "Bonus-driven", "Leadership perks", "Long-term security", "Benefits-focused", "Structured income", "Other"] },
        { id: 25, type: "multi", question: "Daily routine style?", instruction: "Select up to 2", options: ["Planned", "Structured", "Time-bound", "Meeting-driven", "Task-focused", "Organized", "Systematic", "Balanced", "Other"] },
        { id: 26, type: "multi", question: "What does stability mean to you?", instruction: "Select up to 2", options: ["Job security", "Consistent income", "Growth path", "Structured role", "Predictability", "Career ladder", "Work-life balance", "Organizational support", "Other"] },
        { id: 27, type: "writing", question: "What does your ideal work environment look like?", suggestions: ["Professional office", "Structured systems", "Supportive culture", "Clear hierarchies", "Growth opportunities", "Team collaboration", "Process clarity", "Stable routines", "Respectful atmosphere", "Goal alignment"] },
        { id: 28, type: "writing", question: "What kind of stability do you seek in life?", suggestions: ["Career security", "Financial predictability", "Work-life balance", "Professional growth", "Role clarity", "Team consistency", "Organizational trust", "Income stability", "Schedule reliability", "Long-term tenure"] },
        { id: 29, type: "writing", question: "What balance do you want between work and personal life?", suggestions: ["40-hour weeks", "Weekend freedom", "Family time", "Personal hobbies", "Health priority", "Flexible hours", "Remote options", "Boundary respect", "Energy management", "Quality downtime"] },
        { id: 30, type: "writing", question: "What matters most in your career?", suggestions: ["Stability", "Growth", "Balance", "Recognition", "Responsibility", "Impact", "Leadership", "Security", "Purpose", "Fulfillment"] }
      ]
    },
    {
      day: 4,
      title: "Career Growth & Responsibility",
      subtitle: "Your Professional Journey",
      questions: [
        { id: 31, type: "mcq", question: "Your career goal?", options: ["Senior manager", "Department head", "Operations leader", "Business head", "Strategy leader", "HR leader", "Project director", "Executive role"] },
        { id: 32, type: "mcq", question: "Your growth mindset?", options: ["Steady growth", "Leadership growth", "Skill-based growth", "Position-based", "Responsibility-driven", "Performance-driven", "Experience-driven", "Strategic growth"] },
        { id: 33, type: "mcq", question: "Your responsibility approach?", options: ["Ownership", "Accountability", "Delegation", "Team-driven", "Structured", "Balanced", "Strategic", "Operational"] },
        { id: 34, type: "multi", question: "Your decision style?", instruction: "Select up to 2", options: ["Logical", "Data-driven", "Collaborative", "Strategic", "Experience-based", "Balanced", "Risk-aware", "Analytical", "Other"] },
        { id: 35, type: "multi", question: "Your leadership approach?", instruction: "Select up to 2", options: ["Supportive", "Directive", "Collaborative", "Strategic", "Results-driven", "People-focused", "Coaching", "Monitoring", "Other"] },
        { id: 36, type: "multi", question: "What drives your career?", instruction: "Select up to 2", options: ["Stability", "Growth", "Leadership", "Impact", "Recognition", "Responsibility", "Achievement", "Influence", "Other"] },
        { id: 37, type: "writing", question: "What kind of leader do you want to become?", suggestions: ["Strategic leader", "Transformational", "People developer", "Change agent", "Servant leader", "Visionary leader", "Operational expert", "Coaching leader", "Results driver", "Culture builder"] },
        { id: 38, type: "writing", question: "What responsibilities excite you most?", suggestions: ["Team leadership", "Strategic planning", "Project ownership", "Budget control", "People development", "Process improvement", "Crisis management", "Innovation driving", "Performance optimization", "Culture shaping"] },
        { id: 39, type: "writing", question: "How do you define career success?", suggestions: ["Growth", "Impact", "Leadership", "Recognition", "Achievement", "Influence", "Stability", "Fulfillment", "Mastery", "Contribution"] },
        { id: 40, type: "writing", question: "What is your career identity?", suggestions: ["Leader", "Strategist", "Planner", "Operator", "Manager", "Executive", "Coordinator", "Decision-maker", "Coach", "Architect"] }
      ]
    },
    {
      day: 5,
      title: "Purpose & Organizational Impact",
      subtitle: "Your Contribution to Work",
      questions: [
        { id: 41, type: "mcq", question: "Who do you impact most?", options: ["Team", "Organization", "Clients", "Stakeholders", "Community", "Employees", "Leadership", "Society"] },
        { id: 42, type: "mcq", question: "What impact do you want to create?", options: ["Organizational growth", "Team development", "Efficiency", "Productivity", "Stability", "Culture building", "Leadership development", "Process improvement"] },
        { id: 43, type: "mcq", question: "Why do you work?", options: ["Stability", "Growth", "Responsibility", "Impact", "Leadership", "Recognition", "Purpose", "Contribution"] },
        { id: 44, type: "multi", question: "Your contribution style?", instruction: "Select up to 2", options: ["Leading", "Managing", "Planning", "Executing", "Supporting", "Coaching", "Organizing", "Optimizing", "Other"] },
        { id: 45, type: "multi", question: "What drives your purpose?", instruction: "Select up to 2", options: ["Team success", "Organizational goals", "Personal growth", "Stability", "Impact", "Leadership", "Recognition", "Responsibility", "Other"] },
        { id: 46, type: "multi", question: "What problems do you enjoy solving?", instruction: "Select up to 2", options: ["Team issues", "Process gaps", "Performance issues", "Strategy gaps", "Communication issues", "Operational problems", "Efficiency issues", "Resource allocation", "Other"] },
        { id: 47, type: "writing", question: "What impact do you want to create in your organization?", suggestions: ["Cultural transformation", "Performance excellence", "Team development", "Process optimization", "Strategic alignment", "Innovation culture", "Operational efficiency", "Leadership pipeline", "Employee satisfaction", "Sustainable growth"] },
        { id: 48, type: "writing", question: "How do you help people grow?", suggestions: ["Mentorship programs", "Skill training", "Career coaching", "Feedback culture", "Growth opportunities", "Recognition systems", "Learning resources", "Challenge assignments", "Support networks", "Career planning"] },
        { id: 49, type: "writing", question: "What problems do you feel responsible to solve?", suggestions: ["Team conflict", "Process inefficiency", "Performance gaps", "Communication breakdown", "Resource shortage", "Strategic misalignment", "Culture issues", "Morale problems", "Skill gaps", "Turnover issues"] },
        { id: 50, type: "writing", question: "What is your purpose driver at work?", suggestions: ["Stability", "Growth", "Leadership", "Impact", "Responsibility", "Recognition", "Contribution", "Achievement", "Service", "Mastery"] }
      ]
    },
    {
      day: 6,
      title: "Vision & Managerial Ikigai",
      subtitle: "Your Ultimate Leadership Purpose",
      questions: [
        { id: 51, type: "mcq", question: "Your 10-year vision?", options: ["Senior executive", "Business leader", "Department head", "Organizational strategist", "Leadership coach", "Operations expert", "Corporate leader", "Industry expert"] },
        { id: 52, type: "mcq", question: "Identity you align with?", options: ["Leader", "Manager", "Strategist", "Planner", "Operator", "Coach", "Decision-maker", "Organizer"] },
        { id: 53, type: "mcq", question: "What does success mean to you?", options: ["Stability", "Growth", "Leadership", "Impact", "Recognition", "Balance", "Achievement", "Influence"] },
        { id: 54, type: "multi", question: "Your long-term focus?", instruction: "Select up to 2", options: ["Leadership", "Stability", "Growth", "Impact", "Systems", "Strategy", "Team building", "Efficiency", "Other"] },
        { id: 55, type: "multi", question: "Your work model preference?", instruction: "Select up to 2", options: ["Corporate", "Structured", "Team-driven", "Hybrid", "Leadership role", "Operational role", "Strategic role", "Executive role", "Other"] },
        { id: 56, type: "multi", question: "Your Ikigai core?", instruction: "Select up to 2", options: ["Leadership", "Stability", "Growth", "Impact", "Responsibility", "Balance", "Achievement", "Contribution", "Other"] },
        { id: 57, type: "writing", question: "What kind of leader do you want to become in 10 years?", suggestions: ["Executive", "Mentor", "Strategist", "Change leader", "Transformational leader", "Servant leader", "Operational expert", "People developer", "Visionary leader", "Culture builder"] },
        { id: 58, type: "writing", question: "What legacy do you want to leave in your organization?", suggestions: ["Strong culture", "Developed leaders", "Efficient systems", "Sustainable processes", "Inclusive environment", "Innovation mindset", "Customer focus", "Operational excellence", "Team empowerment", "Strategic direction"] },
        { id: 59, type: "writing", question: "How will you impact people's careers and growth?", suggestions: ["Mentorship", "Opportunities", "Growth pathways", "Skill development", "Career guidance", "Recognition systems", "Promotion pathways", "Learning environment", "Success modeling", "Support networks"] },
        { id: 60, type: "writing", question: "What is your Ikigai alignment?", suggestions: ["Purpose", "Impact", "Legacy", "Service", "Growth", "Stability", "Leadership", "Excellence", "Contribution", "Balance"] }
      ]
    }
  ],

  // ================= TECHNICIAN TRACK =================
  technician: [
    {
      day: 1,
      title: "Skill Passion",
      subtitle: "What You Love to Work On",
      questions: [
        { id: 1, type: "mcq", question: "What kind of work excites you most?", options: ["Coding", "Designing", "Building systems", "Debugging", "Analyzing data", "Creating content", "Automating tasks", "Solving technical problems"] },
        { id: 2, type: "mcq", question: "What type of problems attract you?", options: ["Technical bugs", "System inefficiencies", "Performance issues", "Design challenges", "Data problems", "Process errors", "Optimization issues", "Tool improvements"] },
        { id: 3, type: "mcq", question: "What energizes your workflow?", options: ["Deep focus", "Problem-solving", "Learning tools", "Experimenting", "Precision work", "Building solutions", "Testing", "Improving systems"] },
        { id: 4, type: "multi", question: "What kind of projects do you prefer?", instruction: "Select up to 2", options: ["Technical builds", "Design projects", "Automation systems", "Data analysis", "Product features", "System architecture", "Optimization", "Debugging tasks", "Other"] },
        { id: 5, type: "multi", question: "What keeps you engaged long-term?", instruction: "Select up to 2", options: ["Mastery", "Skill growth", "Problem-solving", "Precision", "Learning", "Quality output", "Innovation", "Efficiency", "Other"] },
        { id: 6, type: "multi", question: "What content do you consume most?", instruction: "Select up to 2", options: ["Tutorials", "Technical blogs", "Case studies", "Tool reviews", "Coding/design videos", "Documentation", "Product breakdowns", "Tech trends", "Other"] },
        { id: 7, type: "writing", question: "What skill do you love practicing daily?", suggestions: ["Coding", "UI/UX design", "Data analysis", "System architecture", "Debugging", "Testing", "Automation", "Documentation", "API integration", "Performance optimization"] },
        { id: 8, type: "writing", question: "What kind of technical problems excite you most?", suggestions: ["Complex algorithms", "System performance", "User experience", "Data structures", "Security challenges", "Integration issues", "Scaling problems", "UI/UX puzzles", "Debug mysteries", "Optimization challenges"] },
        { id: 9, type: "writing", question: "What work makes you feel deeply focused and satisfied?", suggestions: ["Flow state coding", "Elegant solutions", "Clean architecture", "Bug resolution", "System optimization", "Design completion", "Feature delivery", "Performance gains", "Documentation clarity", "Tool creation"] },
        { id: 10, type: "writing", question: "What is your core skill passion?", suggestions: ["Coding", "Designing", "Building", "Analyzing", "Debugging", "Automating", "Optimizing", "Creating", "Testing", "Architecting"] }
      ]
    },
    {
      day: 2,
      title: "Technical Strengths",
      subtitle: "What You're Good At",
      questions: [
        { id: 11, type: "mcq", question: "Your strongest technical skill?", options: ["Programming", "UI/UX design", "Data analysis", "Automation", "System design", "Debugging", "Testing", "Tool usage"] },
        { id: 12, type: "mcq", question: "How do you approach problems?", options: ["Logical analysis", "Step-by-step", "Experimentation", "Debugging", "Research", "Testing", "Optimization", "Trial & error"] },
        { id: 13, type: "mcq", question: "What do people rely on you for?", options: ["Technical fixes", "System setup", "Design work", "Analysis", "Troubleshooting", "Tool expertise", "Execution", "Quality control"] },
        { id: 14, type: "multi", question: "Your work style?", instruction: "Select up to 2", options: ["Deep focus", "Independent", "Structured", "Detail-oriented", "Process-driven", "Analytical", "Precision-based", "Task-focused", "Other"] },
        { id: 15, type: "multi", question: "Your strength in execution?", instruction: "Select up to 2", options: ["Accuracy", "Speed", "Efficiency", "Quality", "Consistency", "Problem-solving", "Optimization", "Reliability", "Other"] },
        { id: 16, type: "multi", question: "How do you learn skills?", instruction: "Select up to 2", options: ["Practice", "Tutorials", "Documentation", "Experimentation", "Trial & error", "Mentorship", "Projects", "Reverse engineering", "Other"] },
        { id: 17, type: "writing", question: "What technical skills have you mastered?", suggestions: ["JavaScript/Python", "React/Vue/Angular", "Node.js/Backend", "SQL/NoSQL", "AWS/Cloud", "Docker/K8s", "UI/UX design", "Data visualization", "API development", "Testing frameworks"] },
        { id: 18, type: "writing", question: "What is your strongest technical advantage?", suggestions: ["Problem-solving speed", "Code quality", "System thinking", "Debugging ability", "Design intuition", "Learning agility", "Analytical depth", "Precision focus", "Optimization skill", "Architecture vision"] },
        { id: 19, type: "writing", question: "Where do you struggle in your skillset?", suggestions: ["Advanced algorithms", "System architecture", "New frameworks", "Performance tuning", "Security practices", "Code review", "Documentation", "Time estimation", "Complex debugging", "Team collaboration"] },
        { id: 20, type: "writing", question: "What is your technical identity?", suggestions: ["Developer", "Designer", "Analyst", "Engineer", "Tester", "Specialist", "Technician", "Operator", "Architect", "Consultant"] }
      ]
    },
    {
      day: 3,
      title: "Work Style & Environment",
      subtitle: "Your Ideal Technical Work Setting",
      questions: [
        { id: 21, type: "mcq", question: "Why do you prefer technical roles?", options: ["Skill mastery", "Problem-solving", "Independence", "Precision", "Learning", "Stability", "Focus", "Efficiency"] },
        { id: 22, type: "mcq", question: "Ideal work environment?", options: ["Remote", "Quiet workspace", "Structured system", "Independent setup", "Tech-driven", "Focus zone", "Minimal distractions", "Organized setup"] },
        { id: 23, type: "mcq", question: "Work preference?", options: ["Deep work", "Task-based", "Project-based", "Independent", "Structured", "Flexible", "System-driven", "Focus-driven"] },
        { id: 24, type: "multi", question: "Income preference?", instruction: "Select up to 2", options: ["Stable income", "Skill-based income", "Freelance", "Project-based", "Contract", "Remote work", "Hybrid", "Long-term role", "Other"] },
        { id: 25, type: "multi", question: "Daily routine style?", instruction: "Select up to 2", options: ["Structured", "Flexible", "Deep work blocks", "Task-focused", "Systematic", "Minimal meetings", "Process-driven", "Independent", "Other"] },
        { id: 26, type: "multi", question: "What gives you work satisfaction?", instruction: "Select up to 2", options: ["Solving problems", "Completing tasks", "Building systems", "Learning", "Precision", "Efficiency", "Quality output", "Improvement", "Other"] },
        { id: 27, type: "writing", question: "What is your ideal working environment?", suggestions: ["Silent workspace", "Remote setup", "Organized desk", "Natural light", "Ergonomic setup", "Dual monitors", "Quiet hours", "Deep focus zone", "Minimal interruptions", "Tech tools ready"] },
        { id: 28, type: "writing", question: "How do you prefer to structure your day?", suggestions: ["Morning deep work", "Task batching", "Scheduled breaks", "Blocked focus time", "Flexible hours", "Fixed routines", "Priority ordering", "Time blocking", "Energy matching", "Meeting windows"] },
        { id: 29, type: "writing", question: "What kind of work gives you satisfaction?", suggestions: ["Problem solved", "Code working", "Design perfect", "System optimized", "Bug fixed", "Feature delivered", "Documentation complete", "Test passed", "Tool built", "Process automated"] },
        { id: 30, type: "writing", question: "What matters most in your work?", suggestions: ["Mastery", "Stability", "Focus", "Learning", "Efficiency", "Quality", "Growth", "Independence", "Precision", "Impact"] }
      ]
    },
    {
      day: 4,
      title: "Career & Skill Growth",
      subtitle: "Your Professional Development Path",
      questions: [
        { id: 31, type: "mcq", question: "Your career goal?", options: ["Specialist", "Senior expert", "Technical lead", "Consultant", "Freelancer", "Engineer", "Product expert", "System architect"] },
        { id: 32, type: "mcq", question: "Your growth mindset?", options: ["Skill mastery", "Continuous learning", "Experience-based", "Project-based", "Certification-based", "Deep expertise", "Technical innovation", "Stability"] },
        { id: 33, type: "mcq", question: "Your work approach?", options: ["Precision", "Accuracy", "Speed", "Quality", "Efficiency", "Optimization", "Consistency", "Reliability"] },
        { id: 34, type: "multi", question: "Your learning approach?", instruction: "Select up to 2", options: ["Practice", "Real projects", "Tutorials", "Research", "Experimentation", "Mentorship", "Reverse engineering", "Documentation", "Other"] },
        { id: 35, type: "multi", question: "What drives your career?", instruction: "Select up to 2", options: ["Skill growth", "Stability", "Mastery", "Recognition", "Learning", "Problem-solving", "Innovation", "Efficiency", "Other"] },
        { id: 36, type: "multi", question: "Your technical decision style?", instruction: "Select up to 2", options: ["Logical", "Data-driven", "Experience-based", "Analytical", "Experimental", "Structured", "Optimized", "Practical", "Other"] },
        { id: 37, type: "writing", question: "What level of expertise do you want to reach?", suggestions: ["Subject expert", "Industry specialist", "Technical advisor", "Team lead", "Architect level", "Principal engineer", "Master craftsman", "Innovation leader", "Teacher/Mentor", "Consultant expert"] },
        { id: 38, type: "writing", question: "What does success look like in your career?", suggestions: ["Skill recognition", "Expert status", "Project impact", "Team influence", "Product quality", "Innovation created", "Problem solved", "Knowledge shared", "Respect earned", "Mastery achieved"] },
        { id: 39, type: "writing", question: "How do you plan to grow your skills?", suggestions: ["Daily practice", "Course completion", "Project challenges", "Mentorship seeking", "Conference attendance", "Open source contribution", "Side projects", "Certification pursuit", "Peer learning", "Documentation reading"] },
        { id: 40, type: "writing", question: "What is your career identity?", suggestions: ["Specialist", "Expert", "Engineer", "Technician", "Consultant", "Freelancer", "Analyst", "Builder", "Architect", "Innovator"] }
      ]
    },
    {
      day: 5,
      title: "Purpose & Contribution",
      subtitle: "Your Value Creation",
      questions: [
        { id: 41, type: "mcq", question: "Who do you support with your skills?", options: ["Teams", "Businesses", "Clients", "Developers", "Designers", "Organizations", "Startups", "Individuals"] },
        { id: 42, type: "mcq", question: "What impact do you create?", options: ["Efficiency", "Quality", "Accuracy", "Innovation", "Stability", "Optimization", "Reliability", "Performance"] },
        { id: 43, type: "mcq", question: "Why do you work?", options: ["Stability", "Skill growth", "Mastery", "Problem-solving", "Contribution", "Learning", "Recognition", "Efficiency"] },
        { id: 44, type: "multi", question: "Your contribution style?", instruction: "Select up to 2", options: ["Build", "Fix", "Optimize", "Analyze", "Design", "Support", "Improve", "Execute", "Other"] },
        { id: 45, type: "multi", question: "What drives your purpose?", instruction: "Select up to 2", options: ["Mastery", "Learning", "Stability", "Problem-solving", "Contribution", "Efficiency", "Growth", "Innovation", "Other"] },
        { id: 46, type: "multi", question: "What problems excite you most?", instruction: "Select up to 2", options: ["Technical bugs", "System issues", "Performance problems", "Design flaws", "Data errors", "Optimization gaps", "Tool inefficiencies", "Process errors", "Other"] },
        { id: 47, type: "writing", question: "What value do your skills bring to others?", suggestions: ["Time saved", "Quality improved", "Problems solved", "Systems built", "Errors fixed", "Processes automated", "Clarity provided", "Innovation delivered", "Stability created", "Efficiency gained"] },
        { id: 48, type: "writing", question: "What problems do you feel responsible to solve?", suggestions: ["Technical debt", "User friction", "System downtime", "Security gaps", "Performance lag", "Design issues", "Data quality", "Integration problems", "Tool complexity", "Process inefficiency"] },
        { id: 49, type: "writing", question: "How does your work help people or businesses?", suggestions: ["Faster operations", "Better experiences", "Lower costs", "Higher quality", "Improved reliability", "Increased productivity", "Reduced errors", "Enhanced capabilities", "Simplified processes", "Innovation access"] },
        { id: 50, type: "writing", question: "What is your purpose driver?", suggestions: ["Mastery", "Stability", "Problem-solving", "Contribution", "Learning", "Efficiency", "Growth", "Innovation", "Impact", "Service"] }
      ]
    },
    {
      day: 6,
      title: "Vision & Technician Ikigai",
      subtitle: "Your Ultimate Technical Purpose",
      questions: [
        { id: 51, type: "mcq", question: "Your 10-year vision?", options: ["Technical expert", "Senior specialist", "Consultant", "System architect", "Freelancer", "Product expert", "Engineer", "Innovator"] },
        { id: 52, type: "mcq", question: "Identity you align with?", options: ["Specialist", "Engineer", "Developer", "Designer", "Analyst", "Technician", "Builder", "Expert"] },
        { id: 53, type: "mcq", question: "What does success mean to you?", options: ["Mastery", "Stability", "Skill growth", "Recognition", "Efficiency", "Quality", "Innovation", "Contribution"] },
        { id: 54, type: "multi", question: "Your long-term focus?", instruction: "Select up to 2", options: ["Mastery", "Stability", "Skill growth", "Innovation", "Efficiency", "Quality", "Deep expertise", "Contribution", "Other"] },
        { id: 55, type: "multi", question: "Your work model preference?", instruction: "Select up to 2", options: ["Remote", "Freelance", "Contract", "Full-time", "Hybrid", "Project-based", "Independent", "Technical role", "Other"] },
        { id: 56, type: "multi", question: "Your Ikigai core?", instruction: "Select up to 2", options: ["Mastery", "Skills", "Stability", "Contribution", "Efficiency", "Learning", "Growth", "Innovation", "Other"] },
        { id: 57, type: "writing", question: "What kind of expert do you want to become?", suggestions: ["Deep technical specialist", "System architect", "Innovation leader", "Technical mentor", "Industry consultant", "Product builder", "Quality champion", "Performance expert", "Design master", "Automation expert"] },
        { id: 58, type: "writing", question: "What is your long-term skill vision?", suggestions: ["Master multiple domains", "Lead technical teams", "Architect complex systems", "Innovate new solutions", "Teach and mentor", "Build products", "Optimize at scale", "Solve hard problems", "Create frameworks", "Set standards"] },
        { id: 59, type: "writing", question: "What impact will your expertise create?", suggestions: ["Enable innovation", "Improve lives", "Advance technology", "Solve critical problems", "Educate others", "Build tools that scale", "Create efficiency", "Drive quality", "Inspire solutions", "Leave legacy code"] },
        { id: 60, type: "writing", question: "What is your Ikigai alignment?", suggestions: ["Mastery", "Skills", "Stability", "Contribution", "Efficiency", "Learning", "Growth", "Innovation", "Flow", "Purpose"] }
      ]
    }
  ]
};

export default questions;