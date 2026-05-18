import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  IkigaiProvider,
  useIkigai,
  DAYS_META,
  ROLES,
} from "../context/IkigaiContext";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import IkigaiVenn from "./IkigaiChart";

/* ─── DESIGN TOKENS ─────────────────────────────────────── */
const C = {
  deep: "rgb(20, 68, 71)",
  med: "rgb(43, 135, 141)",
  bright: "rgb(97, 206, 207)",
  mint: "rgb(223, 246, 246)",
};
const G = {
  bg: `linear-gradient(160deg, ${C.mint} 0%, rgb(190,238,239) 42%, ${C.bright} 100%)`,
  btn: `linear-gradient(135deg, ${C.med}, ${C.deep})`,
  accentBtn: `linear-gradient(135deg, #61CECF, #4bb8b9)`,
  heading: `linear-gradient(135deg, ${C.deep}, ${C.med}, ${C.bright})`,
  glass: "rgba(255,255,255,0.82)",
  glass65: "rgba(255,255,255,0.65)",
};

/* width of the app-level fixed sidebar (Navbar.jsx) */
const SIDEBAR_W = 280;

/* ─── GLOBAL STYLES ─────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,600&family=Sora:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Manrope',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
    ::-webkit-scrollbar{width:6px;}
    ::-webkit-scrollbar-track{background:rgba(97,206,207,0.15);}
    ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,${C.bright},${C.med});border-radius:6px;}
    textarea:focus,input:focus{outline:none;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
    @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
    @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(34px,-26px) scale(1.07)}66%{transform:translate(-22px,30px) scale(0.94)}}
    @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.92)}}
    @keyframes celeb{from{opacity:0;transform:translateY(30px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes confetti{0%{transform:translateY(-10px) rotate(0);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
    .lift{transition:transform .26s cubic-bezier(.22,.68,0,1.2),box-shadow .26s ease;}
    .lift:hover{transform:translateY(-6px);box-shadow:0 20px 56px rgba(20,68,71,0.16)!important;}
    .press{transition:all .22s cubic-bezier(.22,.68,0,1.2);}
    .press:hover:not(:disabled){transform:translateY(-2px);}
    .press:active:not(:disabled){transform:scale(.97);}
  `}</style>
);

/* ─── ATMOSPHERE ────────────────────────────────────────── */
const Blobs = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: "-12%", right: "-8%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.55) 0%,transparent 70%)", animation: "blob 24s ease-in-out infinite" }} />
    <div style={{ position: "absolute", bottom: "-10%", left: "-8%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(43,135,141,0.32) 0%,transparent 70%)", animation: "blob 30s ease-in-out infinite reverse" }} />
    <div style={{ position: "absolute", top: "38%", left: "26%", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.10)", filter: "blur(60px)", animation: "blob 36s ease-in-out infinite" }} />
  </div>
);

const Confetti = ({ count = 64 }) => {
  const cols = [C.deep, C.med, C.bright, "#fff", "#FFD700", "#F5C24C", C.mint];
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 300, overflow: "hidden" }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{ position: "absolute", width: 6 + (i % 6), height: 6 + (i % 6), borderRadius: i % 2 === 0 ? "50%" : "2px", background: cols[i % cols.length], left: `${(i * 13) % 100}vw`, top: "-12px", animation: `confetti ${2.3 + (i % 3) * 0.4}s ease-out ${(i % 12) * 0.07}s forwards` }} />
      ))}
    </div>
  );
};

