import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Code, Globe, Camera, Save, Edit2, 
  CheckCircle, XCircle, AlertCircle, Upload, Trash2,
  Award, Calendar, Clock, Star, Heart, TrendingUp, 
  Users, Target, Zap, Shield, Lock, Eye, EyeOff, 
  Smartphone, Building, FileText, X, ChevronDown, Plus, 
  Hash, BookOpen, Coffee, Layers, Wifi, Music, PenTool,
  Video, BarChart, Database, Server, Cloud, Cpu,
  Trophy
} from 'lucide-react';
import { useIkigai } from '../context/IkigaiContext';

// Custom LinkedIn Icon
const LinkedInIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom GitHub Icon
const GitHubIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Custom Twitter Icon
const TwitterIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// Professional fields options
const PROFESSIONAL_FIELDS = [
  'Software Development', 'Web Development', 'Mobile Development', 'Data Science',
  'Artificial Intelligence', 'Machine Learning', 'Cloud Computing', 'DevOps',
  'Cybersecurity', 'UI/UX Design', 'Product Management', 'Project Management',
  'Digital Marketing', 'Content Creation', 'Business Development', 'Sales',
  'Human Resources', 'Finance', 'Accounting', 'Legal', 'Healthcare',
  'Education', 'Consulting', 'Entrepreneurship', 'Research', 'Writing',
  'Design', 'Photography', 'Video Editing', 'Animation', 'Gaming',
  'E-commerce', 'Customer Support', 'Administration', 'Operations',
  'Other'
];

// Default skills options
const DEFAULT_SKILLS_OPTIONS = [
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'TypeScript',
  'HTML/CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
  'Kubernetes', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator',
  'SEO', 'Content Writing', 'Social Media Management', 'Project Management',
  'Agile', 'Scrum', 'Leadership', 'Communication', 'Problem Solving',
  'Critical Thinking', 'Teamwork', 'Creativity', 'Adaptability',
  'Time Management', 'Organization', 'Data Analysis', 'Research',
  'Other'
];

// Gradient Background Component
const GradientBg = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#B8E3E6] via-[#C4E8EB] to-[#DCF2F4]" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#64CDD1]/20 to-transparent rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#5794A4]/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
  </div>
);

