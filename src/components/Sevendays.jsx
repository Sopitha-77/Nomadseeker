import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, CheckCircle, Lock, Target, TrendingUp, Zap,
  ArrowRight, ArrowLeft, Sparkles, Brain, Heart, Compass, Trophy,
  Award, Flame, Users, Calendar, Star, Rocket, ChevronRight,
  Clock
} from 'lucide-react';

/* ══════════════════════════════════════════════
   BRAND PALETTE
   Horizon   #5794A4   Secondary / Structure
   Downy     #64CDD1   Accent / Action
   Powder    #B8E3E6   Background / Soft UI
══════════════════════════════════════════════ */
const C = {
  horizon: '#5794A4',
  downy:   '#64CDD1',
  powder:  '#B8E3E6',
  white:   '#FFFFFF',
  gray:    '#64748B',
  lightGray: '#F1F5F9',
};

/* ── Gradient Background ── */
const GradientBg = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#B8E3E6] via-[#C4E8EB] to-[#DCF2F4]" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#64CDD1]/15 to-transparent rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#5794A4]/10 to-transparent rounded-full blur-3xl" />
  </div>
);

/* ─── Answer-driven Ikigai Score Engine (Only after completion) ─── */
const analyzeAnswers = (allDayAnswers) => {
  const getText = (day) => {
    const d = allDayAnswers[day];
    if (!d?.answers) return '';
    return d.answers.map(a => (a.answer||'').toLowerCase()).join(' ');
  };

  const score = (text, words, base, range) => {
    const hits = words.filter(w => text.includes(w)).length;
    return Math.min(98, base + Math.round((hits/words.length)*range));
  };

  const d1=getText(1), d2=getText(2), d3=getText(3);
  const d4=getText(4), d5=getText(5), d6=getText(6), d7=getText(7);

  const passion = score(d1+' '+d7,
    ['love','passion','excite','joy','fun','happy','creative','art','music','write','read','build','design','play','learn','curious','dream','imagine'],
    52, 46);
  const vocation = score(d2+' '+d3,
    ['skill','good at','expert','teach','help','build','code','manage','lead','analyze','create','communicate','organize','problem','solve','strength'],
    48, 50);
  const mission = score(d4+' '+d5,
    ['world','need','impact','help','change','community','people','society','better','improve','contribute','support','serve','difference','mission','purpose'],
    46, 52);
  const profession = score(d6+' '+d7,
    ['paid','income','money','business','service','client','consulting','freelance','product','revenue','charge','fee','sell','offer','market','earn'],
    44, 54);

  return { passion, vocation, mission, profession };
};

