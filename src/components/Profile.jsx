import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import { useIkigai } from '../context/IkigaiContext';
import {
  Calendar, Award, Target, TrendingUp, Mail, MapPin, Edit3, Camera,
  Sparkles, Trophy, Flame, Star, ArrowRight, CheckCircle, Compass,
  Rocket, Share2, Crown, BookOpen, ChevronRight, Activity,
  Briefcase, Globe
} from 'lucide-react';

/* ─── DESIGN TOKENS (UPDATED) ─────────────────────────────────────────────── */
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
  // Main gradient background as specified
  bg:      `linear-gradient(to bottom, rgb(214,239,255), rgb(185,226,255), rgb(74,144,226))`,
  btn:     `linear-gradient(to right, rgb(43,108,176), rgb(26,54,93))`,
  heading: `linear-gradient(to right, rgb(26,54,93), rgb(43,108,176), rgb(74,144,226))`,
  banner:  `linear-gradient(to right, rgb(26,54,93), rgb(43,108,176), rgb(74,144,226))`,
  glass80: 'rgba(255,255,255,0.8)',
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
    body { margin: 0; font-family: 'Manrope', sans-serif; }

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
    .profile-avatar { animation: floatAvatar 4s ease-in-out infinite; }
    .tab-btn { transition: all .25s ease; }
    .tab-btn:hover { opacity: .85; }
    .stat-card { transition: transform .3s cubic-bezier(.22,.68,0,1.2), box-shadow .3s ease; }
    .stat-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(43,108,176,.18) !important; }
    .ach-card { transition: transform .3s ease; }
    .ach-card:hover { transform: translateY(-5px); }
  `}</style>
);

/* ─── ANIMATED BLOB BACKGROUND (UPDATED) ───────────────────────────────────── */
const BlobBg = () => (
  <div style={{ position:'fixed', inset:0, zIndex:0, overflow:'hidden', pointerEvents:'none' }}>
    {/* Top-right blob - radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%) */}
    <div style={{
      position:'absolute', top:'-8%', right:'-6%',
      width:520, height:520, borderRadius:'50%',
      background:'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
      animation:'blobDrift 20s ease-in-out infinite',
    }}/>
    {/* Bottom-left blob - radial-gradient(circle, rgba(43,108,176,0.4) 0%, transparent 70%) */}
    <div style={{
      position:'absolute', bottom:'-5%', left:'-10%',
      width:600, height:600, borderRadius:'50%',
      background:'radial-gradient(circle, rgba(43,108,176,0.4) 0%, transparent 70%)',
      animation:'blobDrift 26s ease-in-out infinite reverse',
    }}/>
    {/* Center blur - background: rgba(255,255,255,0.15) */}
    <div style={{
      position:'absolute', top:'30%', left:'35%',
      width:460, height:460, borderRadius:'50%',
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

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function Profile({ user }) {
  const navigate = typeof useNavigate === 'function' ? useNavigate() : () => {};

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

  /* ── RENDER ── */
  return (
    <div style={{ minHeight:'100vh', background:G.bg, position:'relative', fontFamily:'Manrope,sans-serif' }}>
      <GlobalStyles />
      <BlobBg />

      {/* Add left padding to account for fixed navbar (280px width) */}
      <div style={{ marginLeft: '280px', position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto 0 280px', padding:'32px 20px 60px' }}>

        {/* ── PAGE HEADER ── */}
        <motion.div initial={{opacity:0,y:-18}} animate={{opacity:1,y:0}} transition={{duration:.6}} style={{marginBottom:32}}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:G.glass40, border:`1px solid ${G.border60}`,
            backdropFilter:'blur(10px)', borderRadius:50,
            padding:'6px 16px', marginBottom:14,
          }}>
            <Sparkles size={14} style={{color:C.blue}}/>
            <span style={{fontSize:12, fontWeight:700, color:C.darkNavy, letterSpacing:.5}}>Your Personal Dashboard</span>
          </div>

          <h1 style={{
            fontFamily:'Sora,sans-serif',
            fontSize:'clamp(26px,4vw,44px)',
            fontWeight:800, margin:'0 0 8px',
            background:G.heading,
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundClip:'text',
          }}>
            Welcome back, {userName?.split(' ')[0] || 'Explorer'}!
          </h1>
          <p style={{fontSize:15, color:`rgba(26,54,93,0.8)`, fontWeight:500, margin:0}}>
            Track your journey and celebrate every milestone
          </p>
        </motion.div>

        {/* ── PROFILE CARD ── */}
        <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.7}}
          style={{
            background:G.glass80, backdropFilter:'blur(20px)',
            border:`1px solid ${G.border60}`,
            borderRadius:28, overflow:'hidden',
            boxShadow:'0 20px 60px rgba(26,54,93,0.12)',
            marginBottom:28,
          }}>

          {/* Banner */}
          <div style={{ height:180, background:G.banner, position:'relative', overflow:'hidden' }}>
            <div style={{
              position:'absolute', top:16, right:24,
              background:'rgba(255,255,255,0.2)', borderRadius:'50%',
              width:260, height:260, filter:'blur(50px)',
            }}/>
            <div style={{ position:'absolute', bottom:0, left:0,
              width:320, height:320, borderRadius:'50%',
              background:'rgba(74,144,226,0.4)', filter:'blur(60px)',
            }}/>

            <div style={{ position:'absolute', top:12, right:12, display:'flex', gap:8 }}>
              {[Share2, Edit3].map((Icon,i) => (
                <button key={i} onClick={i===1?()=>setEditMode(!editMode):undefined}
                  style={{
                    background:'rgba(255,255,255,0.25)', border:`1px solid rgba(255,255,255,0.4)`,
                    borderRadius:'50%', width:36, height:36,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer',
                  }}>
                  <Icon size={15} color="#fff"/>
                </button>
              ))}
            </div>
          </div>

          {/* Profile section */}
          <div style={{ padding:'0 32px 32px' }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:24, marginTop:-56 }}>

              {/* Avatar */}
              <div className="profile-avatar" style={{ position:'relative', flexShrink:0 }}>
                <div style={{
                  width:108, height:108, borderRadius:22,
                  overflow:'hidden', border:'4px solid white',
                  boxShadow:'0 8px 32px rgba(26,54,93,0.2)',
                  background:`linear-gradient(135deg,${C.blue},${C.lightBlue})`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {profilePhoto
                    ? <img src={profilePhoto} alt="Profile" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    : <span style={{color:'#fff',fontSize:32,fontWeight:800,fontFamily:'Sora,sans-serif'}}>{getInitials()}</span>
                  }
                </div>
                <label style={{
                  position:'absolute', bottom:-4, right:-4,
                  background:'white', borderRadius:'50%', width:30, height:30,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', boxShadow:'0 2px 10px rgba(0,0,0,0.15)',
                }}>
                  <Camera size={14} style={{color:C.darkNavy}}/>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{display:'none'}}/>
                </label>
              </div>

              {/* Name & meta */}
              <div style={{ paddingTop:28, flex:1 }}>
                <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:24, fontWeight:800, color:C.darkNavy, margin:'0 0 8px' }}>
                  {userName || 'Nomad Explorer'}
                </h2>
                <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:10 }}>
                  {[[Mail,userEmail||'Add your email'],[MapPin,'Coimbatore, India']].map(([Icon,text],i)=>(
                    <span key={i} style={{ display:'flex', alignItems:'center', gap:5, fontSize:13, color:`rgba(26,54,93,0.7)` }}>
                      <Icon size={13}/> {text}
                    </span>
                  ))}
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  {[isComplete?'Champion':'Explorer', catDetail?.title].filter(Boolean).map((label,i)=>(
                    <span key={i} style={{
                      padding:'3px 12px', borderRadius:50, fontSize:11, fontWeight:700,
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
              marginTop:24, padding:18, borderRadius:16,
              background:'linear-gradient(to right, rgba(43,108,176,0.08), rgba(74,144,226,0.08))',
              border:`1px solid rgba(43,108,176,0.18)`,
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontWeight:700, fontSize:13, color:C.darkNavy }}>Journey Progress</span>
                <span style={{ fontWeight:800, fontSize:13, color:C.blue }}>{completionPercent}%</span>
              </div>
              <div style={{ height:10, borderRadius:99, background:'rgba(255,255,255,0.6)', overflow:'hidden' }}>
                <motion.div
                  initial={{width:0}} animate={{width:`${completionPercent}%`}} transition={{duration:1.6}}
                  style={{
                    height:'100%', borderRadius:99,
                    background:`linear-gradient(to right, ${C.blue}, ${C.lightBlue}, ${C.darkNavy})`,
                  }}
                />
              </div>
              <p style={{ fontSize:12, color:`rgba(26,54,93,0.65)`, marginTop:6 }}>
                {isComplete ? '🎉 You completed your Ikigai journey!' : `${6-completedDays.length} days left to complete your journey`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── STATS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:14, marginBottom:28 }}>
          {stats.map((s,i) => {
            const Icon = s.icon;
            return (
              <Glass key={i} className="stat-card" style={{ borderRadius:18, padding:'20px 18px' }}>
                <div style={{
                  width:44, height:44, borderRadius:12, marginBottom:12,
                  background:`linear-gradient(135deg,${s.g1},${s.g2})`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon size={20} color="#fff"/>
                </div>
                <div style={{ fontFamily:'Sora,sans-serif', fontSize:22, fontWeight:800, color:C.darkNavy, marginBottom:3 }}>{s.value}</div>
                <div style={{ fontSize:12, fontWeight:600, color:`rgba(26,54,93,0.65)` }}>{s.label}</div>
              </Glass>
            );
          })}
        </div>

        {/* ── TABS ── */}
        <div style={{ display:'flex', gap:8, marginBottom:20, overflowX:'auto', paddingBottom:4 }}>
          {[{id:'overview',label:'Overview',icon:BookOpen},{id:'achievements',label:'Achievements',icon:Trophy},{id:'results',label:'Results',icon:Sparkles}].map(tab=>{
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} className="tab-btn"
                onClick={()=>setActiveTab(tab.id)}
                style={{
                  display:'flex', alignItems:'center', gap:7,
                  padding:'10px 20px', borderRadius:12, border:'none',
                  cursor:'pointer', fontSize:13, fontWeight:700,
                  fontFamily:'Manrope,sans-serif', whiteSpace:'nowrap',
                  background: active ? G.btn : G.glass80,
                  color: active ? '#fff' : C.darkNavy,
                  boxShadow: active ? `0 4px 16px rgba(43,108,176,0.35)` : 'none',
                }}>
                <Icon size={14}/> {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── TAB CONTENT ── */}
        <AnimatePresence mode="wait">

          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
              <Glass style={{ borderRadius:20, padding:24 }}>
                <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:18, fontWeight:700, color:C.darkNavy, marginBottom:18 }}>
                  Recent Activity
                </h3>
                {completedDays.length > 0 ? (
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    {completedDays.slice(-3).reverse().map(day => (
                      <div key={day} style={{
                        display:'flex', alignItems:'center', gap:14,
                        padding:'12px 14px', borderRadius:14,
                        background:G.glass50,
                      }}>
                        <div style={{
                          width:34, height:34, borderRadius:'50%',
                          background:C.success, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                        }}>
                          <CheckCircle size={17} color="#fff"/>
                        </div>
                        <div style={{ flex:1 }}>
                          <p style={{ fontWeight:700, fontSize:14, color:C.darkNavy, margin:0 }}>Day {day} Completed</p>
                          <p style={{ fontSize:12, color:`rgba(26,54,93,0.6)`, margin:0 }}>Great progress on your Ikigai journey</p>
                        </div>
                        <ChevronRight size={15} style={{color:`rgba(26,54,93,0.4)`}}/>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign:'center', padding:'40px 0' }}>
                    <BookOpen size={36} style={{color:C.blue, margin:'0 auto 12px', display:'block'}}/>
                    <p style={{ fontSize:14, color:`rgba(26,54,93,0.6)` }}>No activity yet. Start your journey today!</p>
                  </div>
                )}
              </Glass>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div key="achievements" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:14 }}>
              {achievements.map(ach => {
                const Icon = ach.icon;
                return (
                  <Glass key={ach.id} className="ach-card" style={{ borderRadius:18, padding:'20px 18px' }}>
                    <div style={{
                      width:52, height:52, borderRadius:16, marginBottom:14,
                      background: ach.unlocked ? ach.color : 'rgba(180,180,180,0.4)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <Icon size={24} color="#fff"/>
                    </div>
                    <h4 style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:15, color:C.darkNavy, marginBottom:4 }}>{ach.title}</h4>
                    <p style={{ fontSize:12, color:`rgba(26,54,93,0.6)`, margin:0 }}>{ach.desc}</p>
                    {!ach.unlocked && <p style={{ fontSize:11, color:`rgba(26,54,93,0.35)`, marginTop:6 }}>🔒 Locked</p>}
                  </Glass>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'results' && (
            <motion.div key="results" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
              <Glass style={{ borderRadius:20, padding:32 }}>
                <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:20, fontWeight:700, color:C.darkNavy, marginBottom:12 }}>
                  Your Ikigai Results
                </h3>
                <p style={{ fontSize:15, lineHeight:1.75, color:`rgba(26,54,93,0.8)`, marginBottom:24 }}>
                  {result?.summary || 'Complete your journey to unlock your personalized results.'}
                </p>
                <button
                  onClick={()=>navigate('/sevendays')}
                  style={{
                    display:'inline-flex', alignItems:'center', gap:8,
                    padding:'12px 24px', borderRadius:12, border:'none',
                    background:G.btn, color:'#fff',
                    fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:14,
                    cursor:'pointer', boxShadow:`0 6px 20px rgba(43,108,176,0.35)`,
                  }}>
                  View Full Results <ArrowRight size={15}/>
                </button>
              </Glass>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FOOTER ── */}
        <footer style={{
          marginTop:48, paddingTop:20,
          borderTop:`1px solid rgba(255,255,255,0.4)`,
          display:'flex', flexWrap:'wrap',
          justifyContent:'space-between', alignItems:'center', gap:12,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <Globe size={16} style={{color:C.blue}}/>
            <span style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:14, color:C.darkNavy }}>
              Nomads<span style={{color:C.blue}}>Advisors</span>
            </span>
          </div>
          <p style={{ fontSize:12, color:`rgba(26,54,93,0.55)` }}>
            Built by Get Founds Technologies © {new Date().getFullYear()}
          </p>
          <div style={{ display:'flex', gap:20 }}>
            {['Privacy','Terms','Contact'].map(l=>(
              <a key={l} href="#" style={{ fontSize:12, color:`rgba(26,54,93,0.55)`, textDecoration:'none' }}>{l}</a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}