import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Compass, DollarSign, Globe, Play, ChevronRight,
  CheckCircle, Star, MessageCircle, X, MapPin, Briefcase,
  TrendingUp, Rocket, Users, Shield, Zap, Target, ChevronLeft,
  Pause, Award, Crown, Code, Brain, Sparkles, Lightbulb,
  Lock as LockIcon, Menu,
} from 'lucide-react';

// Import local images for the community slider
import photo1 from '../assets/photo1.jpeg';
import photo2 from '../assets/photo2.jpeg';
import photo3 from '../assets/photo3.jpeg';
import photo4 from '../assets/photo4.jpeg';
import photo5 from '../assets/photo5.jpeg';

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const C = {
  darkNavy:  'rgb(26,54,93)',
  blue:      'rgb(43,108,176)',
  lightBlue: 'rgb(74,144,226)',
  pale1:     'rgb(214,239,255)',
  pale2:     'rgb(185,226,255)',
};
const G = {
  bg:      `linear-gradient(to bottom, rgb(214,239,255), rgb(185,226,255), rgb(74,144,226))`,
  btn:     `linear-gradient(to right, ${C.blue}, ${C.darkNavy})`,
  btnHov:  `linear-gradient(to right, ${C.darkNavy}, ${C.blue})`,
  heading: `linear-gradient(135deg, ${C.darkNavy}, ${C.blue}, ${C.lightBlue})`,
  glass80: 'rgba(255,255,255,0.8)',
  glass65: 'rgba(255,255,255,0.65)',
  glass50: 'rgba(255,255,255,0.5)',
  glass40: 'rgba(255,255,255,0.4)',
  border60:'rgba(255,255,255,0.6)',
  border40:'rgba(255,255,255,0.4)',
  blueBorder:'rgba(74,144,226,0.3)',
  darkSection:`linear-gradient(135deg, ${C.darkNavy}, #1a3e5c, ${C.blue})`,
};

