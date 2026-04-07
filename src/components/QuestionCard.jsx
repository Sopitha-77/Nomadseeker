// src/components/QuestionCard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Sparkles, Brain, Lightbulb, Star } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  index, 
  total, 
  selectedValue, 
  onSelect, 
  onNext, 
  onPrev,
  isLast
}) => {
  const [direction, setDirection] = useState('right');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswerText, setSelectedAnswerText] = useState('');

  // Reset selected option when question changes
  useEffect(() => {
    setSelectedOption(selectedValue || null);
    setShowFeedback(false);
  }, [question, selectedValue]);

  const handleSelect = (optionText) => {
    setSelectedOption(optionText);
    setSelectedAnswerText(optionText);
    setShowFeedback(true);
    
    // Add haptic feedback effect
    const btn = document.activeElement;
    if (btn) btn.blur();
    
    // Small delay before calling onSelect for smooth animation
    setTimeout(() => {
      onSelect(optionText);
    }, 150);
  };

  const handleNext = () => {
    if (selectedOption && onNext) {
      setDirection('left');
      setShowFeedback(false);
      setTimeout(() => {
        onNext();
        setDirection('right');
      }, 300);
    }
  };
  
  const handlePrev = () => {
    if (onPrev) {
      setDirection('right');
      setShowFeedback(false);
      setTimeout(() => {
        onPrev();
        setDirection('left');
      }, 300);
    }
  };
  
  const variants = {
    enter: (direction) => ({
      x: direction === 'right' ? 400 : -400,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction === 'right' ? -400 : 400,
      opacity: 0,
      scale: 0.95
    })
  };

  // Progress percentage
  const progressPercent = ((index + 1) / total) * 100;

  // Get motivational message based on progress
  const getMotivationalMessage = () => {
    if (index === 0) return "🎯 Let's begin! Take your time to reflect.";
    if (index === total - 1) return "🏁 Final question! You're almost there!";
    if (index === Math.floor(total / 2)) return "⭐ Halfway there! You're doing great!";
    return null;
  };

  const motivationalMessage = getMotivationalMessage();

  return (
    <div className="w-full">
      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-downy to-horizon flex items-center justify-center shadow-md">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-tiber">
              Question {index + 1}
            </span>
          </div>
          <span className="text-sm text-gray-400 font-medium">
            {index + 1} / {total}
          </span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-downy to-horizon rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-white/30 rounded-full"
            animate={{ x: ["0%", "500%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ width: "30%" }}
          />
        </div>
        
        {/* Question indicators */}
        <div className="flex gap-1 mt-3">
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`h-1 rounded-full transition-all duration-300 ${
                i <= index 
                  ? 'bg-gradient-to-r from-downy to-horizon' 
                  : 'bg-gray-200'
              } ${i === index ? 'w-8' : 'w-4'}`}
            />
          ))}
        </div>
      </div>
      
      {/* Motivational Message */}
      {motivationalMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs bg-gradient-to-r from-downy/20 to-horizon/20 px-3 py-1.5 rounded-full text-downy font-medium">
            <Sparkles className="w-3 h-3" />
            {motivationalMessage}
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
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-6"
        >
          {/* Question Card */}
          <div className="relative overflow-hidden glass-card rounded-2xl p-8 shadow-xl border border-white/50">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-downy/5 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-horizon/5 to-transparent rounded-full blur-2xl" />
            
            {/* Question Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-downy/20 to-horizon/20 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-downy" />
              </div>
            </div>
            
            {/* Question Text */}
            <p className="text-xl md:text-2xl font-bold text-tiber text-center mb-3 leading-relaxed">
              {question.text}
            </p>
            
            {question.description && (
              <p className="text-sm text-gray-500 text-center mb-8 max-w-md mx-auto">
                {question.description}
              </p>
            )}
            
            {/* Options Grid */}
            <div className="grid gap-3 mt-4">
              {question.options.map((option, optIndex) => {
                const isSelected = selectedOption === option.text;
                return (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: optIndex * 0.05 }}
                    onClick={() => handleSelect(option.text)}
                    className={`
                      group relative w-full text-left p-4 rounded-xl transition-all duration-300
                      ${isSelected 
                        ? 'bg-gradient-to-r from-downy/15 to-horizon/15 border-2 border-downy shadow-lg scale-[1.01]' 
                        : 'bg-white border-2 border-gray-100 hover:border-downy/50 hover:shadow-md hover:scale-[1.01]'
                      }
                    `}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-downy to-horizon rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                    
                    <div className="flex items-start gap-4">
                      {/* Option letter badge */}
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                        ${isSelected 
                          ? 'bg-gradient-to-r from-downy to-horizon text-white shadow-md' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-downy/20 group-hover:text-downy'
                        }
                      `}>
                        {option.value}
                      </div>
                      <span className={`flex-1 text-gray-700 leading-relaxed ${isSelected ? 'font-medium' : ''}`}>
                        {option.text}
                      </span>
                    </div>
                    
                    {/* Hover ripple effect */}
                    {!isSelected && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-downy/0"
                        whileHover={{ backgroundColor: "rgba(100, 205, 209, 0.05)" }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
            
            {/* Selected feedback animation */}
            <AnimatePresence>
              {showFeedback && selectedOption && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 text-center"
                >
                  <div className="inline-flex items-center gap-2 text-xs text-downy font-medium">
                    <Check className="w-3 h-3" />
                    <span>Answer selected</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <motion.button
              onClick={handlePrev}
              disabled={index === 0}
              className={`
                flex-1 py-3.5 rounded-xl font-medium transition-all duration-300
                flex items-center justify-center gap-2
                ${index !== 0 
                  ? 'bg-white border-2 border-gray-200 text-gray-600 hover:border-downy/50 hover:text-downy hover:shadow-md' 
                  : 'bg-gray-100 border-2 border-gray-100 text-gray-300 cursor-not-allowed'
                }
              `}
              whileHover={index !== 0 ? { scale: 1.02 } : {}}
              whileTap={index !== 0 ? { scale: 0.98 } : {}}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`
                flex-1 py-3.5 rounded-xl font-semibold transition-all duration-300
                flex items-center justify-center gap-2
                ${selectedOption 
                  ? 'bg-gradient-to-r from-horizon to-downy text-white shadow-lg hover:shadow-xl' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
              whileHover={selectedOption ? { scale: 1.02 } : {}}
              whileTap={selectedOption ? { scale: 0.98 } : {}}
            >
              {isLast ? (
                <>
                  <Star className="w-4 h-4" />
                  Complete Day
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
          
          {/* Progress Tip */}
          <div className="text-center">
            <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
              <Lightbulb className="w-3 h-3" />
              {!selectedOption 
                ? "Select an option to continue" 
                : isLast 
                  ? "Ready to complete this day's journey!" 
                  : "Click Next to continue your discovery"
              }
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuestionCard;