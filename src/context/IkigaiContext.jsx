import React, { createContext, useContext, useState, useEffect } from 'react';

const IkigaiContext = createContext();

export const useIkigai = () => {
  const context = useContext(IkigaiContext);
  if (!context) {
    throw new Error('useIkigai must be used within IkigaiProvider');
  }
  return context;
};

// Keyword mapping for better analysis
const keywordCategories = {
  love: ['create', 'build', 'design', 'help', 'teach', 'learn', 'solve', 'innovate', 'collaborate', 'lead'],
  good: ['analyze', 'code', 'communicate', 'organize', 'plan', 'manage', 'technical', 'creative', 'strategic'],
  need: ['education', 'environment', 'health', 'community', 'opportunity', 'access', 'sustainability', 'growth'],
  paid: ['consulting', 'development', 'strategy', 'product', 'service', 'solution', 'system', 'platform']
};

// Extract keywords from answer text
const extractKeywords = (text) => {
  const words = text.toLowerCase().split(' ');
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

// Find overlaps between categories
const findOverlaps = (loveAnswers, goodAnswers, needAnswers, paidAnswers) => {
  const loveSet = new Set(loveAnswers);
  const goodSet = new Set(goodAnswers);
  const needSet = new Set(needAnswers);
  const paidSet = new Set(paidAnswers);
  
  return {
    passion: [...loveSet].filter(x => goodSet.has(x)), // Love ∩ Skills
    profession: [...goodSet].filter(x => paidSet.has(x)), // Skills ∩ Money
    vocation: [...paidSet].filter(x => needSet.has(x)), // Money ∩ Need
    mission: [...needSet].filter(x => loveSet.has(x)), // Need ∩ Love
    ikigai: [...new Set([...loveSet, ...goodSet, ...needSet, ...paidSet])].filter(
      x => loveSet.has(x) && goodSet.has(x) && needSet.has(x) && paidSet.has(x)
    )
  };
};

// Generate structured Ikigai suggestion
const generateIkigaiSuggestion = (overlaps, groupedAnswers) => {
  const suggestion = {
    passion: {
      description: "What you love doing and are good at",
      keywords: overlaps.passion.slice(0, 5),
      suggestion: ""
    },
    profession: {
      description: "What you're good at and can be paid for",
      keywords: overlaps.profession.slice(0, 5),
      suggestion: ""
    },
    vocation: {
      description: "What you can be paid for that the world needs",
      keywords: overlaps.vocation.slice(0, 5),
      suggestion: ""
    },
    mission: {
      description: "What the world needs that you love doing",
      keywords: overlaps.mission.slice(0, 5),
      suggestion: ""
    },
    ikigai: {
      description: "Your true purpose - the intersection of all four",
      keywords: overlaps.ikigai.slice(0, 5),
      suggestion: ""
    }
  };

  // Generate suggestions based on keywords
  if (suggestion.passion.keywords.length > 0) {
    suggestion.passion.suggestion = `You thrive when ${suggestion.passion.keywords[0]}ing. Consider roles that combine your creativity with practical execution.`;
  } else {
    suggestion.passion.suggestion = "Explore activities that energize you and identify what you naturally excel at.";
  }

  if (suggestion.profession.keywords.length > 0) {
    suggestion.profession.suggestion = `Your ${suggestion.profession.keywords[0]} skills are highly marketable. Look for opportunities in tech, consulting, or specialized services.`;
  } else {
    suggestion.profession.suggestion = "Identify your most valuable skills and research how they translate to income-generating opportunities.";
  }

  if (suggestion.vocation.keywords.length > 0) {
    suggestion.vocation.suggestion = `The world needs more ${suggestion.vocation.keywords[0]}. Consider social enterprises, non-profits, or purpose-driven businesses.`;
  } else {
    suggestion.vocation.suggestion = "Connect your skills to meaningful problems. What change do you want to see in the world?";
  }

  if (suggestion.mission.keywords.length > 0) {
    suggestion.mission.suggestion = `Your heart is drawn to ${suggestion.mission.keywords[0]}. Find ways to combine this passion with real-world impact.`;
  } else {
    suggestion.mission.suggestion = "What issues make you angry or emotional? That passion can fuel your mission.";
  }

  if (suggestion.ikigai.keywords.length > 0) {
    suggestion.ikigai.suggestion = `Your true calling involves ${suggestion.ikigai.keywords[0]}. This is where all your strengths align with what the world needs.`;
  } else {
    suggestion.ikigai.suggestion = "Your Ikigai is still emerging. Continue exploring the intersections of what you love, what you're good at, what the world needs, and what you can be paid for.";
  }

  return suggestion;
};

export const IkigaiProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('ikigai_category') || null;
  });
  
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

  // Save to localStorage
  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem('ikigai_category', selectedCategory);
    }
  }, [selectedCategory]);
  
  useEffect(() => {
    localStorage.setItem('ikigai_answers', JSON.stringify(answers));
  }, [answers]);
  
  useEffect(() => {
    localStorage.setItem('ikigai_current_day', currentDay.toString());
  }, [currentDay]);
  
  useEffect(() => {
    localStorage.setItem('ikigai_completed_days', JSON.stringify(completedDays));
  }, [completedDays]);
  
  useEffect(() => {
    if (result) {
      localStorage.setItem('ikigai_result', JSON.stringify(result));
    }
  }, [result]);

  const saveAnswer = (day, questionId, answer, type) => {
    setAnswers(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [questionId]: { answer, type, timestamp: new Date().toISOString() }
      }
    }));
  };
  
  const completeDay = (day) => {
    if (!completedDays.includes(day)) {
      setCompletedDays(prev => [...prev, day].sort((a, b) => a - b));
      // Only move to next day if less than 6
      if (day < 6) {
        setCurrentDay(day + 1);
      }
    }
  };
  
  const generateResult = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Group answers by type
      const groupedAnswers = {
        love: [],
        good: [],
        need: [],
        paid: []
      };
      
      // Group answers by type
      Object.values(answers).forEach(dayAnswers => {
        if (dayAnswers && typeof dayAnswers === 'object') {
          Object.values(dayAnswers).forEach(answerObj => {
            if (answerObj && answerObj.type && answerObj.answer) {
              const targetType = answerObj.type === 'mission' ? 'love' : answerObj.type;
              if (groupedAnswers[targetType]) {
                groupedAnswers[targetType].push(answerObj.answer);
              }
            }
          });
        }
      });
      
      // Extract keywords from answers
      const keywordMap = {
        love: [],
        good: [],
        need: [],
        paid: []
      };
      
      Object.keys(groupedAnswers).forEach(type => {
        groupedAnswers[type].forEach(answer => {
          const keywords = extractKeywords(answer);
          keywords.forEach(kw => keywordMap[type].push(kw.word));
        });
      });
      
      // Find overlaps between categories
      const overlaps = findOverlaps(
        keywordMap.love,
        keywordMap.good,
        keywordMap.need,
        keywordMap.paid
      );
      
      // Generate structured Ikigai suggestion
      const ikigaiSuggestion = generateIkigaiSuggestion(overlaps, groupedAnswers);
      
      // Generate summary text
      const loveText = groupedAnswers.love.length > 0 
        ? groupedAnswers.love.slice(0, 2).join(', ')
        : 'exploring new possibilities';
      
      const goodText = groupedAnswers.good.length > 0
        ? groupedAnswers.good.slice(0, 2).join(', ')
        : 'learning and growing';
      
      const needText = groupedAnswers.need.length > 0
        ? groupedAnswers.need.slice(0, 2).join(', ')
        : 'making a positive difference';
      
      const paidText = groupedAnswers.paid.length > 0
        ? groupedAnswers.paid.slice(0, 2).join(', ')
        : 'creating value through work';
      
      const summary = `You love ${loveText}, you are good at ${goodText}, the world needs ${needText}, and you can be paid for ${paidText}.`;
      
      const careerPaths = {
        entrepreneur: [
          "Startup Founder / Co-founder",
          "Product Manager / Owner",
          "Innovation Consultant",
          "Business Strategist",
          "Venture Builder"
        ],
        managerial: [
          "Operations Manager",
          "Project Manager",
          "Business Development Lead",
          "Strategy Consultant",
          "Team Lead / Department Head"
        ],
        technician: [
          "Software Engineer / Developer",
          "Technical Architect",
          "DevOps Engineer",
          "Technical Product Manager",
          "Solutions Architect"
        ]
      };
      
      const resultData = {
        groupedAnswers,
        keywordMap,
        overlaps,
        ikigaiSuggestion,
        summary,
        careerPath: careerPaths[selectedCategory] || careerPaths.entrepreneur,
        generatedAt: new Date().toISOString()
      };
      
      setResult(resultData);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const resetJourney = () => {
    setSelectedCategory(null);
    setAnswers({});
    setCurrentDay(1);
    setCompletedDays([]);
    setResult(null);
    localStorage.removeItem('ikigai_category');
    localStorage.removeItem('ikigai_answers');
    localStorage.removeItem('ikigai_current_day');
    localStorage.removeItem('ikigai_completed_days');
    localStorage.removeItem('ikigai_result');
  };
  
  return (
    <IkigaiContext.Provider value={{
      selectedCategory,
      setSelectedCategory,
      answers,
      saveAnswer,
      currentDay,
      setCurrentDay,
      completedDays,
      completeDay,
      generateResult,
      result,
      isAnalyzing,
      resetJourney
    }}>
      {children}
    </IkigaiContext.Provider>
  );
};