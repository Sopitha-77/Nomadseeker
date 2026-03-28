import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, ArrowRight, Play } from 'lucide-react';

const weeks = [
  {
    weekNumber: 1,
    title: "Foundation Setup",
    description: "Align your personal brand identity with your Ikigai.",
    tasks: [
      { day: 1, title: "Define your unique value proposition based on Ikigai", status: "completed" },
      { day: 2, title: "Optimize professional profiles (LinkedIn/Twitter/Upwork)", status: "completed" },
      { day: 3, title: "Write your core brand story (Why you do what you do)", status: "active" },
      { day: 4, title: "Research top 5 audience pain points via Reddit/Quora", status: "locked" },
      { day: 5, title: "Identify top 3 competitors and analyze their gaps", status: "locked" },
      { day: 6, title: "Draft your 30-day content pillars and themes" },
      { day: 7, title: "End of Week 1: Core Alignment Review" },
    ]
  },
  {
    weekNumber: 2,
    title: "Value Creation",
    description: "Package your skills into a tangible, monetizable offer.",
    tasks: [
      { day: 8, title: "Outline your primary service offering or product", status: "locked" },
      { day: 9, title: "Determine your initial pricing model", status: "locked" },
      { day: 10, title: "Create a 1-page Notion portfolio or landing page", status: "locked" },
      { day: 11, title: "Write the copy addressing the specific problems solved", status: "locked" },
      { day: 12, title: "Set up payment gateways (Stripe/PayPal/Wise)", status: "locked" },
      { day: 13, title: "Create a welcome onboarding document for clients", status: "locked" },
      { day: 14, title: "End of Week 2: Offer Validation Review", status: "locked" },
    ]
  },
  {
    weekNumber: 3,
    title: "Authority Building",
    description: "Generate inbound attention through strategic content.",
    tasks: [
      { day: 15, title: "Publish your 'Building in Public' origin story post", status: "locked" },
      { day: 16, title: "Write a high-value thread/post solving one audience problem", status: "locked" },
      { day: 17, title: "Engage with 10 accounts in your target niche", status: "locked" },
      { day: 18, title: "Share a case study or personal result (micro-win)", status: "locked" },
      { day: 19, title: "Offer a free 15-min consultation or mini-audit", status: "locked" },
      { day: 20, title: "Repurpose your best post into a short video format", status: "locked" },
      { day: 21, title: "End of Week 3: Content Traction Review", status: "locked" },
    ]
  },
  {
    weekNumber: 4,
    title: "Launch & Outreach",
    description: "Proactive client acquisition and networking.",
    tasks: [
      { day: 22, title: "Draft your cold outreach template", status: "locked" },
      { day: 23, title: "Send 10 personalized DMs or emails to ideal targets", status: "locked" },
      { day: 24, title: "Join 2 relevant communities (Discord/Slack/Facebook)", status: "locked" },
      { day: 25, title: "Follow up on all previous interactions and DMs", status: "locked" },
      { day: 26, title: "Pitch a collaboration or guest post to an established creator" },
      { day: 27, title: "Finalize your lead generation daily routine" },
      { day: 28, title: "End of Week 4: Final 30-Day Evaluation" },
    ]
  }
];

export default function ThirtyDayChallenge() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [currentTaskDay, setCurrentTaskDay] = useState(1);

  const getStatus = (day) => {
    if (day < currentTaskDay) return "completed";
    if (day === currentTaskDay) return "active";
    return "locked";
  };

  const totalCompleted = currentTaskDay - 1;
  const progressPct = Math.round((totalCompleted / 28) * 100);

  return (
    <div className="animate-fade-in stagger-2 pb-10">
      <div className="mb-8 p-6 glass-panel" style={{ background: 'linear-gradient(to right, rgba(192, 132, 252, 0.1), rgba(56, 189, 248, 0.1))' }}>
        <h2 className="text-2xl font-bold mb-2">30-Day Purpose Implementation</h2>
        <p className="text-muted">Turn your Ikigai clarity into real-world action. Execute these daily micro-commitments to build your foundational digital presence.</p>
        
        <div className="flex flex-col-mobile gap-2 mt-4">
          <div style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'bold' }}>{totalCompleted}/28 Tasks Completed</div>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem' }}>{progressPct}% Progress</div>
        </div>
      </div>

      <div className="grid-main" style={{ gridTemplateColumns: '1fr 2fr' }}>
        {/* Weekly Navigator */}
        <div className="flex flex-col gap-4">
          {weeks.map((week) => (
            <div 
              key={week.weekNumber}
              className="glass-panel card-hover"
              style={{
                cursor: 'pointer',
                border: activeWeek === week.weekNumber ? '2px solid #c084fc' : 'var(--glass-border)',
                background: activeWeek === week.weekNumber ? 'rgba(192, 132, 252, 0.05)' : 'var(--glass-bg)'
              }}
              onClick={() => setActiveWeek(week.weekNumber)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-primary tracking-wider uppercase">Week {week.weekNumber}</span>
                {week.weekNumber === 1 ? <div style={{width: 8, height: 8, borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 10px #38bdf8'}}></div> : null}
              </div>
              <h3 className="font-bold text-lg mb-1">{week.title}</h3>
              <p className="text-xs text-muted">{week.description}</p>
            </div>
          ))}
        </div>

        {/* Task List */}
        <div className="glass-panel" style={{ minHeight: '500px' }}>
          {weeks.map((week) => week.weekNumber === activeWeek && (
            <div key={`tasks-${week.weekNumber}`} className="animate-fade-in">
              <div className="flex justify-between items-center border-b pb-4 mb-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <Calendar size={20} className="text-primary"/> 
                  Week {week.weekNumber} Execution
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {week.tasks.map((task) => {
                  const status = getStatus(task.day);
                  return (
                  <div 
                    key={task.day}
                    className="flex items-center gap-4 p-4 rounded-lg flex-col-mobile"
                    style={{
                      background: status === 'completed' ? 'rgba(56, 189, 248, 0.05)' : status === 'active' ? 'rgba(192, 132, 252, 0.1)' : 'rgba(255,255,255,0.02)',
                      border: status === 'active' ? '1px solid rgba(192, 132, 252, 0.4)' : '1px solid transparent',
                      opacity: status === 'locked' ? 0.6 : 1
                    }}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div>
                        {status === 'completed' && <CheckCircle2 size={24} color="#38bdf8" />}
                        {status === 'active' && <Play size={24} color="#c084fc" fill="rgba(192, 132, 252, 0.2)" />}
                        {status === 'locked' && <Circle size={24} color="#475569" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-xs font-bold" style={{ color: status === 'active' ? '#c084fc' : '#94a3b8' }}>
                          Day {task.day}
                        </div>
                        <div className={`font-medium ${status === 'completed' ? 'line-through text-muted' : ''}`}>
                          {task.title}
                        </div>
                      </div>
                    </div>

                    {status === 'active' && (
                      <button 
                        className="btn-primary" 
                        style={{ padding: '6px 16px', fontSize: '0.9rem' }}
                        onClick={() => setCurrentTaskDay(prev => Math.min(prev + 1, 29))}
                      >
                        Complete Task
                      </button>
                    )}
                  </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
