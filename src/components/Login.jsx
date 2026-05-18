import React, { useState, useEffect, useRef } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import logo from '../assets/Logo.png';
import loginBg from '../assets/Login.png';

/* ─── TEAL COLOR PALETTE ─────────────────────────────────────────────── */
const C = {
  lightMint:  'rgb(223, 246, 246)',  // #dff6f6 - Lightest mint teal
  brightTeal: 'rgb(97, 206, 207)',   // #61CECF - Bright mint teal
  mediumTeal: 'rgb(43, 135, 141)',   // #2B878D - Deeper turquoise teal
  darkTeal:   'rgb(20, 68, 71)',     // #144447 - Ultra-dark teal
  white:      '#ffffff',
  white75:    'rgba(255, 255, 255, 0.75)',
  white45:    'rgba(255, 255, 255, 0.45)',
  white40:    'rgba(255, 255, 255, 0.40)',
  white12:    'rgba(255, 255, 255, 0.12)',
  borderWhite: 'rgba(255, 255, 255, 0.6)',
  borderWhite40: 'rgba(255, 255, 255, 0.4)',
  borderTeal: 'rgba(43, 135, 141, 0.25)',
  error:      'rgb(239, 68, 68)',
  success:    'rgb(34, 197, 94)',
};

const G = {
  bg: `linear-gradient(to bottom, ${C.lightMint}, ${C.brightTeal}, ${C.mediumTeal})`,
  btnPrimary: `linear-gradient(to right, ${C.mediumTeal}, ${C.darkTeal})`,
  btnSecondary: `linear-gradient(115deg, ${C.brightTeal}, ${C.mediumTeal})`,
  iconGradient: `linear-gradient(to bottom right, rgba(97, 206, 207, 0.2), rgba(43, 135, 141, 0.2))`,
  cardBg: C.white75,
};

