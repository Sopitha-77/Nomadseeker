import React, { useState } from 'react';
import { Target, TrendingUp, Zap, Award, Briefcase, Globe, CheckCircle2 } from 'lucide-react';

const phases = [
  { 
    phase: 1, 
    days: "Days 1-15", 
    title: "Market Validation & First Client", 
    desc: "Acquire your first beta client via direct outreach. Validate your offer.", 
    icon: <Target size={32} color="#c084fc" />, 
    status: "active", 
    progress: 20,
    checkpoints: [
      "Send cold outreach to 50 targeted prospects",
      "Conduct minimum 3 discovery calls",
      "Land 1 initial beta client or project"
    ]
  },
  { 
    phase: 2, 
    days: "Days 16-30", 
    title: "Delivery & Testimonials", 
    desc: "Overdeliver for your beta client, gather stellar feedback, and refine process.", 
    icon: <Award size={32} color="#38bdf8" />, 
    status: "locked", 
    progress: 0,
    checkpoints: [
      "Complete beta project successfully",
      "Record a video or written testimonial",
      "Identify workflow bottlenecks"
    ]
  },
  { 
    phase: 3, 
    days: "Days 31-45", 
    title: "Systematization & Operations", 
    desc: "Build standard operating procedures (SOPs) based on your delivery.", 
    icon: <Briefcase size={32} color="#c084fc" />, 
    status: "locked", 
    progress: 0,
    checkpoints: [
      "Draft step-by-step SOP for client onboarding",
      "Draft SOP for specific service delivery",
      "Set up an automated invoicing system"
    ]
  },
  { 
    phase: 4, 
    days: "Days 46-60", 
    title: "Scaling Income & Automation", 
    desc: "Automate lead generation, raise prices by 20%, and launch officially.", 
    icon: <Globe size={32} color="#38bdf8" />, 
    status: "locked", 
    progress: 0,
    checkpoints: [
      "Launch an automated cold email sequence",
      "Publish your revised, higher-tier pricing",
      "Celebrate your established digital income stream"
    ]
  },
];

export default function SixtyDayChallenge() {
  const [currentPhase, setCurrentPhase] = useState(1);

  const getStatus = (pNum) => {
    if (pNum < currentPhase) return "completed";
    if (pNum === currentPhase) return "active";
    return "locked";
  };

  const progressPct = ((currentPhase - 1) / 4) * 100;

  return (
    <div className="animate-fade-in stagger-2 pb-10">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <div style={{ display: 'inline-flex', background: 'rgba(56, 189, 248, 0.2)', padding: '5px 15px', borderRadius: '100px', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'bold' }} className="mb-3 uppercase tracking-widest gap-2">
          <Zap size={14} /> The Ultimate Nomad Blueprint
        </div>
        <h2 className="text-3xl font-bold mb-3 tracking-tight">60-Day Digital Income Challenge</h2>
        <p className="text-muted text-lg">Shift from discovering your purpose to successfully monetizing it anywhere in the world. Follow this intense phase-by-phase framework.</p>
      </div>

      {/* Progress Overview Header */}
      <div className="glass-panel mb-8 flex items-center justify-between flex-col-mobile" style={{ gap: '16px' }}>
        <div>
          <h3 className="font-bold text-lg mb-1">Global Revenue Progress</h3>
          <p className="text-xs text-muted">Currently in Phase {currentPhase > 4 ? 4 : currentPhase}</p>
        </div>
        
        <div className="flex-1 max-w-xl mx-8">
           <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
             <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(to right, #c084fc, #38bdf8)', borderRadius: '100px', transition: 'width 0.5s ease' }}></div>
           </div>
           <div className="flex justify-between text-xs mt-2 text-muted flex-col-mobile" style={{ alignItems: 'flex-start', gap: '8px' }}>
             <span>Phase 1</span>
             <span className="font-bold text-primary">{progressPct}% Complete</span>
             <span>Phase 4</span>
           </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(1fr, auto-fit)', gap: '30px' }}>
        {phases.map((p, idx) => {
          const status = getStatus(p.phase);
          return (
          <div 
            key={p.phase} 
            className="glass-panel card-hover flex gap-6"
            style={{ 
              borderLeft: status === 'active' ? '4px solid #c084fc' : '0px solid',
              opacity: status === 'locked' ? 0.6 : 1,
              position: 'relative',
              flexDirection: 'column'
            }}
          >
            {/* Phase Header */}
            <div className="flex items-start gap-4 mb-4 border-b pb-4 flex-col-mobile">
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px' }}>
                {p.icon}
              </div>
              <div>
                <span className="text-xs text-secondary font-bold tracking-wider uppercase mb-1 block">Phase {p.phase} • {p.days}</span>
                <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                <p className="text-sm text-muted">{p.desc}</p>
              </div>
            </div>

            {/* Checkpoints */}
            <div className="flex-1">
              <span className="text-xs font-bold text-muted mb-3 block">Mandatory Checkpoints</span>
              <ul className="flex flex-col gap-3">
                {p.checkpoints.map((cp, cpidx) => (
                  <li key={cpidx} className="flex gap-3 text-sm items-start">
                    <div className="mt-1">
                      {status === 'completed' ? <CheckCircle2 size={16} color="#38bdf8" /> : 
                       <div style={{ width: '16px', height: '16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%' }}></div>}
                    </div>
                    <span style={{ color: status === 'completed' ? '#cbd5e1' : '#94a3b8', textDecoration: status === 'completed' ? 'line-through' : 'none' }}>
                      {cp}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 text-right">
              {status === 'active' ? (
                 <button className="btn-primary" style={{ width: '100%' }} onClick={() => setCurrentPhase(prev => prev + 1)}>Complete Phase</button>
              ) : status === 'completed' ? (
                 <button disabled className="btn-primary" style={{ width: '100%', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', boxShadow: 'none' }}>
                  Phase Completed
                </button>
              ) : (
                <button disabled className="btn-primary" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', boxShadow: 'none' }}>
                  Locked • Complete Previous Phase
                </button>
              )}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
