import React from "react";
import { useIkigai, PALETTE, DAYS_META, RESULT_STEP } from "../context/IkigaiContext";

/* ─── COLORFUL LIGHT COLOR PALETTE FOR EACH STEP ────────────────────────── */
const STEP_COLORS = [
  { 
    day: 1,
    name: "Passion",
    light: "#FFB3BA",      // Soft Pink
    medium: "#FF8A9F",     // Medium Pink
    dark: "#E56A7F",       // Dark Pink
    bg: "rgba(255, 179, 186, 0.15)",
    glow: "rgba(255, 138, 159, 0.3)"
  },
  { 
    day: 2,
    name: "Lifestyle",
    light: "#FFE5B4",      // Peach
    medium: "#FFD966",     // Warm Gold
    dark: "#E5B84D",       // Dark Gold
    bg: "rgba(255, 229, 180, 0.15)",
    glow: "rgba(255, 217, 102, 0.3)"
  },
  { 
    day: 3,
    name: "Skills",
    light: "#B8F2E2",      // Mint
    medium: "#7FDEA0",     // Soft Green
    dark: "#5BBF85",       // Dark Green
    bg: "rgba(184, 242, 226, 0.15)",
    glow: "rgba(127, 222, 160, 0.3)"
  },
  { 
    day: 4,
    name: "Career",
    light: "#B5EAD7",      // Seafoam
    medium: "#8EE4DA",     // Turquoise
    dark: "#6BC4BA",       // Dark Turquoise
    bg: "rgba(181, 234, 215, 0.15)",
    glow: "rgba(142, 228, 218, 0.3)"
  },
  { 
    day: 5,
    name: "Purpose",
    light: "#C7B9FF",      // Lavender
    medium: "#A88BFF",     // Purple
    dark: "#8770CC",       // Dark Purple
    bg: "rgba(199, 185, 255, 0.15)",
    glow: "rgba(168, 139, 255, 0.3)"
  },
  { 
    day: 6,
    name: "Vision",
    light: "#B8D4FF",      // Sky Blue
    medium: "#7FBCF0",     // Soft Blue
    dark: "#5D9FD4",       // Dark Blue
    bg: "rgba(184, 212, 255, 0.15)",
    glow: "rgba(127, 188, 240, 0.3)"
  },
  { 
    day: 7,
    name: "Ikigai",
    light: "#FBC8E8",      // Light Pink
    medium: "#F9A8D4",     // Soft Pink
    dark: "#E87DB8",       // Dark Pink
    bg: "rgba(251, 200, 232, 0.15)",
    glow: "rgba(249, 168, 212, 0.3)"
  }
];

const MESSAGES = [
  "🌟 You're making real progress — your clarity is forming.",
  "✨ Your Ikigai is taking shape with every honest answer.",
  "💫 Every reflection moves you one step closer to your purpose.",
  "⭐ Keep going — the most powerful insights are still ahead.",
  "🌸 The honesty in your answers will shape the outcome beautifully.",
  "🌈 Almost there — your purpose is becoming unmistakably yours.",
  "🎉 Congratulations! Your Ikigai journey is complete!",
];

/* The full 7-step flow shown in the rail */
const STEPS = [...DAYS_META, RESULT_STEP];

