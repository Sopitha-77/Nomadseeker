import { useIkigai } from "../context/IkigaiContext";

const MESSAGES = [
  "You're making progress. Stay consistent and finish strong.",
  "Your Ikigai is getting clearer with each step.",
  "Every answer brings you closer to clarity.",
  "Keep going — the best insights are ahead.",
  "You're doing great. Honest answers matter most.",
  "Almost there. Your purpose is taking shape.",
];

export default function ProgressBar() {
  const { currentDayData, dayIndex, questionIndex, allDays } = useIkigai();

  const totalQuestions = allDays.reduce((s, d) => s + d.questions.length, 0);
  const answeredSoFar =
    allDays.slice(0, dayIndex).reduce((s, d) => s + d.questions.length, 0) +
    Math.max(0, questionIndex);
  const pct = Math.round((answeredSoFar / totalQuestions) * 100);
  const message = MESSAGES[dayIndex % MESSAGES.length];

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Header row */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 14,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: `2.5px solid ${currentDayData.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: currentDayData.color,
            boxShadow: `0 0 12px ${currentDayData.color}33`,
          }}>
            {currentDayData.icon}
          </div>
          <div>
            <div style={{
              fontSize: 14, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2,
            }}>
              Day {currentDayData.day} — {currentDayData.title}
            </div>
            <div style={{ fontSize: 11, color: "#999" }}>
              {currentDayData.subtitle}
            </div>
          </div>
        </div>

        <div style={{
          fontSize: 14, fontWeight: 800, color: currentDayData.color,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          padding: "5px 12px", borderRadius: 24,
          border: `1.5px solid ${currentDayData.accent || currentDayData.color + "44"}`,
          boxShadow: `0 2px 12px ${currentDayData.color}22`,
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
          background: `linear-gradient(90deg, ${currentDayData.color}bb, ${currentDayData.color})`,
          width: `${Math.max(pct, 2)}%`,
          transition: "width 0.8s cubic-bezier(.22,.68,0,1.2)",
          position: "relative",
        }}>
          {pct > 8 && (
            <div style={{
              position: "absolute", right: 4, top: "50%",
              transform: "translateY(-50%)",
              width: 4, height: 4, borderRadius: "50%",
              background: "rgba(255,255,255,0.8)",
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
                background: done
                  ? d.color
                  : active
                    ? `linear-gradient(90deg, ${d.color}66, ${d.color})`
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
        fontSize: 12, color: "rgba(0,0,0,0.4)",
        fontStyle: "italic", margin: 0, lineHeight: 1.5,
      }}>
        {message}
      </p>
    </div>
  );
}