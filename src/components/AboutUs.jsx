import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Target, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  Briefcase, 
  Globe2,
  X,
  Users,
  Heart,
  Star,
  Award,
  TrendingUp,
  Zap
} from 'lucide-react';

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const C = {
  darkTeal:  'rgb(20,68,71)',
  teal:      'rgb(43,135,141)',
  lightTeal: 'rgb(97,206,207)',
  pale1:     'rgb(223,246,246)',
};
const G = {
  bg:      `linear-gradient(to bottom, rgb(223,246,246), rgb(97,206,207), rgb(43,135,141))`,
  btn:     `linear-gradient(to right, rgb(43,135,141), rgb(20,68,71))`,
  heading: `linear-gradient(to right, rgb(43,135,141), rgb(20,68,71))`,
  glass80: 'rgba(255,255,255,0.75)',
  glass50: 'rgba(255,255,255,0.45)',
  glass40: 'rgba(255,255,255,0.40)',
  border60:'rgba(255,255,255,0.6)',
};

/* ─── FADE IN SECTION ─────────────────────────────────────── */
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ─── STAT CARD ────────────────────────────────────────────── */
const StatCard = ({ number, label, icon: Icon, delay = 0 }) => (
  <FadeInSection delay={delay}>
    <motion.div 
      whileHover={{ y: -5 }}
      className="text-center p-4 sm:p-6 rounded-2xl shadow-lg border transition-all"
      style={{ background: G.glass80, borderColor: G.border60, backdropFilter: 'blur(20px)' }}
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
        style={{ background: 'linear-gradient(to bottom right, rgba(97,206,207,0.2), rgba(43,135,141,0.2))' }}>
        <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: C.teal }} />
      </div>
      <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2" style={{ color: C.darkTeal }}>{number}</div>
      <div className="text-xs sm:text-sm font-medium" style={{ color: C.teal }}>{label}</div>
    </motion.div>
  </FadeInSection>
);

/* ─── VALUE CARD ───────────────────────────────────────────── */
const ValueCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <FadeInSection delay={delay}>
    <motion.div 
      whileHover={{ y: -5 }}
      className="group rounded-2xl p-5 sm:p-6 shadow-lg border transition-all"
      style={{ background: G.glass80, borderColor: G.border60, backdropFilter: 'blur(20px)' }}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform"
        style={{ background: 'linear-gradient(to bottom right, rgba(97,206,207,0.2), rgba(43,135,141,0.2))' }}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: C.teal }} />
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: C.darkTeal }}>{title}</h3>
      <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(20,68,71,0.7)' }}>{description}</p>
    </motion.div>
  </FadeInSection>
);

/* ─── MAIN ─────────────────────────────────────────────────── */
export default function AboutUs() {
  const stats = [
    { number: "10,000+", label: "Active Members", icon: Users },
    { number: "50+", label: "Countries", icon: Globe2 },
    { number: "500+", label: "Success Stories", icon: Award },
    { number: "98%", label: "Satisfaction Rate", icon: Star }
  ];

  const values = [
    { icon: Compass, title: "Freedom First", description: "Boundless opportunities to work and travel on your terms" },
    { icon: Heart, title: "Authentic Connection", description: "Building meaningful relationships with like-minded souls" },
    { icon: TrendingUp, title: "Continuous Growth", description: "Evolving skills, mindset, and opportunities" },
    { icon: Users, title: "Global Community", description: "Supportive network of nomads worldwide" }
  ];

  const journeySteps = [
    {
      icon: BrainCircuit,
      days: "🌱 7 Days",
      title: "Clarity Seeker",
      color: "rgb(97,206,207)",
      items: [
        "What you're naturally good at",
        "What actually excites you",
        "What skills can turn into income",
        "Your unique value proposition"
      ]
    },
    {
      icon: Briefcase,
      days: "💰 30 Days",
      title: "Income Builder",
      color: "rgb(43,135,141)",
      items: [
        "Launch your first offer",
        "Land your first client",
        "Create sustainable income streams",
        "Build your portfolio"
      ]
    },
    {
      icon: Globe2,
      days: "🌍 60 Days",
      title: "Nomad Starter",
      color: "rgb(38,131,141)",
      items: [
        "Design your lifestyle",
        "Work from anywhere",
        "Live on your own terms",
        "Join global community"
      ]
    }
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden relative">
      <div className="md:ml-[280px]">
        
        {/* Gradient Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0" style={{ background: G.bg }} />
          <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-3xl opacity-25"
            style={{ background: 'radial-gradient(circle, rgba(38,131,141,0.4) 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[100px] sm:blur-[120px]"
            style={{ background: 'rgba(255,255,255,0.12)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] hidden sm:block" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="story-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={C.darkTeal} strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#story-grid)" />
          </svg>
        </div>

        {/* Hero Section */}
        <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/src/assets/aboutus.png')", opacity: 0.55, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(223,246,246,0.6) 0%, rgba(97,206,207,0.4) 50%, rgba(43,135,141,0.3) 100%)' }} />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeInSection>
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border shadow-sm mb-6 sm:mb-8"
                  style={{ background: G.glass40, borderColor: G.border60, backdropFilter: 'blur(10px)' }}>
                  <Globe2 className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: C.teal }} />
                  <span className="text-xs sm:text-sm font-medium" style={{ color: C.darkTeal }}>ABOUT NOMADS ADVISORS</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 leading-tight" style={{ color: C.darkTeal }}>
                  The life you want is <br className="hidden sm:block" />
                  <span className="bg-clip-text text-transparent" style={{ background: G.heading, WebkitBackgroundClip: 'text' }}>
                    closer than you think.
                  </span>
                </h1>
                <p className="text-base sm:text-xl md:text-2xl max-w-2xl leading-relaxed mb-8 sm:mb-12" style={{ color: 'rgba(20,68,71,0.8)' }}>
                  Built by <span className="font-semibold" style={{ color: C.teal }}>Get Founds Technologies</span>, we created a system to help you break out of the cycle and step into a life you actually want.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    whileHover={{ y: -2 }}
                    className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-white rounded-full font-bold text-base sm:text-lg shadow-xl transition-all flex items-center justify-center gap-2"
                    style={{ background: G.btn, boxShadow: '0 10px 25px -5px rgba(43,135,141,0.3)' }}>
                    Start Your Journey
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} delay={idx * 100} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Started */}
        <section className="py-16 sm:py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <FadeInSection>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl transform -rotate-3 scale-105 group-hover:rotate-0 transition-transform duration-500"
                    style={{ background: 'linear-gradient(to top right, rgba(97,206,207,0.3), rgba(43,135,141,0.3))' }} />
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop" 
                    alt="Frustrated worker looking for clarity" 
                    className="rounded-2xl sm:rounded-3xl shadow-2xl object-cover h-[350px] sm:h-[500px] lg:h-[600px] w-full relative z-10"
                  />
                 
                </div>
              </FadeInSection>
              
              <FadeInSection delay={200}>
                <div className="space-y-6 sm:space-y-8">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-6 sm:w-8 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(to right, rgb(97,206,207), rgb(43,135,141))' }} />
                    <span className="font-bold tracking-wide uppercase text-xs sm:text-sm" style={{ color: C.teal }}>Our Story</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: C.darkTeal }}>
                    "It didn't begin with a business idea... <br/>
                    <span className="italic font-medium" style={{ color: C.teal }}>it began with a feeling.</span>"
                  </h2>
                  
                  <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: 'rgba(20,68,71,0.7)' }}>
                    <p>A feeling that something wasn't right. Every day looked the same. Same routine. Same stress. Same waiting for "someday."</p>
                    <p>There was ambition... but no direction. Dreams... but no system to make them real.</p>
                    
                    <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border space-y-3 sm:space-y-4"
                      style={{ background: G.glass40, borderColor: G.border60, backdropFilter: 'blur(10px)' }}>
                      <p className="font-bold text-base sm:text-lg mb-2" style={{ color: C.darkTeal }}>We realized something important:</p>
                      <ul className="space-y-2 sm:space-y-3">
                        <li className="flex items-center gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                          <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.2)', color: 'rgb(239,68,68)' }}><X className="w-3 h-3 sm:w-4 sm:h-4"/></span>
                          <span className="text-sm sm:text-base" style={{ color: 'rgba(20,68,71,0.8)' }}>People don't lack talent.</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                          <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.2)', color: 'rgb(239,68,68)' }}><X className="w-3 h-3 sm:w-4 sm:h-4"/></span>
                          <span className="text-sm sm:text-base" style={{ color: 'rgba(20,68,71,0.8)' }}>People don't lack effort.</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3 group hover:translate-x-1 transition-transform">
                          <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.2)', color: 'rgb(34,197,94)' }}><CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4"/></span>
                          <span className="font-semibold text-sm sm:text-base" style={{ color: C.darkTeal }}>People lack clarity.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p className="text-base sm:text-lg lg:text-xl font-semibold pt-3 sm:pt-4 border-t" style={{ color: C.darkTeal, borderColor: 'rgba(255,255,255,0.4)' }}>
                      That's where Nomads Advisors was born. Built to help you break the cycle.
                    </p>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 sm:py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <FadeInSection>
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4"
                  style={{ background: 'rgba(97,206,207,0.2)', color: C.teal }}>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Our Core Values</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" style={{ color: C.darkTeal }}>
                  What Drives Us
                </h2>
                <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto" style={{ color: 'rgba(20,68,71,0.7)' }}>
                  Principles that guide everything we do
                </p>
              </FadeInSection>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {values.map((value, idx) => (
                <ValueCard key={idx} {...value} delay={idx * 100} />
              ))}
            </div>
          </div>
        </section>

        {/* The Journey Steps */}
        <section className="py-16 sm:py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4"
                  style={{ background: 'rgba(97,206,207,0.2)', color: C.teal }}>
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Your Path to Freedom</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: C.darkTeal }}>
                  Understand Your Purpose
                </h2>
                <p className="text-xl sm:text-2xl font-medium italic mb-3 sm:mb-4" style={{ color: C.teal }}>
                  "The moment you understand yourself... everything changes."
                </p>
                <p className="text-base sm:text-lg" style={{ color: 'rgba(20,68,71,0.7)' }}>
                  Before income... before freedom... comes clarity.
                </p>
              </div>
            </FadeInSection>

            <div className="space-y-8 sm:space-y-12 relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 hidden md:block"
                style={{ background: 'linear-gradient(to bottom, rgb(97,206,207), rgb(43,135,141), rgb(97,206,207))' }} />
              
              {journeySteps.map((step, idx) => (
                <FadeInSection key={idx} delay={idx * 150}>
                  <div className="relative flex flex-col md:flex-row md:items-center">
                    <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 shadow-xl shrink-0 relative z-10 mx-auto md:mx-0 ${
                        idx % 2 === 0 ? 'md:absolute md:left-1/2 md:-translate-x-1/2' : 'md:absolute md:left-1/2 md:-translate-x-1/2'
                      }`}
                      style={{ background: 'linear-gradient(to bottom right, rgba(97,206,207,0.3), rgba(223,246,246,0.3))', borderColor: 'white' }}>
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: C.darkTeal }} />
                    </div>
                    
                    <div className={`w-full md:w-[45%] mt-4 md:mt-0 rounded-2xl sm:rounded-3xl shadow-lg border transition-all hover:-translate-y-1 ${
                        idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                      }`}
                      style={{ background: G.glass80, borderColor: G.border60, backdropFilter: 'blur(20px)', padding: '1.25rem' }}>
                      <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4"
                        style={{ background: `${step.color}30`, color: C.darkTeal }}>
                        {step.days}
                      </div>
                      <h3 className="font-bold text-xl sm:text-2xl mb-3 sm:mb-4" style={{ color: C.darkTeal }}>{step.title}</h3>
                      <div className="space-y-2 sm:space-y-3 text-sm sm:text-base" style={{ color: 'rgba(20,68,71,0.8)' }}>
                        {step.items.map((item, itemIdx) => (
                          <p key={itemIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" style={{ color: C.teal }} />
                            <span className="text-sm sm:text-base">{item}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Why We Do It */}
        <section className="py-16 sm:py-24 relative z-10 overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom right, rgba(97,206,207,0.1), rgba(223,246,246,0.1))' }} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <FadeInSection>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6"
                    style={{ background: 'rgba(97,206,207,0.2)', color: C.teal }}>
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Why We Do It</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: C.darkTeal }}>
                    For us, Get Founds Technologies is more than a business — it's a movement.
                  </h2>
                  <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: 'rgba(20,68,71,0.7)' }}>
                    <p>
                      We've seen how empowering knowledge and the right network can transform someone's career 
                      and lifestyle. We want every nomad to feel that they're not just traveling and working 
                      alone, but part of a global family that supports and inspires them.
                    </p>
                    <p>
                      As a couple, we've built our lives around exploring the world, learning from every 
                      experience, and creating value wherever we go. We know the challenges of being on the 
                      road — from finding stable work to managing time zones — and that's why we've made it 
                      our mission to make the nomadic journey smoother, smarter, and more rewarding for everyone.
                    </p>
                  </div>
                </div>
              </FadeInSection>
              
              <FadeInSection delay={200}>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { icon: Zap, title: "Impact", value: "1,000+ lives transformed" },
                    { icon: Globe2, title: "Reach", value: "50+ countries worldwide" },
                    { icon: TrendingUp, title: "Growth", value: "$5M+ income generated" },
                    { icon: Users, title: "Community", value: "100+ events yearly" }
                  ].map((item, i) => (
                    <motion.div key={i} whileHover={{ y: -2 }}
                      className="rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border transition-all"
                      style={{ background: G.glass50, borderColor: G.border60, backdropFilter: 'blur(10px)' }}>
                      <item.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3" style={{ color: C.teal }} />
                      <h4 className="font-bold text-base sm:text-xl mb-1 sm:mb-2" style={{ color: C.darkTeal }}>{item.title}</h4>
                      <p className="text-xs sm:text-sm" style={{ color: 'rgba(20,68,71,0.6)' }}>{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <FadeInSection>
              <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border"
                style={{ background: G.glass50, borderColor: G.border60, backdropFilter: 'blur(20px)' }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6" style={{ color: C.darkTeal }}>
                  Ready to Start Your Journey?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8" style={{ color: 'rgba(20,68,71,0.7)' }}>
                  Join thousands of digital nomads who have transformed their lives
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <motion.button whileHover={{ y: -2 }}
                    className="group px-6 sm:px-8 py-3 sm:py-4 text-white rounded-full font-bold text-base sm:text-lg shadow-xl transition-all flex items-center justify-center gap-2"
                    style={{ background: G.btn, boxShadow: '0 10px 25px -5px rgba(43,135,141,0.3)' }}>
                    Start Your Journey Today
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <motion.button whileHover={{ y: -2 }}
                    className="group px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2"
                    style={{ background: 'transparent', border: `2px solid ${C.teal}`, color: C.teal }}>
                    Learn More
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
                <p className="mt-4 sm:mt-6 text-xs sm:text-sm flex items-center justify-center gap-2" style={{ color: 'rgba(20,68,71,0.6)' }}>
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: C.teal }} /> No credit card required • 14-day money-back guarantee
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-8 sm:py-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: C.teal }} />
              <span className="font-bold text-lg sm:text-xl tracking-tight" style={{ color: C.darkTeal }}>
                Nomads<span style={{ color: C.teal }}>Advisors</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-center" style={{ color: 'rgba(20,68,71,0.6)' }}>
              Built by Get Founds Technologies © {new Date().getFullYear()}
            </p>
            <div className="flex gap-4 sm:gap-6">
              {['Privacy', 'Terms', 'Contact'].map(l => (
                <a key={l} href="#" className="text-xs sm:text-sm transition-colors" style={{ color: 'rgba(20,68,71,0.6)' }}>{l}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}