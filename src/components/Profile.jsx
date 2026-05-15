import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Award, Target, TrendingUp, Mail, MapPin, Edit3, Camera,
  Sparkles, Trophy, Flame, Star, ArrowRight, CheckCircle, Compass,
  Rocket, Share2, Crown, BookOpen, ChevronRight, Activity,
  Briefcase, Globe, Menu, X, User, LogOut
} from 'lucide-react';

/* ─── DESIGN TOKENS (UPDATED BLUE THEME) ─────────────────────────────────────────────── */
const C = {
  darkNavy:  'rgb(26,54,93)',
  blue:      'rgb(43,108,176)',
  lightBlue: 'rgb(74,144,226)',
  pale1:     'rgb(214,239,255)',
  pale2:     'rgb(185,226,255)',
  white:     '#ffffff',
  success:   'rgb(34,197,94)',
  error:     'rgb(239,68,68)',
};

const G = {
  bg:      `linear-gradient(to bottom, rgb(214,239,255), rgb(185,226,255), rgb(74,144,226))`,
  btn:     `linear-gradient(to right, rgb(43,108,176), rgb(26,54,93))`,
  heading: `linear-gradient(135deg, rgb(26,54,93), rgb(43,108,176), rgb(74,144,226))`,
  banner:  `linear-gradient(135deg, rgb(26,54,93), rgb(43,108,176), rgb(74,144,226))`,
  glass80: 'rgba(255,255,255,0.8)',
  glass65: 'rgba(255,255,255,0.65)',
  glass50: 'rgba(255,255,255,0.5)',
  glass40: 'rgba(255,255,255,0.4)',
  glass15: 'rgba(255,255,255,0.15)',
  border60:'rgba(255,255,255,0.6)',
  border40:'rgba(255,255,255,0.4)',
  blueBorder:'rgba(74,144,226,0.3)',
};

/* ─── INJECTED GLOBAL STYLES ─────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: 'Manrope', sans-serif; overflow-x: hidden; }

    @keyframes blobDrift {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(40px,-30px) scale(1.08); }
      66%      { transform: translate(-25px,35px) scale(0.95); }
    }
    @keyframes shimmerBar {
      from { background-position: -400px 0; }
      to   { background-position:  400px 0; }
    }
    @keyframes floatAvatar {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-6px); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .profile-avatar { animation: floatAvatar 4s ease-in-out infinite; }
    .tab-btn { transition: all .25s ease; }
    .tab-btn:hover { opacity: .85; transform: translateY(-2px); }
    .stat-card { transition: transform .3s cubic-bezier(.22,.68,0,1.2), box-shadow .3s ease; }
    .stat-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(43,108,176,.18) !important; }
    .ach-card { transition: transform .3s ease; }
    .ach-card:hover { transform: translateY(-5px); }

    @media (max-width: 768px) {
      .stat-card:hover { transform: translateY(-3px); }
      .ach-card:hover { transform: translateY(-3px); }
    }
  `}</style>
);

/* ─── ANIMATED BLOB BACKGROUND (UPDATED) ───────────────────────────────────── */
const BlobBg = () => (
  <div style={{ position:'fixed', inset:0, zIndex:0, overflow:'hidden', pointerEvents:'none' }}>
    {/* Top-right blob */}
    <div style={{
      position:'absolute', top:'-8%', right:'-6%',
      width:'clamp(300px, 50vw, 520px)', height:'clamp(300px, 50vw, 520px)',
      borderRadius:'50%',
      background:'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
      animation:'blobDrift 20s ease-in-out infinite',
    }}/>
    {/* Bottom-left blob */}
    <div style={{
      position:'absolute', bottom:'-5%', left:'-10%',
      width:'clamp(350px, 55vw, 600px)', height:'clamp(350px, 55vw, 600px)',
      borderRadius:'50%',
      background:'radial-gradient(circle, rgba(43,108,176,0.4) 0%, transparent 70%)',
      animation:'blobDrift 26s ease-in-out infinite reverse',
    }}/>
    {/* Center blur */}
    <div style={{
      position:'absolute', top:'30%', left:'35%',
      width:'clamp(280px, 45vw, 460px)', height:'clamp(280px, 45vw, 460px)',
      borderRadius:'50%',
      background:'rgba(255,255,255,0.15)',
      filter:'blur(60px)',
      animation:'blobDrift 32s ease-in-out infinite',
    }}/>
  </div>
);

