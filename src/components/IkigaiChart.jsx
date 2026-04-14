import { useState, useEffect } from "react";
import { useIkigai } from "../context/IkigaiContext";

// ── SVG Venn Diagram ──────────────────────────────────────────────────────────
function IkigaiVenn() {
  return (
    <svg viewBox="0 0 360 300" style={{ width: "100%", maxWidth: 380, margin: "0 auto", display: "block" }}>
      <defs>
        {[["vg0","#e85d4a"],["vg1","#3a9e6e"],["vg2","#5b6af0"],["vg3","#9b59b6"]].map(([id, c]) => (
          <radialGradient key={id} id={id} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c} stopOpacity="0.42" />
            <stop offset="100%" stopColor={c} stopOpacity="0.06" />
          </radialGradient>
        ))}
        <filter id="centreGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <circle cx={145} cy={123} r={74} fill="url(#vg0)" stroke="#e85d4a" strokeWidth={1.5} strokeOpacity={0.45} />
      <circle cx={215} cy={123} r={74} fill="url(#vg1)" stroke="#3a9e6e" strokeWidth={1.5} strokeOpacity={0.45} />
      <circle cx={215} cy={178} r={74} fill="url(#vg2)" stroke="#5b6af0" strokeWidth={1.5} strokeOpacity={0.45} />
      <circle cx={145} cy={178} r={74} fill="url(#vg3)" stroke="#9b59b6" strokeWidth={1.5} strokeOpacity={0.45} />

      {/* Centre */}
      <circle cx={180} cy={150} r={28} fill="white" fillOpacity={0.95} filter="url(#centreGlow)" />
      <text x={180} y={146} textAnchor="middle" fontSize={9} fontWeight={700} fill="#1a1a1a" fontFamily="DM Sans,sans-serif">IKIGAI</text>
      <text x={180} y={157} textAnchor="middle" fontSize={7} fill="#999" fontFamily="DM Sans,sans-serif">your purpose</text>

      {/* Quadrant labels */}
      <text x={145} y={36}  textAnchor="middle" fontSize={9.5} fill="#e85d4a" fontWeight={600} fontFamily="DM Sans,sans-serif">What you love</text>
      <text x={215} y={36}  textAnchor="middle" fontSize={9.5} fill="#3a9e6e" fontWeight={600} fontFamily="DM Sans,sans-serif">What you&apos;re good at</text>
      <text x={215} y={272} textAnchor="middle" fontSize={9.5} fill="#5b6af0" fontWeight={600} fontFamily="DM Sans,sans-serif">What pays you</text>
      <text x={145} y={272} textAnchor="middle" fontSize={9.5} fill="#9b59b6" fontWeight={600} fontFamily="DM Sans,sans-serif">What the world needs</text>
    </svg>
  );
}

