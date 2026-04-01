import React, { useState } from 'react';
import Sevendays from './components/Sevendays';
import ThirtyDay from './components/Thirtydays';
import SixtyDay from './components/Sixtydays';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';

import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('ikigai_isLoggedIn');
    return saved === 'true';
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ikigai_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('ikigai_isLoggedIn', 'true');
    localStorage.setItem('ikigai_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setActiveTab('home');
    localStorage.removeItem('ikigai_isLoggedIn');
    localStorage.removeItem('ikigai_user');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#B8E3E6]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />
      <main>
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'about' && <AboutUs />}
        {activeTab === 'contact' && <ContactUs />}
        {activeTab === 'sevendays' && <Sevendays />}
        {activeTab === 'thirty' && <ThirtyDay />}
        {activeTab === 'sixty' && <SixtyDay />}
      </main>
    </div>
  );
}

export default App;