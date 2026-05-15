import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Lock, LogOut, Home, Calendar, TrendingUp, Globe, Compass, 
  Briefcase, Info, Mail, ChevronDown, Target, Zap, Award, 
  User, Settings, Heart, Star, Code, Rocket, Users, Shield,
  Menu, X, ChevronRight, CheckCircle, Flame
} from 'lucide-react';
import logo from '../assets/Logo.png';

const Navbar = ({ user: propUser, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isIkigaiOpen, setIsIkigaiOpen] = useState(false);
  const [showLockAnimation, setShowLockAnimation] = useState(false);
  const [lockedItem, setLockedItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      // Try to get from props first
      if (propUser?.name) {
        setUserName(propUser.name);
        setUserEmail(propUser.email || '');
      }
      
      // Load from profile
      const savedProfile = localStorage.getItem('user_profile');
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          if (profile.profilePhotoUrl) {
            setProfilePhoto(profile.profilePhotoUrl);
          }
          if (profile.firstName && profile.lastName) {
            setUserName(`${profile.firstName} ${profile.lastName}`);
          }
          if (profile.email) {
            setUserEmail(profile.email);
          }
        } catch (e) {}
      }
      
      // Load from ikigai user data
      const userData = localStorage.getItem('ikigai_user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (!userName) setUserName(user.name || '');
          if (!userEmail) setUserEmail(user.email || '');
        } catch (e) {}
      }
    };
    
    loadUserData();
  }, [propUser]);

  // Check if user has completed the 7-day challenge to unlock 30 and 60 day programs
  const hasCompletedSevenDays = () => {
    const completedDays = localStorage.getItem('ikigai_completed_days');
    if (completedDays) {
      try {
        const days = JSON.parse(completedDays);
        return days.includes(7) || days.length === 7;
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
    { id: 'contact', path: '/contact', label: 'Contact Us', icon: Mail, color: '#5794A4' },
    { id: 'profile', path: '/profile', label: 'Profile', icon: User, color: '#5794A4' }
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
    setIsMobileMenuOpen(false);
  };

  const getInitials = () => {
    if (!userName) return 'N';
    const names = userName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return userName.substring(0, 2).toUpperCase();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-[#8BB8D0]/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-[#0A3948]/30"
      >
        {isMobileMenuOpen ? <X size={24} className="text-[#0A3948]" /> : <Menu size={24} className="text-[#0A3948]" />}
      </button>

      {/* Sidebar Navigation - Darker light blue gradient background */}
      <nav className={`fixed top-0 left-0 w-[280px] h-screen 
        overflow-hidden
        z-40 shadow-2xl
        flex flex-col gap-6 p-6 
        transition-transform duration-300 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Darker light blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#A8CDE0]/80 via-[#8BB8D0]/70 to-[#A8CDE0]/80"></div>
        
        {/* Subtle grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="story-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0A3948" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#story-grid)" />
        </svg>

        {/* Content wrapper with higher z-index */}
        <div className="relative z-10 flex flex-col gap-6 h-full">

          {/* Logo Section */}
          <div className="relative flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A3948]/20 to-[#5794A4]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={logo} 
                alt="NomadSeeker Logo" 
                className="relative w-10 h-10 object-contain rounded-lg transition-all duration-300 group-hover:scale-105"
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
            </div>
            <span className="text-xl font-semibold tracking-tight text-[#0A3948]">NomadSeeker</span>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                    active 
                      ? 'bg-[#0A3948]/15 text-[#0A3948] font-medium backdrop-blur-sm' 
                      : 'text-[#2A4A58] hover:text-[#0A3948] hover:bg-white/50'
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon size={20} className={`transition-all duration-200 ${active ? 'text-[#0A3948]' : 'text-[#4A6A78] group-hover:text-[#0A3948]'}`} />
                  <span className="text-[15px] tracking-normal">{item.label}</span>
                </button>
              );
            })}

            {/* Ikigai Journey Dropdown */}
            <div className="relative mt-1">
              <button 
                className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  isIkigaiOpen 
                    ? 'bg-[#0A3948]/15 text-[#0A3948] backdrop-blur-sm' 
                    : 'text-[#2A4A58] hover:text-[#0A3948] hover:bg-white/50'
                }`}
                onClick={() => setIsIkigaiOpen(!isIkigaiOpen)}
              >
                <div className="flex items-center gap-3">
                  <Compass size={20} className={`transition-all duration-200 ${isIkigaiOpen ? 'text-[#0A3948]' : 'text-[#4A6A78]'}`} />
                  <span className="text-[15px] tracking-normal">Ikigai Journey</span>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isIkigaiOpen ? 'rotate-180 text-[#0A3948]' : 'text-[#4A6A78]'}`} />
              </button>
              
              {isIkigaiOpen && (
                <div className="mt-1.5 ml-9 space-y-1 animate-slide-right">
                  {ikigaiItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    const isLocked = item.locked;
                    const isAnimating = showLockAnimation && lockedItem === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all duration-200 group ${
                          active && !isLocked
                            ? 'bg-[#0A3948]/15 text-[#0A3948]' 
                            : isLocked
                              ? 'text-[#8DA3B0]/60 cursor-not-allowed'
                              : 'text-[#2A4A58] hover:text-[#0A3948] hover:bg-white/40'
                        }`}
                        onClick={(e) => {
                          if (!isLocked) {
                            handleNavigation(item.path);
                          }
                        }}
                        onMouseEnter={(e) => isLocked && handleLockClick(e, item.id, item.label)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} className={`transition-all duration-200 ${!isLocked && 'group-hover:text-[#0A3948]'}`} />
                          <div className="text-left">
                            <span className="text-[13px] font-medium block tracking-normal">{item.label}</span>
                            <span className="text-[10px] font-light text-[#4A6A78]">{item.description}</span>
                          </div>
                        </div>
                        {isLocked && (
                          <div className="relative">
                            <Lock 
                              size={12} 
                              className={`transition-all duration-200 ${
                                isAnimating 
                                  ? 'animate-shake scale-110' 
                                  : 'group-hover:scale-105'
                              }`}
                              style={{ color: '#D4AF37' }}
                            />
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
              <div className="mt-6 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-[#0A3948]/20 shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <Target size={13} className="text-[#0A3948]" />
                  <span className="text-[11px] font-medium text-[#2A4A58] tracking-wide">Complete 7-Day Challenge to unlock 30 & 60 Day programs</span>
                </div>
                <div className="mt-2 h-1.5 bg-[#0A3948]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0A3948] to-[#5794A4] rounded-full w-0 animate-pulse" />
                </div>
              </div>
            )}

            {/* Journey Progress Card */}
            <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-[#0A3948]/15 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 rounded-lg bg-[#0A3948]/10">
                  <Flame size={12} className="text-[#0A3948]" />
                </div>
                <span className="text-[10px] font-semibold tracking-wider text-[#4A6A78] uppercase">Journey Progress</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#0A3948]">Ikigai Discovery</span>
                <span className="text-xs font-medium text-[#0A3948]">
                  {localStorage.getItem('ikigai_completed_days') ? JSON.parse(localStorage.getItem('ikigai_completed_days') || '[]').length : 0}/6 Days
                </span>
              </div>
              <div className="h-2 bg-[#0A3948]/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#0A3948] to-[#5794A4] rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${((JSON.parse(localStorage.getItem('ikigai_completed_days') || '[]').length) / 6) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-3 pt-5 border-t border-[#0A3948]/15 mt-auto">
            <button 
              onClick={onLogout} 
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 text-[#0A3948] hover:bg-white/90 transition-all duration-200 group backdrop-blur-sm"
            >
              <LogOut size="16" className="transition-transform duration-200 group-hover:translate-x-0.5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
            
            <div className="flex-1 cursor-pointer" onClick={() => handleNavigation('/profile')}>
              <div className="font-semibold text-sm text-[#0A3948] tracking-tight">{userName || 'Nomad'}</div>
              <div className="text-xs text-[#4A6A78] flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0A3948]" />
                <span>{isUnlocked ? 'Champion' : 'Explorer'}</span>
              </div>
            </div>
            
            <div 
              onClick={() => handleNavigation('/profile')}
              className="cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {profilePhoto ? (
                <div className="relative">
                  <img 
                    src={profilePhoto} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border-2 border-[#0A3948] object-cover shadow-md" 
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                </div>
              ) : (
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0A3948] bg-gradient-to-br from-[#A8CDE0] to-[#8BB8D0] flex items-center justify-center text-[#0A3948] font-semibold shadow-md">
                    {getInitials()}
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Close Button */}
        {isMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-white/70 backdrop-blur-sm z-20"
          >
            <X size={20} className="text-[#0A3948]" />
          </button>
        )}
      </nav>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-slide-right {
          animation: slideRight 0.2s ease-out forwards;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-2px) rotate(-6deg); }
          40% { transform: translateX(2px) rotate(6deg); }
          60% { transform: translateX(-1px) rotate(-3deg); }
          80% { transform: translateX(1px) rotate(3deg); }
        }
        
        .animate-shake {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        
        .animate-fade-in-out {
          animation: fadeInOut 2.5s ease-out forwards;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(10, 57, 72, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(10, 57, 72, 0.2);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(10, 57, 72, 0.3);
        }

        /* Clean typography */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
      `}</style>
    </>
  );
};

export default Navbar;