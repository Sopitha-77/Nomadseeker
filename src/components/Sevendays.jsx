import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, CheckCircle, Target, TrendingUp, Zap, ArrowRight,
  Sparkles, Brain, Heart, Compass, Trophy, Flame, Users,
  Star, Rocket, Clock, Loader2, Code, Lightbulb, Quote,
  PartyPopper, Globe, ChevronRight, Check,
} from 'lucide-react';
import { useIkigai } from '../context/IkigaiContext';
import { getQuestionsForCategory } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import IkigaiChart from '../components/IkigaiChart';

/* ── Brand Colors ── */
const C = {
  horizon: '#5794A4', downy: '#64CDD1', powder: '#B8E3E6',
  white: '#FFFFFF', tiber: '#0A3948', gold: '#F59E0B',
};

/* ── Gradient Background ── */
const GradientBg = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0"
         style={{ background: 'linear-gradient(135deg, #EEF9FA 0%, #D4F0F3 50%, #E8F4F6 100%)' }} />
    <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full blur-3xl opacity-40 animate-pulse"
         style={{ background: 'radial-gradient(circle, #64CDD130, transparent 70%)' }} />
    <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full blur-3xl opacity-30 animate-pulse"
         style={{ background: 'radial-gradient(circle, #5794A430, transparent 70%)', animationDelay: '1.2s' }} />
  </div>
);

