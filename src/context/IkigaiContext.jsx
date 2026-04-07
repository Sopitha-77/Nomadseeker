import React, { createContext, useContext, useState, useEffect } from 'react';

const IkigaiContext = createContext();

export const useIkigai = () => {
  const context = useContext(IkigaiContext);
  if (!context) throw new Error('useIkigai must be used within IkigaiProvider');
  return context;
};

const keywordCategories = {
  love: ['create', 'build', 'design', 'help', 'teach', 'learn', 'solve', 'innovate', 'collaborate', 'lead'],
  good: ['analyze', 'code', 'communicate', 'organize', 'plan', 'manage', 'technical', 'creative', 'strategic'],
  need: ['education', 'environment', 'health', 'community', 'opportunity', 'access', 'sustainability', 'growth'],
  paid: ['consulting', 'development', 'strategy', 'product', 'service', 'solution', 'system', 'platform']
};

const extractKeywords = (text) => {
  const keywords = [];
  for (const [category, wordsList] of Object.entries(keywordCategories)) {
    for (const word of wordsList) {
      if (text.toLowerCase().includes(word)) {
        keywords.push({ word, category });
      }
    }
  }
  return keywords;
};

const findOverlaps = (loveAnswers, goodAnswers, needAnswers, paidAnswers) => {
  const loveSet = new Set(loveAnswers);
  const goodSet = new Set(goodAnswers);
  const needSet = new Set(needAnswers);
  const paidSet = new Set(paidAnswers);
  return {
    passion: [...loveSet].filter(x => goodSet.has(x)),
    profession: [...goodSet].filter(x => paidSet.has(x)),
    vocation: [...paidSet].filter(x => needSet.has(x)),
    mission: [...needSet].filter(x => loveSet.has(x)),
    ikigai: [...new Set([...loveSet, ...goodSet, ...needSet, ...paidSet])].filter(
      x => loveSet.has(x) && goodSet.has(x) && needSet.has(x) && paidSet.has(x)
    )
  };
};

const generateIkigaiSuggestion = (overlaps, groupedAnswers) => {
  const suggestion = {
    passion: { description: "What you love doing and are good at", keywords: overlaps.passion.slice(0, 5), suggestion: "" },
    profession: { description: "What you're good at and can be paid for", keywords: overlaps.profession.slice(0, 5), suggestion: "" },
    vocation: { description: "What you can be paid for that the world needs", keywords: overlaps.vocation.slice(0, 5), suggestion: "" },
    mission: { description: "What the world needs that you love doing", keywords: overlaps.mission.slice(0, 5), suggestion: "" },
    ikigai: { description: "Your true purpose - the intersection of all four", keywords: overlaps.ikigai.slice(0, 5), suggestion: "" }
  };

  suggestion.passion.suggestion = suggestion.passion.keywords.length > 0
    ? `You thrive when ${suggestion.passion.keywords[0]}ing. Consider roles that combine your creativity with practical execution.`
    : "Explore activities that energize you and identify what you naturally excel at.";

  suggestion.profession.suggestion = suggestion.profession.keywords.length > 0
    ? `Your ${suggestion.profession.keywords[0]} skills are highly marketable. Look for opportunities in tech, consulting, or specialized services.`
    : "Identify your most valuable skills and research how they translate to income-generating opportunities.";

  suggestion.vocation.suggestion = suggestion.vocation.keywords.length > 0
    ? `The world needs more ${suggestion.vocation.keywords[0]}. Consider social enterprises, non-profits, or purpose-driven businesses.`
    : "Connect your skills to meaningful problems. What change do you want to see in the world?";

  suggestion.mission.suggestion = suggestion.mission.keywords.length > 0
    ? `Your heart is drawn to ${suggestion.mission.keywords[0]}. Find ways to combine this passion with real-world impact.`
    : "What issues make you angry or emotional? That passion can fuel your mission.";

  suggestion.ikigai.suggestion = suggestion.ikigai.keywords.length > 0
    ? `Your true calling involves ${suggestion.ikigai.keywords[0]}. This is where all your strengths align with what the world needs.`
    : "Your Ikigai is still emerging. Continue exploring the intersections of what you love, what you're good at, what the world needs, and what you can be paid for.";

  return suggestion;
};

