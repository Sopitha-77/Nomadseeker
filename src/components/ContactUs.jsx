import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, User, MessageSquare, 
  Clock, Globe, CheckCircle, AlertCircle, Sparkles
} from 'lucide-react';

import { 
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube 
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate form submission
    setTimeout(() => {
      if (formData.name && formData.email && formData.message) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError('Please fill in all required fields');
      }
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@getfounds.net", "support@getfounds.net"],
      color: "#2B6CB0"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9113005830", "+91 9113005830"],
      color: "#3182CE"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Digital Nomad Hub", "Coimbatore, India", "Remote Worldwide"],
      color: "#4299E1"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM IST", "Sat: 10:00 AM - 2:00 PM IST", "Sunday: Closed"],
      color: "#2B6CB0"
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, name: "Facebook", link: "https://www.facebook.com/getfounds/", color: "#1877f2" },
    { icon: FaTwitter, name: "Twitter", link: "https://x.com/Getfounds", color: "#1da1f2" },
    { icon: FaLinkedin, name: "LinkedIn", link: "https://www.linkedin.com/company/getfounds/", color: "#0a66c2" },
    { icon: FaInstagram, name: "Instagram", link: "https://www.instagram.com/getfoundstechnologies/", color: "#e4405f" },
    { icon: FaYoutube, name: "YouTube", link: "https://youtube.com/@getfounds", color: "#ff0000" }
  ];

  const faqs = [
    {
      question: "How can I join the NomadSeeker community?",
      answer: "Simply sign up for free on our platform, complete the 7-Day Discovery Challenge, and you'll gain access to our global community of digital nomads."
    },
    {
      question: "Do I need to be an experienced digital nomad?",
      answer: "Not at all! Our platform is designed for everyone - from those just starting their journey to experienced nomads looking to scale their business."
    },
    {
      question: "What support do you offer?",
      answer: "We offer workshops, mentorship programs, networking events, and a supportive community to help you at every stage of your journey."
    },
    {
      question: "Is there a cost to use the platform?",
      answer: "Basic membership is free! We offer premium features and programs for those ready to take their business to the next level."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Sidebar spacer - hidden on mobile, shows on desktop */}
      <div className="md:ml-[280px]">
        
        {/* Gradient Background - Matching Profile & AboutUs pages */}
        <div className="fixed inset-0 z-0">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgb(214,239,255), rgb(185,226,255), rgb(74,144,226))'
            }}
          />
          {/* Animated Background Blobs */}
          <div 
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(43,108,176,0.4) 0%, transparent 70%)'
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div 
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border shadow-sm mb-4"
              style={{
                background: 'rgba(255,255,255,0.4)',
                borderColor: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Sparkles size={16} style={{ color: 'rgb(43,108,176)' }} />
              <span className="text-xs sm:text-sm font-medium" style={{ color: 'rgb(26,54,93)' }}>Get in Touch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgb(26,54,93)' }}>
              Let's <span style={{ color: 'rgb(43,108,176)' }}>Connect</span>
            </h1>
            <p className="text-base sm:text-lg px-4 max-w-2xl mx-auto" style={{ color: 'rgba(26,54,93,0.8)' }}>
              Have questions about your journey? Want to collaborate? We'd love to hear from you.
              Our team is here to help you every step of the way.
            </p>
          </motion.section>

          {/* Contact Form and Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            
            {/* Contact Information Cards */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: 'rgb(26,54,93)' }}>Contact Information</h2>
              <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(26,54,93,0.7)' }}>
                Reach out to us through any of these channels, and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="rounded-xl p-4 sm:p-5 shadow-md transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.8)',
                        borderColor: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(20px)'
                      }}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${info.color}20` }}
                        >
                          <Icon size={20} sm:size={24} color={info.color} />
                        </div>
                        <div>
                          <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2" style={{ color: 'rgb(26,54,93)' }}>{info.title}</h3>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-xs sm:text-sm" style={{ color: 'rgba(26,54,93,0.7)' }}>{detail}</p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-bold text-base sm:text-lg mb-4" style={{ color: 'rgb(26,54,93)' }}>Follow Us</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <motion.a 
                        key={idx} 
                        href={social.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg shadow-sm transition-all text-sm sm:text-base"
                        style={{
                          background: 'rgba(255,255,255,0.8)',
                          backdropFilter: 'blur(20px)',
                          color: 'rgb(43,108,176)'
                        }}
                      >
                        <Icon size={16} sm:size={18} />
                        <span className="hidden sm:inline">{social.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-6 sm:p-8 shadow-xl"
              style={{
                background: 'rgba(255,255,255,0.8)',
                borderColor: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'rgb(26,54,93)' }}>Send us a Message</h2>
                <p className="text-xs sm:text-sm mt-2" style={{ color: 'rgba(26,54,93,0.7)' }}>We'd love to hear from you. Fill out the form and we'll respond shortly.</p>
              </div>

              {isSubmitted && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-green-100/80 backdrop-blur-sm border border-green-200">
                  <CheckCircle size={18} className="text-green-700" />
                  <span className="text-sm text-green-700">Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-100/80 backdrop-blur-sm border border-red-200">
                  <AlertCircle size={18} className="text-red-700" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'rgb(26,54,93)' }}>
                      <User size={14} /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base"
                      style={{
                        background: 'rgba(255,255,255,0.5)',
                        borderColor: 'rgba(74,144,226,0.4)',
                        color: 'rgb(26,54,93)'
                      }}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'rgb(26,54,93)' }}>
                      <Mail size={14} /> Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base"
                      style={{
                        background: 'rgba(255,255,255,0.5)',
                        borderColor: 'rgba(74,144,226,0.4)',
                        color: 'rgb(26,54,93)'
                      }}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'rgb(26,54,93)' }}>
                    <MessageSquare size={14} /> Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base"
                    style={{
                      background: 'rgba(255,255,255,0.5)',
                      borderColor: 'rgba(74,144,226,0.4)',
                      color: 'rgb(26,54,93)'
                    }}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'rgb(26,54,93)' }}>
                    <MessageSquare size={14} /> Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-3 sm:px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.5)',
                      borderColor: 'rgba(74,144,226,0.4)',
                      color: 'rgb(26,54,93)'
                    }}
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  whileHover={{ y: -2 }}
                  className="w-full font-semibold py-3 rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                  style={{
                    background: 'linear-gradient(to right, rgb(43,108,176), rgb(26,54,93))',
                    color: 'white'
                  }}
                >
                  {isSubmitting ? (
                    <>Sending... <Send size={18} /></>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <section className="mt-16 sm:mt-20 max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: 'rgb(26,54,93)' }}>Frequently Asked Questions</h2>
              <p className="text-sm sm:text-base px-4" style={{ color: 'rgba(26,54,93,0.7)' }}>Find answers to common questions about our platform and services</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {faqs.map((faq, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl p-5 sm:p-6 shadow-md transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    borderColor: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: 'rgb(26,54,93)' }}>{faq.question}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'rgba(26,54,93,0.7)' }}>{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 sm:mt-20 text-center rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto shadow-xl mx-4 sm:mx-auto"
            style={{
              background: 'linear-gradient(to right, rgb(26,54,93), rgb(43,108,176))'
            }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Start Your Journey?</h3>
            <p className="text-white/90 text-sm sm:text-base mb-6 px-4">Join our community of digital nomads and start building your dream lifestyle today</p>
            <motion.button 
              whileHover={{ y: -2 }}
              className="bg-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all shadow-lg flex items-center justify-center gap-2 mx-auto text-sm sm:text-base"
              style={{ color: 'rgb(26,54,93)' }}
            >
              Start 7-Day Challenge <Sparkles size={16} sm:size={18} />
            </motion.button>
          </motion.section>

          {/* Footer */}
          <footer className="relative z-10 mt-16 sm:mt-20 py-8 sm:py-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'rgb(43,108,176)' }} />
                <span className="font-bold text-lg sm:text-xl tracking-tight" style={{ color: 'rgb(26,54,93)' }}>
                  Nomads<span style={{ color: 'rgb(43,108,176)' }}>Advisors</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-center" style={{ color: 'rgba(26,54,93,0.6)' }}>
                Built by Get Founds Technologies © {new Date().getFullYear()}
              </p>
              <div className="flex gap-4 sm:gap-6">
                <a href="#" className="text-xs sm:text-sm transition-colors" style={{ color: 'rgba(26,54,93,0.6)' }}>Privacy</a>
                <a href="#" className="text-xs sm:text-sm transition-colors" style={{ color: 'rgba(26,54,93,0.6)' }}>Terms</a>
                <a href="#" className="text-xs sm:text-sm transition-colors" style={{ color: 'rgba(26,54,93,0.6)' }}>Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;