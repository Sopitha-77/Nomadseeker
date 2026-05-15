import { createContext, useContext, useState, useCallback, useMemo } from "react";
import questions from "../data/questions";

const IkigaiContext = createContext(null);

/* ─── PALETTE (matches SevenDays gradient world) ─────────────────────────── */
export const PALETTE = {
  darkNavy:   "rgb(26,54,93)",
  blue:       "rgb(43,108,176)",
  lightBlue:  "rgb(74,144,226)",
  pale1:      "rgb(214,239,255)",
  pale2:      "rgb(185,226,255)",
  // Ikigai-quadrant colors (matching the classic Ikigai wheel)
  loveColor:    "#10B981",  // emerald (What you LOVE)
  goodAtColor:  "#F59E0B",  // amber (What you're GOOD AT)
  worldColor:   "#EF4444",  // rose-red (What the WORLD NEEDS)
  paidColor:    "#F97316",  // orange (What you can be PAID FOR)
};

/* ─── ROLE METADATA ──────────────────────────────────────────────────────── */
const ROLE_META = {
  entrepreneur: {
    id: "entrepreneur",
    label: "Entrepreneur",
    icon: "🌍",
    color: PALETTE.lightBlue,
    bg: "rgba(74,144,226,0.08)",
    accent: "rgba(74,144,226,0.25)",
    description: "Building ventures, startups & independent businesses",
  },
  managerial: {
    id: "managerial",
    label: "Managerial",
    icon: "📊",
    color: PALETTE.blue,
    bg: "rgba(43,108,176,0.08)",
    accent: "rgba(43,108,176,0.25)",
    description: "Leading teams, driving processes & corporate growth",
  },
  technician: {
    id: "technician",
    label: "Technician",
    icon: "🔧",
    color: PALETTE.darkNavy,
    bg: "rgba(26,54,93,0.07)",
    accent: "rgba(26,54,93,0.2)",
    description: "Building products, coding & technical craft",
  },
};

/* ─── DAY THEMES ─────────────────────────────────────────────────────────── */
const DAY_THEMES = [
  { color: PALETTE.lightBlue, bg: "rgba(74,144,226,0.08)", accent: "rgba(74,144,226,0.25)", icon: "❤️", subtitle: "What ignites your soul" },
  { color: PALETTE.blue,      bg: "rgba(43,108,176,0.08)", accent: "rgba(43,108,176,0.25)", icon: "🌟", subtitle: "How you want to live" },
  { color: PALETTE.darkNavy,  bg: "rgba(26,54,93,0.07)",   accent: "rgba(26,54,93,0.2)",    icon: "⚡", subtitle: "What you do best" },
  { color: PALETTE.lightBlue, bg: "rgba(74,144,226,0.08)", accent: "rgba(74,144,226,0.25)", icon: "💼", subtitle: "How you earn & grow" },
  { color: PALETTE.blue,      bg: "rgba(43,108,176,0.08)", accent: "rgba(43,108,176,0.25)", icon: "🎯", subtitle: "Why you do what you do" },
  { color: PALETTE.darkNavy,  bg: "rgba(26,54,93,0.07)",   accent: "rgba(26,54,93,0.2)",    icon: "🗺️", subtitle: "Where you're headed" },
];

