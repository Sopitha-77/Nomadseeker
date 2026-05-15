import { useState, useEffect } from "react";
import { useIkigai, PALETTE } from "../context/IkigaiContext";

/* ─── CLASSIC 4-CIRCLE IKIGAI VENN ────────────────────────────
   Matches the reference image:
   - 4 colored circles overlapping in a flower pattern
   - Yellow (love), Green (good at), Red (world needs), Blue (paid for)
   - Labels: Passion, Mission, Vocation, Profession at overlaps
   - IKIGAI at the center where all four meet
*/
function IkigaiVenn({ passion, mission, vocation, profession, isMobile }) {
  const C = {
    love:       "#F5C24C",
    goodAt:     "#3FAE7E",
    worldNeeds: "#E74C3C",
    paidFor:    "#2BAEE0",
  };

  const size = isMobile ? 340 : 460;
  const viewBox = "0 0 460 460";

  return (
    <div style={{ width: "100%", maxWidth: size, margin: "0 auto" }}>
      <svg viewBox={viewBox} style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <filter id="ikigai-shadow">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="center-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer category labels */}
        <text x="115" y="60"  textAnchor="middle" fontSize="14" fontWeight="700" fill="#444" fontFamily="Sora, sans-serif">What you</text>
        <text x="115" y="78"  textAnchor="middle" fontSize="14" fontWeight="700" fill="#444" fontFamily="Sora, sans-serif">love</text>

        <text x="345" y="60"  textAnchor="middle" fontSize="14" fontWeight="700" fill="#444" fontFamily="Sora, sans-serif">What you</text>
        <text x="345" y="78"  textAnchor="middle" fontSize="14" fontWeight="700" fill="#444" fontFamily="Sora, sans-serif">are good at</text>

        <text x="115" y="395" textAnchor="middle" fontSize="14" fontWeight="700" fill="#444" fontFamily="Sora, sans-serif">What the</text>
        <text x="115" y="413" textAnchor="middle" fontSize="14" fontWeight="700" fill="#444" fontFamily="Sora, sans-serif">world needs</text>

        <text x="345" y="395" textAnchor="middle" fontSize="14" fontWeight="700" fill="#444" fontFamily="Sora, sans-serif">What you can</text>
        <text x="345" y="413" textAnchor="middle" fontSize="14" fontWeight="700" fill="#444" fontFamily="Sora, sans-serif">be paid for</text>

        {/* Four overlapping circles — flower pattern */}
        {/* Top-Left: LOVE (yellow) */}
        <circle cx="170" cy="170" r="115" fill={C.love}       fillOpacity="0.78" />
        {/* Top-Right: GOOD AT (green) */}
        <circle cx="290" cy="170" r="115" fill={C.goodAt}     fillOpacity="0.78" />
        {/* Bottom-Left: WORLD NEEDS (red) */}
        <circle cx="170" cy="290" r="115" fill={C.worldNeeds} fillOpacity="0.78" />
        {/* Bottom-Right: PAID FOR (blue) */}
        <circle cx="290" cy="290" r="115" fill={C.paidFor}    fillOpacity="0.78" />

        {/* Overlap labels — placed in the 2-way intersections */}
        {/* PASSION = Love ∩ Good At (top center) */}
        <text x="230" y="155" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff"
          fontFamily="Sora, sans-serif" filter="url(#ikigai-shadow)">Passion</text>

        {/* MISSION = Love ∩ World Needs (left center) */}
        <text x="155" y="235" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff"
          fontFamily="Sora, sans-serif" filter="url(#ikigai-shadow)">Mission</text>

        {/* PROFESSION = Good At ∩ Paid For (right center) */}
        <text x="305" y="235" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff"
          fontFamily="Sora, sans-serif" filter="url(#ikigai-shadow)">Profession</text>

        {/* VOCATION = World Needs ∩ Paid For (bottom center) */}
        <text x="230" y="312" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff"
          fontFamily="Sora, sans-serif" filter="url(#ikigai-shadow)">Vocation</text>

        {/* IKIGAI center — where all 4 meet */}
        <circle cx="230" cy="230" r="34" fill="#fff" fillOpacity="0.96" filter="url(#center-glow)" />
        <circle cx="230" cy="230" r="34" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        <text x="230" y="238" textAnchor="middle" fontSize="18" fontWeight="900"
          fill={PALETTE.tiber} fontFamily="Playfair Display, serif" letterSpacing="1.5">Ikigai</text>
      </svg>
    </div>
  );
}

