import { useIkigai, PALETTE } from "../context/IkigaiContext";

const MESSAGES = [
  "You're making real progress. Stay with it — your clarity is forming.",
  "Your Ikigai is taking shape with every honest answer.",
  "Every reflection moves you one step closer to your purpose.",
  "Keep going — the most powerful insights are still ahead.",
  "You're doing great. The honesty in your answers will shape the outcome.",
  "Almost there. Your purpose is becoming unmistakably yours.",
];

export default function ProgressBar() {
  const { currentDayData, dayIndex, questionIndex, allDays } = useIkigai();

  const totalQuestions = allDays.reduce((s, d) => s + (d.questions?.length || 0), 0) || 1;
  const answeredSoFar =
    allDays.slice(0, dayIndex).reduce((s, d) => s + (d.questions?.length || 0), 0) +
    Math.max(0, questionIndex);
  const pct = Math.round((answeredSoFar / totalQuestions) * 100);
  const message = MESSAGES[dayIndex % MESSAGES.length];
  const color = currentDayData.color || PALETTE.tiber;

  return (
    <div style={{
      marginBottom: 24,
      background: "rgba(255,255,255,0.65)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderRadius: 20,
      padding: "clamp(14px,3vw,18px) clamp(16px,3vw,22px)",
      border: `1px solid rgba(255,255,255,0.6)`,
      boxShadow: "0 4px 24px rgba(26,54,93,0.06)",
    }}>
      {/* Header row */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 14,
        flexWrap: "wrap", gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: `2.5px solid ${color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color,
            boxShadow: `0 0 12px ${color}33`,
            flexShrink: 0,
          }}>
            {currentDayData.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: 14, fontWeight: 700, color: PALETTE.tiber,
              lineHeight: 1.2, whiteSpace: "nowrap",
              overflow: "hidden", textOverflow: "ellipsis",
            }}>
              Day {currentDayData.day} — {currentDayData.title}
            </div>
            <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)" }}>
              {currentDayData.subtitle}
            </div>
          </div>
        </div>

        <div style={{
          fontSize: 14, fontWeight: 800, color,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          padding: "5px 14px", borderRadius: 24,
          border: `1.5px solid ${currentDayData.accent || color + "44"}`,
          boxShadow: `0 2px 12px ${color}22`,
          flexShrink: 0,
        }}>
          {pct}%
        </div>
      </div>

      {/* Main progress track */}
      <div style={{
        height: 10, borderRadius: 50, overflow: "hidden",
        background: "rgba(0,0,0,0.06)", marginBottom: 12,
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
      }}>
        <div style={{
          height: "100%", borderRadius: 50,
          background: `linear-gradient(90deg, ${color}bb, ${color})`,
          width: `${Math.max(pct, 2)}%`,
          transition: "width 0.8s cubic-bezier(.22,.68,0,1.2)",
          position: "relative",
          boxShadow: `0 0 10px ${color}66`,
        }}>
          {pct > 8 && (
            <div style={{
              position: "absolute", right: 4, top: "50%",
              transform: "translateY(-50%)",
              width: 4, height: 4, borderRadius: "50%",
              background: "rgba(255,255,255,0.85)",
            }} />
          )}
        </div>
      </div>

      {/* Day step indicators */}
      <div style={{
        display: "flex", gap: 3, alignItems: "center", marginBottom: 10,
      }}>
        {allDays.map((d, i) => {
          const done = i < dayIndex;
          const active = i === dayIndex;
          return (
            <div key={d.day} style={{
              display: "flex", alignItems: "center",
              flex: active ? 2 : 1, gap: 3,
            }}>
              <div style={{
                height: active ? 5 : 4, borderRadius: 50, flex: 1,
                background: done ? d.color
                  : active ? `linear-gradient(90deg, ${d.color}66, ${d.color})`
                  : "rgba(0,0,0,0.08)",
                transition: "all 0.4s ease",
              }} />
              <div style={{
                width: active ? 10 : 7,
                height: active ? 10 : 7,
                borderRadius: "50%",
                background: done ? d.color : active ? d.color : "rgba(0,0,0,0.12)",
                flexShrink: 0,
                transition: "all 0.4s ease",
                boxShadow: active ? `0 0 0 4px ${d.color}33` : "none",
              }} />
            </div>
          );
        })}
      </div>

      {/* Motivational message */}
      <p style={{
        fontSize: 12, color: "rgba(0,0,0,0.5)",
        fontStyle: "italic", margin: 0, lineHeight: 1.5,
      }}>
        {message}
      </p>
    </div>
  );
}