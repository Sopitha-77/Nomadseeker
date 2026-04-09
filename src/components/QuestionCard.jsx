
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Sparkles, Lightbulb, Zap } from 'lucide-react';

/**
 * QuestionCard — supports multi-select (2–3 options per question).
 *
 * Props:
 *   question       — { text | question, description, options: [{ value, text }] }
 *   index          — 0-based question index
 *   total          — total questions this day
 *   selectedValue  — string | string[] — previously saved selection(s)
 *   onSelect       — called with string[] of selected option texts
 *   onNext         — advance to next question / complete day
 *   onPrev         — go back one question
 *   isLast         — true when this is the final question of the day
 *   minSelect      — minimum options required before Next is enabled (default 2)
 *   maxSelect      — maximum options user can pick (default 3)
 */
const QuestionCard = ({
  question,
  index,
  total,
  selectedValue,
  onSelect,
  onNext,
  onPrev,
  isLast,
  minSelect = 2,
  maxSelect = 3,
}) => {
  const [selected, setSelected]       = useState([]);
  const [direction, setDirection]     = useState('right');
  const [justSelected, setJustSelected] = useState(null);

  /* sync from parent whenever question or saved value changes */
  useEffect(() => {
    if (Array.isArray(selectedValue)) {
      setSelected(selectedValue);
    } else if (typeof selectedValue === 'string' && selectedValue) {
      setSelected([selectedValue]);
    } else {
      setSelected([]);
    }
  }, [question?.id, JSON.stringify(selectedValue)]);

  const toggle = (optionText) => {
    setJustSelected(optionText);
    setTimeout(() => setJustSelected(null), 600);

    setSelected(prev => {
      let next;
      if (prev.includes(optionText)) {
        next = prev.filter(v => v !== optionText);
      } else {
        if (prev.length >= maxSelect) return prev; // enforce cap silently
        next = [...prev, optionText];
      }
      onSelect(next);
      return next;
    });
  };

  const canProceed = selected.length >= minSelect;

  const handleNext = () => {
    if (!canProceed) return;
    setDirection('left');
    setTimeout(() => { onNext(); setDirection('right'); }, 280);
  };

  const handlePrev = () => {
    if (index === 0) return;
    setDirection('right');
    setTimeout(() => { onPrev(); setDirection('left'); }, 280);
  };

  const progressPercent = ((index + 1) / total) * 100;

  const hints = [
    'Take your time — honest answers matter most.',
    'Think about what energises you naturally.',
    'There are no wrong answers here.',
    'Trust your first instinct.',
  ];

  const slideVariants = {
    enter:  (d) => ({ x: d === 'right' ?  280 : -280, opacity: 0, scale: 0.97 }),
    center:       ({ x: 0,   opacity: 1, scale: 1 }),
    exit:   (d) => ({ x: d === 'right' ? -280 :  280, opacity: 0, scale: 0.97 }),
  };

  return (
    <div className="w-full">

      {/* ── Progress header ───────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#64CDD1] to-[#5794A4]
                            flex items-center justify-center shadow-md shadow-cyan-200">
              <Zap size={12} className="text-white" />
            </div>
            <span className="text-sm font-bold text-[#0A3948]">Question {index + 1}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{index + 1} / {total}</span>
            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#64CDD1] to-[#5794A4]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* dot indicators */}
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`h-1 rounded-full transition-all duration-300 ${
                i < index  ? 'bg-[#64CDD1] w-3'
                : i === index ? 'bg-[#0A3948] w-6'
                : 'bg-gray-200 w-3'
              }`}
            />
          ))}
        </div>
      </div>

      {/* motivational pill (first / mid / last question) */}
      {(index === 0 || index === Math.floor(total / 2) || index === total - 1) && (
        <motion.div
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-4"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px]
                           bg-gradient-to-r from-[#64CDD1]/15 to-[#5794A4]/15
                           text-[#5794A4] px-3 py-1 rounded-full font-semibold border border-[#64CDD1]/20">
            <Sparkles size={10} />
            {index === 0 ? "Let's discover your path!"
              : index === total - 1 ? 'Last one — almost there!'
              : "You're halfway through!"}
          </span>
        </motion.div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-4"
        >

          {/* ── Question card ─────────────────────────────────────────── */}
          <div className="relative overflow-hidden bg-white rounded-2xl p-7
                          shadow-lg shadow-gray-100 border border-gray-100">
            {/* decorative blobs */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-10 translate-x-10
                            blur-2xl pointer-events-none"
                 style={{ background: 'radial-gradient(circle, #B8E3E630, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full translate-y-8 -translate-x-8
                            blur-xl pointer-events-none"
                 style={{ background: 'radial-gradient(circle, #5794A415, transparent 70%)' }} />

            <div className="flex justify-center mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#B8E3E6] to-[#64CDD1]/40
                              flex items-center justify-center shadow-sm">
                <Lightbulb size={20} className="text-[#5794A4]" />
              </div>
            </div>

            {/* question text — bold, slightly larger */}
            <h3 className="text-[1.15rem] font-black text-[#0A3948] text-center mb-2
                           leading-snug tracking-tight">
              {question.text || question.question}
            </h3>
            {question.description && (
              <p className="text-sm text-gray-400 text-center max-w-sm mx-auto leading-relaxed">
                {question.description}
              </p>
            )}

            {/* live selection counter pill */}
            <div className="mt-4 flex justify-center">
              <motion.span
                animate={canProceed ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
                             font-semibold border transition-all duration-300 ${
                  canProceed
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : 'bg-gray-50 text-gray-400 border-gray-200'
                }`}
              >
                {canProceed
                  ? <><Check size={11} strokeWidth={3} /> {selected.length} selected — good to go</>
                  : `Select ${minSelect}–${maxSelect} options (${selected.length} chosen)`
                }
              </motion.span>
            </div>
          </div>

          {/* ── Options ───────────────────────────────────────────────── */}
          <div className="space-y-2">
            {question.options.map((option, i) => {
              const isSelected  = selected.includes(option.text);
              const isDisabled  = !isSelected && selected.length >= maxSelect;
              const isNew       = justSelected === option.text;

              return (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => { if (!isDisabled) toggle(option.text); }}
                  className={`group relative w-full text-left p-3.5 rounded-xl transition-all
                               duration-200 flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#64CDD1]/12 to-[#5794A4]/8 border-2 border-[#64CDD1] shadow-md shadow-cyan-100'
                      : isDisabled
                        ? 'bg-gray-50 border border-gray-100 opacity-40 cursor-not-allowed'
                        : 'bg-white border border-gray-100 hover:border-[#64CDD1]/50 hover:shadow-sm hover:bg-[#F8FEFF]'
                  }`}
                  whileHover={!isDisabled ? { scale: 1.007 } : {}}
                  whileTap={!isDisabled  ? { scale: 0.995 } : {}}
                >
                  {/* letter / check badge */}
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center
                                   justify-center font-bold text-xs transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#64CDD1] to-[#5794A4] text-white shadow-md shadow-cyan-200'
                      : 'bg-gray-100 text-gray-400 group-hover:bg-[#64CDD1]/15 group-hover:text-[#5794A4]'
                  }`}>
                    {isSelected ? <Check size={13} strokeWidth={3} /> : option.value}
                  </div>

                  <span className={`flex-1 text-sm leading-relaxed transition-colors duration-200 ${
                    isSelected ? 'text-[#0A3948] font-semibold' : 'text-gray-600'
                  }`}>
                    {option.text}
                  </span>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        className="w-5 h-5 rounded-full bg-[#64CDD1] flex items-center
                                   justify-center flex-shrink-0"
                      >
                        <Check size={10} className="text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* "max reached" nudge */}
          <AnimatePresence>
            {selected.length >= maxSelect && (
              <motion.div
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-500 font-semibold">
                  Max {maxSelect} selections reached — deselect one to change your answer
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Navigation ────────────────────────────────────────────── */}
          <div className="flex gap-3 pt-1">
            <motion.button
              onClick={handlePrev}
              disabled={index === 0}
              className={`flex-1 py-3.5 rounded-xl font-semibold text-sm flex items-center
                          justify-center gap-2 transition-all duration-200 ${
                index !== 0
                  ? 'bg-white border border-gray-200 text-gray-500 hover:border-[#64CDD1]/50 hover:text-[#5794A4] hover:shadow-sm'
                  : 'bg-gray-50 border border-gray-100 text-gray-200 cursor-not-allowed'
              }`}
              whileHover={index !== 0 ? { scale: 1.01 } : {}}
              whileTap={index !== 0  ? { scale: 0.99 } : {}}
            >
              <ChevronLeft size={16} /> Previous
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={!canProceed}
              className={`flex-[2] py-3.5 rounded-xl font-bold text-sm flex items-center
                          justify-center gap-2 transition-all duration-200 ${
                canProceed
                  ? 'bg-gradient-to-r from-[#5794A4] to-[#64CDD1] text-white shadow-lg shadow-cyan-200 hover:shadow-xl hover:shadow-cyan-300'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              whileHover={canProceed ? { scale: 1.01 } : {}}
              whileTap={canProceed   ? { scale: 0.98 } : {}}
            >
              {isLast
                ? <><Sparkles size={15} /> Complete Day</>
                : <>Next <ChevronRight size={15} /></>
              }
            </motion.button>
          </div>

          {/* hint */}
          <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
            <Lightbulb size={10} className="text-amber-300" />
            {!canProceed
              ? hints[index % hints.length]
              : isLast
                ? "Ready to complete today's journey!"
                : 'Great — tap Next to continue'
            }
          </p>

        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuestionCard;