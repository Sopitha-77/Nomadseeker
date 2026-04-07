import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sevendays from './components/Sevendays';
import ThirtyDay from './components/Thirtydays';
import SixtyDay from './components/Sixtydays';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import { IkigaiProvider } from './context/IkigaiContext';


import './index.css';

function App() {
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
    localStorage.removeItem('ikigai_isLoggedIn');
    localStorage.removeItem('ikigai_user');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <IkigaiProvider>
        <div className="min-h-screen bg-[#B8E3E6]">
          <Navbar user={user} onLogout={handleLogout} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/sevendays" element={<Sevendays />} />
              <Route path="/thirty" element={<ThirtyDay />} />
              <Route path="/sixty" element={<SixtyDay />} />
            </Routes>
          </main>
        </div>
      </IkigaiProvider>
    </Router>
  );
}

export default App;