/* ─── TRAIT TAXONOMY ──────────────────────────────────────────────────────── */
const TRAIT_PATTERNS = {
  "Visionary Thinker":          ["vision", "future", "imagine", "dream", "long-term", "big picture", "10-year", "horizon", "innovate", "transform"],
  "Analytical Mind":            ["analyze", "logic", "data", "research", "investigate", "system", "methodical", "rational", "evidence", "metrics"],
  "Creative Innovator":         ["create", "design", "invent", "original", "unique", "fresh", "imaginative", "artistic", "novel", "innovation"],
  "Strategic Planner":          ["strategy", "plan", "roadmap", "goal", "milestone", "objective", "framework", "structure", "blueprint", "playbook"],
  "Empathetic Connector":       ["empathy", "understand", "listen", "people", "care", "compassion", "support", "human", "relationship", "connect"],
  "Bold Risk-Taker":            ["risk", "bold", "courage", "venture", "leap", "dare", "fearless", "ambitious", "daring", "audacious"],
  "Pragmatic Executor":         ["execute", "deliver", "ship", "implement", "practical", "results", "action", "doer", "finish", "complete"],
  "Collaborative Leader":       ["team", "together", "collaborate", "lead", "guide", "mentor", "coach", "inspire", "unite", "rally"],
  "Detail-Oriented Craftsman":  ["detail", "precise", "accurate", "thorough", "quality", "meticulous", "craft", "perfect", "polish", "refine"],
  "Curious Explorer":           ["learn", "curious", "explore", "discover", "study", "read", "question", "experiment", "growth", "wonder"],
  "Independent Spirit":         ["freedom", "independent", "autonomous", "solo", "remote", "flexible", "self", "own", "nomad", "anywhere"],
  "Driven Achiever":            ["achieve", "success", "win", "excel", "wealth", "growth", "scale", "results", "money", "performance"],
  "Purposeful Mentor":          ["teach", "mentor", "guide", "share", "educate", "wisdom", "uplift", "help", "serve", "impact"],
  "Builder & Maker":            ["build", "make", "code", "develop", "construct", "engineer", "product", "tool", "platform", "system"],
};

/* ─── STRENGTH PATTERNS ──────────────────────────────────────────────────── */
const STRENGTH_PATTERNS = {
  "Problem Solving":      ["solve", "fix", "debug", "resolve", "diagnose", "troubleshoot", "challenge", "puzzle"],
  "Communication":        ["communicate", "speak", "write", "present", "articulate", "express", "story", "pitch"],
  "Creative Design":      ["design", "creative", "aesthetic", "visual", "art", "ux", "ui", "brand"],
  "Strategic Thinking":   ["strategy", "plan", "vision", "framework", "long-term", "direction", "foresight"],
  "Leadership":           ["lead", "guide", "direct", "manage", "mentor", "coach", "inspire", "rally"],
  "Technical Mastery":    ["code", "engineer", "technical", "develop", "build", "program", "architecture"],
  "Empathy & EQ":         ["empathy", "emotional", "listen", "understand", "compassion", "care", "intuit"],
  "Adaptability":         ["adapt", "flexible", "pivot", "agile", "learn", "change", "evolve"],
  "Attention to Detail":  ["detail", "precise", "thorough", "meticulous", "quality", "accurate", "polish"],
  "Execution & Delivery": ["execute", "deliver", "ship", "complete", "deadline", "finish", "action"],
  "Networking":           ["network", "connect", "relationship", "people", "community", "outreach"],
  "Financial Acumen":     ["finance", "invest", "money", "wealth", "revenue", "profit", "roi"],
};

