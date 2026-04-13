import { createContext, useContext, useState } from "react";
import questions from "../data/questions";

export const SYSTEM_PROMPT = `You are an expert career coach and life advisor.
A user has completed a structured 6-day self-discovery journey based on the Ikigai framework.
User traits: {{tags}}
User preferences: {{user_inputs}}
Your task is to generate a personalized and meaningful Ikigai result.
Provide the following as a JSON object (respond ONLY with JSON, no markdown, no preamble):
{
  "ikigaiTitle": "A clear and unique one-line identity",
  "ikigaiSummary": "2-3 lines explaining why this path suits the user",
  "careerPaths": ["Career path 1", "Career path 2", "Career path 3"],
  "workStyle": "Examples: Remote, Freelance, Startup, Corporate, Hybrid",
  "personalInsight": "One thoughtful observation about their personality or mindset",
  "motivationLine": "A short inspiring sentence tailored to the user"
}
Guidelines: Make it feel highly personalized and specific. Avoid generic or vague phrases. Keep the tone human, supportive, and inspiring. Keep total within 120-150 words.`;

const FALLBACK_RESULT = {
  ikigaiTitle: "Purpose-Driven Creator",
  ikigaiSummary: "You are someone who blends creativity with meaningful impact. Your responses reveal a deep desire to build things that matter while maintaining flexibility in how and where you work.",
  careerPaths: ["UX Designer & Product Thinker", "Content Strategist", "Startup Founder"],
  workStyle: "Remote-first with creative autonomy",
  personalInsight: "You lead with empathy but execute with precision — a rare and powerful combination.",
  motivationLine: "Your work is not just what you do — it's who you are becoming."
};

const IkigaiContext = createContext(null);

export function IkigaiProvider({ children }) {
  const [screen, setScreen] = useState("landing");
  const [dayIndex, setDayIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [completedDays, setCompletedDays] = useState([]);
  const [result, setResult] = useState(null);

  const currentDayData = questions[dayIndex];

  const startJourney = () => setScreen("journey");
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
      const isLastDay = dayIndex >= questions.length - 1;
      if (!isLastDay) {
        setDayIndex((p) => p + 1);
        setQuestionIndex(-1);
      } else {
        fetchResult(newAnswers);
      }
    }
  };

  const fetchResult = async (allAnswers) => {
    setScreen("loading");
    const tags = Object.values(allAnswers)
      .flatMap((a) => {
        const p = [];
        if (a.text) p.push(a.text);
        if (a.selected?.length) p.push(...a.selected);
        if (a.mcq) p.push(a.mcq);
        if (a.other) p.push(a.other);
        return p;
      })
      .filter(Boolean)
      .slice(0, 20);

    const userInputs = Object.entries(allAnswers)
      .map(([, a]) => {
        const ans = [a.text, ...(a.selected || []), a.mcq, a.other].filter(Boolean).join(", ");
        return `Q: ${a.questionText || ""} → A: ${ans}`;
      })
      .join("\n");

    try {
      const res = await fetch("http://localhost:5000/api/ikigai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags, userInputs }),
      });
      const data = await res.json();
      const raw = (data.result || "").replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(raw);
      setResult(parsed);
      setScreen("result");
    } catch {
      setResult(FALLBACK_RESULT);
      setScreen("result");
    }
  };

  const restart = () => {
    setScreen("landing");
    setDayIndex(0);
    setQuestionIndex(-1);
    setAnswers({});
    setCompletedDays([]);
    setResult(null);
  };

  return (
    <IkigaiContext.Provider value={{
      screen, dayIndex, questionIndex, answers, completedDays, result,
      currentDayData, allDays: questions,
      startJourney, startDay, handleAnswer, restart,
    }}>
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