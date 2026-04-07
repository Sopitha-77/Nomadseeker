import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Download, Target, Heart, Briefcase, Globe, Sparkles, ArrowRight } from 'lucide-react';

const IkigaiChart = ({ result, onDownload }) => {
  const [hovered, setHovered] = useState(null);
  if (!result) return null;

  const { groupedAnswers, summary, careerPath, ikigaiSuggestion } = result;

  const circles = [
    { id: 'love', label: 'What You Love', short: 'Passion', icon: Heart, answers: groupedAnswers?.love || [], cx: 155, cy: 148, color: '#F43F5E', soft: '#FFF1F3' },
    { id: 'good', label: "What You're Good At", short: 'Vocation', icon: Target, answers: groupedAnswers?.good || [], cx: 245, cy: 148, color: '#3B82F6', soft: '#EFF6FF' },
    { id: 'need', label: 'What The World Needs', short: 'Mission', icon: Globe, answers: groupedAnswers?.need || [], cx: 155, cy: 222, color: '#10B981', soft: '#ECFDF5' },
    { id: 'paid', label: 'What You Can Be Paid For', short: 'Profession', icon: Briefcase, answers: groupedAnswers?.paid || [], cx: 245, cy: 222, color: '#F59E0B', soft: '#FFFBEB' },
  ];

  const overlapCards = [
    { key: 'passion', title: 'Passion', subtitle: 'Love ∩ Skills', icon: Heart, color: '#F43F5E', soft: 'from-rose-50 to-pink-50', border: 'border-rose-100', chip: 'bg-rose-100 text-rose-600' },
    { key: 'profession', title: 'Profession', subtitle: 'Skills ∩ Money', icon: Briefcase, color: '#F59E0B', soft: 'from-yellow-50 to-amber-50', border: 'border-amber-100', chip: 'bg-amber-100 text-amber-700' },
    { key: 'vocation', title: 'Vocation', subtitle: 'Money ∩ Need', icon: Globe, color: '#10B981', soft: 'from-emerald-50 to-teal-50', border: 'border-emerald-100', chip: 'bg-emerald-100 text-emerald-700' },
    { key: 'mission', title: 'Mission', subtitle: 'Need ∩ Love', icon: Target, color: '#8B5CF6', soft: 'from-violet-50 to-purple-50', border: 'border-violet-100', chip: 'bg-violet-100 text-violet-600' },
  ];

  return (
    <div className="space-y-5">
      {/* Ikigai Map */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#64CDD1] to-[#5794A4] flex items-center justify-center shadow-md shadow-cyan-200">
              <Compass size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Your Map</p>
              <p className="text-sm font-bold text-[#0A3948]">Ikigai Diagram</p>
            </div>
          </div>
          {onDownload && (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={onDownload}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#5794A4] px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all border border-gray-100">
              <Download size={13} /> Export
            </motion.button>
          )}
        </div>

        <svg viewBox="0 0 400 400" className="w-full max-w-xs mx-auto">
          <defs>
            {circles.map(c => (
              <radialGradient key={c.id} id={`grad-${c.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={c.color} stopOpacity="0.22" />
                <stop offset="100%" stopColor={c.color} stopOpacity="0.04" />
              </radialGradient>
            ))}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {circles.map(c => (
            <g key={c.id}>
              <circle
                cx={c.cx} cy={c.cy} r="96"
                fill={`url(#grad-${c.id})`}
                stroke={c.color}
                strokeWidth={hovered === c.id ? 2.5 : 1.5}
                strokeOpacity={hovered === c.id ? 0.8 : 0.4}
                style={{ transition: 'all 0.25s', cursor: 'pointer' }}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
              />
            </g>
          ))}

          {/* Center */}
          <circle cx="200" cy="185" r="52" fill="white" stroke="#64CDD1" strokeWidth="2" strokeOpacity="0.7" filter="url(#glow)" />
          <text x="200" y="180" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0A3948" letterSpacing="2.5">IKIGAI</text>
          <text x="200" y="196" textAnchor="middle" fontSize="7.5" fill="#5794A4" fontWeight="600" letterSpacing="0.5">Your Purpose</text>

          {/* Labels */}
          {[
            { x: 200, y: 106, text: "Passion" },
            { x: 104, y: 187, text: "Mission" },
            { x: 296, y: 187, text: "Vocation" },
            { x: 200, y: 278, text: "Profession" },
          ].map(l => (
            <text key={l.text} x={l.x} y={l.y} textAnchor="middle" fontSize="8" fontWeight="700" fill="#5794A4" opacity="0.8">{l.text}</text>
          ))}
        </svg>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {circles.map(c => {
            const Icon = c.icon;
            return (
              <div key={c.id} className="flex items-center gap-2 p-2.5 rounded-xl border"
                style={{ backgroundColor: c.soft, borderColor: c.color + '30' }}>
                <Icon size={12} style={{ color: c.color, flexShrink: 0 }} />
                <span className="text-[11px] font-semibold text-gray-600">{c.short}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Overlaps */}
      {ikigaiSuggestion && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100 border border-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={16} className="text-amber-400" />
            <h3 className="font-bold text-[#0A3948]">Your Ikigai Breakdown</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {overlapCards.map(card => {
              const Icon = card.icon;
              const data = ikigaiSuggestion[card.key];
              return (
                <div key={card.key} className={`bg-gradient-to-br ${card.soft} rounded-xl p-4 border ${card.border}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={13} style={{ color: card.color }} />
                    <span className="text-xs font-bold" style={{ color: card.color }}>{card.title}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-2">{card.subtitle}</p>
                  {data?.keywords?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {data.keywords.slice(0, 3).map((kw, i) => (
                        <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${card.chip}`}>{kw}</span>
                      ))}
                    </div>
                  )}
                  <p className="text-[10px] text-gray-500 leading-relaxed">{data?.suggestion}</p>
                </div>
              );
            })}
          </div>

          {/* Ikigai center */}
          {ikigaiSuggestion.ikigai?.keywords?.length > 0 && (
            <div className="mt-4 p-4 bg-gradient-to-r from-[#64CDD1]/10 to-[#5794A4]/10 rounded-xl text-center border border-[#64CDD1]/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Compass size={15} className="text-[#64CDD1]" />
                <h4 className="font-black text-[#0A3948] text-sm">Your True Ikigai</h4>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center mb-2">
                {ikigaiSuggestion.ikigai.keywords.map((kw, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-white text-[#5794A4] rounded-full font-semibold shadow-sm border border-[#64CDD1]/30">{kw}</span>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{ikigaiSuggestion.ikigai.suggestion}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100 border border-gray-100">
        <h3 className="font-bold text-[#0A3948] mb-3 flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#64CDD1] to-[#5794A4]" />
          Your Ikigai Summary
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">{summary}</p>

        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Suggested Career Paths</h4>
          <div className="space-y-2">
            {careerPath?.map((path, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#64CDD1]/5 to-[#5794A4]/5 rounded-xl border border-[#64CDD1]/15">
                <ArrowRight size={13} className="text-[#64CDD1] flex-shrink-0" />
                <span className="text-sm text-[#0A3948] font-medium">{path}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Four quadrants */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3">
        {[
          { icon: '🔥', label: 'Passion', color: 'from-rose-50 to-pink-100', textColor: 'text-rose-700', answers: groupedAnswers?.love },
          { icon: '💪', label: 'Skills', color: 'from-blue-50 to-sky-100', textColor: 'text-blue-700', answers: groupedAnswers?.good },
          { icon: '🌍', label: 'Purpose', color: 'from-emerald-50 to-teal-100', textColor: 'text-emerald-700', answers: groupedAnswers?.need },
          { icon: '💰', label: 'Career', color: 'from-amber-50 to-yellow-100', textColor: 'text-amber-700', answers: groupedAnswers?.paid },
        ].map(q => (
          <div key={q.label} className={`bg-gradient-to-br ${q.color} rounded-xl p-4`}>
            <p className={`text-xs font-bold ${q.textColor} mb-2`}>{q.icon} {q.label}</p>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              {(q.answers || []).slice(0, 2).join(' · ') || `Discovering your ${q.label.toLowerCase()}…`}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default IkigaiChart;