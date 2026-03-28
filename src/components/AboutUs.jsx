import React, { useState, useEffect } from 'react';
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

const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
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

const StatCard = ({ number, label, icon: Icon, delay = 0 }) => (
  <FadeInSection delay={delay}>
    <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
      <div className="w-16 h-16 bg-gradient-to-br from-[#64CDD1]/20 to-[#5794A4]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-[#0A3948]" />
      </div>
      <div className="text-3xl md:text-4xl font-black text-[#0A3948] mb-2">{number}</div>
      <div className="text-sm text-[#5794A4] font-medium">{label}</div>
    </div>
  </FadeInSection>
);

const ValueCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <FadeInSection delay={delay}>
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-[#5794A4]/10">
      <div className="w-14 h-14 bg-gradient-to-br from-[#64CDD1]/20 to-[#5794A4]/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-[#0A3948]" />
      </div>
      <h3 className="text-xl font-bold text-[#0A3948] mb-3">{title}</h3>
      <p className="text-[#5794A4] leading-relaxed">{description}</p>
    </div>
  </FadeInSection>
);

const JourneyStep = ({ icon: Icon, days, title, items, color, delay }) => (
  <FadeInSection delay={delay}>
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gradient-to-br from-[#64CDD1]/30 to-[#5794A4]/30 shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
        <Icon className="w-6 h-6 text-[#0A3948]" />
      </div>
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-3xl shadow-lg border border-[#5794A4]/20 hover:shadow-2xl transition-all hover:-translate-y-1">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[#0A3948] font-bold text-sm mb-4`} style={{ background: `${color}20` }}>
          {days}
        </div>
        <h3 className="font-bold text-2xl text-[#0A3948] mb-4">{title}</h3>
        <div className="space-y-3 text-[#5794A4]">
          {items.map((item, idx) => (
            <p key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#64CDD1] shrink-0 mt-0.5" />
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  </FadeInSection>
);

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
      color: "#64CDD1",
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
      color: "#5794A4",
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
      color: "#0A3948",
      items: [
        "Design your lifestyle",
        "Work from anywhere",
        "Live on your own terms",
        "Join global community"
      ]
    }
  ];

  return (
    <div className="ml-[280px] min-h-screen bg-gradient-to-br from-[#B8E3E6] to-[#e0f0f2] font-sans text-[#0A3948] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#B8E3E6] via-[#B8E3E6]/90 to-[#B8E3E6]"></div>
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-[#5794A4]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-[#64CDD1]/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#5794A4]/20 to-[#64CDD1]/20 border border-[#5794A4]/30 text-[#0A3948] font-semibold text-sm mb-8 backdrop-blur-sm">
              <Globe2 className="w-4 h-4" />
              <span>ABOUT NOMADS ADVISORS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0A3948] tracking-tight mb-8 leading-tight">
              The life you want is <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#0A3948] to-[#5794A4] bg-clip-text text-transparent">
                closer than you think.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#5794A4] max-w-3xl mx-auto leading-relaxed mb-12">
              Built by <span className="font-semibold text-[#0A3948]">Get Founds Technologies</span>, we created a system to help you break out of the cycle and step into a life you actually want.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0A3948] to-[#5794A4] hover:from-[#64CDD1] hover:to-[#0A3948] text-white rounded-full font-bold text-lg shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} delay={idx * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Started */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#5794A4]/30 to-[#64CDD1]/30 rounded-3xl transform -rotate-3 scale-105 group-hover:rotate-0 transition-transform duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop" 
                  alt="Frustrated worker looking for clarity" 
                  className="rounded-3xl shadow-2xl object-cover h-[600px] w-full relative z-10"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block border border-[#5794A4]/20 animate-float">
                  <div className="flex gap-4 items-start">
                    <div className="bg-gradient-to-br from-[#64CDD1]/20 to-[#5794A4]/20 p-3 rounded-full">
                      <Compass className="w-6 h-6 text-[#0A3948]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A3948]">Not a platform.</h4>
                      <p className="text-sm text-[#5794A4] mt-1">A solution to confusion.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={200}>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-gradient-to-r from-[#5794A4] to-[#64CDD1] rounded-full"></span>
                  <span className="text-[#5794A4] font-bold tracking-wide uppercase text-sm">Our Story</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-[#0A3948] leading-tight">
                  "It didn't begin with a business idea... <br/>
                  <span className="text-[#5794A4] italic font-medium">it began with a feeling.</span>"
                </h2>
                
                <div className="space-y-6 text-lg text-[#5794A4] leading-relaxed">
                  <p>A feeling that something wasn't right. Every day looked the same. Same routine. Same stress. Same waiting for "someday."</p>
                  <p>There was ambition... but no direction. Dreams... but no system to make them real.</p>
                  
                  <div className="bg-gradient-to-r from-[#B8E3E6]/50 to-[#B8E3E6]/30 p-6 rounded-2xl border border-[#5794A4]/20 space-y-4">
                    <p className="font-bold text-[#0A3948] text-lg mb-2">We realized something important:</p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><X className="w-4 h-4"/></span>
                        <span>People don't lack talent.</span>
                      </li>
                      <li className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><X className="w-4 h-4"/></span>
                        <span>People don't lack effort.</span>
                      </li>
                      <li className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4"/></span>
                        <span className="font-semibold text-[#0A3948]">People lack clarity.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-xl font-semibold text-[#0A3948] pt-4 border-t border-[#5794A4]/20">
                    That's where Nomads Advisors was born. Built to help you break the cycle.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gradient-to-br from-[#B8E3E6] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeInSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5794A4]/10 text-[#0A3948] font-semibold text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Our Core Values</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A3948] mb-4">
                What Drives Us
              </h2>
              <p className="text-xl text-[#5794A4] max-w-2xl mx-auto">
                Principles that guide everything we do
              </p>
            </FadeInSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <ValueCard key={idx} {...value} delay={idx * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* The Journey Steps - Alternating Left and Right */}
<section className="py-24 bg-white relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <FadeInSection>
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#64CDD1]/10 text-[#0A3948] font-semibold text-sm mb-4">
          <Rocket className="w-4 h-4" />
          <span>Your Path to Freedom</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#0A3948] mb-6">
          Understand Your Purpose
        </h2>
        <p className="text-2xl font-medium text-[#5794A4] italic mb-4">
          "The moment you understand yourself... everything changes."
        </p>
        <p className="text-lg text-[#5794A4]">
          Before income... before freedom... comes clarity.
        </p>
      </div>
    </FadeInSection>

    <div className="space-y-12 relative">
      {/* Central Vertical Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5794A4] via-[#64CDD1] to-[#5794A4] transform -translate-x-1/2 hidden md:block"></div>
      
      {journeySteps.map((step, idx) => (
        <FadeInSection key={idx} delay={idx * 150}>
          <div className={`relative flex items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            {/* Icon on the Center Line */}
            <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gradient-to-br from-[#64CDD1]/30 to-[#5794A4]/30 shadow-xl shrink-0 relative z-10 ${
              idx % 2 === 0 
                ? 'md:absolute md:left-1/2 md:-translate-x-1/2' 
                : 'md:absolute md:left-1/2 md:-translate-x-1/2'
            }`}>
              <step.icon className="w-6 h-6 text-[#0A3948]" />
            </div>
            
            {/* Content Card - Alternating Left and Right */}
            <div className={`w-full md:w-[45%] bg-white p-8 rounded-3xl shadow-lg border border-[#5794A4]/20 hover:shadow-2xl transition-all hover:-translate-y-1 ${
              idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
            }`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[#0A3948] font-bold text-sm mb-4`} style={{ background: `${step.color}20` }}>
                {step.days}
              </div>
              <h3 className="font-bold text-2xl text-[#0A3948] mb-4">{step.title}</h3>
              <div className="space-y-3 text-[#5794A4]">
                {step.items.map((item, itemIdx) => (
                  <p key={itemIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#64CDD1] shrink-0 mt-0.5" />
                    {item}
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
      <section className="py-24 bg-gradient-to-br from-[#0A3948] to-[#1a5a6e] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#64CDD1]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5794A4]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#64CDD1] font-semibold text-sm mb-6">
                  <Heart className="w-4 h-4" />
                  <span>Why We Do It</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  For us, Get Founds Technologies is more than a business — it's a movement.
                </h2>
                <div className="space-y-6 text-lg text-white/80 leading-relaxed">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all hover:-translate-y-1">
                  <Zap className="w-10 h-10 text-[#64CDD1] mx-auto mb-3" />
                  <h4 className="font-bold text-xl mb-2">Impact</h4>
                  <p className="text-white/70 text-sm">1,000+ lives transformed</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all hover:-translate-y-1">
                  <Globe2 className="w-10 h-10 text-[#64CDD1] mx-auto mb-3" />
                  <h4 className="font-bold text-xl mb-2">Reach</h4>
                  <p className="text-white/70 text-sm">50+ countries worldwide</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all hover:-translate-y-1">
                  <TrendingUp className="w-10 h-10 text-[#64CDD1] mx-auto mb-3" />
                  <h4 className="font-bold text-xl mb-2">Growth</h4>
                  <p className="text-white/70 text-sm">$5M+ income generated</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all hover:-translate-y-1">
                  <Users className="w-10 h-10 text-[#64CDD1] mx-auto mb-3" />
                  <h4 className="font-bold text-xl mb-2">Community</h4>
                  <p className="text-white/70 text-sm">100+ events yearly</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#64CDD1]/20 via-[#5794A4]/20 to-[#0A3948]/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeInSection>
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-[#0A3948] mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-[#5794A4] mb-8">
                Join thousands of digital nomads who have transformed their lives
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group px-8 py-4 bg-gradient-to-r from-[#0A3948] to-[#5794A4] hover:from-[#64CDD1] hover:to-[#0A3948] text-white rounded-full font-bold text-lg shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                  Start Your Journey Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group px-8 py-4 bg-transparent border-2 border-[#0A3948] text-[#0A3948] hover:bg-[#0A3948] hover:text-white rounded-full font-bold text-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                  Learn More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <p className="mt-6 text-sm text-[#5794A4] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#64CDD1]" /> No credit card required • 14-day money-back guarantee
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-[#5794A4]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-[#0A3948]" />
            <span className="font-bold text-xl tracking-tight text-[#0A3948]">Nomads<span className="text-[#5794A4]">Advisors</span></span>
          </div>
          <p className="text-sm text-[#5794A4]">Built by Get Founds Technologies © {new Date().getFullYear()}</p>
          <div className="flex gap-6">
            <a href="#" className="text-[#5794A4] hover:text-[#0A3948] transition-colors">Privacy</a>
            <a href="#" className="text-[#5794A4] hover:text-[#0A3948] transition-colors">Terms</a>
            <a href="#" className="text-[#5794A4] hover:text-[#0A3948] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}