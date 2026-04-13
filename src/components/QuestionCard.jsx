import { useState, useEffect } from "react";
import { useIkigai } from "../context/IkigaiContext";

export default function QuestionCard() {
  const { currentDayData, questionIndex, handleAnswer, answers } = useIkigai();
  const q = currentDayData.questions[questionIndex];
  const existing = answers[q?.id];

  const [text, setText] = useState(existing?.text || "");
  const [selected, setSelected] = useState(existing?.selected || []);
  const [mcq, setMcq] = useState(existing?.mcq || "");
  const [otherVal, setOtherVal] = useState(existing?.other || "");
  const [showOther, setShowOther] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setVisible(false);
    setText(existing?.text || "");
    setSelected(existing?.selected || []);
    setMcq(existing?.mcq || "");
    setOtherVal(existing?.other || "");
    setShowOther(false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id]);

  if (!q) return null;

  const { color, bg, accent, title, questions: dayQs } = currentDayData;
  const isLastQuestion = questionIndex >= dayQs.length - 1;

  const canProceed = () => {
    if (q.type === "writing") return text.trim().length > 2;
    if (q.type === "multi") return selected.length > 0;
    if (q.type === "mcq") return mcq !== "";
    return false;
  };

  const handleSubmit = () => {
    if (!canProceed()) return;
    handleAnswer(q.id, { text, selected, mcq, other: otherVal, questionText: q.question });
  };

  // FIXED toggle: clicking selected item deselects it; no append back to text
  const toggleSuggestion = (s) => {
    if (text === s) {
      setText("");
    } else if (text.endsWith(`, ${s}`)) {
      setText(text.slice(0, -(`, ${s}`).length));
    } else if (text.startsWith(`${s}, `)) {
      setText(text.slice(`${s}, `.length));
    } else if (text.includes(`, ${s},`)) {
      setText(text.replace(`, ${s}`, ""));
    } else {
      setText((prev) => (prev.trim() ? `${prev}, ${s}` : s));
    }
  };

  // FIXED: proper toggle for multi — click again to deselect
  const toggleMulti = (opt) => {
    if (opt === "Other") {
      setShowOther((v) => !v);
      return;
    }
    setSelected((prev) => {
      if (prev.includes(opt)) {
        // deselect
        return prev.filter((x) => x !== opt);
      }
      if (prev.length >= 2) return prev; // max 2
      return [...prev, opt];
    });
  };

  // FIXED: MCQ toggle — click same option again to deselect
  const toggleMcq = (opt) => {
    setMcq((prev) => (prev === opt ? "" : opt));
  };

  const qNum = questionIndex + 1;
  const totalQ = dayQs.length;

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
      transition: "all 0.5s cubic-bezier(.22,.68,0,1.2)",
    }}>
      {/* Question counter strip */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {dayQs.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 50,
            background: i < questionIndex ? color : i === questionIndex ? color : "#ececec",
            opacity: i < questionIndex ? 0.4 : 1,
            transition: "all 0.4s ease",
          }} />
        ))}
      </div>

      <div style={{
        background: "#fff",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 8px 48px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        border: `1px solid ${accent}`,
      }}>
        {/* Coloured top accent bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${color}, ${color}88)` }} />

        <div style={{ padding: "28px 28px 24px" }}>
          {/* Badge row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                background: bg, color, width: 34, height: 34,
                borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 14, fontWeight: 700,
                border: `1.5px solid ${accent}`,
              }}>
                {qNum}
              </div>
              <span style={{ fontSize: 11, color, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5 }}>
                {title}
              </span>
            </div>
            <span style={{ fontSize: 12, color: "#bbb" }}>{qNum} / {totalQ}</span>
          </div>

          {/* Question */}
          <h3 style={{
            fontSize: "clamp(17px, 2.5vw, 21px)",
            fontWeight: 700, color: "#111",
            marginBottom: q.hint ? 10 : 22,
            lineHeight: 1.4,
            fontFamily: "'Playfair Display', serif",
          }}>
            {q.question}
          </h3>

          {q.hint && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 8,
              background: bg, borderRadius: 10, padding: "10px 14px",
              marginBottom: 20, border: `1px solid ${accent}`,
            }}>
              <span style={{ color, fontSize: 14, flexShrink: 0 }}>💡</span>
              <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>{q.hint}</p>
            </div>
          )}

          {/* ── WRITING ── */}
          {q.type === "writing" && (
            <>
              <p style={{ fontSize: 12, color: "#c0c0c0", marginBottom: 12 }}>
                Tap a suggestion or write your own — no right or wrong answers.
              </p>
              {q.suggestions?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {q.suggestions.map((s) => {
                    const active = text.includes(s);
                    return (
                      <span key={s} onClick={() => toggleSuggestion(s)} style={{
                        padding: "7px 14px", borderRadius: 50, fontSize: 13,
                        cursor: "pointer", border: `1.5px solid ${active ? color : "#e8e8e8"}`,
                        color: active ? color : "#777",
                        background: active ? bg : "#fafafa",
                        fontWeight: active ? 500 : 400,
                        transition: "all 0.18s ease",
                        userSelect: "none",
                        transform: active ? "scale(1.04)" : "scale(1)",
                        display: "inline-flex", alignItems: "center", gap: 5,
                      }}>
                        {active && <span style={{ fontSize: 10, lineHeight: 1 }}>✓</span>}
                        {s}
                      </span>
                    );
                  })}
                </div>
              )}
              <textarea
                rows={3}
                placeholder="Type your answer here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                  width: "100%", resize: "none", borderRadius: 14,
                  padding: "14px 16px", fontSize: 15,
                  fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
                  border: `2px solid ${text.trim().length > 2 ? color : "#e8e8e8"}`,
                  outline: "none", transition: "border-color 0.2s",
                  background: "#fafafa", color: "#222",
                }}
                onFocus={(e) => (e.target.style.borderColor = color)}
                onBlur={(e) => (e.target.style.borderColor = text.trim().length > 2 ? color : "#e8e8e8")}
              />
            </>
          )}

          {/* ── MULTI ── */}
          {q.type === "multi" && (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "#c0c0c0", margin: 0 }}>Select up to 2 options</p>
                {selected.length > 0 && (
                  <span style={{
                    fontSize: 11, fontWeight: 600, color,
                    background: bg, padding: "3px 10px", borderRadius: 20,
                    border: `1px solid ${accent}`,
                  }}>
                    {selected.length}/2 selected
                  </span>
                )}
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                gap: 10,
              }}>
                {q.options.map((opt) => {
                  const active = selected.includes(opt);
                  const disabled = !active && selected.length >= 2;
                  return (
                    <div key={opt} onClick={() => !disabled && toggleMulti(opt)} style={{
                      padding: "12px 14px", borderRadius: 14, fontSize: 13,
                      cursor: disabled ? "not-allowed" : "pointer",
                      border: `1.5px solid ${active ? color : disabled ? "#f0f0f0" : "#e8e8e8"}`,
                      background: active ? bg : disabled ? "#fafafa" : "#fafafa",
                      color: active ? color : disabled ? "#ccc" : "#555",
                      fontWeight: active ? 600 : 400,
                      textAlign: "center",
                      transition: "all 0.18s ease",
                      userSelect: "none",
                      transform: active ? "scale(1.03)" : "scale(1)",
                      boxShadow: active ? `0 2px 12px ${color}22` : "none",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    }}>
                      {active && <span style={{ fontSize: 10, flexShrink: 0 }}>✓</span>}
                      {opt === "Other" ? "Other…" : opt}
                    </div>
                  );
                })}
              </div>
              {showOther && (
                <input
                  autoFocus
                  style={{
                    marginTop: 12, width: "100%", padding: "11px 14px",
                    borderRadius: 12, border: `2px solid ${color}`,
                    fontSize: 14, outline: "none",
                    fontFamily: "'DM Sans', sans-serif", background: "#fafafa",
                  }}
                  placeholder="Describe your own answer..."
                  value={otherVal}
                  onChange={(e) => setOtherVal(e.target.value)}
                />
              )}
            </>
          )}

          {/* ── MCQ ── */}
          {q.type === "mcq" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.options.map((opt) => {
                const active = mcq === opt;
                return (
                  <div key={opt} onClick={() => toggleMcq(opt)} style={{
                    padding: "14px 18px", borderRadius: 14, fontSize: 14,
                    cursor: "pointer",
                    border: `1.5px solid ${active ? color : "#ebebeb"}`,
                    background: active ? bg : "#fafafa",
                    color: active ? color : "#444",
                    fontWeight: active ? 600 : 400,
                    transition: "all 0.18s ease",
                    display: "flex", alignItems: "center", gap: 12,
                    boxShadow: active ? `0 4px 16px ${color}1a` : "none",
                    transform: active ? "translateX(4px)" : "translateX(0)",
                  }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#f7f7f7"; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "#fafafa"; }}
                  >
                    {/* Custom radio */}
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      border: `2px solid ${active ? color : "#ccc"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, transition: "border-color 0.18s",
                      background: active ? `${color}11` : "transparent",
                    }}>
                      {active && (
                        <div style={{
                          width: 9, height: 9, borderRadius: "50%", background: color,
                          animation: "mcqPop 0.2s cubic-bezier(.22,.68,0,1.8) forwards",
                        }} />
                      )}
                    </div>
                    {opt}
                  </div>
                );
              })}
            </div>
          )}

          {/* Submit */}
          <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
            {!canProceed() && (
              <span style={{ fontSize: 12, color: "#c0c0c0" }}>
                {q.type === "writing" ? "Write at least a few words" : "Choose an option to continue"}
              </span>
            )}
            <button
              disabled={!canProceed()}
              onClick={handleSubmit}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "13px 32px", borderRadius: 50, fontSize: 15, fontWeight: 600,
                cursor: canProceed() ? "pointer" : "not-allowed",
                border: "none",
                background: canProceed()
                  ? `linear-gradient(135deg, ${color}, ${color}cc)`
                  : "#ececec",
                color: canProceed() ? "#fff" : "#bbb",
                transition: "all 0.25s ease",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: canProceed() ? `0 6px 20px ${color}44` : "none",
                minWidth: 150,
              }}
              onMouseEnter={(e) => { if (canProceed()) e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {isLastQuestion ? "Complete Day ✓" : "Next →"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mcqPop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}