/* ─── ZONE CARD (each of the 4 dimensions) ──────────────────── */
function ZoneCard({ label, sublabel, content, color, bg, delay, isMobile }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(18px)",
      transition: "all 0.55s cubic-bezier(.22,.68,0,1.2)",
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(16px)",
      borderRadius: 18,
      padding: isMobile ? "16px 16px" : "18px 20px",
      border: `1.5px solid ${color}33`,
      boxShadow: `0 4px 20px ${color}15`,
      borderLeft: `4px solid ${color}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: color, boxShadow: `0 0 8px ${color}`,
        }} />
        <span style={{
          fontSize: 10, fontWeight: 800, color,
          textTransform: "uppercase", letterSpacing: 1.5,
        }}>
          {label}
        </span>
      </div>
      <div style={{ fontSize: 10, color: "#888", marginBottom: 8, fontStyle: "italic" }}>
        {sublabel}
      </div>
      <p style={{
        fontSize: 13.5, color: PALETTE.tiber, lineHeight: 1.6, margin: 0,
        fontWeight: 500,
      }}>
        {content}
      </p>
    </div>
  );
}

/* ─── SECTION CARD ──────────────────────────────────────────── */
function SectionCard({ icon, label, content, color, bg, delay }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.55s cubic-bezier(.22,.68,0,1.2)",
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(16px)",
      borderRadius: 18,
      padding: "20px 22px",
      border: `1.5px solid ${bg}`,
      boxShadow: "0 4px 24px rgba(10,57,72,0.07)",
      height: "100%",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: `linear-gradient(135deg, ${bg}, ${color}22)`,
          color, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 700, border: `1.5px solid ${color}33`,
        }}>{icon}</div>
        <span style={{
          fontSize: 10, fontWeight: 800, color,
          textTransform: "uppercase", letterSpacing: 1.8,
        }}>
          {label}
        </span>
      </div>
      <p style={{
        fontSize: 13.5, color: PALETTE.tiber, lineHeight: 1.75,
        margin: 0, opacity: 0.88,
      }}>
        {content}
      </p>
    </div>
  );
}

/* ─── TRAIT PILL ────────────────────────────────────────────── */
function TraitPill({ label, icon, color, bg, delay }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "7px 14px", borderRadius: 50,
      background: bg, border: `1.5px solid ${color}25`,
      fontSize: 12.5, fontWeight: 600, color,
      fontFamily: "'Manrope', sans-serif",
      opacity: show ? 1 : 0,
      transform: show ? "scale(1)" : "scale(0.85)",
      transition: "all 0.35s cubic-bezier(.22,.68,0,1.4)",
    }}>
      <span style={{ fontSize: 10 }}>{icon}</span>
      {label}
    </div>
  );
}

/* ─── TRAITS DISPLAY ────────────────────────────────────────── */
function TraitsDisplay({ analysis, delay }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!analysis?.traits?.length && !analysis?.strengths?.length) return null;

  const traitIcons = {
    "Analytical Thinker": "◎", "Innovative Creator": "✦", "Strategic Planner": "◆",
    "Empathetic Helper": "♡", "Collaborative Team Player": "◈", "Persuasive Leader": "★",
    "Detail-Oriented Perfectionist": "◉", "Curious Learner": "❋", "Independent Thinker": "◐",
    "Ambitious Achiever": "▲", "Creative Artist": "◑", "Pragmatic Executor": "▶",
  };

  return (
    <div style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s cubic-bezier(.22,.68,0,1.2)",
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)",
      borderRadius: 22, padding: "24px 26px",
      boxShadow: "0 4px 24px rgba(10,57,72,0.08)",
      border: `1.5px solid rgba(100,205,209,0.25)`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: `linear-gradient(135deg, rgba(100,205,209,0.15), rgba(87,148,164,0.15))`,
          border: `1.5px solid rgba(100,205,209,0.3)`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>◈</div>
        <span style={{
          fontSize: 10, fontWeight: 800, color: PALETTE.horizon,
          textTransform: "uppercase", letterSpacing: 1.8,
        }}>
          Your Personality Profile
        </span>
      </div>

      {analysis.traits?.length > 0 && (
        <div style={{ marginBottom: analysis.strengths?.length > 0 ? 20 : 0 }}>
          <p style={{
            fontSize: 10, fontWeight: 700, color: PALETTE.horizon,
            textTransform: "uppercase", letterSpacing: 1.5,
            marginBottom: 12, opacity: 0.7,
          }}>
            Core Traits
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {analysis.traits.map((trait, i) => (
              <TraitPill key={trait} label={trait} icon={traitIcons[trait] || "◎"}
                color={PALETTE.tiber} bg="rgba(10,57,72,0.06)" delay={i * 60} />
            ))}
          </div>
        </div>
      )}

      {analysis.strengths?.length > 0 && (
        <div>
          <p style={{
            fontSize: 10, fontWeight: 700, color: PALETTE.horizon,
            textTransform: "uppercase", letterSpacing: 1.5,
            marginBottom: 12, opacity: 0.7,
          }}>
            Key Strengths
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {analysis.strengths.map((s, i) => (
              <TraitPill key={s} label={s} icon="▶"
                color={PALETTE.horizon} bg="rgba(87,148,164,0.08)" delay={i * 60} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── DIMENSION BAR ─────────────────────────────────────────── */
function DimensionBar({ label, value, max, color, delay }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  const pct = Math.round(Math.min((value / Math.max(max, 1)) * 100, 100));

  return (
    <div style={{
      opacity: show ? 1 : 0,
      transition: `opacity 0.5s ease ${delay}ms`,
      marginBottom: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: PALETTE.tiber, opacity: 0.85 }}>
          {label}
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{
        height: 6, borderRadius: 50,
        background: "rgba(10,57,72,0.08)", overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 50,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          width: show ? `${Math.max(pct, 4)}%` : "4%",
          transition: "width 1s cubic-bezier(.22,.68,0,1.2)",
        }} />
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
export default function IkigaiChart() {
  const { result, restart, roleMeta, role, personalityAnalysis, answers, getCurrentAnalysis } = useIkigai();
  const [heroVis, setHeroVis] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const t = setTimeout(() => setHeroVis(true), 80);
    return () => { window.removeEventListener("resize", handler); clearTimeout(t); };
  }, []);

  if (!result) return null;

  const effectiveAnalysis = personalityAnalysis ||
    (answers && Object.keys(answers).length > 0 ? getCurrentAnalysis?.() : null);

  const ikigaiDims = effectiveAnalysis?.ikigaiDimensions || { love: 3, goodAt: 3, paidFor: 3, worldNeeds: 3 };
  const maxDim = Math.max(...Object.values(ikigaiDims), 1);

  const roleLabels = {
    entrepreneur: { heading: "Entrepreneur's Ikigai", sub: "Your venture-driven purpose" },
    managerial:   { heading: "Leader's Ikigai",       sub: "Your management-driven purpose" },
    technician:   { heading: "Technician's Ikigai",   sub: "Your craft-driven purpose" },
  };
  const roleLabel = roleLabels[role] || { heading: "Your Ikigai", sub: "Your unique purpose" };

  // Four Ikigai zones — content from result
  const zones = [
    { label: "Passion",    sublabel: "Love ∩ Good At",        content: result.passion    || result.passionArea    || "What ignites you",       color: "#F5C24C", bg: "rgba(245,194,76,0.1)" },
    { label: "Profession", sublabel: "Good At ∩ Paid For",    content: result.profession || result.strengthArea   || "Your sharpest skills",   color: "#3FAE7E", bg: "rgba(63,174,126,0.1)" },
    { label: "Mission",    sublabel: "Love ∩ World Needs",    content: result.mission    || result.missionArea    || "How you serve others",   color: "#E74C3C", bg: "rgba(231,76,60,0.1)" },
    { label: "Vocation",   sublabel: "World Needs ∩ Paid For", content: result.vocation   || result.vocationArea   || "How you earn meaningfully", color: "#2BAEE0", bg: "rgba(43,174,224,0.1)" },
  ];

  const sections = [
    { icon: "♡", label: "Why This Fits You",  content: result.ikigaiSummary,   color: PALETTE.tiber,   bg: "rgba(10,57,72,0.08)",   delay: 300 },
    { icon: "◆", label: "Ideal Work Style",   content: result.workStyle,       color: PALETTE.horizon, bg: "rgba(87,148,164,0.08)", delay: 420 },
    { icon: "◑", label: "Personal Insight",   content: result.personalInsight, color: PALETTE.downy,   bg: "rgba(100,205,209,0.08)", delay: 540 },
    { icon: "★", label: "Your Drive",         content: result.motivationLine,  color: PALETTE.horizon, bg: "rgba(184,227,230,0.15)", delay: 660 },
  ];

  const careerColors = [
    { color: PALETTE.tiber,   bg: "rgba(10,57,72,0.05)",    num: "01" },
    { color: PALETTE.horizon, bg: "rgba(87,148,164,0.06)",  num: "02" },
    { color: PALETTE.downy,   bg: "rgba(100,205,209,0.06)", num: "03" },
  ];

  return (
    <div style={{ width: "100%", opacity: heroVis ? 1 : 0, transition: "opacity 0.7s ease" }}>
      {/* ── HERO BANNER with Venn diagram ──────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, ${PALETTE.tiber} 0%, #0d4d62 40%, #145a72 100%)`,
        borderRadius: 24,
        padding: isMobile ? "24px 18px 28px" : "44px 36px 36px",
        textAlign: "center", overflow: "hidden", position: "relative", marginBottom: 18,
        opacity: heroVis ? 1 : 0,
        transform: heroVis ? "scale(1)" : "scale(0.97)",
        transition: "all 0.7s cubic-bezier(.22,.68,0,1.2)",
      }}>
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: `${PALETTE.downy}18`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: `${PALETTE.horizon}15`, pointerEvents: "none" }} />

        {roleMeta.label && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `${PALETTE.downy}22`, backdropFilter: "blur(8px)",
            borderRadius: 50, padding: "5px 14px", marginBottom: 12,
            border: `1px solid ${PALETTE.downy}44`,
            position: "relative", zIndex: 1,
          }}>
            <span style={{ fontSize: 14 }}>{roleMeta.icon}</span>
            <span style={{
              fontSize: 11, color: PALETTE.powderBlue,
              letterSpacing: 2, textTransform: "uppercase", fontWeight: 700,
            }}>
              {roleMeta.label} Path
            </span>
          </div>
        )}

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(184,227,230,0.12)", borderRadius: 50,
          padding: "6px 16px", marginBottom: 18,
          border: "1px solid rgba(184,227,230,0.25)",
          position: "relative", zIndex: 1,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: PALETTE.downy, display: "inline-block" }} />
          <span style={{
            fontSize: 11, color: PALETTE.powderBlue,
            letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700,
          }}>
            {roleLabel.heading}
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: isMobile ? "22px" : "clamp(22px,3.5vw,32px)",
          color: "#fff",
          marginBottom: 8, lineHeight: 1.3,
          textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          position: "relative", zIndex: 1,
          padding: isMobile ? "0 8px" : 0,
        }}>
          {result.ikigaiTitle}
        </h1>
        <p style={{
          fontSize: 13, color: `${PALETTE.powderBlue}99`,
          marginBottom: isMobile ? 22 : 28, position: "relative", zIndex: 1,
        }}>
          {roleLabel.sub}
        </p>

        {/* ── The classic 4-circle Ikigai Venn ────────────── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <IkigaiVenn
            passion={result.passion}
            mission={result.mission}
            vocation={result.vocation}
            profession={result.profession}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* ── 4 ZONE CARDS — your personalized content ──────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        gap: 12, marginBottom: 18,
      }}>
        {zones.map((z, i) => (
          <ZoneCard key={z.label} {...z} delay={200 + i * 80} isMobile={isMobile} />
        ))}
      </div>

      {/* ── Ikigai dimension scores ───────────────────────────── */}
      <div style={{
        background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)",
        borderRadius: 20, padding: "22px 24px", marginBottom: 16,
        boxShadow: "0 4px 24px rgba(10,57,72,0.07)",
        border: "1.5px solid rgba(100,205,209,0.2)",
        opacity: heroVis ? 1 : 0,
        transition: "opacity 0.6s ease 0.4s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 11,
            background: "linear-gradient(135deg, rgba(10,57,72,0.08), rgba(100,205,209,0.12))",
            border: "1.5px solid rgba(100,205,209,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
          }}>◎</div>
          <span style={{
            fontSize: 10, fontWeight: 800, color: PALETTE.horizon,
            textTransform: "uppercase", letterSpacing: 1.8,
          }}>
            Ikigai Alignment Score
          </span>
        </div>
        <DimensionBar label="What You Love"        value={ikigaiDims.love}       max={maxDim} color="#F5C24C" delay={400} />
        <DimensionBar label="What You're Good At"  value={ikigaiDims.goodAt}     max={maxDim} color="#3FAE7E" delay={480} />
        <DimensionBar label="What Pays You"        value={ikigaiDims.paidFor}    max={maxDim} color="#2BAEE0" delay={560} />
        <DimensionBar label="What the World Needs" value={ikigaiDims.worldNeeds} max={maxDim} color="#E74C3C" delay={640} />
      </div>

      {/* ── Personality Profile ─────────────────────────── */}
      {effectiveAnalysis && (
        <div style={{ marginBottom: 16 }}>
          <TraitsDisplay analysis={effectiveAnalysis} delay={200} />
        </div>
      )}

      {/* ── 4 Info Cards ────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 14, marginBottom: 16,
      }}>
        {sections.map((s) => <SectionCard key={s.label} {...s} />)}
      </div>

      {/* ── Career Paths ────────────────────────────────── */}
      <div style={{
        opacity: heroVis ? 1 : 0,
        transform: heroVis ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease 0.7s", marginBottom: 16,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)",
          borderRadius: 22, padding: "22px 24px",
          boxShadow: "0 4px 24px rgba(10,57,72,0.07)",
          border: "1.5px solid rgba(100,205,209,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 11,
              background: "linear-gradient(135deg, rgba(100,205,209,0.12), rgba(87,148,164,0.1))",
              border: "1.5px solid rgba(100,205,209,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>✦</div>
            <span style={{
              fontSize: 10, fontWeight: 800, color: PALETTE.horizon,
              textTransform: "uppercase", letterSpacing: 1.8,
            }}>
              Recommended Career Paths
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(result.careerPaths || []).map((path, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "15px 18px", borderRadius: 14,
                background: careerColors[i]?.bg || "rgba(10,57,72,0.04)",
                border: `1.5px solid ${(careerColors[i]?.color || PALETTE.tiber)}18`,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "default",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(6px)";
                  e.currentTarget.style.boxShadow = `0 4px 18px ${careerColors[i]?.color || PALETTE.tiber}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  fontSize: 11, fontWeight: 800,
                  color: careerColors[i]?.color || PALETTE.tiber,
                  minWidth: 28, letterSpacing: 0.5,
                }}>
                  {careerColors[i]?.num}
                </div>
                <span style={{
                  fontSize: 14, color: PALETTE.tiber, fontWeight: 500, flex: 1,
                }}>
                  {path}
                </span>
                <span style={{
                  color: careerColors[i]?.color || PALETTE.downy,
                  fontSize: 16, opacity: 0.7,
                }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Role completion footer ─────────────────────── */}
      <div style={{
        opacity: heroVis ? 1 : 0, transition: "opacity 0.5s ease 0.9s",
        marginBottom: 16,
      }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(10,57,72,0.04), rgba(100,205,209,0.06))",
          borderRadius: 20, padding: "20px 24px",
          border: "1.5px solid rgba(100,205,209,0.2)",
          display: "flex", alignItems: "center", gap: 16,
          flexWrap: "wrap",
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: "2px solid rgba(100,205,209,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, flexShrink: 0,
          }}>
            {roleMeta.icon || "☯"}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: PALETTE.tiber, marginBottom: 4 }}>
              {roleMeta.label} Journey Complete
            </div>
            <div style={{ fontSize: 13, color: PALETTE.horizon, lineHeight: 1.6 }}>
              Your Ikigai has been shaped by your unique {(roleMeta.label || "").toLowerCase()} values and ambitions.
              Use these insights to guide your next step forward.
            </div>
          </div>
        </div>
      </div>

      {/* ── Restart button ─────────────────────────────── */}
      <div style={{ opacity: heroVis ? 1 : 0, transition: "opacity 0.5s ease 1s" }}>
        <button onClick={restart} style={{
          display: "block", width: "100%", padding: "16px", borderRadius: 50,
          fontSize: 15, fontWeight: 700, cursor: "pointer", border: "none",
          background: `linear-gradient(135deg, ${PALETTE.tiber}, #0d4d62)`,
          color: "#fff", fontFamily: "'Sora', sans-serif",
          transition: "all 0.25s ease", letterSpacing: 0.5,
          boxShadow: "0 4px 20px rgba(10,57,72,0.25)",
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 28px rgba(10,57,72,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(10,57,72,0.25)";
          }}
        >
          Start Over ↺
        </button>
      </div>
    </div>
  );
}