export const IkigaiProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(() => localStorage.getItem('ikigai_category') || null);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('ikigai_answers');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentDay, setCurrentDay] = useState(() => {
    const saved = localStorage.getItem('ikigai_current_day');
    return saved ? parseInt(saved) : 1;
  });
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem('ikigai_completed_days');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(() => {
    const saved = localStorage.getItem('ikigai_result');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => { if (selectedCategory) localStorage.setItem('ikigai_category', selectedCategory); }, [selectedCategory]);
  useEffect(() => { localStorage.setItem('ikigai_answers', JSON.stringify(answers)); }, [answers]);
  useEffect(() => { localStorage.setItem('ikigai_current_day', currentDay.toString()); }, [currentDay]);
  useEffect(() => { localStorage.setItem('ikigai_completed_days', JSON.stringify(completedDays)); }, [completedDays]);
  useEffect(() => { if (result) localStorage.setItem('ikigai_result', JSON.stringify(result)); }, [result]);

  const saveAnswer = (day, questionId, answer, type) => {
    setAnswers(prev => ({
      ...prev,
      [day]: { ...prev[day], [questionId]: { answer, type, timestamp: new Date().toISOString() } }
    }));
  };

  // ✅ FIX: completeDay only marks the day as done — it does NOT advance currentDay.
  // The day transition is handled exclusively by handleCloseDayCelebration in Sevendays.jsx
  // so the day only increments ONCE (after the celebration modal closes).
  const completeDay = (day) => {
    if (!completedDays.includes(day)) {
      setCompletedDays(prev => [...prev, day].sort((a, b) => a - b));
      // ❌ REMOVED: setCurrentDay(day + 1) — this was causing the double-increment bug
    }
  };

  const generateResult = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const groupedAnswers = { love: [], good: [], need: [], paid: [] };
      Object.values(answers).forEach(dayAnswers => {
        if (dayAnswers && typeof dayAnswers === 'object') {
          Object.values(dayAnswers).forEach(answerObj => {
            if (answerObj?.type && answerObj?.answer) {
              const targetType = answerObj.type === 'mission' ? 'love' : answerObj.type;
              if (groupedAnswers[targetType]) groupedAnswers[targetType].push(answerObj.answer);
            }
          });
        }
      });

      const keywordMap = { love: [], good: [], need: [], paid: [] };
      Object.keys(groupedAnswers).forEach(type => {
        groupedAnswers[type].forEach(answer => {
          extractKeywords(answer).forEach(kw => keywordMap[type].push(kw.word));
        });
      });

      const overlaps = findOverlaps(keywordMap.love, keywordMap.good, keywordMap.need, keywordMap.paid);
      const ikigaiSuggestion = generateIkigaiSuggestion(overlaps, groupedAnswers);

      const loveText = groupedAnswers.love.length > 0 ? groupedAnswers.love.slice(0, 2).join(', ') : 'exploring new possibilities';
      const goodText = groupedAnswers.good.length > 0 ? groupedAnswers.good.slice(0, 2).join(', ') : 'learning and growing';
      const needText = groupedAnswers.need.length > 0 ? groupedAnswers.need.slice(0, 2).join(', ') : 'making a positive difference';
      const paidText = groupedAnswers.paid.length > 0 ? groupedAnswers.paid.slice(0, 2).join(', ') : 'creating value through work';
      const summary = `You love ${loveText}, you are good at ${goodText}, the world needs ${needText}, and you can be paid for ${paidText}.`;

      const careerPaths = {
        entrepreneur: ["Startup Founder / Co-founder", "Product Manager / Owner", "Innovation Consultant", "Business Strategist", "Venture Builder"],
        managerial: ["Operations Manager", "Project Manager", "Business Development Lead", "Strategy Consultant", "Team Lead / Department Head"],
        technician: ["Software Engineer / Developer", "Technical Architect", "DevOps Engineer", "Technical Product Manager", "Solutions Architect"]
      };

      setResult({
        groupedAnswers, keywordMap, overlaps, ikigaiSuggestion, summary,
        careerPath: careerPaths[selectedCategory] || careerPaths.entrepreneur,
        generatedAt: new Date().toISOString()
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetJourney = () => {
    setSelectedCategory(null); setAnswers({}); setCurrentDay(1);
    setCompletedDays([]); setResult(null);
    ['ikigai_category', 'ikigai_answers', 'ikigai_current_day', 'ikigai_completed_days', 'ikigai_result']
      .forEach(k => localStorage.removeItem(k));
  };

  return (
    <IkigaiContext.Provider value={{
      selectedCategory, setSelectedCategory, answers, saveAnswer,
      currentDay, setCurrentDay, completedDays, completeDay,
      generateResult, result, isAnalyzing, resetJourney
    }}>
      {children}
    </IkigaiContext.Provider>
  );
};