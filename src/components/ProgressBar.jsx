// src/components/ProgressBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Target, Heart, Globe, Compass } from 'lucide-react';

const ProgressBar = ({ currentDay, completedDays }) => {
  const days = [1, 2, 3, 4, 5, 6];
  
  const dayIcons = {
    1: <Heart size={14} />,
    2: <Star size={14} />,
    3: <Target size={14} />,
    4: <Globe size={14} />,
    5: <Star size={14} />,
    6: <Compass size={14} />
  };
  
  const dayLabels = {
    1: "Passion",
    2: "Skills",
    3: "Value",
    4: "Purpose",
    5: "Action",
    6: "Mission"
  };
  
  const dayColors = {
    1: "from-pink-500 to-rose-500",
    2: "from-blue-500 to-cyan-500",
    3: "from-emerald-500 to-teal-500",
    4: "from-purple-500 to-indigo-500",
    5: "from-orange-500 to-amber-500",
    6: "from-downy to-horizon"
  };

  const progressPercent = (completedDays.length / 6) * 100;
  
  return (
    <div className="mb-10">
      {/* Progress Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-downy to-horizon flex items-center justify-center shadow-md">
            <Compass size={16} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-tiber">Your Ikigai Journey</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-horizon">{completedDays.length}</span>
          <span className="text-sm text-gray-400">/6 Days</span>
        </div>
      </div>
      
      {/* Progress Bar with Animation */}
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-downy to-horizon rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* Animated shine effect */}
        <motion.div
          className="absolute top-0 left-0 h-full w-20 bg-white/30 rounded-full"
          animate={{ x: ["0%", "500%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ width: "30%" }}
        />
      </div>
      
      {/* Day Circles */}
      <div className="flex justify-between">
        {days.map(day => {
          const isCompleted = completedDays.includes(day);
          const isCurrent = day === currentDay;
          const isUpcoming = day > currentDay && !isCompleted;
          
          return (
            <motion.div
              key={day}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: day * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Day Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`
                  relative w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300 cursor-pointer
                  ${isCompleted 
                    ? 'bg-gradient-to-r from-downy to-horizon text-white shadow-lg' 
                    : isCurrent 
                      ? 'bg-white ring-4 ring-downy/30 text-horizon shadow-md' 
                      : 'bg-gray-100 text-gray-400'
                  }
                `}
              >
                {/* Pulse animation for current day */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-downy/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                {/* Checkmark for completed */}
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: day * 0.1 }}
                  >
                    <Check size={20} />
                  </motion.div>
                ) : (
                  <span className="text-sm font-semibold">{day}</span>
                )}
              </motion.div>
              
              {/* Day Label */}
              <span className={`text-xs mt-2 font-medium ${
                isCompleted ? 'text-downy' : isCurrent ? 'text-horizon' : 'text-gray-400'
              }`}>
                {dayLabels[day]}
              </span>
              
              {/* Day Status Badge */}
              <div className="text-[10px] text-gray-400 mt-0.5">
                {isCompleted ? '✓ Done' : isCurrent ? 'In Progress' : 'Locked'}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Completion Milestone Messages */}
      {completedDays.length === 3 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <span className="text-xs bg-gradient-to-r from-downy/20 to-horizon/20 px-3 py-1 rounded-full text-downy font-medium">
            🌟 Halfway there! Keep going!
          </span>
        </motion.div>
      )}
      
      {completedDays.length === 6 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-center"
        >
          <span className="text-xs bg-gradient-to-r from-yellow-400/20 to-orange-400/20 px-3 py-1 rounded-full text-orange-600 font-medium">
            🎉 Congratulations! You've discovered your Ikigai!
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressBar;