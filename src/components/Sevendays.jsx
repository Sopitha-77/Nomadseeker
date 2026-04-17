import { useEffect, useState } from "react";
import { useIkigai } from "../context/IkigaiContext";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import IkigaiChart from "./IkigaiChart";

function StyleInjector() {
  useEffect(() => {
    const id = "iki-global-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

      @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
      @keyframes scaleIn   { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
      @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes floatSlow { 0%,100%{transform:translateY(0) translateX(0)} 33%{transform:translateY(-18px) translateX(12px)} 66%{transform:translateY(12px) translateX(-12px)} }
      @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.95)} }
      @keyframes shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }

      @keyframes confettiFall {
        0%  { transform: translateY(-20px) rotate(0deg); opacity: 1; }
        100%{ transform: translateY(110vh) rotate(720deg); opacity: 0; }
      }
      @keyframes starPop {
        0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
        60%  { transform: scale(1.2) rotate(8deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes celebSlide {
        from { opacity:0; transform: translateY(40px) scale(0.94); }
        to   { opacity:1; transform: translateY(0) scale(1); }
      }
      @keyframes roleCardIn {
        from { opacity:0; transform: translateY(32px) scale(0.95); }
        to   { opacity:1; transform: translateY(0) scale(1); }
      }

      * { box-sizing:border-box; margin:0; padding:0; }
      html { scroll-behavior:smooth; }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: rgba(0,0,0,0.04); }
      ::-webkit-scrollbar-thumb { background: rgba(100,205,209,0.5); border-radius: 4px; }

      .iki-sidebar-inner { display: none; }
      @media (min-width: 900px) {
        .iki-sidebar-inner { display: block; }
      }

      .role-card-hover:hover {
        transform: translateY(-6px) !important;
      }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
}

function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 4,
    dur: 18 + Math.random() * 18,
    delay: -(Math.random() * 18),
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.left}%`, top: `${p.top}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: `rgba(100,205,209,${0.08 + Math.random() * 0.18})`,
          animation: `floatSlow ${p.dur}s ease-in-out infinite`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}
    </div>
  );
}

