// src/components/Profile.jsx
import React from 'react';
import { useIkigai } from '../context/IkigaiContext';
import { User, Calendar, Award, Target, TrendingUp } from 'lucide-react';

const Profile = ({ user }) => {
  const { selectedCategory, completedDays, result, currentDay } = useIkigai();
  
  const stats = [
    { label: 'Journey Status', value: completedDays.length === 6 ? 'Complete' : 'In Progress', icon: Calendar },
    { label: 'Current Day', value: `${currentDay}/6`, icon: Target },
    { label: 'Days Completed', value: `${completedDays.length}/6`, icon: TrendingUp },
    { label: 'Category', value: selectedCategory || 'Not selected', icon: Award }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-horizon to-downy px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user?.name || 'Explorer'}</h1>
              <p className="text-white/80 text-sm">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-tiber mb-4">Your Journey Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                  <Icon className="w-5 h-5 text-downy mx-auto mb-2" />
                  <p className="text-2xl font-bold text-tiber">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Progress Section */}
          {completedDays.length < 6 && selectedCategory && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-tiber mb-2">Continue Your Journey</h3>
              <p className="text-sm text-gray-600 mb-3">
                You're on day {currentDay} of your Ikigai discovery. Keep going to unlock your complete results!
              </p>
              <a
                href="/sevendays"
                className="inline-block px-4 py-2 bg-downy text-white rounded-lg text-sm font-medium hover:bg-downy/80 transition"
              >
                Continue Journey →
              </a>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <h3 className="font-semibold text-tiber mb-2">Your Ikigai Results</h3>
              <p className="text-sm text-gray-600 mb-3">
                {result.summary?.substring(0, 150)}...
              </p>
              <a
                href="/sevendays"
                className="inline-block px-4 py-2 bg-horizon text-white rounded-lg text-sm font-medium hover:bg-horizon/80 transition"
              >
                View Full Results →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;