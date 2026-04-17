import { createContext, useContext, useState } from "react";
import questions from "../data/questions";

const IkigaiContext = createContext(null);

export function IkigaiProvider({ children }) {
  const [screen, setScreen] = useState("landing");
  const [role, setRole] = useState(null);
  const [dayIndex, setDayIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [completedDays, setCompletedDays] = useState([]);
  const [result, setResult] = useState(null);
  const [justCompletedDay, setJustCompletedDay] = useState(null);
  const [personalityAnalysis, setPersonalityAnalysis] = useState(null);

  const roleQuestions = role ? questions[role] : [];
  const currentDayData = roleQuestions[dayIndex] || roleQuestions[0] || {};

  const ROLE_META = {
    entrepreneur: {
      label: "Entrepreneur",
      icon: "🌍",
      color: "#e85d4a",
      bg: "#fff5f3",
      accent: "#e85d4a33",
      description: "Building ventures, startups & independent businesses",
      keywords: ["startup", "venture", "business", "founder", "scale", "growth", "market", "innovation"],
    },
    managerial: {
      label: "Managerial",
      icon: "📊",
      color: "#5b6af0",
      bg: "#f3f4ff",
      accent: "#5b6af033",
      description: "Leading teams, driving processes & corporate growth",
      keywords: ["team", "lead", "manage", "organize", "plan", "strategy", "process", "coordinate"],
    },
    technician: {
      label: "Technician",
      icon: "🔧",
      color: "#3a9e6e",
      bg: "#f0fbf5",
      accent: "#3a9e6e33",
      description: "Building products, coding & technical craft",
      keywords: ["code", "build", "develop", "technical", "system", "software", "design", "create"],
    },
  };

  const DAY_THEMES = [
    { color: "#e85d4a", bg: "#fff5f3", accent: "#e85d4a33", icon: "♡", subtitle: "What ignites your soul" },
    { color: "#f0942a", bg: "#fff8f0", accent: "#f0942a33", icon: "◎", subtitle: "How you want to live" },
    { color: "#3a9e6e", bg: "#f0fbf5", accent: "#3a9e6e33", icon: "◈", subtitle: "What you do best" },
    { color: "#5b6af0", bg: "#f3f4ff", accent: "#5b6af033", icon: "◆", subtitle: "How you earn & grow" },
    { color: "#9b59b6", bg: "#faf0ff", accent: "#9b59b633", icon: "✦", subtitle: "Why you do what you do" },
    { color: "#2196a8", bg: "#f0fbfc", accent: "#2196a833", icon: "◉", subtitle: "Where you're headed" },
  ];

  const enrichedDays = roleQuestions.map((d, i) => ({
    ...d,
    ...DAY_THEMES[i] || DAY_THEMES[0],
    description: `Explore your ${d.title.toLowerCase()} through honest reflection.`,
  }));

  const currentDayEnriched = enrichedDays[dayIndex] || enrichedDays[0] || {};

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
    const isLastQuestion = questionIndex >= currentDayData.questions.length - 1;
    if (!isLastQuestion) {
      setQuestionIndex((p) => p + 1);
    } else {
      const newCompleted = [...completedDays, currentDayData.day];
      setCompletedDays(newCompleted);
      setJustCompletedDay(currentDayData.day);
      setScreen("dayComplete");
    }
  };

  const afterCelebration = () => {
    const isLastDay = dayIndex >= roleQuestions.length - 1;
    if (isLastDay) {
      fetchResult(answers);
    } else {
      setDayIndex((p) => p + 1);
      setQuestionIndex(-1);
      setJustCompletedDay(null);
      setScreen("journey");
    }
  };

  const extractAllResponses = (allAnswers) => {
    const responses = [];
    Object.values(allAnswers).forEach((a) => {
      if (typeof a === "string" && a.trim()) {
        responses.push(a.trim());
      } else if (typeof a === "object" && a !== null) {
        if (a.text && a.text.trim()) responses.push(a.text.trim());
        if (Array.isArray(a.selected) && a.selected.length) responses.push(...a.selected);
        if (a.mcq && a.mcq.trim()) responses.push(a.mcq.trim());
        if (a.other && a.other.trim()) responses.push(a.other.trim());
      }
    });
    return responses;
  };

  // ── FIXED: threshold lowered to >= 1 so short answers register traits ──────
  const analyzeUserResponses = (allAnswers) => {
    const analysis = { traits: [], strengths: [], careerHints: [] };
    const allResponses = extractAllResponses(allAnswers);
    const responseText = allResponses.join(" ").toLowerCase();

    if (!responseText.trim()) {
      // No answers yet — return role-based defaults
      const defaults = getRoleDefaultTraits(role);
      return { ...analysis, ...defaults };
    }

    const traitPatterns = {
      "Analytical Thinker": ["analyze", "logic", "system", "process", "structure", "data", "research", "investigate", "solve", "critical", "methodical", "systematic"],
      "Innovative Creator": ["create", "innovate", "new", "fresh", "original", "unique", "design", "imagine", "vision", "invent", "breakthrough"],
      "Strategic Planner": ["strategy", "plan", "goal", "long-term", "big picture", "direction", "roadmap", "future", "forecast"],
      "Empathetic Helper": ["help", "support", "understand", "empathy", "compassion", "care", "listen", "feel", "people", "service", "nurture"],
      "Collaborative Team Player": ["team", "together", "collaborate", "share", "group", "partner", "collective", "community", "cooperate"],
      "Persuasive Leader": ["lead", "influence", "convince", "persuade", "inspire", "motivate", "guide", "direct", "manage", "mentor", "coach"],
      "Detail-Oriented Perfectionist": ["detail", "precise", "accurate", "perfect", "quality", "careful", "thorough", "exact", "specific", "meticulous"],
      "Curious Learner": ["learn", "discover", "explore", "understand", "curious", "question", "knowledge", "study", "research"],
      "Independent Thinker": ["independent", "self", "alone", "own", "freedom", "flexible", "remote", "autonomous", "solo"],
      "Ambitious Achiever": ["achieve", "goal", "ambition", "success", "result", "outcome", "win", "progress", "improve", "grow", "excel"],
      "Creative Artist": ["art", "design", "beauty", "aesthetic", "visual", "creative", "express", "color", "style", "artistic"],
      "Pragmatic Executor": ["practical", "realistic", "efficient", "effective", "useful", "functional", "apply", "implement", "execute", "deliver"],
    };

    // FIXED: threshold is 1, not 2 — so even single keyword matches register
    for (const [trait, keywords] of Object.entries(traitPatterns)) {
      const score = keywords.filter((k) => responseText.includes(k)).length;
      if (score >= 1) analysis.traits.push({ trait, score });
    }

    // Sort by score descending, then take top 8 names
    analysis.traits = analysis.traits
      .sort((a, b) => b.score - a.score)
      .map((t) => t.trait)
      .slice(0, 8);

    // Add role-specific boosts (only if not already present)
    const roleBoosts = getRoleBoostTraits(role);
    roleBoosts.forEach((t) => {
      if (!analysis.traits.includes(t)) analysis.traits.push(t);
    });
    analysis.traits = [...new Set(analysis.traits)].slice(0, 8);

    const strengthPatterns = {
      "Problem Solving": ["solve", "problem", "fix", "debug", "troubleshoot", "resolve", "solution", "challenge"],
      "Communication": ["communicate", "explain", "present", "write", "speak", "articulate", "express", "share", "story"],
      "Creativity": ["creative", "imagine", "design", "innovate", "original", "artistic", "invent", "idea"],
      "Leadership": ["lead", "guide", "direct", "manage", "coordinate", "organize", "oversee", "mentor", "inspire"],
      "Technical Expertise": ["code", "develop", "build", "software", "program", "technical", "engineering", "system"],
      "Empathy": ["understand", "feel", "empathy", "compassion", "care", "listen", "support", "emotional"],
      "Strategic Thinking": ["strategy", "plan", "vision", "goal", "future", "direction", "roadmap", "foresight"],
      "Adaptability": ["adapt", "flexible", "change", "learn", "grow", "evolve", "adjust", "pivot", "agile"],
      "Attention to Detail": ["detail", "precise", "accurate", "thorough", "careful", "meticulous", "quality"],
      "Project Management": ["manage", "organize", "coordinate", "deadline", "plan", "execute", "deliver", "timeline"],
    };

    for (const [strength, keywords] of Object.entries(strengthPatterns)) {
      const score = keywords.filter((k) => responseText.includes(k)).length;
      if (score >= 1) analysis.strengths.push({ strength, score });
    }
    analysis.strengths = analysis.strengths
      .sort((a, b) => b.score - a.score)
      .map((s) => s.strength)
      .slice(0, 6);

    // Career hints
    if (responseText.match(/startup|venture|founder|entrepreneur/)) analysis.careerHints.push("Entrepreneurship & Venture Building");
    if (responseText.match(/lead|manage|team/)) analysis.careerHints.push("Leadership & Management");
    if (responseText.match(/code|develop|technical|software/)) analysis.careerHints.push("Technology & Software Development");
    if (responseText.match(/design|creative|art/)) analysis.careerHints.push("Design & Creative Fields");
    if (responseText.match(/strategy|plan|consult/)) analysis.careerHints.push("Strategy & Consulting");
    if (responseText.match(/data|analyze|research/)) analysis.careerHints.push("Data Science & Analytics");

    return analysis;
  };

  const getRoleBoostTraits = (r) => {
    if (r === "entrepreneur") return ["Ambitious Achiever", "Innovative Creator", "Strategic Planner"];
    if (r === "managerial") return ["Strategic Planner", "Collaborative Team Player", "Detail-Oriented Perfectionist"];
    if (r === "technician") return ["Analytical Thinker", "Detail-Oriented Perfectionist", "Curious Learner"];
    return [];
  };

  const getRoleDefaultTraits = (r) => {
    const roleDefaults = {
      entrepreneur: {
        traits: ["Ambitious Achiever", "Innovative Creator", "Strategic Planner", "Independent Thinker"],
        strengths: ["Leadership", "Strategic Thinking", "Creativity"],
      },
      managerial: {
        traits: ["Strategic Planner", "Collaborative Team Player", "Persuasive Leader", "Detail-Oriented Perfectionist"],
        strengths: ["Leadership", "Project Management", "Communication"],
      },
      technician: {
        traits: ["Analytical Thinker", "Curious Learner", "Detail-Oriented Perfectionist", "Pragmatic Executor"],
        strengths: ["Technical Expertise", "Problem Solving", "Attention to Detail"],
      },
    };
    return roleDefaults[r] || { traits: [], strengths: [] };
  };

  const buildUserPrompt = (allAnswers) => {
    const allResponses = extractAllResponses(allAnswers);
    const roleMeta = ROLE_META[role] || {};
    const analysis = analyzeUserResponses(allAnswers);

    return `You are an expert Ikigai career coach specializing in ${roleMeta.label} paths.

Based EXCLUSIVELY on the user's specific answers below, generate a deeply personalized Ikigai report.

USER ROLE: ${roleMeta.label} - ${roleMeta.description}

THEIR ACTUAL ANSWERS (each answer is unique to them):
${allResponses.map((r, i) => `${i + 1}. "${r}"`).join("\n")}

PERSONALITY INSIGHTS FROM THEIR ANSWERS:
- Core Traits: ${analysis.traits.join(", ")}
- Key Strengths: ${analysis.strengths.join(", ")}

Generate ONLY valid JSON (no other text) with this exact structure:
{
  "ikigaiTitle": "A powerful, unique title (5-8 words) synthesizing their purpose",
  "ikigaiSummary": "A paragraph explaining why this path fits THEM based on their specific answers about what they love and what they're good at",
  "careerPaths": ["Specific Path 1 based on their answers", "Specific Path 2", "Specific Path 3"],
  "workStyle": "Their ideal work environment based on their lifestyle answers",
  "personalInsight": "A unique insight about their trait combination from their answers",
  "motivationLine": "What truly drives them based on their purpose and vision answers"
}

CRITICAL: Every field must reference THEIR specific answers. No generic templates.`;
  };

  const getCurrentAnalysis = () => {
    if (personalityAnalysis) return personalityAnalysis;
    if (Object.keys(answers).length > 0) return analyzeUserResponses(answers);
    return getRoleDefaultTraits(role);
  };

  const fetchResult = async (allAnswers) => {
    setScreen("loading");
    const analysis = analyzeUserResponses(allAnswers);
    setPersonalityAnalysis(analysis);
    const userPrompt = buildUserPrompt(allAnswers);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${backendUrl}/api/ikigai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt, role, answers: allAnswers, analysis }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      let parsed = null;
      if (data.result && typeof data.result === "object" && data.result.ikigaiTitle) {
        parsed = data.result;
      }
      if (!parsed && data.result && typeof data.result === "string") {
        const cleaned = data.result.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
        try {
          parsed = JSON.parse(cleaned);
        } catch {
          const match = cleaned.match(/\{[\s\S]*\}/);
          if (match) {
            try { parsed = JSON.parse(match[0]); } catch { /* fallthrough */ }
          }
        }
      }

      if (parsed && parsed.ikigaiTitle && parsed.ikigaiSummary && Array.isArray(parsed.careerPaths)) {
        parsed.personalityAnalysis = analysis;
        setResult(parsed);
        setScreen("result");
      } else {
        setResult(buildFallbackResult(allAnswers, analysis));
        setScreen("result");
      }
    } catch (err) {
      console.warn("Backend error, using intelligent fallback:", err.message);
      setResult(buildFallbackResult(allAnswers, analysis));
      setScreen("result");
    }
  };

  const buildFallbackResult = (allAnswers, analysis) => {
    const allResponses = extractAllResponses(allAnswers);
    const topTraits = analysis.traits.slice(0, 3);
    const topStrengths = analysis.strengths.slice(0, 2);
    const roleLabel = role === "entrepreneur" ? "Founder" : role === "managerial" ? "Leader" : "Creator";

    return {
      ikigaiTitle: `${topTraits[0] || "Purpose-Driven"} ${roleLabel}`,
      ikigaiSummary: `Your responses reveal you are passionate about ${allResponses.slice(0, 3).join(", ")}. This aligns with your ${topStrengths.join(" and ")} strengths, suggesting you thrive when ${role === "entrepreneur" ? "building and scaling ventures" : role === "managerial" ? "leading and organizing teams" : "solving complex technical problems"}.`,
      careerPaths: [
        `${topTraits[0] || "Strategic"} ${role === "entrepreneur" ? "Business Founder" : role === "managerial" ? "Team Leader" : "Technical Lead"}`,
        `${topStrengths[0] || "Creative"} ${role === "entrepreneur" ? "Venture Builder" : role === "managerial" ? "Operations Manager" : "Solution Architect"}`,
        `${topTraits[1] || "Innovative"} ${role === "entrepreneur" ? "Startup Advisor" : role === "managerial" ? "Strategic Director" : "Product Developer"}`,
      ],
      workStyle: `Based on your preferences, you excel in ${allResponses.some((r) => r.toLowerCase().includes("remote")) ? "remote-first environments" : "collaborative settings"} with ${allResponses.some((r) => r.toLowerCase().includes("flexible")) ? "flexible autonomy" : "clear structure and support"}.`,
      personalInsight: `Your unique combination of ${topTraits.join(" and ")} makes you exceptionally suited for roles where you can ${allResponses.some((r) => r.toLowerCase().includes("lead")) ? "inspire and guide others" : "create innovative solutions"}.`,
      motivationLine: `You are driven by ${topTraits.includes("Ambitious Achiever") ? "achieving meaningful goals and growth" : "making a lasting positive impact through your work"}.`,
      personalityAnalysis: analysis,
    };
  };

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

  return (
    <IkigaiContext.Provider
      value={{
        screen,
        role,
        dayIndex,
        questionIndex,
        answers,
        completedDays,
        result,
        currentDayData: currentDayEnriched,
        allDays: enrichedDays,
        justCompletedDay,
        personalityAnalysis,
        roleMeta: ROLE_META[role] || {},
        ROLE_META,
        goToRoleSelect,
        selectRoleAndBegin,
        startDay,
        handleAnswer,
        afterCelebration,
        restart,
        fetchResult,
        getCurrentAnalysis,
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