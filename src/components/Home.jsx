import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Compass, DollarSign, Globe, Play, ChevronRight, 
  CheckCircle, Star, MessageCircle, X, MapPin, Briefcase, 
  TrendingUp, Rocket, Users, Shield, Zap, Target,
  ChevronLeft, Pause, Award, Heart, Coffee
} from 'lucide-react';

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
  `}} />
);

// --- HELPER COMPONENTS ---

const Confetti = () => {
  const colors = ['#0A3948', '#5794A4', '#64CDD1', '#FFFFFF', '#FFD700'];
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece w-2 h-2 absolute"
          style={{
            left: `${Math.random() * 100}vw`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 0.5}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`
          }}
        />
      ))}
    </div>
  );
};

// --- MAIN APPLICATION ---

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({ pull: '', level: '', speed: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const [gamificationToast, setGamificationToast] = useState('');
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Community images with your IMPORTED JPEG files
  const communityImages = [
    { id: 1, src: photo1, fallback: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop", title: "Global Community Meetup", location: "Bali, Indonesia" },
    { id: 2, src: photo2, fallback: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop", title: "Coworking Session", location: "Lisbon, Portugal" },
    { id: 3, src: photo3, fallback: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=500&fit=crop", title: "Networking Night", location: "Bangkok, Thailand" },
    { id: 4, src: photo4, fallback: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop", title: "Skill Building Workshop", location: "Medellín, Colombia" },
    { id: 5, src: photo5, fallback: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&fit=crop", title: "Beach Coworking Day", location: "Chiang Mai, Thailand" }
  ];

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

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

  // --- HOOKS ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    const handleMouseLeave = (e) => {
      if (e.clientY < 0 && !hasShownExitPopup) {
        setShowExitPopup(true);
        setHasShownExitPopup(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      observer.disconnect();
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShownExitPopup]);

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
      }
    }, 400);
  };

  const resetOnboarding = () => {
    setOnboardingStep(1);
    setOnboardingData({ pull: '', level: '', speed: '' });
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

  // --- MOCK DATA ---
  const testimonials = [
    { name: "Sarah Johnson", role: "Former Accountant", before: "Burned out in cubicle", after: "Living in Bali, $8k/mo", quote: "Nomads Advisors didn't just give me a course, they gave me a completely new trajectory for my life. Best decision I ever made!" },
    { name: "Marcus Chen", role: "Freelance Designer", before: "Struggling for clients", after: "Running a 6-figure agency", quote: "The 30-day challenge completely rewired how I approach income generation and travel. I've now visited 15 countries while working!" },
    { name: "Elena Rodriguez", role: "Digital Nomad", before: "Dreaming of travel", after: "Visited 12 countries this year", quote: "Finally, a roadmap that cuts the BS. I packed my bags exactly 60 days after starting. Best decision of my life!" }
  ];

  return (
    <div className="relative min-h-screen ml-[280px]">
      <CustomStyles />
      {showConfetti && <Confetti />}

      {/* FLOATING GAMIFICATION TOAST */}
      <div className={`fixed top-24 right-4 md:right-8 z-50 transition-all duration-500 transform ${gamificationToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="glass-card px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-l-4 border-l-downy">
          <Rocket className="text-downy w-5 h-5 animate-bounce" />
          <span className="font-sora text-sm font-bold">{gamificationToast}</span>
        </div>
      </div>

      {/* EXIT INTENT POPUP */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[100] bg-tiber/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowExitPopup(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
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
          </div>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 px-6 lg:px-20 max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12 items-center min-h-[90vh]">
        <div className="md:col-span-6 reveal">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-downy animate-pulse"></span>
            <span className="font-inter text-sm font-semibold text-tiber">🚀 Start in 2 mins • Free Access</span>
          </div>
          <h1 className="font-sora text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-tiber">
            You weren't meant to <span className="text-horizon relative whitespace-nowrap">
              live on repeat
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-downy opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
            </span>
          </h1>
          <p className="font-inter text-lg text-tiber/70 mb-10 max-w-lg leading-relaxed">
            Break the 9-5 cycle. Build location-independent income. Join a global community of modern explorers redesigning their lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => document.getElementById('onboarding').scrollIntoView({behavior:'smooth'})} className="bg-downy btn-glow text-tiber font-sora font-bold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg">
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-transparent border-2 border-tiber text-tiber hover:bg-tiber hover:text-white font-sora font-bold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105">
              <Play className="w-5 h-5" /> Watch Video
            </button>
          </div>
          <div className="flex gap-6 mt-8 text-sm text-tiber/50">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-downy" /> No credit card</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-downy" /> 14-day guarantee</span>
          </div>
        </div>
        
        <div className="md:col-span-6 relative reveal animate-float">
          <div className="absolute inset-0 bg-gradient-to-tr from-tiber/20 to-downy/20 rounded-[32px] z-10"></div>
          <img src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80" alt="Nomad Lifestyle" className="rounded-[32px] w-full h-[500px] object-cover shadow-2xl border-4 border-white/70" />
          
          <div className="absolute -bottom-6 -left-6 z-20 glass-card p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce" style={{animationDuration: '4s'}}>
            <div className="bg-downy/20 p-2 rounded-full">
              <TrendingUp className="text-downy w-6 h-6" />
            </div>
            <div>
              <p className="font-inter text-xs text-tiber/60">Average Income Goal</p>
              <p className="font-sora font-bold text-tiber text-xl">$5,000 <span className="text-sm">/ mo</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE ONBOARDING */}
      <section id="onboarding" className="py-24 px-6 relative">
        <div className="max-w-[800px] mx-auto reveal">
          <div className="text-center mb-10">
            <h2 className="font-sora text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-tiber to-horizon bg-clip-text text-transparent">Design Your Escape Plan</h2>
            <p className="font-inter text-tiber/60">Takes less than 60 seconds • Personalized roadmap</p>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {onboardingStep < 4 && (
              <div className="mb-10">
                <div className="flex justify-between font-inter text-xs font-bold text-tiber/50 mb-2 uppercase tracking-wider">
                  <span>Step {onboardingStep} of 3</span>
                  <span>{Math.round((onboardingStep/3)*100)}%</span>
                </div>
                <div className="h-2 w-full bg-tiber/10 rounded-full overflow-hidden">
                  <div className="h-full bg-downy transition-all duration-700 ease-out rounded-full" style={{ width: `${(onboardingStep / 3) * 100}%` }}></div>
                </div>
              </div>
            )}

            {onboardingStep === 1 && (
              <div className="animate-slide-right">
                <h3 className="font-sora text-2xl font-bold mb-6 text-center">What's pulling you towards change?</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { id: 'escape', icon: Briefcase, title: 'Escape 9–5', desc: 'Break the corporate chains', color: '#0A3948' },
                    { id: 'income', icon: DollarSign, title: 'Build Income', desc: 'Create financial freedom', color: '#5794A4' },
                    { id: 'travel', icon: Globe, title: 'Travel Lifestyle', desc: 'Work from anywhere', color: '#64CDD1' }
                  ].map(item => (
                    <button key={item.id} onClick={() => handleOnboardingSelect('pull', item.id)} className={`p-6 rounded-2xl border-2 text-left transition-all hover-lift ${onboardingData.pull === item.id ? 'border-downy bg-white shadow-xl scale-105' : 'border-gray-100 bg-white/80 hover:bg-white'}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4`} style={{ background: `${item.color}15` }}>
                        <item.icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <h4 className="font-sora font-bold mb-2 text-tiber">{item.title}</h4>
                      <p className="font-inter text-sm text-tiber/60">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="animate-slide-right">
                <h3 className="font-sora text-2xl font-bold mb-6 text-center">Where are you starting from?</h3>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  {[
                    { id: 'beginner', title: 'Beginner', desc: 'No online income yet', icon: Coffee },
                    { id: 'intermediate', title: 'Intermediate', desc: 'Already making some $$ online', icon: Rocket }
                  ].map(item => (
                    <button key={item.id} onClick={() => handleOnboardingSelect('level', item.id)} className={`flex-1 p-8 rounded-2xl border-2 text-center transition-all hover-lift ${onboardingData.level === item.id ? 'border-downy bg-white shadow-xl scale-105' : 'border-gray-100 bg-white/80 hover:bg-white'}`}>
                      <item.icon className="w-12 h-12 mx-auto mb-4 text-horizon" />
                      <h4 className="font-sora text-xl font-bold mb-2 text-tiber">{item.title}</h4>
                      <p className="font-inter text-sm text-tiber/60">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="animate-slide-right">
                <h3 className="font-sora text-2xl font-bold mb-6 text-center">How fast do you want to transform?</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { id: '7', title: '7 Days', badge: 'Clarity Seeker', color: '#64CDD1' },
                    { id: '30', title: '30 Days', badge: 'Income Builder', color: '#5794A4' },
                    { id: '60', title: '60 Days', badge: 'Nomad Starter', color: '#0A3948' }
                  ].map(item => (
                    <button key={item.id} onClick={() => handleOnboardingSelect('speed', item.id)} className={`p-6 rounded-2xl border-2 text-center transition-all hover-lift relative overflow-hidden ${onboardingData.speed === item.id ? 'border-downy shadow-xl scale-105' : 'border-gray-100 bg-white/80 hover:bg-white'}`} style={{ background: onboardingData.speed === item.id ? item.color : 'transparent' }}>
                      {onboardingData.speed === item.id && <div className="absolute inset-0 bg-white/10 animate-pulse"></div>}
                      <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${onboardingData.speed === item.id ? 'text-white' : 'text-horizon'}`}>{item.badge}</span>
                      <h4 className="font-sora text-2xl font-bold" style={{ color: onboardingData.speed === item.id ? 'white' : item.color }}>{item.title}</h4>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {onboardingStep === 4 && (
              <div className="text-center animate-slide-right">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-sora text-3xl font-bold mb-2">Your Path is Ready! 🎉</h3>
                <p className="font-inter text-tiber/60 mb-8">Based on your goals, we've built the perfect roadmap for you.</p>
                
                <div className="bg-gradient-to-r from-tiber/5 to-downy/5 rounded-2xl p-6 border border-downy/30 shadow-xl mb-8 text-left flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-md"><Compass className="w-8 h-8 text-downy" /></div>
                  <div>
                    <h4 className="font-sora font-bold text-xl mb-1">{onboardingData.speed === '7' ? 'The Clarity Blueprint' : onboardingData.speed === '30' ? 'The 30-Day Income Engine' : 'The Full Nomad Transition'}</h4>
                    <p className="font-inter text-sm text-tiber/70 mb-3">Tailored for {onboardingData.level}s looking to {onboardingData.pull === 'escape' ? 'quit their jobs' : onboardingData.pull === 'income' ? 'scale their income' : 'travel the world'}.</p>
                    <ul className="space-y-2"><li className="flex items-center gap-2 text-sm font-inter"><CheckCircle className="w-4 h-4 text-downy"/> Step-by-step action plan</li><li className="flex items-center gap-2 text-sm font-inter"><CheckCircle className="w-4 h-4 text-downy"/> 1-on-1 advisor matching</li><li className="flex items-center gap-2 text-sm font-inter"><CheckCircle className="w-4 h-4 text-downy"/> Community access</li></ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
  <button
    onClick={() => navigate("/sevendays")}
    className="bg-tiber text-white font-sora font-bold px-8 py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-downy transition-all btn-glow"
  >
    Start My Challenge <Rocket className="w-5 h-5" />
  </button>

  <button
    onClick={resetOnboarding}
    className="text-tiber/60 font-inter text-sm underline hover:text-tiber"
  >
    Retake Quiz
  </button>
</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. PROGRAMS SHOWCASE */}
      <section id="programs" className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="font-sora text-4xl font-bold mb-4 bg-gradient-to-r from-tiber to-horizon bg-clip-text text-transparent">Choose Your Transformation</h2>
          <p className="font-inter text-tiber/60 max-w-2xl mx-auto">Structured paths designed to get you from stuck to completely free.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Nomad Starter Kit', duration: '7 Days', desc: 'Find your profitable skill and map your exit strategy.', outcome: 'Crystal clear clarity.', icon: MapPin, color: '#64CDD1' },
            { title: 'Income Engine', duration: '30 Days', desc: 'Land your first online client or launch your digital product.', outcome: 'First $1k online.', icon: DollarSign, color: '#5794A4' },
            { title: 'Freedom Mastermind', duration: '60 Days', desc: 'Scale to consistent 5k/mo and optimize taxes & travel.', outcome: 'Full independence.', icon: Globe, color: '#0A3948' }
          ].map((prog, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl hover-lift reveal transition-all hover:shadow-2xl" style={{transitionDelay: `${i * 100}ms`}}>
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
              <button className="w-full border-2 border-tiber text-tiber font-sora font-bold py-3 rounded-xl hover:bg-tiber hover:text-white transition-all">View Program</button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STORY SECTION */}
      <section id="story" className="bg-tiber text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-horizon/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-downy/10 rounded-full blur-[120px]"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="max-w-3xl">
            <div className="reveal mb-16"><span className="text-horizon font-inter font-bold tracking-wider uppercase text-sm mb-4 block">The Problem</span><h2 className="font-sora text-4xl md:text-5xl font-bold leading-tight mb-6">You did everything "right", but it feels completely wrong.</h2><p className="font-inter text-lg text-white/80">You got the degree, landed the job, and climbed the ladder. But sitting in traffic for 2 hours a day to sit in a cubicle for 8 hours isn't the life you imagined.</p></div>
            <div className="w-px h-24 bg-gradient-to-b from-white/30 to-transparent ml-6 reveal"></div>
            <div className="reveal my-16 pl-12 border-l border-horizon/40 relative"><div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-horizon flex items-center justify-center"><Shield className="w-4 h-4 text-tiber" /></div><span className="text-downy font-inter font-bold tracking-wider uppercase text-sm mb-4 block">The Guide</span><h3 className="font-sora text-3xl font-bold mb-4">Enter Nomads Advisors.</h3><p className="font-inter text-white/80">We're a collective of people who already broke the matrix. We don't just sell courses; we build personalized bridges from your current reality to true location independence.</p></div>
            <div className="w-px h-24 bg-gradient-to-b from-white/30 to-transparent ml-6 reveal"></div>
            <div className="reveal mt-16 pl-12 border-l border-downy/40 relative"><div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-downy flex items-center justify-center"><Zap className="w-4 h-4 text-tiber" /></div><span className="text-downy font-inter font-bold tracking-wider uppercase text-sm mb-4 block">The Vision</span><h3 className="font-sora text-3xl font-bold mb-4">Imagine waking up anywhere.</h3><p className="font-inter text-white/80 mb-8">Your laptop is your office. Your schedule is your own. You dictate your income, not a boss. This isn't a pipe dream—it's a structured, achievable reality.</p><button onClick={() => document.getElementById('onboarding').scrollIntoView({behavior:'smooth'})} className="bg-downy text-tiber font-sora font-bold px-8 py-4 rounded-xl hover:bg-white transition-all hover:scale-105">Claim Your Freedom</button></div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto text-center">
        <h2 className="font-sora text-4xl font-bold mb-16 reveal bg-gradient-to-r from-tiber to-horizon bg-clip-text text-transparent">How It Actually Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 relative reveal">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-powder via-downy to-powder z-0"></div>
          {[
            { step: '01', title: 'Discover', desc: 'Identify your transferable skills and build a high-demand freelance or creator offer.', icon: Target, color: '#64CDD1' },
            { step: '02', title: 'Build', desc: 'Set up your client acquisition systems and secure your first location-independent income.', icon: Rocket, color: '#5794A4' },
            { step: '03', title: 'Live', desc: 'Pack your bags, manage taxes globally, and join the community worldwide.', icon: Globe, color: '#0A3948' }
          ].map((item, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center max-w-sm">
              <div className="w-28 h-28 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-powder mb-6 relative hover:scale-110 transition-transform">
                <item.icon className="w-12 h-12" style={{ color: item.color }} />
                <div className="absolute -top-2 -right-2 bg-downy text-tiber text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">{item.step}</div>
              </div>
              <h3 className="font-sora text-2xl font-bold mb-3">{item.title}</h3>
              <p className="font-inter text-tiber/60 text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SOCIAL PROOF CAROUSEL */}
      <section className="py-24 px-6 overflow-hidden bg-white/30">
        <div className="max-w-[1440px] mx-auto reveal">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div><h2 className="font-sora text-4xl font-bold mb-4 bg-gradient-to-r from-tiber to-horizon bg-clip-text text-transparent">Proof It Works</h2><div className="flex gap-8"><div><span className="block text-3xl font-extrabold text-horizon">1,000+</span><span className="text-sm text-tiber/50">Lives Changed</span></div><div><span className="block text-3xl font-extrabold text-horizon">$5M+</span><span className="text-sm text-tiber/50">Income Generated</span></div></div></div>
            <div className="flex gap-4 mt-6 md:mt-0">
              <button onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)} className="w-12 h-12 rounded-full border-2 border-tiber flex items-center justify-center hover:bg-tiber hover:text-white transition-colors"><ChevronRight className="w-6 h-6 rotate-180" /></button>
              <button onClick={() => setActiveTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)} className="w-12 h-12 rounded-full border-2 border-tiber flex items-center justify-center hover:bg-tiber hover:text-white transition-colors"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>
          <div className="relative h-[320px] md:h-[280px] w-full max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className={`absolute inset-0 glass-card p-8 md:p-10 rounded-2xl transition-all duration-500 transform ${i === activeTestimonial ? 'opacity-100 translate-x-0 scale-100 z-10 shadow-2xl' : 'opacity-0 translate-x-20 scale-95 z-0'}`}>
                <div className="flex gap-1 mb-6"><Star className="w-5 h-5 fill-current text-yellow-400" /><Star className="w-5 h-5 fill-current text-yellow-400" /><Star className="w-5 h-5 fill-current text-yellow-400" /><Star className="w-5 h-5 fill-current text-yellow-400" /><Star className="w-5 h-5 fill-current text-yellow-400" /></div>
                <p className="font-sora text-xl md:text-2xl font-bold mb-8 text-tiber/80 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-horizon/20 rounded-full flex items-center justify-center text-tiber font-bold text-xl">{t.name[0]}</div>
                  <div><h4 className="font-bold font-sora text-tiber">{t.name} <span className="font-normal text-sm text-tiber/50">| {t.role}</span></h4><p className="font-inter text-xs text-tiber/50 mt-1"><span className="line-through mr-2">Before: {t.before}</span><span className="text-horizon font-semibold">After: {t.after}</span></p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMMUNITY SECTION WITH 5 SLIDING PHOTOS */}
      <section id="community" className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="reveal order-2 md:order-1 relative">
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
          
          <div className="reveal order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 shadow-sm"><MessageCircle className="w-4 h-4 text-downy" /><span className="font-inter text-sm font-semibold text-tiber">Nomad Nexus</span></div>
            <h2 className="font-sora text-4xl md:text-5xl font-bold mb-6">You're never alone on this journey.</h2>
            <p className="font-inter text-lg text-tiber/70 mb-8 leading-relaxed">Gain instant access to our private WhatsApp community. Find accountability partners, share wins, troubleshoot client issues, and join local meetups anywhere in the world.</p>
            <ul className="space-y-4 mb-10"><li className="flex items-center gap-3"><CheckCircle className="text-downy w-6 h-6" /> <span className="font-sora font-semibold">Weekly Live Q&A Calls</span></li><li className="flex items-center gap-3"><CheckCircle className="text-downy w-6 h-6" /> <span className="font-sora font-semibold">City-Specific Subgroups</span></li><li className="flex items-center gap-3"><CheckCircle className="text-downy w-6 h-6" /> <span className="font-sora font-semibold">Expert Deal Reviews</span></li></ul>
            <button className="bg-transparent border-2 border-tiber text-tiber font-sora font-bold px-8 py-4 rounded-xl hover:bg-tiber hover:text-white transition-all flex items-center gap-2 hover:scale-105">Explore Community <ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>

        {/* 5 Sliding Photos Section - Using Imported Images */}
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
                        src={img.src} 
                        alt={img.title} 
                        className="w-full h-[450px] object-cover rounded-2xl"
                        onError={(e) => {
                          console.log(`Failed to load image ${img.id}, using fallback`);
                          e.target.onerror = null;
                          e.target.src = img.fallback;
                        }}
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

      {/* 8. FINAL CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-tiber to-horizon z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-downy/20 rounded-full blur-[120px] z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center reveal">
          <h2 className="font-sora text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight">A year from now, you'll wish you started <span className="text-downy">today.</span></h2>
          <p className="font-inter text-xl text-white/80 mb-12 max-w-2xl mx-auto">The time will pass anyway. You can either be sitting in the same chair, or sitting on a beach designing your own day.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => document.getElementById('onboarding').scrollIntoView({behavior:'smooth'})} className="bg-downy text-tiber font-sora text-xl font-bold px-10 py-5 rounded-2xl shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1 btn-glow flex items-center justify-center gap-2">Start Your Journey <ArrowRight className="w-6 h-6" /></button>
          </div>
          <p className="mt-8 font-inter text-sm text-white/60 flex items-center justify-center gap-2"><Shield className="w-4 h-4" /> 14-Day Money Back Guarantee • Cancel Anytime</p>
        </div>
      </section>

      {/* 9. FOOTER */}
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