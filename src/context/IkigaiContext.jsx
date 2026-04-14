import { createContext, useContext, useState } from "react";
import questions from "../data/questions";

// ── Fallback result (used when backend is unavailable) ────────────────────────
const FALLBACK_RESULT = {
  ikigaiTitle: "Purpose-Driven Creator",
  ikigaiSummary:
    "You are someone who blends creativity with meaningful impact. Your responses reveal a deep desire to build things that matter while maintaining flexibility in how and where you work.",
  careerPaths: [
    "UX Designer & Product Thinker",
    "Content Strategist",
    "Startup Founder",
  ],
  workStyle: "Remote-first with creative autonomy",
  personalInsight:
    "You lead with empathy but execute with precision — a rare and powerful combination.",
  motivationLine:
    "Your work is not just what you do — it's who you are becoming.",
};

const IkigaiContext = createContext(null);

export function IkigaiProvider({ children }) {
  // "landing" | "journey" | "dayComplete" | "loading" | "result"
  const [screen, setScreen] = useState("landing");
  const [dayIndex, setDayIndex] = useState(0);
  // -1 = day intro card, 0+ = question index within day
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [completedDays, setCompletedDays] = useState([]);
  const [result, setResult] = useState(null);
  // Which day just completed (for celebration overlay)
  const [justCompletedDay, setJustCompletedDay] = useState(null);
  // Store analysis results
  const [personalityAnalysis, setPersonalityAnalysis] = useState(null);

  const currentDayData = questions[dayIndex];

  // ── Navigation helpers ──────────────────────────────────────────────────────
  const startJourney = () => setScreen("journey");
  const startDay = () => setQuestionIndex(0);

  const handleAnswer = (qId, ans) => {
    const newAnswers = { ...answers, [qId]: ans };
    setAnswers(newAnswers);

    const isLastQuestion =
      questionIndex >= currentDayData.questions.length - 1;

    if (!isLastQuestion) {
      setQuestionIndex((p) => p + 1);
    } else {
      // Day complete
      const newCompleted = [...completedDays, currentDayData.day];
      setCompletedDays(newCompleted);
      setJustCompletedDay(currentDayData.day);
      setScreen("dayComplete"); // Show celebration screen

      const isLastDay = dayIndex >= questions.length - 1;
      if (isLastDay) {
        // After celebration, trigger result fetch
        // (handled in DayCelebration component via onContinue)
        // We store a flag so SevenDays knows to fetch after celebration
      }
    }
  };

  // Called after celebration dismiss
  const afterCelebration = () => {
    const isLastDay = dayIndex >= questions.length - 1;
    if (isLastDay) {
      fetchResult(answers);
    } else {
      setDayIndex((p) => p + 1);
      setQuestionIndex(-1);
      setJustCompletedDay(null);
      setScreen("journey");
    }
  };

  // ── NEW: Analyze personality traits, strengths, and career inclinations ─────
  const analyzeUserResponses = (allAnswers) => {
    const analysis = {
      traits: [],
      strengths: [],
      careerHints: []
    };

    // Collect all user responses as text
    const allResponses = [];
    Object.values(allAnswers).forEach((a) => {
      if (a.text && a.text.trim()) allResponses.push(a.text.trim());
      if (a.selected?.length) allResponses.push(...a.selected);
      if (a.mcq) allResponses.push(a.mcq);
      if (a.other && a.other.trim()) allResponses.push(a.other.trim());
    });

    const responseText = allResponses.join(" ").toLowerCase();
    const allTraits = [...new Set(allResponses)];

    // ── Personality Traits Analysis ──────────────────────────────────────────
    const traitPatterns = {
      // Problem-solving & analytical traits
      analytical: ["analyze", "logic", "system", "process", "structure", "data", "research", "investigate", "solve", "puzzle"],
      innovative: ["create", "innovate", "new", "fresh", "original", "unique", "design", "imagine", "vision", "future"],
      curious: ["learn", "discover", "explore", "understand", "why", "how", "curious", "question", "knowledge", "study"],
      
      // People & communication traits
      empathetic: ["help", "support", "understand", "empathy", "compassion", "care", "listen", "feel", "emotional", "people"],
      collaborative: ["team", "together", "collaborate", "share", "group", "partner", "collective", "community", "cooperate"],
      persuasive: ["lead", "influence", "convince", "persuade", "inspire", "motivate", "guide", "direct", "manage"],
      
      // Work style traits
      autonomous: ["independent", "self", "alone", "own", "freedom", "flexible", "remote", "autonomous", "solo"],
      detailOriented: ["detail", "precise", "accurate", "perfect", "quality", "careful", "thorough", "exact", "specific"],
      strategic: ["strategy", "plan", "goal", "vision", "long-term", "big picture", "overview", "direction", "roadmap"],
      
      // Creative traits
      artistic: ["art", "design", "beauty", "aesthetic", "visual", "creative", "express", "color", "style", "artistic"],
      imaginative: ["imagine", "dream", "idea", "concept", "fantasy", "possibility", "what if", "visionary", "invent"],
      
      // Action-oriented traits
      pragmatic: ["practical", "realistic", "efficient", "effective", "useful", "functional", "apply", "implement", "execute"],
      driven: ["achieve", "goal", "ambition", "success", "result", "outcome", "win", "progress", "improve", "grow"]
    };

    // Analyze traits
    for (const [trait, keywords] of Object.entries(traitPatterns)) {
      const score = keywords.filter(keyword => responseText.includes(keyword)).length;
      if (score >= 2) { // Threshold for including a trait
        analysis.traits.push(trait);
      }
    }

    // Add custom traits from direct answers
    const customTraits = allTraits.filter(t => 
      t.length > 2 && 
      !analysis.traits.some(tr => tr.toLowerCase() === t.toLowerCase()) &&
      !Object.values(traitPatterns).flat().includes(t.toLowerCase())
    ).slice(0, 5);
    
    analysis.traits.push(...customTraits);
    analysis.traits = [...new Set(analysis.traits)].slice(0, 8); // Limit to 8 traits

    // ── Strengths Analysis ────────────────────────────────────────────────────
    const strengthPatterns = {
      "Problem Solving": ["solve", "problem", "fix", "debug", "troubleshoot", "resolve", "solution"],
      "Communication": ["communicate", "explain", "present", "write", "speak", "articulate", "express", "share"],
      "Creativity": ["creative", "imagine", "design", "innovate", "original", "artistic", "invent"],
      "Leadership": ["lead", "guide", "direct", "manage", "coordinate", "organize", "oversee", "mentor"],
      "Technical Skills": ["code", "develop", "build", "software", "program", "technical", "engineering", "system"],
      "Empathy": ["understand", "feel", "empathy", "compassion", "listen", "support", "care"],
      "Strategic Thinking": ["strategy", "plan", "vision", "goal", "future", "direction", "roadmap"],
      "Adaptability": ["adapt", "flexible", "change", "learn", "grow", "evolve", "adjust"],
      "Attention to Detail": ["detail", "precise", "accurate", "thorough", "careful", "meticulous"],
      "Project Management": ["manage", "organize", "coordinate", "deadline", "plan", "execute", "deliver"]
    };

    for (const [strength, keywords] of Object.entries(strengthPatterns)) {
      const score = keywords.filter(keyword => responseText.includes(keyword)).length;
      if (score >= 2) {
        analysis.strengths.push(strength);
      }
    }
    
    analysis.strengths = [...new Set(analysis.strengths)].slice(0, 6); // Limit to 6 strengths

    // ── Career Inclinations Analysis ─────────────────────────────────────────
    const careerPatterns = {
      "Technology & Software": ["code", "software", "developer", "program", "tech", "engineer", "build", "system", "app", "web"],
      "Design & Creative": ["design", "art", "creative", "visual", "ui", "ux", "interface", "graphic", "aesthetic", "style"],
      "Business & Entrepreneurship": ["business", "startup", "entrepreneur", "company", "found", "venture", "market", "strategy"],
      "Product Management": ["product", "feature", "roadmap", "user", "customer", "launch", "market", "requirement"],
      "Data & Analytics": ["data", "analytics", "insight", "statistics", "metrics", "analysis", "report", "dashboard"],
      "Marketing & Growth": ["marketing", "growth", "social", "content", "campaign", "audience", "brand", "promote"],
      "Consulting": ["consult", "advise", "strategy", "solution", "client", "recommend", "improve", "optimize"],
      "Research & Development": ["research", "explore", "discover", "experiment", "innovate", "develop", "study"],
      "Education & Training": ["teach", "educate", "train", "learn", "mentor", "guide", "instruct", "coach"],
      "Healthcare & Wellness": ["health", "wellness", "care", "patient", "medical", "therapy", "wellbeing", "heal"]
    };

    for (const [career, keywords] of Object.entries(careerPatterns)) {
      const score = keywords.filter(keyword => responseText.includes(keyword)).length;
      if (score >= 2) {
        analysis.careerHints.push(career);
      }
    }
    
    // Add specific career hints from explicit answers
    if (allTraits.some(t => t.toLowerCase().includes("developer") || t.toLowerCase().includes("programmer"))) {
      analysis.careerHints.unshift("Software Development");
    }
    if (allTraits.some(t => t.toLowerCase().includes("designer") || t.toLowerCase().includes("design"))) {
      analysis.careerHints.unshift("Design & Creative");
    }
    if (allTraits.some(t => t.toLowerCase().includes("entrepreneur") || t.toLowerCase().includes("founder"))) {
      analysis.careerHints.unshift("Entrepreneurship");
    }
    
    analysis.careerHints = [...new Set(analysis.careerHints)].slice(0, 5); // Limit to 5 career hints

    // If no career hints found, provide default based on traits
    if (analysis.careerHints.length === 0) {
      if (analysis.traits.includes("creative") || analysis.traits.includes("artistic")) {
        analysis.careerHints.push("Creative Industries");
      }
      if (analysis.traits.includes("analytical")) {
        analysis.careerHints.push("Technology & Analytics");
      }
      if (analysis.traits.includes("empathetic")) {
        analysis.careerHints.push("People & Service Roles");
      }
    }

    return analysis;
  };

  // ── Build traits array from all answers (updated to use analysis) ───────────
  const buildTraits = (allAnswers) => {
    // First, get the analysis
    const analysis = analyzeUserResponses(allAnswers);
    
    // Store analysis for later use
    setPersonalityAnalysis(analysis);
    
    // Return traits from analysis plus original tags
    const traits = [...analysis.traits, ...analysis.strengths];
    
    // Also include any direct tags from answers
    Object.values(allAnswers).forEach((a) => {
      if (a.text && a.text.trim()) {
        const parts = a.text.split(",").map((s) => s.trim()).filter(Boolean);
        traits.push(...parts);
      }
      if (a.selected?.length) traits.push(...a.selected);
      if (a.mcq) traits.push(a.mcq);
      if (a.other && a.other.trim()) traits.push(a.other.trim());
    });
    
    // Deduplicate & limit
    return [...new Set(traits)].filter(Boolean).slice(0, 25);
  };

  // ── Build structured user inputs string (updated with analysis) ────────────
  const buildUserInputs = (allAnswers) => {
    const analysis = personalityAnalysis || analyzeUserResponses(allAnswers);
    
    const userInputs = Object.entries(allAnswers)
      .map(([, a]) => {
        const answerParts = [
          a.text,
          ...(a.selected || []),
          a.mcq,
          a.other,
        ].filter(Boolean);
        if (!answerParts.length) return null;
        return `Q: ${a.questionText || ""} → A: ${answerParts.join(", ")}`;
      })
      .filter(Boolean)
      .join("\n");
    
    // Add analysis summary to the user inputs for better AI context
    return `
=== USER RESPONSES ===
${userInputs}

=== PERSONALITY ANALYSIS ===
Traits: ${analysis.traits.join(", ")}
Strengths: ${analysis.strengths.join(", ")}
Career Inclinations: ${analysis.careerHints.join(", ")}
    `.trim();
  };

  // ── API call (updated with analysis) ───────────────────────────────────────
  const fetchResult = async (allAnswers) => {
    setScreen("loading");

    // Perform analysis first
    const analysis = analyzeUserResponses(allAnswers);
    setPersonalityAnalysis(analysis);
    
    const tags = buildTraits(allAnswers);
    const userInputs = buildUserInputs(allAnswers);

    const backendUrl =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${backendUrl}/api/ikigai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          tags, 
          userInputs,
          analysis // Send analysis to backend as well
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      let parsed = null;

      // Case 1: backend already returned a parsed object
      if (data.result && typeof data.result === "object" && data.result.ikigaiTitle) {
        parsed = data.result;
      }

      // Case 2 & 3: result is a string — strip markdown fences, extract JSON
      if (!parsed && data.result && typeof data.result === "string") {
        const cleaned = data.result
          .replace(/```json\s*/gi, "")
          .replace(/```\s*/g, "")
          .trim();

        try {
          parsed = JSON.parse(cleaned);
        } catch {
          const match = cleaned.match(/\{[\s\S]*\}/);
          if (match) {
            try {
              parsed = JSON.parse(match[0]);
            } catch {
              // Will fall through to fallback
            }
          }
        }
      }

      // Validate the parsed result has the fields we need
      if (
        parsed &&
        parsed.ikigaiTitle &&
        parsed.ikigaiSummary &&
        Array.isArray(parsed.careerPaths)
      ) {
        // Enhance result with analysis data
        parsed.personalityAnalysis = analysis;
        setResult(parsed);
        setScreen("result");
      } else {
        console.warn("Invalid result structure, using fallback. Got:", data.result);
        // Enhance fallback with analysis data
        const enhancedFallback = {
          ...FALLBACK_RESULT,
          personalityAnalysis: analysis
        };
        setResult(enhancedFallback);
        setScreen("result");
      }
    } catch (err) {
      console.warn("Backend error, using fallback:", err.message);
      const enhancedFallback = {
        ...FALLBACK_RESULT,
        personalityAnalysis: analysis
      };
      setResult(enhancedFallback);
      setScreen("result");
    }
  };

  // ── Reset ──────────────────────────────────────────────────────────────────
  const restart = () => {
    setScreen("landing");
    setDayIndex(0);
    setQuestionIndex(-1);
    setAnswers({});
    setCompletedDays([]);
    setResult(null);
    setJustCompletedDay(null);
    setPersonalityAnalysis(null);
  };

  // ── Get analysis for current answers (can be used in components) ───────────
  const getCurrentAnalysis = () => {
    return personalityAnalysis || analyzeUserResponses(answers);
  };

  return (
    <IkigaiContext.Provider
      value={{
        // state
        screen,
        dayIndex,
        questionIndex,
        answers,
        completedDays,
        result,
        currentDayData,
        allDays: questions,
        justCompletedDay,
        personalityAnalysis,
        // actions
        startJourney,
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