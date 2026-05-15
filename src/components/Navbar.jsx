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
  const [isMobile, setIsMobile] = useState(false);

  // Colors from the Home page button gradient
  const btnGradient = 'linear-gradient(to right, rgb(43,108,176), rgb(26,54,93))';
  const lightBlue = 'rgb(74,144,226)';
  const darkNavy = 'rgb(26,54,93)';
  const blue = 'rgb(43,108,176)';

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      if (propUser?.name) {
        setUserName(propUser.name);
        setUserEmail(propUser.email || '');
      }
      
      const savedProfile = localStorage.getItem('user_profile');
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          if (profile.profilePhotoUrl) setProfilePhoto(profile.profilePhotoUrl);
          if (profile.firstName && profile.lastName) setUserName(`${profile.firstName} ${profile.lastName}`);
          if (profile.email) setUserEmail(profile.email);
        } catch (e) {}
      }
      
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

  // Check if user has completed the 7-day challenge
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
    { id: 'home', path: '/', label: 'Home', icon: Home },
    { id: 'about', path: '/about', label: 'About Us', icon: Info },
    { id: 'contact', path: '/contact', label: 'Contact Us', icon: Mail },
    { id: 'profile', path: '/profile', label: 'Profile', icon: User }
  ];

  const ikigaiItems = [
    { id: 'sevendays', path: '/sevendays', label: '7-Day Discovery', icon: Calendar, description: 'Find your purpose in 7 days', locked: false },
    { id: 'thirty', path: '/thirty', label: '30-Day Execution', icon: TrendingUp, description: 'Build your business', locked: !isUnlocked },
    { id: 'sixty', path: '/sixty', label: '60-Day Income', icon: Globe, description: 'Generate income', locked: !isUnlocked }
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
    
    const tooltip = document.createElement('div');
    tooltip.textContent = `✨ Complete the 7-Day Discovery Challenge first to unlock ${itemLabel}! ✨`;
    tooltip.style.position = 'fixed';
    tooltip.style.zIndex = '1000';
    tooltip.style.background = btnGradient;
    tooltip.style.color = 'white';
    tooltip.style.padding = '8px 16px';
    tooltip.style.borderRadius = '12px';
    tooltip.style.fontSize = '12px';
    tooltip.style.fontWeight = '600';
    tooltip.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    tooltip.style.top = (e.clientY - 40) + 'px';
    tooltip.style.left = (e.clientX - 180) + 'px';
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

  const completedDaysCount = (() => {
    try {
      return JSON.parse(localStorage.getItem('ikigai_completed_days') || '[]').length;
    } catch {
      return 0;
    }
  })();

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 1000,
          display: isMobile ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: `1px solid ${lightBlue}40`,
          cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}
      >
        {isMobileMenuOpen ? <X size={22} color={blue} /> : <Menu size={22} color={blue} />}
      </button>

      {/* Sidebar Navigation - Using Home page gradient colors */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isMobile ? '280px' : '280px',
          height: '100vh',
          zIndex: 1000,
          boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '24px',
          transition: 'transform 0.3s ease-in-out',
          transform: isMobile ? (isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
          background: btnGradient,
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='white' strokeWidth='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content wrapper */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>

          {/* Logo Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.2)'
            }}
            onClick={() => handleNavigation('/')}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={logo}
                alt="NomadSeeker Logo"
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain',
                  borderRadius: '10px',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                color: '#FFFFFF',
              }}
            >
              NomadSeeker
            </span>
          </div>

          {/* Navigation Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'all 0.2s ease',
                    background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
                    color: active ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icon size={20} style={{ color: active ? '#FFFFFF' : 'rgba(255,255,255,0.7)' }} />
                  <span style={{ fontSize: '14px', fontWeight: active ? 600 : 400 }}>{item.label}</span>
                </button>
              );
            })}

            {/* Ikigai Journey Dropdown */}
            <div style={{ marginTop: '4px' }}>
              <button
                onClick={() => setIsIkigaiOpen(!isIkigaiOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isIkigaiOpen ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: isIkigaiOpen ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isIkigaiOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
                onMouseLeave={(e) => {
                  if (!isIkigaiOpen) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Compass size={20} style={{ color: isIkigaiOpen ? '#FFFFFF' : 'rgba(255,255,255,0.7)' }} />
                  <span style={{ fontSize: '14px', fontWeight: isIkigaiOpen ? 600 : 400 }}>Ikigai Journey</span>
                </div>
                <ChevronDown
                  size={16}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: isIkigaiOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: 'rgba(255,255,255,0.6)'
                  }}
                />
              </button>

              {isIkigaiOpen && (
                <div
                  style={{
                    marginTop: '6px',
                    marginLeft: '36px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    animation: 'slideRight 0.2s ease-out forwards',
                  }}
                >
                  {ikigaiItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    const isLocked = item.locked;
                    const isAnimating = showLockAnimation && lockedItem === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          if (!isLocked) handleNavigation(item.path);
                        }}
                        onMouseEnter={(e) => isLocked && handleLockClick(e, item.id, item.label)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          border: 'none',
                          cursor: isLocked ? 'not-allowed' : 'pointer',
                          background: active && !isLocked ? 'rgba(255,255,255,0.15)' : 'transparent',
                          opacity: isLocked ? 0.6 : 1,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Icon size={14} style={{ color: active && !isLocked ? '#FFFFFF' : 'rgba(255,255,255,0.6)' }} />
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '12px', fontWeight: active ? 600 : 400, color: '#FFFFFF' }}>
                              {item.label}
                            </div>
                            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>{item.description}</div>
                          </div>
                        </div>
                        {isLocked && (
                          <Lock
                            size={11}
                            style={{
                              color: '#FFD700',
                              transition: 'all 0.2s ease',
                              transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Completion Status Indicator */}
            {!isUnlocked && (
              <div
                style={{
                  marginTop: '16px',
                  padding: '12px',
                  background: 'rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Target size={12} style={{ color: '#FFD700' }} />
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                    Complete 7-Day Challenge to unlock 30 & 60 Day programs
                  </span>
                </div>
                <div
                  style={{
                    height: '4px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '99px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '30%',
                      background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                      borderRadius: '99px',
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Journey Progress Card */}
            <div
              style={{
                marginTop: '12px',
                padding: '14px',
                background: 'rgba(0,0,0,0.15)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ padding: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <Flame size={11} style={{ color: '#FFD700' }} />
                </div>
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                  Journey Progress
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF' }}>Ikigai Discovery</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#FFD700' }}>{completedDaysCount}/6 Days</span>
              </div>
              <div
                style={{
                  height: '6px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '99px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(completedDaysCount / 6) * 100}%`,
                    background: 'linear-gradient(90deg, #FFD700, #FFA500, #FF8C00)',
                    borderRadius: '99px',
                    transition: 'width 0.7s ease-out',
                  }}
                />
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <button
              onClick={onLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: '#FFFFFF',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.2)')}
            >
              <LogOut size="14" style={{ color: '#FFFFFF' }} />
              <span style={{ fontSize: '12px', fontWeight: 500 }}>Logout</span>
            </button>

            <div
              style={{ flex: 1, cursor: 'pointer' }}
              onClick={() => handleNavigation('/profile')}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>{userName || 'Nomad'}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFD700' }} />
                <span>{isUnlocked ? 'Champion' : 'Explorer'}</span>
              </div>
            </div>

            <div
              onClick={() => handleNavigation('/profile')}
              style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.5)',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: darkNavy,
                    fontWeight: 700,
                    fontSize: '14px',
                    border: '2px solid rgba(255,255,255,0.5)',
                  }}
                >
                  {getInitials()}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            transition: 'opacity 0.3s ease',
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style>{`
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
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-2px) rotate(-6deg); }
          40% { transform: translateX(2px) rotate(6deg); }
          60% { transform: translateX(-1px) rotate(-3deg); }
          80% { transform: translateX(1px) rotate(3deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-slide-right {
          animation: slideRight 0.2s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Custom scrollbar for sidebar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5);
        }
      `}</style>
    </>
  );
};

export default Navbar;