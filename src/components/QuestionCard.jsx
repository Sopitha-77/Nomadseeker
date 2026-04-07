import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Sparkles, Lightbulb, Zap } from 'lucide-react';

const QuestionCard = ({ question, index, total, selectedValue, onSelect, onNext, onPrev, isLast }) => {
  const [direction, setDirection] = useState('right');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [justSelected, setJustSelected] = useState(null);

  useEffect(() => {
    setSelectedOption(selectedValue || null);
    setShowFeedback(false);
    setJustSelected(null);
  }, [question, selectedValue]);

  const handleSelect = (optionText) => {
    setSelectedOption(optionText);
    setJustSelected(optionText);
    setShowFeedback(true);
    setTimeout(() => { onSelect(optionText); setJustSelected(null); }, 150);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    setDirection('left');
    setShowFeedback(false);
    setTimeout(() => { onNext(); setDirection('right'); }, 280);
  };

  const handlePrev = () => {
    if (!onPrev || index === 0) return;
    setDirection('right');
    setShowFeedback(false);
    setTimeout(() => { onPrev(); setDirection('left'); }, 280);
  };

  const progressPercent = ((index + 1) / total) * 100;

  const hints = [
    "Take your time — honest answers matter most.",
    "Think about what energises you naturally.",
    "There are no wrong answers here.",
    "Trust your first instinct.",
  ];

  const variants = {
    enter: (d) => ({ x: d === 'right' ? 300 : -300, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d === 'right' ? -300 : 300, opacity: 0, scale: 0.97 }),
  };

  return (
    <div className="w-full">
      {/* Progress header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#64CDD1] to-[#5794A4] flex items-center justify-center shadow-md shadow-cyan-200">
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

        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`h-1 rounded-full transition-all duration-400 ${
                i < index ? 'bg-[#64CDD1]' : i === index ? 'bg-[#0A3948] w-6' : 'bg-gray-150'
              } ${i !== index ? 'w-3' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Motivational pill */}
      {(index === 0 || index === Math.floor(total / 2) || index === total - 1) && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] bg-gradient-to-r from-[#64CDD1]/15 to-[#5794A4]/15 text-[#5794A4] px-3 py-1 rounded-full font-semibold border border-[#64CDD1]/20">
            <Sparkles size={10} />
            {index === 0 ? "Let's discover your path!" : index === total - 1 ? "Last one — almost there!" : "You're halfway through!"}
          </span>
        </motion.div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-4"
        >
          {/* Question */}
          <div className="relative overflow-hidden bg-white rounded-2xl p-7 shadow-lg shadow-gray-100 border border-gray-100">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#B8E3E6]/30 to-transparent rounded-full -translate-y-10 translate-x-10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-[#5794A4]/10 to-transparent rounded-full translate-y-8 -translate-x-8 blur-xl pointer-events-none" />

            <div className="flex justify-center mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#B8E3E6] to-[#64CDD1]/40 flex items-center justify-center shadow-sm">
                <Lightbulb size={20} className="text-[#5794A4]" />
              </div>
            </div>

            <h3 className="text-xl font-black text-[#0A3948] text-center mb-2 leading-snug tracking-tight">
              {question.text}
            </h3>
            {question.description && (
              <p className="text-sm text-gray-400 text-center max-w-sm mx-auto leading-relaxed">
                {question.description}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2">
            {question.options.map((option, i) => {
              const isSelected = selectedOption === option.text;
              const isNew = justSelected === option.text;
              return (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleSelect(option.text)}
                  className={`group relative w-full text-left p-3.5 rounded-xl transition-all duration-250 flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#64CDD1]/12 to-[#5794A4]/8 border-2 border-[#64CDD1] shadow-md shadow-cyan-100'
                      : 'bg-white border border-gray-100 hover:border-[#64CDD1]/50 hover:shadow-sm hover:bg-[#F8FEFF]'
                  }`}
                  whileHover={{ scale: 1.007 }}
                  whileTap={{ scale: 0.995 }}
                >
                  {/* Letter badge */}
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-xs transition-all duration-250 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#64CDD1] to-[#5794A4] text-white shadow-md shadow-cyan-200'
                      : 'bg-gray-100 text-gray-400 group-hover:bg-[#64CDD1]/15 group-hover:text-[#5794A4]'
                  }`}>
                    {isSelected ? <Check size={13} strokeWidth={3} /> : option.value}
                  </div>

                  <span className={`flex-1 text-sm leading-relaxed transition-all duration-200 ${
                    isSelected ? 'text-[#0A3948] font-semibold' : 'text-gray-600'
                  }`}>
                    {option.text}
                  </span>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="w-5 h-5 rounded-full bg-[#64CDD1] flex items-center justify-center flex-shrink-0"
                    >
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#64CDD1] font-semibold">
                  <Check size={11} strokeWidth={3} /> Answer recorded
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-3 pt-1">
            <motion.button
              onClick={handlePrev}
              disabled={index === 0}
              className={`flex-1 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                index !== 0
                  ? 'bg-white border border-gray-200 text-gray-500 hover:border-[#64CDD1]/50 hover:text-[#5794A4] hover:shadow-sm'
                  : 'bg-gray-50 border border-gray-100 text-gray-200 cursor-not-allowed'
              }`}
              whileHover={index !== 0 ? { scale: 1.01 } : {}}
              whileTap={index !== 0 ? { scale: 0.99 } : {}}
            >
              <ChevronLeft size={16} /> Previous
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`flex-[2] py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                selectedOption
                  ? 'bg-gradient-to-r from-[#5794A4] to-[#64CDD1] text-white shadow-lg shadow-cyan-200 hover:shadow-xl hover:shadow-cyan-300'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              whileHover={selectedOption ? { scale: 1.01 } : {}}
              whileTap={selectedOption ? { scale: 0.98 } : {}}
            >
              {isLast ? (
                <><Sparkles size={15} /> Complete Day</>
              ) : (
                <>Next <ChevronRight size={15} /></>
              )}
            </motion.button>
          </div>

          {/* Hint */}
          <p className="text-center text-[11px] text-gray-350 flex items-center justify-center gap-1">
            <Lightbulb size={10} className="text-amber-300" />
            {!selectedOption ? hints[index % hints.length] : isLast ? "Ready to complete today's journey!" : "Great — tap Next to continue"}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuestionCard;