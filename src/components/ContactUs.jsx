import React, { useState } from 'react';
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
      color: "#0A3948"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9113005830", "+91 9113005830"],
      color: "#5794A4"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Digital Nomad Hub", "Coimbatore, India", "Remote Worldwide"],
      color: "#64CDD1"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM IST", "Saturday: 10:00 AM - 2:00 PM IST", "Sunday: Closed"],
      color: "#0A3948"
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
    <div className="ml-[280px] min-h-screen bg-[#B8E3E6] py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center mb-16 reveal">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5794A4]/20 text-[#0A3948] font-semibold text-sm mb-4">
          <Sparkles size={16} />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0A3948] mb-4">
          Let's <span className="text-[#5794A4]">Connect</span>
        </h1>
        <p className="text-lg text-[#5794A4] max-w-2xl mx-auto">
          Have questions about your journey? Want to collaborate? We'd love to hear from you.
          Our team is here to help you every step of the way.
        </p>
      </section>

      {/* Contact Form and Info Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Contact Information Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#0A3948]">Contact Information</h2>
          <p className="text-[#5794A4] mb-6">
            Reach out to us through any of these channels, and we'll get back to you within 24 hours.
          </p>
          
          <div className="space-y-4">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${info.color}20` }}>
                      <Icon size={24} color={info.color} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A3948] mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-[#5794A4] text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <h3 className="font-bold text-[#0A3948] mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={idx} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-[#5794A4] hover:text-[#0A3948]"
                  >
                    <Icon size={18} />
                    <span className="text-sm">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#0A3948]">Send us a Message</h2>
            <p className="text-[#5794A4] text-sm mt-2">We'd love to hear from you. Fill out the form and we'll respond shortly.</p>
          </div>

          {isSubmitted && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-green-100 text-green-700 border border-green-200">
              <CheckCircle size={18} />
              <span className="text-sm">Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-100 text-red-700 border border-red-200">
              <AlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0A3948] mb-2 flex items-center gap-2">
                  <User size={14} /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#5794A4]/30 rounded-lg focus:outline-none focus:border-[#64CDD1] transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A3948] mb-2 flex items-center gap-2">
                  <Mail size={14} /> Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#5794A4]/30 rounded-lg focus:outline-none focus:border-[#64CDD1] transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A3948] mb-2 flex items-center gap-2">
                <MessageSquare size={14} /> Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#5794A4]/30 rounded-lg focus:outline-none focus:border-[#64CDD1] transition-colors"
                placeholder="What is this regarding?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0A3948] mb-2 flex items-center gap-2">
                <MessageSquare size={14} /> Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-[#5794A4]/30 rounded-lg focus:outline-none focus:border-[#64CDD1] transition-colors resize-none"
                placeholder="Tell us how we can help you..."
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#0A3948] hover:bg-[#64CDD1] text-white font-semibold py-3 rounded-lg transition-all hover:-translate-y-1 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>Sending... <Send size={18} /></>
              ) : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0A3948] mb-4">Frequently Asked Questions</h2>
          <p className="text-[#5794A4]">Find answers to common questions about our platform and services</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <h3 className="font-bold text-[#0A3948] mb-2">{faq.question}</h3>
              <p className="text-[#5794A4] text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>


      {/* CTA Section */}
      <section className="mt-20 text-center bg-gradient-to-r from-[#0A3948] to-[#5794A4] rounded-2xl p-12 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-3">Ready to Start Your Journey?</h3>
        <p className="text-white/90 mb-6">Join our community of digital nomads and start building your dream lifestyle today</p>
        <button className="bg-white text-[#0A3948] hover:bg-[#64CDD1] hover:text-white font-semibold px-8 py-3 rounded-full transition-all hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 mx-auto">
          Start 7-Day Challenge <Sparkles size={18} />
        </button>
      </section>
    </div>
  );
};

export default ContactUs;