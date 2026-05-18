import React, { useState, useEffect } from "react";
import { useIkigai } from "../context/IkigaiContext";

const ACCENT = "#61CECF"; // active Next-button colour

export default function QuestionCard() {
  const {
    currentDayData,
    questionIndex,
    handleAnswer,
    handleBack,
    getSavedAnswer,
    isMobile,
  } = useIkigai();

  const q = currentDayData?.questions?.[questionIndex];
  const saved = q ? getSavedAnswer(q.id) : undefined;

  const initText = () =>
    typeof saved === "string"
      ? saved
      : saved && typeof saved === "object"
      ? saved.text || ""
      : "";
  const initMulti = () =>
    Array.isArray(saved)
      ? saved.filter((s) => q?.options?.includes(s))
      : saved?.selected || [];
  const initMcq = () =>
    typeof saved === "string" && q?.type === "mcq" ? saved : saved?.mcq || "";
  const initOther = () => {
    if (Array.isArray(saved)) {
      const o = saved.find((s) => !q?.options?.includes(s) && s !== "Other");
      return o || "";
    }
    return saved?.other || "";
  };

  const [text, setText] = useState(initText);
  const [selected, setSelected] = useState(initMulti);
  const [mcq, setMcq] = useState(initMcq);
  const [otherVal, setOtherVal] = useState(initOther);
  const [showOther, setShowOther] = useState(
    Array.isArray(saved) ? saved.includes("Other") : false
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    setText(initText());
    setSelected(initMulti());
    setMcq(initMcq());
    setOtherVal(initOther());
    setShowOther(Array.isArray(saved) ? saved.includes("Other") : false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id]);

  if (!q || !currentDayData) return null;

  const { color, bg, accent, headline, title, questions: dayQs } =
    currentDayData;
  const isLast = questionIndex >= dayQs.length - 1;
  const qNum = questionIndex + 1;
  const isFirstEver = questionIndex === 0 && currentDayData.day === 1;

  const canProceed = () => {
    if (q.type === "writing" || q.type === "text")
      return text.trim().length > 1;
    if (q.type === "multi")
      return selected.length > 0 || (showOther && otherVal.trim().length > 0);
    if (q.type === "mcq") return mcq !== "";
    return false;
  };

  const submit = () => {
    if (!canProceed()) return;
    if (q.type === "mcq") handleAnswer(q.id, mcq);
    else if (q.type === "multi") {
      const final =
        showOther && otherVal.trim()
          ? [...selected, otherVal.trim()]
          : [...selected];
      handleAnswer(q.id, final);
    } else handleAnswer(q.id, text.trim());
  };

  const toggleSuggestion = (s) => {
    setText((prev) => {
      const parts = prev.split(",").map((p) => p.trim()).filter(Boolean);
      if (parts.includes(s)) return parts.filter((p) => p !== s).join(", ");
      return parts.length ? `${parts.join(", ")}, ${s}` : s;
    });
  };
  const isSuggestionActive = (s) =>
    text.split(",").map((p) => p.trim()).includes(s);

  const toggleMulti = (opt) => {
    if (opt === "Other") {
      setShowOther((v) => !v);
      return;
    }
    setSelected((prev) =>
      prev.includes(opt)
        ? prev.filter((x) => x !== opt)
        : prev.length >= 2
        ? prev
        : [...prev, opt]
    );
  };

  const toggleMcq = (opt) => setMcq((p) => (p === opt ? "" : opt));

  const ready = canProceed();

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(22px) scale(0.98)",
        transition: "all .5s cubic-bezier(.22,.68,0,1.2)",
      }}
    >
      <div
        style={{
          background: `linear-gradient(155deg, rgba(255,255,255,0.92) 0%, ${bg} 60%, rgba(255,255,255,0.86) 100%)`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: `0 22px 64px rgba(20,68,71,0.13), 0 2px 10px ${color}1a`,
          border: `1px solid rgba(255,255,255,0.7)`,
        }}
      >
        <div
          style={{
            height: 6,
            background: `linear-gradient(90deg, ${color}, ${color}99, ${ACCENT}66)`,
          }}
        />

        <div style={{ padding: isMobile ? "24px 20px 22px" : "32px 36px 28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 22,
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#fff",
                  boxShadow: `0 6px 18px ${color}55`,
                  flexShrink: 0,
                }}
              >
                {qNum}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color,
                    textTransform: "uppercase",
                    letterSpacing: 1.6,
                  }}
                >
                  {headline} · {title}
                </div>
                <div style={{ fontSize: 11, color: "rgba(20,68,71,0.42)" }}>
                  Question {qNum} of {dayQs.length}
                </div>
              </div>
            </div>

            {q.instruction && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color,
                  background: "rgba(255,255,255,0.7)",
                  padding: "5px 13px",
                  borderRadius: 999,
                  border: `1px solid ${accent}`,
                  whiteSpace: "nowrap",
                }}
              >
                {q.instruction}
              </span>
            )}
          </div>

          <h3
            style={{
              fontSize: isMobile ? 19 : "clamp(20px,2.4vw,24px)",
              fontWeight: 800,
              color: "#0e2f31",
              marginBottom: 24,
              lineHeight: 1.4,
              fontFamily: "'Fraunces','Playfair Display',serif",
            }}
          >
            {q.question}
          </h3>

          {/* MCQ */}
          {q.type === "mcq" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {q.options.map((opt, i) => {
                const active = mcq === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => toggleMcq(opt)}
                    className="opt-btn"
                    style={{
                      padding: "15px 20px",
                      borderRadius: 16,
                      textAlign: "left",
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      background: active
                        ? `linear-gradient(135deg, ${color}26, rgba(255,255,255,0.96))`
                        : "rgba(255,255,255,0.55)",
                      outline: active
                        ? `2px solid ${color}`
                        : `1.5px solid rgba(20,68,71,0.10)`,
                      fontSize: 14.5,
                      color: "#0e2f31",
                      fontFamily: "'Manrope',sans-serif",
                      fontWeight: active ? 700 : 500,
                      boxShadow: active ? `0 8px 24px ${color}2e` : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 13,
                      transition: "all .22s cubic-bezier(.22,.68,0,1.2)",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        background: active ? color : "rgba(20,68,71,0.07)",
                        color: active ? "#fff" : "rgba(20,68,71,0.4)",
                        fontSize: 11,
                        fontWeight: 800,
                        flexShrink: 0,
                        transition: "all .2s ease",
                      }}
                    >
                      {active ? "✓" : String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* MULTI */}
          {q.type === "multi" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <p style={{ fontSize: 12, color: "rgba(20,68,71,0.45)", margin: 0 }}>
                  Select up to 2 options
                </p>
                {selected.length > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color,
                      background: "rgba(255,255,255,0.7)",
                      padding: "4px 12px",
                      borderRadius: 20,
                      border: `1.5px solid ${accent}`,
                    }}
                  >
                    {selected.length}/2 selected
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr 1fr"
                    : "repeat(auto-fill,minmax(150px,1fr))",
                  gap: 11,
                }}
              >
                {q.options.map((opt) => {
                  if (opt === "Other") {
                    return (
                      <button
                        key="Other"
                        onClick={() => toggleMulti("Other")}
                        className="opt-btn"
                        style={{
                          padding: "14px 16px",
                          borderRadius: 15,
                          fontSize: 13.5,
                          cursor: "pointer",
                          border: "none",
                          outline: showOther
                            ? `2px solid ${color}`
                            : "1.5px solid rgba(20,68,71,0.10)",
                          background: showOther
                            ? `linear-gradient(135deg,${color}22,rgba(255,255,255,0.92))`
                            : "rgba(255,255,255,0.55)",
                          color: showOther ? color : "rgba(20,68,71,0.6)",
                          fontWeight: showOther ? 700 : 500,
                          fontFamily: "'Manrope',sans-serif",
                          textAlign: "center",
                          transition: "all .2s cubic-bezier(.22,.68,0,1.2)",
                        }}
                      >
                        {showOther ? "✓ Other" : "+ Other"}
                      </button>
                    );
                  }
                  const active = selected.includes(opt);
                  const maxed = !active && selected.length >= 2;
                  return (
                    <button
                      key={opt}
                      onClick={() => !maxed && toggleMulti(opt)}
                      className="opt-btn"
                      style={{
                        padding: "14px 16px",
                        borderRadius: 15,
                        fontSize: 13.5,
                        cursor: maxed ? "not-allowed" : "pointer",
                        border: "none",
                        outline: active
                          ? `2px solid ${color}`
                          : maxed
                          ? "1.5px solid rgba(20,68,71,0.04)"
                          : "1.5px solid rgba(20,68,71,0.10)",
                        background: active
                          ? `linear-gradient(135deg,${color}26,rgba(255,255,255,0.94))`
                          : maxed
                          ? "rgba(255,255,255,0.30)"
                          : "rgba(255,255,255,0.55)",
                        color: active
                          ? color
                          : maxed
                          ? "rgba(20,68,71,0.25)"
                          : "#36605f",
                        fontWeight: active ? 700 : 500,
                        fontFamily: "'Manrope',sans-serif",
                        textAlign: "center",
                        transition: "all .2s cubic-bezier(.22,.68,0,1.2)",
                        boxShadow: active ? `0 6px 18px ${color}2e` : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 7,
                      }}
                    >
                      {active && (
                        <span
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: color,
                            color: "#fff",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 9,
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                      )}
                      {opt}
                    </button>
                  );
                })}
              </div>
              {showOther && (
                <input
                  autoFocus
                  value={otherVal}
                  onChange={(e) => setOtherVal(e.target.value)}
                  placeholder="Describe your own answer…"
                  style={{
                    marginTop: 13,
                    width: "100%",
                    padding: "14px 18px",
                    borderRadius: 14,
                    border: `1.5px solid ${color}`,
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "'Manrope',sans-serif",
                    background: "rgba(255,255,255,0.85)",
                    color: "#0e2f31",
                    boxShadow: `0 0 0 4px ${color}1a`,
                  }}
                />
              )}
            </>
          )}

          {/* WRITING */}
          {(q.type === "writing" || q.type === "text") && (
            <>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(20,68,71,0.45)",
                  marginBottom: 13,
                }}
              >
                Tap a suggestion to add it, or write freely — there are no
                wrong answers.
              </p>
              {q.suggestions?.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 9,
                    marginBottom: 18,
                  }}
                >
                  {q.suggestions.map((s) => {
                    const active = isSuggestionActive(s);
                    return (
                      <span
                        key={s}
                        onClick={() => toggleSuggestion(s)}
                        className="chip"
                        style={{
                          padding: "9px 18px",
                          borderRadius: 999,
                          fontSize: 13.5,
                          cursor: "pointer",
                          userSelect: "none",
                          border: `1.5px solid ${
                            active ? color : "rgba(20,68,71,0.14)"
                          }`,
                          color: active ? color : "#4a6e6d",
                          background: active
                            ? `linear-gradient(135deg,${color}22,rgba(255,255,255,0.9))`
                            : "rgba(255,255,255,0.62)",
                          fontWeight: active ? 700 : 500,
                          fontFamily: "'Manrope',sans-serif",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 7,
                          boxShadow: active
                            ? `0 5px 18px ${color}33`
                            : "0 1px 3px rgba(20,68,71,0.05)",
                          transform: active ? "scale(1.05)" : "scale(1)",
                          transition: "all .2s cubic-bezier(.22,.68,0,1.2)",
                        }}
                      >
                        {active && (
                          <span
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              background: color,
                              color: "#fff",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 9,
                              fontWeight: 800,
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </span>
                        )}
                        {s}
                      </span>
                    );
                  })}
                </div>
              )}
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts here…"
                style={{
                  width: "100%",
                  resize: "vertical",
                  borderRadius: 16,
                  padding: "16px 18px",
                  fontSize: 15,
                  fontFamily: "'Manrope',sans-serif",
                  lineHeight: 1.65,
                  border: `1.5px solid ${
                    text.trim().length > 1 ? color : "rgba(20,68,71,0.14)"
                  }`,
                  outline: "none",
                  background: "rgba(255,255,255,0.82)",
                  color: "#0e2f31",
                  boxShadow:
                    text.trim().length > 1 ? `0 4px 18px ${color}22` : "none",
                  transition: "border-color .2s, box-shadow .2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = color;
                  e.target.style.boxShadow = `0 0 0 4px ${color}1f`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor =
                    text.trim().length > 1 ? color : "rgba(20,68,71,0.14)";
                  e.target.style.boxShadow =
                    text.trim().length > 1 ? `0 4px 18px ${color}22` : "none";
                }}
              />
            </>
          )}

          {/* FOOTER */}
          <div
            style={{
              marginTop: 28,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            {!isFirstEver ? (
              <button
                onClick={handleBack}
                className="ghost-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 24px",
                  borderRadius: 999,
                  border: "1.5px solid rgba(20,68,71,0.12)",
                  background: "rgba(255,255,255,0.62)",
                  color: "#36605f",
                  cursor: "pointer",
                  fontFamily: "'Sora',sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  transition: "all .2s ease",
                }}
              >
                ← Back
              </button>
            ) : (
              <span style={{ fontSize: 12, color: "rgba(20,68,71,0.3)" }}>
                {!ready
                  ? q.type === "writing"
                    ? "Write at least a few words…"
                    : "Choose an option to continue"
                  : ""}
              </span>
            )}

            <button
              disabled={!ready}
              onClick={submit}
              className={ready ? "next-btn next-ready" : "next-btn"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                padding: "14px 36px",
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 800,
                cursor: ready ? "pointer" : "not-allowed",
                border: "none",
                background: ready
                  ? `linear-gradient(135deg, ${ACCENT}, #4bb8b9)`
                  : "rgba(20,68,71,0.08)",
                color: ready ? "#06302f" : "rgba(20,68,71,0.28)",
                fontFamily: "'Sora',sans-serif",
                letterSpacing: 0.3,
                minWidth: 150,
                boxShadow: ready
                  ? `0 8px 28px rgba(97,206,207,0.55)`
                  : "none",
                transition: "all .3s cubic-bezier(.22,.68,0,1.2)",
              }}
            >
              {isLast ? "Complete Day ✓" : "Next →"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .opt-btn:hover { transform: translateX(3px); }
        .chip:hover { transform: scale(1.06) !important; box-shadow: 0 6px 20px rgba(20,68,71,0.12) !important; }
        .ghost-btn:hover { background: rgba(255,255,255,0.95) !important; transform: translateY(-1px); }
        .next-btn:active:not(:disabled) { transform: scale(0.97); }
        .next-ready:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(97,206,207,0.66) !important;
          filter: brightness(1.04);
        }
        .next-ready { animation: nextPop .42s cubic-bezier(.22,.68,0,1.4); }
        @keyframes nextPop {
          0% { transform: scale(0.92); }
          60% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}