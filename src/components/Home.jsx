import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Compass, DollarSign, Globe, Play, ChevronRight, 
  CheckCircle, Star, MessageCircle, X, MapPin, Briefcase, 
  TrendingUp, Rocket, Users, Shield, Zap, Target,
  ChevronLeft, Pause, Award, Heart, Coffee, Lock as LockIcon,
  Crown, User, Briefcase as BriefcaseIcon, Code, Brain, Sparkles,
  Quote, Lightbulb, Gift, PartyPopper, Music, Camera, Palette,
  Coffee as CoffeeIcon, Plane, Smile, ThumbsUp
} from 'lucide-react';
import { useIkigai } from '../context/IkigaiContext';

// Import your images
import photo1 from '../assets/photo1.jpeg';
import photo2 from '../assets/photo2.jpeg';
import photo3 from '../assets/photo3.jpeg';
import photo4 from '../assets/photo4.jpeg';
import photo5 from '../assets/photo5.jpeg';

// --- CUSTOM STYLES & DESIGN TOKENS ---
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800;900&display=swap');
    
    :root {
      --tiber: #0A3948;
      --horizon: #5794A4;
      --downy: #64CDD1;
      --powder: #B8E3E6;
      --white: #FFFFFF;
    }

    body {
      background: linear-gradient(135deg, var(--powder) 0%, #e0f0f2 100%);
      color: var(--tiber);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }

    .font-sora { font-family: 'Sora', sans-serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    
    .bg-tiber { background-color: var(--tiber); }
    .text-tiber { color: var(--tiber); }
    .bg-horizon { background-color: var(--horizon); }
    .text-horizon { color: var(--horizon); }
    .bg-downy { background-color: var(--downy); }
    .text-downy { color: var(--downy); }
    
    .rounded-card { border-radius: 16px; }
    .rounded-container { border-radius: 24px; }

    .glass-card {
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    
    .dark-glass {
      background: rgba(10, 57, 72, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(87, 148, 164, 0.3);
    }

    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
    
    .hover-lift {
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    }
    .hover-lift:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(10, 57, 72, 0.12);
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(100, 205, 209, 0.6); }
      50% { box-shadow: 0 0 0 15px rgba(100, 205, 209, 0); }
    }
    .btn-glow:hover {
      animation: pulse-glow 1.5s infinite;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    .animate-float { animation: float 5s ease-in-out infinite; }
    
    @keyframes slideRight {
      from { transform: translateX(-30px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .animate-slide-right { animation: slideRight 0.6s ease-out forwards; }

    @keyframes confetti-fall {
      0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    .confetti-piece {
      position: fixed;
      top: -20px;
      z-index: 9999;
      animation: confetti-fall linear forwards;
    }

    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: var(--powder); }
    ::-webkit-scrollbar-thumb { background: var(--horizon); border-radius: 5px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--tiber); }
    
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    .shimmer {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite;
    }

    @keyframes popupFadeIn {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    .animate-popup {
      animation: popupFadeIn 0.3s ease-out forwards;
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .gradient-animate {
      background-size: 200% 200%;
      animation: gradientShift 3s ease infinite;
    }

    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-bounce-slow {
      animation: bounce-slow 3s ease-in-out infinite;
    }

    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }

    @media (max-width: 768px) {
      .ml-\\[280px\\] {
        margin-left: 0 !important;
      }
    }
  `}} />
);

// --- Floating Particles Background ---
const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 6 + 2,
          height: Math.random() * 6 + 2,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `rgba(100, 205, 209, ${Math.random() * 0.3})`,
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, Math.random() * 30 - 15, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: Math.random() * 8 + 5,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

// --- Animated Counter Component ---
const AnimatedCounter = ({ value, label, icon: Icon, color }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className={`w-12 h-12 rounded-full bg-${color}/10 flex items-center justify-center mx-auto mb-3`}>
        <Icon className={`w-6 h-6 text-${color}`} />
      </div>
      <div className={`text-3xl font-bold text-${color}`}>{count}{value >= 1000 ? '+' : ''}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </motion.div>
  );
};

// --- Testimonial Card Component ---
const TestimonialCard = ({ testimonial, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
    transition={{ duration: 0.5 }}
    className="glass-card p-8 rounded-2xl"
  >
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
      ))}
    </div>
    <p className="text-lg italic text-gray-700 mb-6">"{testimonial.quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-downy to-horizon flex items-center justify-center text-white font-bold">
        {testimonial.name[0]}
      </div>
      <div>
        <h4 className="font-semibold text-tiber">{testimonial.name}</h4>
        <p className="text-xs text-gray-500">{testimonial.role}</p>
      </div>
    </div>
  </motion.div>
);

// --- Confetti Component ---
const Confetti = () => {
  const [pieces, setPieces] = useState([]);
  
  useEffect(() => {
    const colors = ['#0A3948', '#5794A4', '#64CDD1', '#FFFFFF', '#FFD700', '#F43F5E', '#8B5CF6'];
    const newPieces = [...Array(120)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 0.5,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      width: Math.random() * 10 + 4,
      height: Math.random() * 10 + 4,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          initial={{ y: -20, x: `${piece.left}vw`, rotate: 0, opacity: 1 }}
          animate={{ y: '100vh', rotate: 360, opacity: 0 }}
          transition={{ duration: piece.duration, delay: piece.delay, ease: 'easeOut' }}
          style={{
            backgroundColor: piece.backgroundColor,
            borderRadius: piece.borderRadius,
            width: piece.width,
            height: piece.height,
          }}
        />
      ))}
    </div>
  );
};

// --- Category Card Component ---
const CategoryCard = ({ category, isSelected, onSelect, index }) => {
  const Icon = category.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <motion.button
        onClick={() => onSelect(category.id)}
        className={`relative w-full text-left p-6 rounded-2xl transition-all duration-300 ${
          isSelected
            ? 'ring-2 ring-downy shadow-xl scale-[1.02]'
            : 'hover:shadow-xl hover:scale-[1.01]'
        }`}
        style={{
          background: isSelected ? `linear-gradient(135deg, ${category.color}12, ${category.color}05)` : 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${isSelected ? category.color : 'rgba(0,0,0,0.05)'}`,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3"
          >
            <CheckCircle className="w-5 h-5 text-downy" />
          </motion.div>
        )}
        
        <motion.div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${category.color}15` }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Icon className="w-7 h-7" style={{ color: category.color }} />
        </motion.div>
        
        <h3 className="font-sora text-xl font-bold mb-1" style={{ color: category.color }}>
          {category.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{category.subtitle}</p>
        <p className="text-sm text-gray-600 mb-4">{category.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {category.features.map((feature, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <motion.div
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: category.color }}
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>Start Journey</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

// --- MAIN APPLICATION ---
export default function Home() {
  const navigate = useNavigate();
  const { setSelectedCategory, selectedCategory } = useIkigai();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // --- STATE MANAGEMENT ---
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({ pull: '', level: '', speed: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const [gamificationToast, setGamificationToast] = useState('');
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [showUserTypePopup, setShowUserTypePopup] = useState(false);
  
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Ikigai categories
  const categories = [
    {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      subtitle: 'Founder · Innovator · Builder',
      description: 'Visionary leaders who build something new and create impact through innovation.',
      icon: Rocket,
      color: '#64CDD1',
      features: ['Startup Mindset', 'Product Innovation', 'Business Growth']
    },
    {
      id: 'managerial',
      title: 'Managerial',
      subtitle: 'Marketing · Business Developer · Strategist',
      description: 'Strategic thinkers who drive growth, optimize systems, and lead teams to success.',
      icon: TrendingUp,
      color: '#5794A4',
      features: ['Team Leadership', 'Strategic Planning', 'Process Optimization']
    },
    {
      id: 'technician',
      title: 'Technician',
      subtitle: 'Developer · Creator · Specialist',
      description: 'Hands-on experts who execute with precision and build technical solutions.',
      icon: Code,
      color: '#0A3948',
      features: ['Technical Skills', 'Problem Solving', 'Building Solutions']
    }
  ];

  // Community images
  const communityImages = [
    { id: 1, src: photo1, fallback: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop", title: "Global Community Meetup", location: "Bali, Indonesia" },
    { id: 2, src: photo2, fallback: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop", title: "Coworking Session", location: "Lisbon, Portugal" },
    { id: 3, src: photo3, fallback: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=500&fit=crop", title: "Networking Night", location: "Bangkok, Thailand" },
    { id: 4, src: photo4, fallback: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop", title: "Skill Building Workshop", location: "Medellín, Colombia" },
    { id: 5, src: photo5, fallback: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&fit=crop", title: "Beach Coworking Day", location: "Chiang Mai, Thailand" }
  ];

  const getImageSrc = (img) => {
    if (imageErrors[img.id]) {
      return img.fallback;
    }
    return img.src;
  };

  // Auto slide effect
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % communityImages.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, communityImages.length]);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
    
    const handleMouseLeave = (e) => {
      if (e.clientY < 0 && !hasShownExitPopup && !showExitPopup) {
        setShowExitPopup(true);
        setHasShownExitPopup(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      observer.disconnect();
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShownExitPopup, showExitPopup]);

  // --- HANDLERS ---
  const handleOnboardingSelect = (key, value) => {
    setOnboardingData(prev => ({ ...prev, [key]: value }));
    
    if (onboardingStep === 1) {
      setGamificationToast("✨ You're 33% closer to your freedom life!");
      setTimeout(() => setGamificationToast(''), 4000);
    }

    setTimeout(() => {
      if (onboardingStep < 3) {
        setOnboardingStep(prev => prev + 1);
      } else {
        setOnboardingStep(4);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        setTimeout(() => setShowUserTypePopup(true), 1000);
      }
    }, 400);
  };

  const resetOnboarding = () => {
    setOnboardingStep(1);
    setOnboardingData({ pull: '', level: '', speed: '' });
  };

  const handleUserTypeSelect = (type, action) => {
    setShowUserTypePopup(false);
    if (action === 'start') {
      navigate('/sevendays');
    }
  };

  const handleCloseUserTypePopup = () => {
    setShowUserTypePopup(false);
  };

  const goToSevendays = () => {
    navigate('/sevendays');
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate('/sevendays');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % communityImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + communityImages.length) % communityImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleVideoPlay = () => {
    alert("Video player would open here");
  };

  const scrollToOnboarding = () => {
    const element = document.getElementById('onboarding');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const testimonials = [
    { name: "Sarah Johnson", role: "Former Accountant", before: "Burned out in cubicle", after: "Living in Bali, $8k/mo", quote: "Nomads Advisors didn't just give me a course, they gave me a completely new trajectory for my life. Best decision I ever made!" },
    { name: "Marcus Chen", role: "Freelance Designer", before: "Struggling for clients", after: "Running a 6-figure agency", quote: "The 30-day challenge completely rewired how I approach income generation and travel. I've now visited 15 countries while working!" },
    { name: "Elena Rodriguez", role: "Digital Nomad", before: "Dreaming of travel", after: "Visited 12 countries this year", quote: "Finally, a roadmap that cuts the BS. I packed my bags exactly 60 days after starting. Best decision of my life!" }
  ];

  // User Type Popup Component
  const UserTypePopup = ({ onSelect, onClose }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [showActionPopup, setShowActionPopup] = useState(false);

    const userTypes = [
      { id: 'entrepreneur', title: 'Entrepreneur', subtitle: 'Founder · Innovator', description: 'Visionary leaders building something new', icon: Rocket, color: '#64CDD1' },
      { id: 'managerial', title: 'Managerial', subtitle: 'Marketing · Business Developer', description: 'Strategic thinkers driving growth', icon: TrendingUp, color: '#5794A4' },
      { id: 'technician', title: 'Technician', subtitle: 'Developer · Creator · Sales', description: 'Hands-on experts executing excellence', icon: Code, color: '#0A3948' }
    ];

    const handleTypeSelect = (typeId) => {
      setSelectedType(typeId);
      setShowActionPopup(true);
    };

    const handleStartChallenge = () => {
      if (onSelect) {
        onSelect(selectedType, 'start');
      }
    };

    const handleLater = () => {
      if (onClose) {
        onClose();
      }
    };

    if (showActionPopup) {
      const selected = userTypes.find(t => t.id === selectedType);
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={handleLater}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="bg-white rounded-3xl max-w-md w-full mx-4 p-8 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: `linear-gradient(135deg, ${selected.color}20, ${selected.color}10)` }}
            >
              <selected.icon size={36} style={{ color: selected.color }} />
            </motion.div>
            <h2 className="text-2xl font-bold text-[#0A3948] mb-2 text-center">Ready to Begin?</h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              You've chosen the <span className="font-bold" style={{ color: selected.color }}>{selected.title}</span> path
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleStartChallenge}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0A3948] to-[#5794A4] text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Let's Start <Rocket size={16} className="inline ml-1" />
              </button>
              <button
                onClick={handleLater}
                className="px-6 py-3 border-2 border-gray-200 text-gray-500 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          className="bg-white rounded-3xl max-w-3xl w-full mx-4 p-8 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 bg-gradient-to-br from-[#64CDD1]/20 to-[#5794A4]/20 rounded-full flex items-center justify-center"
            >
              <Compass size={32} className="text-[#0A3948]" />
            </motion.div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#0A3948] mb-2">Choose Your Path</h2>
            <p className="text-gray-500 text-sm">Select the role that best describes you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {userTypes.map((type, idx) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleTypeSelect(type.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl text-center transition-all transform ${
                    isSelected 
                      ? 'ring-2 ring-[#64CDD1] shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  style={{
                    background: isSelected ? `linear-gradient(135deg, ${type.color}15, ${type.color}05)` : '#F8FAFC',
                    border: `1px solid ${isSelected ? type.color : '#E2E8F0'}`
                  }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: `${type.color}15` }}>
                    <Icon size={28} style={{ color: type.color }} />
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: type.color }}>{type.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{type.subtitle}</p>
                  <p className="text-[10px] text-gray-400 mt-2">{type.description}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen md:ml-[280px]">
      <CustomStyles />
      <FloatingParticles />
      {showConfetti && <Confetti />}

      {/* User Type Selection Popup */}
      <AnimatePresence>
        {showUserTypePopup && (
          <UserTypePopup 
            onSelect={handleUserTypeSelect}
            onClose={handleCloseUserTypePopup}
          />
        )}
      </AnimatePresence>

      {/* FLOATING GAMIFICATION TOAST */}
      <AnimatePresence>
        {gamificationToast && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-4 md:right-8 z-50"
          >
            <div className="glass-card px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-l-4 border-l-downy">
              <Rocket className="text-downy w-5 h-5 animate-bounce" />
              <span className="font-sora text-sm font-bold">{gamificationToast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXIT INTENT POPUP */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-tiber/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowExitPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-tiber transition-colors">
                <X className="w-6 h-6" />
              </button>
              <div className="w-20 h-20 bg-horizon/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-tiber" />
              </div>
              <h3 className="font-sora text-2xl font-bold text-center mb-2">Wait — Find your purpose in 7 days.</h3>
              <p className="text-gray-600 text-center mb-6">Don't leave your freedom to chance. Get our free 7-day clarity roadmap sent straight to your inbox.</p>
              <input type="email" placeholder="Your best email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-downy mb-4" />
              <button onClick={() => setShowExitPopup(false)} className="w-full bg-tiber text-white font-semibold py-3 rounded-xl hover:bg-downy transition-all">
                Send Me The Roadmap
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 lg:px-20 max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12 items-center min-h-[90vh] overflow-hidden">
        {/* Background animated shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-downy/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-horizon/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <motion.div 
          className="md:col-span-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="flex h-2 w-2 rounded-full bg-downy animate-pulse"></span>
            <span className="font-inter text-sm font-semibold text-tiber">🚀 Start in 2 mins • Free Access</span>
          </motion.div>
          
          <motion.h1 
            className="font-sora text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-tiber"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            You weren't meant to <span className="text-horizon relative whitespace-nowrap">
              live on repeat
              <motion.svg 
                className="absolute w-full h-3 -bottom-1 left-0 text-downy opacity-60" 
                viewBox="0 0 100 10" 
                preserveAspectRatio="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
              </motion.svg>
            </span>
          </motion.h1>
          
          <motion.p 
            className="font-inter text-lg text-tiber/70 mb-10 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Break the 9-5 cycle. Build location-independent income. Join a global community of modern explorers redesigning their lives.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button 
              onClick={scrollToOnboarding} 
              className="bg-downy btn-glow text-tiber font-sora font-bold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              onClick={handleVideoPlay} 
              className="bg-transparent border-2 border-tiber text-tiber hover:bg-tiber hover:text-white font-sora font-bold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" /> Watch Video
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="flex gap-6 mt-8 text-sm text-tiber/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-downy" /> No credit card</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-downy" /> 14-day guarantee</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="md:col-span-6 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-tiber/20 to-downy/20 rounded-[32px] z-10"></div>
          <motion.img 
            src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80" 
            alt="Nomad Lifestyle" 
            className="rounded-[32px] w-full h-[500px] object-cover shadow-2xl border-4 border-white/70"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div 
            className="absolute -bottom-6 -left-6 z-20 glass-card p-4 rounded-xl shadow-2xl flex items-center gap-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="bg-downy/20 p-2 rounded-full">
              <TrendingUp className="text-downy w-6 h-6" />
            </div>
            <div>
              <p className="font-inter text-xs text-tiber/60">Average Income Goal</p>
              <p className="font-sora font-bold text-tiber text-xl">$5,000 <span className="text-sm">/ mo</span></p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. IKIGAI CATEGORIES SECTION */}
      <section className="py-16 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-downy" />
            <span className="text-sm font-medium text-tiber">Discover Your Purpose</span>
          </motion.div>
          
          <motion.h2 
            className="font-sora text-4xl font-bold mb-4 bg-gradient-to-r from-tiber to-horizon bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Find Your Ikigai
          </motion.h2>
          
          <motion.p 
            className="font-inter text-tiber/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Embark on a transformative 7-day journey to discover what you love, 
            what you're good at, what the world needs, and what you can be paid for.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-downy" />
              <span>7-Day Structured Journey</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-downy" />
              <span>Personalized Results</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-downy" />
              <span>Visual Ikigai Map</span>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onSelect={handleCategorySelect}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS - IKIGAI SECTION */}
      <section className="py-16 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-sora text-3xl font-bold text-tiber mb-4">How It Works</h2>
          <p className="text-gray-600">A simple, structured journey to discover your Ikigai in 7 days</p>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Choose Path', desc: 'Select your category', icon: Target, color: '#64CDD1' },
            { step: '02', title: 'Answer Questions', desc: '6 days of reflection', icon: Users, color: '#5794A4' },
            { step: '03', title: 'Discover', desc: 'Get your Ikigai map', icon: Globe, color: '#8B5CF6' },
            { step: '04', title: 'Take Action', desc: 'Start your journey', icon: Zap, color: '#F59E0B' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <motion.div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: `${item.color}15` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
              </motion.div>
              <div className="text-2xl font-bold mb-2" style={{ color: item.color }}>{item.step}</div>
              <h3 className="font-semibold text-tiber mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE ONBOARDING */}
      <section id="onboarding" className="py-24 px-6 relative">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-tiber to-horizon bg-clip-text text-transparent">Design Your Escape Plan</h2>
            <p className="font-inter text-tiber/60">Takes less than 60 seconds • Personalized roadmap</p>
          </div>

          <motion.div 
            className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {onboardingStep < 4 && (
                <motion.div 
                  className="mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex justify-between font-inter text-xs font-bold text-tiber/50 mb-2 uppercase tracking-wider">
                    <span>Step {onboardingStep} of 3</span>
                    <span>{Math.round((onboardingStep/3)*100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-tiber/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-downy rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(onboardingStep / 3) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              )}

              {onboardingStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="animate-slide-right"
                >
                  <h3 className="font-sora text-2xl font-bold mb-6 text-center">What's pulling you towards change?</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { id: 'escape', icon: BriefcaseIcon, title: 'Escape 9–5', desc: 'Break the corporate chains', color: '#0A3948' },
                      { id: 'income', icon: DollarSign, title: 'Build Income', desc: 'Create financial freedom', color: '#5794A4' },
                      { id: 'travel', icon: Globe, title: 'Travel Lifestyle', desc: 'Work from anywhere', color: '#64CDD1' }
                    ].map((item, idx) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleOnboardingSelect('pull', item.id)}
                        whileHover={{ y: -5 }}
                        className={`p-6 rounded-2xl border-2 text-left transition-all hover-lift ${onboardingData.pull === item.id ? 'border-downy bg-white shadow-xl scale-105' : 'border-gray-100 bg-white/80 hover:bg-white'}`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4`} style={{ background: `${item.color}15` }}>
                          <item.icon className="w-6 h-6" style={{ color: item.color }} />
                        </div>
                        <h4 className="font-sora font-bold mb-2 text-tiber">{item.title}</h4>
                        <p className="font-inter text-sm text-tiber/60">{item.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {onboardingStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <h3 className="font-sora text-2xl font-bold mb-6 text-center">Where are you starting from?</h3>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    {[
                      { id: 'beginner', title: 'Beginner', desc: 'No online income yet', icon: CoffeeIcon },
                      { id: 'intermediate', title: 'Intermediate', desc: 'Already making some $$ online', icon: Rocket }
                    ].map((item, idx) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleOnboardingSelect('level', item.id)}
                        whileHover={{ y: -5 }}
                        className={`flex-1 p-8 rounded-2xl border-2 text-center transition-all hover-lift ${onboardingData.level === item.id ? 'border-downy bg-white shadow-xl scale-105' : 'border-gray-100 bg-white/80 hover:bg-white'}`}
                      >
                        <item.icon className="w-12 h-12 mx-auto mb-4 text-horizon" />
                        <h4 className="font-sora text-xl font-bold mb-2 text-tiber">{item.title}</h4>
                        <p className="font-inter text-sm text-tiber/60">{item.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {onboardingStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <h3 className="font-sora text-2xl font-bold mb-6 text-center">How fast do you want to transform?</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { id: '7', title: '7 Days', badge: 'Clarity Seeker', color: '#64CDD1', available: true },
                      { id: '30', title: '30 Days', badge: 'Income Builder', color: '#5794A4', available: false, locked: true },
                      { id: '60', title: '60 Days', badge: 'Nomad Starter', color: '#0A3948', available: false, locked: true }
                    ].map((item, idx) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => item.available && handleOnboardingSelect('speed', item.id)}
                        whileHover={item.available ? { y: -5 } : {}}
                        className={`p-6 rounded-2xl border-2 text-center transition-all hover-lift relative overflow-hidden ${onboardingData.speed === item.id ? 'border-downy shadow-xl scale-105' : 'border-gray-100 bg-white/80'} ${!item.available ? 'cursor-not-allowed opacity-60' : 'hover:bg-white'}`}
                        style={{ background: onboardingData.speed === item.id ? item.color : 'transparent' }}
                        disabled={!item.available}
                      >
                        {item.locked && (
                          <div className="absolute top-2 right-2">
                            <LockIcon size={16} className="text-gray-400" />
                          </div>
                        )}
                        {onboardingData.speed === item.id && <div className="absolute inset-0 bg-white/10 animate-pulse"></div>}
                        <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${onboardingData.speed === item.id ? 'text-white' : 'text-horizon'}`}>
                          {item.badge}
                        </span>
                        <h4 className="font-sora text-2xl font-bold" style={{ color: onboardingData.speed === item.id ? 'white' : item.color }}>
                          {item.title}
                        </h4>
                        {!item.available && (
                          <span className="text-xs text-gray-400 mt-2 block">Complete 7-Day Challenge to Unlock</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {onboardingStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div 
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="font-sora text-3xl font-bold mb-2">Your Path is Ready! 🎉</h3>
                  <p className="font-inter text-tiber/60 mb-8">Based on your goals, we've built the perfect roadmap for you.</p>
                  
                  <div className="bg-gradient-to-r from-tiber/5 to-downy/5 rounded-2xl p-6 border border-downy/30 shadow-xl mb-8 text-left flex items-start gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-md"><Compass className="w-8 h-8 text-downy" /></div>
                    <div>
                      <h4 className="font-sora font-bold text-xl mb-1">{onboardingData.speed === '7' ? 'The Clarity Blueprint' : 'Your Custom Path'}</h4>
                      <p className="font-inter text-sm text-tiber/70 mb-3">Tailored for {onboardingData.level}s looking to {onboardingData.pull === 'escape' ? 'quit their jobs' : onboardingData.pull === 'income' ? 'scale their income' : 'travel the world'}.</p>
                      <ul className="space-y-2"><li className="flex items-center gap-2 text-sm font-inter"><CheckCircle className="w-4 h-4 text-downy"/> Step-by-step action plan</li><li className="flex items-center gap-2 text-sm font-inter"><CheckCircle className="w-4 h-4 text-downy"/> 1-on-1 advisor matching</li><li className="flex items-center gap-2 text-sm font-inter"><CheckCircle className="w-4 h-4 text-downy"/> Community access</li></ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      onClick={goToSevendays}
                      className="bg-tiber text-white font-sora font-bold px-8 py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-downy transition-all btn-glow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start My Challenge <Rocket className="w-5 h-5" />
                    </motion.button>

                    <button
                      onClick={resetOnboarding}
                      className="text-tiber/60 font-inter text-sm underline hover:text-tiber"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 5. PROGRAMS SHOWCASE */}
      <section id="programs" className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sora text-4xl font-bold mb-4 bg-gradient-to-r from-tiber to-horizon bg-clip-text text-transparent">Choose Your Transformation</h2>
          <p className="font-inter text-tiber/60 max-w-2xl mx-auto">Structured paths designed to get you from stuck to completely free.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Nomad Starter Kit', duration: '7 Days', desc: 'Find your profitable skill and map your exit strategy.', outcome: 'Crystal clear clarity.', icon: MapPin, color: '#64CDD1', locked: false, link: 'sevendays' },
            { title: 'Income Engine', duration: '30 Days', desc: 'Land your first online client or launch your digital product.', outcome: 'First $1k online.', icon: DollarSign, color: '#5794A4', locked: true, message: 'Complete 7-Day Challenge first' },
            { title: 'Freedom Mastermind', duration: '60 Days', desc: 'Scale to consistent 5k/mo and optimize taxes & travel.', outcome: 'Full independence.', icon: Globe, color: '#0A3948', locked: true, message: 'Complete 7-Day Challenge first' }
          ].map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card p-8 rounded-2xl transition-all hover:shadow-2xl relative"
            >
              {prog.locked && (
                <div className="absolute top-4 right-4">
                  <LockIcon size={20} className="text-gray-400" />
                </div>
              )}
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: `${prog.color}15` }}>
                <prog.icon className="w-8 h-8" style={{ color: prog.color }} />
              </div>
              <div className="text-xs font-bold text-downy mb-2 uppercase tracking-wider">{prog.duration}</div>
              <h3 className="font-sora text-2xl font-bold mb-3">{prog.title}</h3>
              <p className="font-inter text-tiber/70 mb-6 h-16">{prog.desc}</p>
              <div className="bg-powder/50 px-4 py-3 rounded-xl mb-8">
                <span className="font-inter text-sm font-bold block mb-1">Outcome:</span>
                <span className="font-sora text-tiber font-semibold">{prog.outcome}</span>
              </div>
              <button 
                className={`w-full border-2 border-tiber font-sora font-bold py-3 rounded-xl transition-all ${prog.locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-tiber hover:text-white'}`}
                style={{ color: prog.locked ? '#94a3b8' : 'var(--tiber)' }}
                onClick={() => !prog.locked && navigate(`/${prog.link}`)}
                disabled={prog.locked}
              >
                {prog.locked ? `🔒 ${prog.message}` : 'View Program'}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. STORY SECTION */}
      <section className="bg-tiber text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-horizon/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-downy/10 rounded-full blur-[120px]"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="max-w-3xl">
            <div className="reveal mb-16">
              <span className="text-horizon font-inter font-bold tracking-wider uppercase text-sm mb-4 block">The Problem</span>
              <h2 className="font-sora text-4xl md:text-5xl font-bold leading-tight mb-6">You did everything "right", but it feels completely wrong.</h2>
              <p className="font-inter text-lg text-white/80">You got the degree, landed the job, and climbed the ladder. But sitting in traffic for 2 hours a day to sit in a cubicle for 8 hours isn't the life you imagined.</p>
            </div>
            <div className="w-px h-24 bg-gradient-to-b from-white/30 to-transparent ml-6 reveal"></div>
            <div className="reveal my-16 pl-12 border-l border-horizon/40 relative">
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-horizon flex items-center justify-center"><Shield className="w-4 h-4 text-tiber" /></div>
              <span className="text-downy font-inter font-bold tracking-wider uppercase text-sm mb-4 block">The Guide</span>
              <h3 className="font-sora text-3xl font-bold mb-4">Enter Nomads Advisors.</h3>
              <p className="font-inter text-white/80">We're a collective of people who already broke the matrix. We don't just sell courses; we build personalized bridges from your current reality to true location independence.</p>
            </div>
            <div className="w-px h-24 bg-gradient-to-b from-white/30 to-transparent ml-6 reveal"></div>
            <div className="reveal mt-16 pl-12 border-l border-downy/40 relative">
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-downy flex items-center justify-center"><Zap className="w-4 h-4 text-tiber" /></div>
              <span className="text-downy font-inter font-bold tracking-wider uppercase text-sm mb-4 block">The Vision</span>
              <h3 className="font-sora text-3xl font-bold mb-4">Imagine waking up anywhere.</h3>
              <p className="font-inter text-white/80 mb-8">Your laptop is your office. Your schedule is your own. You dictate your income, not a boss. This isn't a pipe dream—it's a structured, achievable reality.</p>
              <button onClick={scrollToOnboarding} className="bg-downy text-tiber font-sora font-bold px-8 py-4 rounded-xl hover:bg-white transition-all hover:scale-105">Claim Your Freedom</button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS SECTION (Original) */}
      <section className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto text-center">
        <h2 className="font-sora text-4xl font-bold mb-16 bg-gradient-to-r from-tiber to-horizon bg-clip-text text-transparent">How It Actually Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-powder via-downy to-powder z-0"></div>
          {[
            { step: '01', title: 'Discover', desc: 'Identify your transferable skills and build a high-demand freelance or creator offer.', icon: Target, color: '#64CDD1' },
            { step: '02', title: 'Build', desc: 'Set up your client acquisition systems and secure your first location-independent income.', icon: Rocket, color: '#5794A4' },
            { step: '03', title: 'Live', desc: 'Pack your bags, manage taxes globally, and join the community worldwide.', icon: Globe, color: '#0A3948' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center max-w-sm"
            >
              <motion.div 
                className="w-28 h-28 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-powder mb-6 relative hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <item.icon className="w-12 h-12" style={{ color: item.color }} />
                <div className="absolute -top-2 -right-2 bg-downy text-tiber text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">{item.step}</div>
              </motion.div>
              <h3 className="font-sora text-2xl font-bold mb-3">{item.title}</h3>
              <p className="font-inter text-tiber/60 text-center">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. SOCIAL PROOF CAROUSEL */}
      <section className="py-24 px-6 overflow-hidden bg-white/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-sora text-4xl font-bold mb-4 bg-gradient-to-r from-tiber to-horizon bg-clip-text text-transparent">Proof It Works</h2>
              <div className="flex gap-8">
                <div>
                  <span className="block text-3xl font-extrabold text-horizon">1,000+</span>
                  <span className="text-sm text-tiber/50">Lives Changed</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-horizon">$5M+</span>
                  <span className="text-sm text-tiber/50">Income Generated</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0">
              <button onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)} className="w-12 h-12 rounded-full border-2 border-tiber flex items-center justify-center hover:bg-tiber hover:text-white transition-colors"><ChevronRight className="w-6 h-6 rotate-180" /></button>
              <button onClick={() => setActiveTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)} className="w-12 h-12 rounded-full border-2 border-tiber flex items-center justify-center hover:bg-tiber hover:text-white transition-colors"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>
          <div className="relative h-[320px] md:h-[280px] w-full max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} isActive={i === activeTestimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. COMMUNITY SECTION WITH 5 SLIDING PHOTOS */}
      <section id="community" className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 md:order-1 relative">
            <div className="glass-card rounded-3xl border-[6px] border-white shadow-2xl overflow-hidden max-w-sm mx-auto transform -rotate-2 hover:rotate-0 transition-all duration-500">
              <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white p-4 flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <div><h4 className="font-bold font-sora text-sm">Nomad Nexus Hub</h4><p className="text-[10px] opacity-80">1,204 members, 145 online</p></div>
              </div>
              <div className="bg-[#E5DDD5] p-4 space-y-4 h-[350px] overflow-hidden relative">
                <div className="bg-[#DCF8C6] p-3 rounded-2xl rounded-tr-none ml-auto w-[85%] shadow-sm relative animate-slide-right" style={{animationDelay:'0.2s'}}><p className="text-sm text-gray-800">Just landed in Lisbon! Anyone around for coffee tomorrow? 🇵🇹☕️</p><span className="text-[10px] text-gray-500 absolute bottom-1 right-2">10:42 AM</span></div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none mr-auto w-[85%] shadow-sm relative animate-slide-right" style={{animationDelay:'0.8s'}}><p className="text-sm text-gray-800 font-semibold text-[#34B7F1]">Alex (Advisor)</p><p className="text-sm text-gray-800">Welcome! Check the #meetups pin, there's a co-working group meeting at LX Factory at 10am!</p><span className="text-[10px] text-gray-500 absolute bottom-1 right-2">10:45 AM</span></div>
                <div className="bg-[#DCF8C6] p-3 rounded-2xl rounded-tr-none ml-auto w-[80%] shadow-sm relative animate-slide-right" style={{animationDelay:'1.5s'}}><p className="text-sm text-gray-800">Also guys, just closed my first $3k retainer client!!! 🎉</p><span className="text-[10px] text-gray-500 absolute bottom-1 right-2">10:48 AM</span></div>
              </div>
            </div>
            <div className="absolute -z-10 top-10 -left-10 w-32 h-32 bg-downy/20 rounded-full blur-2xl"></div>
            <div className="absolute -z-10 bottom-10 -right-10 w-32 h-32 bg-horizon/20 rounded-full blur-2xl"></div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 shadow-sm"><MessageCircle className="w-4 h-4 text-downy" /><span className="font-inter text-sm font-semibold text-tiber">Nomad Nexus</span></div>
            <h2 className="font-sora text-4xl md:text-5xl font-bold mb-6">You're never alone on this journey.</h2>
            <p className="font-inter text-lg text-tiber/70 mb-8 leading-relaxed">Gain instant access to our private WhatsApp community. Find accountability partners, share wins, troubleshoot client issues, and join local meetups anywhere in the world.</p>
            <ul className="space-y-4 mb-10"><li className="flex items-center gap-3"><CheckCircle className="text-downy w-6 h-6" /> <span className="font-sora font-semibold">Weekly Live Q&A Calls</span></li><li className="flex items-center gap-3"><CheckCircle className="text-downy w-6 h-6" /> <span className="font-sora font-semibold">City-Specific Subgroups</span></li><li className="flex items-center gap-3"><CheckCircle className="text-downy w-6 h-6" /> <span className="font-sora font-semibold">Expert Deal Reviews</span></li></ul>
            <button className="bg-transparent border-2 border-tiber text-tiber font-sora font-bold px-8 py-4 rounded-xl hover:bg-tiber hover:text-white transition-all flex items-center gap-2 hover:scale-105">Explore Community <ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>

        {/* 5 Sliding Photos Section */}
        <div className="mt-8 pt-8">
          <div className="text-center mb-12">
            <h3 className="font-sora text-3xl font-bold text-tiber mb-2">Our Global Community in Action</h3>
            <p className="text-horizon">See what our members are doing around the world</p>
          </div>
          <div className="glass-card p-6 rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-semibold text-tiber text-lg">🌍 Community Moments</h4>
              <button onClick={toggleAutoPlay} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105">
                {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span className="text-sm font-medium">{isAutoPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
            <div className="relative group">
              <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                <ChevronLeft size={24} className="text-tiber" />
              </button>
              <div className="overflow-hidden rounded-2xl">
                <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {communityImages.map((img) => (
                    <div key={img.id} className="w-full flex-shrink-0 relative">
                      <img 
                        src={getImageSrc(img)} 
                        alt={img.title} 
                        className="w-full h-[450px] object-cover rounded-2xl"
                        onError={() => setImageErrors(prev => ({ ...prev, [img.id]: true }))}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl">
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                            <MapPin size={14} className="text-white" />
                            <span className="text-white text-sm">{img.location}</span>
                          </div>
                          <h4 className="text-white font-bold text-2xl">{img.title}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                <ChevronRight size={24} className="text-tiber" />
              </button>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              {communityImages.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => goToSlide(idx)} 
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-downy' : 'w-2 bg-horizon/30 hover:bg-horizon/60'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-tiber to-horizon z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-downy/20 rounded-full blur-[120px] z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h2 
            className="font-sora text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            A year from now, you'll wish you started <span className="text-downy">today.</span>
          </motion.h2>
          <motion.p 
            className="font-inter text-xl text-white/80 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            The time will pass anyway. You can either be sitting in the same chair, or sitting on a beach designing your own day.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button 
              onClick={scrollToOnboarding} 
              className="bg-downy text-tiber font-sora text-xl font-bold px-10 py-5 rounded-2xl shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1 btn-glow flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
          <motion.p 
            className="mt-8 font-inter text-sm text-white/60 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Shield className="w-4 h-4" /> 14-Day Money Back Guarantee • Cancel Anytime
          </motion.p>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-white py-16 px-6 lg:px-20 border-t border-tiber/10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="text-tiber w-8 h-8" />
              <span className="font-sora font-extrabold text-xl text-tiber">NOMADS<span className="text-horizon">ADVISORS</span></span>
            </div>
            <p className="font-inter text-sm text-tiber/60 mb-6 leading-relaxed">Empowering the next generation of digital nomads to build freedom-first lifestyles.</p>
            <div className="flex gap-4">
              <a href="#" className="text-tiber/40 hover:text-downy transition-colors">📘</a>
              <a href="#" className="text-tiber/40 hover:text-downy transition-colors">🐦</a>
              <a href="#" className="text-tiber/40 hover:text-downy transition-colors">📷</a>
              <a href="#" className="text-tiber/40 hover:text-downy transition-colors">💼</a>
            </div>
          </div>
          <div><h4 className="font-sora font-bold text-tiber mb-4">About</h4><ul className="space-y-3 font-inter text-sm text-tiber/60"><li><a href="#" className="hover:text-downy transition-colors">Our Story</a></li><li><a href="#" className="hover:text-downy transition-colors">Advisors</a></li><li><a href="#" className="hover:text-downy transition-colors">Careers</a></li></ul></div>
          <div><h4 className="font-sora font-bold text-tiber mb-4">Programs</h4><ul className="space-y-3 font-inter text-sm text-tiber/60"><li><a href="#" className="hover:text-downy transition-colors">7-Day Starter</a></li><li><a href="#" className="hover:text-downy transition-colors">Income Engine</a></li><li><a href="#" className="hover:text-downy transition-colors">Freedom Mastermind</a></li></ul></div>
          <div><h4 className="font-sora font-bold text-tiber mb-4">Contact</h4><ul className="space-y-3 font-inter text-sm text-tiber/60"><li><a href="#" className="hover:text-downy transition-colors">Support</a></li><li><a href="#" className="hover:text-downy transition-colors">Community Hub</a></li><li><a href="#" className="hover:text-downy transition-colors">hello@nomadsadvisors.com</a></li></ul></div>
        </div>
        <div className="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-tiber/10 flex flex-col md:flex-row justify-between items-center font-inter text-xs text-tiber/40">
          <p>© 2026 Nomads Advisors. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0"><a href="#" className="hover:text-tiber transition-colors">Privacy Policy</a><a href="#" className="hover:text-tiber transition-colors">Terms of Service</a><a href="#" className="hover:text-tiber transition-colors">Cookie Policy</a></div>
        </div>
      </footer>
    </div>
  );
}