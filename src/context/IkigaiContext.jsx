import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import questions from "../data/questions.js";

/* ════════════════════════════════════════════════════════════════
   DESIGN PALETTE  ·  shared across every component
   ════════════════════════════════════════════════════════════════ */
export const PALETTE = {
  tiber: "rgb(20, 68, 71)",
  deepTeal: "rgb(20, 68, 71)",
  mediumTeal: "rgb(43, 135, 141)",
  brightTeal: "rgb(97, 206, 207)", // #61CECF — the active accent
  accentHex: "#61CECF",
  lightMint: "rgb(223, 246, 246)",
  white: "#ffffff",
  ink: "#0e2f31",
};

/*
   Per-day visual metadata. Headline copy follows the requested flow:
     Day 1 → Passion
     Day 2 → Lifestyle
     Day 3 → Skills
     Day 4 → Vocation
     Day 5 → Mission
     Day 6 → Vision
     Day 7 → Ikigai Result 🚀  (rendered by ProgressBar only)
*/
export const DAYS_META = [
  { day: 1, icon: "❤️",  color: "rgb(97, 206, 207)", accent: "rgba(97,206,207,0.32)", bg: "rgba(97,206,207,0.12)",
    headline: "Passion",   description: "Explore the activities, topics and experiences that make you feel most alive." },
  { day: 2, icon: "🌿",  color: "rgb(58, 175, 176)", accent: "rgba(58,175,176,0.32)", bg: "rgba(58,175,176,0.12)",
    headline: "Lifestyle", description: "Picture the rhythm, freedom and environment you want your days to have." },
  { day: 3, icon: "⚡",  color: "rgb(43, 135, 141)", accent: "rgba(43,135,141,0.32)", bg: "rgba(43,135,141,0.12)",
    headline: "Skills",    description: "Identify the skills and talents that come naturally and powerfully to you." },
  { day: 4, icon: "💼",  color: "rgb(32, 110, 116)", accent: "rgba(32,110,116,0.32)", bg: "rgba(32,110,116,0.12)",
    headline: "Vocation",  description: "Clarify how you want to grow, earn and be valued professionally." },
  { day: 5, icon: "🎯",  color: "rgb(24, 88, 92)",   accent: "rgba(24,88,92,0.30)",   bg: "rgba(24,88,92,0.10)",
    headline: "Mission",   description: "Connect with the impact you want to have on the world around you." },
  { day: 6, icon: "🗺️",  color: "rgb(20, 68, 71)",   accent: "rgba(20,68,71,0.28)",   bg: "rgba(20,68,71,0.10)",
    headline: "Vision",    description: "Synthesise everything into a clear, actionable vision for your future." },
];

/* Step 7 — the result reveal (used by ProgressBar's step rail) */
export const RESULT_STEP = {
  day: 7,
  icon: "🚀",
  color: "rgb(97, 206, 207)",
  headline: "Ikigai Result",
};

/* Role display metadata */
export const ROLES = {
  entrepreneur: { icon: "🌍", name: "Entrepreneur", tagline: "Build & Found" },
  managerial:   { icon: "📊", name: "Managerial",   tagline: "Lead & Organise" },
  technician:   { icon: "🔧", name: "Technician",   tagline: "Build & Craft" },
};

/* ════════════════════════════════════════════════════════════════
   TRAIT ENGINE
   ----------------------------------------------------------------
   Every keyword that can appear in an option / suggestion / written
   answer is mapped to one or more personality dimensions. The engine
   scans ALL of a user's responses, scores each dimension, and derives
   traits, strengths, interests, the four Ikigai quadrants AND three
   recommended career paths — entirely from the user's own selections.
   ════════════════════════════════════════════════════════════════ */