// Floating Particles
const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/30"
        style={{
          width: Math.random() * 4 + 2,
          height: Math.random() * 4 + 2,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: Math.random() * 6 + 4,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

// Input Field Component
const InputField = ({ label, icon: Icon, value, onChange, type = "text", placeholder, required, error, disabled, rows }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon size={18} className="text-gray-400" />
          </div>
        )}
        {rows ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} rounded-xl border-2 transition-all duration-200 focus:outline-none resize-none ${
              error 
                ? 'border-red-400 focus:border-red-500 bg-red-50' 
                : 'border-gray-200 focus:border-[#64CDD1] hover:border-[#64CDD1]/50'
            } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            disabled={disabled}
          />
        ) : (
          <>
            <input
              type={isPassword && showPassword ? 'text' : type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} ${isPassword ? 'pr-10' : ''} rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                error 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-[#64CDD1] hover:border-[#64CDD1]/50'
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
              disabled={disabled}
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

// Multi-Select Component with Custom Option
const MultiSelect = ({ label, icon: Icon, options, selected, onChange, placeholder, allowCustom = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (option) => {
    if (option === 'Other' && allowCustom) {
      setShowCustomInput(true);
      return;
    }
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const addCustomSkill = () => {
    if (customValue.trim() && !selected.includes(customValue.trim())) {
      onChange([...selected, customValue.trim()]);
      setCustomValue('');
      setShowCustomInput(false);
      setIsOpen(false);
    }
  };

  const removeOption = (option) => {
    onChange(selected.filter(s => s !== option));
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-3 z-10">
            <Icon size={18} className="text-gray-400" />
          </div>
        )}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} rounded-xl border-2 border-gray-200 transition-all duration-200 cursor-pointer hover:border-[#64CDD1]/50 min-h-[50px] flex flex-wrap gap-2 items-center`}
        >
          {selected.length > 0 ? (
            selected.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#64CDD1]/20 to-[#5794A4]/20 text-[#0A3948] text-sm rounded-full"
              >
                {skill}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(skill);
                  }}
                  className="hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder || 'Select options'}</span>
          )}
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-20 w-full mt-2 bg-white rounded-xl border border-gray-200 shadow-xl max-h-80 overflow-hidden"
            >
              <div className="p-2 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#64CDD1]"
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => toggleOption(option)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      selected.includes(option) ? 'bg-[#64CDD1]/10' : ''
                    }`}
                  >
                    <span>{option}</span>
                    {selected.includes(option) && <CheckCircle size={16} className="text-[#64CDD1]" />}
                  </button>
                ))}
                {filteredOptions.length === 0 && !showCustomInput && (
                  <div className="px-4 py-3 text-gray-400 text-center">No options found</div>
                )}
              </div>
              {showCustomInput && (
                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      placeholder="Enter your skill..."
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#64CDD1]"
                      autoFocus
                      onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                    />
                    <button
                      onClick={addCustomSkill}
                      className="px-3 py-2 bg-gradient-to-r from-[#5794A4] to-[#64CDD1] text-white rounded-lg hover:shadow-md transition-all"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}
              {allowCustom && !showCustomInput && (
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={() => setShowCustomInput(true)}
                    className="w-full text-left px-3 py-2 text-[#5794A4] hover:bg-gray-50 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add custom skill...</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Image Upload Component
const ImageUpload = ({ imageUrl, onImageChange, label }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div
        className={`relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 transition-all duration-200 ${
          dragActive ? 'border-[#64CDD1] scale-105' : 'border-gray-200'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#64CDD1]/20 to-[#5794A4]/20 flex items-center justify-center">
            <User size={40} className="text-gray-400" />
          </div>
        )}
        <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
          <Camera size={24} className="text-white" />
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">Drag & drop or click to upload</p>
    </div>
  );
};

// Section Divider Component
const SectionDivider = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#64CDD1] to-[#5794A4] flex items-center justify-center">
      <Icon size={16} className="text-white" />
    </div>
    <h2 className="text-xl font-bold text-[#0A3948]">{title}</h2>
    <div className="flex-1 h-px bg-gradient-to-r from-[#64CDD1]/30 to-transparent" />
  </div>
);