/* ─── LANDING ───────────────────────────────────────────── */
const Landing = ({ onStart }) => (
  <div style={{ textAlign: "center", padding: "clamp(44px,7vw,84px) 16px clamp(36px,5vw,60px)", animation: "fadeUp .6s ease both" }}>
    <div style={{ display: "inline-block", padding: "7px 22px", borderRadius: 999, background: "rgba(43,135,141,0.12)", border: "1.5px solid rgba(43,135,141,0.32)", fontSize: 12, color: C.med, marginBottom: 26, fontWeight: 800, letterSpacing: 0.5 }}>
      ✦ Get Founds Technologies · 6-Day Self-Discovery Journey
    </div>
    <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(38px,6.4vw,68px)", background: G.heading, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 20, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
      Discover Your<br /><em>Ikigai</em>
    </h1>
    <p style={{ fontSize: "clamp(14px,2vw,17px)", color: "rgba(20,68,71,0.7)", lineHeight: 1.85, maxWidth: 530, margin: "0 auto 12px" }}>
      A personalised 6-day journey to uncover your true purpose — tailored to your unique role, passions and ambitions.
    </p>
    <p style={{ fontSize: 13, color: "rgba(20,68,71,0.42)", marginBottom: 42 }}>
      Choose your path · Answer honestly · Your Ikigai awaits
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10, maxWidth: 560, margin: "0 auto 42px" }}>
      {DAYS_META.map((d, i) => (
        <div key={d.day} className="lift" style={{ padding: "16px 4px", borderRadius: 18, textAlign: "center", background: G.glass65, backdropFilter: "blur(12px)", border: `1.5px solid ${d.color}22`, animation: `fadeUp .55s ease ${0.1 + i * 0.06}s both`, cursor: "default" }}>
          <div style={{ fontSize: 21, marginBottom: 5 }}>{d.icon}</div>
          <div style={{ fontSize: 8.5, fontWeight: 800, color: d.color, textTransform: "uppercase", letterSpacing: 0.5 }}>Day {d.day}</div>
          <div style={{ fontSize: 8, color: "rgba(20,68,71,0.5)", marginTop: 2 }}>{d.headline}</div>
        </div>
      ))}
    </div>
    <button className="press" onClick={onStart} style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 46px", borderRadius: 999, border: "none", background: G.btn, color: "#fff", cursor: "pointer", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 16, boxShadow: "0 14px 42px rgba(43,135,141,0.45)" }}>
      Begin Your Journey <span style={{ fontSize: 22 }}>→</span>
    </button>
    <p style={{ fontSize: 12, color: "rgba(20,68,71,0.36)", marginTop: 18 }}>
      Takes 10–15 min · 60 questions · 3 role paths
    </p>
  </div>
);