const TRAIT_RULES = [
  { key: "visionary",    label: "Visionary Thinker",    match: ["vision", "innovat", "disrupt", "future", "idea", "big-picture", "10-year", "legacy", "transform", "imagine"] },
  { key: "builder",      label: "Hands-on Builder",     match: ["build", "product", "system", "architect", "create", "develop", "mvp", "ship", "craft", "code", "design", "engineer"] },
  { key: "strategic",    label: "Strategic Planner",    match: ["strateg", "plan", "analy", "data", "logic", "structure", "decision", "framework", "model", "process"] },
  { key: "leader",       label: "Natural Leader",       match: ["lead", "manage", "team", "mentor", "coach", "delegat", "guide", "influence", "responsib", "organis", "organiz"] },
  { key: "driven",       label: "Driven Achiever",      match: ["growth", "scale", "achieve", "result", "execut", "fast", "aggressive", "hustle", "deliver", "win", "target", "ambition"] },
  { key: "independent",  label: "Independent Spirit",   match: ["freedom", "independ", "solo", "remote", "flexible", "autonom", "control", "self", "location", "nomad"] },
  { key: "communicator", label: "Strong Communicator",  match: ["communicat", "network", "pitch", "sell", "sales", "negotiat", "connect", "speaking", "relationship", "brand"] },
  { key: "analytical",   label: "Analytical Mind",      match: ["analy", "precision", "accuracy", "debug", "optimi", "test", "quality", "detail", "research", "logic", "data"] },
  { key: "purposeful",   label: "Purpose-Driven",       match: ["purpose", "impact", "mission", "change", "serve", "contribut", "society", "community", "world", "meaning", "help", "social"] },
  { key: "learner",      label: "Lifelong Learner",     match: ["learn", "mastery", "skill", "grow", "study", "course", "practice", "improve", "curio", "knowledge", "expert"] },
  { key: "resilient",    label: "Resilient & Bold",     match: ["risk", "bold", "fail", "challenge", "experiment", "uncertain", "pivot", "tough", "pressure", "crisis"] },
  { key: "stable",       label: "Stability Seeker",     match: ["stabil", "secure", "balance", "consistent", "predict", "structured", "routine", "long-term", "steady"] },
];

const QUADRANT_MAP = {
  passion:    ["visionary", "builder", "independent", "learner"],
  profession: ["builder", "strategic", "analytical", "communicator"],
  mission:    ["purposeful", "leader", "visionary", "communicator"],
  vocation:   ["driven", "strategic", "leader", "resilient"],
};

const QUADRANT_PHRASES = {
  passion: {
    visionary:   "imagining what doesn't yet exist",
    builder:     "building things with your own hands",
    independent: "working on your own terms with full freedom",
    learner:     "constantly learning and sharpening your craft",
  },
  profession: {
    builder:      "turning ideas into working, real-world solutions",
    strategic:    "thinking several moves ahead and planning the path",
    analytical:   "diagnosing problems with precision and clarity",
    communicator: "translating complex ideas so others act on them",
  },
  mission: {
    purposeful:   "creating change that genuinely matters",
    leader:       "lifting the people and teams around you",
    visionary:    "pushing your field somewhere new",
    communicator: "connecting people around a shared goal",
  },
  vocation: {
    driven:    "delivering results the market is willing to pay for",
    strategic: "spotting and capturing high-value opportunities",
    leader:    "owning outcomes others depend on",
    resilient: "thriving where most people hesitate",
  },
};

const ROLE_IDENTITY = {
  entrepreneur: { visionary: "The Visionary Founder", builder: "The Product Builder", driven: "The Relentless Scaler",
    leader: "The Founding Leader", strategic: "The Strategic Operator", purposeful: "The Mission-Led Founder",
    communicator: "The Magnetic Founder", independent: "The Sovereign Founder", analytical: "The Data-Led Founder",
    learner: "The Always-Evolving Founder", resilient: "The Unbreakable Founder", stable: "The Sustainable Founder",
    default: "The Independent Entrepreneur" },
  managerial: { leader: "The People-First Leader", strategic: "The Strategic Manager", driven: "The Results Driver",
    communicator: "The Connective Leader", stable: "The Steady Operator", purposeful: "The Purpose-Led Leader",
    visionary: "The Transformational Leader", builder: "The Systems-Building Manager", analytical: "The Analytical Manager",
    learner: "The Growth-Minded Leader", independent: "The Empowering Leader", resilient: "The Crisis-Ready Leader",
    default: "The Organisational Leader" },
  technician: { builder: "The Master Builder", analytical: "The Precision Specialist", learner: "The Craft-Obsessed Expert",
    visionary: "The Systems Architect", strategic: "The Technical Strategist", purposeful: "The Impact-Driven Engineer",
    leader: "The Technical Lead", communicator: "The Bridging Engineer", driven: "The High-Output Engineer",
    independent: "The Autonomous Specialist", resilient: "The Battle-Tested Engineer", stable: "The Dependable Specialist",
    default: "The Technical Craftsman" },
};

