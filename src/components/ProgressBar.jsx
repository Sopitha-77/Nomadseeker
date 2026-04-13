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
    <div style={{ marginBottom: 32 }}>
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: currentDayData.bg,
            border: `2px solid ${currentDayData.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: currentDayData.color,
          }}>
            {currentDayData.icon}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.2 }}>
              Day {currentDayData.day} — {currentDayData.title}
            </div>
            <div style={{ fontSize: 11, color: "#aaa" }}>{currentDayData.subtitle}</div>
          </div>
        </div>
        <div style={{
          fontSize: 13, fontWeight: 700, color: currentDayData.color,
          background: currentDayData.bg,
          padding: "4px 10px", borderRadius: 20,
          border: `1px solid ${currentDayData.accent}`,
        }}>
          {pct}%
        </div>
      </div>

      {/* Track */}
      <div style={{ height: 8, background: "#f0f0f0", borderRadius: 50, overflow: "hidden", marginBottom: 10 }}>
        <div style={{
          height: "100%", borderRadius: 50,
          background: `linear-gradient(90deg, ${currentDayData.color}cc, ${currentDayData.color})`,
          width: `${pct}%`,
          transition: "width 0.7s cubic-bezier(.22,.68,0,1.2)",
          position: "relative",
        }}>
          {pct > 5 && (
            <div style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: 3,
              background: "rgba(255,255,255,0.6)", borderRadius: 2,
            }} />
          )}
        </div>
      </div>

      {/* Day step dots */}
      <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 8 }}>
        {allDays.map((d, i) => {
          const done = i < dayIndex;
          const active = i === dayIndex;
          return (
            <div key={d.day} style={{ display: "flex", alignItems: "center", flex: active ? 2 : 1, gap: 4 }}>
              <div style={{
                height: 4, borderRadius: 50, flex: 1,
                background: done ? d.color : active ? `${d.color}55` : "#ececec",
                transition: "all 0.4s ease",
              }} />
              <div style={{
                width: active ? 8 : 6, height: active ? 8 : 6, borderRadius: "50%",
                background: done ? d.color : active ? d.color : "#ddd",
                flexShrink: 0, transition: "all 0.4s ease",
                boxShadow: active ? `0 0 0 3px ${d.color}33` : "none",
              }} />
            </div>
          );
        })}
      </div>

      {/* Message */}
      <p style={{ fontSize: 12, color: "#b0b0b0", fontStyle: "italic", margin: 0 }}>{message}</p>
    </div>
  );
}