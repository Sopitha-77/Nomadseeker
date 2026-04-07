// src/components/CategorySelection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Code, Compass } from 'lucide-react';

const CategorySelection = ({ isOpen, onSelectCategory, onClose }) => {
  const [selected, setSelected] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const categories = [
    {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      description: 'Build and scale innovative solutions',
      icon: Rocket,
      color: '#64CDD1',
      features: ['Innovation', 'Leadership', 'Risk-taking']
    },
    {
      id: 'managerial',
      title: 'Managerial',
      description: 'Lead teams and optimize operations',
      icon: TrendingUp,
      color: '#5794A4',
      features: ['Strategy', 'Organization', 'Communication']
    },
    {
      id: 'technician',
      title: 'Technician',
      description: 'Master technical skills and execution',
      icon: Code,
      color: '#0A3948',
      features: ['Precision', 'Problem-solving', 'Expertise']
    }
  ];

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selected) {
      setIsConfirming(true);
      setTimeout(() => {
        onSelectCategory(selected);
        setIsConfirming(false);
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-downy to-horizon flex items-center justify-center mx-auto mb-3">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-tiber">Choose Your Path</h2>
            <p className="text-gray-500 text-sm mt-1">
              Select the role that best describes your professional journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selected === category.id;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(category.id)}
                  className={`p-5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'ring-2 shadow-lg'
                      : 'hover:shadow-md border border-gray-100'
                  }`}
                  style={{
                    background: isSelected ? `${category.color}10` : 'white',
                    borderColor: isSelected ? category.color : '#E5E7EB'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: category.color }} />
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: category.color }}>
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {category.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selected || isConfirming}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                selected && !isConfirming
                  ? 'bg-gradient-to-r from-horizon to-downy text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isConfirming ? 'Starting...' : 'Begin Journey'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CategorySelection;