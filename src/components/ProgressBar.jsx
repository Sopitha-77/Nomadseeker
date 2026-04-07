import React from 'react';
import { motion } from 'framer-motion';
import { Check, Heart, Star, Target, Globe, Flame, Compass } from 'lucide-react';

const ProgressBar = ({ currentDay, completedDays }) => {
  const days = [1, 2, 3, 4, 5, 6];

  const dayConfig = {
    1: { icon: Heart, label: "Passion",    color: "#F43F5E", bg: "from-rose-500 to-pink-500" },
    2: { icon: Star,    label: "Skills",   color: "#3B82F6", bg: "from-blue-500 to-cyan-400" },
    3: { icon: Target,  label: "Value",    color: "#10B981", bg: "from-emerald-500 to-teal-400" },
    4: { icon: Globe,   label: "Purpose",  color: "#8B5CF6", bg: "from-violet-500 to-indigo-400" },
    5: { icon: Flame,   label: "Action",   color: "#F59E0B", bg: "from-amber-500 to-orange-400" },
    6: { icon: Compass, label: "Mission",  color: "#64CDD1", bg: "from-cyan-400 to-sky-500" },
  };

  const progressPercent = (completedDays.length / 6) * 100;

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#64CDD1] to-[#5794A4] flex items-center justify-center shadow-lg shadow-cyan-200">
            <Compass size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Your Journey</p>
            <p className="text-sm font-bold text-[#0A3948]">Ikigai Discovery</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-3xl font-black text-[#64CDD1]">{completedDays.length}</span>
          <div>
            <p className="text-xs text-gray-300 leading-none">/6</p>
            <p className="text-xs text-gray-400 leading-none">days</p>
          </div>
        </div>
      </div>

      {/* Thin progress track */}
      <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden mb-7">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #64CDD1, #5794A4, #8B5CF6)' }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full w-1/4 bg-white/50 rounded-full"
          animate={{ x: ['0%', '500%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Day steps */}
      <div className="flex justify-between relative">
        {/* connector line */}
        <div className="absolute top-5 left-5 right-5 h-px bg-gray-100 z-0" />

        {days.map((day) => {
          const cfg = dayConfig[day];
          const Icon = cfg.icon;
          const isCompleted = completedDays.includes(day);
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay && !isCompleted;

          return (
            <motion.div
              key={day}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: day * 0.08, type: 'spring', stiffness: 300 }}
              className="flex flex-col items-center relative z-10"
            >
              {/* Circle */}
              <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                isCompleted
                  ? `bg-gradient-to-br ${cfg.bg} shadow-lg`
                  : isCurrent
                    ? 'bg-white border-2 shadow-md'
                    : 'bg-gray-50 border border-gray-200'
              }`}
              style={isCurrent ? { borderColor: cfg.color, boxShadow: `0 0 0 4px ${cfg.color}22` } : {}}
              >
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: cfg.color + '20' }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                {isCompleted ? (
                  <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring' }}>
                    <Check size={16} className="text-white" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <Icon size={14} style={{ color: isCurrent ? cfg.color : '#CBD5E1' }} />
                )}
              </div>

              {/* Label */}
              <p className={`text-[10px] mt-2 font-semibold tracking-wide ${
                isCompleted ? 'text-[#64CDD1]' : isCurrent ? 'text-[#0A3948]' : 'text-gray-300'
              }`}>
                {cfg.label}
              </p>

              {/* Status */}
              <p className="text-[9px] text-gray-300 mt-0.5 font-medium">
                {isCompleted ? '✓ done' : isCurrent ? 'active' : '· · ·'}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Milestone banners */}
      {completedDays.length === 3 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-center">
          <span className="text-xs bg-gradient-to-r from-violet-100 to-cyan-100 text-violet-600 px-4 py-1.5 rounded-full font-semibold border border-violet-200">
            🌟 Halfway there — you're doing amazing!
          </span>
        </motion.div>
      )}
      {completedDays.length === 6 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="mt-5 text-center">
          <span className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 text-orange-600 px-4 py-1.5 rounded-full font-semibold border border-orange-200">
            🎉 All 6 days complete — your Ikigai awaits!
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressBar;