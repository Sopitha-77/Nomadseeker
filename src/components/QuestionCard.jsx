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
  const qNum = questionIndex + 1;

  const canProceed = () => {
    if (q.type === "writing") return text.trim().length > 2;
    if (q.type === "multi") return selected.length > 0;
    if (q.type === "mcq") return mcq !== "";
    return false;
  };

  const handleSubmit = () => {
    if (!canProceed()) return;
    handleAnswer(q.id, {
      text, selected, mcq, other: otherVal, questionText: q.question,
    });
  };

  // ── Toggle helpers (all properly bidirectional) ────────────────────────────
  const toggleSuggestion = (s) => {
    setText((prev) => {
      const parts = prev.split(", ").map((p) => p.trim()).filter(Boolean);
      if (parts.includes(s)) {
        const next = parts.filter((p) => p !== s).join(", ");
        return next;
      }
      return parts.length ? `${parts.join(", ")}, ${s}` : s;
    });
  };

  const toggleMulti = (opt) => {
    if (opt === "Other") {
      setShowOther((v) => !v);
      return;
    }
    setSelected((prev) => {
      if (prev.includes(opt)) return prev.filter((x) => x !== opt);
      if (prev.length >= 2) return prev;
      return [...prev, opt];
    });
  };

  const toggleMcq = (opt) => {
    setMcq((prev) => (prev === opt ? "" : opt));
  };

  // ── Check if a suggestion is active ───────────────────────────────────────
  const isSuggestionActive = (s) => {
    const parts = text.split(", ").map((p) => p.trim());
    return parts.includes(s);
  };

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
      transition: "all 0.5s cubic-bezier(.22,.68,0,1.2)",
    }}>
      {/* Mini progress dots for this day's questions */}
      <div style={{ display: "flex", gap: 5, marginBottom: 18 }}>
        {dayQs.map((_, i) => (
          <div key={i} style={{
            flex: i === questionIndex ? 3 : 1,
            height: 4, borderRadius: 50,
            background: i < questionIndex
              ? color
              : i === questionIndex
                ? `linear-gradient(90deg, ${color}88, ${color})`
                : "rgba(0,0,0,0.07)",
            transition: "all 0.4s cubic-bezier(.22,.68,0,1.2)",
          }} />
        ))}
      </div>

      {/* Card */}
      <div style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 8px 48px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.04)",
        border: `1.5px solid ${accent || color + "33"}`,
      }}>
        {/* Accent top bar */}
        <div style={{
          height: 5,
          background: `linear-gradient(90deg, ${color}, ${color}88, ${color}22)`,
        }} />

        <div style={{ padding: "26px 28px 24px" }}>
          {/* Badge row */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 18,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: bg,
                border: `2px solid ${color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, fontWeight: 800, color,
                boxShadow: `0 2px 10px ${color}33`,
              }}>
                {qNum}
              </div>
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color,
                  textTransform: "uppercase", letterSpacing: 1.5,
                }}>
                  {title}
                </div>
                <div style={{ fontSize: 10, color: "rgba(0,0,0,0.35)" }}>
                  Question {qNum} of {dayQs.length}
                </div>
              </div>
            </div>

            {/* Step pips */}
            <div style={{ display: "flex", gap: 4 }}>
              {dayQs.map((_, i) => (
                <div key={i} style={{
                  width: i === questionIndex ? 20 : 6,
                  height: 6, borderRadius: 50,
                  background: i < questionIndex ? color : i === questionIndex ? color : "rgba(0,0,0,0.1)",
                  opacity: i < questionIndex ? 0.5 : 1,
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>
          </div>

          {/* Question text */}
          <h3 style={{
            fontSize: "clamp(17px, 2.4vw, 21px)",
            fontWeight: 700, color: "#111",
            marginBottom: q.hint ? 12 : 22,
            lineHeight: 1.4,
            fontFamily: "'Playfair Display', serif",
          }}>
            {q.question}
          </h3>

          {/* Hint box */}
          {q.hint && (
            <div style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              background: `linear-gradient(135deg, ${bg}, rgba(255,255,255,0.5))`,
              borderRadius: 12, padding: "10px 14px",
              marginBottom: 20,
              border: `1px solid ${accent || color + "33"}`,
            }}>
              <span style={{ color, fontSize: 14, flexShrink: 0, marginTop: 1 }}>💡</span>
              <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.55 }}>{q.hint}</p>
            </div>
          )}

          {/* ── WRITING ── */}
          {q.type === "writing" && (
            <>
              <p style={{ fontSize: 12, color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>
                Tap a suggestion or write your own — no right or wrong answers.
              </p>
              {q.suggestions?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {q.suggestions.map((s) => {
                    const active = isSuggestionActive(s);
                    return (
                      <span key={s} onClick={() => toggleSuggestion(s)} style={{
                        padding: "7px 15px", borderRadius: 50, fontSize: 13,
                        cursor: "pointer",
                        border: `1.5px solid ${active ? color : "rgba(0,0,0,0.1)"}`,
                        color: active ? color : "#666",
                        background: active ? bg : "rgba(255,255,255,0.7)",
                        fontWeight: active ? 600 : 400,
                        transition: "all 0.18s ease",
                        userSelect: "none",
                        display: "inline-flex", alignItems: "center", gap: 5,
                        boxShadow: active ? `0 2px 10px ${color}22` : "none",
                        transform: active ? "scale(1.04)" : "scale(1)",
                      }}>
                        {active && (
                          <span style={{
                            width: 14, height: 14, borderRadius: "50%",
                            background: color, color: "#fff",
                            display: "inline-flex", alignItems: "center",
                            justifyContent: "center", fontSize: 9, fontWeight: 800,
                            flexShrink: 0,
                          }}>✓</span>
                        )}
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
                  border: `2px solid ${text.trim().length > 2 ? color : "rgba(0,0,0,0.1)"}`,
                  outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
                  background: "rgba(255,255,255,0.8)", color: "#1a1a1a",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = color;
                  e.target.style.boxShadow = `0 0 0 4px ${color}18`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = text.trim().length > 2 ? color : "rgba(0,0,0,0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </>
          )}

          {/* ── MULTI ── */}
          {q.type === "multi" && (
            <>
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 14,
              }}>
                <p style={{ fontSize: 12, color: "rgba(0,0,0,0.35)", margin: 0 }}>
                  Select up to 2 options
                </p>
                {selected.length > 0 && (
                  <span style={{
                    fontSize: 11, fontWeight: 700, color,
                    background: bg, padding: "4px 11px", borderRadius: 20,
                    border: `1.5px solid ${accent || color + "44"}`,
                  }}>
                    {selected.length}/2 selected
                  </span>
                )}
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))",
                gap: 10,
              }}>
                {q.options.map((opt) => {
                  const active = selected.includes(opt);
                  const maxed = !active && selected.length >= 2;
                  return (
                    <div key={opt}
                      onClick={() => !maxed && toggleMulti(opt)}
                      style={{
                        padding: "12px 14px", borderRadius: 14, fontSize: 13,
                        cursor: maxed ? "not-allowed" : "pointer",
                        border: `1.5px solid ${active ? color : maxed ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.1)"}`,
                        background: active ? bg : maxed ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.7)",
                        color: active ? color : maxed ? "rgba(0,0,0,0.25)" : "#555",
                        fontWeight: active ? 700 : 400,
                        textAlign: "center",
                        transition: "all 0.18s ease",
                        userSelect: "none",
                        boxShadow: active ? `0 3px 14px ${color}25` : "none",
                        transform: active ? "scale(1.04)" : "scale(1)",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      }}
                    >
                      {active && (
                        <span style={{
                          width: 14, height: 14, borderRadius: "50%",
                          background: color, color: "#fff",
                          display: "inline-flex", alignItems: "center",
                          justifyContent: "center", fontSize: 9, fontWeight: 800,
                          flexShrink: 0,
                        }}>✓</span>
                      )}
                      {opt === "Other" ? "Other…" : opt}
                    </div>
                  );
                })}
              </div>
              {showOther && (
                <input
                  autoFocus
                  style={{
                    marginTop: 12, width: "100%", padding: "12px 16px",
                    borderRadius: 12, border: `2px solid ${color}`,
                    fontSize: 14, outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(255,255,255,0.8)",
                    boxShadow: `0 0 0 4px ${color}18`,
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
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {q.options.map((opt) => {
                const active = mcq === opt;
                return (
                  <div key={opt} onClick={() => toggleMcq(opt)} style={{
                    padding: "14px 18px", borderRadius: 14, fontSize: 14,
                    cursor: "pointer",
                    border: `1.5px solid ${active ? color : "rgba(0,0,0,0.09)"}`,
                    background: active ? bg : "rgba(255,255,255,0.6)",
                    color: active ? color : "#444",
                    fontWeight: active ? 600 : 400,
                    transition: "all 0.2s ease",
                    display: "flex", alignItems: "center", gap: 12,
                    boxShadow: active ? `0 4px 18px ${color}22` : "none",
                    transform: active ? "translateX(5px)" : "translateX(0)",
                  }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.6)";
                    }}
                  >
                    <div style={{
                      width: 21, height: 21, borderRadius: "50%",
                      border: `2px solid ${active ? color : "rgba(0,0,0,0.2)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, transition: "all 0.2s",
                      background: active ? `${color}11` : "transparent",
                    }}>
                      {active && (
                        <div style={{
                          width: 9, height: 9, borderRadius: "50%",
                          background: color,
                          animation: "mcqPop 0.22s cubic-bezier(.22,.68,0,1.8) forwards",
                        }} />
                      )}
                    </div>
                    {opt}
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer / submit */}
          <div style={{
            marginTop: 26, display: "flex",
            justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 12, color: "rgba(0,0,0,0.3)" }}>
              {!canProceed()
                ? q.type === "writing"
                  ? "Write at least a few words…"
                  : "Choose an option to continue"
                : ""}
            </span>

            <button
              disabled={!canProceed()}
              onClick={handleSubmit}
              style={{
                display: "inline-flex", alignItems: "center",
                justifyContent: "center", gap: 8,
                padding: "13px 34px", borderRadius: 50,
                fontSize: 15, fontWeight: 700,
                cursor: canProceed() ? "pointer" : "not-allowed",
                border: "none",
                background: canProceed()
                  ? `linear-gradient(135deg, ${color}, ${color}cc)`
                  : "rgba(0,0,0,0.08)",
                color: canProceed() ? "#fff" : "rgba(0,0,0,0.25)",
                transition: "all 0.25s ease",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: canProceed() ? `0 6px 22px ${color}44` : "none",
                minWidth: 150,
                letterSpacing: 0.3,
              }}
              onMouseEnter={(e) => {
                if (canProceed()) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 10px 28px ${color}55`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = canProceed() ? `0 6px 22px ${color}44` : "none";
              }}
            >
              {isLastQuestion ? "Complete Day ✓" : "Next →"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mcqPop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}