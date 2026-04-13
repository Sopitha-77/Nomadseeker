import { useEffect, useState } from "react";
import { useIkigai } from "../context/IkigaiContext";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

// ── Global styles injected once ───────────────────────────────────────────────
function StyleInjector() {
  useEffect(() => {
    const id = "iki-global-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
      
      @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
      @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes floatSlow { 0%,100%{transform:translateY(0) translateX(0)} 33%{transform:translateY(-15px) translateX(10px)} 66%{transform:translateY(10px) translateX(-10px)} }
      @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(100,205,209,0.2)} 50%{box-shadow:0 0 40px rgba(100,205,209,0.4)} }
      @keyframes slideInRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
      @keyframes slideInLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
      
      *{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;}
      
      /* Custom scrollbar */
      ::-webkit-scrollbar{width:8px;}
      ::-webkit-scrollbar-track{background:#f0f0f0;border-radius:10px;}
      ::-webkit-scrollbar-thumb{background:#64CDD1;border-radius:10px;}
      ::-webkit-scrollbar-thumb:hover{background:#5794A4;}
      
      /* Glass morphism utility */
      .glass {
        background: rgba(255,255,255,0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.5);
      }
      
      /* Animated gradient text */
      .gradient-text {
        background: linear-gradient(135deg, #64CDD1, #5794A4, #3B82F6);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: shimmer 3s ease infinite;
      }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
}

// ── Floating particles background ─────────────────────────────────────────────
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 5,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 10,
  }));

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden"
    }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `rgba(100, 205, 209, ${0.1 + Math.random() * 0.2})`,
            animation: `floatSlow ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Sidebar for desktop ────────────────────────────────────────────────────────
function Sidebar() {
  const { allDays, currentDayData, completedDays, screen } = useIkigai();
  if (screen === "landing") return null;

  return (
    <div style={{
      width: 260, flexShrink: 0,
      display: "none",
    }} className="iki-sidebar">
      <div style={{
        position: "sticky", top: 24,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        borderRadius: 24,
        padding: "28px 20px",
        border: "1px solid rgba(100,205,209,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
      }}>
        <div style={{ 
          fontSize: 11, fontWeight: 700, 
          background: "linear-gradient(135deg, #64CDD1, #5794A4)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textTransform: "uppercase", 
          letterSpacing: 2, 
          marginBottom: 20 
        }}>
          Your Journey
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {allDays.map((d) => {
            const done = completedDays.includes(d.day);
            const active = currentDayData.day === d.day && screen === "journey";
            return (
              <div key={d.day} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", borderRadius: 16,
                background: active ? "rgba(100,205,209,0.1)" : "transparent",
                border: `1.5px solid ${active ? "rgba(100,205,209,0.3)" : "transparent"}`,
                transition: "all 0.25s ease",
                cursor: "pointer",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: done ? `linear-gradient(135deg, ${d.color}, ${d.color}cc)` : active ? "rgba(100,205,209,0.1)" : "#f5f5f5",
                  border: `2px solid ${done || active ? d.color : "#e0e0e0"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: done ? 12 : 14, color: done ? "#fff" : d.color,
                  flexShrink: 0, transition: "all 0.25s ease",
                }}>
                  {done ? "✓" : d.icon}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#5794A4" : done ? "#888" : "#bbb" }}>
                    {d.title}
                  </div>
                  {active && (
                    <div style={{ fontSize: 11, color: "#aaa" }}>{d.subtitle}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <div style={{
          marginTop: 28, padding: "16px 14px",
          background: "rgba(100,205,209,0.08)",
          borderRadius: 16, 
          borderLeft: `3px solid #64CDD1`,
        }}>
          <p style={{ fontSize: 12, color: "#888", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
            "The place where your <strong>talents</strong> and the world's <strong>needs</strong> cross — there lies your vocation."
          </p>
          <p style={{ fontSize: 11, color: "#aaa", marginTop: 8 }}>— Aristotle</p>
        </div>
      </div>
    </div>
  );
}

// ── Day intro ─────────────────────────────────────────────────────────────────
function DayIntro() {
  const { currentDayData, startDay, completedDays, allDays } = useIkigai();
  const { day, color, bg, accent, icon, title, subtitle, description } = currentDayData;
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 40); }, [day]);

  return (
    <div style={{
      opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.94)",
      transition: "all 0.5s cubic-bezier(.22,.68,0,1.2)",
      textAlign: "center", padding: "32px 20px",
    }}>
      {/* Ring + icon */}
      <div style={{ position: "relative", display: "inline-block", marginBottom: 28 }}>
        <div style={{
          width: 120, height: 120, borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          border: `3px solid ${color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 48, color,
          boxShadow: `0 0 0 10px ${color}15, 0 12px 40px ${color}33`,
          animation: "float 3.5s ease-in-out infinite",
        }}>{icon}</div>
        <div style={{
          position: "absolute", top: -6, right: -6,
          width: 28, height: 28, borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          color: "#fff",
          fontSize: 12, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>{day}</div>
      </div>

      <div style={{
        fontSize: 11, color, fontWeight: 700,
        letterSpacing: 3, textTransform: "uppercase", marginBottom: 12,
      }}>Day {day} of 6</div>

      <h2 style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: "clamp(28px,5vw,38px)",
        background: "linear-gradient(135deg, #2c3e50, #5794A4)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        marginBottom: 12, lineHeight: 1.2,
      }}>{title}</h2>

      <p style={{ fontSize: 16, color: "#666", marginBottom: 12, fontWeight: 400 }}>{subtitle}</p>

      <p style={{
        fontSize: 14, color: "#999", lineHeight: 1.7,
        maxWidth: 420, margin: "0 auto 36px",
      }}>{description}</p>

      {/* Quick checklist of sub-topics */}
      <div style={{
        display: "inline-flex", flexWrap: "wrap", gap: 10,
        justifyContent: "center", marginBottom: 40,
      }}>
        {["3 open questions", "2 multi-select", "1 choice"].map((tag) => (
          <span key={tag} style={{
            padding: "6px 14px", borderRadius: 50, fontSize: 12,
            background: "rgba(100,205,209,0.1)",
            color, border: `1px solid ${color}44`, fontWeight: 500,
          }}>{tag}</span>
        ))}
      </div>

      <button onClick={startDay} style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "16px 44px", borderRadius: 50,
        fontSize: 16, fontWeight: 600, border: "none",
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        color: "#fff", cursor: "pointer",
        fontFamily: "'DM Sans',sans-serif",
        boxShadow: `0 8px 28px ${color}55`,
        transition: "all 0.25s ease",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${color}77`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 28px ${color}55`; }}
      >
        Start Day {day}
        <span style={{ fontSize: 18 }}>→</span>
      </button>
    </div>
  );
}

// ── Day tabs ──────────────────────────────────────────────────────────────────
function DayTabs() {
  const { allDays, currentDayData, completedDays } = useIkigai();
  return (
    <div style={{
      display: "flex", gap: 8, marginBottom: 28,
      overflowX: "auto", paddingBottom: 6,
      scrollbarWidth: "none", msOverflowStyle: "none",
    }}>
      {allDays.map((d) => {
        const done = completedDays.includes(d.day);
        const active = currentDayData.day === d.day;
        return (
          <div key={d.day} style={{
            padding: "8px 18px", borderRadius: 50, fontSize: 13,
            fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0,
            background: active ? d.color : done ? `${d.color}15` : "#f5f5f5",
            color: active ? "#fff" : done ? d.color : "#bbb",
            border: `1.5px solid ${active ? d.color : done ? `${d.color}44` : "#e8e8e8"}`,
            transition: "all 0.3s ease",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {done && !active && <span style={{ fontSize: 10 }}>✓</span>}
            {active && <span>{d.icon}</span>}
            {d.title}
          </div>
        );
      })}
    </div>
  );
}

// ── Loading ───────────────────────────────────────────────────────────────────
function LoadingScreen() {
  const dots = ["Gathering your passions…", "Mapping your strengths…", "Weaving your purpose…", "Almost ready…"];
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % dots.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      {/* Animated rings */}
      <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 40px" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            position: "absolute", inset: i * 12, borderRadius: "50%",
            border: `2px solid ${["#64CDD1","#5794A4","#3B82F6"][i]}`,
            opacity: 0.4 + i * 0.2,
            animation: `spin ${1.5 + i * 0.4}s linear infinite ${i % 2 === 1 ? "reverse" : ""}`,
          }} />
        ))}
        <div style={{
          position: "absolute", inset: 36, borderRadius: "50%",
          background: "linear-gradient(135deg,#64CDD1,#3B82F6)",
          animation: "pulse 1.5s ease-in-out infinite",
        }} />
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: 26, 
        background: "linear-gradient(135deg, #2c3e50, #5794A4)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        marginBottom: 16,
      }}>Revealing your Ikigai</h3>

      <p style={{
        fontSize: 15, color: "#999", minHeight: 24,
        transition: "all 0.4s ease",
        animation: "fadeUp 0.4s ease",
        key: phase,
      }}>
        {dots[phase]}
      </p>
    </div>
  );
}

// ── Landing ───────────────────────────────────────────────────────────────────
function Landing() {
  const { allDays, startJourney } = useIkigai();
  return (
    <div style={{ textAlign: "center", padding: "60px 20px 40px" }}>
      {/* Hero icon */}
      <div style={{
        width: 120, height: 120, borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(100,205,209,0.1), rgba(59,130,246,0.1))",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 52, margin: "0 auto 32px",
        boxShadow: "0 0 0 20px rgba(100,205,209,0.08), 0 20px 60px rgba(100,205,209,0.15)",
        animation: "float 4.5s ease-in-out infinite",
        border: "1px solid rgba(100,205,209,0.3)",
      }}>☯</div>

      <div style={{
        display: "inline-block", padding: "6px 18px", borderRadius: 50,
        background: "rgba(100,205,209,0.1)",
        border: "1px solid rgba(100,205,209,0.3)",
        fontSize: 12, color: "#64CDD1",
        marginBottom: 24, fontWeight: 600,
      }}>
        6-Day Self-Discovery Journey
      </div>

      <h1 style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: "clamp(36px,6vw,58px)",
        background: "linear-gradient(135deg, #2c3e50, #64CDD1, #3B82F6)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        marginBottom: 20, lineHeight: 1.15,
        animation: "fadeUp 0.7s ease forwards",
      }}>
        Discover Your<br />
        <span style={{ 
          background: "linear-gradient(135deg, #64CDD1, #3B82F6)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}>Ikigai</span>
      </h1>

      <p style={{
        fontSize: "clamp(16px,2vw,18px)", color: "#666",
        marginBottom: 12, lineHeight: 1.75, maxWidth: 500, margin: "0 auto 12px",
        animation: "fadeUp 0.7s ease 0.1s both",
      }}>
        Start your 6-day journey to discover your true purpose and ideal career path.
      </p>
      <p style={{
        fontSize: 13, color: "#999", marginBottom: 48,
        animation: "fadeUp 0.7s ease 0.2s both",
      }}>
        Answer honestly. Your responses will shape your final result.
      </p>

      {/* Day preview cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))",
        gap: 12, maxWidth: 620, margin: "0 auto 48px",
        animation: "fadeUp 0.7s ease 0.3s both",
      }}>
        {allDays.map((d) => (
          <div key={d.day} style={{
            padding: "16px 12px", borderRadius: 20, textAlign: "center",
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            border: `1.5px solid ${d.color}33`,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${d.color}33`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
          >
            <div style={{ fontSize: 28, marginBottom: 8, color: d.color }}>{d.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: d.color, marginBottom: 4 }}>Day {d.day}</div>
            <div style={{ fontSize: 11, color: "#999" }}>{d.title}</div>
          </div>
        ))}
      </div>

      <button onClick={startJourney} style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "18px 52px", borderRadius: 50,
        fontSize: 17, fontWeight: 600, border: "none",
        background: "linear-gradient(135deg, #64CDD1, #3B82F6)",
        color: "#fff", cursor: "pointer",
        fontFamily: "'DM Sans',sans-serif",
        boxShadow: "0 10px 40px rgba(100,205,209,0.4)",
        animation: "fadeUp 0.7s ease 0.4s both",
        transition: "all 0.25s ease",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(100,205,209,0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(100,205,209,0.4)"; }}
      >
        Begin Your Journey
        <span style={{ fontSize: 22 }}>→</span>
      </button>

      <p style={{ fontSize: 12, color: "#bbb", marginTop: 20 }}>Takes about 10–15 minutes</p>
    </div>
  );
}