// Helper function for responsive clamp values
const clamp = (min, val, max) => Math.min(max, Math.max(min, val));

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
    body { font-family: 'Manrope', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width:8px; }
    ::-webkit-scrollbar-track { background: rgba(185,226,255,0.3); }
    ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, rgb(74,144,226), rgb(43,108,176)); border-radius:4px; }

    @keyframes blobDrift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-25px,35px) scale(0.95)} }
    @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
    @keyframes particleFly { 0%{transform:translateY(0); opacity:0} 15%{opacity:.6} 100%{transform:translateY(-80px); opacity:0} }
    @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
    @keyframes shimmer { from{background-position:-600px 0} to{background-position:600px 0} }
    @keyframes popIn { from{opacity:0;transform:scale(0.88) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
    @keyframes slideR { from{transform:translateX(-28px);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes confettiFall { 0%{transform:translateY(-10vh) rotate(0deg);opacity:1} 100%{transform:translateY(105vh) rotate(360deg);opacity:0} }
    @keyframes pulseDot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.6} }

    .btn-primary { transition: transform .25s ease, box-shadow .25s ease; }
    .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(43,108,176,.45) !important; }
    .cat-card { transition: transform .35s cubic-bezier(.22,.68,0,1.2), box-shadow .35s ease; }
    .cat-card:hover { transform: translateY(-10px) !important; }
    .hover-lift { transition: transform .3s ease, box-shadow .3s ease; }
    .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(26,54,93,.14) !important; }
    .slide-msg { animation: slideR .6s ease forwards; }
  `}</style>
);

/* ─── BLOB BACKGROUND ───────────────────────────────────────── */
const BlobBg = () => (
  <div style={{position:'fixed',inset:0,zIndex:0,overflow:'hidden',pointerEvents:'none'}}>
    <div style={{position:'absolute',top:'-8%',left:'-6%',width:520,height:520,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,255,255,0.5) 0%,transparent 70%)',animation:'blobDrift 20s ease-in-out infinite'}}/>
    <div style={{position:'absolute',top:'30%',right:'-10%',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(43,108,176,0.4) 0%,transparent 70%)',animation:'blobDrift 26s ease-in-out infinite reverse'}}/>
    <div style={{position:'absolute',bottom:'5%',left:'35%',width:460,height:460,borderRadius:'50%',background:'rgba(255,255,255,0.15)',filter:'blur(60px)',animation:'blobDrift 32s ease-in-out infinite'}}/>
  </div>
);

/* ─── FLOATING PARTICLES ────────────────────────────────────── */
const FloatingParticles = () => (
  <div style={{position:'fixed',inset:0,zIndex:0,overflow:'hidden',pointerEvents:'none'}}>
    {Array.from({length:30},(_,i)=>{
      const colors = [`rgba(74,144,226,`,`rgba(43,108,176,`,`rgba(185,226,255,`,`rgba(26,54,93,`];
      const c = colors[i%4];
      return (
        <div key={i} style={{
          position:'absolute',
          left:`${(i*37)%100}%`, top:`${(i*53)%100}%`,
          width:Math.max(2,(i%5)+2), height:Math.max(2,(i%5)+2),
          borderRadius:'50%',
          background:`${c}${0.15+(i%4)*0.08})`,
          animation:`floatUp ${8+(i%6)}s ease-in-out infinite`,
          animationDelay:`${-(i%8)}s`,
        }}/>
      );
    })}
  </div>
);

/* ─── CONFETTI ──────────────────────────────────────────────── */
const Confetti = () => {
  const colors = [C.darkNavy,C.blue,C.lightBlue,'#fff','#FFD700','#F43F5E','rgb(185,226,255)'];
  return (
    <div style={{position:'fixed',inset:0,zIndex:9999,overflow:'hidden',pointerEvents:'none'}}>
      {Array.from({length:120},(_,i)=>(
        <motion.div key={i}
          initial={{y:-20,x:`${(i*13)%100}vw`,rotate:0,opacity:1}}
          animate={{y:'105vh',rotate:360,opacity:0}}
          transition={{duration:2.5+(i%3)*0.5,delay:(i%12)*0.08,ease:'easeOut'}}
          style={{
            position:'absolute',
            width:6+(i%8),height:6+(i%8),
            borderRadius: i%2===0?'50%':'2px',
            background:colors[i%colors.length],
          }}
        />
      ))}
    </div>
  );
};

/* ─── GLASS CARD ─────────────────────────────────────────────── */
const Glass = ({children,style={},className='',...p}) => (
  <div className={className} style={{
    background:G.glass80, backdropFilter:'blur(20px)',
    border:`1px solid ${G.border60}`,
    boxShadow:'0 8px 32px rgba(26,54,93,0.07)',
    ...style,
  }} {...p}>{children}</div>
);

/* ─── CATEGORY CARD ─────────────────────────────────────────── */
const CategoryCard = ({category,isSelected,onSelect,index}) => {
  const Icon = category.icon;
  return (
    <motion.div
      initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}
      viewport={{once:true}} transition={{delay:index*0.12,duration:0.6}}
      className="cat-card"
      onClick={()=>onSelect(category.id)}
      style={{
        padding:'clamp(20px, 4vw, 28px) clamp(16px, 4vw, 24px)', borderRadius:24, cursor:'pointer',
        background: isSelected
          ? `linear-gradient(135deg, ${category.color}18, rgba(255,255,255,0.82))`
          : G.glass65,
        border:`1.5px solid ${isSelected ? category.color : G.border60}`,
        boxShadow: isSelected
          ? `0 20px 50px ${category.color}28, inset 0 1px 0 rgba(255,255,255,0.9)`
          : '0 8px 32px rgba(26,54,93,0.06)',
        position:'relative',
      }}>
      {isSelected && (
        <motion.div initial={{scale:0}} animate={{scale:1}} style={{position:'absolute',top:14,right:14}}>
          <div style={{width:26,height:26,borderRadius:'50%',background:`linear-gradient(135deg,${C.lightBlue},${C.blue})`,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <CheckCircle size={14} color="#fff"/>
          </div>
        </motion.div>
      )}
      <div style={{
        width: clamp(50, 60, 60), height: clamp(50, 60, 60), borderRadius:18,
        background:`${category.color}18`,
        display:'flex',alignItems:'center',justifyContent:'center',
        marginBottom:18, boxShadow:`inset 0 1px 0 rgba(255,255,255,0.5)`,
      }}>
        <Icon size={clamp(24, 28, 28)} style={{color:category.color}}/>
      </div>
      <h3 style={{fontFamily:'Sora,sans-serif',fontSize:clamp(18, 22, 22),fontWeight:800,color:category.color,marginBottom:4}}>{category.title}</h3>
      <p style={{fontSize:11,color:`rgba(26,54,93,0.5)`,fontWeight:700,letterSpacing:1,textTransform:'uppercase',marginBottom:10}}>{category.subtitle}</p>
      <p style={{fontSize:14,color:`rgba(26,54,93,0.7)`,lineHeight:1.65,marginBottom:18}}>{category.description}</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:18}}>
        {category.features.map((f,i)=>(
          <span key={i} style={{fontSize:11,padding:'5px 12px',borderRadius:99,background:`${category.color}14`,color:category.color,fontWeight:600}}>{f}</span>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:7,fontSize:13,fontWeight:700,color:category.color,paddingTop:12,borderTop:'1px solid rgba(0,0,0,0.06)'}}>
        <span>Start Journey</span>
        <motion.div animate={{x:[0,5,0]}} transition={{duration:1.4,repeat:Infinity}}>
          <ArrowRight size={14}/>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock context - replace with real useIkigai()
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleSetSelectedCategory = (id) => setSelectedCategory(id);

  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({pull:'',level:'',speed:''});
  const [showConfetti, setShowConfetti]   = useState(false);
  const [toast, setToast]                 = useState('');
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExit, setHasShownExit]   = useState(false);
  const [currentSlide, setCurrentSlide]   = useState(0);
  const [isAutoPlay,   setIsAutoPlay]     = useState(true);
  const [showUserType, setShowUserType]   = useState(false);

  const categories = [
    { id:'entrepreneur', title:'Entrepreneur', subtitle:'Founder · Innovator · Builder',
      description:'Visionary leaders who build something new and create impact through innovation.',
      icon:Rocket, color:C.lightBlue,
      features:['Startup Mindset','Product Innovation','Business Growth'] },
    { id:'managerial', title:'Managerial', subtitle:'Marketing · Business Developer · Strategist',
      description:'Strategic thinkers who drive growth, optimize systems, and lead teams to success.',
      icon:TrendingUp, color:C.blue,
      features:['Team Leadership','Strategic Planning','Process Optimization'] },
    { id:'technician', title:'Technician', subtitle:'Developer · Creator · Specialist',
      description:'Hands-on experts who execute with precision and build technical solutions.',
      icon:Code, color:C.darkNavy,
      features:['Technical Skills','Problem Solving','Building Solutions'] },
  ];

  // Community slides using local images
  const slides = [
    {id:1, title:'Global Community Meetup', location:'Bali, Indonesia',   img:photo1},
    {id:2, title:'Coworking Session',        location:'Lisbon, Portugal',  img:photo2},
    {id:3, title:'Networking Night',         location:'Bangkok, Thailand', img:photo3},
    {id:4, title:'Skill Building Workshop',  location:'Medellín, Colombia',img:photo4},
    {id:5, title:'Beach Coworking Day',      location:'Chiang Mai, Thailand',img:photo5},
  ];

  useEffect(()=>{
    let t;
    if (isAutoPlay) t = setInterval(()=>setCurrentSlide(p=>(p+1)%slides.length),4000);
    return ()=>clearInterval(t);
  },[isAutoPlay, slides.length]);

  useEffect(()=>{
    const handler = (e)=>{
      if (e.clientY<0 && !hasShownExit) { setShowExitPopup(true); setHasShownExit(true); }
    };
    document.addEventListener('mouseleave',handler);
    return ()=>document.removeEventListener('mouseleave',handler);
  },[hasShownExit]);

  const scrollToOnboarding = ()=>{
    document.getElementById('onboarding')?.scrollIntoView({behavior:'smooth'});
  };

  const handleOnboardingSelect = (key,val)=>{
    setOnboardingData(p=>({...p,[key]:val}));
    if (onboardingStep===1) {
      setToast("✨ You're 33% closer to your freedom life!");
      setTimeout(()=>setToast(''),4000);
    }
    setTimeout(()=>{
      if (onboardingStep<3) setOnboardingStep(p=>p+1);
      else {
        setOnboardingStep(4);
        setShowConfetti(true);
        setTimeout(()=>setShowConfetti(false),5000);
        setTimeout(()=>setShowUserType(true),900);
      }
    },380);
  };

  const handleCategorySelect = (id)=>{
    handleSetSelectedCategory(id);
    navigate('/sevendays');
  };

  const nextSlide=()=>{ setCurrentSlide(p=>(p+1)%slides.length); pauseAuto(); };
  const prevSlide=()=>{ setCurrentSlide(p=>(p-1+slides.length)%slides.length); pauseAuto(); };
  const pauseAuto=()=>{ setIsAutoPlay(false); setTimeout(()=>setIsAutoPlay(true),8000); };

  const GlassTag = ({children}) => (
    <span style={{display:'inline-flex',alignItems:'center',gap:7,padding:'7px 16px',borderRadius:99,
      background:G.glass65,backdropFilter:'blur(12px)',
      border:`1px solid ${G.border60}`,fontSize:13,fontWeight:600,color:C.darkNavy}}>
      {children}
    </span>
  );

  const SectionBadge = ({icon:Icon,text}) => (
    <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      style={{display:'inline-flex',alignItems:'center',gap:8,
        background:G.glass65,backdropFilter:'blur(12px)',
        border:`1px solid ${G.border60}`,
        borderRadius:99,padding:'7px 18px',marginBottom:18}}>
      <Icon size={14} style={{color:C.blue}}/>
      <span style={{fontSize:12,fontWeight:700,color:C.darkNavy,letterSpacing:0.4}}>{text}</span>
    </motion.div>
  );

  const sectionHead = {
    fontFamily:'Sora,sans-serif',
    fontSize:'clamp(32px, 5vw, 52px)',
    fontWeight:900,
    background:G.heading,
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent',
    backgroundClip:'text',
    letterSpacing:'-0.02em',
    lineHeight:1.1
  };

  // Responsive margin: no left margin on mobile, 280px on desktop (for navbar)
  const contentMarginLeft = isMobile ? 0 : '280px';

  /* ══════════════════════════════════════════════════════════ */
  return (
    <div style={{minHeight:'100vh',background:G.bg,position:'relative',fontFamily:'Manrope,sans-serif'}}>
      <GlobalStyles/>
      <BlobBg/>
      <FloatingParticles/>
      {showConfetti && <Confetti/>}

      {/* Main content with responsive left margin */}
      <div style={{marginLeft: contentMarginLeft}}>
        {/* ── TOAST ── */}
        <AnimatePresence>
          {toast && (
            <motion.div initial={{opacity:0,x:100}} animate={{opacity:1,x:0}} exit={{opacity:0,x:100}}
              style={{position:'fixed',top:88,right:20,zIndex:50}}>
              <Glass style={{padding:'12px 20px',borderRadius:16,borderLeft:`4px solid ${C.lightBlue}`,display:'flex',alignItems:'center',gap:10}}>
                <Rocket size={16} style={{color:C.lightBlue}}/>
                <span style={{fontFamily:'Sora,sans-serif',fontSize:13,fontWeight:700,color:C.darkNavy}}>{toast}</span>
              </Glass>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── EXIT POPUP ── */}
        <AnimatePresence>
          {showExitPopup && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{position:'fixed',inset:0,zIndex:100,background:'rgba(26,54,93,0.55)',backdropFilter:'blur(10px)',
                display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
              onClick={()=>setShowExitPopup(false)}>
              <motion.div initial={{scale:0.9,y:20}} animate={{scale:1,y:0}} exit={{scale:0.9,y:20}}
                onClick={e=>e.stopPropagation()}
                style={{background:G.glass80,backdropFilter:'blur(24px)',borderRadius:28,maxWidth:480,width:'100%',
                  padding:'40px 32px',position:'relative',boxShadow:'0 24px 80px rgba(0,0,0,0.2)',border:`1px solid ${G.border60}`}}>
                <button onClick={()=>setShowExitPopup(false)} style={{position:'absolute',top:14,right:14,background:'none',border:'none',cursor:'pointer'}}>
                  <X size={22} style={{color:`rgba(26,54,93,0.5)`}}/>
                </button>
                <div style={{width:72,height:72,borderRadius:'50%',background:`rgba(43,108,176,0.15)`,
                  display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
                  <Target size={34} style={{color:C.darkNavy}}/>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:22,fontWeight:800,textAlign:'center',color:C.darkNavy,marginBottom:8}}>
                  Wait — Find your purpose in 7 days.
                </h3>
                <p style={{fontSize:14,color:`rgba(26,54,93,0.65)`,textAlign:'center',marginBottom:20,lineHeight:1.65}}>
                  Don't leave your freedom to chance. Get our free 7-day clarity roadmap.
                </p>
                <input type="email" placeholder="Your best email"
                  style={{width:'100%',padding:'12px 16px',borderRadius:12,border:`1.5px solid rgba(74,144,226,0.3)`,
                    background:'rgba(255,255,255,0.8)',outline:'none',fontSize:14,marginBottom:14,fontFamily:'Manrope,sans-serif'}}/>
                <button onClick={()=>setShowExitPopup(false)}
                  style={{width:'100%',padding:'13px',borderRadius:12,border:'none',background:G.btn,
                    color:'#fff',fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:15,cursor:'pointer'}}>
                  Send Me The Roadmap
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ 1. HERO (Responsive: column on mobile, row on desktop) ══════════════════ */}
        <section style={{
          position:'relative',padding: isMobile ? '80px 20px 60px' : '120px 24px 80px',
          maxWidth:1200,margin:'0 auto',
          display:'flex',flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 32 : 48,
          alignItems:'center'
        }}>
          <div style={{position:'absolute',top:'10%',left:'-5%',width:280,height:280,borderRadius:'50%',
            background:`rgba(74,144,226,0.12)`,filter:'blur(60px)',pointerEvents:'none'}}/>

          <motion.div initial={{opacity:0,x:-48}} animate={{opacity:1,x:0}} transition={{duration:0.8}}
            style={{flex:1, textAlign: isMobile ? 'center' : 'left'}}>
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
              style={{display:'inline-flex',alignItems:'center',gap:8,background:G.glass80,backdropFilter:'blur(10px)',
                padding:'7px 18px',borderRadius:99,marginBottom:24,border:`1px solid ${G.border60}`,
                marginLeft: isMobile ? 'auto' : 0, marginRight: isMobile ? 'auto' : 0}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:C.lightBlue,animation:'pulseDot 2s infinite',display:'inline-block'}}/>
              <span style={{fontSize:13,fontWeight:700,color:C.darkNavy}}>🚀 Start in 2 mins • Free Access</span>
            </motion.div>

            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
              style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(32px, 8vw, 60px)',fontWeight:900,
                color:C.darkNavy,lineHeight:1.08,marginBottom:20,letterSpacing:'-0.03em'}}>
              You weren't meant to{' '}
              <span style={{color:C.blue,position:'relative',whiteSpace:'nowrap'}}>
                live on repeat
                <motion.svg style={{position:'absolute',bottom:-4,left:0,width:'100%',height:10,color:C.lightBlue,opacity:0.6}}
                  viewBox="0 0 100 10" preserveAspectRatio="none"
                  initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.2,delay:0.9}}>
                  <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
              style={{fontSize:'clamp(15px, 4vw, 17px)',color:`rgba(26,54,93,0.75)`,lineHeight:1.75,marginBottom:32,maxWidth:isMobile?'100%':480}}>
              Break the 9-5 cycle. Build location-independent income. Join a global community of modern explorers redesigning their lives.
            </motion.p>

            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
              style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:24, justifyContent: isMobile ? 'center' : 'flex-start'}}>
              <button className="btn-primary" onClick={scrollToOnboarding}
                style={{display:'flex',alignItems:'center',gap:8,padding:'14px 28px',borderRadius:12,border:'none',
                  background:G.btn,color:'#fff',fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:16,
                  cursor:'pointer',boxShadow:`0 8px 28px rgba(43,108,176,0.4)`}}>
                Start Your Journey <ArrowRight size={18}/>
              </button>
              <button style={{display:'flex',alignItems:'center',gap:8,padding:'14px 28px',borderRadius:12,
                border:`2px solid ${C.blue}`,background:'transparent',color:C.blue,
                fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:16,cursor:'pointer',transition:'all .25s ease'}}
                onMouseEnter={e=>{e.currentTarget.style.background=C.blue;e.currentTarget.style.color='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=C.blue;}}>
                <Play size={16}/> Watch Video
              </button>
            </motion.div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}
              style={{display:'flex',gap:20,flexWrap:'wrap', justifyContent: isMobile ? 'center' : 'flex-start'}}>
              {['No credit card','14-day guarantee'].map(l=>(
                <span key={l} style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:`rgba(26,54,93,0.6)`}}>
                  <CheckCircle size={14} style={{color:C.lightBlue}}/> {l}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.8,delay:0.2}}
            style={{flex:1, position:'relative', width:'100%'}}>
            <div style={{position:'absolute',inset:0,borderRadius:28,background:'linear-gradient(to top right,rgba(26,54,93,0.15),rgba(74,144,226,0.15))',zIndex:1}}/>
            <img src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80" alt="Nomad"
              style={{borderRadius:28,width:'100%',height: isMobile ? 300 : 480,objectFit:'cover',
                boxShadow:'0 24px 80px rgba(26,54,93,0.2)',border:'4px solid rgba(255,255,255,0.7)'}}/>
          </motion.div>
        </section>

        {/* ══ 2. CATEGORY CARDS (Responsive grid) ════════════════════════════════════ */}
        <section style={{padding:'clamp(40px, 8vw, 80px) 20px',maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:56}}>
            <SectionBadge icon={Sparkles} text="Discover Your Purpose"/>
            <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              style={{...sectionHead,marginBottom:16}}>Find Your Ikigai</motion.h2>
            <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
              style={{fontSize:'clamp(15px, 4vw, 17px)',color:`rgba(26,54,93,0.65)`,maxWidth:560,margin:'0 auto 24px',lineHeight:1.75}}>
              Embark on a transformative 7-day journey to discover what you love, what you're good at,
              what the world needs, and what you can be paid for.
            </motion.p>
            <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              style={{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center'}}>
              {['7-Day Structured Journey','Personalized Results','Visual Ikigai Map'].map(t=>(
                <GlassTag key={t}><CheckCircle size={13} style={{color:C.lightBlue}}/>{t}</GlassTag>
              ))}
            </motion.div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:24}}>
            {categories.map((cat,i)=>(
              <CategoryCard key={cat.id} category={cat} index={i}
                isSelected={selectedCategory===cat.id} onSelect={handleCategorySelect}/>
            ))}
          </div>
        </section>

        {/* ══ 3. HOW IT WORKS (Responsive grid) ════════════════════════════════════ */}
        <section style={{padding:'clamp(40px, 8vw, 80px) 20px',maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <SectionBadge icon={Compass} text="Simple & Structured"/>
            <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              style={{...sectionHead,marginBottom:14}}>How It Works</motion.h2>
            <p style={{fontSize:'clamp(15px, 4vw, 17px)',color:`rgba(26,54,93,0.6)`}}>A simple, structured journey to discover your Ikigai in 7 days</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))',gap:18,position:'relative'}}>
            <div style={{position:'absolute',top:40,left:'10%',right:'10%',height:1,
              background:`linear-gradient(to right, transparent, rgba(74,144,226,0.4), transparent)`}}/>
            {[
              {step:'01',title:'Choose Path',  desc:'Select your category',    icon:Target,  color:C.lightBlue},
              {step:'02',title:'Answer Questions',desc:'6 days of reflection', icon:Users,   color:C.blue},
              {step:'03',title:'Discover',     desc:'Get your Ikigai map',     icon:Globe,   color:C.lightBlue},
              {step:'04',title:'Take Action',  desc:'Start your journey',      icon:Zap,     color:C.blue},
            ].map((item,i)=>(
              <motion.div key={i} className="hover-lift"
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.12}}
                style={{background:G.glass65,backdropFilter:'blur(16px)',border:`1px solid ${G.border60}`,
                  borderRadius:20,padding:'clamp(20px, 4vw, 28px) 20px',textAlign:'center',position:'relative',
                  boxShadow:'0 4px 20px rgba(26,54,93,0.06)'}}>
                <div style={{position:'absolute',top:12,right:12,fontSize:28,fontWeight:900,
                  color:item.color,opacity:0.15,fontFamily:'Sora,sans-serif'}}>{item.step}</div>
                <div style={{width:64,height:64,borderRadius:18,background:`${item.color}18`,
                  display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px',
                  boxShadow:`inset 0 1px 0 rgba(255,255,255,0.5)`}}>
                  <item.icon size={28} style={{color:item.color}}/>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:16,color:C.darkNavy,marginBottom:6}}>{item.title}</h3>
                <p style={{fontSize:13,color:`rgba(26,54,93,0.6)`}}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ 4. ONBOARDING QUIZ (Responsive padding) ════════════════════════════════ */}
        <section id="onboarding" style={{padding:'clamp(40px, 8vw, 80px) 20px'}}>
          <div style={{maxWidth:820,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:40}}>
              <SectionBadge icon={Lightbulb} text="Quick Quiz"/>
              <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                style={{...sectionHead,marginBottom:10}}>Design Your Escape Plan</motion.h2>
              <p style={{fontSize:16,color:`rgba(26,54,93,0.65)`}}>Takes less than 60 seconds • Personalized roadmap</p>
            </div>

            <Glass style={{borderRadius:28,padding: isMobile ? '24px 20px' : '40px 36px',boxShadow:'0 20px 60px rgba(26,54,93,0.12)',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:-60,right:-60,width:220,height:220,borderRadius:'50%',
                background:`radial-gradient(circle, rgba(74,144,226,0.25), transparent 70%)`,pointerEvents:'none'}}/>

              <AnimatePresence mode="wait">
                {onboardingStep<4 && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{marginBottom:32}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:11,fontWeight:800,
                      color:`rgba(26,54,93,0.5)`,letterSpacing:1.5,textTransform:'uppercase',marginBottom:10}}>
                      <span>Step {onboardingStep} of 3</span>
                      <span>{Math.round((onboardingStep/3)*100)}%</span>
                    </div>
                    <div style={{height:8,borderRadius:99,background:'rgba(255,255,255,0.5)',overflow:'hidden'}}>
                      <motion.div initial={{width:0}} animate={{width:`${(onboardingStep/3)*100}%`}} transition={{duration:0.7}}
                        style={{height:'100%',borderRadius:99,background:`linear-gradient(to right,${C.lightBlue},${C.blue},${C.darkNavy})`}}/>
                    </div>
                  </motion.div>
                )}

                {onboardingStep===1 && (
                  <motion.div key="s1" initial={{opacity:0,x:48}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-48}}>
                    <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(20px, 5vw, 24px)',fontWeight:800,color:C.darkNavy,textAlign:'center',marginBottom:28}}>
                      What's pulling you towards change?
                    </h3>
                    <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(180px, 1fr))',gap:16}}>
                      {[{id:'escape',icon:Briefcase,title:'Escape 9–5',desc:'Break the corporate chains',color:C.darkNavy},
                        {id:'income',icon:DollarSign,title:'Build Income',desc:'Create financial freedom',color:C.blue},
                        {id:'travel',icon:Globe,title:'Travel Lifestyle',desc:'Work from anywhere',color:C.lightBlue}].map((item,idx)=>(
                        <motion.button key={item.id} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:idx*0.1}}
                          onClick={()=>handleOnboardingSelect('pull',item.id)}
                          style={{
                            padding:'24px 18px',borderRadius:20,textAlign:'left',cursor:'pointer',border:'none',
                            background: onboardingData.pull===item.id ? `linear-gradient(135deg,${item.color}18,rgba(255,255,255,0.9))` : G.glass65,
                            outline: onboardingData.pull===item.id ? `2px solid ${item.color}` : `1.5px solid ${G.border60}`,
                            boxShadow: onboardingData.pull===item.id ? `0 16px 40px ${item.color}20` : '0 4px 16px rgba(0,0,0,0.04)',
                            transition:'all .3s ease',
                          }}>
                          <div style={{width:48,height:48,borderRadius:14,background:`${item.color}18`,
                            display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14}}>
                            <item.icon size={22} style={{color:item.color}}/>
                          </div>
                          <h4 style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:16,color:C.darkNavy,marginBottom:5}}>{item.title}</h4>
                          <p style={{fontSize:13,color:`rgba(26,54,93,0.65)`}}>{item.desc}</p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {onboardingStep===2 && (
                  <motion.div key="s2" initial={{opacity:0,x:48}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-48}}>
                    <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(20px, 5vw, 24px)',fontWeight:800,color:C.darkNavy,textAlign:'center',marginBottom:28}}>
                      Where are you starting from?
                    </h3>
                    <div style={{display:'flex',gap:20,justifyContent:'center',flexDirection: isMobile ? 'column' : 'row', alignItems:'center'}}>
                      {[{id:'beginner',title:'Beginner',desc:'No online income yet',icon:Target},
                        {id:'intermediate',title:'Intermediate',desc:'Already making some $$ online',icon:Rocket}].map((item,idx)=>(
                        <motion.button key={item.id} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:idx*0.1}}
                          onClick={()=>handleOnboardingSelect('level',item.id)}
                          style={{
                            padding:'32px 28px',borderRadius:20,textAlign:'center',cursor:'pointer',border:'none',
                            flex:'1',minWidth:180,maxWidth: isMobile ? '100%' : 260,
                            background: onboardingData.level===item.id ? `linear-gradient(135deg,rgba(74,144,226,0.15),rgba(255,255,255,0.9))` : G.glass65,
                            outline: onboardingData.level===item.id ? `2px solid ${C.lightBlue}` : `1.5px solid ${G.border60}`,
                            transition:'all .3s ease',
                          }}>
                          <div style={{width:60,height:60,borderRadius:16,background:`rgba(43,108,176,0.15)`,
                            display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
                            <item.icon size={26} style={{color:C.blue}}/>
                          </div>
                          <h4 style={{fontFamily:'Sora,sans-serif',fontSize:18,fontWeight:800,color:C.darkNavy,marginBottom:6}}>{item.title}</h4>
                          <p style={{fontSize:13,color:`rgba(26,54,93,0.65)`}}>{item.desc}</p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {onboardingStep===3 && (
                  <motion.div key="s3" initial={{opacity:0,x:48}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-48}}>
                    <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(20px, 5vw, 24px)',fontWeight:800,color:C.darkNavy,textAlign:'center',marginBottom:28}}>
                      How fast do you want to transform?
                    </h3>
                    <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(160px, 1fr))',gap:16}}>
                      {[{id:'7',title:'7 Days',badge:'Clarity Seeker',color:C.lightBlue,available:true},
                        {id:'30',title:'30 Days',badge:'Income Builder',color:C.blue,available:false},
                        {id:'60',title:'60 Days',badge:'Nomad Starter',color:C.darkNavy,available:false}].map((item,idx)=>(
                        <motion.button key={item.id} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:idx*0.1}}
                          onClick={()=>item.available&&handleOnboardingSelect('speed',item.id)}
                          disabled={!item.available}
                          style={{
                            padding:'24px 16px',borderRadius:20,textAlign:'center',cursor:item.available?'pointer':'not-allowed',
                            border:'none',opacity:item.available?1:0.55,position:'relative',
                            background: onboardingData.speed===item.id
                              ? `linear-gradient(135deg,${item.color},${item.color}cc)` : G.glass65,
                            outline: onboardingData.speed===item.id ? `2px solid ${item.color}` : `1.5px solid ${G.border60}`,
                            transition:'all .3s ease',
                          }}>
                          {!item.available && <LockIcon size={13} style={{position:'absolute',top:10,right:10,color:`rgba(26,54,93,0.35)`}}/>}
                          <span style={{fontSize:10,fontWeight:800,letterSpacing:2,textTransform:'uppercase',display:'block',marginBottom:6,
                            color: onboardingData.speed===item.id ? 'rgba(255,255,255,0.85)' : C.blue}}>{item.badge}</span>
                          <h4 style={{fontFamily:'Sora,sans-serif',fontSize:24,fontWeight:900,
                            color: onboardingData.speed===item.id ? '#fff' : item.color}}>{item.title}</h4>
                          {!item.available&&<p style={{fontSize:10,color:`rgba(26,54,93,0.45)`,marginTop:8}}>Complete 7-Day to unlock</p>}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {onboardingStep===4 && (
                  <motion.div key="s4" initial={{opacity:0,scale:0.88}} animate={{opacity:1,scale:1}} style={{textAlign:'center'}}>
                    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',delay:0.2}}
                      style={{width:88,height:88,borderRadius:'50%',background:'rgba(34,197,94,0.12)',
                        display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
                      <CheckCircle size={44} style={{color:'rgb(34,197,94)'}}/>
                    </motion.div>
                    <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(24px, 6vw, 30px)',fontWeight:900,color:C.darkNavy,marginBottom:10}}>
                      Your Path is Ready! 🎉
                    </h3>
                    <p style={{fontSize:16,color:`rgba(26,54,93,0.65)`,marginBottom:28}}>
                      Based on your goals, we've built the perfect roadmap for you.
                    </p>
                    <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
                      <button className="btn-primary" onClick={()=>navigate('/sevendays')}
                        style={{display:'flex',alignItems:'center',gap:8,padding:'14px 28px',borderRadius:12,border:'none',
                          background:G.btn,color:'#fff',fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:16,
                          cursor:'pointer',boxShadow:`0 8px 28px rgba(43,108,176,0.4)`}}>
                        Start My Challenge <Rocket size={17}/>
                      </button>
                      <button onClick={()=>{setOnboardingStep(1);setOnboardingData({pull:'',level:'',speed:''}); }}
                        style={{background:'none',border:'none',cursor:'pointer',fontSize:13,
                          color:`rgba(26,54,93,0.5)`,textDecoration:'underline',fontFamily:'Manrope,sans-serif'}}>
                        Retake Quiz
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Glass>
          </div>
        </section>

        {/* ══ 5. PROGRAMS (Responsive grid) ══════════════════════════════════════════ */}
        <section style={{padding:'clamp(40px, 8vw, 80px) 20px',maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <SectionBadge icon={Award} text="Premium Programs"/>
            <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              style={{...sectionHead,marginBottom:16}}>Choose Your Transformation</motion.h2>
            <p style={{fontSize:'clamp(15px, 4vw, 17px)',color:`rgba(26,54,93,0.65)`}}>Structured paths designed to get you from stuck to completely free.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:24}}>
            {[
              {title:'Nomad Starter Kit',duration:'7 Days',desc:'Find your profitable skill and map your exit strategy.',outcome:'Crystal clear clarity.',icon:MapPin,color:C.lightBlue,locked:false},
              {title:'Income Engine',    duration:'30 Days',desc:'Land your first online client or launch your digital product.',outcome:'First ₹1k online.',icon:TrendingUp,color:C.blue,locked:true},
              {title:'Freedom Mastermind',duration:'60 Days',desc:'Scale to consistent 5k/mo and optimize taxes & travel.',outcome:'Full independence.',icon:Globe,color:C.darkNavy,locked:true},
            ].map((prog,i)=>(
              <motion.div key={i} className="hover-lift"
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.12}}
                style={{background:G.glass65,backdropFilter:'blur(20px)',border:`1px solid ${G.border60}`,
                  borderRadius:24,padding:'clamp(24px, 4vw, 32px) clamp(20px, 4vw, 28px)',position:'relative',boxShadow:'0 8px 32px rgba(26,54,93,0.07)'}}>
                {prog.locked && (
                  <div style={{position:'absolute',top:14,right:14,width:34,height:34,borderRadius:10,
                    background:'rgba(234,179,8,0.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <LockIcon size={15} style={{color:'rgb(202,138,4)'}}/>
                  </div>
                )}
                <div style={{width:'clamp(56px, 10vw, 64px)',height:'clamp(56px, 10vw, 64px)',borderRadius:18,background:`${prog.color}18`,
                  display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18}}>
                  <prog.icon size={clamp(24, 28, 28)} style={{color:prog.color}}/>
                </div>
                <span style={{fontSize:10,fontWeight:800,letterSpacing:2,textTransform:'uppercase',
                  color:C.lightBlue,background:`rgba(74,144,226,0.12)`,padding:'3px 12px',borderRadius:99,
                  display:'inline-block',marginBottom:14}}>{prog.duration}</span>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(18px, 4vw, 20px)',fontWeight:800,color:C.darkNavy,marginBottom:10}}>{prog.title}</h3>
                <p style={{fontSize:14,color:`rgba(26,54,93,0.7)`,lineHeight:1.65,marginBottom:18,minHeight:56}}>{prog.desc}</p>
                <div style={{padding:'10px 14px',borderRadius:12,
                  background:'linear-gradient(to right, rgba(214,239,255,0.5), rgba(185,226,255,0.3))',
                  border:`1px solid rgba(255,255,255,0.6)`,marginBottom:22}}>
                  <span style={{fontSize:10,fontWeight:800,color:`rgba(26,54,93,0.5)`,textTransform:'uppercase',letterSpacing:1,display:'block',marginBottom:3}}>Outcome</span>
                  <span style={{fontFamily:'Sora,sans-serif',fontWeight:800,color:C.darkNavy,fontSize:14}}>{prog.outcome}</span>
                </div>
                <button disabled={prog.locked}
                  style={{width:'100%',padding:'13px',borderRadius:12,border:'none',cursor:prog.locked?'not-allowed':'pointer',
                    background:prog.locked?'rgba(0,0,0,0.07)':G.btn,
                    color:prog.locked?`rgba(26,54,93,0.35)`:'#fff',
                    fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:14,
                    boxShadow:prog.locked?'none':`0 6px 20px rgba(43,108,176,0.35)`}}>
                  {prog.locked?'🔒 Complete 7-Day Challenge first':'View Program'}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ 6. DARK STORY SECTION (Responsive padding) ════════════════════════════════ */}
        <section style={{background:G.darkSection,color:'#fff',padding:'clamp(60px, 10vw, 100px) 20px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,right:0,width:400,height:400,background:`rgba(74,144,226,0.2)`,filter:'blur(120px)',pointerEvents:'none'}}/>
          <div style={{position:'absolute',bottom:0,left:0,width:400,height:400,background:`rgba(185,226,255,0.1)`,filter:'blur(120px)',pointerEvents:'none'}}/>
          <div style={{maxWidth:800,margin:'0 auto',position:'relative',zIndex:1}}>
            {[
              {badge:'The Problem',icon:Shield,head:'You did everything "right", but it feels completely wrong.',body:'You got the degree, landed the job, and climbed the ladder. But sitting in traffic for 2 hours to sit in a cubicle for 8 hours isn\'t the life you imagined.'},
              {badge:'The Guide',  icon:Shield,head:'Enter Nomads Advisors.',body:'We\'re a collective of people who already broke the matrix. We build personalized bridges from your current reality to true location independence.'},
              {badge:'The Vision', icon:Zap,   head:'Imagine waking up anywhere.',body:'Your laptop is your office. Your schedule is your own. You dictate your income, not a boss. This isn\'t a pipe dream — it\'s a structured, achievable reality.'},
            ].map((block,i)=>(
              <div key={i} style={{marginBottom:i<2?60:0}}>
                <div style={{display:'inline-flex',alignItems:'center',gap:7,
                  background:'rgba(74,144,226,0.15)',border:'1px solid rgba(74,144,226,0.3)',
                  borderRadius:99,padding:'5px 16px',marginBottom:16}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:C.lightBlue,display:'inline-block'}}/>
                  <span style={{fontSize:11,fontWeight:800,letterSpacing:1.5,textTransform:'uppercase',color:C.lightBlue}}>{block.badge}</span>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(22px, 5vw, 36px)',fontWeight:900,marginBottom:14,lineHeight:1.15}}>{block.head}</h3>
                <p style={{fontSize:'clamp(14px, 3.5vw, 16px)',color:'rgba(255,255,255,0.75)',lineHeight:1.75}}>{block.body}</p>
                {i<2 && <div style={{width:1,height:48,background:'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',margin:'32px 0 0 8px'}}/>}
              </div>
            ))}
            <button className="btn-primary" onClick={scrollToOnboarding}
              style={{marginTop:32,display:'inline-flex',alignItems:'center',gap:8,padding:'14px 30px',borderRadius:14,border:'none',
                background:`linear-gradient(to right,${C.lightBlue},${C.blue})`,color:'#fff',
                fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:16,cursor:'pointer',
                boxShadow:'0 10px 32px rgba(74,144,226,0.45)'}}>
              Claim Your Freedom <ArrowRight size={17}/>
            </button>
          </div>
        </section>

        {/* ══ 7. COMMUNITY SLIDER (Responsive) ══════════════════════════════════════ */}
        <section style={{padding:'clamp(40px, 8vw, 80px) 20px',maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <SectionBadge icon={Users} text="Global Community"/>
            <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              style={{...sectionHead,marginBottom:14}}>Our Community in Action</motion.h2>
          </div>
          <Glass style={{borderRadius:24,padding: isMobile ? 16 : 24,boxShadow:'0 16px 56px rgba(26,54,93,0.12)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18, flexWrap:'wrap', gap:10}}>
              <h4 style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:16,color:C.darkNavy}}>🌍 Community Moments</h4>
              <button onClick={()=>setIsAutoPlay(p=>!p)}
                style={{display:'flex',alignItems:'center',gap:7,padding:'7px 16px',borderRadius:10,
                  border:`1px solid ${G.border60}`,background:'white',cursor:'pointer',fontSize:13,fontWeight:600}}>
                {isAutoPlay?<Pause size={13}/>:<Play size={13}/>}
                {isAutoPlay?'Pause':'Play'}
              </button>
            </div>
            <div style={{position:'relative',borderRadius:16,overflow:'hidden'}}>
              <button onClick={prevSlide}
                style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',zIndex:10,
                  background:'rgba(255,255,255,0.9)',border:'none',borderRadius:'50%',width:36,height:36,
                  display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',
                  boxShadow:'0 4px 16px rgba(0,0,0,0.12)'}}>
                <ChevronLeft size={18} style={{color:C.darkNavy}}/>
              </button>
              <div style={{display:'flex',transition:'transform .7s ease',transform:`translateX(-${currentSlide*100}%)`}}>
                {slides.map(s=>(
                  <div key={s.id} style={{flexShrink:0,width:'100%',position:'relative'}}>
                    <img src={s.img} alt={s.title} style={{width:'100%',height: isMobile ? 280 : 420,objectFit:'cover'}}/>
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)'}}>
                      <div style={{position:'absolute',bottom:0,left:0,right:0,padding: isMobile ? '16px 20px' : '28px 24px'}}>
                        <div style={{display:'inline-flex',alignItems:'center',gap:6,
                          background:'rgba(255,255,255,0.2)',backdropFilter:'blur(8px)',
                          borderRadius:99,padding:'4px 12px',marginBottom:10}}>
                          <MapPin size={12} style={{color:'#fff'}}/>
                          <span style={{color:'#fff',fontSize:12}}>{s.location}</span>
                        </div>
                        <h4 style={{color:'#fff',fontFamily:'Sora,sans-serif',fontWeight:800,fontSize: isMobile ? 18 : 22}}>{s.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={nextSlide}
                style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',zIndex:10,
                  background:'rgba(255,255,255,0.9)',border:'none',borderRadius:'50%',width:36,height:36,
                  display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',
                  boxShadow:'0 4px 16px rgba(0,0,0,0.12)'}}>
                <ChevronRight size={18} style={{color:C.darkNavy}}/>
              </button>
            </div>
            <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:16}}>
              {slides.map((_,i)=>(
                <button key={i} onClick={()=>{setCurrentSlide(i);pauseAuto();}}
                  style={{width:i===currentSlide?28:8,height:8,borderRadius:99,border:'none',cursor:'pointer',
                    background:i===currentSlide?C.lightBlue:`rgba(43,108,176,0.25)`,transition:'all .35s ease'}}/>
              ))}
            </div>
          </Glass>
        </section>

        {/* ══ 8. FINAL CTA (Responsive) ═════════════════════════════════════════ */}
        <section style={{padding:'clamp(60px, 10vw, 100px) 20px',background:G.darkSection,position:'relative',overflow:'hidden',textAlign:'center'}}>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
            width:700,height:700,borderRadius:'50%',background:`rgba(74,144,226,0.18)`,filter:'blur(100px)',pointerEvents:'none'}}/>
          <div style={{maxWidth:700,margin:'0 auto',position:'relative',zIndex:1}}>
            <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              style={{display:'inline-flex',alignItems:'center',gap:8,
                background:'rgba(255,255,255,0.1)',backdropFilter:'blur(10px)',
                border:'1px solid rgba(255,255,255,0.2)',borderRadius:99,
                padding:'7px 18px',marginBottom:28}}>
              <Sparkles size={13} style={{color:C.lightBlue}}/>
              <span style={{fontSize:12,fontWeight:700,color:'#fff',letterSpacing:0.4}}>Your Moment is Now</span>
            </motion.div>
            <motion.h2 initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(32px, 6vw, 60px)',fontWeight:900,
                color:'#fff',lineHeight:1.06,letterSpacing:'-0.03em',marginBottom:20}}>
              A year from now, you'll wish you started{' '}
              <span style={{color:C.lightBlue}}>today.</span>
            </motion.h2>
            <p style={{fontSize:'clamp(16px, 4vw, 18px)',color:'rgba(255,255,255,0.75)',marginBottom:36,lineHeight:1.75}}>
              The time will pass anyway. You can either be in the same chair, or sitting on a beach designing your own day.
            </p>
            <button className="btn-primary" onClick={scrollToOnboarding}
              style={{display:'inline-flex',alignItems:'center',gap:10,padding:'clamp(14px, 3vw, 16px) clamp(28px, 5vw, 36px)',borderRadius:16,border:'none',
                background:`linear-gradient(to right,${C.lightBlue},${C.blue})`,color:'#fff',
                fontFamily:'Sora,sans-serif',fontWeight:900,fontSize:'clamp(16px, 3.5vw, 18px)',cursor:'pointer',
                boxShadow:'0 12px 40px rgba(74,144,226,0.5)'}}>
              Start Your Journey <ArrowRight size={20}/>
            </button>
            <p style={{marginTop:20,fontSize:13,color:'rgba(255,255,255,0.5)',display:'flex',alignItems:'center',justifyContent:'center',gap:7,flexWrap:'wrap'}}>
              <Shield size={13}/> 14-Day Money Back Guarantee • Cancel Anytime
            </p>
          </div>
        </section>

        {/* ══ FOOTER (Responsive grid) ═══════════════════════════════════════════════ */}
        <footer style={{padding:'clamp(40px, 8vw, 64px) 20px clamp(24px, 5vw, 32px)',borderTop:`1px solid rgba(255,255,255,0.3)`,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,background:'rgba(255,255,255,0.5)',backdropFilter:'blur(20px)'}}/>
          <div style={{position:'relative',zIndex:1,maxWidth:1200,margin:'0 auto'}}>
            <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',gap:32,marginBottom:40}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16, justifyContent: isMobile ? 'center' : 'flex-start'}}>
                  <div style={{width:38,height:38,borderRadius:10,background:G.btn,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Globe size={18} color="#fff"/>
                  </div>
                  <span style={{fontFamily:'Sora,sans-serif',fontWeight:900,fontSize:16,color:C.darkNavy}}>
                    NOMADS<span style={{color:C.blue}}>ADVISORS</span>
                  </span>
                </div>
                <p style={{fontSize:13,color:`rgba(26,54,93,0.6)`,lineHeight:1.7,marginBottom:16, textAlign: isMobile ? 'center' : 'left'}}>
                  Empowering the next generation of digital nomads to build freedom-first lifestyles.
                </p>
              </div>
              {[
                {head:'About',  links:['Our Story','Advisors','Careers']},
                {head:'Programs',links:['7-Day Starter','Income Engine','Freedom Mastermind']},
                {head:'Contact',links:['Support','Community Hub','hello@nomadsadvisors.com']},
              ].map(col=>(
                <div key={col.head} style={{textAlign: isMobile ? 'center' : 'left'}}>
                  <h4 style={{fontFamily:'Sora,sans-serif',fontWeight:800,color:C.darkNavy,marginBottom:14,fontSize:14}}>{col.head}</h4>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
                    {col.links.map(l=>(
                      <li key={l}><a href="#" style={{fontSize:13,color:`rgba(26,54,93,0.6)`,textDecoration:'none'}}>{l}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{paddingTop:20,borderTop:`1px solid rgba(26,54,93,0.1)`,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12, textAlign: isMobile ? 'center' : 'left', flexDirection: isMobile ? 'column' : 'row', alignItems:'center'}}>
              <p style={{fontSize:12,color:`rgba(26,54,93,0.5)`}}>© 2026 Nomads Advisors. All rights reserved.</p>
              <div style={{display:'flex',gap:20, flexWrap:'wrap', justifyContent:'center'}}>
                {['Privacy Policy','Terms of Service','Cookie Policy'].map(l=>(
                  <a key={l} href="#" style={{fontSize:12,color:`rgba(26,54,93,0.5)`,textDecoration:'none'}}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}