/* ─── Ikigai Chart (Only shows data after all 7 days completed) ─── */
const IkigaiChart = ({ allDayAnswers, completedDays, onChallenge }) => {
  const allDone = completedDays.length === 7;
  const analyzed = useMemo(() => allDone ? analyzeAnswers(allDayAnswers) : { passion:0, vocation:0, mission:0, profession:0 }, [allDayAnswers, allDone]);

  const passion    = analyzed.passion;
  const vocation   = analyzed.vocation;
  const mission    = analyzed.mission;
  const profession = analyzed.profession;
  const overall    = allDone ? Math.round((passion+vocation+mission+profession)/4) : 0;
  const [hovered, setHovered] = useState(null);

  const circles = [
    { id:'passion',    cx:155, cy:148, short:'Passion',    value:passion,    color:C.horizon },
    { id:'vocation',   cx:245, cy:148, short:'Vocation',   value:vocation,   color:C.downy   },
    { id:'mission',    cx:155, cy:222, short:'Mission',    value:mission,    color:C.horizon },
    { id:'profession', cx:245, cy:222, short:'Profession', value:profession, color:C.downy   },
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border bg-white"
      style={{ borderColor:`${C.horizon}30` }}>

      <div className="px-5 pt-5 pb-2 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Compass size={16} style={{ color: C.horizon }}/>
          <span className="text-sm font-bold tracking-wide" style={{ color: C.horizon }}>Your Ikigai Map</span>
        </div>
        <p className="text-xs" style={{ color: C.gray }}>
          {allDone ? 'Based on your 7-day journey' : `Complete all 7 days to reveal your Ikigai (${completedDays.length}/7)`}
        </p>
      </div>

      <div className="relative px-3 pt-2 pb-1">
        <svg viewBox="0 0 400 370" className="w-full">
          <defs>
            {circles.map(c=>(
              <radialGradient key={c.id} id={`vg-${c.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor={c.color} stopOpacity="0.35"/>
                <stop offset="100%" stopColor={c.color} stopOpacity="0.05"/>
              </radialGradient>
            ))}
          </defs>

          {/* Circles */}
          {circles.map(c=>(
            <circle key={c.id} cx={c.cx} cy={c.cy} r="96"
              fill={`url(#vg-${c.id})`}
              stroke={c.color}
              strokeWidth={hovered===c.id ? 2.5 : 1.5}
              strokeOpacity={0.5}
              style={{ transition:'all 0.2s', cursor:'pointer' }}
              onMouseEnter={()=>setHovered(c.id)}
              onMouseLeave={()=>setHovered(null)}
            />
          ))}

          {/* Center */}
          <circle cx="200" cy="185" r="52" fill="white" stroke={C.downy} strokeWidth="2" strokeOpacity="0.6"/>
          <text x="200" y="175" textAnchor="middle" fontSize="9" fontWeight="600" fill={C.gray} letterSpacing="2">IKIGAI</text>
          {allDone ? (
            <>
              <text x="200" y="197" textAnchor="middle" fontSize="22" fontWeight="800" fill={C.horizon}>{overall}%</text>
              <text x="200" y="212" textAnchor="middle" fontSize="7" fill={C.gray}>alignment</text>
            </>
          ) : (
            <text x="200" y="197" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.gray} opacity="0.5">🔒</text>
          )}

          {/* Zone labels */}
          <text x="200" y="108" textAnchor="middle" fontSize="7.5" fontWeight="600" fill={C.horizon}>Passion</text>
          <text x="104" y="188" textAnchor="middle" fontSize="7.5" fontWeight="600" fill={C.horizon}>Mission</text>
          <text x="296" y="188" textAnchor="middle" fontSize="7.5" fontWeight="600" fill={C.horizon}>Vocation</text>
          <text x="200" y="263" textAnchor="middle" fontSize="7.5" fontWeight="600" fill={C.horizon}>Profession</text>

          {/* Outer axis labels */}
          <text x="110" y="41"  textAnchor="middle" fontSize="8" fontWeight="500" fill={C.gray}>What You Love</text>
          <text x="290" y="41"  textAnchor="middle" fontSize="8" fontWeight="500" fill={C.gray}>What You're Good At</text>
          <text x="80"  y="338" textAnchor="middle" fontSize="8" fontWeight="500" fill={C.gray}>World Needs</text>
          <text x="320" y="338" textAnchor="middle" fontSize="8" fontWeight="500" fill={C.gray}>Paid For</text>

          {/* Score badges - Only show after completion */}
          {allDone && circles.map(c=>(
            <g key={`b-${c.id}`}>
              <circle cx={c.cx} cy={c.cy-62} r="18" fill={c.color} fillOpacity="0.2"/>
              <text x={c.cx} y={c.cy-57} textAnchor="middle" fontSize="10" fontWeight="700" fill={c.color}>{c.value}%</text>
            </g>
          ))}
        </svg>
      </div>

      <div className="px-5 pb-5">
        <button 
          onClick={onChallenge} 
          disabled={!allDone}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            allDone 
              ? 'bg-[#5794A4] text-white hover:bg-[#64CDD1] hover:shadow-md' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Rocket size={15}/>
          {allDone ? 'Start 30-Day Challenge' : `Complete ${7 - completedDays.length} more day${7 - completedDays.length !== 1 ? 's' : ''} to unlock`}
          {allDone && <ChevronRight size={15}/>}
        </button>
      </div>
    </div>
  );
};

/* ─── Question Card ─── */
const QuestionCard = ({ question, index, total, answer, onAnswer, onNext, onPrev, canGoNext, accent }) => {
  const [slide, setSlide] = useState('');

  const go = dir => {
    setSlide(dir==='next' ? 'out-l' : 'out-r');
    setTimeout(() => {
      dir==='next' ? onNext() : onPrev();
      setSlide(dir==='next' ? 'in-r' : 'in-l');
      setTimeout(()=>setSlide(''), 200);
    }, 150);
  };

  const getSlideStyles = () => {
    switch(slide) {
      case 'out-l': return { opacity:0, transform:'translateX(-15px)' };
      case 'out-r': return { opacity:0, transform:'translateX(15px)' };
      case 'in-r': return { opacity:0, transform:'translateX(15px)' };
      case 'in-l': return { opacity:0, transform:'translateX(-15px)' };
      default: return { opacity:1, transform:'translateX(0)' };
    }
  };

  return (
    <div style={{ transition:'all 0.15s ease', ...getSlideStyles() }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">
          {Array.from({length:total}).map((_,i)=>(
            <div key={i} className="rounded-full transition-all"
              style={{ height:4, width:i===index?20:4, background:i<=index?accent:C.gray+'40' }}/>
          ))}
        </div>
        <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-600">
          {index+1}/{total}
        </span>
      </div>

      <p className="text-sm font-medium mb-3 leading-relaxed text-gray-800">{question}</p>

      <textarea
        className="w-full p-3 rounded-xl text-sm resize-none leading-relaxed border focus:outline-none transition-all"
        placeholder="Write your reflection here…"
        value={answer}
        onChange={e=>onAnswer(e.target.value)}
        rows={3}
        style={{ 
          borderColor: answer?.trim() ? accent+'60' : '#E2E8F0',
          background: '#FAFCFE',
          minHeight: 90
        }}
        onFocus={e=>{ e.target.style.borderColor=accent; e.target.style.background='white'; }}
        onBlur={e=>{ e.target.style.borderColor=answer?.trim()?accent+'60':'#E2E8F0'; e.target.style.background='#FAFCFE'; }}
      />

      <div className="flex gap-2 mt-3">
        <button onClick={()=>go('prev')} disabled={index===0}
          className="flex-1 py-2 rounded-lg text-xs font-medium transition-all disabled:opacity-30 border"
          style={{ borderColor:'#E2E8F0', color:C.gray, background:'white' }}>
          <ArrowLeft size={12} className="inline mr-1"/> Back
        </button>
        <button onClick={()=>go('next')} disabled={!canGoNext}
          className="flex-1 py-2 rounded-lg text-xs font-medium text-white transition-all"
          style={{ background:canGoNext?`linear-gradient(135deg,${C.horizon},${C.downy})`:'#E2E8F0' }}>
          Next <ArrowRight size={12} className="inline ml-1"/>
        </button>
      </div>
    </div>
  );
};

/* ─── Day Timeline Pill ─── */
const DayPill = ({ dayData, status, isActive, insights, onClick }) => {
  const Icon = dayData.methodIcon;
  const isCompleted = status === 'completed';
  const isActiveDay = status === 'active';
  const isLocked = status === 'locked';
  
  return (
    <div 
      onClick={() => !isLocked && onClick(dayData.day)}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer border ${
        isActiveDay ? 'border-[#64CDD1] bg-[#64CDD1]/10 shadow-sm' : 
        isCompleted ? 'border-[#5794A4]/30 bg-[#5794A4]/5' : 
        'border-gray-100 bg-white hover:border-gray-200'
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isCompleted ? 'bg-[#5794A4]/20' : isActiveDay ? 'bg-[#64CDD1]/20' : 'bg-gray-50'
      }`}>
        {isCompleted ? <CheckCircle size={16} className="text-[#5794A4]" /> :
         isActiveDay ? <Flame size={14} className="text-[#64CDD1]" /> :
         <Lock size={12} className="text-gray-400" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            isActiveDay ? 'bg-[#64CDD1]/20 text-[#64CDD1]' : 
            isCompleted ? 'bg-[#5794A4]/20 text-[#5794A4]' : 'bg-gray-100 text-gray-500'
          }`}>
            Day {dayData.day}
          </span>
          {isActiveDay && <span className="text-[8px] text-[#64CDD1] animate-pulse">● ACTIVE</span>}
          {isCompleted && insights > 0 && (
            <span className="text-[8px] text-[#5794A4] flex items-center gap-0.5">
              <Trophy size={8}/> {insights}
            </span>
          )}
        </div>
        <h3 className={`font-medium text-sm truncate ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
          {dayData.title}
        </h3>
        <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
          <Icon size={8}/> {dayData.method}
        </p>
      </div>

      {!isLocked && (
        <ChevronRight size={14} className={`text-gray-300 ${isActiveDay ? 'text-[#64CDD1]' : ''}`} />
      )}
    </div>
  );
};

/* ─── Challenge Data ─── */
const challengeData = [
  { day:1, title:"Rediscover Your Curiosity",  subtitle:"Confusion → Awareness",
    trigger:"Your childhood curiosity often hides your real purpose.",
    method:"Self-Awareness", methodIcon:Brain,
    emojiQuestion:"How did it feel to reconnect with your childhood curiosity?",
    questions:["What activities make you lose track of time?","What topics do you naturally love talking about?","What work excites you without external motivation?","If money wasn't an issue, what would you do?","What content do you consume most?"],
    output:"Passion Signals", habitPrompt:"Reflect on what truly excites you." },
  { day:2, title:"Identity Awakening",         subtitle:"Awareness → Identity",
    trigger:"Your identity is built from the problems you love solving.",
    method:"Identity Reflection", methodIcon:Heart,
    emojiQuestion:"How did you feel recognizing your natural strengths?",
    questions:["What problems do people ask your help for?","What skills do others appreciate?","When do you feel most confident?","What environment makes you productive?","Describe yourself in 3 words?"],
    output:"Identity Traits", habitPrompt:"Acknowledge your natural strengths." },
  { day:3, title:"Skill Discovery",            subtitle:"Identity → Skills",
    trigger:"What comes naturally might be a valuable skill to others.",
    method:"Capability Awareness", methodIcon:Zap,
    emojiQuestion:"How did it feel to discover your hidden skills?",
    questions:["What skills do you already have?","What are you currently learning?","What skills could people pay for?","What digital skills enable remote work?","What skills help people online?"],
    output:"Skill Inventory", habitPrompt:"Identify your core skills." },
  { day:4, title:"Value Creation",    subtitle:"Skills → Value",
    trigger:"Income grows when your skills solve real problems.",
    method:"Problem Awareness", methodIcon:Target,
    emojiQuestion:"How do you feel about problems you're passionate about solving?",
    questions:["What problems do you see around you?","What problems do entrepreneurs face?","What do digital nomads struggle with?","What industry problems frustrate you?","Which problems excite you to solve?"],
    output:"Problem-Solving Domain", habitPrompt:"Identify problems you're passionate about." },
  { day:5, title:"Audience Discovery",         subtitle:"Value → Market",
    trigger:"Purpose grows when you understand who you want to help.",
    method:"Empathy Thinking", methodIcon:Users,
    emojiQuestion:"How did it feel to visualize your ideal audience?",
    questions:["Who benefits most from your skills?","Are they students, founders, or freelancers?","Where do they spend time online?","What are their biggest struggles?","What transformation can you provide?"],
    output:"Target Audience", habitPrompt:"Visualize your ideal client." },
  { day:6, title:"Monetization Thinking",      subtitle:"Market → Opportunity",
    trigger:"Skills become income when packaged as services.",
    method:"Opportunity Awareness", methodIcon:TrendingUp,
    emojiQuestion:"How excited are you about turning skills into income?",
    questions:["What services can you offer?","Can you create consulting or digital products?","What problems will people pay to solve?","How can you deliver remotely?","Which idea excites you most?"],
    output:"Income Possibilities", habitPrompt:"Explore ways to monetize your skills." },
  { day:7, title:"Your Ikigai Blueprint",      subtitle:"Opportunity → Purpose",
    trigger:"Your purpose is where passion, skills, problems, and income meet.",
    method:"Purpose Integration", methodIcon:Compass,
    emojiQuestion:"How does it feel to see your complete Ikigai picture?",
    questions:["Your core passion? (Day 1)","Your greatest strengths? (Day 2)","Skills to master? (Day 3)","Problem to solve? (Day 4)","Who will you serve? (Day 5)","How will you generate income? (Day 6)"],
    output:"Ikigai Map", habitPrompt:"Integrate insights to discover your purpose." },
];

const MOODS = [
  { emoji:'😊', label:'Good',    value:'good' },
  { emoji:'😄', label:'Great',   value:'great' },
  { emoji:'🤩', label:'Amazing', value:'amazing' },
  { emoji:'😐', label:'Neutral', value:'neutral' },
];

const DAY_ACCENTS = [C.horizon, C.downy, C.horizon, C.downy, C.horizon, C.downy, C.horizon];

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const Sevendays = () => {
  const navigate = useNavigate();

  const [currentDay,   setCurrentDay]   = useState(1);
  const [expandedDay,  setExpandedDay]  = useState(1);
  const [qIndex,       setQIndex]       = useState(0);
  const [answers,      setAnswers]      = useState({});
  const [mood,         setMood]         = useState(null);
  const [habitRating,  setHabitRating]  = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted,      setMounted]      = useState(false);
  const [toast,        setToast]        = useState('');

  const [completedDays, setCompletedDays] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ikigai_completed_days')||'[]'); } catch { return []; }
  });

  const [allDayAnswers, setAllDayAnswers] = useState(() => {
    const r = {};
    for (let d=1;d<=7;d++) {
      try { const s=localStorage.getItem(`ikigai_day_${d}_answers`); if(s) r[d]=JSON.parse(s); } catch {}
    }
    return r;
  });

  useEffect(()=>{ setTimeout(()=>setMounted(true),60); },[]);
  useEffect(()=>{ if(showConfetti) setTimeout(()=>setShowConfetti(false),3000); },[showConfetti]);
  useEffect(()=>{ if(toast) setTimeout(()=>setToast(''),2500); },[toast]);

  // Always enforce sequential progression
  useEffect(() => {
    // Find the first incomplete day
    let nextDay = 1;
    for (let i = 1; i <= 7; i++) {
      if (!completedDays.includes(i)) {
        nextDay = i;
        break;
      }
    }
    if (currentDay !== nextDay) {
      setCurrentDay(nextDay);
      localStorage.setItem('ikigai_current_day', String(nextDay));
    }
  }, [completedDays, currentDay]);

  const getStatus = day => {
    if (completedDays.includes(day)) return 'completed';
    if (day === currentDay) return 'active';
    return 'locked';
  };

  const getDayInsights = day => {
    try {
      const s = JSON.parse(localStorage.getItem(`ikigai_day_${day}_answers`)||'null');
      return s?.answers?.length || 0;
    } catch { return 0; }
  };

  const dayProgress = () => {
    const d = challengeData.find(d=>d.day===expandedDay);
    if (!d) return 0;
    return (d.questions.filter((_,i)=>answers[i]?.trim()).length / d.questions.length) * 100;
  };

  const overallProgress = (completedDays.length / 7) * 100;

  const handleComplete = () => {
    const d = challengeData.find(d=>d.day===expandedDay);
    if (!d) return;
    const allAnswered = d.questions.every((_,i)=>answers[i]?.trim());
    if (!allAnswered) { setToast('✋ Please answer all questions first.'); return; }
    if (!mood)        { setToast('😊 Please select your mood!'); return; }

    setIsSubmitting(true);

    const payload = {
      answers: d.questions.map((q,i)=>({ question:q, answer:answers[i] })),
      habitRating, mood, completedAt: new Date().toISOString(),
    };
    localStorage.setItem(`ikigai_day_${expandedDay}_answers`, JSON.stringify(payload,null,2));

    const updated = { ...allDayAnswers, [expandedDay]: payload };
    setAllDayAnswers(updated);

    const newCompleted = [...completedDays, expandedDay];
    setCompletedDays(newCompleted);
    localStorage.setItem('ikigai_completed_days', JSON.stringify(newCompleted));

    const nextDay = expandedDay + 1;
    if (expandedDay < 7) {
      setCurrentDay(nextDay);
      localStorage.setItem('ikigai_current_day', String(nextDay));
    }

    setShowConfetti(true);
    setAnswers({}); setQIndex(0); setMood(null); setHabitRating(3);

    if (expandedDay < 7) {
      setExpandedDay(nextDay);
      setToast(`🎉 Day ${expandedDay} complete! Day ${nextDay} unlocked.`);
    } else {
      setToast('🌟 Congratulations! You\'ve completed the 7-Day Ikigai Journey!');
    }

    setIsSubmitting(false);
  };

  const dayData = challengeData.find(d=>d.day===expandedDay);
  const status  = dayData ? getStatus(dayData.day) : 'locked';
  const accent  = dayData ? DAY_ACCENTS[dayData.day-1] : C.horizon;
  const isAllAnswered = dayData?.questions.every((_,i)=>answers[i]?.trim());
  const canComplete   = isAllAnswered && mood && !isSubmitting && status==='active';
  const isFullyComplete = completedDays.length === 7;

  const handleThirtyDayClick = () => {
    if (isFullyComplete) {
      navigate('/thirty');
    } else {
      setToast(`✨ Complete all 7 days first! (${completedDays.length}/7 completed)`);
    }
  };

  return (
    <div className="min-h-screen relative" style={{ marginLeft: 280, background: C.powder }}>
      <GradientBg/>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg text-white animate-fade-in"
          style={{ background: `linear-gradient(135deg, ${C.horizon}, ${C.downy})` }}>
          {toast}
        </div>
      )}

      <div className={`relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-16 transition-all duration-500
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} style={{ color: C.downy }}/>
              <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">7-Day Ikigai Journey</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
              Discover Your<br/>
              <span style={{ color: C.horizon }}>Ikigai Purpose</span>
            </h1>
            <p className="text-sm text-gray-500 max-w-md">
              Complete each day in order — your answers unlock your personalized Ikigai map.
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              {[
                { val: `${completedDays.length}/7`, label: 'Days Done', icon: <CheckCircle size={14}/> },
                { val: `${Math.round(overallProgress)}%`, label: 'Progress', icon: <TrendingUp size={14}/> },
                { val: '5-10 min', label: 'Per Day', icon: <Clock size={14}/> },
              ].map((s,i)=>(
                <div key={i} className="bg-white rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm border border-gray-100">
                  <div style={{ color: C.downy }}>{s.icon}</div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">{s.val}</div>
                    <div className="text-[10px] text-gray-400">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-xs mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Journey Progress</span>
                <span className="font-medium text-gray-700">{Math.round(overallProgress)}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${overallProgress}%`, background: `linear-gradient(90deg, ${C.horizon}, ${C.downy})` }}/>
              </div>
            </div>
          </div>

          {/* Ikigai Chart */}
          <IkigaiChart
            allDayAnswers={allDayAnswers}
            completedDays={completedDays}
            onChallenge={handleThirtyDayClick}
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          
          {/* Day Panel */}
          <div className="lg:col-span-3">
            {dayData ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                
                {/* Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accent}15` }}>
                      <dayData.methodIcon size={18} style={{ color: accent }}/>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: accent }}>{dayData.method}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">Day {dayData.day}</span>
                        {status === 'active' && <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#64CDD1]/20 text-[#64CDD1] animate-pulse">● ACTIVE</span>}
                        {status === 'completed' && <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#5794A4]/20 text-[#5794A4]">✓ DONE</span>}
                      </div>
                      <h2 className="text-lg font-bold text-gray-800">{dayData.title}</h2>
                      <p className="text-xs text-gray-500 mt-0.5">{dayData.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                    <div className="flex gap-2">
                      <Zap size={12} style={{ color: accent }}/>
                      <p className="text-xs text-gray-600 italic">"{dayData.trigger}"</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Day Progress</span>
                      <span className="font-medium" style={{ color: accent }}>{Math.round(dayProgress())}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${dayProgress()}%`, background: `linear-gradient(90deg, ${accent}, ${C.downy})` }}/>
                    </div>
                  </div>

                  {/* Mood */}
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                      <Star size={12} style={{ color: accent }}/> {dayData.emojiQuestion}
                    </p>
                    <div className="flex gap-2">
                      {MOODS.map(m=>(
                        <button key={m.value} onClick={()=>setMood(m.value)}
                          className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-all ${
                            mood === m.value ? 'bg-white shadow-sm' : 'bg-white/60 hover:bg-white'
                          }`}
                          style={{ border: mood === m.value ? `1px solid ${accent}` : '1px solid #E2E8F0' }}>
                          <span className="text-lg">{m.emoji}</span>
                          <span className="text-[9px] font-medium text-gray-500">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <QuestionCard
                      question={dayData.questions[qIndex]}
                      index={qIndex}
                      total={dayData.questions.length}
                      answer={answers[qIndex]||''}
                      onAnswer={v=>setAnswers({...answers,[qIndex]:v})}
                      onNext={()=>qIndex<dayData.questions.length-1&&setQIndex(qIndex+1)}
                      onPrev={()=>qIndex>0&&setQIndex(qIndex-1)}
                      canGoNext={!!(answers[qIndex]?.trim())}
                      accent={accent}
                    />
                  </div>

                  {/* Habit Rating */}
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                      <Flame size={12} style={{ color: accent }}/> How meaningful was today's reflection?
                    </p>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(r=>(
                        <button key={r} onClick={()=>setHabitRating(r)}
                          className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            habitRating === r ? 'text-white' : 'bg-white text-gray-600 border border-gray-200'
                          }`}
                          style={{ background: habitRating === r ? accent : 'white' }}>
                          {r}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 italic">{dayData.habitPrompt}</p>
                  </div>

                  {/* Complete Button */}
                  <div className="flex gap-3">
                    <div className="flex-1 flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                      <Award size={12} style={{ color: accent }}/>
                      <span>Generates: {dayData.output}</span>
                    </div>
                    <button
                      onClick={handleComplete}
                      disabled={!canComplete}
                      className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                        canComplete 
                          ? 'text-white hover:shadow-md' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      style={{ background: canComplete ? `linear-gradient(135deg, ${C.horizon}, ${C.downy})` : undefined }}>
                      {status === 'completed' ? (
                        <><CheckCircle size={14} className="inline mr-1"/> Completed</>
                      ) : isSubmitting ? 'Saving…' : (
                        <><Sparkles size={14} className="inline mr-1"/> Complete Day</>
                      )}
                    </button>
                  </div>

                  {/* Answer Summary */}
                  {Object.keys(answers).some(k=>answers[k]?.trim()) && (
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-[10px] font-medium text-gray-500 mb-2 flex items-center gap-1.5">
                        <BookOpen size={10}/> Your Answers ({Object.keys(answers).filter(k=>answers[k]?.trim()).length}/{dayData.questions.length})
                      </p>
                      <div className="space-y-1 max-h-28 overflow-y-auto">
                        {dayData.questions.map((_,i)=>answers[i]?.trim()&&(
                          <div key={i} className="text-[10px] text-gray-600 p-1.5 bg-white rounded-lg">
                            <span className="font-medium" style={{ color: accent }}>Q{i+1}:</span> {answers[i].substring(0, 60)}...
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                <Lock size={32} className="mx-auto text-gray-300 mb-3"/>
                <p className="text-gray-500">Select an unlocked day to begin</p>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
              <Calendar size={12}/> Journey Timeline
            </h2>

            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
              {challengeData.map(d=>(
                <DayPill key={d.day} dayData={d} status={getStatus(d.day)}
                  isActive={expandedDay===d.day} insights={getDayInsights(d.day)}
                  onClick={day=>{
                    const s=getStatus(day);
                    if(s!=='locked'){ setExpandedDay(day); setQIndex(0); setAnswers({}); setMood(null); }
                  }}/>
              ))}
            </div>

            {/* Completion Card */}
            {isFullyComplete && (
              <div className="mt-4 p-4 bg-gradient-to-r from-[#5794A4]/10 to-[#64CDD1]/10 rounded-xl text-center border border-[#64CDD1]/30">
                <div className="text-2xl mb-1">🎉</div>
                <p className="text-sm font-semibold text-gray-800">Journey Complete!</p>
                <p className="text-xs text-gray-500 mb-3">Your Ikigai map is ready</p>
                <button
                  onClick={handleThirtyDayClick}
                  className="px-4 py-2 bg-[#5794A4] text-white text-xs font-medium rounded-lg hover:bg-[#64CDD1] transition-all"
                >
                  Start 30-Day Challenge <Rocket size={12} className="inline ml-1"/>
                </button>
              </div>
            )}

            {/* Legend */}
            <div className="mt-4 p-3 bg-white/80 rounded-xl">
              <p className="text-[9px] font-semibold uppercase text-gray-400 mb-2">Legend</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2"><CheckCircle size={10} className="text-[#5794A4]"/><span className="text-[10px] text-gray-500">Completed</span></div>
                <div className="flex items-center gap-2"><Flame size={10} className="text-[#64CDD1]"/><span className="text-[10px] text-gray-500">Active Day</span></div>
                <div className="flex items-center gap-2"><Lock size={9} className="text-gray-400"/><span className="text-[10px] text-gray-500">Locked — complete in order</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({length:60}).map((_,i)=>(
            <div key={i} className="absolute rounded-sm"
              style={{
                width:4+Math.random()*4, height:4+Math.random()*4,
                left:`${Math.random()*100}%`, top:'-10px',
                background: [C.horizon, C.downy, '#FBBF24'][Math.floor(Math.random()*3)],
                animation:`confettiFall ${1.5+Math.random()*1.5}s ${Math.random()*1}s linear forwards`,
              }}/>
          ))}
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.25s ease forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Sevendays;