/* ─── ROLE SELECT ───────────────────────────────────────── */
const RoleSelect = ({ onSelect }) => {
  const { isMobile } = useIkigai();
  const [chosen, setChosen] = useState(null);
  const roles = [
    { id: "entrepreneur", icon: "🌍", name: "Entrepreneur", tagline: "Build & Found", desc: "Startups, ventures, bold ideas & independent businesses", traits: ["Visionary", "Risk-taker", "Founder"], color: C.bright, glow: "rgba(97,206,207,0.25)" },
    { id: "managerial", icon: "📊", name: "Managerial", tagline: "Lead & Organise", desc: "Corporate leadership, team management & process excellence", traits: ["Leader", "Planner", "Coordinator"], color: C.med, glow: "rgba(43,135,141,0.25)" },
    { id: "technician", icon: "🔧", name: "Technician", tagline: "Build & Craft", desc: "Software, engineering, product building & technical mastery", traits: ["Developer", "Engineer", "Builder"], color: C.deep, glow: "rgba(20,68,71,0.2)" },
  ];

  return (
    <div style={{ textAlign: "center", padding: "clamp(34px,6vw,60px) 16px", animation: "fadeUp .5s ease both" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(43,135,141,0.12)", border: "1.5px solid rgba(43,135,141,0.32)", borderRadius: 999, padding: "6px 18px", marginBottom: 22, fontSize: 12, color: C.med, fontWeight: 800, letterSpacing: 0.5 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.bright, display: "inline-block" }} />
        Step 1 of 2 — Choose Your Path
      </div>
      <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(27px,5vw,46px)", background: G.heading, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 12, lineHeight: 1.18 }}>
        Who are you on<br /><em>this journey?</em>
      </h2>
      <p style={{ fontSize: "clamp(14px,2vw,16px)", color: "rgba(20,68,71,0.6)", lineHeight: 1.8, maxWidth: 440, margin: "0 auto 38px" }}>
        Your questions, insights and Ikigai will be fully tailored to your chosen role.
      </p>

      {/* All 3 cards in one aligned, evenly-spaced, responsive row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? 14 : 18,
          maxWidth: 880,
          margin: "0 auto 38px",
          alignItems: "stretch",
        }}
      >
        {roles.map((r, i) => {
          const sel = chosen === r.id;
          return (
            <div
              key={r.id}
              className="lift"
              onClick={() => setChosen(r.id)}
              style={{
                padding: "26px 20px",
                borderRadius: 24,
                cursor: "pointer",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: sel
                  ? `linear-gradient(160deg, ${r.color}1a, rgba(255,255,255,0.9))`
                  : G.glass,
                backdropFilter: "blur(14px)",
                border: `${sel ? 2 : 1.5}px solid ${sel ? r.color : "rgba(255,255,255,0.6)"}`,
                boxShadow: sel ? `0 18px 48px ${r.glow}` : "0 6px 22px rgba(20,68,71,0.07)",
                transform: sel ? "translateY(-6px)" : "none",
                animation: `scaleIn .5s cubic-bezier(.22,.68,0,1.2) ${0.08 + i * 0.1}s both`,
                position: "relative",
              }}
            >
              {sel && (
                <div style={{ position: "absolute", top: 14, right: 14, width: 24, height: 24, borderRadius: "50%", background: r.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>✓</div>
              )}
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: sel ? `${r.color}1f` : "rgba(255,255,255,0.55)", border: `2px solid ${sel ? r.color : "rgba(20,68,71,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 16, boxShadow: sel ? `0 6px 20px ${r.glow}` : "none", transition: "all .3s ease" }}>
                {r.icon}
              </div>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: sel ? r.color : "rgba(20,68,71,0.35)", marginBottom: 5 }}>{r.tagline}</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 19, fontWeight: 800, color: sel ? r.color : C.deep, marginBottom: 8 }}>{r.name}</div>
              <div style={{ fontSize: 12.5, color: "rgba(20,68,71,0.56)", lineHeight: 1.55, marginBottom: 16, flex: 1 }}>{r.desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                {r.traits.map((t) => (
                  <span key={t} style={{ padding: "4px 11px", borderRadius: 999, fontSize: 10.5, background: sel ? `${r.color}14` : "rgba(20,68,71,0.04)", color: sel ? r.color : "rgba(20,68,71,0.48)", border: `1px solid ${sel ? r.color + "44" : "rgba(20,68,71,0.06)"}`, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button className="press" onClick={() => chosen && onSelect(chosen)} disabled={!chosen} style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "15px 44px", borderRadius: 999, border: "none", cursor: chosen ? "pointer" : "not-allowed", background: chosen ? G.btn : "rgba(20,68,71,0.08)", color: chosen ? "#fff" : "rgba(20,68,71,0.25)", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 15, boxShadow: chosen ? "0 12px 38px rgba(43,135,141,0.42)" : "none" }}>
        {chosen ? `Begin as ${roles.find((r) => r.id === chosen)?.name} →` : "Select a path to continue"}
      </button>
    </div>
  );
};

/* ─── DAY INTRO ─────────────────────────────────────────── */
const DayIntro = () => {
  const { currentDayData, startDay } = useIkigai();
  if (!currentDayData) return null;
  const meta = currentDayData;
  return (
    <div style={{ textAlign: "center", padding: "clamp(22px,4vw,40px) 16px clamp(28px,4vw,44px)", animation: "scaleIn .45s ease both" }}>
      <div style={{ position: "relative", display: "inline-block", marginBottom: 24 }}>
        <div style={{ width: 100, height: 100, borderRadius: "50%", background: G.glass, backdropFilter: "blur(10px)", border: `3px solid ${meta.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, boxShadow: `0 0 0 12px ${meta.color}12, 0 16px 44px ${meta.color}28`, animation: "floaty 3.5s ease-in-out infinite" }}>
          {meta.icon}
        </div>
        <div style={{ position: "absolute", top: -4, right: -4, width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg,${meta.color},${meta.color}bb)`, color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 3px 12px ${meta.color}55` }}>
          {meta.day}
        </div>
      </div>
      <div style={{ fontSize: 11, color: meta.color, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
        Day {meta.day} of 6 · {meta.headline}
      </div>
      <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(25px,5vw,40px)", background: `linear-gradient(135deg,${C.deep},${meta.color})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 8, lineHeight: 1.18 }}>
        {meta.title}
      </h2>
      <p style={{ fontSize: "clamp(13px,2vw,15px)", color: "rgba(20,68,71,0.56)", marginBottom: 8 }}>{meta.subtitle}</p>
      <p style={{ fontSize: 14, color: "rgba(20,68,71,0.46)", lineHeight: 1.75, maxWidth: 390, margin: "0 auto 28px" }}>{meta.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 30 }}>
        {["3 MCQ questions", "3 Multi-select", "4 Writing prompts"].map((t) => (
          <span key={t} style={{ padding: "5px 14px", borderRadius: 999, fontSize: 11.5, background: `${meta.color}10`, color: meta.color, border: `1.5px solid ${meta.color}30`, fontWeight: 600 }}>{t}</span>
        ))}
      </div>
      <button className="press" onClick={startDay} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 36px", borderRadius: 999, border: "none", background: "linear-gradient(135deg, #61CECF, #3BAFB0)", color: "#fff", cursor: "pointer", fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 16, boxShadow: "0 10px 32px rgba(97, 206, 207, 0.45)" }}>
        Start Day {meta.day} <span style={{ fontSize: 18 }}>→</span>
      </button>
    </div>
  );
};

/* ─── CELEBRATION ───────────────────────────────────────── */
const DayCelebration = () => {
  const { dayIndex, afterCelebration } = useIkigai();
  const day = dayIndex + 1;
  const isLast = dayIndex === 5;
  const meta = DAYS_META[dayIndex];
  const msgs = [
    { h: "Day 1 Complete!", s: "You've uncovered what you love. Your passion is your compass." },
    { h: "Day 2 Complete!", s: "You've designed your ideal life. Lifestyle shapes everything." },
    { h: "Day 3 Complete!", s: "Your strengths are clear. You know what makes you powerful." },
    { h: "Day 4 Complete!", s: "Vocation clarity achieved. You know how you want to be valued." },
    { h: "Day 5 Complete!", s: "Your mission is defined. You know the impact you want to leave." },
    { h: "Journey Complete!", s: "All 6 days done. Your Ikigai is ready to be revealed!" },
  ];
  const msg = msgs[dayIndex];

  return (
    <>
      <Confetti count={isLast ? 100 : 64} />
      <div style={{ position: "fixed", inset: 0, background: "rgba(20,68,71,0.62)", backdropFilter: "blur(10px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: G.glass, backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.6)", borderRadius: 30, padding: "clamp(30px,4vw,52px)", textAlign: "center", maxWidth: 450, width: "100%", boxShadow: "0 26px 84px rgba(0,0,0,0.24)", animation: "celeb .55s cubic-bezier(.22,.68,0,1.2) both", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${meta.color},${meta.color}88)` }} />
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20, marginTop: 6 }}>
            {Array.from({ length: isLast ? 6 : 3 }).map((_, i) => (
              <span key={i} style={{ fontSize: isLast ? 24 : 20, animation: `scaleIn .5s cubic-bezier(.22,.68,0,1.8) ${i * 0.1}s both` }}>{isLast ? "🌟" : "⭐"}</span>
            ))}
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${meta.color}12`, border: `1px solid ${meta.color}30`, borderRadius: 999, padding: "5px 16px", marginBottom: 14 }}>
            <span>{meta.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: meta.color, letterSpacing: 1, textTransform: "uppercase" }}>Day {day} — {meta.headline}</span>
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(21px,4vw,29px)", color: C.deep, marginBottom: 10, lineHeight: 1.25 }}>{msg.h}</h2>
          <p style={{ fontSize: "clamp(13px,2vw,15px)", color: "rgba(20,68,71,0.58)", lineHeight: 1.7, maxWidth: 300, margin: "0 auto 24px" }}>{msg.s}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 26 }}>
            {DAYS_META.slice(0, day).map((d) => (
              <span key={d.day} style={{ padding: "4px 11px", borderRadius: 999, fontSize: 11, background: `${d.color}12`, color: d.color, border: `1.5px solid ${d.color}44`, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 9 }}>✓</span>{d.headline}
              </span>
            ))}
          </div>
          <button className="press" onClick={afterCelebration} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 999, border: "none", width: "100%", justifyContent: "center", cursor: "pointer", background: isLast ? G.accentBtn : G.btn, color: isLast ? "#06302f" : "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 15, boxShadow: isLast ? "0 10px 30px rgba(97,206,207,0.5)" : "0 8px 28px rgba(43,135,141,0.4)" }}>
            {isLast ? "Reveal My Ikigai 🌸" : `Continue to Day ${day + 1}: ${DAYS_META[day]?.headline || ""} →`}
          </button>
        </div>
      </div>
    </>
  );
};

/* ─── LOADING ───────────────────────────────────────────── */
const LoadingScreen = () => {
  const msgs = ["Gathering your passions…", "Mapping your strengths…", "Weaving your purpose…", "Crafting your Ikigai…"];
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % msgs.length), 1600);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ position: "relative", width: 92, height: 92, margin: "0 auto 28px" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", inset: i * 11, borderRadius: "50%", border: `2.5px solid ${[C.bright, C.med, C.deep][i]}`, opacity: 0.3 + i * 0.25, animation: `spin ${1.4 + i * 0.45}s linear infinite ${i % 2 ? "reverse" : ""}` }} />
        ))}
        <div style={{ position: "absolute", inset: 34, borderRadius: "50%", background: `linear-gradient(135deg,${C.bright},${C.med})`, animation: "pulse 1.6s ease-in-out infinite" }} />
      </div>
      <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 800, background: G.heading, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 12 }}>Revealing your Ikigai</h3>
      <p style={{ fontSize: 15, color: "rgba(20,68,71,0.5)" }}>{msgs[phase]}</p>
    </div>
  );
};