/* Career-path recommendations, keyed by role then dimension. */
const CAREER_PATHS = {
  entrepreneur: {
    visionary:    { title: "Startup Founder / CEO",         why: "You see opportunities before others and love turning a bold vision into a venture." },
    builder:      { title: "Product-Led Founder",           why: "You'd rather build the product than just talk about it — ideal for SaaS or tooling startups." },
    strategic:    { title: "Venture Strategist / Operator", why: "You think in systems and moves ahead — a strong fit for a strategy-led founder or COO role." },
    leader:       { title: "Founder & Team Builder",        why: "You naturally rally people, so a venture where you lead a growing team suits you." },
    driven:       { title: "Growth-Focused Founder",        why: "Your relentless drive points to scalable, growth-stage businesses." },
    communicator: { title: "Sales-Led / Community Founder", why: "You can sell a vision and build an audience — great for community or creator businesses." },
    analytical:   { title: "Data-Driven Founder",           why: "You validate with evidence — well suited to analytics, fintech or research-heavy ventures." },
    purposeful:   { title: "Social-Impact Entrepreneur",    why: "You want the work to matter — mission-driven or impact startups fit you best." },
    independent:  { title: "Solo / Bootstrapped Founder",   why: "You value autonomy — an indie business or one-person SaaS lets you run it your way." },
    learner:      { title: "Serial Builder / Indie Hacker", why: "You love learning by shipping — rapid experiments and multiple small bets suit you." },
    resilient:    { title: "Turnaround / High-Risk Founder",why: "You thrive under pressure — bold, high-uncertainty ventures play to your strength." },
    stable:       { title: "Sustainable Business Owner",    why: "You prefer durable over explosive — a steady, profitable lifestyle business fits." },
  },
  managerial: {
    leader:       { title: "People & Team Leader",            why: "Developing and leading people is your superpower — head of team or department." },
    strategic:    { title: "Strategy / Operations Manager",   why: "You plan several moves ahead — strong fit for strategy or operations leadership." },
    driven:       { title: "Performance / Delivery Manager",  why: "You push outcomes — ideal for delivery, programme or growth management." },
    communicator: { title: "Stakeholder / Partnerships Lead", why: "You connect people and align interests — partnerships or comms leadership suits you." },
    stable:       { title: "Operations / Process Manager",    why: "You build dependable systems — operations or process-excellence leadership." },
    purposeful:   { title: "Culture & People Officer",        why: "You care about impact on people — a culture, L&D or people-ops leadership track." },
    visionary:    { title: "Transformation / Change Leader",  why: "You see how things could be — change management and transformation leadership." },
    builder:      { title: "Programme / Project Director",    why: "You like building structures — large-scale programme and delivery leadership." },
    analytical:   { title: "Business / Analytics Manager",    why: "You decide with data — analytics, BI or performance management leadership." },
    learner:      { title: "Coaching & Development Leader",   why: "You grow people and yourself — talent development and coaching leadership." },
    independent:  { title: "Autonomous Unit / GM Role",       why: "You run things well with freedom — a general-manager style mandate fits." },
    resilient:    { title: "Crisis & Turnaround Manager",     why: "You hold steady under fire — crisis, recovery and high-pressure leadership." },
  },
  technician: {
    builder:      { title: "Software Engineer / Builder",        why: "You love making things work — full-stack, product or systems engineering." },
    analytical:   { title: "Data / QA / Performance Engineer",   why: "You obsess over precision — data, testing or performance engineering." },
    learner:      { title: "Specialist / Domain Expert",         why: "You go deep — a focused specialist or principal-engineer track suits you." },
    visionary:    { title: "Systems / Solutions Architect",      why: "You see the whole system — architecture and technical design leadership." },
    strategic:    { title: "Technical Lead / Tech Strategist",   why: "You plan the technical path — tech lead or staff-engineer direction." },
    purposeful:   { title: "Impact-Driven Engineer",             why: "You want your code to matter — civic-tech, health-tech or open-source roles." },
    leader:       { title: "Engineering Lead / Manager",         why: "You guide other engineers well — a team-lead or EM track fits." },
    communicator: { title: "Developer Advocate / Solutions Eng", why: "You explain tech clearly — DevRel, solutions or pre-sales engineering." },
    driven:       { title: "High-Output Product Engineer",       why: "You ship fast and often — fast-moving product or startup engineering." },
    independent:  { title: "Freelance / Contract Specialist",    why: "You value autonomy — independent consulting or contract engineering." },
    resilient:    { title: "SRE / Reliability Engineer",         why: "You stay calm under failure — reliability, on-call and infra engineering." },
    stable:       { title: "Platform / Maintenance Engineer",    why: "You value dependable systems — platform, infra or long-lived product work." },
  },
};

/* Flatten a single stored answer into searchable text tokens */
function answerToTokens(answer) {
  if (!answer) return [];
  const tokens = [];
  const push = (v) => {
    if (v && typeof v === "string") tokens.push(v.toLowerCase());
  };
  if (typeof answer === "string") push(answer);
  else if (Array.isArray(answer)) answer.forEach(push);
  else if (typeof answer === "object") {
    push(answer.mcq);
    push(answer.text);
    push(answer.other);
    if (Array.isArray(answer.selected)) answer.selected.forEach(push);
  }
  return tokens;
}

/* Core scoring function — returns a full, dynamic analysis object */
export function analyzeAnswers(role, answers) {
  const scores = Object.fromEntries(TRAIT_RULES.map((r) => [r.key, 0]));
  const interestTally = {};
  let answeredCount = 0;

  Object.values(answers || {}).forEach((ans) => {
    const tokens = answerToTokens(ans);
    if (tokens.length) answeredCount += 1;

    tokens.forEach((token) => {
      TRAIT_RULES.forEach((rule) => {
        if (rule.match.some((m) => token.includes(m))) scores[rule.key] += 1;
      });
      token
        .split(/[,/]| - |\u2014|\u2013/)
        .map((p) => p.trim())
        .forEach((phrase) => {
          if (phrase.length > 1 && phrase.length < 32) {
            interestTally[phrase] = (interestTally[phrase] || 0) + 1;
          }
        });
    });
  });

  const ranked = TRAIT_RULES.map((r) => ({ ...r, score: scores[r.key] })).sort(
    (a, b) => b.score - a.score
  );
  const topDims = ranked.filter((r) => r.score > 0);
  const dominant = topDims[0] || ranked[0];
  const baseDims = topDims.length ? topDims : ranked;

  const topTraits = baseDims.slice(0, 5).map((r) => r.label);

  const STRENGTH_LABELS = {
    visionary: "Vision & Big-Picture Thinking",
    builder: "Building & Execution",
    strategic: "Strategy & Planning",
    leader: "Leadership & Influence",
    driven: "Drive & Delivery",
    independent: "Autonomy & Self-Direction",
    communicator: "Communication & Persuasion",
    analytical: "Analysis & Precision",
    purposeful: "Purpose & Impact Focus",
    learner: "Continuous Learning",
    resilient: "Resilience & Risk Appetite",
    stable: "Consistency & Reliability",
  };
  const coreStrengths = baseDims.slice(0, 4).map((r) => STRENGTH_LABELS[r.key]);

  const NOISE = new Set([
    "other", "select up to 2", "the", "and", "for", "your", "what", "you",
    "with", "a", "an", "to", "of", "or", "my", "i", "me", "it", "is", "in",
    "without", "even", "most", "more", "want", "would", "do", "feel", "much",
    "make", "be", "are", "how", "kind", "type", "your own",
  ]);
  const interestPaths = Object.entries(interestTally)
    .filter(([w]) => !NOISE.has(w) && !w.includes("select up"))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w]) => w.replace(/\b\w/g, (c) => c.toUpperCase()));

  const buildQuadrant = (quad) => {
    const dims = QUADRANT_MAP[quad]
      .map((k) => ({ k, score: scores[k] }))
      .sort((a, b) => b.score - a.score);
    const phrases = dims
      .filter((d) => d.score > 0)
      .slice(0, 2)
      .map((d) => QUADRANT_PHRASES[quad][d.k])
      .filter(Boolean);
    if (!phrases.length) {
      phrases.push(QUADRANT_PHRASES[quad][QUADRANT_MAP[quad][0]]);
    }
    return phrases;
  };

  const pq = buildQuadrant("passion");
  const prq = buildQuadrant("profession");
  const mq = buildQuadrant("mission");
  const vq = buildQuadrant("vocation");

  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const passion = `You come most alive when ${pq.join(", and when ")}.`;
  const profession = `Your natural edge lies in ${prq.join(", and in ")}.`;
  const mission = `The world needs what you bring: ${mq.join(", and ")}.`;
  const vocation = `You can build a living by ${vq.join(", and by ")}.`;

  const identityMap = ROLE_IDENTITY[role] || ROLE_IDENTITY.entrepreneur;
  const ikigaiIdentity = identityMap[dominant?.key] || identityMap.default;

  const second = topDims[1] || ranked[1];
  const personalitySummary = `You lead with a ${dominant.label.toLowerCase()} mindset, balanced by ${(
    second?.label || "a grounded"
  ).toLowerCase()} tendencies. Your responses show someone who moves between ${cap(
    pq[0] || "creating"
  )} and ${vq[0] || "delivering value"} — a combination that very few people sustain well.`;

  const motivationLine = `You are driven by ${
    QUADRANT_PHRASES.mission[
      QUADRANT_MAP.mission
        .map((k) => ({ k, s: scores[k] }))
        .sort((a, b) => b.s - a.s)[0].k
    ] || "making a real difference"
  }.`;

  const ikigaiStatement = `Your Ikigai lives where ${
    pq[0] || "what you love"
  } meets ${prq[0] || "what you're great at"} — in service of ${
    mq[0] || "something larger than yourself"
  }.`;

  const nextStep =
    "This week, pick the single answer you wrote with the most conviction and take one concrete action toward it — a message sent, a draft started, or a commitment made out loud.";

  // 3 career paths from the 3 strongest scored dimensions (de-duplicated)
  const careerMap = CAREER_PATHS[role] || CAREER_PATHS.entrepreneur;
  const careerPaths = [];
  const seen = new Set();
  baseDims.forEach((d) => {
    if (careerPaths.length >= 3) return;
    const c = careerMap[d.key];
    if (c && !seen.has(c.title)) {
      seen.add(c.title);
      careerPaths.push(c);
    }
  });
  while (careerPaths.length < 3) {
    const fb = Object.values(careerMap).find((c) => !seen.has(c.title));
    if (!fb) break;
    seen.add(fb.title);
    careerPaths.push(fb);
  }

  return {
    role,
    answeredCount,
    ikigaiIdentity,
    ikigaiTitle: `${ikigaiIdentity} — Forging a Path That's Unmistakably Yours`,
    passion,
    profession,
    mission,
    vocation,
    personalitySummary,
    topTraits: topTraits.length
      ? topTraits
      : ["Driven Achiever", "Builder", "Visionary Thinker"],
    coreStrengths: coreStrengths.length
      ? coreStrengths
      : ["Building & Execution", "Strategy & Planning"],
    interestPaths: interestPaths.length
      ? interestPaths
      : ["Building", "Growth", "Learning", "Impact"],
    careerPaths,
    motivationLine,
    ikigaiStatement,
    nextStep,
    scores,
    dominant: dominant?.key,
  };
}