/* ─── GLASS CARD ─────────────────────────────────────────────────── */
const Glass = ({ children, style={}, ...props }) => (
  <div style={{
    background: G.glass80,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${G.border60}`,
    boxShadow: '0 8px 32px rgba(26,54,93,0.08)',
    ...style,
  }} {...props}>
    {children}
  </div>
);

/* ─── MOBILE SIDEBAR ─────────────────────────────────────────────── */
const MobileSidebar = ({ isOpen, onClose, userName, userEmail, onLogout }) => {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'flex-start',
      animation: 'fadeInUp 0.3s ease both'
    }} onClick={onClose}>
      <div style={{
        width: '75%',
        maxWidth: 280,
        height: '100%',
        background: G.glass80,
        backdropFilter: 'blur(20px)',
        padding: '24px 20px',
        borderRight: `1px solid ${G.border60}`,
        animation: 'slideIn 0.3s ease both',
        display: 'flex',
        flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: C.darkNavy
          }}>✕</button>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 20, margin: '0 auto 12px',
            background: `linear-gradient(135deg, ${C.blue}, ${C.lightBlue})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ color: '#fff', fontSize: 28, fontWeight: 800, fontFamily: 'Sora,sans-serif' }}>
              {userName ? userName.substring(0,2).toUpperCase() : 'NM'}
            </span>
          </div>
          <h4 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 700, color: C.darkNavy, marginBottom: 4 }}>
            {userName || 'Nomad Explorer'}
          </h4>
          <p style={{ fontSize: 11, color: `rgba(26,54,93,0.6)` }}>{userEmail || 'Add your email'}</p>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ padding: '8px 12px', borderRadius: 10, background: `${C.blue}10`, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.blue }}>Your Journey</span>
          </div>
          <div style={{ padding: '8px 12px', borderRadius: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: C.darkNavy }}>🎯 60% Complete</span>
          </div>
        </div>
        
        <button onClick={onLogout} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px',
          borderRadius: 10, border: 'none', background: 'rgba(239,68,68,0.1)',
          color: C.error, cursor: 'pointer', marginTop: 'auto'
        }}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function Profile({ user }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock ikigai context values (replace with real context)
  const selectedCategory = 'entrepreneur';
  const completedDays = [1, 2, 3];
  const result = null;
  const currentDay = 4;

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userName, setUserName]   = useState('Alex Morgan');
  const [userEmail, setUserEmail] = useState('alex@nomadsadvisors.com');
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode]   = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user?.name) { setUserName(user.name); setUserEmail(user.email || ''); }
    try {
      const p = JSON.parse(localStorage.getItem('user_profile') || '{}');
      if (p.profilePhotoUrl) setProfilePhoto(p.profilePhotoUrl);
      if (p.firstName && p.lastName) setUserName(`${p.firstName} ${p.lastName}`);
      if (p.email) setUserEmail(p.email);
    } catch {}
  }, [user]);

  const getInitials = () => {
    if (!userName) return 'N';
    const parts = userName.split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : userName.substring(0,2).toUpperCase();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      setProfilePhoto(url);
      const ex = JSON.parse(localStorage.getItem('user_profile') || '{}');
      localStorage.setItem('user_profile', JSON.stringify({ ...ex, profilePhotoUrl: url }));
    };
    reader.readAsDataURL(file);
  };

  const completionPercent = Math.round((completedDays.length / 6) * 100);
  const isComplete = completedDays.length === 6;

  const stats = [
    { label:'Days Completed', value:`${completedDays.length}/6`, icon:Calendar,
      g1:C.blue, g2:C.lightBlue },
    { label:'Current Day',    value:`Day ${currentDay}`,         icon:Target,
      g1:C.lightBlue, g2:C.blue },
    { label:'Status',         value:isComplete?'Champion':'Explorer', icon:Trophy,
      g1:'rgb(234,179,8)', g2:'rgb(202,138,4)' },
    { label:'Category',       value:selectedCategory
        ? selectedCategory.charAt(0).toUpperCase()+selectedCategory.slice(1)
        : 'Not Set',           icon:Award,
      g1:C.blue, g2:C.darkNavy },
  ];

  const achievements = [
    { id:1, title:'Journey Started', desc:'Took the first step',   icon:Rocket,  unlocked:completedDays.length>0, color:C.blue      },
    { id:2, title:'Halfway There',   desc:'Completed 3 days',      icon:Flame,   unlocked:completedDays.length>=3, color:C.lightBlue },
    { id:3, title:'Ikigai Master',   desc:'Completed all 6 days',  icon:Crown,   unlocked:isComplete,             color:C.darkNavy  },
    { id:4, title:'Path Chosen',     desc:'Selected your path',    icon:Compass, unlocked:!!selectedCategory,     color:C.blue      },
  ];

  const categoryDetails = {
    entrepreneur:{ title:'Entrepreneur', subtitle:'Founder · Innovator · Builder',             icon:Rocket,     color:C.blue      },
    managerial:  { title:'Managerial',   subtitle:'Marketing · Strategy · Leadership',          icon:TrendingUp, color:C.lightBlue },
    technician:  { title:'Technician',   subtitle:'Developer · Creator · Specialist',           icon:Briefcase,  color:C.darkNavy  },
  };
  const catDetail = selectedCategory ? categoryDetails[selectedCategory] : null;

  // Responsive margin: no left margin on mobile, 280px on desktop (for navbar)
  const contentMarginLeft = isMobile ? 0 : '280px';

  const handleLogout = () => {
    localStorage.removeItem('ns_users');
    navigate('/login');
  };

  /* ── RENDER ── */
  return (
    <div style={{ minHeight:'100vh', background:G.bg, position:'relative', fontFamily:'Manrope,sans-serif' }}>
      <GlobalStyles />
      <BlobBg />

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        userName={userName}
        userEmail={userEmail}
        onLogout={handleLogout}
      />

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            width: 44,
            height: 44,
            borderRadius: 12,
            background: G.glass80,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${G.border60}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 100,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          <Menu size={20} style={{ color: C.darkNavy }} />
        </button>
      )}

      {/* Main Content Container */}
      <div style={{ 
        marginLeft: contentMarginLeft, 
        position:'relative', 
        zIndex:1, 
        maxWidth: isMobile ? '100%' : 1100, 
        margin:'0 auto 0 ' + contentMarginLeft, 
        padding: isMobile ? '80px 16px 60px' : '32px 20px 60px' 
      }}>

        {/* ── PAGE HEADER ── */}
        <motion.div 
          initial={{opacity:0,y:-18}} 
          animate={{opacity:1,y:0}} 
          transition={{duration:.6}} 
          style={{marginBottom: isMobile ? 24 : 32, textAlign: isMobile ? 'center' : 'left'}}
        >
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:G.glass40, border:`1px solid ${G.border60}`,
            backdropFilter:'blur(10px)', borderRadius:50,
            padding:'6px 16px', marginBottom:14,
            marginLeft: isMobile ? 'auto' : 0,
            marginRight: isMobile ? 'auto' : 0,
          }}>
            <Sparkles size={14} style={{color:C.blue}}/>
            <span style={{fontSize:12, fontWeight:700, color:C.darkNavy, letterSpacing:.5}}>Your Personal Dashboard</span>
          </div>

          <h1 style={{
            fontFamily:'Sora,sans-serif',
            fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(32px, 4vw, 44px)',
            fontWeight:800, margin:'0 0 8px',
            background:G.heading,
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundClip:'text',
          }}>
            Welcome back, {userName?.split(' ')[0] || 'Explorer'}!
          </h1>
          <p style={{fontSize: isMobile ? 13 : 15, color:`rgba(26,54,93,0.8)`, fontWeight:500, margin:0}}>
            Track your journey and celebrate every milestone
          </p>
        </motion.div>

        {/* ── PROFILE CARD ── */}
        <motion.div 
          initial={{opacity:0,y:28}} 
          animate={{opacity:1,y:0}} 
          transition={{duration:.7}}
          style={{
            background:G.glass80, backdropFilter:'blur(20px)',
            border:`1px solid ${G.border60}`,
            borderRadius:28, overflow:'hidden',
            boxShadow:'0 20px 60px rgba(26,54,93,0.12)',
            marginBottom: isMobile ? 20 : 28,
          }}>

          {/* Banner */}
          <div style={{ 
            height: isMobile ? 100 : 180, 
            background:G.banner, 
            position:'relative', 
            overflow:'hidden' 
          }}>
            <div style={{
              position:'absolute', top:16, right:24,
              background:'rgba(255,255,255,0.2)', borderRadius:'50%',
              width: isMobile ? 150 : 260, height: isMobile ? 150 : 260, filter:'blur(50px)',
            }}/>
            <div style={{ 
              position:'absolute', bottom:0, left:0,
              width: isMobile ? 200 : 320, height: isMobile ? 200 : 320, borderRadius:'50%',
              background:'rgba(74,144,226,0.4)', filter:'blur(60px)',
            }}/>

            <div style={{ position:'absolute', top:12, right:12, display:'flex', gap:8 }}>
              {[Share2, Edit3].map((Icon,i) => (
                <button key={i} onClick={i===1?()=>setEditMode(!editMode):undefined}
                  style={{
                    background:'rgba(255,255,255,0.25)', border:`1px solid rgba(255,255,255,0.4)`,
                    borderRadius:'50%', width: isMobile ? 32 : 36, height: isMobile ? 32 : 36,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer',
                  }}>
                  <Icon size={isMobile ? 13 : 15} color="#fff"/>
                </button>
              ))}
            </div>
          </div>

          {/* Profile section */}
          <div style={{ padding: isMobile ? '0 20px 20px' : '0 32px 32px' }}>
            <div style={{ 
              display:'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'center' : 'flex-end', 
              gap: isMobile ? 16 : 24, 
              marginTop: isMobile ? -40 : -56 
            }}>

              {/* Avatar */}
              <div className="profile-avatar" style={{ position:'relative', flexShrink:0 }}>
                <div style={{
                  width: isMobile ? 80 : 108, 
                  height: isMobile ? 80 : 108, 
                  borderRadius: isMobile ? 18 : 22,
                  overflow:'hidden', border:'4px solid white',
                  boxShadow:'0 8px 32px rgba(26,54,93,0.2)',
                  background:`linear-gradient(135deg,${C.blue},${C.lightBlue})`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {profilePhoto
                    ? <img src={profilePhoto} alt="Profile" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    : <span style={{color:'#fff',fontSize: isMobile ? 28 : 32, fontWeight:800, fontFamily:'Sora,sans-serif'}}>{getInitials()}</span>
                  }
                </div>
                <label style={{
                  position:'absolute', bottom:-4, right:-4,
                  background:'white', borderRadius:'50%', width: isMobile ? 26 : 30, height: isMobile ? 26 : 30,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', boxShadow:'0 2px 10px rgba(0,0,0,0.15)',
                }}>
                  <Camera size={isMobile ? 12 : 14} style={{color:C.darkNavy}}/>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{display:'none'}}/>
                </label>
              </div>

              {/* Name & meta */}
              <div style={{ paddingTop: isMobile ? 0 : 28, flex:1, textAlign: isMobile ? 'center' : 'left' }}>
                <h2 style={{ 
                  fontFamily:'Sora,sans-serif', 
                  fontSize: isMobile ? 20 : 24, 
                  fontWeight:800, 
                  color:C.darkNavy, 
                  margin:'0 0 8px' 
                }}>
                  {userName || 'Nomad Explorer'}
                </h2>
                <div style={{ 
                  display:'flex', 
                  flexWrap:'wrap', 
                  gap: isMobile ? 12 : 16, 
                  marginBottom:10,
                  justifyContent: isMobile ? 'center' : 'flex-start'
                }}>
                  {[[Mail,userEmail||'Add your email'],[MapPin,'Coimbatore, India']].map(([Icon,text],i)=>(
                    <span key={i} style={{ display:'flex', alignItems:'center', gap:5, fontSize: isMobile ? 11 : 13, color:`rgba(26,54,93,0.7)` }}>
                      <Icon size={isMobile ? 11 : 13}/> {text}
                    </span>
                  ))}
                </div>
                <div style={{ display:'flex', gap:8, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                  {[isComplete?'Champion':'Explorer', catDetail?.title].filter(Boolean).map((label,i)=>(
                    <span key={i} style={{
                      padding:'3px 12px', borderRadius:50, fontSize: isMobile ? 10 : 11, fontWeight:700,
                      background:`rgba(43,108,176,0.12)`,
                      border:`1px solid rgba(43,108,176,0.3)`,
                      color:C.darkNavy,
                    }}>{label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{
              marginTop: isMobile ? 20 : 24, 
              padding: isMobile ? 14 : 18, 
              borderRadius:16,
              background:'linear-gradient(to right, rgba(43,108,176,0.08), rgba(74,144,226,0.08))',
              border:`1px solid rgba(43,108,176,0.18)`,
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontWeight:700, fontSize: isMobile ? 11 : 13, color:C.darkNavy }}>Journey Progress</span>
                <span style={{ fontWeight:800, fontSize: isMobile ? 11 : 13, color:C.blue }}>{completionPercent}%</span>
              </div>
              <div style={{ height: isMobile ? 6 : 10, borderRadius:99, background:'rgba(255,255,255,0.6)', overflow:'hidden' }}>
                <motion.div
                  initial={{width:0}} animate={{width:`${completionPercent}%`}} transition={{duration:1.6}}
                  style={{
                    height:'100%', borderRadius:99,
                    background:`linear-gradient(to right, ${C.blue}, ${C.lightBlue}, ${C.darkNavy})`,
                  }}
                />
              </div>
              <p style={{ fontSize: isMobile ? 10 : 12, color:`rgba(26,54,93,0.65)`, marginTop:6, textAlign: isMobile ? 'center' : 'left' }}>
                {isComplete ? '🎉 You completed your Ikigai journey!' : `${6-completedDays.length} days left to complete your journey`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── STATS ── */}
        <div style={{ 
          display:'grid', 
          gridTemplateColumns: isMobile 
            ? 'repeat(auto-fill, minmax(160px, 1fr))' 
            : 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: isMobile ? 12 : 14, 
          marginBottom: isMobile ? 20 : 28 
        }}>
          {stats.map((s,i) => {
            const Icon = s.icon;
            return (
              <Glass key={i} className="stat-card" style={{ borderRadius: isMobile ? 16 : 18, padding: isMobile ? '16px 14px' : '20px 18px' }}>
                <div style={{
                  width: isMobile ? 36 : 44, 
                  height: isMobile ? 36 : 44, 
                  borderRadius: isMobile ? 10 : 12, 
                  marginBottom: isMobile ? 8 : 12,
                  background:`linear-gradient(135deg,${s.g1},${s.g2})`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon size={isMobile ? 16 : 20} color="#fff"/>
                </div>
                <div style={{ 
                  fontFamily:'Sora,sans-serif', 
                  fontSize: isMobile ? 18 : 22, 
                  fontWeight:800, 
                  color:C.darkNavy, 
                  marginBottom: isMobile ? 2 : 3 
                }}>{s.value}</div>
                <div style={{ fontSize: isMobile ? 10 : 12, fontWeight:600, color:`rgba(26,54,93,0.65)` }}>{s.label}</div>
              </Glass>
            );
          })}
        </div>

        {/* ── TABS ── */}
        <div style={{ 
          display:'flex', 
          gap: isMobile ? 6 : 8, 
          marginBottom: isMobile ? 16 : 20, 
          overflowX:'auto', 
          paddingBottom:4,
          WebkitOverflowScrolling: 'touch'
        }}>
          {[{id:'overview',label:'Overview',icon:BookOpen},{id:'achievements',label:'Achievements',icon:Trophy},{id:'results',label:'Results',icon:Sparkles}].map(tab=>{
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} className="tab-btn"
                onClick={()=>setActiveTab(tab.id)}
                style={{
                  display:'flex', alignItems:'center', gap: isMobile ? 5 : 7,
                  padding: isMobile ? '8px 14px' : '10px 20px', 
                  borderRadius: isMobile ? 10 : 12, 
                  border:'none',
                  cursor:'pointer', 
                  fontSize: isMobile ? 11 : 13, 
                  fontWeight:700,
                  fontFamily:'Manrope,sans-serif', 
                  whiteSpace:'nowrap',
                  background: active ? G.btn : G.glass80,
                  color: active ? '#fff' : C.darkNavy,
                  boxShadow: active ? `0 4px 16px rgba(43,108,176,0.35)` : 'none',
                }}>
                <Icon size={isMobile ? 12 : 14}/> {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── TAB CONTENT ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
              <Glass style={{ borderRadius: isMobile ? 18 : 20, padding: isMobile ? 20 : 24 }}>
                <h3 style={{ 
                  fontFamily:'Sora,sans-serif', 
                  fontSize: isMobile ? 16 : 18, 
                  fontWeight:700, 
                  color:C.darkNavy, 
                  marginBottom: isMobile ? 14 : 18 
                }}>
                  Recent Activity
                </h3>
                {completedDays.length > 0 ? (
                  <div style={{ display:'flex', flexDirection:'column', gap: isMobile ? 8 : 10 }}>
                    {completedDays.slice(-3).reverse().map(day => (
                      <div key={day} style={{
                        display:'flex', alignItems:'center', gap: isMobile ? 10 : 14,
                        padding: isMobile ? '10px 12px' : '12px 14px', 
                        borderRadius: isMobile ? 12 : 14,
                        background:G.glass50,
                      }}>
                        <div style={{
                          width: isMobile ? 28 : 34, 
                          height: isMobile ? 28 : 34, 
                          borderRadius:'50%',
                          background:C.success, 
                          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                        }}>
                          <CheckCircle size={isMobile ? 13 : 17} color="#fff"/>
                        </div>
                        <div style={{ flex:1 }}>
                          <p style={{ fontWeight:700, fontSize: isMobile ? 12 : 14, color:C.darkNavy, margin:0 }}>Day {day} Completed</p>
                          <p style={{ fontSize: isMobile ? 10 : 12, color:`rgba(26,54,93,0.6)`, margin:0 }}>Great progress on your Ikigai journey</p>
                        </div>
                        <ChevronRight size={isMobile ? 13 : 15} style={{color:`rgba(26,54,93,0.4)`}}/>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign:'center', padding: isMobile ? '30px 0' : '40px 0' }}>
                    <BookOpen size={isMobile ? 28 : 36} style={{color:C.blue, margin:'0 auto 12px', display:'block'}}/>
                    <p style={{ fontSize: isMobile ? 12 : 14, color:`rgba(26,54,93,0.6)` }}>No activity yet. Start your journey today!</p>
                  </div>
                )}
              </Glass>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div key="achievements" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(220px, 1fr))', gap: isMobile ? 12 : 14 }}>
              {achievements.map(ach => {
                const Icon = ach.icon;
                return (
                  <Glass key={ach.id} className="ach-card" style={{ borderRadius: isMobile ? 16 : 18, padding: isMobile ? '16px 14px' : '20px 18px' }}>
                    <div style={{
                      width: isMobile ? 44 : 52, 
                      height: isMobile ? 44 : 52, 
                      borderRadius: isMobile ? 12 : 16, 
                      marginBottom: isMobile ? 10 : 14,
                      background: ach.unlocked ? ach.color : 'rgba(180,180,180,0.4)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <Icon size={isMobile ? 20 : 24} color="#fff"/>
                    </div>
                    <h4 style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize: isMobile ? 13 : 15, color:C.darkNavy, marginBottom: 4 }}>{ach.title}</h4>
                    <p style={{ fontSize: isMobile ? 10 : 12, color:`rgba(26,54,93,0.6)`, margin:0 }}>{ach.desc}</p>
                    {!ach.unlocked && <p style={{ fontSize: isMobile ? 9 : 11, color:`rgba(26,54,93,0.35)`, marginTop: 6 }}>🔒 Locked</p>}
                  </Glass>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'results' && (
            <motion.div key="results" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
              <Glass style={{ borderRadius: isMobile ? 18 : 20, padding: isMobile ? 24 : 32 }}>
                <h3 style={{ 
                  fontFamily:'Sora,sans-serif', 
                  fontSize: isMobile ? 18 : 20, 
                  fontWeight:700, 
                  color:C.darkNavy, 
                  marginBottom: isMobile ? 8 : 12 
                }}>
                  Your Ikigai Results
                </h3>
                <p style={{ 
                  fontSize: isMobile ? 13 : 15, 
                  lineHeight: isMobile ? 1.65 : 1.75, 
                  color:`rgba(26,54,93,0.8)`, 
                  marginBottom: isMobile ? 20 : 24 
                }}>
                  {result?.summary || 'Complete your journey to unlock your personalized results.'}
                </p>
                <button
                  onClick={()=>navigate('/sevendays')}
                  style={{
                    display:'inline-flex', alignItems:'center', gap:8,
                    padding: isMobile ? '10px 20px' : '12px 24px', 
                    borderRadius: isMobile ? 10 : 12, 
                    border:'none',
                    background:G.btn, color:'#fff',
                    fontFamily:'Sora,sans-serif', fontWeight:700, fontSize: isMobile ? 13 : 14,
                    cursor:'pointer', boxShadow:`0 6px 20px rgba(43,108,176,0.35)`,
                    width: isMobile ? '100%' : 'auto',
                    justifyContent: isMobile ? 'center' : 'flex-start'
                  }}>
                  View Full Results <ArrowRight size={isMobile ? 13 : 15}/>
                </button>
              </Glass>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FOOTER ── */}
        <footer style={{
          marginTop: isMobile ? 32 : 48, 
          paddingTop: isMobile ? 16 : 20,
          borderTop:`1px solid rgba(255,255,255,0.4)`,
          display:'flex', flexWrap:'wrap',
          justifyContent: isMobile ? 'center' : 'space-between', 
          alignItems:'center', 
          gap: isMobile ? 12 : 12,
          textAlign: isMobile ? 'center' : 'left',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <Globe size={isMobile ? 14 : 16} style={{color:C.blue}}/>
            <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize: isMobile ? 12 : 14, color:C.darkNavy }}>
              Nomads<span style={{color:C.blue}}>Advisors</span>
            </span>
          </div>
          <p style={{ fontSize: isMobile ? 10 : 12, color:`rgba(26,54,93,0.55)` }}>
            Built by Get Founds Technologies © {new Date().getFullYear()}
          </p>
          <div style={{ display:'flex', gap: isMobile ? 15 : 20 }}>
            {['Privacy','Terms','Contact'].map(l=>(
              <a key={l} href="#" style={{ fontSize: isMobile ? 10 : 12, color:`rgba(26,54,93,0.55)`, textDecoration:'none' }}>{l}</a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}