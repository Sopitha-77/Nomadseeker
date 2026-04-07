import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, LogOut, Home, Calendar, TrendingUp, Globe, Compass, Briefcase, Info, Mail, ChevronDown, Target, Zap, Award } from 'lucide-react';
import logo from '../assets/Logo.png';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isIkigaiOpen, setIsIkigaiOpen] = useState(false);
  const [showLockAnimation, setShowLockAnimation] = useState(false);
  const [lockedItem, setLockedItem] = useState(null);

  // Check if user has completed the 7-day challenge to unlock 30 and 60 day programs
  const hasCompletedSevenDays = () => {
    const completedDays = localStorage.getItem('ikigai_completed_days');
    if (completedDays) {
      try {
        const days = JSON.parse(completedDays);
        return days.includes(7);
      } catch {
        return false;
      }
    }
    return false;
  };

  const isUnlocked = hasCompletedSevenDays();

  const navItems = [
    { id: 'home', path: '/', label: 'Home', icon: Home, color: '#5794A4' },
    { id: 'about', path: '/about', label: 'About Us', icon: Info, color: '#5794A4' },
    { id: 'contact', path: '/contact', label: 'Contact Us', icon: Mail, color: '#5794A4' }
  ];

  const ikigaiItems = [
    { id: 'sevendays', path: '/sevendays', label: '7-Day Discovery', icon: Calendar, color: '#64CDD1', description: 'Find your purpose in 7 days', locked: false },
    { id: 'thirty', path: '/thirty', label: '30-Day Execution', icon: TrendingUp, color: '#64CDD1', description: 'Build your business', locked: !isUnlocked },
    { id: 'sixty', path: '/sixty', label: '60-Day Income', icon: Globe, color: '#64CDD1', description: 'Generate income', locked: !isUnlocked }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLockClick = (e, itemId, itemLabel) => {
    e.stopPropagation();
    setLockedItem(itemId);
    setShowLockAnimation(true);
    setTimeout(() => {
      setShowLockAnimation(false);
      setLockedItem(null);
    }, 1000);
    
    // Show tooltip about completing 7-day challenge
    const tooltip = document.createElement('div');
    tooltip.textContent = `✨ Complete the 7-Day Discovery Challenge first to unlock ${itemLabel}! ✨`;
    tooltip.className = 'fixed z-50 bg-gradient-to-r from-[#0A3948] to-[#5794A4] text-white px-4 py-2 rounded-lg text-sm shadow-lg animate-fade-in-out';
    tooltip.style.top = e.clientY - 40 + 'px';
    tooltip.style.left = e.clientX - 150 + 'px';
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 2500);
  };

  const handleNavigation = (path, isLocked = false, e) => {
    if (isLocked) {
      handleLockClick(e, path, path.replace('/', ''));
      return;
    }
    navigate(path);
    setIsIkigaiOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-[280px] h-screen bg-white/80 backdrop-blur-md border-r border-[#5794A4]/20 z-50 shadow-xl flex flex-col gap-8 p-6">
      {/* Logo Section */}
      <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform group" onClick={() => navigate('/')}>
        <div className="relative">
          <img 
            src={logo} 
            alt="NomadSeeker Logo" 
            className="w-10 h-10 object-contain rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              const parent = e.target.parentElement;
              if (parent && !parent.querySelector('.fallback-svg')) {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '32');
                svg.setAttribute('height', '32');
                svg.setAttribute('viewBox', '0 0 24 24');
                svg.setAttribute('fill', 'none');
                svg.setAttribute('stroke', '#0A3948');
                svg.setAttribute('stroke-width', '2');
                svg.classList.add('fallback-svg');
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', '12');
                circle.setAttribute('cy', '12');
                circle.setAttribute('r', '10');
                const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                polygon.setAttribute('points', '16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76');
                svg.appendChild(circle);
                svg.appendChild(polygon);
                parent.appendChild(svg);
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A3948]/20 to-[#5794A4]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-[#0A3948] to-[#5794A4] bg-clip-text text-transparent">NomadSeeker</span>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active 
                  ? 'bg-[#5794A4]/20 text-[#0A3948] border-l-2 border-[#0A3948]' 
                  : 'text-[#5794A4] hover:bg-[#5794A4]/10 hover:translate-x-1'
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Ikigai Chart Dropdown */}
        <div className="relative">
          <button 
            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
              isIkigaiOpen 
                ? 'bg-[#5794A4]/20 text-[#0A3948]' 
                : 'text-[#5794A4] hover:bg-[#5794A4]/10 hover:translate-x-1'
            }`}
            onClick={() => setIsIkigaiOpen(!isIkigaiOpen)}
          >
            <div className="flex items-center gap-3">
              <Compass size={20} />
              <span className="font-medium">Ikigai Journey</span>
            </div>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isIkigaiOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isIkigaiOpen && (
            <div className="mt-2 ml-6 space-y-1 animate-slide-right">
              {ikigaiItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                const isLocked = item.locked;
                const isAnimating = showLockAnimation && lockedItem === item.id;
                
                return (
                  <button
                    key={item.id}
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all group ${
                      active && !isLocked
                        ? 'bg-[#64CDD1]/20 text-[#0A3948]' 
                        : isLocked
                          ? 'text-[#5794A4]/70 cursor-not-allowed hover:bg-transparent'
                          : 'text-[#5794A4] hover:bg-[#64CDD1]/10'
                    }`}
                    onClick={(e) => {
                      if (!isLocked) {
                        navigate(item.path);
                        setIsIkigaiOpen(false);
                      }
                    }}
                    onMouseEnter={(e) => isLocked && handleLockClick(e, item.id, item.label)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <div className="text-left">
                        <span className="text-sm block">{item.label}</span>
                        <span className="text-[10px] text-gray-400">{item.description}</span>
                      </div>
                    </div>
                    {isLocked && (
                      <div className="relative">
                        <Lock 
                          size={14} 
                          className={`transition-all duration-300 ${
                            isAnimating 
                              ? 'animate-shake scale-110' 
                              : 'group-hover:scale-110'
                          }`}
                          style={{
                            color: '#FFD700',
                            filter: 'drop-shadow(0 0 2px rgba(255,215,0,0.5))'
                          }}
                        />
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 animate-ping-slow opacity-0 group-hover:opacity-100 pointer-events-none">
                          <Lock size={14} style={{ color: '#FFD700', filter: 'blur(2px)' }} />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Completion Status Indicator */}
        {!isUnlocked && (
          <div className="mt-4 p-3 bg-gradient-to-r from-[#64CDD1]/10 to-[#5794A4]/10 rounded-xl border border-[#64CDD1]/30">
            <div className="flex items-center gap-2">
              <Target size={14} className="text-[#64CDD1]" />
              <span className="text-[10px] font-medium text-[#0A3948]">Complete 7-Day Challenge to unlock 30 & 60 Day programs</span>
            </div>
            <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#64CDD1] to-[#5794A4] rounded-full w-0 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#5794A4]/20">
        <button 
          onClick={onLogout} 
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0A3948]/10 text-[#0A3948] hover:bg-[#0A3948]/20 transition-all hover:scale-105 active:scale-95"
        >
          <LogOut size={16} />
          <span className="text-sm">Logout</span>
        </button>
        <div className="flex-1">
          <div className="font-semibold text-sm text-[#0A3948]">{user?.name || 'Nomad'}</div>
          <div className="text-xs text-[#5794A4] flex items-center gap-1">
            <Award size={10} />
            <span>{isUnlocked ? 'Champion' : 'Explorer'}</span>
          </div>
        </div>
        <img 
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Nomad')}&background=0A3948&color=fff&bold=true&length=2`} 
          alt="Profile" 
          className="w-10 h-10 rounded-full border-2 border-[#64CDD1] transition-all hover:scale-105 hover:border-[#0A3948]" 
        />
      </div>

      <style jsx>{`
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-right {
          animation: slideRight 0.3s ease-out forwards;
        }
        
        @keyframes shake {
          0%, 100% { 
            transform: translateX(0) rotate(0deg);
          }
          20% { 
            transform: translateX(-2px) rotate(-5deg);
          }
          40% { 
            transform: translateX(2px) rotate(5deg);
          }
          60% { 
            transform: translateX(-1px) rotate(-3deg);
          }
          80% { 
            transform: translateX(1px) rotate(3deg);
          }
        }
        
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          75%, 100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        
        .animate-ping-slow {
          animation: ping-slow 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          15% {
            opacity: 1;
            transform: translateY(0);
          }
          85% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in-out {
          animation: fadeInOut 2.5s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;