/* ════════════════════════════════════════════════════════════════
   CONTEXT
   ════════════════════════════════════════════════════════════════ */
const IkigaiContext = createContext(null);
export const useIkigai = () => useContext(IkigaiContext);

export const IkigaiProvider = ({ children, initialRole = null }) => {
  const [screen, setScreen] = useState(initialRole ? "journey" : "landing");
  const [role, setRole] = useState(initialRole);
  const [dayIndex, setDayIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(-1); // -1 => day intro
  const [answers, setAnswers] = useState({}); // keyed `${role}-${day}-${qid}`
  const [completedDays, setCompletedDays] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Honour a role supplied later (e.g. navigation from Home)
  useEffect(() => {
    if (initialRole && !role) {
      setRole(initialRole);
      setScreen("journey");
      setDayIndex(0);
      setQuestionIndex(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRole]);

  const allDays = useMemo(() => (role ? questions[role] || [] : []), [role]);
  const currentDayRaw = allDays[dayIndex] || null;
  const currentDayMeta = DAYS_META[dayIndex];

  const currentDayData = useMemo(() => {
    if (!currentDayRaw) return null;
    return {
      ...currentDayRaw,
      ...currentDayMeta,
      title: currentDayRaw.title,
      subtitle: currentDayRaw.subtitle,
    };
  }, [currentDayRaw, currentDayMeta]);

  const answerKey = useCallback(
    (qid) => `${role}-${dayIndex + 1}-${qid}`,
    [role, dayIndex]
  );

  const handleAnswer = useCallback(
    (qid, value) => {
      const total = currentDayRaw?.questions?.length || 0;
      setAnswers((prev) => ({ ...prev, [answerKey(qid)]: value }));
      if (questionIndex < total - 1) {
        setQuestionIndex((q) => q + 1);
      } else {
        setCompletedDays((prev) => [...new Set([...prev, dayIndex + 1])]);
        setShowCelebration(true);
      }
    },
    [answerKey, currentDayRaw, questionIndex, dayIndex]
  );

  const getSavedAnswer = useCallback(
    (qid) => answers[answerKey(qid)],
    [answers, answerKey]
  );

  const handleBack = useCallback(() => {
    if (questionIndex > 0) setQuestionIndex((q) => q - 1);
    else if (questionIndex === 0) setQuestionIndex(-1);
    else if (questionIndex === -1 && dayIndex > 0) {
      const prevDay = allDays[dayIndex - 1];
      setDayIndex((d) => d - 1);
      setQuestionIndex((prevDay?.questions?.length || 1) - 1);
    }
  }, [questionIndex, dayIndex, allDays]);

  const afterCelebration = useCallback(() => {
    setShowCelebration(false);
    if (dayIndex < 5) {
      setDayIndex((d) => d + 1);
      setQuestionIndex(-1);
    } else {
      setScreen("result");
    }
  }, [dayIndex]);

  const startDay = useCallback(() => setQuestionIndex(0), []);

  const chooseRole = useCallback((r) => {
    setRole(r);
    setScreen("journey");
    setDayIndex(0);
    setQuestionIndex(-1);
  }, []);

  const restart = useCallback(() => {
    setScreen("landing");
    setRole(null);
    setDayIndex(0);
    setQuestionIndex(-1);
    setAnswers({});
    setCompletedDays([]);
    setShowCelebration(false);
  }, []);

  const analysis = useMemo(
    () => (role ? analyzeAnswers(role, answers) : null),
    [role, answers]
  );

  const totalQuestions = useMemo(
    () => allDays.reduce((s, d) => s + (d.questions?.length || 0), 0) || 1,
    [allDays]
  );
  const answeredSoFar = useMemo(
    () =>
      allDays
        .slice(0, dayIndex)
        .reduce((s, d) => s + (d.questions?.length || 0), 0) +
      Math.max(0, questionIndex),
    [allDays, dayIndex, questionIndex]
  );
  const overallPct = Math.round((answeredSoFar / totalQuestions) * 100);

  const value = {
    PALETTE,
    DAYS_META,
    RESULT_STEP,
    ROLES,
    screen, setScreen,
    role, chooseRole,
    dayIndex, setDayIndex,
    questionIndex, setQuestionIndex,
    answers,
    completedDays,
    showCelebration,
    isMobile,
    allDays,
    currentDayData,
    currentDayMeta,
    handleAnswer,
    getSavedAnswer,
    handleBack,
    afterCelebration,
    startDay,
    restart,
    analysis,
    totalQuestions,
    answeredSoFar,
    overallPct,
  };

  return (
    <IkigaiContext.Provider value={value}>{children}</IkigaiContext.Provider>
  );
};

export default IkigaiContext;