// Main Profile Component
const Profile = () => {
  const navigate = useNavigate();
  const { selectedCategory } = useIkigai();
  
  // Load saved profile from localStorage
  const loadSavedProfile = () => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Load from login data
    const userData = localStorage.getItem('ikigai_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return { firstName: user.name?.split(' ')[0] || '', lastName: user.name?.split(' ')[1] || '', email: user.email || '' };
      } catch {
        return {};
      }
    }
    return {};
  };

  const [isEditing, setIsEditing] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    age: '',
    profession: '',
    skills: [],
    email: '',
    college: '',
    location: '',
    linkedinUrl: '',
    portfolioUrl: '',
    profilePhoto: null,
    profilePhotoUrl: '',
    designation: '',
    interestedFields: [],
    phone: '',
    bio: '',
    githubUrl: '',
    twitterUrl: '',
    experience: '',
    education: '',
    achievements: ''
  });

  useEffect(() => {
    const saved = loadSavedProfile();
    setProfile(prev => ({ ...prev, ...saved }));
  }, []);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePhoto: file, profilePhotoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.firstName) newErrors.firstName = 'First name is required';
    if (!profile.lastName) newErrors.lastName = 'Last name is required';
    if (!profile.email) newErrors.email = 'Email is required';
    if (profile.email && !/^\S+@\S+\.\S+$/.test(profile.email)) newErrors.email = 'Invalid email format';
    if (profile.linkedinUrl && !/^https?:\/\/(www\.)?linkedin\.com\/.*/.test(profile.linkedinUrl)) {
      newErrors.linkedinUrl = 'Invalid LinkedIn URL';
    }
    if (profile.portfolioUrl && !/^https?:\/\/(www\.)?.*\..*/.test(profile.portfolioUrl)) {
      newErrors.portfolioUrl = 'Invalid URL format';
    }
    if (profile.age && (profile.age < 16 || profile.age > 100)) newErrors.age = 'Age must be between 16 and 100';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    // Save to localStorage
    localStorage.setItem('user_profile', JSON.stringify(profile));
    
    // Update user data in localStorage for navbar
    const userData = {
      name: `${profile.firstName} ${profile.lastName}`,
      email: profile.email,
      profilePhoto: profile.profilePhotoUrl,
      profession: profile.profession
    };
    localStorage.setItem('ikigai_user', JSON.stringify(userData));
    
    setShowSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    const saved = loadSavedProfile();
    setProfile(prev => ({ ...prev, ...saved }));
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen relative" style={{ marginLeft: 280 }}>
      <GradientBg />
      <FloatingParticles />

      {/* Success Toast */}
      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl text-sm font-semibold shadow-xl text-white flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
          >
            <CheckCircle size={16} /> Profile saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-[#0A3948]">Your Profile</h1>
              <p className="text-gray-500 mt-1">Manage your personal information and preferences</p>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#5794A4] to-[#64CDD1] text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Edit2 size={16} /> Edit Profile
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancel}
                    className="px-5 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#5794A4] to-[#64CDD1] text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Save size={16} /> Save Changes
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Photo & Basic Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50"
            >
              <ImageUpload
                imageUrl={profile.profilePhotoUrl}
                onImageChange={handleImageChange}
                label="Profile Photo"
              />
              
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-[#0A3948]">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-gray-500 text-sm">{profile.designation || 'Add your designation'}</p>
                {selectedCategory && (
                  <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-[#64CDD1]/20 to-[#5794A4]/20 text-[#0A3948] text-xs rounded-full">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Path
                  </span>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-3">Contact Info</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-gray-600">{profile.email || 'Not set'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-gray-600">{profile.phone || 'Not set'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-gray-600">{profile.location || 'Not set'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-3">Social Links</h4>
                <div className="space-y-2">
                  {profile.linkedinUrl && (
                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#0077B5] hover:underline">
                      <LinkedInIcon size={16} /> LinkedIn Profile
                    </a>
                  )}
                  {profile.githubUrl && (
                    <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-700 hover:underline">
                      <GitHubIcon size={16} /> GitHub Profile
                    </a>
                  )}
                  {profile.twitterUrl && (
                    <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#1DA1F2] hover:underline">
                      <TwitterIcon size={16} /> Twitter Profile
                    </a>
                  )}
                  {profile.portfolioUrl && (
                    <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#5794A4] hover:underline">
                      <Globe size={16} /> Portfolio Website
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50"
            >
              <SectionDivider title="Personal Information" icon={User} />
              <div className="grid md:grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  icon={User}
                  value={profile.firstName}
                  onChange={(v) => handleInputChange('firstName', v)}
                  placeholder="Enter first name"
                  required
                  error={errors.firstName}
                  disabled={!isEditing}
                />
                <InputField
                  label="Last Name"
                  icon={User}
                  value={profile.lastName}
                  onChange={(v) => handleInputChange('lastName', v)}
                  placeholder="Enter last name"
                  required
                  error={errors.lastName}
                  disabled={!isEditing}
                />
                <InputField
                  label="Email"
                  icon={Mail}
                  type="email"
                  value={profile.email}
                  onChange={(v) => handleInputChange('email', v)}
                  placeholder="Enter email address"
                  required
                  error={errors.email}
                  disabled={!isEditing}
                />
                <InputField
                  label="Phone Number"
                  icon={Phone}
                  value={profile.phone}
                  onChange={(v) => handleInputChange('phone', v)}
                  placeholder="Enter phone number"
                  disabled={!isEditing}
                />
                <InputField
                  label="Age"
                  icon={Calendar}
                  type="number"
                  value={profile.age}
                  onChange={(v) => handleInputChange('age', v)}
                  placeholder="Enter age"
                  error={errors.age}
                  disabled={!isEditing}
                />
                <InputField
                  label="Location"
                  icon={MapPin}
                  value={profile.location}
                  onChange={(v) => handleInputChange('location', v)}
                  placeholder="City, Country"
                  disabled={!isEditing}
                />
              </div>
            </motion.div>

            {/* Professional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50"
            >
              <SectionDivider title="Professional Information" icon={Briefcase} />
              <div className="grid md:grid-cols-2 gap-4">
                <InputField
                  label="Profession"
                  icon={Briefcase}
                  value={profile.profession}
                  onChange={(v) => handleInputChange('profession', v)}
                  placeholder="e.g., Software Engineer"
                  disabled={!isEditing}
                />
                <InputField
                  label="Designation / Title"
                  icon={Award}
                  value={profile.designation}
                  onChange={(v) => handleInputChange('designation', v)}
                  placeholder="e.g., Senior Developer"
                  disabled={!isEditing}
                />
                <InputField
                  label="College / University"
                  icon={GraduationCap}
                  value={profile.college}
                  onChange={(v) => handleInputChange('college', v)}
                  placeholder="Enter your college"
                  disabled={!isEditing}
                />
                <InputField
                  label="Years of Experience"
                  icon={Clock}
                  value={profile.experience}
                  onChange={(v) => handleInputChange('experience', v)}
                  placeholder="e.g., 5+ years"
                  disabled={!isEditing}
                />
              </div>
            </motion.div>

            {/* Skills & Interests - With Custom Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50"
            >
              <SectionDivider title="Skills & Interests" icon={Code} />
              
              <MultiSelect
                label="Skills"
                icon={Code}
                options={DEFAULT_SKILLS_OPTIONS}
                selected={profile.skills}
                onChange={(v) => handleInputChange('skills', v)}
                placeholder="Select your skills (you can also add custom skills)"
                allowCustom={true}
              />
              
              <MultiSelect
                label="Interested Fields"
                icon={Target}
                options={PROFESSIONAL_FIELDS}
                selected={profile.interestedFields}
                onChange={(v) => handleInputChange('interestedFields', v)}
                placeholder="Select fields you're interested in"
                allowCustom={true}
              />
            </motion.div>

            {/* Bio & Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50"
            >
              <SectionDivider title="About & Links" icon={FileText} />
              
              <InputField
                label="Bio / About Me"
                icon={User}
                value={profile.bio}
                onChange={(v) => handleInputChange('bio', v)}
                placeholder="Tell us about yourself..."
                rows={4}
                disabled={!isEditing}
              />
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <InputField
                  label="LinkedIn URL"
                  icon={LinkedInIcon}
                  value={profile.linkedinUrl}
                  onChange={(v) => handleInputChange('linkedinUrl', v)}
                  placeholder="https://linkedin.com/in/username"
                  error={errors.linkedinUrl}
                  disabled={!isEditing}
                />
                <InputField
                  label="GitHub URL"
                  icon={GitHubIcon}
                  value={profile.githubUrl}
                  onChange={(v) => handleInputChange('githubUrl', v)}
                  placeholder="https://github.com/username"
                  disabled={!isEditing}
                />
                <InputField
                  label="Twitter URL"
                  icon={TwitterIcon}
                  value={profile.twitterUrl}
                  onChange={(v) => handleInputChange('twitterUrl', v)}
                  placeholder="https://twitter.com/username"
                  disabled={!isEditing}
                />
                <InputField
                  label="Portfolio URL"
                  icon={Globe}
                  value={profile.portfolioUrl}
                  onChange={(v) => handleInputChange('portfolioUrl', v)}
                  placeholder="https://yourportfolio.com"
                  error={errors.portfolioUrl}
                  disabled={!isEditing}
                />
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50"
            >
              <SectionDivider title="Achievements" icon={Trophy} />
              <InputField
                label="Achievements & Awards"
                icon={Award}
                value={profile.achievements}
                onChange={(v) => handleInputChange('achievements', v)}
                placeholder="List your notable achievements..."
                rows={3}
                disabled={!isEditing}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;