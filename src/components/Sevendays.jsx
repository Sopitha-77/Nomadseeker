import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, CheckCircle, Lock, Target, TrendingUp, Zap,
  ArrowRight, ArrowLeft, Sparkles, Brain, Heart, Compass, Trophy,
  Award, Flame, Users, Calendar, Star, Rocket, ChevronRight,
  Clock, Loader2, Download, Code, Briefcase, UserCheck,
  Lightbulb, Quote, Gift, PartyPopper, Music, Camera, Palette,
  Coffee, Plane, Globe, Smile, ThumbsUp, Crown
} from 'lucide-react';
import { useIkigai } from '../context/IkigaiContext';
import { getQuestionsForCategory } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import IkigaiChart from '../components/IkigaiChart';

/* ══════════════════════════════════════════════
   BRAND PALETTE
══════════════════════════════════════════════ */
const C = {
  horizon: '#5794A4',
  downy: '#64CDD1',
  powder: '#B8E3E6',
  white: '#FFFFFF',
  gray: '#64748B',
  lightGray: '#F1F5F9',
  tiber: '#0A3948',
  gold: '#F59E0B',
  purple: '#8B5CF6',
  pink: '#EC4899',
};

/* ── Gradient Background with Particles ── */
const GradientBg = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#B8E3E6] via-[#C4E8EB] to-[#DCF2F4]" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#64CDD1]/20 to-transparent rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#5794A4]/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#64CDD1]/5 rounded-full blur-3xl" />
  </div>
);