/* ─── RESULT PAGE ───────────────────────────────────────── */
const ResultPage = () => {
  const { role, analysis, restart, isMobile } = useIkigai();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2400);
    return () => clearTimeout(t);
  }, []);

  if (!ready || !analysis) return <LoadingScreen />;

  const roleMeta = ROLES[role] || ROLES.entrepreneur;
  const zoneCards = [
    { label: "Passion", sub: "What you love", body: analysis.passion, color: "#F5C24C" },
    { label: "Profession", sub: "What you're good at", body: analysis.profession, color: "#3FAE7E" },
    { label: "Mission", sub: "What the world needs", body: analysis.mission, color: "#E74C3C" },
    { label: "Vocation", sub: "What you can be paid for", body: analysis.vocation, color: "#2BAEE0" },
  ];

  return (
    <div style={{ animation: "fadeUp .6s ease both" }}>
      <div style={{ background: `linear-gradient(135deg,${C.deep} 0%,#0d4d62 45%,#155f72 100%)`, borderRadius: 26, padding: isMobile ? "26px 20px 30px" : "46px 38px 38px", textAlign: "center", marginBottom: 16 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(97,206,207,0.15)", borderRadius: 999, padding: "5px 16px", marginBottom: 16 }}>
          <span>{roleMeta.icon}</span>
          <span style={{ fontSize: 11, color: "rgba(184,236,237,0.9)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>{roleMeta.name} Path</span>
        </div>
        <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: isMobile ? 21 : "clamp(22px,3.5vw,32px)", color: "#fff", marginBottom: 8, lineHeight: 1.3 }}>{analysis.ikigaiTitle}</h1>
      </div>

      <div style={{ background: G.glass, borderRadius: 22, padding: isMobile ? "22px 16px" : "30px 28px", marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.med, marginBottom: 16, textAlign: "center", letterSpacing: 1.5, textTransform: "uppercase" }}>Your Ikigai Map</div>
        <IkigaiVenn analysis={analysis} isMobile={isMobile} />
      </div>

      <div style={{ background: G.glass, borderRadius: 20, padding: "22px 24px", marginBottom: 14, borderLeft: `4px solid ${C.med}` }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.med, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>✦ Your Ikigai Statement</div>
        <p style={{ fontSize: 15.5, color: C.deep, lineHeight: 1.75, fontStyle: "italic", fontFamily: "'Fraunces',serif" }}>"{analysis.ikigaiStatement}"</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 12, marginBottom: 14 }}>
        {zoneCards.map((z, i) => (
          <div key={z.label} style={{ background: G.glass, borderRadius: 18, padding: isMobile ? "16px" : "20px 22px", borderLeft: `4px solid ${z.color}`, animation: `fadeUp .5s ease ${0.1 + i * 0.08}s both` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: z.color }} />
              <span style={{ fontSize: 10, fontWeight: 800, color: z.color, textTransform: "uppercase", letterSpacing: 0.8 }}>{z.label}</span>
              <span style={{ fontSize: 10, color: "rgba(20,68,71,0.4)" }}>· {z.sub}</span>
            </div>
            <p style={{ fontSize: 13.5, color: C.deep, lineHeight: 1.65, margin: 0 }}>{z.body}</p>
          </div>
        ))}
      </div>

      <div style={{ background: G.glass, borderRadius: 20, padding: "22px 24px", marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.med, marginBottom: 14, letterSpacing: 1, textTransform: "uppercase" }}>Personality Profile</div>
        <p style={{ fontSize: 14, color: C.deep, lineHeight: 1.75, marginBottom: 16 }}>{analysis.personalitySummary}</p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: 10 }}>
          {[
            { label: "Top Traits", items: analysis.topTraits },
            { label: "Core Strengths", items: analysis.coreStrengths },
            { label: "Interest Paths", items: analysis.interestPaths },
          ].map((sec) => (
            <div key={sec.label} style={{ background: "rgba(43,135,141,0.06)", borderRadius: 14, padding: "14px 16px" }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: C.med, marginBottom: 10, letterSpacing: 0.5, textTransform: "uppercase" }}>{sec.label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {(sec.items || []).slice(0, 5).map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: C.deep }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.med, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 3 DYNAMIC CAREER / ROLE PATHS ─── */}
      <div style={{ background: `linear-gradient(135deg, rgba(97,206,207,0.12), rgba(43,135,141,0.08))`, borderRadius: 20, padding: isMobile ? "20px" : "24px 26px", marginBottom: 14, border: "1px solid rgba(97,206,207,0.25)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.med, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>🚀 Recommended Career Paths</div>
        <p style={{ fontSize: 12.5, color: "rgba(20,68,71,0.55)", marginBottom: 16, lineHeight: 1.5 }}>
          Based on your strongest traits, these three directions fit you best:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 12 }}>
          {(analysis.careerPaths || []).map((cp, i) => (
            <div key={cp.title} style={{ background: "rgba(255,255,255,0.78)", borderRadius: 16, padding: "18px 18px", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 6px 20px rgba(20,68,71,0.06)", animation: `fadeUp .5s ease ${0.1 + i * 0.1}s both`, display: "flex", flexDirection: "column" }}>
              <div style={{ width: 30, height: 30, borderRadius: 10, background: `linear-gradient(135deg, ${C.bright}, ${C.med})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, marginBottom: 12, fontFamily: "'Sora',sans-serif" }}>{i + 1}</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14.5, fontWeight: 800, color: C.deep, marginBottom: 7, lineHeight: 1.3 }}>{cp.title}</div>
              <div style={{ fontSize: 12.5, color: "rgba(20,68,71,0.62)", lineHeight: 1.6 }}>{cp.why}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg,rgba(20,68,71,0.05),rgba(97,206,207,0.08))", borderRadius: 20, padding: "22px 24px", marginBottom: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.med, marginBottom: 8, letterSpacing: 0.8, textTransform: "uppercase" }}>★ Your Drive</div>
            <p style={{ fontSize: 14, color: C.deep, fontStyle: "italic", lineHeight: 1.6 }}>"{analysis.motivationLine}"</p>
          </div>
          <div style={{ borderLeft: isMobile ? "none" : "1px solid rgba(43,135,141,0.18)", paddingLeft: isMobile ? 0 : 18 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.med, marginBottom: 8, letterSpacing: 0.8, textTransform: "uppercase" }}>→ Your Next Step</div>
            <p style={{ fontSize: 13.5, color: C.deep, lineHeight: 1.6 }}>{analysis.nextStep}</p>
          </div>
        </div>
      </div>

      <button className="press" onClick={restart} style={{ display: "block", width: "100%", padding: "17px", borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.deep},#0d4d62)`, color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Sora',sans-serif" }}>
        Start Over ↺
      </button>
      <p style={{ fontSize: 11, color: "rgba(20,68,71,0.36)", textAlign: "center", marginTop: 14 }}>
        Powered by Get Founds Technologies · India's No.1 Digital Nomads Organisation
      </p>
    </div>
  );
};

/* ─── INNER NAVBAR (journey progress bar inside the page) ── */
const InnerNav = () => {
  const { screen, role, dayIndex, completedDays, isMobile } = useIkigai();
  if (screen === "landing") return null;
  const roleMeta = role ? ROLES[role] : null;

  return (
    <div style={{ background: G.glass, backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(43,135,141,0.16)", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, borderRadius: "0 0 18px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ fontSize: 20 }}>☯</span>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: isMobile ? 13 : 16, fontWeight: 800, background: G.heading, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Ikigai Journey</span>
        {roleMeta && screen !== "roleSelect" && !isMobile && (
          <span style={{ padding: "4px 11px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: "rgba(43,135,141,0.12)", color: C.med, border: "1px solid rgba(43,135,141,0.25)" }}>{roleMeta.icon} {roleMeta.name}</span>
        )}
      </div>
      {screen === "journey" && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {DAYS_META.map((d) => {
            const done = completedDays.includes(d.day);
            const active = dayIndex === d.day - 1;
            return <div key={d.day} style={{ width: active ? 22 : 6, height: 6, borderRadius: 999, background: done || active ? d.color : "rgba(20,68,71,0.1)", transition: "all .3s ease" }} />;
          })}
        </div>
      )}
    </div>
  );
};

/* ─── SHELL (consumes context) ──────────────────────────── */
const Shell = () => {
  const {
    screen,
    setScreen,
    chooseRole,
    questionIndex,
    showCelebration,
    currentDayData,
    isMobile,
  } = useIkigai();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: G.bg,
        fontFamily: "'Manrope',sans-serif",
        position: "relative",
        overflowX: "hidden",
        /* clear the app-level 280px fixed sidebar on desktop */
        marginLeft: isMobile ? 0 : SIDEBAR_W,
        width: isMobile ? "100%" : `calc(100% - ${SIDEBAR_W}px)`,
      }}
    >
      <GlobalStyles />
      <Blobs />
      <InnerNav />

      {showCelebration && <DayCelebration />}

      <div
        style={{
          maxWidth:
            screen === "result" ? 900 : screen === "journey" ? 780 : 720,
          margin: "0 auto",
          width: "100%",
          padding:
            screen === "landing" || screen === "roleSelect"
              ? `0 ${isMobile ? 16 : 24}px`
              : `${isMobile ? 16 : 24}px ${isMobile ? 14 : 24}px 64px`,
          position: "relative",
          zIndex: 1,
        }}
      >
        {screen === "landing" && <Landing onStart={() => setScreen("roleSelect")} />}
        {screen === "roleSelect" && <RoleSelect onSelect={chooseRole} />}
        {screen === "journey" && currentDayData && (
          <>
            {questionIndex >= 0 && <ProgressBar />}
            {questionIndex === -1 ? <DayIntro /> : <QuestionCard />}
          </>
        )}
        {screen === "result" && <ResultPage />}
      </div>
    </div>
  );
};

/* ─── PUBLIC COMPONENT ──────────────────────────────────── */
export default function Sevendays() {
  const location = useLocation();
  // Role passed from Home via navigate('/sevendays', { state:{ role } })
  // or ?role=entrepreneur query param.
  const stateRole = location?.state?.role;
  const queryRole =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("role")
      : null;
  const initialRole = stateRole || queryRole || null;
  const validRole = ["entrepreneur", "managerial", "technician"].includes(
    initialRole
  )
    ? initialRole
    : null;

  return (
    <IkigaiProvider initialRole={validRole}>
      <Shell />
    </IkigaiProvider>
  );
}