// ── SevenDays — main orchestrator ─────────────────────────────────────────────
export default function SevenDays() {
  const { screen, questionIndex, currentDayData } = useIkigai();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #E8F4F6 0%, #D4F0F3 25%, #EEF9FA 50%, #D4F0F3 75%, #E8F4F6 100%)",
      fontFamily: "'DM Sans',sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      <StyleInjector />
      <FloatingParticles />

      {/* Animated gradient overlay - light */}
      <div style={{
        position: "fixed",
        top: "10%",
        left: "-10%",
        width: "60%",
        height: "60%",
        background: "radial-gradient(circle, rgba(100,205,209,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        animation: "floatSlow 20s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      
      <div style={{
        position: "fixed",
        bottom: "5%",
        right: "-10%",
        width: "50%",
        height: "50%",
        background: "radial-gradient(circle, rgba(87,148,164,0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        animation: "floatSlow 25s ease-in-out infinite reverse",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Top nav bar */}
      {screen !== "landing" && (
        <div style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(100,205,209,0.2)",
          padding: "16px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>☯</span>
            <span style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 18, fontWeight: 600,
              background: "linear-gradient(135deg, #5794A4, #64CDD1)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}>Ikigai Journey</span>
          </div>
          {screen === "journey" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: i < (currentDayData.day - 1)
                    ? currentDayData.color
                    : i === currentDayData.day - 1
                      ? currentDayData.color
                      : "#ddd",
                  opacity: i === currentDayData.day - 1 ? 1 : 0.5,
                  transition: "all 0.3s ease",
                  boxShadow: i === currentDayData.day - 1 ? `0 0 0 4px ${currentDayData.color}33` : "none",
                }} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main layout */}
      <div style={{
        maxWidth: screen === "result" ? 860 : 760,
        margin: "0 auto",
        padding: screen === "landing" ? "0 16px" : "32px 16px 60px",
        display: "flex", gap: 32,
        position: "relative",
        zIndex: 1,
      }}>
        {/* Sidebar — only on desktop, only during journey */}
        {!isMobile && screen === "journey" && <Sidebar />}

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {screen === "landing" && <Landing />}

          {screen === "journey" && (
            <div>
              <ProgressBar />
              <DayTabs />
              {questionIndex === -1
                ? <DayIntro />
                : <QuestionCard key={`${currentDayData.day}-${questionIndex}`} />
              }
            </div>
          )}

          {screen === "loading" && <LoadingScreen />}
          {/* result is rendered by App via IkigaiChart */}
        </div>
      </div>
    </div>
  );
}