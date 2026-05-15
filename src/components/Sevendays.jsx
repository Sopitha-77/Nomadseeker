
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import questionsData from '../data/questions.js'; // Import the actual questions data

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const C = {
  darkNavy:  'rgb(26,54,93)',
  blue:      'rgb(43,108,176)',
  lightBlue: 'rgb(74,144,226)',
  pale1:     'rgb(214,239,255)',
  pale2:     'rgb(185,226,255)',
  success:   'rgb(34,197,94)',
  error:     'rgb(239,68,68)',
};
const G = {
  bg:       `linear-gradient(to bottom, ${C.pale1}, ${C.pale2}, ${C.lightBlue})`,
  btn:      `linear-gradient(to right, ${C.blue}, ${C.darkNavy})`,
  heading:  `linear-gradient(135deg, ${C.darkNavy}, ${C.blue}, ${C.lightBlue})`,
  glass80:  'rgba(255,255,255,0.80)',
  glass65:  'rgba(255,255,255,0.65)',
  glass50:  'rgba(255,255,255,0.50)',
  glass40:  'rgba(255,255,255,0.40)',
  glass15:  'rgba(255,255,255,0.15)',
  border60: 'rgba(255,255,255,0.6)',
  border40: 'rgba(255,255,255,0.4)',
  blueBorder:'rgba(74,144,226,0.3)',
};

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:'Manrope',sans-serif; overflow-x:hidden; }
    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background:rgba(185,226,255,0.3); }
    ::-webkit-scrollbar-thumb { background:linear-gradient(180deg,rgb(74,144,226),rgb(43,108,176)); border-radius:4px; }

    @keyframes blobDrift  { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-25px,35px) scale(0.95)} }
    @keyframes floatSlow  { 0%,100%{transform:translateY(0) translateX(0)} 33%{transform:translateY(-18px) translateX(12px)} 66%{transform:translateY(12px) translateX(-12px)} }
    @keyframes float3     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes spinRing   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes pulseGlow  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.95)} }
    @keyframes fadeUp     { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn    { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
    @keyframes celebSlide { from{opacity:0;transform:translateY(36px) scale(.94)} to{opacity:1;transform:translateY(0) scale(1)} }
    @keyframes starPop    { 0%{transform:scale(0) rotate(-20deg);opacity:0} 60%{transform:scale(1.2) rotate(8deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
    @keyframes pulseDot   { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.6} }
    @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
    @keyframes roleCardIn { from{opacity:0;transform:translateY(32px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }

    .btn-primary { transition:transform .25s ease,box-shadow .25s ease; }
    .btn-primary:hover { transform:translateY(-3px); }
    .role-card { transition:all .3s cubic-bezier(.22,.68,0,1.2); }
    .role-card:hover { transform:translateY(-8px); }
    .sidebar-item { transition:all .25s ease; }
    .sidebar-item:hover { background:rgba(74,144,226,0.08); }
  `}</style>
);

/* ─── BLOB BACKGROUND ───────────────────────────────────────── */
const BlobBg = () => (
  <div style={{position:'fixed',inset:0,zIndex:0,overflow:'hidden',pointerEvents:'none'}}>
    <div style={{position:'absolute',top:'-8%',left:'-6%',width:520,height:520,borderRadius:'50%',
      background:'radial-gradient(circle,rgba(255,255,255,0.5) 0%,transparent 70%)',
      animation:'blobDrift 20s ease-in-out infinite'}}/>
    <div style={{position:'absolute',top:'30%',right:'-10%',width:600,height:600,borderRadius:'50%',
      background:'radial-gradient(circle,rgba(43,108,176,0.4) 0%,transparent 70%)',
      animation:'blobDrift 26s ease-in-out infinite reverse'}}/>
    <div style={{position:'absolute',bottom:'5%',left:'35%',width:460,height:460,borderRadius:'50%',
      background:G.glass15,filter:'blur(60px)',animation:'blobDrift 32s ease-in-out infinite'}}/>
    <div style={{position:'absolute',top:'45%',right:'15%',width:300,height:300,borderRadius:'50%',
      background:'radial-gradient(circle,rgba(74,144,226,0.18),transparent 70%)',
      filter:'blur(40px)',animation:'blobDrift 38s ease-in-out infinite'}}/>
  </div>
);

/* ─── FLOATING PARTICLES ────────────────────────────────────── */
const FloatingParticles = () => (
  <div style={{position:'fixed',inset:0,zIndex:0,overflow:'hidden',pointerEvents:'none'}}>
    {Array.from({length:18},(_,i)=>({
      left:`${(i*31)%100}`, top:`${(i*47)%100}`,
      size:2+(i%4),dur:18+(i%8),delay:-(i%10),
    })).map((p,i)=>(
      <div key={i} style={{
        position:'absolute', left:`${p.left}%`, top:`${p.top}%`,
        width:p.size, height:p.size, borderRadius:'50%',
        background:`rgba(74,144,226,${.1+(i%4)*.07})`,
        animation:`floatSlow ${p.dur}s ease-in-out infinite`,
        animationDelay:`${p.delay}s`,
      }}/>
    ))}
  </div>
);

/* ─── CONFETTI ──────────────────────────────────────────────── */
const Confetti = ({count=60}) => {
  const cols=[C.darkNavy,C.blue,C.lightBlue,'#fff','#FFD700','#F43F5E',C.pale2];
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:200,overflow:'hidden'}}>
      {Array.from({length:count},(_,i)=>(
        <motion.div key={i}
          initial={{y:-20,x:`${(i*13)%100}vw`,rotate:0,opacity:1}}
          animate={{y:'110vh',rotate:720,opacity:0}}
          transition={{duration:2.4+(i%3)*.4,delay:(i%12)*.07,ease:'easeOut'}}
          style={{position:'absolute',width:6+(i%7),height:6+(i%7),
            borderRadius:i%2===0?'50%':'2px',background:cols[i%cols.length]}}
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

/* ─── NAVBAR (MINIMAL STICKY TOP) ─────────────────────────────────── */
const Navbar = ({screen,completedDays,allDays,currentDay,roleMeta,isMobile}) => {
  if (screen==='landing') return null;
  return (
    <div style={{
      background:G.glass80, backdropFilter:'blur(16px)',
      borderBottom:`1px solid rgba(74,144,226,0.2)`,
      padding:'0 16px', height:56,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      position:'sticky', top:0, zIndex:100,
    }}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:20}}>☯</span>
        <span style={{fontFamily:'Sora,sans-serif',fontSize:isMobile?13:16,fontWeight:700,
          background:G.heading,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
          Ikigai Journey
        </span>
        {roleMeta?.label && screen!=='roleSelect' && !isMobile && (
          <span style={{padding:'3px 10px',borderRadius:99,fontSize:10,fontWeight:700,
            background:'rgba(74,144,226,0.12)',color:C.blue,
            border:`1px solid rgba(74,144,226,0.25)`}}>
            {roleMeta.icon} {roleMeta.label}
          </span>
        )}
      </div>
      {screen==='journey' && !isMobile && (
        <div style={{display:'flex',alignItems:'center',gap:4}}>
          {allDays.map(d=>{
            const done=completedDays.includes(d.day);
            const active=currentDay===d.day;
            return (
              <div key={d.day} style={{
                width:active?20:6,height:6,borderRadius:99,
                background:done?d.color:active?d.color:'rgba(0,0,0,0.1)',
                transition:'all .35s ease',
                boxShadow:active?`0 0 0 2px ${d.color}28`:'none',
              }}/>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ─── SIDEBAR ────────────────────────────────────────────────── */
const Sidebar = ({allDays,currentDay,completedDays,roleMeta}) => (
  <div style={{width:220,flexShrink:0,display:{xs:'none', md:'block'}}}>
    <div style={{
      position:'sticky',top:72,
      background:G.glass80, backdropFilter:'blur(16px)',
      borderRadius:20, padding:'18px 14px',
      boxShadow:'0 4px 28px rgba(26,54,93,0.08)',
      border:`1px solid rgba(74,144,226,0.2)`,
    }}>
      {roleMeta?.label && (
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16,padding:'7px 10px',
          background:'rgba(74,144,226,0.08)',borderRadius:10,border:`1px solid rgba(74,144,226,0.18)`}}>
          <span style={{fontSize:15}}>{roleMeta.icon}</span>
          <div>
            <div style={{fontSize:10,fontWeight:800,letterSpacing:1.5,textTransform:'uppercase',color:C.blue}}>{roleMeta.label}</div>
            <div style={{fontSize:10,color:`rgba(26,54,93,0.45)`}}>Your path</div>
          </div>
        </div>
      )}
      <div style={{fontSize:10,fontWeight:800,letterSpacing:2.5,textTransform:'uppercase',marginBottom:14,
        background:`linear-gradient(90deg,${C.blue},${C.lightBlue})`,
        WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
        Your Journey
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:5}}>
        {allDays.map(d=>{
          const done=completedDays.includes(d.day);
          const active=currentDay===d.day;
          return (
            <div key={d.day} className="sidebar-item" style={{
              display:'flex',alignItems:'center',gap:8,
              padding:'8px 10px',borderRadius:12,
              background:active?`${d.color}12`:'transparent',
              border:`1.5px solid ${active?d.color+'30':'transparent'}`,
            }}>
              <div style={{
                width:28,height:28,borderRadius:'50%',flexShrink:0,
                background:done?`linear-gradient(135deg,${d.color},${d.color}bb)`:active?`${d.color}15`:'rgba(0,0,0,0.05)',
                border:`2px solid ${done||active?d.color:'rgba(0,0,0,0.1)'}`,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:done?10:12,color:done?'#fff':d.color,
                boxShadow:active?`0 2px 10px ${d.color}30`:'none',
                transition:'all .25s ease',
              }}>
                {done?'✓':d.icon}
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:active?700:done?500:400,lineHeight:1.3,
                  color:active?d.color:done?`rgba(26,54,93,0.55)`:`rgba(26,54,93,0.3)`}}>
                  {d.title}
                </div>
                {active&&<div style={{fontSize:10,color:`rgba(26,54,93,0.4)`,marginTop:1}}>{d.subtitle}</div>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{marginTop:18,padding:'12px',
        background:'linear-gradient(135deg,rgba(74,144,226,0.08),rgba(43,108,176,0.05))',
        borderRadius:12,borderLeft:`3px solid ${C.lightBlue}`}}>
        <p style={{fontSize:11,color:`rgba(26,54,93,0.6)`,lineHeight:1.65,fontStyle:'italic',margin:0}}>
          "The place where your talents and the world's needs cross — there lies your vocation."
        </p>
        <p style={{fontSize:10,color:`rgba(26,54,93,0.35)`,marginTop:5}}>— Aristotle</p>
      </div>
    </div>
  </div>
);

/* ─── LOADING ────────────────────────────────────────────────── */
const LoadingScreen = () => {
  const msgs=['Gathering your passions…','Mapping your strengths…','Weaving your purpose…','Almost ready…'];
  const [phase,setPhase]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setPhase(p=>(p+1)%msgs.length),1900);return()=>clearInterval(t);},[]);
  return (
    <div style={{textAlign:'center',padding:'80px 20px'}}>
      <div style={{position:'relative',width:90,height:90,margin:'0 auto 28px'}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{
            position:'absolute',inset:i*11,borderRadius:'50%',
            border:`2.5px solid ${[C.lightBlue,C.blue,C.darkNavy][i]}`,
            opacity:.3+i*.25,
            animation:`spinRing ${1.4+i*.45}s linear infinite ${i%2?'reverse':''}`,
          }}/>
        ))}
        <div style={{
          position:'absolute',inset:33,borderRadius:'50%',
          background:`linear-gradient(135deg,${C.lightBlue},${C.blue})`,
          animation:'pulseGlow 1.6s ease-in-out infinite',
        }}/>
      </div>
      <h3 style={{fontFamily:'Sora,sans-serif',fontSize:24,fontWeight:800,
        background:G.heading,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
        marginBottom:12}}>Revealing your Ikigai</h3>
      <p style={{fontSize:15,color:`rgba(26,54,93,0.5)`}}>{msgs[phase]}</p>
    </div>
  );
};

/* ─── LANDING ────────────────────────────────────────────────── */
const Landing = ({onStart}) => {
  const days=[
    {icon:'♡',label:'Passion',    color:C.lightBlue},
    {icon:'◎',label:'Lifestyle',  color:C.blue},
    {icon:'◈',label:'Skills',     color:C.darkNavy},
    {icon:'◆',label:'Career',     color:C.lightBlue},
    {icon:'✦',label:'Purpose',    color:C.blue},
    {icon:'◉',label:'Vision',     color:C.darkNavy},
  ];
  return (
    <div style={{textAlign:'center',padding:'clamp(40px,7vw,72px) 16px clamp(36px,5vw,56px)',animation:'fadeUp .7s ease both'}}>
      <div style={{display:'inline-block',padding:'6px 22px',borderRadius:99,
        background:'rgba(74,144,226,0.12)',border:`1.5px solid rgba(74,144,226,0.35)`,
        fontSize:12,color:C.blue,marginBottom:22,fontWeight:800,letterSpacing:.5}}>
        6-Day Self-Discovery Journey
      </div>
      <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(34px,6vw,60px)',
        background:G.heading,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
        marginBottom:18,lineHeight:1.12,letterSpacing:'-.02em'}}>
        Discover Your<br/><em>Ikigai</em>
      </h1>
      <p style={{fontSize:'clamp(14px,2vw,17px)',color:`rgba(26,54,93,0.7)`,lineHeight:1.8,
        maxWidth:520,margin:'0 auto 10px'}}>
        A personalised 6-day journey to discover your true purpose — tailored to your unique role and ambitions.
      </p>
      <p style={{fontSize:13,color:`rgba(26,54,93,0.5)`,marginBottom:36}}>
        Choose your path. Answer honestly. Your results will be uniquely yours.
      </p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8,maxWidth:560,margin:'0 auto 36px'}}>
        {days.map((d,i)=>(
          <div key={d.label}
            style={{padding:'12px 4px',borderRadius:16,textAlign:'center',
              background:G.glass65,backdropFilter:'blur(12px)',
              border:`1.5px solid ${d.color}22`,
              boxShadow:`0 2px 12px ${d.color}10`,
              animation:`fadeUp .6s ease ${.2+i*.06}s both`,
              transition:'transform .2s ease',cursor:'default'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';}}>
            <div style={{fontSize:18,marginBottom:4,color:d.color}}>{d.icon}</div>
            <div style={{fontSize:8,fontWeight:800,color:d.color,textTransform:'uppercase',letterSpacing:.5}}>Day {i+1}</div>
            <div style={{fontSize:7,color:`rgba(26,54,93,0.55)`,fontWeight:400,marginTop:2}}>{d.label}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',gap:9,justifyContent:'center',flexWrap:'wrap',marginBottom:32}}>
        {[{label:'🌍 Entrepreneur',color:C.lightBlue,bg:'rgba(74,144,226,0.1)'},
          {label:'📊 Managerial',  color:C.blue,     bg:'rgba(43,108,176,0.1)'},
          {label:'🔧 Technician',  color:C.darkNavy,  bg:'rgba(26,54,93,0.08)'}].map(r=>(
          <span key={r.label} style={{padding:'6px 14px',borderRadius:99,fontSize:12,
            background:r.bg,color:r.color,border:`1.5px solid ${r.color}33`,fontWeight:700}}>{r.label}</span>
        ))}
      </div>

      <button className="btn-primary" onClick={onStart}
        style={{display:'inline-flex',alignItems:'center',gap:12,padding:'14px 40px',
          borderRadius:50,border:'none',
          background:G.btn,color:'#fff',cursor:'pointer',
          fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:16,
          boxShadow:`0 10px 36px rgba(74,144,226,0.45)`}}>
        Choose Your Path <span style={{fontSize:22}}>→</span>
      </button>
      <p style={{fontSize:12,color:`rgba(26,54,93,0.4)`,marginTop:14}}>Takes about 10–15 minutes · 3 roles to choose from</p>
    </div>
  );
};

/* ─── ROLE SELECT ────────────────────────────────────────────── */
const RoleSelect = ({onSelect}) => {
  const [chosen,setChosen]=useState(null);
  const roles=[
    {id:'entrepreneur',icon:'🌍',name:'Entrepreneur',tagline:'Build & Found',
      desc:'Startups, ventures, independent businesses & bold ideas',
      traits:['Visionary','Risk-taker','Founder'],color:C.lightBlue,bg:'rgba(74,144,226,0.08)',glow:'rgba(74,144,226,0.2)'},
    {id:'managerial',  icon:'📊',name:'Managerial',  tagline:'Lead & Organise',
      desc:'Corporate leadership, team management & process excellence',
      traits:['Leader','Planner','Coordinator'],color:C.blue,bg:'rgba(43,108,176,0.08)',glow:'rgba(43,108,176,0.2)'},
    {id:'technician',  icon:'🔧',name:'Technician',  tagline:'Build & Craft',
      desc:'Software, engineering, product building & technical mastery',
      traits:['Developer','Engineer','Builder'],color:C.darkNavy,bg:'rgba(26,54,93,0.07)',glow:'rgba(26,54,93,0.15)'},
  ];
  return (
    <div style={{textAlign:'center',padding:'clamp(32px,6vw,56px) 16px'}}>
      <div style={{display:'inline-flex',alignItems:'center',gap:8,
        background:'rgba(74,144,226,0.12)',border:`1.5px solid rgba(74,144,226,0.35)`,
        borderRadius:50,padding:'6px 18px',marginBottom:20,fontSize:12,color:C.blue,fontWeight:800,letterSpacing:.5}}>
        <span style={{width:7,height:7,borderRadius:'50%',background:C.lightBlue,display:'inline-block',animation:'pulseDot 2s infinite'}}/>
        Step 1 of 2 — Choose Your Path
      </div>
      <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(26px,5vw,42px)',
        background:G.heading,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
        marginBottom:12,lineHeight:1.2}}>
        Who are you on<br/><em>this journey?</em>
      </h2>
      <p style={{fontSize:'clamp(14px,2vw,16px)',color:`rgba(26,54,93,0.65)`,lineHeight:1.75,maxWidth:440,margin:'0 auto 36px'}}>
        Your questions, insights, and Ikigai will be fully tailored to your role and goals.
      </p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:14,maxWidth:800,margin:'0 auto 36px'}}>
        {roles.map((r,i)=>{
          const sel=chosen===r.id;
          return (
            <div key={r.id} className="role-card"
              onClick={()=>setChosen(r.id)}
              style={{
                padding:'20px 16px',borderRadius:22,cursor:'pointer',textAlign:'center',
                background:sel?r.bg:G.glass80,backdropFilter:'blur(12px)',
                border:`${sel?2:1.5}px solid ${sel?r.color:G.border60}`,
                boxShadow:sel?`0 16px 40px ${r.glow}`:'0 2px 12px rgba(0,0,0,0.05)',
                transform:sel?'translateY(-8px)':'none',
                position:'relative',
                animation:`roleCardIn .55s cubic-bezier(.22,.68,0,1.2) ${.08+i*.1}s both`,
              }}>
              {sel&&<div style={{position:'absolute',top:12,right:12,width:22,height:22,borderRadius:'50%',
                background:r.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:11,fontWeight:800}}>✓</div>}
              <div style={{width:55,height:55,borderRadius:'50%',
                background:sel?r.bg:'rgba(0,0,0,0.04)',
                border:`2px solid ${sel?r.color:'rgba(0,0,0,0.08)'}`,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:24,margin:'0 auto 12px',
                boxShadow:sel?`0 4px 16px ${r.glow}`:'none',
                transition:'all .3s ease'}}>
                {r.icon}
              </div>
              <div style={{fontSize:9,fontWeight:800,letterSpacing:2,textTransform:'uppercase',
                color:sel?r.color:`rgba(26,54,93,0.35)`,marginBottom:4}}>{r.tagline}</div>
              <div style={{fontFamily:'Sora,sans-serif',fontSize:16,fontWeight:800,
                color:sel?r.color:C.darkNavy,marginBottom:6}}>{r.name}</div>
              <div style={{fontSize:12,color:`rgba(26,54,93,0.6)`,lineHeight:1.5,marginBottom:12}}>{r.desc}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4,justifyContent:'center'}}>
                {r.traits.map(t=>(
                  <span key={t} style={{padding:'3px 8px',borderRadius:99,fontSize:10,
                    background:sel?r.bg:'rgba(0,0,0,0.04)',color:sel?r.color:`rgba(26,54,93,0.5)`,
                    border:`1px solid ${sel?r.color+'44':'rgba(0,0,0,0.06)'}`,fontWeight:600}}>{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={()=>chosen&&onSelect(chosen)}
        disabled={!chosen}
        className="btn-primary"
        style={{
          display:'inline-flex',alignItems:'center',gap:12,padding:'14px 40px',
          borderRadius:50,border:'none',cursor:chosen?'pointer':'not-allowed',
          background:chosen?G.btn:'rgba(0,0,0,0.08)',
          color:chosen?'#fff':'rgba(0,0,0,0.25)',
          fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:15,
          boxShadow:chosen?`0 10px 36px rgba(43,108,176,0.4)`:'none',
        }}>
        {chosen?`Begin as ${roles.find(r=>r.id===chosen)?.name} →`:'Select a path to continue'}
      </button>
      <p style={{fontSize:12,color:`rgba(26,54,93,0.38)`,marginTop:14}}>Takes about 10–15 minutes · 6 days · 60 questions</p>
    </div>
  );
};

/* ─── DAY INTRO ──────────────────────────────────────────────── */
const DayIntro = ({dayData,onStart,isMobile}) => {
  const {day,color,icon,title,subtitle,description}=dayData;
  return (
    <div style={{textAlign:'center',padding:'clamp(24px,4vw,40px) 16px clamp(28px,4vw,44px)',animation:'scaleIn .5s ease both'}}>
      <div style={{position:'relative',display:'inline-block',marginBottom:24}}>
        <div style={{width:isMobile?80:100,height:isMobile?80:100,borderRadius:'50%',
          background:G.glass80,backdropFilter:'blur(10px)',
          border:`3px solid ${color}`,
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:isMobile?36:42,boxShadow:`0 0 0 10px ${color}12,0 12px 40px ${color}25`,
          animation:'float3 3.5s ease-in-out infinite'}}>
          {icon}
        </div>
        <div style={{position:'absolute',top:-4,right:-4,width:24,height:24,borderRadius:'50%',
          background:`linear-gradient(135deg,${color},${color}bb)`,
          color:'#fff',fontSize:10,fontWeight:800,
          display:'flex',alignItems:'center',justifyContent:'center',
          boxShadow:`0 3px 10px ${color}55`}}>{day}</div>
      </div>
      <div style={{fontSize:11,color,fontWeight:800,letterSpacing:3,textTransform:'uppercase',marginBottom:10}}>
        Day {day} of 6
      </div>
      <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(24px,5vw,38px)',
        background:`linear-gradient(135deg,${C.darkNavy},${color})`,
        WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
        marginBottom:8,lineHeight:1.2}}>{title}</h2>
      <p style={{fontSize:'clamp(13px,2vw,15px)',color:`rgba(26,54,93,0.6)`,marginBottom:8}}>{subtitle}</p>
      <p style={{fontSize:14,color:`rgba(26,54,93,0.5)`,lineHeight:1.75,maxWidth:380,margin:'0 auto 28px'}}>{description}</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:7,justifyContent:'center',marginBottom:28}}>
        {['3 MCQ questions','3 multi-select','4 writing questions'].map(t=>(
          <span key={t} style={{padding:'4px 12px',borderRadius:99,fontSize:11,
            background:`${color}10`,color,border:`1.5px solid ${color}30`,fontWeight:600}}>{t}</span>
        ))}
      </div>
      <button className="btn-primary" onClick={onStart}
        style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 32px',borderRadius:50,
          border:'none',background:`linear-gradient(135deg,${color},${color}cc)`,
          color:'#fff',cursor:'pointer',fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:isMobile?14:16,
          boxShadow:`0 8px 28px ${color}45`}}>
        Start Day {day} <span style={{fontSize:18}}>→</span>
      </button>
    </div>
  );
};

/* ─── PROGRESS BAR ───────────────────────────────────────────── */
const ProgressBar = ({current,total,dayColor}) => (
  <div style={{marginBottom:20}}>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:11,fontWeight:800,
      color:`rgba(26,54,93,0.5)`,letterSpacing:1.5,textTransform:'uppercase',marginBottom:8}}>
      <span>Question {current} of {total}</span>
      <span>{Math.round((current/total)*100)}%</span>
    </div>
    <div style={{height:8,borderRadius:99,background:'rgba(255,255,255,0.5)',overflow:'hidden'}}>
      <motion.div initial={{width:0}} animate={{width:`${(current/total)*100}%`}} transition={{duration:.6}}
        style={{height:'100%',borderRadius:99,background:`linear-gradient(to right,${dayColor},${C.blue})`}}/>
    </div>
  </div>
);

/* ─── QUESTION CARD COMPONENT (WITH BACK BUTTON) ─── */
const QuestionCard = ({question, dayColor, onAnswer, onBack, questionIndex, totalQuestions, isFirst, savedAnswer}) => {
  const [selected, setSelected] = useState(savedAnswer !== undefined && typeof savedAnswer !== 'string' && !Array.isArray(savedAnswer) ? savedAnswer : null);
  const [multiSelected, setMultiSelected] = useState(() => {
    if (savedAnswer && Array.isArray(savedAnswer)) return savedAnswer.filter(a => a !== 'Other');
    return [];
  });
  const [text, setText] = useState(typeof savedAnswer === 'string' ? savedAnswer : '');
  const [showOther, setShowOther] = useState(() => {
    if (savedAnswer && Array.isArray(savedAnswer) && savedAnswer.includes('Other')) return true;
    return false;
  });
  const [otherValue, setOtherValue] = useState(() => {
    if (savedAnswer && Array.isArray(savedAnswer)) {
      const other = savedAnswer.find(a => a !== 'Other' && !question.options?.includes(a));
      return other || '';
    }
    return '';
  });

  const handleMultiSelect = (opt) => {
    if (opt === 'Other') {
      setShowOther(!showOther);
      return;
    }
    if (multiSelected.includes(opt)) {
      setMultiSelected(multiSelected.filter(x => x !== opt));
    } else {
      setMultiSelected([...multiSelected, opt]);
    }
  };

  const handleSubmit = () => {
    if (question.type === 'text' || question.type === 'writing') {
      if (text.trim()) onAnswer(text);
    } else if (question.type === 'mcq') {
      if (selected !== null) onAnswer(selected);
    } else if (question.type === 'multi') {
      if (multiSelected.length > 0) {
        const finalAnswer = showOther && otherValue ? [...multiSelected, otherValue] : multiSelected;
        onAnswer(finalAnswer);
      }
    }
  };

  const canProceed = () => {
    if (question.type === 'text' || question.type === 'writing') return text.trim().length > 0;
    if (question.type === 'mcq') return selected !== null;
    if (question.type === 'multi') return multiSelected.length > 0 || (showOther && otherValue);
    return false;
  };

  const getOptions = () => {
    if (question.options) return question.options;
    if (question.suggestions) return question.suggestions;
    return [];
  };

  return (
    <Glass style={{borderRadius:24,padding:'28px 24px',animation:'fadeUp .5s ease both'}}>
      <div style={{marginBottom:18, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8}}>
        <span style={{fontSize:10,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:dayColor}}>
          Question {questionIndex} of {totalQuestions}
        </span>
        {question.instruction && (
          <span style={{fontSize:10,fontWeight:600,color:dayColor,background:`${dayColor}10`,padding:'4px 10px',borderRadius:20}}>
            {question.instruction}
          </span>
        )}
      </div>
      
      <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(17px,3vw,22px)',fontWeight:800,
        color:C.darkNavy,marginBottom:20,lineHeight:1.3}}>{question.question}</h3>

      {/* Writing / Text Question */}
      {(question.type === 'text' || question.type === 'writing') && (
        <>
          {question.suggestions && question.suggestions.length > 0 && (
            <div style={{marginBottom:16}}>
              <p style={{fontSize:11,color:`rgba(26,54,93,0.5)`,marginBottom:8}}>Suggestions (click to add):</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                {question.suggestions.map(suggestion => (
                  <span
                    key={suggestion}
                    onClick={() => setText(prev => prev ? `${prev}, ${suggestion}` : suggestion)}
                    style={{
                      padding:'4px 12px', borderRadius:20, fontSize:11,
                      background:`${dayColor}10`, color:dayColor,
                      border:`1px solid ${dayColor}30`, cursor:'pointer',
                      transition:'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {suggestion}
                  </span>
                ))}
              </div>
            </div>
          )}
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)}
            rows={4} 
            placeholder="Share your thoughts…"
            style={{
              width:'100%', padding:'14px 16px', borderRadius:14, resize:'vertical',
              border:`1.5px solid ${canProceed() ? dayColor : 'rgba(74,144,226,0.25)'}`,
              background:G.glass65, fontFamily:'Manrope,sans-serif', fontSize:14,
              color:C.darkNavy, outline:'none',
              boxShadow:`0 2px 12px rgba(74,144,226,0.08)`,
              transition:'border-color 0.2s ease'
            }}
          />
        </>
      )}

      {/* MCQ Question */}
      {question.type === 'mcq' && (
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {getOptions().map((opt, i) => (
            <button 
              key={opt} 
              onClick={() => setSelected(opt)}
              style={{
                padding:'14px 18px', borderRadius:14, textAlign:'left', border:'none', cursor:'pointer',
                background:selected === opt ? `linear-gradient(135deg,${dayColor}18,rgba(255,255,255,0.9))` : G.glass65,
                outline:selected === opt ? `2px solid ${dayColor}` : `1.5px solid ${G.border60}`,
                fontSize:14, color:C.darkNavy, fontFamily:'Manrope,sans-serif', fontWeight:500,
                transition:'all .25s ease', boxShadow:selected === opt ? `0 4px 20px ${dayColor}20` : 'none'
              }}
            >
              <span style={{
                display:'inline-block', width:24, height:24, borderRadius:'50%',
                background:selected === opt ? dayColor : 'rgba(0,0,0,0.06)',
                color:selected === opt ? '#fff' : `rgba(26,54,93,0.4)`,
                fontSize:11, fontWeight:800, marginRight:12, textAlign:'center', lineHeight:'24px', verticalAlign:'middle'
              }}>{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Multi-Select Question */}
      {question.type === 'multi' && (
        <>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {getOptions().map(opt => {
              if (opt === 'Other') {
                return (
                  <div key={opt}>
                    <button 
                      onClick={() => setShowOther(!showOther)}
                      style={{
                        padding:'14px 18px', borderRadius:14, textAlign:'left', border:'none', cursor:'pointer',
                        background:showOther ? `linear-gradient(135deg,${dayColor}18,rgba(255,255,255,0.9))` : G.glass65,
                        outline:showOther ? `2px solid ${dayColor}` : `1.5px solid ${G.border60}`,
                        fontSize:14, color:C.darkNavy, fontFamily:'Manrope,sans-serif', fontWeight:500,
                        transition:'all .25s ease', width:'100%'
                      }}
                    >
                      <span style={{
                        display:'inline-block', width:20, height:20, borderRadius:4,
                        background:showOther ? dayColor : 'rgba(0,0,0,0.06)',
                        color:showOther ? '#fff' : `rgba(26,54,93,0.4)`,
                        fontSize:12, fontWeight:800, marginRight:12, textAlign:'center', lineHeight:'20px'
                      }}>{showOther ? '✓' : '+'}</span>
                      {opt}
                    </button>
                    {showOther && (
                      <input
                        type="text"
                        placeholder="Please specify..."
                        value={otherValue}
                        onChange={e => setOtherValue(e.target.value)}
                        style={{
                          marginTop:10, width:'100%', padding:'12px 16px', borderRadius:12,
                          border:`1.5px solid ${dayColor}`, background:G.glass65,
                          fontSize:14, outline:'none'
                        }}
                      />
                    )}
                  </div>
                );
              }
              const isSelected = multiSelected.includes(opt);
              return (
                <button 
                  key={opt} 
                  onClick={() => handleMultiSelect(opt)}
                  style={{
                    padding:'14px 18px', borderRadius:14, textAlign:'left', border:'none', cursor:'pointer',
                    background:isSelected ? `linear-gradient(135deg,${dayColor}18,rgba(255,255,255,0.9))` : G.glass65,
                    outline:isSelected ? `2px solid ${dayColor}` : `1.5px solid ${G.border60}`,
                    fontSize:14, color:C.darkNavy, fontFamily:'Manrope,sans-serif', fontWeight:isSelected ? 600 : 500,
                    transition:'all .25s ease'
                  }}
                >
                  <span style={{
                    display:'inline-block', width:20, height:20, borderRadius:4,
                    background:isSelected ? dayColor : 'rgba(0,0,0,0.06)',
                    color:isSelected ? '#fff' : `rgba(26,54,93,0.4)`,
                    fontSize:12, fontWeight:800, marginRight:12, textAlign:'center', lineHeight:'20px'
                  }}>{isSelected ? '✓' : '□'}</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {multiSelected.length > 0 && (
            <p style={{fontSize:11, color:dayColor, marginTop:12, textAlign:'center'}}>
              Selected: {multiSelected.join(', ')}{showOther && otherValue ? `, ${otherValue}` : ''}
            </p>
          )}
        </>
      )}

      <div style={{display:'flex', justifyContent:'space-between', marginTop:24}}>
        {!isFirst && (
          <button 
            className="btn-primary" 
            onClick={onBack}
            style={{
              display:'flex', alignItems:'center', gap:8, padding:'12px 28px', borderRadius:12, border:'none',
              background:G.glass65, color:C.darkNavy, cursor:'pointer',
              fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:14,
              transition:'all 0.2s ease'
            }}
          >
            ← Back
          </button>
        )}
        <button 
          className="btn-primary" 
          onClick={handleSubmit}
          disabled={!canProceed()}
          style={{
            display:'flex', alignItems:'center', gap:8, padding:'12px 28px', borderRadius:12, border:'none',
            background:canProceed() ? `linear-gradient(135deg,${dayColor},${dayColor}cc)` : 'rgba(0,0,0,0.1)',
            color:canProceed() ? '#fff' : 'rgba(0,0,0,0.3)',
            cursor:canProceed() ? 'pointer' : 'not-allowed',
            fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:14,
            boxShadow:canProceed() ? `0 6px 20px ${dayColor}40` : 'none',
            transition:'all 0.2s ease',
            marginLeft: isFirst ? 'auto' : 0
          }}
        >
          {questionIndex === totalQuestions ? 'Complete Day' : 'Next →'}
        </button>
      </div>
    </Glass>
  );
};

/* ─── DAY CELEBRATION MODAL ──────────────────────────────────── */
const DayCelebration = ({day,allDays,completedDays,onContinue}) => {
  const isLast=day===allDays.length;
  const dayData=allDays[day-1];
  const nextDay=allDays[day]||null;
  const msgs=[
    {headline:'Day 1 Complete!',sub:"You've uncovered what you love. Your passion is your compass."},
    {headline:'Day 2 Complete!',sub:"You've designed your ideal life. Vision shapes reality."},
    {headline:'Day 3 Complete!',sub:"Your strengths are crystal clear. You know what makes you powerful."},
    {headline:'Day 4 Complete!',sub:"Career clarity achieved. You know how you want to grow and earn."},
    {headline:'Day 5 Complete!',sub:"Your purpose is defined. You know the impact you want to leave."},
    {headline:'Journey Complete!',sub:"All 6 days done. Your Ikigai is ready to be revealed!"},
  ];
  const msg=msgs[(day-1)%msgs.length];
  return (
    <>
      <Confetti count={isLast?100:60}/>
      <div style={{position:'fixed',inset:0,background:'rgba(10,20,50,0.6)',backdropFilter:'blur(8px)',
        zIndex:150,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
        <Glass style={{borderRadius:28,padding:'clamp(28px,4vw,48px)',textAlign:'center',
          maxWidth:440,width:'100%',boxShadow:'0 24px 80px rgba(0,0,0,0.25)',
          animation:'celebSlide .6s cubic-bezier(.22,.68,0,1.2) both',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:5,
            background:`linear-gradient(90deg,${dayData.color},${dayData.color}88)`}}/>
          <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:20,marginTop:8}}>
            {Array.from({length:isLast?6:3}).map((_,i)=>(
              <div key={i} style={{fontSize:isLast?26:22,animation:`starPop .5s cubic-bezier(.22,.68,0,1.8) ${i*.1}s both`}}>
                {isLast?'🌟':'⭐'}
              </div>
            ))}
          </div>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,
            background:`${dayData.color}12`,border:`1px solid ${dayData.color}30`,
            borderRadius:99,padding:'5px 16px',marginBottom:14}}>
            <span style={{fontSize:13}}>{dayData.icon}</span>
            <span style={{fontSize:11,fontWeight:800,color:dayData.color,letterSpacing:1,textTransform:'uppercase'}}>
              Day {day} — {dayData.title}
            </span>
          </div>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(20px,4vw,28px)',
            color:C.darkNavy,marginBottom:10,lineHeight:1.25}}>{msg.headline}</h2>
          <p style={{fontSize:'clamp(13px,2vw,15px)',color:`rgba(26,54,93,0.6)`,lineHeight:1.7,
            marginBottom:22,maxWidth:300,margin:'0 auto 22px'}}>{msg.sub}</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:6,justifyContent:'center',marginBottom:24}}>
            {allDays.slice(0,day).map(d=>(
              <span key={d.day} style={{padding:'4px 11px',borderRadius:99,fontSize:11,
                background:`${d.color}12`,color:d.color,border:`1.5px solid ${d.color}44`,fontWeight:600,
                display:'inline-flex',alignItems:'center',gap:4}}>
                <span style={{fontSize:9}}>✓</span>{d.title}
              </span>
            ))}
          </div>
          <button className="btn-primary" onClick={onContinue}
            style={{display:'inline-flex',alignItems:'center',gap:10,padding:'14px 28px',
              borderRadius:99,border:'none',width:'100%',justifyContent:'center',cursor:'pointer',
              background:isLast
                ? `linear-gradient(135deg,rgb(232,93,74),rgb(240,148,42))`
                : `linear-gradient(135deg,${nextDay?.color||dayData.color},${nextDay?.color||dayData.color}cc)`,
              color:'#fff',fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:15,
              boxShadow:`0 8px 28px ${(nextDay?.color||dayData.color)}44`}}>
            {isLast ? 'Reveal My Ikigai 🌸' : `Continue to Day ${day+1}: ${nextDay?.title} →`}
          </button>
        </Glass>
      </div>
    </>
  );
};

// Day configuration
const allDays = [
  {day:1,icon:'❤️',title:'Passion',   subtitle:'Discover what sets your soul on fire',description:'Explore the activities, topics, and experiences that make you feel most alive.',color:C.lightBlue,bg:'rgba(74,144,226,0.08)'},
  {day:2,icon:'🌟',title:'Lifestyle', subtitle:'Design your ideal future life',         description:'Visualize the life you truly want to be living 5 years from now.',            color:C.blue,bg:'rgba(43,108,176,0.08)'},
  {day:3,icon:'⚡',title:'Strengths', subtitle:'Uncover your unique superpowers',       description:'Identify the skills and talents that come naturally and powerfully to you.',  color:C.darkNavy,bg:'rgba(26,54,93,0.07)'},
  {day:4,icon:'💼',title:'Career',    subtitle:'Define your professional trajectory',   description:'Clarify how you want to grow, earn, and contribute professionally.',          color:C.lightBlue,bg:'rgba(74,144,226,0.08)'},
  {day:5,icon:'🎯',title:'Purpose',   subtitle:'Discover your deeper why',              description:'Connect with the impact you want to have on the world around you.',           color:C.blue,bg:'rgba(43,108,176,0.08)'},
  {day:6,icon:'🗺️',title:'Vision',   subtitle:'Map your path forward',                 description:'Synthesize everything into a clear, actionable vision for your future.',       color:C.darkNavy,bg:'rgba(26,54,93,0.07)'},
];

export default function SevenDays() {
  const [screen,setScreen]               = useState('landing');
  const [role,setRole]                   = useState(null);
  const [currentDay,setCurrentDay]       = useState(1);
  const [completedDays,setCompletedDays] = useState([]);
  const [questionIdx,setQuestionIdx]     = useState(-1);
  const [showCelebration,setShowCelebration] = useState(false);
  const [answers, setAnswers]             = useState({});
  const [isMobile,setIsMobile]           = useState(()=>typeof window!=='undefined'?window.innerWidth<768:false);

  useEffect(()=>{
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[]);

  const roleMeta = role ? {
    entrepreneur:{label:'Entrepreneur',icon:'🌍',color:C.lightBlue,bg:'rgba(74,144,226,0.08)',accent:'rgba(74,144,226,0.2)'},
    managerial:  {label:'Managerial',  icon:'📊',color:C.blue,     bg:'rgba(43,108,176,0.08)',accent:'rgba(43,108,176,0.2)'},
    technician:  {label:'Technician',  icon:'🔧',color:C.darkNavy, bg:'rgba(26,54,93,0.07)',  accent:'rgba(26,54,93,0.15)'},
  }[role] : {};

  // Get the current day's questions from the imported questionsData
  const currentDayDataRaw = role ? questionsData[role]?.[currentDay - 1] : null;
  
  const currentDayData = {
    ...allDays[currentDay - 1],
    questions: currentDayDataRaw?.questions || []
  };
  
  const questionsList = currentDayData.questions || [];
  const totalQ = questionsList.length;
  const currentQuestion = questionsList[questionIdx];

  const handleAnswer = (answer) => {
    if (currentQuestion) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answer
      }));
    }
    
    if (questionIdx < totalQ - 1) {
      setQuestionIdx(q => q + 1);
    } else {
      setCompletedDays(p => [...new Set([...p, currentDay])]);
      setShowCelebration(true);
    }
  };

  const handleBack = () => {
    if (questionIdx > 0) {
      setQuestionIdx(q => q - 1);
    }
  };

  const afterCelebration = () => {
    setShowCelebration(false);
    if (currentDay < 6) { 
      setCurrentDay(d => d + 1); 
      setQuestionIdx(-1); 
    } else { 
      setScreen('loading'); 
      setTimeout(() => setScreen('result'), 2800); 
    }
  };

  const maxW = screen === 'result' ? 960 : screen === 'journey' ? (isMobile ? '100%' : 880) : (isMobile ? '100%' : 720);

  return (
    <div style={{minHeight:'100vh',background:G.bg,fontFamily:'Manrope,sans-serif',position:'relative',overflowX:'hidden'}}>
      <GlobalStyles/>
      <BlobBg/>
      <FloatingParticles/>

      <div style={{position:'fixed',top:'4%',left:'-8%',width:'50%',height:'50%',borderRadius:'50%',
        background:`radial-gradient(circle,rgba(74,144,226,0.22) 0%,transparent 70%)`,
        filter:'blur(70px)',pointerEvents:'none',zIndex:0,animation:'floatSlow 22s ease-in-out infinite'}}/>
      <div style={{position:'fixed',bottom:'-4%',right:'-8%',width:'44%',height:'44%',borderRadius:'50%',
        background:`radial-gradient(circle,rgba(43,108,176,0.18) 0%,transparent 70%)`,
        filter:'blur(70px)',pointerEvents:'none',zIndex:0,animation:'floatSlow 28s ease-in-out infinite reverse'}}/>

      <Navbar screen={screen} completedDays={completedDays} allDays={allDays}
        currentDay={currentDay} roleMeta={roleMeta} isMobile={isMobile}/>

      {showCelebration && (
        <DayCelebration day={currentDay} allDays={allDays}
          completedDays={completedDays} onContinue={afterCelebration}/>
      )}

      {/* Responsive margin: no left margin on mobile, 280px on desktop */}
      <div style={{ marginLeft: isMobile ? 0 : '280px' }}>
        <div style={{
          maxWidth:maxW,margin:'0 auto',width:'100%',
          padding: (screen==='landing'||screen==='roleSelect')
            ? (isMobile ? '0 16px' : '0 clamp(16px,4vw,32px)')
            : (isMobile ? '16px 16px 40px' : 'clamp(14px,2vw,24px) clamp(16px,3vw,28px) 60px'),
          display:'flex',gap:isMobile?0:20,position:'relative',zIndex:1,
        }}>
          {!isMobile && screen==='journey' && (
            <Sidebar allDays={allDays} currentDay={currentDay}
              completedDays={completedDays} roleMeta={roleMeta}/>
          )}

          <div style={{flex:1,minWidth:0}}>
            {screen==='landing'  && <Landing onStart={()=>setScreen('roleSelect')}/>}
            {screen==='roleSelect' && <RoleSelect onSelect={(r)=>{setRole(r);setScreen('journey');}}/>}

            {screen==='journey' && (
              <>
                {/* Mobile day indicator */}
                {isMobile && (
                  <div style={{marginBottom:16, textAlign:'center'}}>
                    <span style={{
                      padding:'6px 16px', borderRadius:99, fontSize:12, fontWeight:700,
                      background:currentDayData.color, color:'#fff',
                      boxShadow:`0 2px 12px ${currentDayData.color}40`
                    }}>
                      Day {currentDay}: {currentDayData.title}
                    </span>
                    <div style={{display:'flex',gap:6,justifyContent:'center',marginTop:12}}>
                      {allDays.map(d=>{
                        const done=completedDays.includes(d.day);
                        const active=currentDay===d.day;
                        return (
                          <div key={d.day} style={{
                            width:active?24:6,height:6,borderRadius:99,
                            background:done?d.color:active?d.color:'rgba(0,0,0,0.1)',
                            transition:'all .35s ease',
                          }}/>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!isMobile && (
                  <div style={{display:'flex',gap:7,marginBottom:18,overflowX:'auto',paddingBottom:4}}>
                    {allDays.map(d=>{
                      const done=completedDays.includes(d.day);
                      const active=currentDay===d.day;
                      return (
                        <div key={d.day} style={{
                          padding:'7px 14px',borderRadius:99,fontSize:11.5,fontWeight:700,
                          whiteSpace:'nowrap',flexShrink:0,
                          background:active?d.color:done?`${d.color}18`:G.glass65,
                          color:active?'#fff':done?d.color:`rgba(26,54,93,0.4)`,
                          border:`1.5px solid ${active?d.color:done?`${d.color}55`:G.border60}`,
                          backdropFilter:'blur(8px)',
                          display:'flex',alignItems:'center',gap:4,transition:'all .3s ease',
                        }}>
                          {done&&!active&&<span style={{fontSize:9}}>✓</span>}
                          {active&&<span>{d.icon}</span>}
                          {d.title}
                        </div>
                      );
                    })}
                  </div>
                )}

                {questionIdx >= 0 && totalQ > 0 && (
                  <ProgressBar current={questionIdx + 1} total={totalQ} dayColor={currentDayData.color}/>
                )}

                {questionIdx === -1
                  ? <DayIntro dayData={currentDayData} onStart={() => setQuestionIdx(0)} isMobile={isMobile}/>
                  : currentQuestion && (
                      <QuestionCard 
                        question={currentQuestion}
                        dayColor={currentDayData.color}
                        onAnswer={handleAnswer}
                        onBack={handleBack}
                        questionIndex={questionIdx + 1}
                        totalQuestions={totalQ}
                        isFirst={questionIdx === 0}
                        savedAnswer={answers[currentQuestion.id]}
                      />
                    )
                }
                
                {totalQ === 0 && questionIdx === -1 && (
                  <div style={{textAlign:'center', padding:'40px'}}>
                    <p>Loading questions...</p>
                  </div>
                )}
              </>
            )}

            {screen==='loading' && <LoadingScreen/>}

            {screen==='result' && (
              <div style={{textAlign:'center', padding:'40px'}}>
                <h2>Your Ikigai Results</h2>
                <p>Based on your {role} journey, here are your insights...</p>
                <pre style={{textAlign:'left', background:'rgba(0,0,0,0.05)', padding:20, borderRadius:12, overflow:'auto', fontSize:12}}>
                  {JSON.stringify(answers, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