export default function ProgressBar() {
  const { currentDayData, dayIndex, overallPct, isMobile } = useIkigai();
  if (!currentDayData) return null;

  const color = currentDayData.color || PALETTE.mediumTeal;
  const currentStepColor = STEP_COLORS[dayIndex % STEP_COLORS.length];
  const message = MESSAGES[dayIndex % MESSAGES.length];
  const pct = Math.max(Math.min(overallPct, 100), 2);

  // Get color for a specific step
  const getStepColor = (stepIndex, isDone, isActive) => {
    const colors = STEP_COLORS[stepIndex % STEP_COLORS.length];
    if (isActive) return colors.medium;
    if (isDone) return colors.dark;
    return "rgba(20, 68, 71, 0.14)";
  };

  // Get background for step circle
  const getStepBackground = (stepIndex, isDone, isActive) => {
    const colors = STEP_COLORS[stepIndex % STEP_COLORS.length];
    if (isActive) return `linear-gradient(135deg, ${colors.light}, ${colors.medium})`;
    if (isDone) return `linear-gradient(135deg, ${colors.medium}, ${colors.dark})`;
    return "rgba(255, 255, 255, 0.7)";
  };

  // Get border color for step circle
  const getStepBorder = (stepIndex, isDone, isActive) => {
    const colors = STEP_COLORS[stepIndex % STEP_COLORS.length];
    if (isActive) return colors.medium;
    if (isDone) return colors.dark;
    return "rgba(20, 68, 71, 0.14)";
  };

  // Get text color for step circle
  const getStepTextColor = (stepIndex, isDone, isActive) => {
    if (isActive) return "#fff";
    if (isDone) return "#fff";
    return "rgba(20, 68, 71, 0.4)";
  };

  // Get glow shadow
  const getStepGlow = (stepIndex, isActive, isDone) => {
    const colors = STEP_COLORS[stepIndex % STEP_COLORS.length];
    if (isActive) return `0 0 0 5px ${colors.bg}, 0 8px 20px ${colors.medium}66`;
    if (isDone) return `0 3px 12px ${colors.medium}44`;
    return "none";
  };

  // Get connector color
  const getConnectorColor = (stepIndex, isCompleted) => {
    const colors = STEP_COLORS[stepIndex % STEP_COLORS.length];
    if (isCompleted) return `linear-gradient(90deg, ${colors.medium}, ${colors.light})`;
    return "rgba(20, 68, 71, 0.08)";
  };

  return (
    <div
      style={{
        marginBottom: 24,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 28,
        padding: isMobile ? "20px 16px" : "24px 28px",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 12px 40px rgba(20,68,71,0.08)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${currentStepColor.bg}, rgba(255,255,255,0.95))`,
              border: `2.5px solid ${color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              boxShadow: `0 0 20px ${color}55`,
              flexShrink: 0,
              transition: "all 0.3s ease",
            }}
          >
            {currentDayData.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: isMobile ? 14 : 16,
                fontWeight: 800,
                color: PALETTE.tiber,
                lineHeight: 1.25,
                fontFamily: "'Sora', sans-serif",
                letterSpacing: "-0.3px",
              }}
            >
              Day {currentDayData.day} — {currentDayData.headline}
            </div>
            <div style={{ fontSize: 12, color: "rgba(20,68,71,0.5)", marginTop: 2 }}>
              {currentDayData.title}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 16,
            fontWeight: 900,
            color: color,
            background: `linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))`,
            padding: "7px 20px",
            borderRadius: 30,
            border: `2px solid ${color}66`,
            boxShadow: `0 2px 16px ${color}33`,
            flexShrink: 0,
            fontFamily: "'Sora', sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          {overallPct}%
        </div>
      </div>

      {/* Main Progress Bar */}
      <div
        style={{
          height: 10,
          borderRadius: 999,
          overflow: "hidden",
          background: "rgba(20,68,71,0.06)",
          marginBottom: 22,
          boxShadow: "inset 0 1px 3px rgba(20,68,71,0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 999,
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: `0 0 12px ${color}88`,
            transition: "width 0.9s cubic-bezier(0.22, 0.68, 0, 1.2)",
            position: "relative",
          }}
        >
          {pct > 8 && (
            <div
              style={{
                position: "absolute",
                right: 6,
                top: "50%",
                transform: "translateY(-50%)",
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
              }}
            />
          )}
        </div>
      </div>

      {/* 7-Step Colorful Rail */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: isMobile ? 2 : 8,
          marginBottom: 16,
          flexWrap: "nowrap",
          overflowX: "auto",
          padding: "4px 0 8px 0",
        }}
      >
        {STEPS.map((s, i) => {
          const isResult = s.day === 7;
          const done = i < dayIndex;
          const active = i === dayIndex;
          const stepColors = STEP_COLORS[i % STEP_COLORS.length];
          
          return (
            <React.Fragment key={s.day}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  flex: "0 0 auto",
                  minWidth: isMobile ? 44 : 62,
                  transition: "all 0.3s ease",
                }}
              >
                {/* Step Circle */}
                <div
                  style={{
                    width: active ? 36 : 30,
                    height: active ? 36 : 30,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: active ? 14 : 12,
                    fontWeight: done || active ? 700 : 500,
                    background: getStepBackground(i, done, active),
                    border: `2.5px solid ${getStepBorder(i, done, active)}`,
                    color: getStepTextColor(i, done, active),
                    boxShadow: getStepGlow(i, active, done),
                    transition: "all 0.4s cubic-bezier(0.22, 0.68, 0, 1.2)",
                    flexShrink: 0,
                    cursor: "default",
                  }}
                >
                  {done ? "✓" : isResult ? "🎯" : s.day}
                </div>
                
                {/* Step Label */}
                <div
                  style={{
                    fontSize: isMobile ? 8.5 : 10.5,
                    fontWeight: active ? 800 : 600,
                    color: active
                      ? stepColors.medium
                      : done
                      ? stepColors.dark
                      : "rgba(20,68,71,0.4)",
                    textAlign: "center",
                    lineHeight: 1.2,
                    letterSpacing: 0.2,
                    maxWidth: isMobile ? 46 : 66,
                    transition: "color 0.3s ease",
                  }}
                >
                  {isResult ? "Ikigai" : s.headline}
                </div>
              </div>

              {/* Connector Line */}
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 4,
                    minWidth: isMobile ? 4 : 12,
                    marginTop: active ? 17 : 14,
                    borderRadius: 999,
                    background: getConnectorColor(i, i < dayIndex),
                    transition: "all 0.5s ease",
                    boxShadow: i < dayIndex ? `0 0 6px ${STEP_COLORS[i % STEP_COLORS.length].medium}66` : "none",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Motivational Message Section */}
      <div
        style={{
          marginTop: 8,
          paddingTop: 14,
          borderTop: "1px solid rgba(97,206,207,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Animated dots */}
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${color}, ${currentStepColor.light})`,
            animation: "pulseDot 1.5s ease-in-out infinite",
          }}
        />
        
        <p
          style={{
            fontSize: 12.5,
            color: "rgba(20,68,71,0.55)",
            fontStyle: "italic",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.5,
            letterSpacing: "0.2px",
            maxWidth: "80%",
          }}
        >
          {message}
        </p>
        
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${currentStepColor.light}, ${color})`,
            animation: "pulseDot 1.5s ease-in-out infinite 0.5s",
          }}
        />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulseDot {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        /* Custom scrollbar for horizontal scroll */
        .progress-rail::-webkit-scrollbar {
          height: 3px;
        }
        
        .progress-rail::-webkit-scrollbar-track {
          background: rgba(20,68,71,0.05);
          border-radius: 10px;
        }
        
        .progress-rail::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #61CECF, #2B878D);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}