/* ─── CAREER MAPPING by trait combinations ───────────────────────────────── */
const CAREER_MAP = {
  entrepreneur: {
    "Visionary Thinker":       ["Startup Founder", "Venture Builder", "Innovation Catalyst"],
    "Bold Risk-Taker":         ["Serial Entrepreneur", "Early-Stage Founder", "Disruptive Innovator"],
    "Creative Innovator":      ["Creative Agency Founder", "Product Studio Owner", "Brand Architect"],
    "Strategic Planner":       ["Growth Strategy Consultant", "Business Model Designer", "Scaling Advisor"],
    "Builder & Maker":         ["Indie Hacker / Solo Founder", "SaaS Builder", "Bootstrapped Founder"],
    "Driven Achiever":         ["Scale-Up CEO", "Growth-Stage Founder", "Empire Builder"],
    "Independent Spirit":      ["Digital Nomad Entrepreneur", "Remote Business Owner", "Lifestyle Founder"],
    "Empathetic Connector":    ["Community-Led Founder", "Mission-Driven Entrepreneur", "Social Venture Builder"],
  },
  managerial: {
    "Collaborative Leader":    ["Director of Operations", "Head of People & Culture", "Team Lead / VP"],
    "Strategic Planner":       ["Chief of Staff", "Strategy Director", "Program Manager"],
    "Visionary Thinker":       ["Senior Director", "VP of Strategy", "Transformation Lead"],
    "Empathetic Connector":    ["People Operations Lead", "HR Business Partner", "Talent Director"],
    "Detail-Oriented Craftsman":["Operations Manager", "Process Improvement Lead", "Quality Director"],
    "Pragmatic Executor":      ["Project Manager", "Delivery Lead", "Implementation Manager"],
    "Driven Achiever":         ["Regional Manager", "General Manager", "Business Unit Head"],
    "Analytical Mind":         ["Business Operations Analyst", "Performance Manager", "Insights Lead"],
  },
  technician: {
    "Builder & Maker":         ["Senior Software Engineer", "Full-Stack Developer", "Product Engineer"],
    "Analytical Mind":         ["Data Engineer", "ML Engineer", "Systems Analyst"],
    "Creative Innovator":      ["UI/UX Engineer", "Creative Technologist", "Front-End Specialist"],
    "Detail-Oriented Craftsman":["Software Architect", "Quality Engineer", "Platform Engineer"],
    "Curious Explorer":        ["R&D Engineer", "Developer Advocate", "Research Engineer"],
    "Independent Spirit":      ["Freelance Developer", "Remote Tech Consultant", "Digital Nomad Engineer"],
    "Pragmatic Executor":      ["DevOps Engineer", "Site Reliability Engineer", "Release Engineer"],
    "Strategic Planner":       ["Tech Lead", "Engineering Manager", "Solutions Architect"],
  },
};

/* ─── TEXT EXTRACTION ────────────────────────────────────────────────────── */
function extractAllResponses(answers) {
  const out = [];
  Object.entries(answers || {}).forEach(([qId, a]) => {
    if (a == null) return;
    if (typeof a === "string") {
      if (a.trim()) out.push({ qId, text: a.trim() });
    } else if (Array.isArray(a)) {
      a.forEach((x) => x && out.push({ qId, text: String(x).trim() }));
    } else if (typeof a === "object") {
      if (a.text?.trim()) out.push({ qId, text: a.text.trim() });
      if (Array.isArray(a.selected)) a.selected.forEach((x) => x && out.push({ qId, text: String(x).trim() }));
      if (a.mcq?.trim()) out.push({ qId, text: a.mcq.trim() });
      if (a.other?.trim()) out.push({ qId, text: a.other.trim() });
    }
  });
  return out;
}

