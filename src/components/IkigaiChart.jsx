// src/components/IkigaiChart.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Download, Target, Heart, Briefcase, Globe, Sparkles } from 'lucide-react';

const IkigaiChart = ({ result, onDownload }) => {
  const [hovered, setHovered] = useState(null);
  
  if (!result) return null;
  
  const { groupedAnswers, summary, careerPath, ikigaiSuggestion, overlaps } = result;
  
  const circles = [
    { 
      id: 'love', 
      label: 'What You Love', 
      short: 'Passion',
      icon: <Heart size={16} />,
      answers: groupedAnswers?.love || [],
      cx: 155, 
      cy: 148,
      color: '#EC4899',
      bgColor: 'from-pink-500 to-rose-500'
    },
    { 
      id: 'good', 
      label: 'What You\'re Good At', 
      short: 'Vocation',
      icon: <Target size={16} />,
      answers: groupedAnswers?.good || [],
      cx: 245, 
      cy: 148,
      color: '#3B82F6',
      bgColor: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'need', 
      label: 'What The World Needs', 
      short: 'Mission',
      icon: <Globe size={16} />,
      answers: groupedAnswers?.need || [],
      cx: 155, 
      cy: 222,
      color: '#10B981',
      bgColor: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'paid', 
      label: 'What You Can Be Paid For', 
      short: 'Profession',
      icon: <Briefcase size={16} />,
      answers: groupedAnswers?.paid || [],
      cx: 245, 
      cy: 222,
      color: '#F59E0B',
      bgColor: 'from-yellow-500 to-amber-500'
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Ikigai Map */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-downy to-horizon flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-tiber">Your Ikigai Map</h3>
          </div>
          {onDownload && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDownload}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Download className="w-4 h-4 text-gray-500" />
            </motion.button>
          )}
        </div>
        
        <div className="relative">
          <svg viewBox="0 0 400 400" className="w-full max-w-md mx-auto">
            <defs>
              {circles.map(c => (
                <radialGradient key={c.id} id={`grad-${c.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={c.color} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={c.color} stopOpacity="0.05" />
                </radialGradient>
              ))}
            </defs>
            
            {/* Circles */}
            {circles.map(c => (
              <g key={c.id}>
                <circle
                  cx={c.cx}
                  cy={c.cy}
                  r="96"
                  fill={`url(#grad-${c.id})`}
                  stroke={c.color}
                  strokeWidth={hovered === c.id ? 3 : 1.5}
                  strokeOpacity={0.6}
                  style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                />
                
                {/* Tooltip on hover */}
                {hovered === c.id && c.answers && c.answers.length > 0 && (
                  <foreignObject x={c.cx - 80} y={c.cy - 50} width="160" height="100">
                    <div className="bg-white rounded-lg shadow-xl p-2 text-center border-2" style={{ borderColor: c.color }}>
                      <p className="text-xs font-medium text-gray-800">
                        {c.answers.slice(0, 2).join(', ')}
                        {c.answers.length > 2 && '...'}
                      </p>
                    </div>
                  </foreignObject>
                )}
              </g>
            ))}
            
            {/* Center circle */}
            <circle cx="200" cy="185" r="52" fill="white" stroke="#64CDD1" strokeWidth="2.5" strokeOpacity="0.8" />
            <text x="200" y="175" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0A3948" letterSpacing="2">
              IKIGAI
            </text>
            <text x="200" y="195" textAnchor="middle" fontSize="8" fill="#5794A4" fontWeight="500">
              Your Purpose
            </text>
            
            {/* Labels */}
            <text x="200" y="108" textAnchor="middle" fontSize="8" fontWeight="700" fill="#5794A4">
              Passion
            </text>
            <text x="104" y="188" textAnchor="middle" fontSize="8" fontWeight="700" fill="#5794A4">
              Mission
            </text>
            <text x="296" y="188" textAnchor="middle" fontSize="8" fontWeight="700" fill="#5794A4">
              Vocation
            </text>
            <text x="200" y="275" textAnchor="middle" fontSize="8" fontWeight="700" fill="#5794A4">
              Profession
            </text>
          </svg>
        </div>
      </motion.div>
      
      {/* Overlaps Section - New */}
      {ikigaiSuggestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <h3 className="font-semibold text-tiber">Your Ikigai Discovery</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Passion */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <h4 className="font-semibold text-pink-700 text-sm">Passion</h4>
                <span className="text-xs text-gray-400">(Love ∩ Skills)</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{ikigaiSuggestion.passion.description}</p>
              {ikigaiSuggestion.passion.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {ikigaiSuggestion.passion.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full">{kw}</span>
                  ))}
                </div>
              )}
              <p className="text-[11px] text-gray-500 italic">{ikigaiSuggestion.passion.suggestion}</p>
            </div>
            
            {/* Profession */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-yellow-600" />
                <h4 className="font-semibold text-yellow-700 text-sm">Profession</h4>
                <span className="text-xs text-gray-400">(Skills ∩ Money)</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{ikigaiSuggestion.profession.description}</p>
              {ikigaiSuggestion.profession.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {ikigaiSuggestion.profession.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full">{kw}</span>
                  ))}
                </div>
              )}
              <p className="text-[11px] text-gray-500 italic">{ikigaiSuggestion.profession.suggestion}</p>
            </div>
            
            {/* Vocation */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                <h4 className="font-semibold text-emerald-700 text-sm">Vocation</h4>
                <span className="text-xs text-gray-400">(Money ∩ Need)</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{ikigaiSuggestion.vocation.description}</p>
              {ikigaiSuggestion.vocation.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {ikigaiSuggestion.vocation.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full">{kw}</span>
                  ))}
                </div>
              )}
              <p className="text-[11px] text-gray-500 italic">{ikigaiSuggestion.vocation.suggestion}</p>
            </div>
            
            {/* Mission */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-600" />
                <h4 className="font-semibold text-purple-700 text-sm">Mission</h4>
                <span className="text-xs text-gray-400">(Need ∩ Love)</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{ikigaiSuggestion.mission.description}</p>
              {ikigaiSuggestion.mission.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {ikigaiSuggestion.mission.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">{kw}</span>
                  ))}
                </div>
              )}
              <p className="text-[11px] text-gray-500 italic">{ikigaiSuggestion.mission.suggestion}</p>
            </div>
          </div>
          
          {/* Ikigai Section */}
          {ikigaiSuggestion.ikigai.keywords.length > 0 && (
            <div className="mt-4 p-4 bg-gradient-to-r from-downy/20 to-horizon/20 rounded-xl text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Compass className="w-5 h-5 text-downy" />
                <h4 className="font-bold text-tiber">Your True Ikigai</h4>
              </div>
              <div className="flex flex-wrap gap-1 justify-center mb-2">
                {ikigaiSuggestion.ikigai.keywords.map((kw, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-white text-downy rounded-full font-medium shadow-sm">{kw}</span>
                ))}
              </div>
              <p className="text-sm text-gray-700">{ikigaiSuggestion.ikigai.suggestion}</p>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="font-semibold text-tiber mb-3">Your Ikigai Summary</h3>
        <p className="text-gray-700 leading-relaxed mb-4">{summary}</p>
        
        <div className="border-t border-gray-100 pt-4 mt-2">
          <h4 className="font-medium text-tiber mb-2">Suggested Career Paths</h4>
          <div className="flex flex-wrap gap-2">
            {careerPath && careerPath.map((path, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-1 bg-downy/10 text-downy-dark text-sm rounded-full"
              >
                {path}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Portfolio Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
          <h4 className="font-semibold text-pink-700 text-sm mb-2">🔥 Passion</h4>
          <p className="text-xs text-gray-600">
            {(groupedAnswers?.love || []).slice(0, 2).join(' • ') || 'Exploring your passions...'}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <h4 className="font-semibold text-blue-700 text-sm mb-2">💪 Skills</h4>
          <p className="text-xs text-gray-600">
            {(groupedAnswers?.good || []).slice(0, 2).join(' • ') || 'Discovering your strengths...'}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
          <h4 className="font-semibold text-green-700 text-sm mb-2">🌍 Purpose</h4>
          <p className="text-xs text-gray-600">
            {(groupedAnswers?.need || []).slice(0, 2).join(' • ') || 'Finding your mission...'}
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
          <h4 className="font-semibold text-yellow-700 text-sm mb-2">💰 Career</h4>
          <p className="text-xs text-gray-600">
            {(groupedAnswers?.paid || []).slice(0, 2).join(' • ') || 'Exploring opportunities...'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default IkigaiChart;