function Confetti({ count = 60 }) {
  const colours = ["#e85d4a", "#f0942a", "#3a9e6e", "#5b6af0", "#9b59b6", "#2196a8", "#64CDD1", "#FFD700"];
  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: colours[i % colours.length],
    size: 6 + Math.random() * 8,
    dur: 2.2 + Math.random() * 2.2,
    delay: Math.random() * 1.2,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 200, overflow: "hidden" }}>
      {pieces.map((p) => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.left}%`, top: -20,
          width: p.shape === "circle" ? p.size : p.size * 0.7, height: p.size,
          borderRadius: p.shape === "circle" ? "50%" : 2,
          background: p.color,
          animation: `confettiFall ${p.dur}s ease-in forwards`,
          animationDelay: `${p.delay}s`, opacity: 0,
        }} />
      ))}
    </div>
  );
}

function RoleSelect() {
  const { selectRoleAndBegin } = useIkigai();
  const [chosen, setChosen] = useState(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 40);
    return () => clearTimeout(t);
  }, []);

  const roles = [
    {
      id: "entrepreneur",
      icon: "🌍",
      name: "Entrepreneur",
      tagline: "Build & Found",
      desc: "Startups, ventures, independent businesses & bold ideas",
      traits: ["Visionary", "Risk-taker", "Founder"],
      color: "#e85d4a",
      bg: "#fff5f3",
      border: "#e85d4a33",
      glow: "rgba(232,93,74,0.18)",
    },
    {
      id: "managerial",
      icon: "📊",
      name: "Managerial",
      tagline: "Lead & Organise",
      desc: "Corporate leadership, team management & process excellence",
      traits: ["Leader", "Planner", "Coordinator"],
      color: "#5b6af0",
      bg: "#f3f4ff",
      border: "#5b6af033",
      glow: "rgba(91,106,240,0.18)",
    },
    {
      id: "technician",
      icon: "🔧",
      name: "Technician",
      tagline: "Build & Craft",
      desc: "Software, engineering, product building & technical mastery",
      traits: ["Developer", "Engineer", "Builder"],
      color: "#3a9e6e",
      bg: "#f0fbf5",
      border: "#3a9e6e33",
      glow: "rgba(58,158,110,0.18)",
    },
  ];

  return (
    <div style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s cubic-bezier(.22,.68,0,1.2)",
      textAlign: "center",
      padding: "clamp(40px,8vw,72px) clamp(16px,4vw,32px) clamp(40px,6vw,56px)",
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "rgba(100,205,209,0.12)",
        border: "1.5px solid rgba(100,205,209,0.35)",
        borderRadius: 50, padding: "6px 18px",
        marginBottom: 24, fontSize: 12, color: "#5794A4", fontWeight: 700,
        letterSpacing: 0.5,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#64CDD1", display: "inline-block" }} />
        Step 1 of 2 — Choose Your Path
      </div>

      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(28px,5vw,42px)",
        background: "linear-gradient(135deg, #1a1a2e, #64CDD1, #5b6af0)",
        WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        marginBottom: 14, lineHeight: 1.2,
      }}>
        Who are you on<br /><em>this journey?</em>
      </h2>

      <p style={{
        fontSize: "clamp(14px,2vw,16px)", color: "#777",
        lineHeight: 1.75, maxWidth: 420, margin: "0 auto 48px",
      }}>
        Your questions, insights, and Ikigai will be fully tailored to your role and goals.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16, maxWidth: 720, margin: "0 auto 44px",
      }}>
        {roles.map((r, i) => {
          const isChosen = chosen === r.id;
          return (
            <div
              key={r.id}
              onClick={() => setChosen(r.id)}
              className="role-card-hover"
              style={{
                padding: "28px 22px 24px",
                borderRadius: 24, cursor: "pointer", textAlign: "center",
                background: isChosen ? r.bg : "rgba(255,255,255,0.88)",
                border: isChosen ? `2px solid ${r.color}` : "1.5px solid rgba(0,0,0,0.08)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s cubic-bezier(.22,.68,0,1.2)",
                transform: isChosen ? "translateY(-8px)" : "translateY(0)",
                boxShadow: isChosen ? `0 16px 40px ${r.glow}` : "0 2px 12px rgba(0,0,0,0.05)",
                position: "relative",
                // FIXED: use animation-fill-mode: both so final opacity:1 persists
                animation: `roleCardIn 0.55s cubic-bezier(.22,.68,0,1.2) ${0.1 + i * 0.1}s both`,
              }}
            >
              {isChosen && (
                <div style={{
                  position: "absolute", top: 14, right: 14,
                  width: 24, height: 24, borderRadius: "50%",
                  background: r.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800,
                }}>✓</div>
              )}

              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: isChosen ? r.bg : "rgba(0,0,0,0.04)",
                border: `2px solid ${isChosen ? r.color : "rgba(0,0,0,0.08)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, margin: "0 auto 16px",
                boxShadow: isChosen ? `0 4px 16px ${r.glow}` : "none",
                transition: "all 0.3s ease",
              }}>
                {r.icon}
              </div>

              <div style={{
                fontSize: 10, fontWeight: 800, letterSpacing: 2,
                textTransform: "uppercase", color: isChosen ? r.color : "#aaa",
                marginBottom: 6, transition: "color 0.2s",
              }}>{r.tagline}</div>

              <div style={{
                fontSize: 18, fontWeight: 700,
                color: isChosen ? r.color : "#1a1a1a",
                marginBottom: 10, fontFamily: "'Playfair Display', serif",
                transition: "color 0.2s",
              }}>{r.name}</div>

              <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 16 }}>{r.desc}</div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                {r.traits.map((t) => (
                  <span key={t} style={{
                    padding: "4px 11px", borderRadius: 50, fontSize: 11,
                    background: isChosen ? r.bg : "rgba(0,0,0,0.04)",
                    color: isChosen ? r.color : "#999",
                    border: `1px solid ${isChosen ? r.border : "rgba(0,0,0,0.06)"}`,
                    fontWeight: 600, transition: "all 0.2s",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => chosen && selectRoleAndBegin(chosen)}
        disabled={!chosen}
        style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          padding: "18px 52px", borderRadius: 50,
          fontSize: 17, fontWeight: 700, border: "none",
          background: chosen
            ? `linear-gradient(135deg, ${roles.find((r) => r.id === chosen)?.color || "#64CDD1"}, ${roles.find((r) => r.id === chosen)?.color || "#64CDD1"}bb)`
            : "rgba(0,0,0,0.08)",
          color: chosen ? "#fff" : "rgba(0,0,0,0.25)",
          cursor: chosen ? "pointer" : "not-allowed",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: chosen ? `0 10px 36px ${roles.find((r) => r.id === chosen)?.glow || "rgba(100,205,209,0.4)"}` : "none",
          transition: "all 0.3s cubic-bezier(.22,.68,0,1.2)",
        }}
        onMouseEnter={(e) => { if (chosen) e.currentTarget.style.transform = "translateY(-3px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {chosen ? `Begin as ${roles.find((r) => r.id === chosen)?.name} →` : "Select a path to continue"}
      </button>

      <p style={{ fontSize: 12, color: "#bbb", marginTop: 16 }}>
        Takes about 10–15 minutes · 6 days · 36 questions
      </p>
    </div>
  );
}

function DayCelebration() {
  const { justCompletedDay, afterCelebration, allDays, roleMeta } = useIkigai();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const isLastDay = justCompletedDay === allDays.length;
  const dayData = allDays[justCompletedDay - 1] || allDays[0];
  const nextDay = allDays[justCompletedDay] || null;

  const celebMessages = [
    { headline: "Day 1 Complete!", sub: "You've uncovered what you love. Your passion is your compass." },
    { headline: "Day 2 Complete!", sub: "You've designed your ideal life. Vision shapes reality." },
    { headline: "Day 3 Complete!", sub: "Your strengths are crystal clear. You know what makes you powerful." },
    { headline: "Day 4 Complete!", sub: "Career clarity achieved. You know how you want to grow and earn." },
    { headline: "Day 5 Complete!", sub: "Your purpose is defined. You know the impact you want to leave." },
    { headline: "Journey Complete!", sub: "All 6 days done. Your Ikigai is ready to be revealed!" },
  ];

  const msg = celebMessages[(justCompletedDay - 1) % celebMessages.length];

  return (
    <>
      <Confetti count={isLastDay ? 100 : 60} />
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(10,10,30,0.65)",
        backdropFilter: "blur(6px)",
        zIndex: 150,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: 28,
          padding: "clamp(32px,5vw,52px) clamp(24px,5vw,52px)",
          textAlign: "center",
          maxWidth: 460, width: "100%",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          animation: "celebSlide 0.6s cubic-bezier(.22,.68,0,1.2) both",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 5,
            background: `linear-gradient(90deg, ${dayData.color || "#64CDD1"}, ${(dayData.color || "#64CDD1")}88)`,
          }} />

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24, marginTop: 8 }}>
            {Array.from({ length: isLastDay ? 6 : 3 }).map((_, i) => (
              <div key={i} style={{
                fontSize: isLastDay ? 28 : 24,
                animation: `starPop 0.5s cubic-bezier(.22,.68,0,1.8) ${i * 0.1}s both`,
              }}>
                {isLastDay ? "🌟" : "⭐"}
              </div>
            ))}
          </div>

          {roleMeta.label && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(100,205,209,0.1)",
              border: "1px solid rgba(100,205,209,0.3)",
              borderRadius: 50, padding: "4px 14px",
              marginBottom: 10,
            }}>
              <span style={{ fontSize: 12 }}>{roleMeta.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#5794A4", letterSpacing: 1 }}>
                {roleMeta.label} Journey
              </span>
            </div>
          )}

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: dayData.bg || "#f5f5f5",
            border: `1.5px solid ${(dayData.color || "#64CDD1") + "44"}`,
            borderRadius: 50, padding: "6px 18px", marginBottom: 18,
          }}>
            <span style={{ fontSize: 16, color: dayData.color }}>{dayData.icon}</span>
            <span style={{
              fontSize: 12, fontWeight: 700, color: dayData.color,
              textTransform: "uppercase", letterSpacing: 1.5,
            }}>
              Day {justCompletedDay} — {dayData.title}
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px,4vw,30px)", color: "#111",
            marginBottom: 12, lineHeight: 1.25,
          }}>{msg.headline}</h2>

          <p style={{
            fontSize: "clamp(14px,2vw,16px)", color: "#666",
            lineHeight: 1.7, marginBottom: 32,
            maxWidth: 340, margin: "0 auto 32px",
          }}>{msg.sub}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 28 }}>
            {allDays.slice(0, justCompletedDay).map((d) => (
              <span key={d.day} style={{
                padding: "5px 12px", borderRadius: 50, fontSize: 12,
                background: d.bg, color: d.color,
                border: `1.5px solid ${d.color}55`,
                fontWeight: 600,
                display: "inline-flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ fontSize: 10 }}>✓</span>
                {d.title}
              </span>
            ))}
          </div>

          <button
            onClick={afterCelebration}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "15px 40px", borderRadius: 50,
              fontSize: 16, fontWeight: 700, border: "none",
              background: isLastDay
                ? "linear-gradient(135deg, #e85d4a, #f0942a)"
                : `linear-gradient(135deg, ${nextDay?.color || dayData.color}, ${nextDay?.color || dayData.color}cc)`,
              color: "#fff", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: isLastDay
                ? "0 8px 28px rgba(232,93,74,0.45)"
                : `0 8px 28px ${nextDay?.color || dayData.color}44`,
              transition: "all 0.25s ease",
              width: "100%", justifyContent: "center",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {isLastDay ? "Reveal My Ikigai 🌸" : `Continue to Day ${justCompletedDay + 1}: ${nextDay?.title} →`}
          </button>

          {isLastDay && (
            <p style={{ fontSize: 12, color: "#bbb", marginTop: 12 }}>
              Your results are being personalised just for you
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function Sidebar() {
  const { allDays, currentDayData, completedDays, roleMeta } = useIkigai();
  return (
    <div className="iki-sidebar-inner" style={{ width: 248, flexShrink: 0 }}>
      <div style={{
        position: "sticky", top: 88,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(14px)",
        borderRadius: 22,
        padding: "22px 18px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
        border: "1px solid rgba(100,205,209,0.18)",
      }}>
        {roleMeta.label && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            marginBottom: 18, padding: "8px 12px",
            background: roleMeta.bg || "rgba(100,205,209,0.08)",
            borderRadius: 12,
            border: `1px solid ${roleMeta.accent || "rgba(100,205,209,0.2)"}`,
          }}>
            <span style={{ fontSize: 16 }}>{roleMeta.icon}</span>
            <div>
              <div style={{
                fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
                textTransform: "uppercase", color: roleMeta.color || "#5794A4",
              }}>{roleMeta.label}</div>
              <div style={{ fontSize: 10, color: "#aaa" }}>Your path</div>
            </div>
          </div>
        )}

        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: 2.5,
          textTransform: "uppercase", marginBottom: 18,
          background: "linear-gradient(90deg, #5794A4, #64CDD1)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        }}>Your Journey</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {allDays.map((d) => {
            const done = completedDays.includes(d.day);
            const active = currentDayData.day === d.day;
            return (
              <div key={d.day} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 14,
                background: active ? d.bg : "transparent",
                border: `1.5px solid ${active ? d.color + "44" : "transparent"}`,
                transition: "all 0.25s ease",
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: done
                    ? `linear-gradient(135deg, ${d.color}, ${d.color}cc)`
                    : active ? d.bg : "#f5f5f5",
                  border: `2px solid ${done || active ? d.color : "#e0e0e0"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: done ? 12 : 14,
                  color: done ? "#fff" : d.color,
                  flexShrink: 0, transition: "all 0.25s ease",
                  boxShadow: active ? `0 2px 10px ${d.color}44` : "none",
                }}>
                  {done ? "✓" : d.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: 13, lineHeight: 1.3,
                    fontWeight: active ? 700 : done ? 500 : 400,
                    color: active ? d.color : done ? "#777" : "#bbb",
                  }}>{d.title}</div>
                  {active && (
                    <div style={{ fontSize: 10, color: "#aaa", marginTop: 1 }}>{d.subtitle}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 22, padding: "14px",
          background: "linear-gradient(135deg, rgba(100,205,209,0.08), rgba(87,148,164,0.06))",
          borderRadius: 14,
          borderLeft: "3px solid #64CDD1",
        }}>
          <p style={{ fontSize: 11.5, color: "#888", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
            "The place where your <strong>talents</strong> and the world's <strong>needs</strong> cross — there lies your vocation."
          </p>
          <p style={{ fontSize: 10.5, color: "#bbb", marginTop: 6 }}>— Aristotle</p>
        </div>
      </div>
    </div>
  );
}

function DayIntro() {
  const { currentDayData, startDay } = useIkigai();
  const { day, color, bg, accent, icon, title, subtitle, description } = currentDayData;
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 40); return () => clearTimeout(t); }, [day]);

  return (
    <div style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "scale(1)" : "scale(0.92)",
      transition: "all 0.5s cubic-bezier(.22,.68,0,1.2)",
      textAlign: "center", padding: "clamp(20px,4vw,40px) 20px",
    }}>
      <div style={{ position: "relative", display: "inline-block", marginBottom: 28 }}>
        <div style={{
          width: 110, height: 110, borderRadius: "50%",
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(10px)",
          border: `3px solid ${color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 46, color,
          boxShadow: `0 0 0 12px ${color}12, 0 14px 44px ${color}33`,
          animation: "float 3.5s ease-in-out infinite",
        }}>{icon}</div>
        <div style={{
          position: "absolute", top: -4, right: -4,
          width: 28, height: 28, borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          color: "#fff", fontSize: 12, fontWeight: 800,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 3px 10px ${color}55`,
        }}>{day}</div>
      </div>

      <div style={{ fontSize: 11, color, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
        Day {day} of 6
      </div>

      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(26px,5vw,38px)",
        background: `linear-gradient(135deg, #1a1a2e, ${color})`,
        WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        marginBottom: 10, lineHeight: 1.2,
      }}>{title}</h2>

      <p style={{ fontSize: "clamp(14px,2vw,16px)", color: "#777", marginBottom: 10 }}>{subtitle}</p>
      <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.75, maxWidth: 400, margin: "0 auto 36px" }}>
        {description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 36 }}>
        {["3 open questions", "2 multi-select", "1 choice"].map((t) => (
          <span key={t} style={{
            padding: "6px 15px", borderRadius: 50, fontSize: 12,
            background: bg, color, border: `1.5px solid ${accent || color + "44"}`,
            fontWeight: 600,
          }}>{t}</span>
        ))}
      </div>

      <button
        onClick={startDay}
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "16px 44px", borderRadius: 50,
          fontSize: 16, fontWeight: 700, border: "none",
          background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          color: "#fff", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: `0 8px 30px ${color}55`,
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 14px 38px ${color}66`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 30px ${color}55`; }}
      >
        Start Day {day} <span style={{ fontSize: 18 }}>→</span>
      </button>
    </div>
  );
}