/* ─── CORE TRAIT ANALYZER ─────────────────────────────────────────────────── */
function analyzeAnswers(answers, role) {
  const responses = extractAllResponses(answers);
  const combinedText = responses.map((r) => r.text).join(" ").toLowerCase();
  const responseTexts = responses.map((r) => r.text);

  // Trait scoring
  const traitScores = {};
  for (const [trait, kws] of Object.entries(TRAIT_PATTERNS)) {
    let score = 0;
    kws.forEach((kw) => {
      const k = kw.toLowerCase();
      if (combinedText.includes(k)) score += 1;
      if (responseTexts.some((r) => r.toLowerCase() === k)) score += 1.5;
      responseTexts.forEach((r) => {
        if (r.toLowerCase().includes(k) && r.length < 60) score += 0.4;
      });
    });
    if (score > 0) traitScores[trait] = score;
  }

  const roleBoosts = {
    entrepreneur: ["Visionary Thinker", "Bold Risk-Taker", "Driven Achiever", "Strategic Planner"],
    managerial:   ["Collaborative Leader", "Strategic Planner", "Pragmatic Executor", "Empathetic Connector"],
    technician:   ["Builder & Maker", "Analytical Mind", "Detail-Oriented Craftsman", "Curious Explorer"],
  };
  (roleBoosts[role] || []).forEach((t) => {
    traitScores[t] = (traitScores[t] || 0) + 0.8;
  });

  const traits = Object.entries(traitScores)
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t)
    .slice(0, 6);

  // Strength scoring
  const strengthScores = {};
  for (const [s, kws] of Object.entries(STRENGTH_PATTERNS)) {
    let score = 0;
    kws.forEach((kw) => {
      if (combinedText.includes(kw.toLowerCase())) score += 1;
    });
    if (score > 0) strengthScores[s] = score;
  }
  const strengths = Object.entries(strengthScores)
    .sort((a, b) => b[1] - a[1])
    .map(([s]) => s)
    .slice(0, 5);

  // Ikigai 4-dimension scoring with question-id awareness
  const dimensions = { love: 0, goodAt: 0, paidFor: 0, worldNeeds: 0 };
  responses.forEach(({ qId, text }) => {
    const t = text.toLowerCase();
    const dayMatch = String(qId).match(/d(\d+)/i);
    const dayNum = dayMatch ? parseInt(dayMatch[1], 10) : 0;
    const wordWeight = Math.min(text.split(/\s+/).length / 3, 4);

    if (dayNum === 1) dimensions.love += 1.5 + wordWeight * 0.5;
    if (dayNum === 3) dimensions.goodAt += 1.5 + wordWeight * 0.5;
    if (dayNum === 4) dimensions.paidFor += 1.5 + wordWeight * 0.5;
    if (dayNum === 5) dimensions.worldNeeds += 1.5 + wordWeight * 0.5;
    if (dayNum === 2 || dayNum === 6) {
      if (/love|passion|enjoy|excite|thrill/.test(t)) dimensions.love += 0.6;
      if (/skill|good at|strength|master|expert/.test(t)) dimensions.goodAt += 0.6;
      if (/income|money|wealth|earn|paid|business|revenue/.test(t)) dimensions.paidFor += 0.6;
      if (/help|impact|change|world|community|serve|mission/.test(t)) dimensions.worldNeeds += 0.6;
    }

    if (/love|passion|enjoy|excite|obsess|favorite|alive/.test(t)) dimensions.love += 0.3;
    if (/skill|expert|master|talent|advantage|good at/.test(t)) dimensions.goodAt += 0.3;
    if (/income|money|wealth|earn|paid|profit|salary/.test(t)) dimensions.paidFor += 0.3;
    if (/help|impact|world|community|serve|change|mission|problem/.test(t)) dimensions.worldNeeds += 0.3;
  });

  Object.keys(dimensions).forEach((k) => {
    if (dimensions[k] < 1) dimensions[k] = 1.2;
  });

  const careerHints = [];
  const careerForRole = CAREER_MAP[role] || {};
  traits.forEach((t) => {
    const careers = careerForRole[t];
    if (careers) careerHints.push(...careers);
  });
  if (careerHints.length === 0 && role) {
    const allRoleCareers = Object.values(careerForRole).flat();
    careerHints.push(...allRoleCareers.slice(0, 6));
  }

  const uniqueCareers = [...new Set(careerHints)].slice(0, 6);

  return {
    traits,
    strengths,
    dimensions,
    careerHints: uniqueCareers,
    responseCount: responses.length,
    rawResponses: responseTexts,
  };
}