/* ─── Background Image with 30% Blur ─────────────────────────────────── */
function BackgroundImage() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
    }}>
      {/* Blurred Background Image */}
      <img
        src={loginBg}
        alt="Background"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          filter: 'blur(1px)',
          opacity: 0.5,
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      
      {/* Overlay gradient for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${C.lightMint}CC, ${C.brightTeal}99, ${C.mediumTeal}CC)`,
      }} />
    </div>
  );
}

/* ─── Floating particle canvas ─────────────────────────────────────── */
function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { 
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight; 
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => {
      const p = {};
      const reset = () => {
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
        p.r = Math.random() * 1.4 + 0.3;
        p.vx = (Math.random() - 0.5) * 0.25;
        p.vy = -(Math.random() * 0.35 + 0.1);
        p.life = 0;
        p.maxLife = Math.random() * 180 + 80;
        p.opacity = Math.random() * 0.45 + 0.1;
      };
      reset();
      p.reset = reset;
      p.life = Math.random() * p.maxLife;
      return p;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.life++;
        if (p.life > p.maxLife) p.reset();
        p.x += p.vx;
        p.y += p.vy;
        const alpha = p.opacity * Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(43,135,141,${alpha * 0.5})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { 
      cancelAnimationFrame(raf); 
      window.removeEventListener('resize', resize); 
    };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />;
}

/* ─── Single input field ────────────────────────────────────────────── */
function Field({ icon: Icon, label, name, type, value, onChange, error, placeholder, right }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: 'flex', alignItems: 'center', gap: 5,
        fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: focused ? C.mediumTeal : `${C.darkTeal}80`,
        marginBottom: 7, transition: 'color .2s'
      }}>
        <Icon size={10} strokeWidth={2.5} />{label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '11px 14px',
            paddingRight: right ? 44 : 14,
            background: focused ? C.white : C.white75,
            border: `1.5px solid ${error ? C.error : focused ? C.mediumTeal : C.borderWhite}`,
            borderRadius: 10,
            color: C.darkTeal,
            fontSize: 13.5,
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'all .22s ease',
            boxShadow: focused ? `0 0 0 3px ${C.borderTeal}` : 'none',
          }}
        />
        {right && (
          <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
            {right}
          </span>
        )}
      </div>
      {error && (
        <p style={{ fontSize: 11, color: C.error, marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
          <AlertCircle size={10} />{error}
        </p>
      )}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────── */
export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => { 
    const t = setTimeout(() => setMounted(true), 60); 
    return () => clearTimeout(t); 
  }, []);

  const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    const errs = {};

    if (isLogin) {
      if (!form.email) errs.email = 'Email required';
      else if (!validEmail(form.email)) errs.email = 'Invalid email';
      if (!form.password) errs.password = 'Password required';
      
      if (Object.keys(errs).length) { 
        setErrors(errs); 
        return; 
      }
      
      setLoading(true);
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('ns_users') || '[]');
        const user = users.find(u => u.email === form.email && u.password === form.password);
        
        if (user) {
          setSuccess('Welcome back! Redirecting…');
          setTimeout(() => onLogin?.({ name: user.name, email: user.email }), 1100);
        } else {
          setErrors({ submit: 'Invalid email or password.' });
        }
        setLoading(false);
      }, 1100);
      
    } else {
      if (!form.name) errs.name = 'Name required';
      if (!form.email) errs.email = 'Email required';
      else if (!validEmail(form.email)) errs.email = 'Invalid email';
      if (!form.password) errs.password = 'Password required';
      else if (form.password.length < 6) errs.password = 'Min 6 characters';
      if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
      
      if (Object.keys(errs).length) { 
        setErrors(errs); 
        return; 
      }
      
      const users = JSON.parse(localStorage.getItem('ns_users') || '[]');
      if (users.some(u => u.email === form.email)) {
        setErrors({ submit: 'Email already registered.' });
        return;
      }
      
      setLoading(true);
      setTimeout(() => {
        users.push({ 
          name: form.name, 
          email: form.email, 
          password: form.password,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('ns_users', JSON.stringify(users));
        setSuccess('Account created! Please login.');
        setForm({ name: '', email: '', password: '', confirm: '' });
        setTimeout(() => { 
          setIsLogin(true); 
          setSuccess('');
        }, 1800);
        setLoading(false);
      }, 1100);
    }
  };

  const switchMode = () => {
    setIsLogin(v => !v);
    setErrors({});
    setSuccess('');
    setForm({ name: '', email: '', password: '', confirm: '' });
  };

  const pwLen = form.password.length;
  const strength = pwLen === 0 ? 0 : pwLen < 4 ? 1 : pwLen < 7 ? 2 : pwLen < 10 ? 3 : 4;
  const strengthColor = ['transparent', C.error, C.mediumTeal, C.brightTeal, C.success][strength];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,500;0,600;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ns-root {
          min-height: 100vh;
          width: 100%;
          font-family: 'Outfit', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .ns-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 65% 50% at 5% 10%,  rgba(255,255,255,0.4) 0%, transparent 60%),
            radial-gradient(ellipse 55% 60% at 95% 88%,  rgba(43,135,141,0.3) 0%, transparent 58%),
            radial-gradient(ellipse 80% 35% at 50% 102%, ${C.white12} 0%, transparent 55%);
        }
        .ns-bg::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(43,135,141,0.06) 1px, transparent 1px);
          background-size: 26px 26px;
        }

        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(85px); pointer-events: none; z-index: 0;
        }
        .orb-a {
          width: 440px; height: 440px;
          background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
          top: -120px; left: -130px;
          animation: orbDrift 22s ease-in-out infinite;
        }
        .orb-b {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(38,131,141,0.3) 0%, transparent 70%);
          bottom: -90px; right: -90px;
          animation: orbDrift 18s ease-in-out infinite reverse;
        }
        .orb-c {
          width: 280px; height: 280px;
          background: ${C.white12};
          top: 42%; left: 58%;
          animation: orbDrift 26s ease-in-out infinite;
          animation-delay: -9s;
        }

        .ns-panel {
          position: relative; z-index: 5;
          display: none;
          flex-direction: column;
          justify-content: center;
          padding: 0 52px;
          max-width: 400px;
        }
        @media (min-width: 920px) { .ns-panel { display: flex; } }

        .panel-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: ${C.darkTeal}; margin-bottom: 14px;
        }
        .panel-tagline {
          font-family: 'Lora', serif;
          font-size: 34px; font-weight: 600;
          line-height: 1.28; color: ${C.darkTeal};
          letter-spacing: -0.015em;
        }
        .panel-tagline em { font-style: italic; color: ${C.mediumTeal}; }
        .panel-sub {
          margin-top: 16px; font-size: 13.5px; font-weight: 400;
          color: ${C.darkTeal}BF; line-height: 1.75;
        }
        .panel-divider {
          width: 44px; height: 3px; border-radius: 2px;
          background: linear-gradient(90deg, ${C.mediumTeal}, ${C.brightTeal});
          margin: 22px 0;
        }
        .panel-stats { display: flex; gap: 30px; margin-top: 10px; }
        .stat-num {
          font-size: 26px; font-weight: 800; color: ${C.darkTeal}; line-height: 1;
        }
        .stat-label {
          font-size: 10.5px; font-weight: 600; color: ${C.darkTeal}80;
          text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px;
        }

        .ns-card-wrap {
          position: relative; z-index: 10;
          width: 100%; max-width: 384px;
          margin: 20px 16px;
          opacity: 0; transform: translateY(28px) scale(0.975);
          transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1);
        }
        .ns-card-wrap.in { opacity: 1; transform: none; }

        .ns-card-ring {
          position: absolute; inset: -1.5px; border-radius: 22px;
          background: linear-gradient(135deg, ${C.borderTeal}, ${C.brightTeal}40, ${C.borderWhite40});
          z-index: -1; filter: blur(0.5px);
        }

        .ns-card {
          background: ${C.white75};
          backdrop-filter: blur(30px) saturate(1.5);
          border-radius: 20px;
          border: 1px solid ${C.borderWhite};
          padding: 28px 28px 24px;
          box-shadow: 0 20px 56px ${C.darkTeal}1F, 0 4px 14px ${C.darkTeal}0F, 0 1px 0 ${C.white} inset;
          position: relative; overflow: hidden;
        }
        .ns-card::before {
          content: '';
          position: absolute; top: 0; left: 12%; right: 12%; height: 1px;
          background: linear-gradient(90deg, transparent, ${C.mediumTeal}8C, transparent);
        }

        .logo-bar {
          display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
          padding-bottom: 18px;
          border-bottom: 1px solid ${C.borderTeal};
        }
        .logo-img {
          width: 36px; height: 36px; object-fit: contain;
          filter: drop-shadow(0 2px 5px ${C.darkTeal}26);
          animation: logoFloat 4s ease-in-out infinite;
        }
        .logo-name {
          font-size: 17px; font-weight: 800; letter-spacing: -0.02em;
          background: linear-gradient(120deg, ${C.darkTeal} 20%, ${C.mediumTeal} 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .logo-badge {
          margin-left: auto;
          font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: ${C.darkTeal}80;
          border: 1.5px solid ${C.borderTeal};
          border-radius: 20px; padding: 2px 8px;
        }

        .mode-tabs {
          display: flex; background: ${C.white40};
          border-radius: 11px; padding: 3px; gap: 3px;
          margin-bottom: 20px;
        }
        .mode-tab {
          flex: 1; border: none; background: none; cursor: pointer;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
          padding: 9px 0; border-radius: 8px;
          transition: all .25s cubic-bezier(.16,1,.3,1);
          color: ${C.darkTeal}80;
        }
        .mode-tab.active-login {
          background: ${G.btnPrimary};
          color: #ffffff;
          box-shadow: 0 3px 12px ${C.mediumTeal}4D;
        }
        .mode-tab.active-signup {
          background: ${G.btnSecondary};
          color: #ffffff;
          box-shadow: 0 3px 14px ${C.brightTeal}59;
        }
        .mode-tab:not(.active-login):not(.active-signup):hover {
          color: ${C.darkTeal}; background: ${C.white};
        }

        .field-row {
          opacity: 0; transform: translateX(-8px);
          transition: opacity .35s ease, transform .35s ease;
        }
        .ns-card-wrap.in .field-row:nth-child(1) { opacity:1;transform:none;transition-delay:.13s; }
        .ns-card-wrap.in .field-row:nth-child(2) { opacity:1;transform:none;transition-delay:.20s; }
        .ns-card-wrap.in .field-row:nth-child(3) { opacity:1;transform:none;transition-delay:.27s; }
        .ns-card-wrap.in .field-row:nth-child(4) { opacity:1;transform:none;transition-delay:.34s; }
        .ns-card-wrap.in .field-row:nth-child(5) { opacity:1;transform:none;transition-delay:.41s; }

        .strength-wrap { display:flex; gap:4px; margin-top:6px; }
        .strength-seg  { flex:1; height:2.5px; border-radius:2px; transition:background .3s; }

        .btn-primary {
          width:100%; padding:13px 18px; border:none; border-radius:11px;
          background: ${G.btnPrimary};
          color:#fff;
          font-family:'Outfit',sans-serif; font-size:14px; font-weight:700;
          letter-spacing:.04em; cursor:pointer; margin-top:20px;
          display:flex; align-items:center; justify-content:center; gap:8px;
          position:relative; overflow:hidden;
          transition:all .28s cubic-bezier(.16,1,.3,1);
          box-shadow:0 5px 18px ${C.mediumTeal}4D;
        }
        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(to right, ${C.brightTeal}, ${C.mediumTeal});
          box-shadow: 0 8px 26px ${C.brightTeal}61;
          transform:translateY(-2px);
        }
        .btn-primary:active:not(:disabled) { transform:translateY(0); }
        .btn-primary:disabled { opacity:.6; cursor:not-allowed; }

        .btn-signup {
          width:100%; padding:13px 18px; border:none; border-radius:11px;
          background: ${G.btnSecondary};
          color:#fff;
          font-family:'Outfit',sans-serif; font-size:14px; font-weight:700;
          letter-spacing:.04em; cursor:pointer; margin-top:20px;
          display:flex; align-items:center; justify-content:center; gap:8px;
          position:relative; overflow:hidden;
          transition:all .28s cubic-bezier(.16,1,.3,1);
          box-shadow:0 5px 18px ${C.brightTeal}47;
        }
        .btn-signup:hover:not(:disabled) {
          background: linear-gradient(115deg, ${C.mediumTeal}, ${C.darkTeal});
          box-shadow: 0 8px 26px ${C.mediumTeal}4D;
          transform:translateY(-2px);
        }
        .btn-signup:active:not(:disabled) { transform:translateY(0); }
        .btn-signup:disabled { opacity:.6; cursor:not-allowed; }

        .btn-shimmer {
          position:absolute; top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
          transform:skewX(-15deg);
          animation:shimmer 2.8s ease-in-out infinite;
        }

        .spin {
          width:16px; height:16px;
          border:2px solid rgba(255,255,255,0.3); border-top-color:#fff;
          border-radius:50%; animation:rotate .7s linear infinite;
        }

        .alert {
          display:flex; align-items:center; gap:8px;
          padding:10px 13px; border-radius:10px;
          font-size:12.5px; margin-bottom:14px;
          animation:slideDown .25s ease;
        }
        .alert-ok  { background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:${C.success}; }
        .alert-err { background:rgba(239,68,68,0.1);  border:1px solid rgba(239,68,68,0.3); color:${C.error}; }

        .forgot-link {
          text-align:right; margin-top:8px;
          font-size:12px; color:${C.mediumTeal}; cursor:pointer; font-weight:500;
          transition:color .18s;
        }
        .forgot-link:hover { color:${C.darkTeal}; }

        .footer-strip {
          margin-top:18px; padding-top:14px;
          border-top: 1px solid ${C.borderTeal};
          display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .footer-dot  { width:3px; height:3px; border-radius:50%; background:${C.mediumTeal}66; }
        .footer-text { font-size:10.5px; color:${C.darkTeal}80; letter-spacing:.1em; text-transform:uppercase; font-weight:500; }

        .eye-btn {
          background:none; border:none; cursor:pointer;
          color:${C.mediumTeal}; display:flex; align-items:center;
          transition:color .2s;
        }
        .eye-btn:hover { color:${C.darkTeal}; }

        @keyframes orbDrift {
          0%,100%{ transform:translate(0,0) scale(1); }
          33%    { transform:translate(22px,-16px) scale(1.04); }
          66%    { transform:translate(-16px,20px) scale(0.97); }
        }
        @keyframes logoFloat {
          0%,100%{ transform:translateY(0); }
          50%    { transform:translateY(-5px); }
        }
        @keyframes shimmer { 0%{left:-100%} 60%,100%{left:160%} }
        @keyframes rotate  { to{transform:rotate(360deg)} }
        @keyframes slideDown {
          from{opacity:0;transform:translateY(-6px)}
          to  {opacity:1;transform:translateY(0)}
        }

        input::placeholder { color:${C.darkTeal}47; }
        input:-webkit-autofill {
          -webkit-box-shadow:0 0 0 100px rgba(223,246,246,.95) inset !important;
          -webkit-text-fill-color:${C.darkTeal} !important;
        }

        /* Responsive adjustments for mobile */
        @media (max-width: 768px) {
          .ns-card {
            padding: 20px 20px 18px;
          }
          .panel-tagline {
            font-size: 28px;
          }
          .stat-num {
            font-size: 22px;
          }
        }

        @media (max-width: 480px) {
          .ns-card {
            padding: 16px 16px 14px;
          }
          .logo-name {
            font-size: 14px;
          }
          .mode-tab {
            font-size: 12px;
            padding: 7px 0;
          }
          .btn-primary, .btn-signup {
            padding: 11px 14px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="ns-root">
        {/* Background Image with 30% blur */}
        <BackgroundImage />
        
        <div className="ns-bg" />
        <ParticleField />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />

        {/* Left brand panel */}
        <div className="ns-panel">
          <div className="panel-eyebrow">Digital Nomad Platform</div>
          <div className="panel-divider" />
          <h2 className="panel-tagline">
            Your path to<br /><em>location freedom</em><br />starts here.
          </h2>
          <p className="panel-sub">
            NomadSeeker connects digital professionals with remote opportunities, communities, and the tools to thrive — anywhere on the planet.
          </p>
          <div className="panel-stats">
            <div><div className="stat-num">12K+</div><div className="stat-label">Nomads</div></div>
            <div><div className="stat-num">190+</div><div className="stat-label">Countries</div></div>
            <div><div className="stat-num">4.9★</div><div className="stat-label">Rated</div></div>
          </div>
        </div>

        {/* Card */}
        <div className={`ns-card-wrap ${mounted ? 'in' : ''}`}>
          <div className="ns-card-ring" />
          <div className="ns-card">

            {/* Logo */}
            <div className="logo-bar">
              <img
                src={logo}
                alt="NomadSeeker"
                className="logo-img"
                onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
              />
              <span className="logo-name">NomadSeeker</span>
              <span className="logo-badge">Beta</span>
            </div>

            {/* Tabs */}
            <div className="mode-tabs">
              <button
                type="button"
                className={`mode-tab ${isLogin ? 'active-login' : ''}`}
                onClick={() => !isLogin && switchMode()}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`mode-tab ${!isLogin ? 'active-signup' : ''}`}
                onClick={() => isLogin && switchMode()}
              >
                Create Account
              </button>
            </div>

            {/* Alerts */}
            {success && (
              <div className="alert alert-ok">
                <CheckCircle size={13} />{success}
              </div>
            )}
            {errors.submit && (
              <div className="alert alert-err">
                <AlertCircle size={13} />{errors.submit}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {!isLogin && (
                  <div className="field-row">
                    <Field 
                      icon={User} 
                      label="Full Name" 
                      name="name" 
                      type="text"
                      value={form.name} 
                      onChange={handleChange} 
                      error={errors.name}
                      placeholder="Alex Morgan" 
                    />
                  </div>
                )}
                <div className="field-row">
                  <Field 
                    icon={Mail} 
                    label="Email" 
                    name="email" 
                    type="email"
                    value={form.email} 
                    onChange={handleChange} 
                    error={errors.email}
                    placeholder="you@anywhere.com" 
                  />
                </div>
                <div className="field-row">
                  <Field 
                    icon={Lock} 
                    label="Password" 
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    value={form.password} 
                    onChange={handleChange} 
                    error={errors.password}
                    placeholder="••••••••"
                    right={
                      <button type="button" className="eye-btn" onClick={() => setShowPwd(v => !v)}>
                        {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    }
                  />
                  {!isLogin && form.password && (
                    <div className="strength-wrap">
                      {[1,2,3,4].map(i => (
                        <div 
                          key={i} 
                          className="strength-seg"
                          style={{ background: strength >= i ? strengthColor : `${C.brightTeal}80` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {!isLogin && (
                  <div className="field-row">
                    <Field 
                      icon={Lock} 
                      label="Confirm Password" 
                      name="confirm" 
                      type="password"
                      value={form.confirm} 
                      onChange={handleChange} 
                      error={errors.confirm}
                      placeholder="Repeat password" 
                    />
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="forgot-link">Forgot password?</div>
              )}

              {isLogin ? (
                <button type="submit" className="btn-primary" disabled={loading}>
                  <div className="btn-shimmer" />
                  {loading ? <><div className="spin" />Signing in…</> : <>Sign In <ArrowRight size={15} strokeWidth={2.5} /></>}
                </button>
              ) : (
                <button type="submit" className="btn-signup" disabled={loading}>
                  <div className="btn-shimmer" />
                  {loading ? <><div className="spin" />Creating account…</> : <>Get Started <ArrowRight size={15} strokeWidth={2.5} /></>}
                </button>
              )}
            </form>

            <div className="footer-strip">
              <div className="footer-dot" />
              <span className="footer-text">12,000+ nomads · 190+ countries</span>
              <div className="footer-dot" />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}