// ── Animated section card ─────────────────────────────────────────────────────
function SectionCard({ icon, label, content, color, bg, delay }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(22px)",
      transition: "all 0.55s cubic-bezier(.22,.68,0,1.2)",
      height: "100%",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(12px)",
        borderRadius: 20,
        padding: "20px 22px",
        height: "100%",
        boxShadow: "0 4px 28px rgba(0,0,0,0.07)",
        border: `1.5px solid ${bg}`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${color}22`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 28px rgba(0,0,0,0.07)"; }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 11,
            background: bg, color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 700,
            boxShadow: `0 2px 10px ${color}22`,
          }}>{icon}</div>
          <span style={{
            fontSize: 10, fontWeight: 800, color,
            textTransform: "uppercase", letterSpacing: 1.8,
          }}>{label}</span>
        </div>
        <p style={{ fontSize: 14, color: "#333", lineHeight: 1.8, margin: 0 }}>{content}</p>
      </div>
    </div>
  );
}

// ── Main IkigaiChart component ────────────────────────────────────────────────
export default function IkigaiChart() {
  const { result, restart } = useIkigai();
  const [heroVis, setHeroVis] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const t = setTimeout(() => setHeroVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!result) return null;

  const sections = [
    { icon: "◈", label: "Why This Fits You",  content: result.ikigaiSummary,   color: "#3a9e6e", bg: "#f0fbf5", delay: 350 },
    { icon: "◆", label: "Ideal Work Style",   content: result.workStyle,        color: "#5b6af0", bg: "#f3f4ff", delay: 480 },
    { icon: "◑", label: "Personal Insight",   content: result.personalInsight,  color: "#f0942a", bg: "#fff8f0", delay: 610 },
    { icon: "★", label: "Final Motivation",   content: result.motivationLine,   color: "#9b59b6", bg: "#faf0ff", delay: 740 },
  ];

  const careerMeta = [
    { color: "#e85d4a", bg: "#fff5f3", num: "01" },
    { color: "#3a9e6e", bg: "#f0fbf5", num: "02" },
    { color: "#5b6af0", bg: "#f3f4ff", num: "03" },
  ];

  return (
    <div style={{
      width: "100%",
      opacity: heroVis ? 1 : 0,
      transition: "opacity 0.7s ease",
    }}>
      {/* ── Hero banner ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1a40 100%)",
        borderRadius: 28,
        padding: "clamp(28px, 5vw, 48px) clamp(20px, 4vw, 40px) clamp(24px, 4vw, 36px)",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
        marginBottom: 20,
        opacity: heroVis ? 1 : 0,
        transform: heroVis ? "scale(1)" : "scale(0.97)",
        transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)",
      }}>
        {/* Background blobs */}
        <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(91,106,240,0.2)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-50, left:-50, width:180, height:180, borderRadius:"50%", background:"rgba(232,93,74,0.15)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"30%", right:"-5%", width:120, height:120, borderRadius:"50%", background:"rgba(155,89,182,0.12)", pointerEvents:"none" }}/>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(91,106,240,0.2)",
          backdropFilter: "blur(8px)",
          borderRadius: 50, padding: "6px 16px", marginBottom: 18,
          border: "1px solid rgba(160,170,255,0.25)",
          position: "relative",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#a0aaff", display: "inline-block" }}/>
          <span style={{ fontSize: 11, color: "#c0caff", letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700 }}>
            Your Ikigai
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(20px, 4vw, 32px)",
          color: "#fff",
          marginBottom: 28,
          lineHeight: 1.3,
          position: "relative",
          textShadow: "0 2px 20px rgba(0,0,0,0.3)",
        }}>
          {result.ikigaiTitle}
        </h1>

        <IkigaiVenn />
      </div>

      {/* ── Info cards — 2-col grid on desktop ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 14,
        marginBottom: 16,
      }}>
        {sections.map((s) => (
          <SectionCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── Career Paths ── */}
      <div style={{
        opacity: heroVis ? 1 : 0,
        transform: heroVis ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease 0.87s",
        marginBottom: 16,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(12px)",
          borderRadius: 22,
          padding: "22px 24px",
          boxShadow: "0 4px 28px rgba(0,0,0,0.07)",
          border: "1.5px solid rgba(232,93,74,0.1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 11,
              background: "#fff5f3",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>♥</div>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#e85d4a", textTransform: "uppercase", letterSpacing: 1.8 }}>
              Recommended Career Paths
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {result.careerPaths?.map((path, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "15px 18px", borderRadius: 14,
                background: careerMeta[i]?.bg || "#f9f9f9",
                border: `1.5px solid ${careerMeta[i]?.color || "#ddd"}20`,
                cursor: "default",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(6px)";
                  e.currentTarget.style.boxShadow = `0 4px 18px ${careerMeta[i]?.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  fontSize: 11, fontWeight: 800,
                  color: careerMeta[i]?.color,
                  minWidth: 30, fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: 0.5,
                }}>
                  {careerMeta[i]?.num}
                </div>
                <span style={{ fontSize: 15, color: "#1a1a1a", fontWeight: 500, flex: 1 }}>
                  {path}
                </span>
                <span style={{ color: careerMeta[i]?.color, fontSize: 16, opacity: 0.7 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Restart button ── */}
      <div style={{
        opacity: heroVis ? 1 : 0,
        transition: "opacity 0.5s ease 1s",
      }}>
        <button onClick={restart} style={{
          display: "block", width: "100%",
          padding: "16px", borderRadius: 50,
          fontSize: 15, fontWeight: 700,
          cursor: "pointer", border: "none",
          background: "linear-gradient(135deg, #0f0c29, #302b63)",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.25s ease",
          letterSpacing: 0.5,
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 28px rgba(15,12,41,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Start Over ↺
        </button>
      </div>
    </div>
  );
}