/* ─── PERSONALIZED INSIGHT BUILDER ────────────────────────────────────────── */
function buildResult(answers, role, analysis) {
  const responses = extractAllResponses(answers);
  const roleMeta = ROLE_META[role] || ROLE_META.entrepreneur;
  const topTraits = analysis.traits.slice(0, 3);
  const topStrengths = analysis.strengths.slice(0, 3);

  const dayThemes = {};
  responses.forEach(({ qId, text }) => {
    const m = String(qId).match(/d(\d+)/i);
    const d = m ? parseInt(m[1], 10) : 0;
    if (!dayThemes[d]) dayThemes[d] = [];
    dayThemes[d].push(text);
  });

  const passionThemes = (dayThemes[1] || []).filter((t) => t.length > 2);
  const strengthThemes = (dayThemes[3] || []).filter((t) => t.length > 2);
  const careerThemes = (dayThemes[4] || []).filter((t) => t.length > 2);
  const purposeThemes = (dayThemes[5] || []).filter((t) => t.length > 2);
  const visionThemes = (dayThemes[6] || []).filter((t) => t.length > 2);

  const pickShort = (arr, max = 3) =>
    arr.filter((t) => t.split(/\s+/).length <= 5 && t.length < 50).slice(0, max);

  const passionArea =
    pickShort(passionThemes, 3).join(", ") ||
    passionThemes[0]?.split(/[.,;]/)[0]?.trim().slice(0, 80) ||
    "Creating things you care deeply about";

  const strengthArea =
    pickShort(strengthThemes, 3).join(", ") ||
    topStrengths.slice(0, 3).join(", ") ||
    "Your natural talents";

  const vocationArea =
    pickShort(careerThemes, 3).join(", ") ||
    careerThemes[0]?.split(/[.,;]/)[0]?.trim().slice(0, 80) ||
    analysis.careerHints[0] ||
    "Work that compensates you well";

  const missionArea =
    pickShort(purposeThemes, 3).join(", ") ||
    purposeThemes[0]?.split(/[.,;]/)[0]?.trim().slice(0, 80) ||
    "Problems you feel called to solve";

  // ── Ikigai Title ────────────────────────────────────────────────────────
  const titleTemplates = {
    entrepreneur: [
      `The ${topTraits[0] || "Visionary"} Founder Forging ${topStrengths[0] || "Impact"}`,
      `Building ${passionArea.split(",")[0]?.trim() || "Bold Ventures"} as a ${topTraits[1] || "Driven"} ${roleMeta.label}`,
      `${topTraits[0] || "Visionary"} ${roleMeta.label}: Where ${topStrengths[0] || "Strategy"} Meets ${topStrengths[1] || "Vision"}`,
    ],
    managerial: [
      `The ${topTraits[0] || "Strategic"} Leader Who Builds Through ${topStrengths[0] || "People"}`,
      `Orchestrating ${passionArea.split(",")[0]?.trim() || "Excellence"} with ${topStrengths[0] || "Leadership"}`,
      `${topTraits[0] || "Empathetic"} ${roleMeta.label}: Architect of ${topStrengths[0] || "Teams"} & ${topStrengths[1] || "Strategy"}`,
    ],
    technician: [
      `The ${topTraits[0] || "Curious"} Builder Crafting ${topStrengths[0] || "Solutions"}`,
      `Engineering ${passionArea.split(",")[0]?.trim() || "Elegant Systems"} with ${topStrengths[0] || "Precision"}`,
      `${topTraits[0] || "Analytical"} ${roleMeta.label}: Where ${topStrengths[0] || "Code"} Becomes ${topStrengths[1] || "Craft"}`,
    ],
  };

  const titles = titleTemplates[role] || titleTemplates.entrepreneur;
  const ikigaiTitle = titles[(analysis.responseCount + (topTraits[0]?.length || 0)) % titles.length];

  // ── Ikigai Summary ──────────────────────────────────────────────────────
  const passionPart = passionThemes.length
    ? `Your answers reveal a strong pull toward ${pickShort(passionThemes, 2).join(" and ") || "what you love"}`
    : `You are drawn to work that matters`;

  const strengthPart = topStrengths.length
    ? `, paired with real talent in ${topStrengths.slice(0, 2).join(" and ").toLowerCase()}`
    : `, with genuine strengths waiting to be channeled`;

  const purposePart = purposeThemes.length
    ? `. The impact you described — ${(pickShort(purposeThemes, 1)[0] || purposeThemes[0]?.slice(0, 60) || "creating change")} — is the thread that ties everything together.`
    : `. Your purpose is taking clear shape.`;

  const ikigaiSummary = `${passionPart}${strengthPart}${purposePart}`;

  // ── Work Style ──────────────────────────────────────────────────────────
  const wantsFreedom = responses.some((r) => /remote|flexible|nomad|freedom|anywhere|independent|own time/i.test(r.text));
  const wantsTeam = responses.some((r) => /team|collaborate|together|community|partner/i.test(r.text));
  const wantsFocus = responses.some((r) => /focus|deep work|solo|alone|quiet/i.test(r.text));

  let workStyle = "You thrive in environments where ";
  if (wantsFreedom && wantsTeam) workStyle += "you can move freely while staying connected to a tribe that gets you. ";
  else if (wantsFreedom) workStyle += "location and schedule bend to your rhythm — not the other way around. ";
  else if (wantsTeam) workStyle += "smart, kind people surround you and the work compounds together. ";
  else if (wantsFocus) workStyle += "deep, uninterrupted focus is respected and outcomes speak louder than presence. ";
  else workStyle += "your contribution is visible and your growth is intentional. ";

  if (topTraits.includes("Bold Risk-Taker") || topTraits.includes("Driven Achiever")) {
    workStyle += "You need stakes — work without skin in the game will feel hollow.";
  } else if (topTraits.includes("Empathetic Connector")) {
    workStyle += "The people you serve matter as much as the outcome itself.";
  } else if (topTraits.includes("Builder & Maker")) {
    workStyle += "You need the freedom to make, ship, and iterate without permission.";
  } else {
    workStyle += "Autonomy, mastery, and purpose are non-negotiable.";
  }

  // ── Personal Insight ────────────────────────────────────────────────────
  const traitCombo = topTraits.slice(0, 2).join(" + ");
  const personalInsight = topTraits.length >= 2
    ? `The combination of ${traitCombo} is unusual — most people lean heavily into one or the other. You carry both, which means you can ${
        topTraits[0]?.includes("Visionary") || topTraits[0]?.includes("Creative")
          ? "see what others can't yet see, then actually build it"
          : topTraits[0]?.includes("Analytical") || topTraits[0]?.includes("Detail")
          ? "go deep on the hard problems while still seeing the larger arc"
          : "lead with conviction while staying genuinely curious about being wrong"
      }. That's your unfair advantage.`
    : `Your responses show someone who refuses easy categorization. Trust that — it's a signal, not a problem.`;

  // ── Motivation Line ─────────────────────────────────────────────────────
  const visionLine = visionThemes[0] || purposeThemes[0] || "";
  let motivationLine;
  if (visionLine && visionLine.length > 10) {
    motivationLine = `You're driven by something specific — ${visionLine.slice(0, 100).replace(/\.$/, "")}. Stay with that.`;
  } else if (topTraits.includes("Driven Achiever")) {
    motivationLine = "You're driven by the gap between where you are and what you know you're capable of. That gap is the engine.";
  } else if (topTraits.includes("Empathetic Connector") || topTraits.includes("Purposeful Mentor")) {
    motivationLine = "You're driven by the people whose lives change because you showed up. Don't lose sight of them.";
  } else if (topTraits.includes("Independent Spirit")) {
    motivationLine = "You're driven by the right to build a life on your own terms. Protect that fiercely.";
  } else if (topTraits.includes("Creative Innovator") || topTraits.includes("Builder & Maker")) {
    motivationLine = "You're driven by the act of making things that didn't exist before. That's a rare fire — feed it.";
  } else {
    motivationLine = `You're driven by ${(purposeThemes[0] || "purpose work that matters").slice(0, 70)}. That's your true north.`;
  }

  // ── Career Paths ────────────────────────────────────────────────────────
  let careerPaths = analysis.careerHints.slice(0, 3);
  if (careerPaths.length < 3) {
    const allRoleCareers = Object.values(CAREER_MAP[role] || {}).flat();
    careerPaths = [...new Set([...careerPaths, ...allRoleCareers])].slice(0, 3);
  }

  return {
    ikigaiTitle,
    ikigaiSummary,
    careerPaths,
    workStyle,
    personalInsight,
    motivationLine,
    passionArea,
    strengthArea,
    missionArea,
    vocationArea,
    personalityAnalysis: analysis,
  };
}