function DayTabs() {
  const { allDays, currentDayData, completedDays } = useIkigai();
  return (
    <div style={{
      display: "flex", gap: 7, marginBottom: 24,
      overflowX: "auto", paddingBottom: 4,
      scrollbarWidth: "none", msOverflowStyle: "none",
    }}>
      {allDays.map((d) => {
        const done = completedDays.includes(d.day);
        const active = currentDayData.day === d.day;
        return (
          <div key={d.day} style={{
            padding: "8px 16px", borderRadius: 50,
            fontSize: 12, fontWeight: 700,
            whiteSpace: "nowrap", flexShrink: 0,
            background: active ? d.color : done ? `${d.color}18` : "rgba(255,255,255,0.6)",
            color: active ? "#fff" : done ? d.color : "#bbb",
            border: `1.5px solid ${active ? d.color : done ? `${d.color}55` : "rgba(0,0,0,0.08)"}`,
            transition: "all 0.3s ease",
            display: "flex", alignItems: "center", gap: 5,
            backdropFilter: "blur(8px)",
          }}>
            {done && !active && <span style={{ fontSize: 9 }}>✓</span>}
            {active && <span>{d.icon}</span>}
            {d.title}
          </div>
        );
      })}
    </div>
  );
}

function LoadingScreen() {
  const msgs = ["Gathering your passions…", "Mapping your strengths…", "Weaving your purpose…", "Almost ready…"];
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % msgs.length), 1900);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "clamp(60px,10vw,100px) 20px" }}>
      <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 36px" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            position: "absolute", inset: i * 11, borderRadius: "50%",
            border: `2.5px solid ${["#64CDD1", "#5794A4", "#3B82F6"][i]}`,
            opacity: 0.35 + i * 0.25,
            animation: `spin ${1.4 + i * 0.45}s linear infinite ${i % 2 ? "reverse" : ""}`,
          }} />
        ))}
        <div style={{
          position: "absolute", inset: 33, borderRadius: "50%",
          background: "linear-gradient(135deg,#64CDD1,#3B82F6)",
          animation: "pulse 1.6s ease-in-out infinite",
        }} />
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: "clamp(20px,3vw,26px)",
        background: "linear-gradient(135deg,#2c3e50,#5794A4)",
        WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        marginBottom: 14,
      }}>Revealing your Ikigai</h3>

      <p style={{ fontSize: 15, color: "rgba(0,0,0,0.45)", animation: "fadeIn 0.4s ease" }}>
        {msgs[phase]}
      </p>
    </div>
  );
}