/* ── Fallback Questions ── */
const getFallbackQuestions = (category, day) => {
  const safeDay = Math.min(Math.max(day, 1), 6);
  const base = {
    1: { title: 'What You Love', type: 'love', questions: [
      { id: `fb_${category}_1_1`, text: 'What activities make you feel most energized and alive?', description: 'Discover what truly brings you joy',
        options: [
          { value: 'A', text: 'Creating or building something new' },
          { value: 'B', text: 'Helping others solve their problems' },
          { value: 'C', text: 'Learning and mastering new skills' },
          { value: 'D', text: 'Leading and inspiring teams' },
          { value: 'E', text: 'Analyzing data and finding patterns' },
          { value: 'F', text: 'Designing beautiful experiences' },
          { value: 'G', text: 'Teaching and sharing knowledge' },
          { value: 'H', text: 'Organizing and optimizing systems' },
        ],
      },
      { id: `fb_${category}_1_2`, text: 'What could you spend hours doing without getting tired?', description: 'Identify your natural interests',
        options: [
          { value: 'A', text: 'Solving complex problems' },
          { value: 'B', text: 'Building things with my hands' },
          { value: 'C', text: 'Reading and researching' },
          { value: 'D', text: 'Brainstorming new ideas' },
          { value: 'E', text: 'Collaborating with others' },
          { value: 'F', text: 'Working on detailed tasks' },
          { value: 'G', text: 'Planning and strategizing' },
          { value: 'H', text: 'Creating content or art' },
        ],
      },
    ]},
    2: { title: 'What You Are Good At', type: 'good', questions: [
      { id: `fb_${category}_2_1`, text: 'What skill do people often compliment you on?', description: 'Recognize your natural strengths',
        options: [
          { value: 'A', text: 'Problem-solving and critical thinking' },
          { value: 'B', text: 'Communication and presentation' },
          { value: 'C', text: 'Technical or analytical skills' },
          { value: 'D', text: 'Leadership and management' },
          { value: 'E', text: 'Creativity and innovation' },
          { value: 'F', text: 'Organization and planning' },
          { value: 'G', text: 'Empathy and understanding others' },
          { value: 'H', text: 'Attention to detail' },
        ],
      },
      { id: `fb_${category}_2_2`, text: 'What task do you find easier than most people?', description: 'Identify your unique abilities',
        options: [
          { value: 'A', text: 'Learning new software or tools' },
          { value: 'B', text: 'Understanding complex concepts' },
          { value: 'C', text: 'Making decisions quickly' },
          { value: 'D', text: 'Staying organized' },
          { value: 'E', text: 'Coming up with creative ideas' },
          { value: 'F', text: 'Connecting with people' },
          { value: 'G', text: 'Fixing broken things' },
          { value: 'H', text: 'Seeing the big picture' },
        ],
      },
    ]},
    3: { title: 'What You Can Be Paid For', type: 'paid', questions: [
      { id: `fb_${category}_3_1`, text: 'What services could you offer that people would pay for?', description: 'Identify marketable skills',
        options: [
          { value: 'A', text: 'Technical consulting or development' },
          { value: 'B', text: 'Business strategy and planning' },
          { value: 'C', text: 'Creative design or content creation' },
          { value: 'D', text: 'Coaching or mentoring' },
          { value: 'E', text: 'Project management' },
          { value: 'F', text: 'Data analysis and insights' },
          { value: 'G', text: 'Training and education' },
          { value: 'H', text: 'Process optimization' },
        ],
      },
    ]},
    4: { title: 'What The World Needs', type: 'need', questions: [
      { id: `fb_${category}_4_1`, text: 'What global or local issue concerns you most?', description: 'Connect with meaningful causes',
        options: [
          { value: 'A', text: 'Environmental sustainability' },
          { value: 'B', text: 'Education and skill development' },
          { value: 'C', text: 'Healthcare and wellness' },
          { value: 'D', text: 'Economic inequality' },
          { value: 'E', text: 'Mental health awareness' },
          { value: 'F', text: 'Technology access' },
          { value: 'G', text: 'Community development' },
          { value: 'H', text: 'Work-life balance' },
        ],
      },
    ]},
    5: { title: 'Your Passion in Action', type: 'love', questions: [
      { id: `fb_${category}_5_1`, text: 'How does your passion show up in your daily life?', description: 'Express your passion through action',
        options: [
          { value: 'A', text: 'I naturally spend hours thinking about my interests' },
          { value: 'B', text: 'I get excited when discussing topics I care about' },
          { value: 'C', text: 'I actively seek opportunities to pursue my passions' },
          { value: 'D', text: 'I feel energized after engaging with my interests' },
          { value: 'E', text: 'I lose track of time when doing what I love' },
          { value: 'F', text: 'I constantly learn more about my passion areas' },
          { value: 'G', text: 'I enjoy sharing my passion with others' },
          { value: 'H', text: 'I look for ways to turn passion into action' },
        ],
      },
    ]},
    6: { title: 'Your Mission & Purpose', type: 'mission', questions: [
      { id: `fb_${category}_6_1`, text: 'What problem do you feel called to solve?', description: 'Identify your mission',
        options: [
          { value: 'A', text: 'Lack of opportunities for talented people' },
          { value: 'B', text: 'People feeling stuck or unfulfilled' },
          { value: 'C', text: 'Inefficiency in how things work' },
          { value: 'D', text: 'Lack of access to knowledge or tools' },
          { value: 'E', text: 'Environmental or sustainability issues' },
          { value: 'F', text: 'Mental health and well-being' },
          { value: 'G', text: 'Education and skill development' },
          { value: 'H', text: 'Community building and connection' },
        ],
      },
      { id: `fb_${category}_6_2`, text: 'What legacy do you want to leave?', description: 'Define your long-term purpose',
        options: [
          { value: 'A', text: 'Empowered others to find their path' },
          { value: 'B', text: 'Built something that changed lives' },
          { value: 'C', text: 'Created systems that keep helping people' },
          { value: 'D', text: 'Inspired a movement or community' },
          { value: 'E', text: 'Solved a problem that affected millions' },
          { value: 'F', text: 'Made knowledge and tools accessible' },
          { value: 'G', text: 'Showed what\'s possible through example' },
          { value: 'H', text: 'Brought people together around purpose' },
        ],
      },
    ]},
  };
  return base[safeDay] || base[1];
};

