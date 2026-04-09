import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass, Download, Target, Heart, Briefcase, Globe,
  Sparkles, ArrowRight, Zap, Trophy, Star,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   IKIGAI CHART  — Dynamic diagram driven by real answer data.
   Receives the full `result` object from IkigaiContext.
═══════════════════════════════════════════════════════════════ */
const IkigaiChart = ({ result, onDownload }) => {
  const [hovered, setHovered] = useState(null);
  if (!result) return null;

  const {
    topTraits, buckets, overlaps, ikigaiSuggestion, summary,
    careerPath, centerInsight, actionResult, missionResult, archetype,
  } = result;

  /* ── Trait display fallback ──────────────────────────────── */
  const loveTraits  = (topTraits?.love  || buckets?.love?.map(b => b.trait)  || []).slice(0, 4);
  const goodTraits  = (topTraits?.good  || buckets?.good?.map(b => b.trait)  || []).slice(0, 4);
  const needTraits  = (topTraits?.need  || buckets?.need?.map(b => b.trait)  || []).slice(0, 4);
  const paidTraits  = (topTraits?.paid  || buckets?.paid?.map(b => b.trait)  || []).slice(0, 4);

  // Circle positions - adjusted for 600x550 viewBox
  const circles = [
    { id: 'love', label: 'What You Love',           short: 'PASSION',   icon: Heart,     traits: loveTraits, cx: 200, cy: 160, color: '#F43F5E', soft: '#FFF1F3' },
    { id: 'good', label: "What You're Good At",      short: 'VOCATION',  icon: Target,    traits: goodTraits, cx: 400, cy: 160, color: '#3B82F6', soft: '#EFF6FF' },
    { id: 'need', label: 'What The World Needs',     short: 'MISSION',   icon: Globe,     traits: needTraits, cx: 200, cy: 320, color: '#10B981', soft: '#ECFDF5' },
    { id: 'paid', label: 'Can Be Paid For',          short: 'PROFESSION',icon: Briefcase, traits: paidTraits, cx: 400, cy: 320, color: '#F59E0B', soft: '#FFFBEB' },
  ];

  const overlapCards = [
    { key: 'passion',    title: 'Passion',    subtitle: 'Love ∩ Skills',  icon: Heart,     color: '#F43F5E', soft: 'from-rose-50 to-pink-50',     border: 'border-rose-100',   chip: 'bg-rose-100 text-rose-600' },
    { key: 'profession', title: 'Profession', subtitle: 'Skills ∩ Money', icon: Briefcase, color: '#F59E0B', soft: 'from-yellow-50 to-amber-50',   border: 'border-amber-100',  chip: 'bg-amber-100 text-amber-700' },
    { key: 'vocation',   title: 'Vocation',   subtitle: 'Money ∩ Need',   icon: Globe,     color: '#10B981', soft: 'from-emerald-50 to-teal-50',   border: 'border-emerald-100',chip: 'bg-emerald-100 text-emerald-700' },
    { key: 'mission',    title: 'Mission',    subtitle: 'Need ∩ Love',    icon: Target,    color: '#8B5CF6', soft: 'from-violet-50 to-purple-50',  border: 'border-violet-100', chip: 'bg-violet-100 text-violet-600' },
  ];

  const actionLabels = {
    Executor:            'Executor — turns ideas into reality',
    Planner:             'Planner — designs structured paths',
    Starter:             'Starter — initiates boldly',
    ConsistentPerformer: 'Consistent Performer — steady momentum',
  };

  const missionLabels = {
    ImpactCreator: 'Impact Creator',
    PurposeDriven: 'Purpose Driven',
    VisionBuilder: 'Vision Builder',
    GrowthSeeker:  'Growth Seeker',
  };

  const centerTitle = centerInsight?.title || archetype?.name || 'Your Purpose';
  const centerText = centerTitle.length > 20 ? centerTitle.substring(0, 18) + '..' : centerTitle;

  return (
    <div className="space-y-5">

      {/* ── Archetype / Center Insight Card ─────────────────── */}
      {(centerInsight || archetype) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 shadow-xl text-white"
          style={{ background: 'linear-gradient(135deg, #0A3948 0%, #1a5068 100%)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: (centerInsight?.color || archetype?.color || '#64CDD1') + '25',
                border: `1.5px solid ${centerInsight?.color || archetype?.color || '#64CDD1'}`,
              }}
            >
              <Trophy size={20} style={{ color: centerInsight?.color || archetype?.color || '#64CDD1' }} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/50 font-medium">
                Your Ikigai Archetype
              </p>
              <p className="text-xl font-black text-white leading-tight mt-0.5">
                {centerTitle}
              </p>
            </div>
          </div>

          <p className="text-sm text-white/75 leading-relaxed mb-4">
            {centerInsight?.summary || archetype?.name
              ? `You are ${archetype?.name} — a unique combination of purpose, skill, and impact.`
              : summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {actionResult?.archetype && (
              <span
                className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                style={{
                  background: (centerInsight?.color || '#64CDD1') + '20',
                  color: centerInsight?.color || '#64CDD1',
                  border: `0.5px solid ${centerInsight?.color || '#64CDD1'}50`,
                }}
              >
                ⚡ {actionLabels[actionResult.archetype] || actionResult.archetype}
              </span>
            )}
            {missionResult?.archetype && (
              <span
                className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                style={{
                  background: (centerInsight?.color || '#64CDD1') + '20',
                  color: centerInsight?.color || '#64CDD1',
                  border: `0.5px solid ${centerInsight?.color || '#64CDD1'}50`,
                }}
              >
                🎯 {missionLabels[missionResult.archetype] || missionResult.archetype}
              </span>
            )}
          </div>
        </motion.div>
      )}

      {/* ── Dynamic Ikigai SVG Map ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#64CDD1] to-[#5794A4]
                            flex items-center justify-center shadow-md shadow-cyan-200">
              <Compass size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Your Map</p>
              <p className="text-sm font-bold text-[#0A3948]">Ikigai Diagram</p>
            </div>
          </div>
          {onDownload && (
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={onDownload}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#5794A4]
                         px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all border border-gray-100"
            >
              <Download size={13} /> Export
            </motion.button>
          )}
        </div>

        {/* SVG Diagram - 650x550 viewBox for proper spacing */}
        <div className="flex justify-center">
          <svg viewBox="0 0 650 550" className="w-full max-w-lg mx-auto">
            <defs>
              {circles.map(c => (
                <radialGradient key={c.id} id={`grad-${c.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor={c.color} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={c.color} stopOpacity="0.05" />
                </radialGradient>
              ))}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            <line x1="280" y1="160" x2="370" y2="160" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="5" opacity="0.5" />
            <line x1="280" y1="320" x2="370" y2="320" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="5" opacity="0.5" />
            <line x1="200" y1="220" x2="200" y2="260" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="5" opacity="0.5" />
            <line x1="400" y1="220" x2="400" y2="260" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="5" opacity="0.5" />

            {/* Four large circles */}
            {circles.map(c => (
              <g key={c.id}
                 onMouseEnter={() => setHovered(c.id)}
                 onMouseLeave={() => setHovered(null)}>
                <circle
                  cx={c.cx} cy={c.cy} r="80"
                  fill={`url(#grad-${c.id})`}
                  stroke={c.color}
                  strokeWidth={hovered === c.id ? 3 : 1.5}
                  strokeOpacity={hovered === c.id ? 0.8 : 0.4}
                  style={{ transition: 'all 0.25s', cursor: 'pointer' }}
                />
                
                {/* Circle Title - top of circle */}
                <text
                  x={c.cx} y={c.cy - 50}
                  textAnchor="middle" fontSize="11" fill={c.color}
                  fontWeight="800" letterSpacing="1"
                >
                  {c.short}
                </text>
                
                {/* Divider line inside circle */}
                <line x1={c.cx - 30} y1={c.cy - 38} x2={c.cx + 30} y2={c.cy - 38} stroke={c.color} strokeWidth="1" opacity="0.3" />
                
                {/* Traits inside circle - evenly spaced */}
                {c.traits.length > 0 && (
                  <>
                    {c.traits.slice(0, 3).map((trait, idx) => (
                      <text
                        key={idx}
                        x={c.cx} y={c.cy - 15 + (idx * 22)}
                        textAnchor="middle" fontSize="9" fill={c.color}
                        fontWeight="500"
                      >
                        {trait}
                      </text>
                    ))}
                    {c.traits.length > 3 && (
                      <text
                        x={c.cx} y={c.cy + 40}
                        textAnchor="middle" fontSize="8" fill={c.color}
                        fontWeight="400" opacity="0.6"
                      >
                        +{c.traits.length - 3} more
                      </text>
                    )}
                  </>
                )}
              </g>
            ))}

            {/* Center circle */}
            <circle cx="300" cy="240" r="55" fill="white" stroke="#64CDD1"
                    strokeWidth="2.5" strokeOpacity="0.8" filter="url(#glow)" />
            
            {/* Center text */}
            <text x="300" y="233" textAnchor="middle" fontSize="11" fontWeight="800"
                  fill="#0A3948" letterSpacing="1">{centerText}</text>
            <text x="300" y="250" textAnchor="middle" fontSize="8" fill="#5794A4" fontWeight="600">YOUR IKIGAI</text>

            {/* Outer zone labels */}
            <text x="300" y="55" textAnchor="middle" fontSize="11" fontWeight="800" fill="#5794A4" letterSpacing="2">PASSION</text>
            <text x="75" y="245" textAnchor="middle" fontSize="11" fontWeight="800" fill="#5794A4" letterSpacing="2">MISSION</text>
            <text x="525" y="245" textAnchor="middle" fontSize="11" fontWeight="800" fill="#5794A4" letterSpacing="2">VOCATION</text>
            <text x="300" y="480" textAnchor="middle" fontSize="11" fontWeight="800" fill="#5794A4" letterSpacing="2">PROFESSION</text>
          </svg>
        </div>

        {/* Legend with full trait list */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {circles.map(c => {
            const Icon = c.icon;
            return (
              <div key={c.id} className="flex flex-col gap-2 p-3 rounded-xl border"
                   style={{ backgroundColor: c.soft, borderColor: c.color + '30' }}>
                <div className="flex items-center gap-2">
                  <Icon size={14} style={{ color: c.color, flexShrink: 0 }} />
                  <span className="text-xs font-bold" style={{ color: c.color }}>{c.short}</span>
                  <span className="text-[10px] text-gray-400">({c.label})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.traits.map((t, i) => (
                    <span key={i}
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: c.color + '15', color: c.color }}>
                      {t}
                    </span>
                  ))}
                  {c.traits.length === 0 && (
                    <span className="text-[10px] text-gray-400 italic">Exploring...</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Overlap Breakdown ───────────────────────────────── */}
      {ikigaiSuggestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100 border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={16} className="text-amber-400" />
            <h3 className="font-bold text-[#0A3948]">Your Ikigai Breakdown</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {overlapCards.map(card => {
              const Icon = card.icon;
              const data = ikigaiSuggestion[card.key];
              return (
                <div key={card.key}
                     className={`bg-gradient-to-br ${card.soft} rounded-xl p-4 border ${card.border}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon size={13} style={{ color: card.color }} />
                    <span className="text-xs font-bold" style={{ color: card.color }}>{card.title}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-2">{card.subtitle}</p>
                  {data?.keywords?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {data.keywords.slice(0, 3).map((kw, i) => (
                        <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${card.chip}`}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-[10px] text-gray-500 leading-relaxed">{data?.suggestion}</p>
                </div>
              );
            })}
          </div>

          {/* true Ikigai center */}
          {ikigaiSuggestion.ikigai?.keywords?.length > 0 && (
            <div className="mt-4 p-4 bg-gradient-to-r from-[#64CDD1]/10 to-[#5794A4]/10
                            rounded-xl text-center border border-[#64CDD1]/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Compass size={15} className="text-[#64CDD1]" />
                <h4 className="font-black text-[#0A3948] text-sm">Your True Ikigai</h4>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                {ikigaiSuggestion.ikigai.keywords.slice(0, 5).map((kw, i) => (
                  <span key={i}
                        className="text-xs px-3 py-1 bg-white text-[#5794A4] rounded-full
                                   font-semibold shadow-sm border border-[#64CDD1]/30">
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {ikigaiSuggestion.ikigai.suggestion}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* ── Ikigai Sentence + Career Paths ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100 border border-gray-100"
      >
        <h3 className="font-bold text-[#0A3948] mb-3 flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#64CDD1] to-[#5794A4]" />
          Your Ikigai Summary
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">{summary}</p>

        {careerPath?.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Suggested Career Paths
            </h4>
            <div className="space-y-2">
              {careerPath.map((path, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#64CDD1]/5 to-[#5794A4]/5
                             rounded-xl border border-[#64CDD1]/15"
                >
                  <ArrowRight size={13} className="text-[#64CDD1] flex-shrink-0" />
                  <span className="text-sm text-[#0A3948] font-medium">{path}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default IkigaiChart;