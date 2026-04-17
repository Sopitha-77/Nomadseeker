const questions = {
  // ================= ENTREPRENEUR =================
  entrepreneur: [
    {
      day: 1,
      title: "Passion & Purpose",
      subtitle: "Discover what truly excites you",
      questions: [
        { id: 1, type: "writing", question: "What kind of business or venture truly excites you and why?", suggestions: ["Tech Startup", "Social Enterprise", "E-commerce Brand", "SaaS Platform", "Creative Agency", "Marketplace", "FinTech Solution", "EdTech Platform", "AI Company", "Sustainable Business", "HealthTech", "Real Estate Tech"] },
        { id: 2, type: "writing", question: "If money wasn't an issue, what would you dedicate your life to building?", suggestions: ["Open Source Software", "Educational Platform", "Community Hub", "Non-profit Organization", "Art & Culture Space", "Research Lab", "Environmental Initiative", "Healthcare Solution", "Creative Studio", "Mentorship Program"] },
        { id: 3, type: "writing", question: "What gives you the deepest sense of satisfaction in your work?", suggestions: ["Making Impact", "Building from Scratch", "Solving Complex Problems", "Helping Others Succeed", "Creating Innovation", "Scaling Ventures", "Leading Teams", "Generating Wealth", "Leaving Legacy", "Achieving Freedom"] },
        { id: 4, type: "multi", question: "Which activities make you lose track of time?", instruction: "Select up to 2", options: ["Brainstorming Ideas", "Networking with People", "Building Products", "Marketing Strategies", "Leading Teams", "Pitching Ventures", "Analyzing Markets", "Creative Problem Solving", "Other"] },
        { id: 5, type: "multi", question: "What energizes you the most?", instruction: "Select up to 2", options: ["Taking Calculated Risks", "Driving Innovation", "Generating Revenue", "Working with People", "Scaling Operations", "Competitive Challenges", "Creative Freedom", "Solving Problems", "Other"] },
        { id: 6, type: "mcq", question: "Which entrepreneurial archetype resonates most with you?", options: ["Visionary Founder", "Product Builder", "Growth Leader", "Strategic Thinker", "Innovation Driver", "Operations Scaler", "Community Builder", "Other"] }
      ]
    },
    {
      day: 2,
      title: "Lifestyle & Freedom",
      subtitle: "Design your ideal way of living",
      questions: [
        { id: 7, type: "writing", question: "Describe your ideal work-life balance and daily routine", suggestions: ["Startup Hustle Culture", "Remote Flexible Work", "Balanced Lifestyle", "Fast-paced Growth", "Multiple Income Streams", "Creative Freedom", "Autonomous Schedule", "Location Independence", "Deep Work Focus", "Collaborative Environment"] },
        { id: 8, type: "writing", question: "Where do you see yourself working from most of the time?", suggestions: ["Fully Remote", "Co-working Spaces", "Home Office", "Global Travel", "Company HQ", "Hybrid Setup", "Digital Nomad", "Studio/Workshop", "Virtual Office", "Coffee Shops"] },
        { id: 9, type: "writing", question: "What does your ideal life look like in 5 years?", suggestions: ["Financial Freedom", "Global Impact", "Time Wealth", "Legacy Building", "Work-Life Harmony", "Continuous Growth", "Adventure & Travel", "Community Leadership", "Creative Expression", "Personal Mastery"] },
        { id: 10, type: "multi", question: "What matters most in your lifestyle?", instruction: "Select up to 2", options: ["Time Freedom", "Financial Abundance", "Personal Growth", "Professional Autonomy", "Social Recognition", "Work Flexibility", "Location Freedom", "Work-Life Balance", "Other"] },
        { id: 11, type: "multi", question: "What's your preferred work arrangement?", instruction: "Select up to 2", options: ["Solo Founder", "Co-founder Team", "Startup Environment", "Freelance/Consulting", "Remote-First", "Hybrid Model", "Distributed Team", "Office-Based", "Other"] },
        { id: 12, type: "mcq", question: "Which lifestyle path aligns with your vision?", options: ["Founder Lifestyle", "Digital Nomad", "Investor Life", "Creator Economy", "Consultant Path", "Portfolio Career", "Lifestyle Business", "Other"] }
      ]
    },
    {
      day: 3,
      title: "Skills & Strengths",
      subtitle: "Recognize your unique capabilities",
      questions: [
        { id: 13, type: "writing", question: "What are your greatest professional strengths and superpowers?", suggestions: ["Strategic Leadership", "Sales & Negotiation", "Creative Marketing", "Financial Acumen", "Product Vision", "Team Building", "Decision Making", "Crisis Management", "Networking Ability", "Execution Excellence"] },
        { id: 14, type: "writing", question: "Which skills have you developed that set you apart?", suggestions: ["Public Speaking", "Growth Hacking", "Data Analysis", "UX/UI Design", "Coding/Programming", "Project Management", "Copywriting", "Brand Strategy", "Financial Modeling", "People Management"] },
        { id: 15, type: "writing", question: "What do people consistently come to you for help with?", suggestions: ["Strategic Advice", "Creative Solutions", "Problem Solving", "Leadership Guidance", "Growth Strategies", "Technical Support", "Decision Making", "Innovation Ideas", "Execution Plans", "Motivation & Inspiration"] },
        { id: 16, type: "multi", question: "Which skills are your strongest?", instruction: "Select up to 2", options: ["Sales & Marketing", "Leadership & Management", "Financial Operations", "Strategic Planning", "Creative Direction", "Technical Development", "Communication", "Problem Solving", "Other"] },
        { id: 17, type: "multi", question: "What activities do you excel at and enjoy?", instruction: "Select up to 2", options: ["Selling Ideas", "Building Products", "Scaling Operations", "Building Networks", "Strategic Planning", "Data Analysis", "Creative Design", "Team Leadership", "Other"] },
        { id: 18, type: "mcq", question: "What best describes your core strength?", options: ["Visionary Builder", "Strategic Leader", "Innovation Driver", "Operations Expert", "Growth Hacker", "Creative Director", "Relationship Builder", "Other"] }
      ]
    },
    {
      day: 4,
      title: "Career & Wealth",
      subtitle: "Define your professional journey",
      questions: [
        { id: 19, type: "writing", question: "How do you want to generate your primary income?", suggestions: ["Bootstrapped Startup", "Freelance/Consulting", "SaaS Business", "Investment Portfolio", "E-commerce Empire", "Content Creation", "Digital Products", "Coaching/Mentoring", "Affiliate Marketing", "Real Estate Investing"] },
        { id: 20, type: "writing", question: "What drives your career ambitions and financial goals?", suggestions: ["Wealth Creation", "Time Freedom", "Social Impact", "Business Scaling", "Personal Growth", "Industry Recognition", "Financial Security", "Legacy Building", "Luxury Lifestyle", "Early Retirement"] },
        { id: 21, type: "writing", question: "What kind of work do you see yourself doing long-term?", suggestions: ["Entrepreneurship", "Executive Leadership", "Strategic Consulting", "Product Development", "Investment/VC", "Mentorship/Coaching", "Creative Direction", "Innovation Lab", "Social Enterprise", "Board Membership"] },
        { id: 22, type: "multi", question: "What income streams appeal to you?", instruction: "Select up to 2", options: ["Active Income", "Passive Income", "Equity/Stock", "Digital Products", "Investment Returns", "Subscription Model", "Licensing Deals", "Royalties", "Other"] },
        { id: 23, type: "multi", question: "Which career paths interest you most?", instruction: "Select up to 2", options: ["Startup Founder", "Agency Owner", "SaaS Entrepreneur", "Angel Investor", "Business Consultant", "Content Creator", "Product Manager", "Executive Leader", "Other"] },
        { id: 24, type: "mcq", question: "What's your dominant career mindset?", options: ["Growth Builder", "Strategic Scaler", "Value Investor", "Creative Entrepreneur", "Operational Expert", "Risk Taker", "Impact Driver", "Other"] }
      ]
    },
    {
      day: 5,
      title: "Purpose & Impact",
      subtitle: "Discover your deeper meaning",
      questions: [
        { id: 25, type: "writing", question: "What problem in the world do you feel called to solve?", suggestions: ["Education Access", "Climate Change", "Healthcare Innovation", "Economic Inequality", "Tech Accessibility", "Mental Health", "Community Development", "Future of Work", "Sustainable Living", "Digital Privacy"] },
        { id: 26, type: "writing", question: "What kind of impact do you want to leave on the world?", suggestions: ["Empower Others", "Create Opportunities", "Drive Innovation", "Inspire Change", "Build Community", "Transform Industries", "Preserve Resources", "Advance Knowledge", "Foster Connection", "Enable Freedom"] },
        { id: 27, type: "writing", question: "Who do you most want to serve or help through your work?", suggestions: ["Aspiring Entrepreneurs", "Students & Youth", "Small Businesses", "Creative Professionals", "Local Communities", "Global Citizens", "Marginalized Groups", "Future Generations", "Industry Peers", "Society at Large"] },
        { id: 28, type: "multi", question: "How do you want to contribute?", instruction: "Select up to 2", options: ["Building Solutions", "Mentoring Others", "Funding Innovation", "Leading Movements", "Connecting People", "Inspiring Change", "Creating Access", "Sharing Knowledge", "Other"] },
        { id: 29, type: "multi", question: "What drives your sense of purpose?", instruction: "Select up to 2", options: ["Making Impact", "Building Legacy", "Creating Growth", "Driving Vision", "Fostering Innovation", "Serving Others", "Solving Problems", "Empowering People", "Other"] },
        { id: 30, type: "mcq", question: "How do you see your purpose-driven identity?", options: ["Visionary Change-maker", "Innovation Leader", "Community Builder", "Mentor & Guide", "Problem Solver", "Impact Creator", "Legacy Builder", "Other"] }
      ]
    },
    {
      day: 6,
      title: "Vision & Legacy",
      subtitle: "Envision your future success",
      questions: [
        { id: 31, type: "writing", question: "What's your most ambitious 10-year goal?", suggestions: ["Building a Unicorn", "Global Business Empire", "Revolutionizing Industry", "Creating Lasting Impact", "Achieving Financial Freedom", "Leading Major Innovation", "Building Community Legacy", "Transforming Education", "Solving Global Issues", "Inspiring Next Generation"] },
        { id: 32, type: "writing", question: "How do you approach and overcome major challenges?", suggestions: ["Embrace Risk", "Adapt Quickly", "Learn Continuously", "Persist Through Failure", "Strategize Carefully", "Experiment Boldly", "Analyze Deeply", "Pivot Smartly", "Collaborate Widely", "Execute Relentlessly"] },
        { id: 33, type: "writing", question: "What would make you feel truly successful and fulfilled?", suggestions: ["Meaningful Impact", "Financial Abundance", "Personal Freedom", "Legacy Creation", "Industry Influence", "Continuous Growth", "Social Recognition", "Work-Life Harmony", "Community Respect", "Personal Mastery"] },
        { id: 34, type: "multi", question: "What are your primary long-term goals?", instruction: "Select up to 2", options: ["Scale Business", "Build Brand", "Go Global", "Make Investments", "Lead Industry", "Drive Innovation", "Create Impact", "Build Wealth", "Other"] },
        { id: 35, type: "multi", question: "Which traits will help you succeed?", instruction: "Select up to 2", options: ["Risk Tolerance", "Self-Discipline", "Clear Vision", "Strategic Mindset", "Consistent Action", "Adaptability", "Resilience", "Curiosity", "Other"] },
        { id: 36, type: "mcq", question: "What's your ultimate archetype?", options: ["Visionary Leader", "Innovation Builder", "Strategic Creator", "Impact Driver", "Legacy Architect", "Growth Catalyst", "Change Maker", "Other"] }
      ]
    }
  ],

  // ================= MANAGERIAL =================
  managerial: [
    {
      day: 1,
      title: "Passion & Purpose",
      subtitle: "Discover what drives you as a leader",
      questions: [
        { id: 1, type: "writing", question: "What aspects of leadership and management excite you most?", suggestions: ["Team Development", "Strategic Planning", "Process Optimization", "Organizational Growth", "People Management", "Crisis Resolution", "Project Leadership", "Culture Building", "Performance Management", "Change Management"] },
        { id: 2, type: "writing", question: "What gives you satisfaction in your professional role?", suggestions: ["Team Success", "Operational Excellence", "Achieving Goals", "Process Efficiency", "Employee Growth", "Problem Resolution", "Strategic Wins", "Organizational Impact", "Stability Creation", "Quality Improvement"] },
        { id: 3, type: "writing", question: "What work activities fully engage your focus?", suggestions: ["System Design", "Team Coordination", "Performance Analysis", "Strategic Planning", "Process Improvement", "Conflict Resolution", "Resource Allocation", "Goal Setting", "Progress Tracking", "Stakeholder Management"] },
        { id: 4, type: "multi", question: "Which management activities energize you?", instruction: "Select up to 2", options: ["Strategic Planning", "Team Delegation", "Coaching Staff", "Performance Review", "Process Scheduling", "Quality Monitoring", "Resource Management", "Project Coordination", "Other"] },
        { id: 5, type: "multi", question: "How do you prefer to contribute?", instruction: "Select up to 2", options: ["Team Growth", "Organizational Stability", "Performance Excellence", "Structural Efficiency", "Process Coordination", "Quality Assurance", "Strategic Alignment", "Cultural Development", "Other"] },
        { id: 6, type: "mcq", question: "Which leadership style resonates with you?", options: ["Transformational Leader", "Servant Manager", "Strategic Planner", "Operational Coordinator", "Results Driver", "Team Developer", "Process Expert", "Other"] }
      ]
    },
    {
      day: 2,
      title: "Lifestyle & Balance",
      subtitle: "Design your professional lifestyle",
      questions: [
        { id: 7, type: "writing", question: "Describe your ideal work environment and culture", suggestions: ["Corporate Structure", "Professional Office", "Stable Environment", "Process-Driven Culture", "Team-Oriented Space", "Hybrid Work Model", "Structured Setting", "Growth-Oriented Culture", "Collaborative Atmosphere", "Results-Focused Environment"] },
        { id: 8, type: "writing", question: "What's your preferred work rhythm and schedule?", suggestions: ["Structured Routine", "Planned Schedule", "Disciplined Approach", "Consistent Hours", "Sequential Tasks", "Balanced Workload", "Scheduled Meetings", "Deadline-Driven", "Measured Progress", "Regular Reviews"] },
        { id: 9, type: "writing", question: "What lifestyle priorities matter most to you?", suggestions: ["Career Stability", "Financial Security", "Professional Growth", "Work Recognition", "Life Balance", "Organizational Order", "Consistent Routine", "Professional Responsibility", "Career Achievement", "Predictable Success"] },
        { id: 10, type: "multi", question: "What matters most in your career lifestyle?", instruction: "Select up to 2", options: ["Job Security", "Work-Life Balance", "Career Growth", "Organizational Structure", "Professional Respect", "Stability", "Recognition", "Benefits Package", "Other"] },
        { id: 11, type: "multi", question: "What's your preferred working style?", instruction: "Select up to 2", options: ["Team Collaboration", "Strategic Meetings", "Project Planning", "Performance Monitoring", "Team Supervision", "Progress Reporting", "Goal Alignment", "Resource Coordination", "Other"] },
        { id: 12, type: "mcq", question: "Which professional lifestyle fits you best?", options: ["Corporate Leader", "Department Manager", "Team Coordinator", "Administrative Head", "Operations Supervisor", "Strategic Planner", "Project Director", "Other"] }
      ]
    },
    {
      day: 3,
      title: "Skills & Competencies",
      subtitle: "Recognize your management strengths",
      questions: [
        { id: 13, type: "writing", question: "What are your strongest management skills?", suggestions: ["Strategic Leadership", "Organizational Planning", "Team Communication", "Decision Making", "Problem Resolution", "Delegation Mastery", "Performance Coaching", "Data Analytics", "Resource Management", "Conflict Resolution"] },
        { id: 14, type: "writing", question: "Which professional skills have you mastered?", suggestions: ["Team Management", "Project Planning", "Budget Management", "Talent Acquisition", "Staff Training", "Performance Reviews", "Strategy Development", "Operations Management", "Reporting Systems", "Negotiation Skills"] },
        { id: 15, type: "writing", question: "What do colleagues rely on you for?", suggestions: ["Strategic Guidance", "Sound Decisions", "Organizational Planning", "Problem Solutions", "Team Support", "Leadership Direction", "Execution Strategy", "Process Oversight", "Resource Allocation", "Crisis Management"] },
        { id: 16, type: "multi", question: "What are your key management competencies?", instruction: "Select up to 2", options: ["Leadership", "Strategic Planning", "Operations", "Communication", "Data Analytics", "Project Management", "Team Building", "Change Management", "Other"] },
        { id: 17, type: "multi", question: "What management activities do you enjoy most?", instruction: "Select up to 2", options: ["Team Management", "Strategic Planning", "Performance Review", "Process Monitoring", "Staff Coaching", "Strategy Development", "Project Oversight", "Quality Control", "Other"] },
        { id: 18, type: "mcq", question: "What's your core management strength?", options: ["Strategic Leader", "Operational Manager", "Team Coordinator", "Project Director", "Process Optimizer", "People Developer", "Change Agent", "Other"] }
      ]
    },
    {
      day: 4,
      title: "Career & Advancement",
      subtitle: "Map your professional journey",
      questions: [
        { id: 19, type: "writing", question: "How do you want to advance your career?", suggestions: ["Corporate Ladder", "Leadership Track", "Executive Path", "Department Growth", "Strategic Role", "Consulting Career", "Board Positions", "Industry Leadership", "Expert Status", "Organizational Impact"] },
        { id: 20, type: "writing", question: "What drives your professional ambitions?", suggestions: ["Career Growth", "Professional Recognition", "Leadership Role", "Organizational Impact", "Financial Reward", "Expert Status", "Team Success", "Strategic Influence", "Industry Respect", "Legacy Building"] },
        { id: 21, type: "writing", question: "What long-term role do you envision?", suggestions: ["Executive Leadership", "Senior Management", "Department Head", "Strategic Director", "Operations Chief", "Corporate Officer", "Division Leader", "Organizational Head", "Consulting Partner", "Board Member"] },
        { id: 22, type: "multi", question: "Which career paths interest you?", instruction: "Select up to 2", options: ["Corporate Executive", "Department Leadership", "Operations Management", "Strategic Consulting", "HR Leadership", "Project Director", "Change Management", "Organizational Development", "Other"] },
        { id: 23, type: "multi", question: "What compensation matters to you?", instruction: "Select up to 2", options: ["Base Salary", "Performance Bonus", "Benefits Package", "Growth Potential", "Stock Options", "Promotion Track", "Professional Development", "Work Perks", "Other"] },
        { id: 24, type: "mcq", question: "What's your career advancement mindset?", options: ["Growth-Oriented", "Stability-Focused", "Performance-Driven", "Strategic Climber", "Impact-Motivated", "Expert Track", "Leadership Path", "Other"] }
      ]
    },
    {
      day: 5,
      title: "Purpose & Impact",
      subtitle: "Discover your leadership purpose",
      questions: [
        { id: 25, type: "writing", question: "What organizational impact do you want to make?", suggestions: ["Operational Excellence", "Team Performance", "Culture Transformation", "Strategic Growth", "Process Innovation", "Quality Improvement", "Employee Development", "Organizational Efficiency", "Change Leadership", "Sustainable Success"] },
        { id: 26, type: "writing", question: "What workplace problems do you want to solve?", suggestions: ["Inefficient Processes", "Communication Gaps", "Performance Issues", "Team Conflicts", "Resource Constraints", "Quality Problems", "Turnover Issues", "Strategic Misalignment", "Cultural Challenges", "Change Resistance"] },
        { id: 27, type: "writing", question: "Who do you want to help through your work?", suggestions: ["Team Members", "Organizations", "Stakeholders", "Colleagues", "Clients", "Direct Reports", "Executive Team", "Board Members", "Industry Peers", "Community Partners"] },
        { id: 28, type: "multi", question: "How do you want to contribute?", instruction: "Select up to 2", options: ["Team Leadership", "Strategic Planning", "Process Improvement", "Performance Management", "Staff Development", "Organizational Change", "Quality Assurance", "Resource Optimization", "Other"] },
        { id: 29, type: "multi", question: "What drives your leadership purpose?", instruction: "Select up to 2", options: ["Responsibility", "Organizational Stability", "Performance Excellence", "Process Discipline", "Team Success", "Strategic Impact", "Quality Standards", "Sustainable Growth", "Other"] },
        { id: 30, type: "mcq", question: "How do you see your leadership identity?", options: ["Strategic Leader", "Operational Manager", "People Developer", "Process Expert", "Change Catalyst", "Culture Builder", "Results Driver", "Other"] }
      ]
    },
    {
      day: 6,
      title: "Vision & Legacy",
      subtitle: "Envision your leadership legacy",
      questions: [
        { id: 31, type: "writing", question: "What's your ultimate career vision?", suggestions: ["Executive Leadership", "Organizational Transformation", "Industry Influence", "Team Excellence", "Process Innovation", "Cultural Legacy", "Strategic Impact", "Mentorship Legacy", "Sustainable Systems", "Leadership Excellence"] },
        { id: 32, type: "writing", question: "How do you approach leadership challenges?", suggestions: ["Strategic Planning", "Data Analysis", "Team Collaboration", "Process Control", "Structured Problem-Solving", "Stakeholder Alignment", "Risk Management", "Change Leadership", "Resource Optimization", "Performance Metrics"] },
        { id: 33, type: "writing", question: "What defines professional success for you?", suggestions: ["Team Achievement", "Organizational Impact", "Strategic Recognition", "Process Excellence", "Leadership Legacy", "Professional Respect", "Career Milestones", "Institutional Growth", "Mentorship Impact", "Sustainable Systems"] },
        { id: 34, type: "multi", question: "What are your long-term leadership goals?", instruction: "Select up to 2", options: ["Executive Role", "Industry Recognition", "Organizational Impact", "Team Development", "Process Excellence", "Strategic Influence", "Mentorship Legacy", "Change Leadership", "Other"] },
        { id: 35, type: "multi", question: "What traits will drive your success?", instruction: "Select up to 2", options: ["Strategic Thinking", "Consistent Execution", "Emotional Intelligence", "Process Discipline", "Communication Skills", "Decision Making", "Adaptability", "Resilience", "Other"] },
        { id: 36, type: "mcq", question: "What's your leadership archetype?", options: ["Strategic Visionary", "Operational Expert", "People Leader", "Process Master", "Change Agent", "Culture Architect", "Results Driver", "Other"] }
      ]
    }
  ],

  // ================= TECHNICIAN =================
  technician: [
    {
      day: 1,
      title: "Passion & Curiosity",
      subtitle: "Discover what excites you in tech",
      questions: [
        { id: 1, type: "writing", question: "What aspects of technology excite you the most?", suggestions: ["Software Development", "AI & Machine Learning", "System Architecture", "User Experience", "Data Science", "Cloud Computing", "Cybersecurity", "Mobile Development", "DevOps Culture", "Emerging Technologies"] },
        { id: 2, type: "writing", question: "What would you love to build or create?", suggestions: ["Open Source Tools", "Innovative Apps", "Developer Platforms", "AI Solutions", "Automation Systems", "Developer Tools", "Educational Tech", "Creative Software", "Problem-Solving Apps", "Community Platforms"] },
        { id: 3, type: "writing", question: "What gives you satisfaction in technical work?", suggestions: ["Elegant Code", "Solved Problems", "Optimized Systems", "Working Software", "Clean Architecture", "Performance Gains", "Bug Fixes", "User Solutions", "Technical Innovation", "Learning Achievements"] },
        { id: 4, type: "multi", question: "What technical activities do you enjoy?", instruction: "Select up to 2", options: ["Writing Code", "Debugging Issues", "System Design", "Technical Research", "Building Features", "Testing Systems", "Architecture Planning", "Performance Optimization", "Other"] },
        { id: 5, type: "multi", question: "What excites you about technology?", instruction: "Select up to 2", options: ["Building Apps", "Creating Systems", "AI Innovation", "User Experience", "Data Analysis", "Security Challenges", "Performance Tuning", "Learning New Tech", "Other"] },
        { id: 6, type: "mcq", question: "Which technical archetype fits you best?", options: ["Creative Developer", "System Architect", "Problem Solver", "Innovation Engineer", "Code Artisan", "Tech Explorer", "Solution Builder", "Other"] }
      ]
    },
    {
      day: 2,
      title: "Lifestyle & Flow",
      subtitle: "Design your ideal technical lifestyle",
      questions: [
        { id: 7, type: "writing", question: "Describe your ideal technical workday", suggestions: ["Deep Focus Coding", "Remote Work Setup", "Team Collaboration", "Flexible Schedule", "Project-Based Work", "Learning Time", "Creative Flow", "Problem-Solving Mode", "Documentation Work", "Code Review Sessions"] },
        { id: 8, type: "writing", question: "Where do you work most effectively?", suggestions: ["Home Office", "Co-working Space", "Company HQ", "Coffee Shop", "Quiet Library", "Studio Space", "Remote Location", "Lab Environment", "Virtual Office", "Team Space"] },
        { id: 9, type: "writing", question: "What lifestyle do you want to create?", suggestions: ["Work-Life Balance", "Continuous Learning", "Financial Freedom", "Location Independence", "Career Growth", "Technical Mastery", "Creative Freedom", "Team Environment", "Project Variety", "Stable Routine"] },
        { id: 10, type: "multi", question: "What matters most in your work lifestyle?", instruction: "Select up to 2", options: ["Competitive Salary", "Growth Opportunities", "Work Flexibility", "Remote Freedom", "Work-Life Balance", "Learning Culture", "Project Variety", "Team Environment", "Other"] },
        { id: 11, type: "multi", question: "What's your preferred work environment?", instruction: "Select up to 2", options: ["Fully Remote", "Startup Setting", "Corporate Tech", "Agency Work", "Freelance Life", "Product Company", "Consulting Role", "Open Source", "Other"] },
        { id: 12, type: "mcq", question: "Which technical lifestyle suits you?", options: ["Remote Developer", "Startup Engineer", "Corporate Tech Lead", "Freelance Expert", "Product Builder", "Tech Consultant", "Open Source Contributor", "Other"] }
      ]
    },
    {
      day: 3,
      title: "Skills & Mastery",
      subtitle: "Recognize your technical strengths",
      questions: [
        { id: 13, type: "writing", question: "What are your strongest technical abilities?", suggestions: ["Full-Stack Development", "System Architecture", "Algorithm Design", "Database Management", "Cloud Infrastructure", "API Development", "Frontend Craft", "Backend Systems", "DevOps Practices", "Security Engineering"] },
        { id: 14, type: "writing", question: "Which technical skills have you mastered?", suggestions: ["JavaScript/TypeScript", "Python Development", "React/Vue/Angular", "Node.js/Backend", "SQL/NoSQL", "AWS/Azure/GCP", "Docker/K8s", "Git/GitHub", "Testing Frameworks", "CI/CD Pipelines"] },
        { id: 15, type: "writing", question: "What are you known for in technical circles?", suggestions: ["Clean Code", "Problem Solving", "Technical Mentoring", "Architecture Design", "Debugging Skills", "Performance Optimization", "Documentation", "Code Reviews", "Innovation Ideas", "Technical Leadership"] },
        { id: 16, type: "multi", question: "What are your key technical skills?", instruction: "Select up to 2", options: ["Frontend Dev", "Backend Dev", "Full-Stack", "DevOps/Cloud", "Data Science", "Mobile Dev", "Security", "System Design", "Other"] },
        { id: 17, type: "multi", question: "What technical problems do you enjoy solving?", instruction: "Select up to 2", options: ["Complex Bugs", "System Performance", "UI/UX Issues", "Data Challenges", "Security Gaps", "Architecture Design", "Integration Problems", "Scaling Issues", "Other"] },
        { id: 18, type: "mcq", question: "What's your technical role preference?", options: ["Frontend Specialist", "Backend Engineer", "Full-Stack Dev", "DevOps Engineer", "Data Scientist", "Security Expert", "Solutions Architect", "Other"] }
      ]
    },
    {
      day: 4,
      title: "Career & Growth",
      subtitle: "Map your technical career path",
      questions: [
        { id: 19, type: "writing", question: "How do you want to earn as a technologist?", suggestions: ["Full-Time Employment", "Freelance Projects", "Startup Equity", "Contract Work", "Product Development", "Technical Consulting", "Teaching/Courses", "Open Source Sponsorship", "SaaS Creation", "Technical Writing"] },
        { id: 20, type: "writing", question: "What would you love to continue developing?", suggestions: ["Technical Skills", "Leadership Abilities", "Product Sense", "Business Acumen", "Communication Skills", "Architecture Expertise", "Team Collaboration", "Project Management", "Mentorship Abilities", "Innovation Skills"] },
        { id: 21, type: "writing", question: "What defines technical success for you?", suggestions: ["Technical Mastery", "Career Growth", "Financial Freedom", "Impact Creation", "Team Leadership", "Product Success", "Learning Achievement", "Community Recognition", "Innovation Awards", "Mentorship Impact"] },
        { id: 22, type: "multi", question: "What income paths interest you?", instruction: "Select up to 2", options: ["Salaried Role", "Freelance Work", "Startup Path", "Contract Work", "Product Sales", "Tech Consulting", "Course Creation", "Open Source", "Other"] },
        { id: 23, type: "multi", question: "What motivates your career choices?", instruction: "Select up to 2", options: ["Financial Reward", "Skill Growth", "Career Stability", "Learning Freedom", "Work Impact", "Team Culture", "Technical Challenge", "Location Freedom", "Other"] },
        { id: 24, type: "mcq", question: "What's your career direction preference?", options: ["Technical Track", "Leadership Path", "Freelance Route", "Startup Journey", "Consulting Path", "Product Focus", "Teaching Route", "Other"] }
      ]
    },
    {
      day: 5,
      title: "Purpose & Impact",
      subtitle: "Discover your technical purpose",
      questions: [
        { id: 25, type: "writing", question: "What impact do you want through technology?", suggestions: ["Build Useful Tools", "Automate Tasks", "Improve Efficiency", "Enable Creativity", "Solve Real Problems", "Empower Users", "Create Access", "Innovate Solutions", "Simplify Complexity", "Connect People"] },
        { id: 26, type: "writing", question: "What technical problems excite you to solve?", suggestions: ["System Performance", "User Experience", "Data Challenges", "Security Issues", "Integration Problems", "Scalability Hurdles", "Automation Needs", "Accessibility Gaps", "Innovation Barriers", "Technical Debt"] },
        { id: 27, type: "writing", question: "Who do you want to help with your skills?", suggestions: ["End Users", "Fellow Developers", "Small Businesses", "Non-profits", "Startups", "Students/Learners", "Open Source Community", "Local Organizations", "Global Citizens", "Future Technologists"] },
        { id: 28, type: "multi", question: "How do you want to help through tech?", instruction: "Select up to 2", options: ["Building Tools", "Creating Solutions", "Teaching Others", "Consulting Work", "Open Source", "Technical Writing", "Mentoring", "Problem Solving", "Other"] },
        { id: 29, type: "multi", question: "What value do you want to create?", instruction: "Select up to 2", options: ["Innovative Solutions", "Technical Excellence", "User Empowerment", "System Efficiency", "Quality Products", "Knowledge Sharing", "Community Building", "Problem Resolution", "Other"] },
        { id: 30, type: "mcq", question: "What drives your technical purpose?", options: ["Building Solutions", "Solving Problems", "Innovating Tech", "Teaching Others", "Optimizing Systems", "Creating Value", "Empowering Users", "Other"] }
      ]
    },
    {
      day: 6,
      title: "Vision & Mastery",
      subtitle: "Envision your technical future",
      questions: [
        { id: 31, type: "writing", question: "What's your ultimate technical vision?", suggestions: ["Technical Leadership", "Expert Status", "Innovation Creation", "Open Source Impact", "Product Success", "Team Building", "Architecture Excellence", "Community Influence", "Startup Creation", "Teaching Legacy"] },
        { id: 32, type: "writing", question: "How do you approach technical challenges?", suggestions: ["Debug Methodically", "Learn Continuously", "Iterate Quickly", "Analyze Deeply", "Experiment Boldly", "Collaborate Widely", "Document Thoroughly", "Test Rigorously", "Optimize Constantly", "Refactor Regularly"] },
        { id: 33, type: "writing", question: "What does technical success look like?", suggestions: ["Code Excellence", "System Reliability", "User Satisfaction", "Team Impact", "Innovation Recognition", "Learning Growth", "Problem Solutions", "Product Quality", "Community Respect", "Career Achievement"] },
        { id: 34, type: "multi", question: "What are your technical growth goals?", instruction: "Select up to 2", options: ["Deep Expertise", "Architecture Skills", "Team Leadership", "Product Vision", "Technical Impact", "Innovation Track", "Mentorship Role", "Community Building", "Other"] },
        { id: 35, type: "multi", question: "What traits will drive your success?", instruction: "Select up to 2", options: ["Curiosity", "Persistence", "Problem-Solving", "Learning Agility", "Attention to Detail", "Creativity", "Collaboration", "Technical Excellence", "Other"] },
        { id: 36, type: "mcq", question: "What's your technical archetype?", options: ["Code Artisan", "System Architect", "Innovation Engineer", "Tech Leader", "Problem Solver", "Product Builder", "Learning Expert", "Other"] }
      ]
    }
  ]
};

export default questions;