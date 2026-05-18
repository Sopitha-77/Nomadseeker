import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Lock, LogOut, Home, Calendar, TrendingUp, Globe, Compass,
  Info, Mail, ChevronDown, Target, User, Menu, X, CheckCircle, Flame,
} from 'lucide-react';
import logo from '../assets/Logo.png';

/* ─── TEAL COLOR PALETTE ────────────────────────────────────── */
const C = {
  darkTeal:   'rgb(20, 68, 71)',
  teal:       'rgb(97, 206, 207)',
  lightTeal:  'rgb(223, 246, 246)',
  mediumTeal: 'rgb(43, 135, 141)',
  white:      '#ffffff',
  gold:       '#FFD700',
};

const G = {
  sidebar: `linear-gradient(135deg, ${C.darkTeal}, ${C.mediumTeal})`,
  accent:  `linear-gradient(90deg, ${C.teal}, ${C.mediumTeal})`,
  gold:    `linear-gradient(90deg, ${C.gold}, #FFA500, #FF8C00)`,
};

/* 7-step journey flow labels shown in the progress panel */
const JOURNEY_STEPS = [
  { day: 1, label: 'Passion' },
  { day: 2, label: 'Lifestyle' },
  { day: 3, label: 'Skills' },
  { day: 4, label: 'Vocation' },
  { day: 5, label: 'Mission' },
  { day: 6, label: 'Vision' },
  { day: 7, label: 'Ikigai 🚀' },
];

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
  const [completedDays, setCompletedDays] = useState([]);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
  }, [propUser]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Read completed days dynamically (re-checks on route change / focus) */
  useEffect(() => {
    const readDays = () => {
      try {
        const d = JSON.parse(localStorage.getItem('ikigai_completed_days') || '[]');
        setCompletedDays(Array.isArray(d) ? d : []);
      } catch {
        setCompletedDays([]);
      }
    };
    readDays();
    window.addEventListener('focus', readDays);
    const iv = setInterval(readDays, 2000);
    return () => {
      window.removeEventListener('focus', readDays);
      clearInterval(iv);
    };
  }, [location.pathname]);

  const completedCount = completedDays.length;
  const totalDays = 7;
  const isUnlocked = completedDays.includes(7) || completedCount >= totalDays;
  // The active/current day is the first not-yet-completed day
  const activeDay = Math.min(completedCount + 1, totalDays);

  const navItems = [
    { id: 'home', path: '/', label: 'Home', icon: Home },
    { id: 'about', path: '/about', label: 'About Us', icon: Info },
    { id: 'contact', path: '/contact', label: 'Contact Us', icon: Mail },
    { id: 'profile', path: '/profile', label: 'Profile', icon: User },
  ];

  const ikigaiItems = [
    { id: 'sevendays', path: '/sevendays', label: '6-Day Discovery', icon: Calendar, description: 'Find your purpose', locked: false },
    { id: 'thirty', path: '/thirty', label: '30-Day Execution', icon: TrendingUp, description: 'Build your business', locked: !isUnlocked },
    { id: 'sixty', path: '/sixty', label: '60-Day Income', icon: Globe, description: 'Generate income', locked: !isUnlocked },
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
    tooltip.textContent = `✨ Complete the 6-Day Discovery first to unlock ${itemLabel}! ✨`;
    tooltip.style.position = 'fixed';
    tooltip.style.zIndex = '1000';
    tooltip.style.background = G.sidebar;
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
    if (names.length >= 2) return `${names[0][0]}${names[1][0]}`.toUpperCase();
    return userName.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          position: 'fixed', top: '16px', right: '16px', zIndex: 1000,
          display: isMobile ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center',
          width: '44px', height: '44px', background: C.white, backdropFilter: 'blur(10px)',
          borderRadius: '12px', border: `1px solid ${C.teal}40`, cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}
      >
        {isMobileMenuOpen ? <X size={22} color={C.mediumTeal} /> : <Menu size={22} color={C.mediumTeal} />}
      </button>

      <nav
        style={{
          position: 'fixed', top: 0, left: 0, width: '280px', height: '100vh', zIndex: 1000,
          boxShadow: '4px 0 24px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column',
          gap: '24px', padding: '24px', transition: 'transform 0.3s ease-in-out',
          transform: isMobile ? (isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
          background: G.sidebar,
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='white' strokeWidth='1'/%3E%3C/svg%3E")`,
        }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>

          <div
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', paddingBottom: '12px', borderBottom: `1px solid rgba(255,255,255,0.2)` }}
            onClick={() => handleNavigation('/')}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={logo}
                alt="Get Founds"
                style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '10px' }}
                onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
              />
            </div>
            <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px', color: C.white }}>
              NomadSeeker
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
                    borderRadius: '12px', border: 'none', cursor: 'pointer', width: '100%',
                    transition: 'all 0.2s ease',
                    background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
                    color: active ? C.white : 'rgba(255,255,255,0.85)',
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <Icon size={20} style={{ color: active ? C.white : 'rgba(255,255,255,0.7)' }} />
                  <span style={{ fontSize: '14px', fontWeight: active ? 600 : 400 }}>{item.label}</span>
                </button>
              );
            })}

            <div style={{ marginTop: '4px' }}>
              <button
                onClick={() => setIsIkigaiOpen(!isIkigaiOpen)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                  padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                  background: isIkigaiOpen ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: isIkigaiOpen ? C.white : 'rgba(255,255,255,0.85)', transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { if (!isIkigaiOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={(e) => { if (!isIkigaiOpen) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Compass size={20} style={{ color: isIkigaiOpen ? C.white : 'rgba(255,255,255,0.7)' }} />
                  <span style={{ fontSize: '14px', fontWeight: isIkigaiOpen ? 600 : 400 }}>Ikigai Journey</span>
                </div>
                <ChevronDown size={16} style={{ transition: 'transform 0.2s ease', transform: isIkigaiOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: 'rgba(255,255,255,0.6)' }} />
              </button>

              {isIkigaiOpen && (
                <div style={{ marginTop: '6px', marginLeft: '36px', display: 'flex', flexDirection: 'column', gap: '4px', animation: 'slideRight 0.2s ease-out forwards' }}>
                  {ikigaiItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    const isLocked = item.locked;
                    const isAnimating = showLockAnimation && lockedItem === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { if (!isLocked) handleNavigation(item.path); }}
                        onMouseEnter={(e) => isLocked && handleLockClick(e, item.id, item.label)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                          padding: '8px 12px', borderRadius: '10px', border: 'none',
                          cursor: isLocked ? 'not-allowed' : 'pointer',
                          background: active && !isLocked ? 'rgba(255,255,255,0.15)' : 'transparent',
                          opacity: isLocked ? 0.6 : 1, transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Icon size={14} style={{ color: active && !isLocked ? C.white : 'rgba(255,255,255,0.6)' }} />
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '12px', fontWeight: active ? 600 : 400, color: C.white }}>{item.label}</div>
                            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>{item.description}</div>
                          </div>
                        </div>
                        {isLocked && (
                          <Lock size={11} style={{ color: C.gold, transition: 'all 0.2s ease', transform: isAnimating ? 'scale(1.1)' : 'scale(1)' }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ─── DYNAMIC JOURNEY PROGRESS PANEL ─── */}
            <div
              style={{
                marginTop: '16px', padding: '16px',
                background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(8px)',
                borderRadius: '14px', border: `1px solid rgba(255,255,255,0.12)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ padding: '5px', background: 'rgba(255,255,255,0.12)', borderRadius: '8px' }}>
                  <Flame size={12} style={{ color: C.gold }} />
                </div>
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>
                  Journey Progress
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: C.white }}>
                  {completedCount > 0 ? `Day ${completedCount} Completed` : 'Not started yet'}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: C.gold }}>
                  {completedCount}/{totalDays} Days
                </span>
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>
                {isUnlocked
                  ? '🎉 Journey complete — all programs unlocked!'
                  : `Currently on Day ${activeDay} · ${
                      (JOURNEY_STEPS.find((s) => s.day === activeDay) || {}).label || ''
                    }`}
              </div>

              <div style={{ height: '7px', background: 'rgba(0,0,0,0.22)', borderRadius: '99px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ height: '100%', width: `${(completedCount / totalDays) * 100}%`, background: G.gold, borderRadius: '99px', transition: 'width 0.7s ease-out' }} />
              </div>

              {/* Step dots with active highlight */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {JOURNEY_STEPS.map((s) => {
                  const done = completedDays.includes(s.day) || s.day < activeDay;
                  const active = s.day === activeDay && !isUnlocked;
                  return (
                    <div key={s.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                      <div
                        style={{
                          width: active ? '18px' : '14px',
                          height: active ? '18px' : '14px',
                          borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '8px', fontWeight: 800,
                          background: done ? G.gold : active ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.12)',
                          border: active ? `2px solid ${C.gold}` : '1px solid rgba(255,255,255,0.18)',
                          color: done ? C.darkTeal : C.white,
                          boxShadow: active ? `0 0 0 4px rgba(255,215,0,0.18)` : 'none',
                          transition: 'all .3s ease',
                        }}
                      >
                        {done ? '✓' : s.day}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <button
              onClick={onLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', border: 'none', background: 'rgba(0,0,0,0.2)', cursor: 'pointer', transition: 'all 0.2s ease', color: C.white }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.2)')}
            >
              <LogOut size="14" style={{ color: C.white }} />
              <span style={{ fontSize: '12px', fontWeight: 500 }}>Logout</span>
            </button>

            <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => handleNavigation('/profile')}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: C.white }}>{userName || 'Nomad'}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.gold }} />
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
                <img src={profilePhoto} alt="Profile" style={{ width: '38px', height: '38px', borderRadius: '50%', border: `2px solid ${C.teal}`, objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: G.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.darkTeal, fontWeight: 700, fontSize: '14px', border: `2px solid ${C.teal}` }}>
                  {getInitials()}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMobile && isMobileMenuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', zIndex: 999, transition: 'opacity 0.3s ease' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style>{`
        @keyframes slideRight { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.5); }
      `}</style>
    </>
  );
};

export default Navbar;