/* ─── PROVIDER ──────────────────────────────────────────────────────────── */
export function IkigaiProvider({ children }) {
  const [screen, setScreen]             = useState("landing");
  const [role, setRole]                 = useState(null);
  const [dayIndex, setDayIndex]         = useState(0);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [answers, setAnswers]           = useState({});
  const [completedDays, setCompletedDays] = useState([]);
  const [result, setResult]             = useState(null);
  const [justCompletedDay, setJustCompletedDay] = useState(null);
  const [personalityAnalysis, setPersonalityAnalysis] = useState(null);

  const roleQuestions = useMemo(() => (role ? questions[role] || [] : []), [role]);

  const enrichedDays = useMemo(
    () =>
      roleQuestions.map((d, i) => ({
        ...d,
        ...DAY_THEMES[i] || DAY_THEMES[0],
        description: `Explore your ${(d.title || "").toLowerCase()} through honest reflection.`,
      })),
    [roleQuestions]
  );

  const currentDayData = enrichedDays[dayIndex] || enrichedDays[0] || { questions: [] };

  const goToRoleSelect = () => setScreen("roleSelect");

  const selectRoleAndBegin = (selectedRole) => {
    setRole(selectedRole);
    setDayIndex(0);
    setQuestionIndex(-1);
    setAnswers({});
    setCompletedDays([]);
    setResult(null);
    setJustCompletedDay(null);
    setPersonalityAnalysis(null);
    setScreen("journey");
  };

  const startDay = () => setQuestionIndex(0);

  const handleAnswer = (qId, ans) => {
    const newAnswers = { ...answers, [qId]: ans };
    setAnswers(newAnswers);
    const isLast = questionIndex >= (currentDayData.questions?.length || 0) - 1;
    if (!isLast) {
      setQuestionIndex((p) => p + 1);
    } else {
      setCompletedDays((p) => [...new Set([...p, currentDayData.day])]);
      setJustCompletedDay(currentDayData.day);
      setScreen("dayComplete");
    }
  };

  const goBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex((q) => q - 1);
    } else if (dayIndex > 0) {
      const prevDay = enrichedDays[dayIndex - 1];
      const lastQ = (prevDay?.questions?.length || 1) - 1;
      setDayIndex(dayIndex - 1);
      setQuestionIndex(lastQ);
    }
  };

  const afterCelebration = () => {
    const isLastDay = dayIndex >= roleQuestions.length - 1;
    if (isLastDay) {
      computeResult(answers);
    } else {
      setDayIndex((p) => p + 1);
      setQuestionIndex(-1);
      setJustCompletedDay(null);
      setScreen("journey");
    }
  };

  const computeResult = useCallback(
    (allAnswers) => {
      setScreen("loading");
      setTimeout(() => {
        const analysis = analyzeAnswers(allAnswers, role);
        const built = buildResult(allAnswers, role, analysis);
        setPersonalityAnalysis(analysis);
        setResult(built);
        setScreen("result");
      }, 1800);
    },
    [role]
  );

  const restart = () => {
    setScreen("landing");
    setRole(null);
    setDayIndex(0);
    setQuestionIndex(-1);
    setAnswers({});
    setCompletedDays([]);
    setResult(null);
    setJustCompletedDay(null);
    setPersonalityAnalysis(null);
  };

  const getCurrentAnalysis = useCallback(() => {
    if (personalityAnalysis) return personalityAnalysis;
    if (Object.keys(answers).length > 0) return analyzeAnswers(answers, role);
    return { traits: [], strengths: [], dimensions: { love: 1, goodAt: 1, paidFor: 1, worldNeeds: 1 }, careerHints: [], rawResponses: [] };
  }, [personalityAnalysis, answers, role]);

  return (
    <IkigaiContext.Provider
      value={{
        screen,
        setScreen,
        role,
        dayIndex,
        questionIndex,
        answers,
        completedDays,
        result,
        currentDayData,
        allDays: enrichedDays,
        justCompletedDay,
        personalityAnalysis,
        roleMeta: ROLE_META[role] || {},
        ROLE_META,
        PALETTE,
        goToRoleSelect,
        selectRoleAndBegin,
        startDay,
        handleAnswer,
        goBack,
        afterCelebration,
        restart,
        computeResult,
        getCurrentAnalysis,
        analyzeAnswers: (a) => analyzeAnswers(a, role),
      }}
    >
      {children}
    </IkigaiContext.Provider>
  );
}

export function useIkigai() {
  const ctx = useContext(IkigaiContext);
  if (!ctx) throw new Error("useIkigai must be used inside <IkigaiProvider>");
  return ctx;
}

export default IkigaiContext;