// src/components/IkigaiResult.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, PartyPopper, RefreshCw, Download, Share2 } from 'lucide-react';
import IkigaiChart from './IkigaiChart';

const IkigaiResult = ({ result, onRestart }) => {
  const handleDownload = () => {
    const data = JSON.stringify(result, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ikigai-result-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Ikigai Discovery',
        text: result?.summary || 'I discovered my Ikigai!',
        url: window.location.href
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Celebration Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-downy/20 to-horizon/20 px-6 py-3 rounded-full mb-4"
        >
          <PartyPopper className="w-5 h-5 text-downy" />
          <span className="text-sm font-medium text-downy">Congratulations!</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-tiber mb-3">
          Your Ikigai Discovery
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Based on your 6-day journey, here's your personalized Ikigai map
        </p>
      </div>

      {/* Ikigai Chart */}
      <IkigaiChart result={result} onDownload={handleDownload} />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="px-6 py-3 bg-gradient-to-r from-horizon to-downy text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Start New Journey
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="px-6 py-3 border-2 border-downy text-downy rounded-xl font-semibold hover:bg-downy hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Report
        </motion.button>

        {navigator.share && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-6 py-3 border-2 border-horizon text-horizon rounded-xl font-semibold hover:bg-horizon hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Results
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default IkigaiResult;