function Landing() {
  const { goToRoleSelect } = useIkigai();

  const highlights = [
    { icon: "♡", label: "Passion", color: "#e85d4a" },
    { icon: "◎", label: "Lifestyle", color: "#f0942a" },
    { icon: "◈", label: "Skills", color: "#3a9e6e" },
    { icon: "◆", label: "Career", color: "#5b6af0" },
    { icon: "✦", label: "Purpose", color: "#9b59b6" },
    { icon: "◉", label: "Vision", color: "#2196a8" },
  ];

  return (
    <div style={{
      textAlign: "center",
      padding: "clamp(40px,8vw,80px) clamp(16px,4vw,32px) clamp(40px,6vw,60px)",
    }}>
      <div style={{
        width: 112, height: 112, borderRadius: "50%",
        background: "rgba(255,255,255,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 50, margin: "0 auto 32px",
        boxShadow: "0 0 0 18px rgba(100,205,209,0.07), 0 20px 56px rgba(100,205,209,0.18)",
        animation: "float 4.5s ease-in-out infinite",
        border: "1.5px solid rgba(100,205,209,0.35)",
        backdropFilter: "blur(8px)",
      }}>☯</div>

      <div style={{
        display: "inline-block", padding: "6px 20px", borderRadius: 50,
        background: "rgba(100,205,209,0.12)",
        border: "1.5px solid rgba(100,205,209,0.35)",
        fontSize: 12, color: "#5794A4", marginBottom: 24,
        fontWeight: 700, letterSpacing: 0.5,
        // FIXED: animation-fill-mode: both so it doesn't flicker to opacity:0 after animating in
        animation: "fadeUp 0.6s ease both",
      }}>
        6-Day Self-Discovery Journey
      </div>

      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(34px,6vw,58px)",
        background: "linear-gradient(135deg, #1a1a2e, #64CDD1, #3B82F6)",
        WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        marginBottom: 18, lineHeight: 1.15,
        animation: "fadeUp 0.7s ease 0.05s both",
      }}>
        Discover Your<br /><em>Ikigai</em>
      </h1>

      <p style={{
        fontSize: "clamp(15px,2.2vw,18px)", color: "#666",
        lineHeight: 1.8, maxWidth: 500, margin: "0 auto 10px",
        animation: "fadeUp 0.7s ease 0.1s both",
      }}>
        A personalised 6-day journey to discover your true purpose — tailored to your unique role and ambitions.
      </p>
      <p style={{
        fontSize: 13, color: "#aaa", marginBottom: 44,
        animation: "fadeUp 0.7s ease 0.15s both",
      }}>
        Choose your path. Answer honestly. Your results will be uniquely yours.
      </p>

      {/* FIXED: removed inline opacity:0 — animation handles opacity with fill-mode: both */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px,1fr))",
        gap: 12, maxWidth: 600, margin: "0 auto 48px",
        animation: "fadeUp 0.7s ease 0.2s both",
      }}>
        {highlights.map((d, i) => (
          <div key={d.label} style={{
            padding: "16px 12px", borderRadius: 20, textAlign: "center",
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(10px)",
            border: `1.5px solid ${d.color}28`,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            // FIXED: fill-mode both, no manual opacity:0
            animation: `fadeUp 0.6s ease ${0.2 + i * 0.05}s both`,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 10px 28px ${d.color}33`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ fontSize: 24, marginBottom: 8, color: d.color }}>{d.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: d.color, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Day {i + 1}
            </div>
            <div style={{ fontSize: 11, color: "#999", fontWeight: 400, marginTop: 2 }}>{d.label}</div>
          </div>
        ))}
      </div>

      {/* FIXED: fill-mode both */}
      <div style={{
        display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap",
        marginBottom: 40, animation: "fadeUp 0.7s ease 0.3s both",
      }}>
        {[
          { label: "🌍 Entrepreneur", color: "#e85d4a", bg: "#fff5f3" },
          { label: "📊 Managerial", color: "#5b6af0", bg: "#f3f4ff" },
          { label: "🔧 Technician", color: "#3a9e6e", bg: "#f0fbf5" },
        ].map((r) => (
          <span key={r.label} style={{
            padding: "8px 20px", borderRadius: 50, fontSize: 13,
            background: r.bg, color: r.color,
            border: `1.5px solid ${r.color}33`,
            fontWeight: 600,
          }}>{r.label}</span>
        ))}
      </div>

      <button
        onClick={goToRoleSelect}
        style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          padding: "18px 52px", borderRadius: 50,
          fontSize: 17, fontWeight: 700, border: "none",
          background: "linear-gradient(135deg, #64CDD1, #3B82F6)",
          color: "#fff", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 10px 40px rgba(100,205,209,0.42)",
          animation: "fadeUp 0.7s ease 0.35s both",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(100,205,209,0.55)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(100,205,209,0.42)"; }}
      >
        Choose Your Path <span style={{ fontSize: 22 }}>→</span>
      </button>

      <p style={{ fontSize: 12, color: "#bbb", marginTop: 16 }}>Takes about 10–15 minutes · 3 roles to choose from</p>
    </div>
  );
}

function Navbar() {
  const { screen, currentDayData, completedDays, allDays, roleMeta } = useIkigai();
  if (screen === "landing") return null;

  return (
    <div style={{
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid rgba(100,205,209,0.18)",
      padding: "0 clamp(16px,3vw,32px)",
      height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>☯</span>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 17, fontWeight: 600,
          background: "linear-gradient(90deg, #5794A4, #64CDD1)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        }}>Ikigai Journey</span>
        {roleMeta.label && screen !== "roleSelect" && (
          <span style={{
            padding: "3px 10px", borderRadius: 50, fontSize: 11,
            background: roleMeta.bg || "rgba(100,205,209,0.1)",
            color: roleMeta.color || "#5794A4",
            border: `1px solid ${roleMeta.accent || "rgba(100,205,209,0.2)"}`,
            fontWeight: 700,
          }}>
            {roleMeta.icon} {roleMeta.label}
          </span>
        )}
      </div>

      {screen === "journey" && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {allDays.map((d) => {
            const done = completedDays.includes(d.day);
            const active = currentDayData.day === d.day;
            return (
              <div key={d.day} style={{
                width: active ? 28 : 8, height: 8, borderRadius: 50,
                background: done ? d.color : active ? d.color : "rgba(0,0,0,0.1)",
                opacity: done && !active ? 0.5 : 1,
                transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
                boxShadow: active ? `0 0 0 3px ${d.color}33` : "none",
              }} />
            );
          })}
        </div>
      )}

      {screen === "result" && (
        <span style={{
          fontSize: 11, fontWeight: 700, color: "#64CDD1",
          textTransform: "uppercase", letterSpacing: 1.5,
        }}>Your Results</span>
      )}
    </div>
  );
}

export default function SevenDays() {
  const { screen, questionIndex, currentDayData } = useIkigai();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 900 : true
  );

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const isResult = screen === "result";
  const maxW = isResult ? 900 : 720;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(150deg, #E8F5F6 0%, #D4EFF3 30%, #EEF9FA 60%, #E0F0F2 100%)",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative", overflowX: "hidden",
    }}>
      <StyleInjector />
      <FloatingParticles />

      <div style={{
        position: "fixed", top: "5%", left: "-8%",
        width: "55%", height: "55%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(100,205,209,0.18) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        animation: "floatSlow 22s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed", bottom: "0%", right: "-8%",
        width: "48%", height: "48%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(87,148,164,0.12) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        animation: "floatSlow 28s ease-in-out infinite reverse",
      }} />

      <Navbar />

      {screen === "dayComplete" && <DayCelebration />}

      <div style={{
        maxWidth: maxW,
        margin: "0 auto", width: "100%",
        padding: (screen === "landing" || screen === "roleSelect")
          ? "0 clamp(16px,4vw,32px)"
          : "clamp(20px,3vw,36px) clamp(16px,3vw,32px) 80px",
        display: "flex", gap: 28,
        position: "relative", zIndex: 1,
        boxSizing: "border-box",
      }}>
        {!isMobile && screen === "journey" && <Sidebar />}

        <div style={{ flex: 1, minWidth: 0 }}>
          {screen === "landing" && <Landing />}
          {screen === "roleSelect" && <RoleSelect />}

          {screen === "journey" && (
            <>
              <ProgressBar />
              <DayTabs />
              {questionIndex === -1
                ? <DayIntro />
                : <QuestionCard key={`${currentDayData.day}-${questionIndex}`} />
              }
            </>
          )}

          {screen === "loading" && <LoadingScreen />}
          {screen === "result" && <IkigaiChart />}
        </div>
      </div>
    </div>
  );
}