/* ── Day Celebration Modal ── */
const DayCompletionCelebration = ({ day, onClose }) => {
  const cfg = {
    1: { title: 'Day 1 Complete!', emoji: '🎉', subtitle: 'Your passion is now your compass.',            color: 'from-rose-400 to-pink-500',        icon: <Heart className="w-10 h-10 text-white" />,   fact: 'People who know their passion are 3× more likely to feel fulfilled!' },
    2: { title: 'Day 2 Complete!', emoji: '🌟', subtitle: 'Your strengths are your superpower.',          color: 'from-blue-400 to-cyan-500',         icon: <Star className="w-10 h-10 text-white" />,    fact: 'Using your strengths daily increases happiness by up to 73%!' },
    3: { title: 'Day 3 Complete!', emoji: '💰', subtitle: 'Your skills create real value.',               color: 'from-emerald-400 to-teal-500',      icon: <Target className="w-10 h-10 text-white" />,  fact: '85% of people who align skills with passion report higher satisfaction!' },
    4: { title: 'Day 4 Complete!', emoji: '🌍', subtitle: 'The world needs what you offer.',             color: 'from-violet-400 to-purple-500',     icon: <Globe className="w-10 h-10 text-white" />,   fact: 'People with strong purpose live up to 7 years longer!' },
    5: { title: 'Day 5 Complete!', emoji: '🔥', subtitle: 'Passion is becoming action.',                 color: 'from-orange-400 to-amber-500',      icon: <Flame className="w-10 h-10 text-white" />,   fact: 'Acting on passion releases dopamine — you\'re literally energized!' },
    6: { title: 'Journey Complete!', emoji: '🎯', subtitle: 'Your Ikigai is revealed.',                 color: 'from-[#5794A4] to-[#64CDD1]',      icon: <Compass className="w-10 h-10 text-white" />, fact: '94% who discover their Ikigai feel more motivated in life!' },
  };
  const c = cfg[day] || cfg[1];

  useEffect(() => {
    const t = setTimeout(onClose, 4200);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-lg px-4"
    >
      <motion.div
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="bg-white rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl shadow-gray-200"
      >
        <motion.div
          initial={{ scale: 0, rotate: -120 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.15, stiffness: 200 }}
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${c.color} flex items-center
                      justify-center mx-auto mb-5 shadow-xl`}
        >
          {c.icon}
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="text-3xl mb-1">{c.emoji}</motion.p>
        <motion.h3 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-xl font-black text-[#0A3948] mb-1">{c.title}</motion.h3>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="text-sm text-[#5794A4] font-semibold mb-4">{c.subtitle}</motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="bg-amber-50 rounded-xl p-3 mb-5 border border-amber-100">
          <div className="flex items-center gap-1.5 justify-center mb-1">
            <Lightbulb size={12} className="text-amber-400" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">Did you know?</span>
          </div>
          <p className="text-[11px] text-gray-500">{c.fact}</p>
        </motion.div>

        {day < 6 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="flex items-center justify-center gap-1.5 text-xs text-gray-300">
            Moving to Day {day + 1}
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              <ArrowRight size={11} />
            </motion.span>
          </motion.p>
        )}

        <div className="mt-4 h-0.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
            initial={{ width: 0 }} animate={{ width: '100%' }}
            transition={{ delay: 0.6, duration: 3.4, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Category Selection Modal ── */
const CategorySelectionModal = ({ onSelectCategory, isOpen, onClose }) => {
  const [selected, setSelected]   = useState(null);
  const [confirming, setConfirming] = useState(false);

  const categories = [
    {
      id: 'entrepreneur', title: 'Entrepreneur', subtitle: 'Founder · Innovator · Builder',
      desc: 'You see opportunities where others see problems. You dream big and build.',
      icon: Rocket, color: '#64CDD1', bg: 'from-cyan-50 to-teal-50', border: 'border-cyan-200',
      tags: ['Startup Mindset', 'Innovation', 'Product', 'Risk-Taking'],
      stats: [{ label: 'Avg Income', val: '$120k+' }, { label: 'Satisfaction', val: '94%' }, { label: 'Growth', val: '+156%' }],
    },
    {
      id: 'managerial', title: 'Managerial', subtitle: 'Marketing · Strategy · Operations',
      desc: 'You excel at organizing people and resources. You execute strategy beautifully.',
      icon: TrendingUp, color: '#5794A4', bg: 'from-sky-50 to-blue-50', border: 'border-sky-200',
      tags: ['Leadership', 'Planning', 'Client Relations', 'Optimization'],
      stats: [{ label: 'Avg Income', val: '$95k+' }, { label: 'Satisfaction', val: '89%' }, { label: 'Growth', val: '+98%' }],
    },
    {
      id: 'technician', title: 'Technician', subtitle: 'Developer · Creator · Specialist',
      desc: 'You love mastering your craft. You find joy in building things that work.',
      icon: Code, color: '#0A3948', bg: 'from-slate-50 to-gray-50', border: 'border-slate-200',
      tags: ['Technical Skills', 'Problem-Solving', 'Building', 'Learning'],
      stats: [{ label: 'Avg Income', val: '$110k+' }, { label: 'Satisfaction', val: '91%' }, { label: 'Growth', val: '+134%' }],
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-lg">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 24 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl shadow-gray-200"
      >
        {/* header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100
                        px-7 py-5 rounded-t-3xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#64CDD1] to-[#5794A4]
                              flex items-center justify-center shadow-lg shadow-cyan-200">
                <Compass size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0A3948]">Choose Your Path</h2>
                <p className="text-xs text-gray-400">Select the role that resonates most with you</p>
              </div>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300
                         hover:text-gray-500 hover:bg-gray-100 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-7">
          <div className="grid md:grid-cols-3 gap-4">
            {categories.map(cat => {
              const Icon       = cat.icon;
              const isSelected = selected === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelected(cat.id)}
                  whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
                  className={`relative text-left p-6 rounded-2xl transition-all duration-250 border-2 ${
                    isSelected
                      ? `bg-gradient-to-br ${cat.bg} ${cat.border} shadow-lg`
                      : 'bg-gray-50 border-gray-100 hover:border-gray-200 hover:bg-white hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                      className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center
                                 justify-center shadow-sm"
                      style={{ background: cat.color }}
                    >
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </motion.div>
                  )}

                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-sm"
                       style={{ background: cat.color + '18' }}>
                    <Icon size={26} style={{ color: cat.color }} />
                  </div>

                  <h3 className="font-black text-lg mb-0.5" style={{ color: cat.color }}>{cat.title}</h3>
                  <p className="text-[11px] text-gray-400 mb-2 font-medium">{cat.subtitle}</p>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{cat.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cat.tags.map(t => (
                      <span key={t}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-white text-gray-500
                                       border border-gray-200 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between pt-3 border-t border-gray-100">
                    {cat.stats.map(s => (
                      <div key={s.label} className="text-center">
                        <p className="text-[9px] text-gray-400 font-medium">{s.label}</p>
                        <p className="text-xs font-black mt-0.5" style={{ color: cat.color }}>{s.val}</p>
                      </div>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-5 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl
                          text-center border border-gray-100">
            <Quote size={14} className="text-gray-300 mx-auto mb-1.5" />
            <p className="text-xs text-gray-400 italic">
              "The only way to do great work is to love what you do."
            </p>
          </div>

          <div className="mt-5 flex gap-3">
            <button onClick={onClose}
              className="flex-1 py-3.5 border border-gray-200 text-gray-500 rounded-xl font-semibold
                         text-sm hover:bg-gray-50 transition-all">
              Cancel
            </button>
            <motion.button
              onClick={() => {
                if (!selected || confirming) return;
                setConfirming(true);
                setTimeout(() => { onSelectCategory(selected); setConfirming(false); }, 400);
              }}
              disabled={!selected || confirming}
              className={`flex-[2] py-3.5 rounded-xl font-black text-sm flex items-center
                          justify-center gap-2 transition-all ${
                selected && !confirming
                  ? 'bg-gradient-to-r from-[#5794A4] to-[#64CDD1] text-white shadow-lg shadow-cyan-200 hover:shadow-xl'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              whileHover={selected && !confirming ? { scale: 1.01 } : {}}
              whileTap={selected && !confirming  ? { scale: 0.98 } : {}}
            >
              {confirming
                ? <Loader2 size={16} className="animate-spin" />
                : <><Rocket size={15} /> Begin Your Journey</>
              }
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Day Header ── */
const DayHeader = ({ day, type, currentDayAnswers, totalQuestions }) => {
  const cfg = {
    1: { title: 'What You Love',             sub: 'Discover what truly makes you come alive',              icon: <Heart size={18} />,   color: '#F43F5E', grad: 'from-rose-400 to-pink-500' },
    2: { title: "What You're Good At",        sub: 'Identify your natural strengths and talents',           icon: <Star size={18} />,    color: '#3B82F6', grad: 'from-blue-400 to-cyan-500' },
    3: { title: 'What You Can Be Paid For',   sub: 'Explore how your skills create real value',             icon: <Target size={18} />,  color: '#10B981', grad: 'from-emerald-400 to-teal-500' },
    4: { title: 'What The World Needs',       sub: "Find the meaningful problems you're called to solve",   icon: <Globe size={18} />,   color: '#8B5CF6', grad: 'from-violet-400 to-purple-500' },
    5: { title: 'Your Passion in Action',     sub: 'Connect your passions to real-world impact',            icon: <Flame size={18} />,   color: '#F59E0B', grad: 'from-amber-400 to-orange-500' },
    6: { title: 'Your Mission & Purpose',     sub: "Define your life's purpose and the legacy you'll leave",icon: <Compass size={18} />, color: '#64CDD1', grad: 'from-cyan-400 to-sky-500' },
  };
  const c = cfg[day] || cfg[1];

  /* count answered questions — handles both string and array answers */
  const answered = Object.values(currentDayAnswers || {}).filter(obj => {
    const a = obj?.answer ?? obj;
    return Array.isArray(a) ? a.length >= 2 : Boolean(a);
  }).length;
  const progress = totalQuestions > 0 ? (answered / totalQuestions) * 100 : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
        className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-5 py-2.5
                   rounded-full mb-5 shadow-md border border-white/60"
      >
        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${c.grad} flex items-center
                         justify-center text-white shadow-md`}>
          {c.icon}
        </div>
        <span className="text-sm font-bold" style={{ color: c.color }}>Day {day} of 6</span>
        <div className="w-px h-4 bg-gray-200" />
        <span className="text-xs text-gray-400 capitalize font-medium">{type} Focus</span>
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-black text-[#0A3948] mb-2 tracking-tight">{c.title}</h2>
      <p className="text-sm text-gray-400 max-w-md mx-auto">{c.sub}</p>

      {/* circular progress */}
      <div className="mt-4 flex justify-center">
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 -rotate-90">
            <circle cx="28" cy="28" r="24" stroke="#E5E7EB" strokeWidth="3" fill="none" />
            <motion.circle
              cx="28" cy="28" r="24"
              stroke={c.color} strokeWidth="3" fill="none" strokeLinecap="round"
              initial={{ strokeDasharray: '0 150.8' }}
              animate={{ strokeDasharray: `${(progress / 100) * 150.8} 150.8` }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-black" style={{ color: c.color }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
const Sevendays = () => {
  const navigate = useNavigate();
  const {
    selectedCategory, setSelectedCategory,
    answers: contextAnswers, saveAnswer,
    currentDay: contextCurrentDay, setCurrentDay: setContextCurrentDay,
    completedDays: contextCompletedDays, completeDay: contextCompleteDay,
    generateResult, result, isAnalyzing, resetJourney,
  } = useIkigai();

  const [showCategoryModal, setShowCategoryModal]     = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers]             = useState({});
  const [showResult, setShowResult]                     = useState(false);
  const [showConfetti, setShowConfetti]                 = useState(false);
  const [toast, setToast]                               = useState('');
  const [mounted, setMounted]                           = useState(false);
  const [showDayCelebration, setShowDayCelebration]     = useState(false);
  const [completedDayNumber, setCompletedDayNumber]     = useState(null);
  const [isCompletingDay, setIsCompletingDay]           = useState(false);
  const [dayQuestions, setDayQuestions]                 = useState(null);

  const currentDay   = Math.min(Math.max(contextCurrentDay || 1, 1), 6);
  const completedDays = contextCompletedDays || [];
  const setCurrentDay = setContextCurrentDay || (() => {});
  const completeDay   = contextCompleteDay   || (() => {});

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(''), 2500); return () => clearTimeout(t); }
  }, [toast]);

  useEffect(() => {
    if (showConfetti) { const t = setTimeout(() => setShowConfetti(false), 3000); return () => clearTimeout(t); }
  }, [showConfetti]);

  useEffect(() => {
    if (!selectedCategory && !showResult && !result) setShowCategoryModal(true);
  }, [selectedCategory, showResult, result]);

  useEffect(() => {
    if (selectedCategory) {
      const safeDay = Math.min(Math.max(currentDay, 1), 6);
      let q = getQuestionsForCategory(selectedCategory, safeDay);
      if (!q?.questions?.length) q = getFallbackQuestions(selectedCategory, safeDay);
      setDayQuestions(q);
    }
  }, [selectedCategory, currentDay]);

  useEffect(() => {
    if (selectedCategory && dayQuestions) {
      if (contextAnswers[currentDay]) setCurrentAnswers(contextAnswers[currentDay]);
      else setCurrentAnswers({});
      const first = dayQuestions.questions.findIndex(q => {
        const saved = contextAnswers[currentDay]?.[q.id]?.answer;
        return Array.isArray(saved) ? saved.length < 2 : !saved;
      });
      setCurrentQuestionIndex(first === -1 ? 0 : first);
    }
  }, [currentDay, contextAnswers, selectedCategory, dayQuestions]);

  const isDayCompleted  = completedDays.includes(currentDay);
  const currentQuestion = dayQuestions?.questions?.[currentQuestionIndex];
  const currentType     = dayQuestions?.type;
  const totalQuestions  = dayQuestions?.questions?.length || 0;

  /* ── check if current question has a valid answer (2+ selections) ── */
  const currentQuestionHasAnswer = currentQuestion && (() => {
    const saved = contextAnswers[currentDay]?.[currentQuestion.id]?.answer
               ?? currentAnswers[currentQuestion.id]?.answer;
    return Array.isArray(saved) ? saved.length >= 2 : Boolean(saved);
  })();

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setShowCategoryModal(false);
    setToast(`✨ ${cat.charAt(0).toUpperCase() + cat.slice(1)} path selected — let's begin!`);
  };

  /* ── handleAnswerSelect — receives string[] from QuestionCard ── */
  const handleAnswerSelect = (answerArray) => {
    if (currentQuestion) {
      const updated = {
        ...currentAnswers,
        [currentQuestion.id]: {
          answer: answerArray,          // store as array
          type: currentType,
          timestamp: new Date().toISOString(),
        },
      };
      setCurrentAnswers(updated);
      saveAnswer(currentDay, currentQuestion.id, answerArray, currentType);
    }
  };

  /* ── check if every question in the day has at least 2 answers ── */
  const isDayFullyAnswered = useCallback(() => {
    if (!dayQuestions?.questions) return false;
    return dayQuestions.questions.every(q => {
      const saved = contextAnswers[currentDay]?.[q.id]?.answer
                 ?? currentAnswers[q.id]?.answer;
      return Array.isArray(saved) ? saved.length >= 2 : Boolean(saved);
    });
  }, [dayQuestions, contextAnswers, currentDay, currentAnswers]);

  const handleCompleteDay = useCallback(() => {
    if (isCompletingDay || isDayCompleted) return;
    if (!isDayFullyAnswered()) {
      setToast('⚠️ Please answer all questions (choose 2–3 options each) before completing the day.');
      return;
    }

    setIsCompletingDay(true);
    completeDay(currentDay);
    setShowConfetti(true);
    setCompletedDayNumber(currentDay);
    setShowDayCelebration(true);
    setToast(`🎉 Day ${currentDay} complete!`);

    if (currentDay === 6) {
      setTimeout(() => { generateResult(); setShowResult(true); setIsCompletingDay(false); }, 4200);
    } else {
      setTimeout(() => setIsCompletingDay(false), 1000);
    }
  }, [currentDay, isDayFullyAnswered, completeDay, generateResult, isDayCompleted, isCompletingDay]);

  const handleNextQuestion = () => {
    if (!currentQuestionHasAnswer) {
      setToast('⚠️ Please select at least 2 options before continuing.');
      return;
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(p => p + 1);
    } else {
      handleCompleteDay();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(p => p - 1);
  };

  /* ── advance to next day ONLY when celebration modal closes ── */
  const handleCloseDayCelebration = () => {
    setShowDayCelebration(false);
    const closedDay = completedDayNumber;
    setCompletedDayNumber(null);
    if (closedDay && closedDay < 6) {
      setCurrentDay(closedDay + 1);
    }
  };

  const handleDownloadReport = () => {
    if (!result) return;
    const blob = new Blob(
      [JSON.stringify({ selectedCategory, answers: contextAnswers, result, exportedAt: new Date().toISOString() }, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href = url;
    a.download = `ikigai-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast('📄 Report exported!');
  };

  const handleResetJourney = () => {
    if (window.confirm('Reset your journey? All progress will be lost.')) {
      resetJourney();
      setShowCategoryModal(true);
      setShowResult(false);
      setCurrentQuestionIndex(0);
      setCurrentAnswers({});
      setCompletedDayNumber(null);
      setDayQuestions(null);
    }
  };

  /* ── count answered questions for the progress display ── */
  const answeredCount = Object.values(contextAnswers[currentDay] || currentAnswers).filter(obj => {
    const a = obj?.answer ?? obj;
    return Array.isArray(a) ? a.length >= 2 : Boolean(a);
  }).length;

  const allQuestionsAnswered = isDayFullyAnswered();

  /* ── get saved value for the current question (array or string) ── */
  const savedCurrentValue =
    contextAnswers[currentDay]?.[currentQuestion?.id]?.answer
    ?? currentAnswers[currentQuestion?.id]?.answer
    ?? [];

  /* ════════ LOADING / ANALYZING ════════ */
  if (isAnalyzing) return (
    <div className="min-h-screen relative flex items-center justify-center" style={{ marginLeft: 280 }}>
      <GradientBg />
      <div className="relative z-10 text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
          <Loader2 className="w-16 h-16 text-[#64CDD1] mx-auto mb-5" />
        </motion.div>
        <h2 className="text-2xl font-black text-[#0A3948] mb-2">Analyzing Your Answers</h2>
        <p className="text-sm text-gray-400">Building your personalized Ikigai map…</p>
        <div className="mt-5 flex justify-center gap-2">
          {[0, 1, 2, 3].map(i => (
            <motion.div key={i} className="w-2.5 h-2.5 rounded-full bg-[#64CDD1]"
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
          ))}
        </div>
      </div>
    </div>
  );

  /* ════════ RESULTS ════════ */
  if (showResult && result) return (
    <div className="min-h-screen relative" style={{ marginLeft: 280 }}>
      <GradientBg />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5
                       rounded-full mb-5 shadow-md border border-white/60"
          >
            <PartyPopper size={16} className="text-[#64CDD1]" />
            <span className="text-sm font-bold text-[#5794A4]">Journey Complete!</span>
          </motion.div>
          <h1 className="text-5xl font-black text-[#0A3948] mb-2 tracking-tight">Your Ikigai</h1>
          <p className="text-gray-400">A personalized map built from your 6-day reflection</p>
        </motion.div>

        <IkigaiChart result={result} onDownload={handleDownloadReport} />

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => { resetJourney(); navigate('/'); }}
            className="px-8 py-3.5 bg-gradient-to-r from-[#5794A4] to-[#64CDD1] text-white
                       rounded-xl font-bold shadow-lg shadow-cyan-200 hover:shadow-xl
                       hover:shadow-cyan-300 transition-all">
            Start New Journey
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            className="px-8 py-3.5 border-2 border-[#5794A4] text-[#5794A4] rounded-xl font-bold
                       hover:bg-[#5794A4] hover:text-white transition-all">
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );

  /* ════════ NO CATEGORY ════════ */
  if (!selectedCategory) return (
    <div className="min-h-screen relative flex items-center justify-center" style={{ marginLeft: 280 }}>
      <GradientBg />
      <CategorySelectionModal
        isOpen={showCategoryModal}
        onSelectCategory={handleCategorySelect}
        onClose={() => navigate('/')}
      />
    </div>
  );

  /* ════════ LOADING QUESTIONS ════════ */
  if (!dayQuestions) return (
    <div className="min-h-screen relative flex items-center justify-center" style={{ marginLeft: 280 }}>
      <GradientBg />
      <div className="relative z-10 text-center">
        <Loader2 className="w-12 h-12 text-[#64CDD1] mx-auto mb-3 animate-spin" />
        <p className="text-sm text-gray-400">Preparing your questions…</p>
      </div>
    </div>
  );

  /* ════════ MAIN QUESTION VIEW ════════ */
  return (
    <div className="min-h-screen relative" style={{ marginLeft: 280 }}>
      <GradientBg />

      {/* Day completion celebration */}
      <AnimatePresence>
        {showDayCelebration && completedDayNumber && (
          <DayCompletionCelebration day={completedDayNumber} onClose={handleCloseDayCelebration} />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
            className="fixed top-5 right-5 z-[100] px-4 py-3 rounded-xl text-sm font-semibold
                       shadow-xl text-white flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #5794A4, #64CDD1)' }}
          >
            <Sparkles size={14} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative z-10 max-w-2xl mx-auto px-5 pt-8 pb-16 transition-all duration-600 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>

        {/* reset */}
        <div className="flex justify-end mb-3">
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={handleResetJourney}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-red-400
                       px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </motion.button>
        </div>

        <ProgressBar currentDay={currentDay} completedDays={completedDays} />

        <DayHeader
          day={currentDay}
          type={dayQuestions?.type}
          currentDayAnswers={contextAnswers[currentDay] || currentAnswers}
          totalQuestions={totalQuestions}
        />

        {/* Question card */}
        <motion.div
          key={`${currentDay}-${currentQuestionIndex}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8
                     shadow-xl shadow-gray-100 border border-white/60"
        >
          {currentQuestion ? (
            <QuestionCard
              question={currentQuestion}
              index={currentQuestionIndex}
              total={totalQuestions}
              selectedValue={savedCurrentValue}
              onSelect={handleAnswerSelect}
              onNext={handleNextQuestion}
              onPrev={handlePrevQuestion}
              isLast={currentQuestionIndex === totalQuestions - 1}
              minSelect={2}
              maxSelect={3}
            />
          ) : (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 text-[#64CDD1] mx-auto mb-3 animate-spin" />
              <p className="text-sm text-gray-400">Loading question…</p>
            </div>
          )}
        </motion.div>

        {/* progress info */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="mt-5 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm
                          rounded-full shadow-sm border border-white/50">
            <BookOpen size={13} className="text-[#64CDD1]" />
            <span className="text-xs text-gray-500">{answeredCount} of {totalQuestions} answered</span>
            {allQuestionsAnswered && !isDayCompleted && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="flex items-center gap-1 text-[11px] text-emerald-500 font-semibold">
                <CheckCircle size={11} /> Ready!
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* motivational tip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="mt-4 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/40 rounded-full">
            <Lightbulb size={11} className="text-amber-400" />
            <p className="text-[11px] text-gray-400 italic">
              {currentDay === 1 && 'Honest answers lead to the most meaningful discoveries.'}
              {currentDay === 2 && "Think about compliments you've received — others often see your strengths clearly."}
              {currentDay === 3 && "Consider problems you've solved for others. That's real value."}
              {currentDay === 4 && "What frustrates you about the world? That frustration points to your mission."}
              {currentDay === 5 && 'When do you feel most alive? Those moments reveal your passion.'}
              {currentDay === 6 && 'Your answers from all 6 days come together to form your Ikigai map.'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 120 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                  scale: Math.random() * 0.7 + 0.4,
                }}
                animate={{
                  y: window.innerHeight + 40,
                  rotate: 360 * (Math.random() * 3 + 1),
                  x: `+=${Math.random() * 80 - 40}`,
                }}
                transition={{ duration: 1.4 + Math.random() * 2, delay: Math.random() * 0.6, ease: 'easeOut' }}
                className="absolute rounded-sm"
                style={{
                  width:  5 + Math.random() * 7,
                  height: 5 + Math.random() * 7,
                  background: ['#64CDD1','#5794A4','#FBBF24','#F472B6','#A78BFA','#34D399','#F87171'][
                    Math.floor(Math.random() * 7)
                  ],
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .glass-card {
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );
};

export default Sevendays;