/* ─── Floating Particles ─── */
const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/20"
        style={{
          width: Math.random() * 4 + 2,
          height: Math.random() * 4 + 2,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: Math.random() * 5 + 3,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

/* ─── Fallback Questions Generator ─── */
const getFallbackQuestions = (category, day) => {
  // Ensure day is between 1-6
  const safeDay = Math.min(Math.max(day, 1), 6);
  
  const fallbackQuestions = {
    1: {
      title: "What You Love",
      type: "love",
      questions: [
        {
          id: `fallback_${category}_1_1`,
          text: "What activities make you feel most energized and alive?",
          description: "Discover what truly brings you joy",
          options: [
            { value: "A", text: "Creating or building something new" },
            { value: "B", text: "Helping others solve their problems" },
            { value: "C", text: "Learning and mastering new skills" },
            { value: "D", text: "Leading and inspiring teams" },
            { value: "E", text: "Analyzing data and finding patterns" },
            { value: "F", text: "Designing beautiful experiences" },
            { value: "G", text: "Teaching and sharing knowledge" },
            { value: "H", text: "Organizing and optimizing systems" }
          ]
        },
        {
          id: `fallback_${category}_1_2`,
          text: "What could you spend hours doing without getting tired?",
          description: "Identify your natural interests",
          options: [
            { value: "A", text: "Solving complex problems" },
            { value: "B", text: "Building things with my hands" },
            { value: "C", text: "Reading and researching" },
            { value: "D", text: "Brainstorming new ideas" },
            { value: "E", text: "Collaborating with others" },
            { value: "F", text: "Working on detailed tasks" },
            { value: "G", text: "Planning and strategizing" },
            { value: "H", text: "Creating content or art" }
          ]
        },
        {
          id: `fallback_${category}_1_3`,
          text: "What kind of problems do you enjoy solving?",
          description: "Find your problem-solving passion",
          options: [
            { value: "A", text: "Technical and mechanical issues" },
            { value: "B", text: "Business and strategy challenges" },
            { value: "C", text: "People and relationship matters" },
            { value: "D", text: "Creative and design problems" },
            { value: "E", text: "Organizational and efficiency issues" },
            { value: "F", text: "Educational and learning challenges" },
            { value: "G", text: "Social and community problems" },
            { value: "H", text: "Personal growth and development" }
          ]
        }
      ]
    },
    2: {
      title: "What You Are Good At",
      type: "good",
      questions: [
        {
          id: `fallback_${category}_2_1`,
          text: "What skill do people often compliment you on?",
          description: "Recognize your natural strengths",
          options: [
            { value: "A", text: "Problem-solving and critical thinking" },
            { value: "B", text: "Communication and presentation" },
            { value: "C", text: "Technical or analytical skills" },
            { value: "D", text: "Leadership and management" },
            { value: "E", text: "Creativity and innovation" },
            { value: "F", text: "Organization and planning" },
            { value: "G", text: "Empathy and understanding others" },
            { value: "H", text: "Attention to detail" }
          ]
        },
        {
          id: `fallback_${category}_2_2`,
          text: "What task do you find easier than most people?",
          description: "Identify your unique abilities",
          options: [
            { value: "A", text: "Learning new software or tools" },
            { value: "B", text: "Understanding complex concepts" },
            { value: "C", text: "Making decisions quickly" },
            { value: "D", text: "Staying organized" },
            { value: "E", text: "Coming up with creative ideas" },
            { value: "F", text: "Connecting with people" },
            { value: "G", text: "Fixing broken things" },
            { value: "H", text: "Seeing the big picture" }
          ]
        },
        {
          id: `fallback_${category}_2_3`,
          text: "What have you successfully taught others to do?",
          description: "Skills you can transfer to others",
          options: [
            { value: "A", text: "Using technology or software" },
            { value: "B", text: "Solving specific types of problems" },
            { value: "C", text: "Improving their work processes" },
            { value: "D", text: "Communicating more effectively" },
            { value: "E", text: "Managing their time better" },
            { value: "F", text: "Being more creative" },
            { value: "G", text: "Working well with others" },
            { value: "H", text: "Achieving their goals" }
          ]
        }
      ]
    },
    3: {
      title: "What You Can Be Paid For",
      type: "paid",
      questions: [
        {
          id: `fallback_${category}_3_1`,
          text: "What services could you offer that people would pay for?",
          description: "Identify marketable skills",
          options: [
            { value: "A", text: "Technical consulting or development" },
            { value: "B", text: "Business strategy and planning" },
            { value: "C", text: "Creative design or content creation" },
            { value: "D", text: "Coaching or mentoring" },
            { value: "E", text: "Project management" },
            { value: "F", text: "Data analysis and insights" },
            { value: "G", text: "Training and education" },
            { value: "H", text: "Process optimization" }
          ]
        },
        {
          id: `fallback_${category}_3_2`,
          text: "What problems in your industry need solving?",
          description: "Find opportunities for value creation",
          options: [
            { value: "A", text: "Inefficient workflows and processes" },
            { value: "B", text: "Lack of technical expertise" },
            { value: "C", text: "Poor customer experiences" },
            { value: "D", text: "Communication gaps" },
            { value: "E", text: "Outdated tools or systems" },
            { value: "F", text: "Skill gaps in teams" },
            { value: "G", text: "Missed market opportunities" },
            { value: "H", text: "Ineffective marketing" }
          ]
        },
        {
          id: `fallback_${category}_3_3`,
          text: "What value can you create that others would appreciate?",
          description: "Define your value proposition",
          options: [
            { value: "A", text: "Saving time and increasing efficiency" },
            { value: "B", text: "Reducing costs and waste" },
            { value: "C", text: "Increasing revenue or sales" },
            { value: "D", text: "Improving quality or outcomes" },
            { value: "E", text: "Reducing risk or uncertainty" },
            { value: "F", text: "Enhancing user experience" },
            { value: "G", text: "Providing knowledge or expertise" },
            { value: "H", text: "Building community or connections" }
          ]
        }
      ]
    },
    4: {
      title: "What The World Needs",
      type: "need",
      questions: [
        {
          id: `fallback_${category}_4_1`,
          text: "What global or local issue concerns you most?",
          description: "Connect with meaningful causes",
          options: [
            { value: "A", text: "Environmental sustainability" },
            { value: "B", text: "Education and skill development" },
            { value: "C", text: "Healthcare and wellness" },
            { value: "D", text: "Economic inequality" },
            { value: "E", text: "Mental health awareness" },
            { value: "F", text: "Technology access" },
            { value: "G", text: "Community development" },
            { value: "H", text: "Work-life balance" }
          ]
        },
        {
          id: `fallback_${category}_4_2`,
          text: "How could your skills help improve society?",
          description: "Apply your abilities for greater good",
          options: [
            { value: "A", text: "Creating educational resources" },
            { value: "B", text: "Building helpful technology" },
            { value: "C", text: "Mentoring and teaching others" },
            { value: "D", text: "Improving business practices" },
            { value: "E", text: "Supporting non-profits" },
            { value: "F", text: "Creating sustainable solutions" },
            { value: "G", text: "Building community programs" },
            { value: "H", text: "Advocating for change" }
          ]
        },
        {
          id: `fallback_${category}_4_3`,
          text: "What positive change do you want to create?",
          description: "Define your desired impact",
          options: [
            { value: "A", text: "Empower people with knowledge" },
            { value: "B", text: "Create equal opportunities" },
            { value: "C", text: "Protect the environment" },
            { value: "D", text: "Improve mental wellbeing" },
            { value: "E", text: "Build stronger communities" },
            { value: "F", text: "Advance technology for good" },
            { value: "G", text: "Promote sustainable business" },
            { value: "H", text: "Foster creativity and innovation" }
          ]
        }
      ]
    },
    5: {
      title: "Your Passion in Action",
      type: "love",
      questions: [
        {
          id: `fallback_${category}_5_1`,
          text: "How does your passion show up in your daily life?",
          description: "Express your passion through action",
          options: [
            { value: "A", text: "I naturally spend hours thinking about my interests" },
            { value: "B", text: "I get excited when discussing topics I care about" },
            { value: "C", text: "I actively seek opportunities to pursue my passions" },
            { value: "D", text: "I feel energized after engaging with my interests" },
            { value: "E", text: "I lose track of time when doing what I love" },
            { value: "F", text: "I constantly learn more about my passion areas" },
            { value: "G", text: "I enjoy sharing my passion with others" },
            { value: "H", text: "I look for ways to turn passion into action" }
          ]
        },
        {
          id: `fallback_${category}_5_2`,
          text: "What would you do if you had unlimited resources?",
          description: "Dream without constraints",
          options: [
            { value: "A", text: "Build something that helps many people" },
            { value: "B", text: "Create innovative solutions to big problems" },
            { value: "C", text: "Travel and learn from different cultures" },
            { value: "D", text: "Start a business around my passion" },
            { value: "E", text: "Teach and mentor others" },
            { value: "F", text: "Create art, music, or content" },
            { value: "G", text: "Solve environmental or social issues" },
            { value: "H", text: "Build communities and bring people together" }
          ]
        }
      ]
    },
    6: {
      title: "Your Mission & Purpose",
      type: "mission",
      questions: [
        {
          id: `fallback_${category}_6_1`,
          text: "What problem do you feel called to solve?",
          description: "Identify your mission",
          options: [
            { value: "A", text: "Lack of opportunities for talented people" },
            { value: "B", text: "People feeling stuck or unfulfilled" },
            { value: "C", text: "Inefficiency in how things work" },
            { value: "D", text: "Lack of access to knowledge or tools" },
            { value: "E", text: "Environmental or sustainability issues" },
            { value: "F", text: "Mental health and well-being" },
            { value: "G", text: "Education and skill development" },
            { value: "H", text: "Community building and connection" }
          ]
        },
        {
          id: `fallback_${category}_6_2`,
          text: "What legacy do you want to leave?",
          description: "Define your long-term purpose",
          options: [
            { value: "A", text: "Empowered others to find their path" },
            { value: "B", text: "Built something that changed lives" },
            { value: "C", text: "Created systems that keep helping people" },
            { value: "D", text: "Inspired a movement or community" },
            { value: "E", text: "Solved a problem that affected millions" },
            { value: "F", text: "Made knowledge and tools accessible" },
            { value: "G", text: "Showed what's possible through example" },
            { value: "H", text: "Brought people together around purpose" }
          ]
        }
      ]
    }
  };
  
  return fallbackQuestions[safeDay] || fallbackQuestions[1];
};

/* ─── Day Completion Celebration Modal ─── */
const DayCompletionCelebration = ({ day, onClose }) => {
  const dayMessages = {
    1: {
      title: "Day 1 Complete! 🎉",
      subtitle: "You've taken the first step on your Ikigai journey!",
      message: "You've discovered what truly makes you come alive. Your passion is the compass that will guide you forward.",
      icon: <Heart className="w-12 h-12 text-pink-500" />,
      color: "from-pink-500 to-rose-500",
      fact: "People who know their passion are 3x more likely to feel fulfilled in their career!"
    },
    2: {
      title: "Day 2 Complete! 🌟",
      subtitle: "You're discovering your natural strengths!",
      message: "Your unique talents are what set you apart. Recognizing them is the first step to leveraging them.",
      icon: <Star className="w-12 h-12 text-yellow-500" />,
      color: "from-blue-500 to-cyan-500",
      fact: "Using your strengths daily can increase happiness by up to 73%!"
    },
    3: {
      title: "Day 3 Complete! 💰",
      subtitle: "Your skills are valuable assets!",
      message: "You've identified how your abilities can create value. This is where passion meets profession.",
      icon: <Target className="w-12 h-12 text-emerald-500" />,
      color: "from-emerald-500 to-teal-500",
      fact: "85% of people who align their skills with their passion report higher job satisfaction!"
    },
    4: {
      title: "Day 4 Complete! 🌍",
      subtitle: "You're finding your purpose in the world!",
      message: "The problems you're passionate about solving are your mission. The world needs your unique contribution.",
      icon: <Globe className="w-12 h-12 text-purple-500" />,
      color: "from-purple-500 to-indigo-500",
      fact: "People with a strong sense of purpose live up to 7 years longer on average!"
    },
    5: {
      title: "Day 5 Complete! 🔥",
      subtitle: "Your passion is transforming into action!",
      message: "You're connecting your deepest passions to real-world impact. This is where magic happens.",
      icon: <Flame className="w-12 h-12 text-orange-500" />,
      color: "from-orange-500 to-amber-500",
      fact: "Taking action on your passion releases dopamine, making you feel more energized!"
    },
    6: {
      title: "Day 6 Complete! 🎯",
      subtitle: "You've defined your mission and purpose!",
      message: "Your Ikigai is coming together beautifully. Get ready to see your complete purpose map!",
      icon: <Compass className="w-12 h-12 text-downy" />,
      color: "from-downy to-horizon",
      fact: "94% of people who discover their Ikigai report feeling more motivated in life!"
    }
  };

  const currentDayMessage = dayMessages[day] || dayMessages[1];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-white rounded-3xl p-8 text-center max-w-md mx-4 shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
          className={`w-24 h-24 rounded-full bg-gradient-to-r ${currentDayMessage.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
        >
          {currentDayMessage.icon}
        </motion.div>

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-tiber mb-2"
        >
          {currentDayMessage.title}
        </motion.h3>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm font-medium text-downy mb-3"
        >
          {currentDayMessage.subtitle}
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-sm mb-4 leading-relaxed"
        >
          {currentDayMessage.message}
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-downy/10 to-horizon/10 rounded-xl p-3 mb-4"
        >
          <div className="flex items-center gap-2 justify-center">
            <Lightbulb className="w-4 h-4 text-gold" />
            <span className="text-xs text-gray-600">✨ Did you know?</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{currentDayMessage.fact}</p>
        </motion.div>

        {day < 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-2 text-xs text-gray-400"
          >
            <span>Moving to Day {day + 1}</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="w-3 h-3" />
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-downy to-horizon rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 2 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Category Selection Modal ─── */
const CategorySelectionModal = ({ onSelectCategory, isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      subtitle: 'Founder · Innovator · Builder',
      description: 'Visionary leaders who build something new and create impact through innovation.',
      longDescription: 'You see opportunities where others see problems. You dream big and have the drive to turn ideas into reality.',
      icon: Rocket,
      color: '#64CDD1',
      gradient: 'from-[#64CDD1]/20 to-[#64CDD1]/5',
      features: ['Startup Mindset', 'Product Innovation', 'Business Growth', 'Risk Taking'],
      stats: { avgIncome: '$120k+', satisfaction: '94%', growth: '+156%' }
    },
    {
      id: 'managerial',
      title: 'Managerial',
      subtitle: 'Marketing · Business Developer · Strategist',
      description: 'Strategic thinkers who drive growth, optimize systems, and lead teams to success.',
      longDescription: 'You excel at organizing people and resources. You see the big picture and know how to execute strategy.',
      icon: TrendingUp,
      color: '#5794A4',
      gradient: 'from-[#5794A4]/20 to-[#5794A4]/5',
      features: ['Team Leadership', 'Strategic Planning', 'Process Optimization', 'Client Relations'],
      stats: { avgIncome: '$95k+', satisfaction: '89%', growth: '+98%' }
    },
    {
      id: 'technician',
      title: 'Technician',
      subtitle: 'Developer · Creator · Specialist',
      description: 'Hands-on experts who execute with precision and build technical solutions.',
      longDescription: 'You love mastering your craft. You find joy in solving complex problems and building things that work.',
      icon: Code,
      color: '#0A3948',
      gradient: 'from-[#0A3948]/20 to-[#0A3948]/5',
      features: ['Technical Skills', 'Problem Solving', 'Building Solutions', 'Continuous Learning'],
      stats: { avgIncome: '$110k+', satisfaction: '91%', growth: '+134%' }
    }
  ];

  const handleSelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleConfirm = () => {
    if (selectedCategory) {
      setIsConfirming(true);
      setTimeout(() => {
        onSelectCategory(selectedCategory);
        setIsConfirming(false);
      }, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-5 rounded-t-3xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-downy to-horizon flex items-center justify-center shadow-lg">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-tiber">Choose Your Path</h2>
                <p className="text-sm text-gray-500">Select the role that best describes your professional journey</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-5">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              const isHovered = hoveredCard === category.id;
              return (
                <motion.button
                  key={category.id}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleSelect(category.id)}
                  className={`relative p-6 rounded-2xl text-left transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-downy shadow-xl scale-[1.02]'
                      : 'hover:shadow-xl hover:scale-[1.01]'
                  }`}
                  style={{
                    background: isSelected ? `linear-gradient(135deg, ${category.color}12, ${category.color}05)` : '#F8FAFC',
                    border: `1px solid ${isSelected ? category.color : '#E2E8F0'}`
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ background: `radial-gradient(circle at 50% 0%, ${category.color}20, transparent 70%)` }}
                    />
                  )}

                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{ 
                      background: `${category.color}15`,
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: category.color }} />
                  </div>
                  
                  <h3 className="font-bold text-xl mb-1" style={{ color: category.color }}>
                    {category.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{category.subtitle}</p>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {category.features.map((feature, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400">Avg Income</p>
                      <p className="text-xs font-semibold" style={{ color: category.color }}>{category.stats.avgIncome}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400">Satisfaction</p>
                      <p className="text-xs font-semibold" style={{ color: category.color }}>{category.stats.satisfaction}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400">Growth</p>
                      <p className="text-xs font-semibold" style={{ color: category.color }}>{category.stats.growth}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3"
                    >
                      <CheckCircle className="w-5 h-5 text-downy" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 bg-gradient-to-r from-downy/5 to-horizon/5 rounded-xl text-center"
          >
            <Quote className="w-4 h-4 text-downy mx-auto mb-2" />
            <p className="text-xs text-gray-500 italic">
              "The only way to do great work is to love what you do. Choose the path that resonates with your soul."
            </p>
          </motion.div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02]"
            >
              Cancel
            </button>
            <motion.button
              onClick={handleConfirm}
              disabled={!selectedCategory || isConfirming}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                selectedCategory && !isConfirming
                  ? 'bg-gradient-to-r from-horizon to-downy text-white hover:shadow-lg hover:scale-[1.02]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={selectedCategory && !isConfirming ? { scale: 1.02 } : {}}
              whileTap={selectedCategory && !isConfirming ? { scale: 0.98 } : {}}
            >
              {isConfirming ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Begin Your Journey <Rocket className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Day Header Component ─── */
const DayHeader = ({ day, type, accent, currentDayAnswers, totalQuestions }) => {
  const dayIcons = {
    1: <Heart className="w-6 h-6" />,
    2: <Star className="w-6 h-6" />,
    3: <Target className="w-6 h-6" />,
    4: <Users className="w-6 h-6" />,
    5: <Flame className="w-6 h-6" />,
    6: <Compass className="w-6 h-6" />
  };

  const dayTitles = {
    1: "What You Love",
    2: "What You Are Good At",
    3: "What You Can Be Paid For",
    4: "What The World Needs",
    5: "Your Passion in Action",
    6: "Your Mission & Purpose"
  };

  const dayColors = {
    1: "from-pink-500 to-rose-500",
    2: "from-blue-500 to-cyan-500",
    3: "from-emerald-500 to-teal-500",
    4: "from-purple-500 to-indigo-500",
    5: "from-orange-500 to-amber-500",
    6: "from-downy to-horizon"
  };

  const answeredCount = Object.keys(currentDayAnswers || {}).length;
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full mb-5 shadow-md"
      >
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${dayColors[day]} flex items-center justify-center shadow-lg`}>
          {dayIcons[day]}
        </div>
        <span className="text-sm font-bold" style={{ color: accent }}>
          Day {day} of 6
        </span>
        <div className="w-px h-4 bg-gray-200" />
        <span className="text-xs text-gray-500 capitalize">{type} Focus</span>
      </motion.div>

      <h2 className="font-sora text-3xl md:text-4xl font-bold text-tiber mb-3">
        {dayTitles[day]}
      </h2>
      
      <p className="text-gray-500 text-sm max-w-md mx-auto">
        {day === 1 && "Discover what truly makes you come alive and brings you joy"}
        {day === 2 && "Identify your natural strengths and talents that set you apart"}
        {day === 3 && "Explore how your unique skills can create value and generate income"}
        {day === 4 && "Find the meaningful problems you're called to solve in the world"}
        {day === 5 && "Connect your deepest passions to real-world impact and action"}
        {day === 6 && "Define your life's purpose and the legacy you want to leave"}
      </p>

      <div className="mt-4 flex justify-center">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#E5E7EB"
              strokeWidth="3"
              fill="none"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke={accent}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 175.9" }}
              animate={{ strokeDasharray: `${(progress / 100) * 175.9} 175.9` }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold" style={{ color: accent }}>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Component ─── */
const Sevendays = () => {
  const navigate = useNavigate();
  const {
    selectedCategory,
    setSelectedCategory,
    answers: contextAnswers,
    saveAnswer,
    currentDay: contextCurrentDay,
    setCurrentDay: setContextCurrentDay,
    completedDays: contextCompletedDays,
    completeDay: contextCompleteDay,
    generateResult,
    result,
    isAnalyzing,
    resetJourney
  } = useIkigai();

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toast, setToast] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showDayCelebration, setShowDayCelebration] = useState(false);
  const [completedDayNumber, setCompletedDayNumber] = useState(null);
  const [isCompletingDay, setIsCompletingDay] = useState(false);
  const [dayQuestions, setDayQuestions] = useState(null);

  // Use context values - ensure day is between 1-6
  const currentDay = Math.min(Math.max(contextCurrentDay || 1, 1), 6);
  const completedDays = contextCompletedDays || [];
  const setCurrentDay = setContextCurrentDay || (() => {});
  const completeDay = contextCompleteDay || (() => {});

  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Show category modal if no category selected
  useEffect(() => {
    if (!selectedCategory && !showResult && !result) {
      setShowCategoryModal(true);
    }
  }, [selectedCategory, showResult, result]);

  // Load questions for current day
  useEffect(() => {
    if (selectedCategory) {
      // Ensure day is between 1-6
      const safeDay = Math.min(Math.max(currentDay, 1), 6);
      
      // Try to get real questions
      let questions = getQuestionsForCategory(selectedCategory, safeDay);
      
      // If no questions found, use fallback
      if (!questions || !questions.questions || questions.questions.length === 0) {
        console.log(`Using fallback questions for ${selectedCategory} day ${safeDay}`);
        questions = getFallbackQuestions(selectedCategory, safeDay);
      }
      
      setDayQuestions(questions);
    }
  }, [selectedCategory, currentDay]);

  // Load existing answers for current day
  useEffect(() => {
    if (selectedCategory && dayQuestions) {
      if (contextAnswers[currentDay]) {
        setCurrentAnswers(contextAnswers[currentDay]);
      } else {
        setCurrentAnswers({});
      }
      
      // Find first unanswered question
      const firstUnansweredIndex = dayQuestions.questions.findIndex(
        (q) => !contextAnswers[currentDay]?.[q.id]?.answer
      );
      setCurrentQuestionIndex(firstUnansweredIndex === -1 ? 0 : firstUnansweredIndex);
    }
  }, [currentDay, contextAnswers, selectedCategory, dayQuestions]);

  const isDayCompleted = completedDays.includes(currentDay);

  const currentQuestion = dayQuestions?.questions?.[currentQuestionIndex];
  const currentType = dayQuestions?.type;
  const totalQuestions = dayQuestions?.questions?.length || 0;

  // Check if current question already has an answer
  const currentQuestionHasAnswer = currentQuestion && 
    (contextAnswers[currentDay]?.[currentQuestion.id]?.answer || currentAnswers[currentQuestion.id]?.answer);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryModal(false);
    setToast(`✨ ${category.charAt(0).toUpperCase() + category.slice(1)} path selected! Let's begin your journey.`);
  };

  const handleAnswerSelect = (answer) => {
    if (currentQuestion) {
      const newAnswers = {
        ...currentAnswers,
        [currentQuestion.id]: { answer, type: currentType, timestamp: new Date().toISOString() }
      };
      setCurrentAnswers(newAnswers);
      saveAnswer(currentDay, currentQuestion.id, answer, currentType);
    }
  };

  const handleCompleteDay = useCallback(() => {
    if (isCompletingDay || isDayCompleted) return;
    
    if (!dayQuestions?.questions) return;
    
    const allAnswered = dayQuestions.questions.every(
      (q) => contextAnswers[currentDay]?.[q.id]?.answer || currentAnswers[q.id]?.answer
    );
    
    if (!allAnswered) {
      setToast('⚠️ Please answer all questions before completing the day.');
      return;
    }
    
    setIsCompletingDay(true);
    
    completeDay(currentDay);
    
    setShowConfetti(true);
    setCompletedDayNumber(currentDay);
    setShowDayCelebration(true);
    setToast(`🎉 Amazing! Day ${currentDay} complete!`);
    
    if (currentDay === 6) {
      setTimeout(() => {
        generateResult();
        setShowResult(true);
        setIsCompletingDay(false);
      }, 4000);
    } else {
      setTimeout(() => {
        setIsCompletingDay(false);
      }, 1000);
    }
  }, [currentDay, dayQuestions, contextAnswers, currentAnswers, completeDay, generateResult, isDayCompleted, isCompletingDay]);

  const handleNextQuestion = () => {
    if (!currentQuestionHasAnswer) {
      setToast('⚠️ Please select an answer first.');
      return;
    }
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleCompleteDay();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleCloseDayCelebration = () => {
    setShowDayCelebration(false);
    if (currentDay < 6 && !isDayCompleted) {
      setCurrentDay(currentDay + 1);
    }
    setCompletedDayNumber(null);
  };

  const handleDownloadReport = () => {
    if (!result) return;
    
    const reportData = {
      userCategory: selectedCategory,
      completedAt: new Date().toISOString(),
      answers: contextAnswers,
      result: result
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ikigai-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast('📄 Report downloaded successfully!');
  };

  const handleStartOver = () => {
    resetJourney();
    navigate('/');
  };

  const handleResetJourney = () => {
    if (window.confirm('Are you sure you want to reset your journey? All progress will be lost.')) {
      resetJourney();
      setShowCategoryModal(true);
      setShowResult(false);
      setCurrentQuestionIndex(0);
      setCurrentAnswers({});
      setCompletedDayNumber(null);
      setDayQuestions(null);
    }
  };

  // Show analyzing screen
  if (isAnalyzing) {
    return (
      <div className="min-h-screen relative flex items-center justify-center" style={{ marginLeft: 280, background: C.powder }}>
        <GradientBg />
        <FloatingParticles />
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-20 h-20 text-downy mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-tiber mb-3">Analyzing Your Answers</h2>
          <p className="text-gray-500">Creating your personalized Ikigai map...</p>
          <div className="mt-6 flex justify-center gap-2">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ background: `linear-gradient(135deg, ${C.horizon}, ${C.downy})` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show results page (after Day 6 completion)
  if (showResult && result) {
    return (
      <div className="min-h-screen relative" style={{ marginLeft: 280, background: C.powder }}>
        <GradientBg />
        <FloatingParticles />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-downy/20 to-horizon/20 px-5 py-2.5 rounded-full mb-5"
            >
              <PartyPopper className="w-5 h-5 text-downy" />
              <span className="text-sm font-medium text-downy">Congratulations!</span>
            </motion.div>
            <h1 className="font-sora text-5xl font-bold text-tiber mb-3">
              Your Ikigai Discovery
            </h1>
            <p className="text-gray-600 text-lg">
              Based on your 6-day journey, here's your personalized Ikigai map
            </p>
          </motion.div>

          <IkigaiChart result={result} onDownload={handleDownloadReport} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartOver}
              className="px-8 py-3.5 bg-gradient-to-r from-horizon to-downy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Start New Journey
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-8 py-3.5 border-2 border-horizon text-horizon rounded-xl font-semibold hover:bg-horizon hover:text-white transition-all"
            >
              Back to Home
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // If no category selected yet, show modal
  if (!selectedCategory) {
    return (
      <div className="min-h-screen relative flex items-center justify-center" style={{ marginLeft: 280, background: C.powder }}>
        <GradientBg />
        <FloatingParticles />
        <CategorySelectionModal
          isOpen={showCategoryModal}
          onSelectCategory={handleCategorySelect}
          onClose={() => navigate('/')}
        />
      </div>
    );
  }

  // Show loading while questions are being prepared
  if (!dayQuestions) {
    return (
      <div className="min-h-screen relative flex items-center justify-center" style={{ marginLeft: 280, background: C.powder }}>
        <GradientBg />
        <FloatingParticles />
        <div className="relative z-10 text-center">
          <Loader2 className="w-16 h-16 text-downy mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-semibold text-gray-600 mb-4">Loading your questions...</h2>
          <p className="text-sm text-gray-400">Please wait while we prepare your journey</p>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(contextAnswers[currentDay] || currentAnswers).length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const allQuestionsAnswered = dayQuestions?.questions?.every(
    (q) => contextAnswers[currentDay]?.[q.id]?.answer || currentAnswers[q.id]?.answer
  ) || false;

  const accent = currentDay === 1 || currentDay === 3 || currentDay === 5 ? C.horizon : C.downy;

  return (
    <div className="min-h-screen relative" style={{ marginLeft: 280, background: C.powder }}>
      <GradientBg />
      <FloatingParticles />

      {/* Day Completion Celebration Modal */}
      <AnimatePresence>
        {showDayCelebration && completedDayNumber && (
          <DayCompletionCelebration
            day={completedDayNumber}
            onClose={handleCloseDayCelebration}
          />
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl text-sm font-medium shadow-lg text-white"
            style={{ background: `linear-gradient(135deg, ${C.horizon}, ${C.downy})` }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative z-10 max-w-3xl mx-auto px-6 pt-8 pb-16 transition-all duration-700
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Reset Button */}
        <div className="flex justify-end mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetJourney}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Journey
          </motion.button>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentDay={currentDay} completedDays={completedDays} />

        {/* Day Header */}
        <DayHeader 
          day={currentDay}
          type={dayQuestions?.type}
          accent={accent}
          currentDayAnswers={contextAnswers[currentDay] || currentAnswers}
          totalQuestions={totalQuestions}
        />

        {/* Question Card */}
        <motion.div
          key={`${currentDay}-${currentQuestionIndex}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 md:p-8 shadow-xl border border-white/50"
        >
          {currentQuestion ? (
            <QuestionCard
              question={currentQuestion}
              index={currentQuestionIndex}
              total={totalQuestions}
              selectedValue={currentAnswers[currentQuestion?.id]?.answer || contextAnswers[currentDay]?.[currentQuestion?.id]?.answer}
              onSelect={handleAnswerSelect}
              onNext={handleNextQuestion}
              onPrev={handlePrevQuestion}
              isLast={isLastQuestion}
            />
          ) : (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 text-downy mx-auto mb-3 animate-spin" />
              <p className="text-gray-500">Loading question...</p>
            </div>
          )}
        </motion.div>

        {/* Progress Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
            <BookOpen size={14} className="text-downy" />
            <span className="text-sm text-gray-600">
              {answeredCount} of {totalQuestions} answered
            </span>
            {allQuestionsAnswered && !isDayCompleted && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs text-green-500 ml-2 flex items-center gap-1"
              >
                <CheckCircle className="w-3 h-3" /> Ready to complete!
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 rounded-full">
            <Lightbulb className="w-3 h-3 text-gold" />
            <p className="text-xs text-gray-500 italic">
              {currentDay === 1 && "✨ Every journey begins with a single step. Let's discover what makes you come alive."}
              {currentDay === 2 && "💪 Your unique strengths are waiting to be recognized. What comes naturally to you?"}
              {currentDay === 3 && "💰 Your skills have value. Let's explore how they can serve others and create income."}
              {currentDay === 4 && "🌍 The world needs your unique contribution. What problems are you called to solve?"}
              {currentDay === 5 && "🔥 Your passion is the fuel for your purpose. How does it show up in your life?"}
              {currentDay === 6 && "🎯 You're almost there! Let's connect everything together and define your mission."}
            </p>
          </div>
        </motion.div>

        {/* Daily Insight Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 p-3 bg-white/30 rounded-xl text-center"
        >
          <p className="text-[10px] text-gray-400">
            💡 <span className="font-medium">Insight:</span>{' '}
            {currentDay === 1 && "Take your time with each question. Your honest answers matter most."}
            {currentDay === 2 && "Think about compliments you've received. Others often see our strengths clearly."}
            {currentDay === 3 && "Consider problems you've solved for friends or colleagues. That's value!"}
            {currentDay === 4 && "What frustrates you about the world? That frustration might point to your mission."}
            {currentDay === 5 && "When do you feel most alive? Those moments reveal your passion."}
            {currentDay === 6 && "Your answers across all days will now come together to form your Ikigai map."}
          </p>
        </motion.div>
      </div>

      {/* Enhanced Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 200 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  scale: Math.random() * 0.8 + 0.4
                }}
                animate={{ 
                  y: window.innerHeight + 50,
                  rotate: 360 * (Math.random() * 3 + 1),
                  x: `+=${Math.random() * 100 - 50}`
                }}
                transition={{ 
                  duration: 1.5 + Math.random() * 2,
                  delay: Math.random() * 0.8,
                  ease: "easeOut"
                }}
                className="absolute rounded-sm"
                style={{
                  width: 6 + Math.random() * 8,
                  height: 6 + Math.random() * 8,
                  background: [C.horizon, C.downy, '#FBBF24', '#FF6B6B', '#4ECDC4', '#A78BFA', '#F472B6'][Math.floor(Math.random() * 7)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

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
        
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Sevendays;