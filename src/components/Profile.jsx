import React, { useState, useRef, useEffect } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const [formData, setFormData] = useState({
    firstName: 'sofi',
    lastName: 'S',
    email: 'sofi07@gmail.com',
    phoneNumber: '8248049435',
    age: '',
    location: '',
    profession: '',
    designation: '',
    college: '',
    yearsOfExperience: '',
    skills: ['JavaScript', 'React', 'UI/UX Design'],
    interestedFields: ['Web Development', 'Product Management'],
    bio: '',
    linkedin: 'https://linkedin.com/in/username',
    github: 'https://github.com/username',
    twitter: 'https://twitter.com/username',
    portfolio: 'https://yourportfolio.com',
    achievements: '',
  });

  const [customSkill, setCustomSkill] = useState('');
  const [customField, setCustomField] = useState('');

  const availableSkills = ['JavaScript', 'React', 'Python', 'Node.js', 'UI/UX Design', 'Project Management', 'Data Analysis', 'Cloud Computing'];
  const availableFields = ['Web Development', 'Mobile Development', 'AI/ML', 'Data Science', 'Cloud Architecture', 'DevOps', 'Product Management', 'Cybersecurity'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !formData.skills.includes(customSkill.trim())) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, customSkill.trim()] }));
      setCustomSkill('');
    }
  };

  const handleFieldToggle = (field) => {
    setFormData((prev) => ({
      ...prev,
      interestedFields: prev.interestedFields.includes(field)
        ? prev.interestedFields.filter((f) => f !== field)
        : [...prev.interestedFields, field],
    }));
  };

  const addCustomField = () => {
    if (customField.trim() && !formData.interestedFields.includes(customField.trim())) {
      setFormData((prev) => ({ ...prev, interestedFields: [...prev.interestedFields, customField.trim()] }));
      setCustomField('');
    }
  };

  const readImage = (file) => {
    if (file && file.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (e) => readImage(e.target.files[0]);
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); readImage(e.dataTransfer.files[0]); };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const C = {
    deep: 'rgb(20, 68, 71)',
    med: 'rgb(43, 135, 141)',
    bright: 'rgb(97, 206, 207)',
  };

  const card = {
    background: 'rgba(255,255,255,0.78)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.65)',
    borderRadius: 22,
    boxShadow: '0 10px 38px rgba(20,68,71,0.08)',
  };
  const section = {
    background: 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.5)',
    borderRadius: 18,
    padding: isMobile ? '20px' : '24px 26px',
    marginBottom: 18,
    transition: 'all .3s ease',
  };
  const h2 = { fontSize: 18, fontWeight: 800, color: C.deep, marginBottom: 16, fontFamily: "'Sora',sans-serif" };
  const label = { display: 'block', fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: 'rgba(20,68,71,0.7)' };
  const input = {
    width: '100%', padding: '12px 16px', border: '1.5px solid rgba(43,135,141,0.22)',
    borderRadius: 12, background: 'rgba(255,255,255,0.7)', fontSize: 14, color: C.deep,
    outline: 'none', fontFamily: "'Manrope',sans-serif", transition: 'all .25s ease',
  };
  const readField = { padding: '11px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.45)', color: C.deep, fontSize: 14 };
  const btnPrimary = {
    background: `linear-gradient(135deg, ${C.med}, ${C.deep})`, color: '#fff', border: 'none',
    padding: '12px 28px', borderRadius: 40, fontSize: 15, fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(43,135,141,0.35)', fontFamily: "'Sora',sans-serif", transition: 'all .25s ease',
  };
  const btnSecondary = {
    background: 'transparent', border: `2px solid ${C.med}`, color: C.med, padding: '10px 22px',
    borderRadius: 40, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: "'Sora',sans-serif", transition: 'all .25s ease',
  };

  const Field = ({ name, lbl, type = 'text', placeholder }) => (
    <div>
      <label style={label}>{lbl}</label>
      {isEditing ? (
        <input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} style={input}
          onFocus={(e) => { e.target.style.borderColor = C.bright; e.target.style.boxShadow = `0 0 0 3px rgba(97,206,207,0.2)`; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(43,135,141,0.22)'; e.target.style.boxShadow = 'none'; }} />
      ) : (
        <div style={readField}>{formData[name] || 'Not set'}</div>
      )}
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        background: 'linear-gradient(160deg, rgb(223,246,246) 0%, rgb(190,238,239) 45%, rgb(97,206,207) 100%)',
        fontFamily: "'Manrope',sans-serif",
        marginLeft: isMobile ? 0 : 280,
        width: isMobile ? '100%' : 'calc(100% - 280px)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Sora:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
        @keyframes pblob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-24px) scale(1.07)}66%{transform:translate(-20px,28px) scale(0.95)}}
        @keyframes pUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pFade{from{opacity:0}to{opacity:1}}
        .p-sec:hover{background:rgba(255,255,255,0.62)!important;transform:translateY(-2px);box-shadow:0 14px 36px rgba(20,68,71,0.10);}
        .p-tag{transition:all .2s ease;}
        .p-tag:hover{transform:scale(1.04);}
        .p-step{transition:all .3s ease;}
        .p-step:hover{transform:translateY(-5px);box-shadow:0 16px 38px rgba(20,68,71,0.14);}
        .p-btn:hover{transform:translateY(-2px);}
      `}</style>

      {/* animated background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)', animation: 'pblob 22s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(43,135,141,0.35) 0%, transparent 70%)', animation: 'pblob 28s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', top: '40%', left: '40%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(70px)', animation: 'pblob 34s ease-in-out infinite' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 920, margin: '0 auto', padding: isMobile ? '32px 16px 56px' : '48px 24px 72px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32, animation: 'pUp .6s ease both' }}>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: isMobile ? 30 : 42, fontWeight: 700, color: C.deep, marginBottom: 8 }}>
            Your Profile
          </h1>
          <p style={{ color: 'rgba(20,68,71,0.7)', fontSize: 15 }}>
            Manage your personal information and preferences
          </p>
        </div>

        <div style={{ ...card, padding: isMobile ? '22px' : '32px', animation: 'pFade .6s ease both' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 22 }}>
            {!isEditing ? (
              <button className="p-btn" onClick={() => setIsEditing(true)} style={btnSecondary}>✎ Edit Profile</button>
            ) : (
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="p-btn" onClick={() => setIsEditing(false)} style={btnSecondary}>Cancel</button>
                <button className="p-btn" onClick={handleSubmit} style={btnPrimary}>Save Changes</button>
              </div>
            )}
          </div>

          {/* Photo */}
          <div className="p-sec" style={section}>
            <h2 style={h2}>Profile Photo</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                onClick={() => isEditing && fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                  width: 128, height: 128, borderRadius: '50%', overflow: 'hidden',
                  marginBottom: 14, cursor: isEditing ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px dashed rgba(43,135,141,0.35)',
                  background: 'linear-gradient(135deg, rgba(97,206,207,0.22), rgba(43,135,141,0.18))',
                }}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ textAlign: 'center', padding: 12 }}>
                    <div style={{ fontSize: 30, marginBottom: 2 }}>👤</div>
                    <span style={{ fontSize: 11, color: 'rgba(20,68,71,0.6)' }}>Upload</span>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} disabled={!isEditing} />
              </div>
              {isEditing && <p style={{ fontSize: 13, color: 'rgba(20,68,71,0.6)', marginBottom: 8 }}>Drag & drop or click to upload</p>}
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: C.deep }}>
                {formData.firstName} {formData.lastName}
              </h3>
              {formData.designation && <p style={{ color: 'rgba(20,68,71,0.6)', fontSize: 13 }}>{formData.designation}</p>}
            </div>
          </div>

          {/* Contact */}
          <div className="p-sec" style={section}>
            <h2 style={h2}>Contact Info</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.4)' }}>
                <span style={{ fontSize: 16 }}>✉️</span>
                <span style={{ color: 'rgba(20,68,71,0.78)', fontSize: 14 }}>{formData.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.4)' }}>
                <span style={{ fontSize: 16 }}>📞</span>
                <span style={{ color: 'rgba(20,68,71,0.78)', fontSize: 14 }}>{formData.phoneNumber || 'Not set'}</span>
              </div>
            </div>
          </div>

          {/* Personal */}
          <div className="p-sec" style={section}>
            <h2 style={h2}>Personal Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
              <Field name="firstName" lbl="First Name *" />
              <Field name="lastName" lbl="Last Name *" />
              <Field name="email" lbl="Email *" type="email" />
              <Field name="phoneNumber" lbl="Phone Number" type="tel" />
              <Field name="age" lbl="Age" placeholder="Enter age" />
              <Field name="location" lbl="Location" placeholder="City, Country" />
            </div>
          </div>

          {/* Professional */}
          <div className="p-sec" style={section}>
            <h2 style={h2}>Professional Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
              <Field name="profession" lbl="Profession" placeholder="e.g., Software Engineer" />
              <Field name="designation" lbl="Designation / Title" placeholder="e.g., Senior Developer" />
              <Field name="college" lbl="College / University" placeholder="Enter your college" />
              <Field name="yearsOfExperience" lbl="Years of Experience" placeholder="e.g., 5+ years" />
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="p-sec" style={section}>
            <h2 style={h2}>Skills & Interests</h2>
            <div style={{ marginBottom: 22 }}>
              <label style={label}>Skills</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {(isEditing ? availableSkills : formData.skills).map((skill) => {
                  const sel = formData.skills.includes(skill);
                  return (
                    <button key={skill} className="p-tag" onClick={() => isEditing && handleSkillToggle(skill)} disabled={!isEditing}
                      style={{
                        padding: '7px 15px', borderRadius: 30, fontSize: 13, cursor: isEditing ? 'pointer' : 'default',
                        border: 'none', display: 'inline-flex', alignItems: 'center', gap: 7,
                        background: sel ? `linear-gradient(135deg, ${C.bright}, ${C.med})` : 'linear-gradient(135deg, rgba(97,206,207,0.2), rgba(43,135,141,0.2))',
                        color: sel ? '#fff' : C.med, fontWeight: 600, fontFamily: "'Manrope',sans-serif",
                      }}>
                      {skill}{isEditing && sel && ' ✕'}
                    </button>
                  );
                })}
              </div>
              {isEditing && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={customSkill} onChange={(e) => setCustomSkill(e.target.value)} placeholder="Add custom skill..." style={{ ...input, flex: 1 }}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()} />
                  <button onClick={addCustomSkill} style={{ ...btnSecondary, padding: '8px 18px', fontSize: 13 }}>Add</button>
                </div>
              )}
            </div>
            <div>
              <label style={label}>Interested Fields</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {(isEditing ? availableFields : formData.interestedFields).map((field) => {
                  const sel = formData.interestedFields.includes(field);
                  return (
                    <button key={field} className="p-tag" onClick={() => isEditing && handleFieldToggle(field)} disabled={!isEditing}
                      style={{
                        padding: '7px 15px', borderRadius: 30, fontSize: 13, cursor: isEditing ? 'pointer' : 'default',
                        border: 'none', display: 'inline-flex', alignItems: 'center', gap: 7,
                        background: sel ? `linear-gradient(135deg, ${C.bright}, ${C.med})` : 'linear-gradient(135deg, rgba(97,206,207,0.2), rgba(43,135,141,0.2))',
                        color: sel ? '#fff' : C.med, fontWeight: 600, fontFamily: "'Manrope',sans-serif",
                      }}>
                      {field}{isEditing && sel && ' ✕'}
                    </button>
                  );
                })}
              </div>
              {isEditing && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={customField} onChange={(e) => setCustomField(e.target.value)} placeholder="Add custom field..." style={{ ...input, flex: 1 }}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomField()} />
                  <button onClick={addCustomField} style={{ ...btnSecondary, padding: '8px 18px', fontSize: 13 }}>Add</button>
                </div>
              )}
            </div>
          </div>

          {/* About & Links */}
          <div className="p-sec" style={section}>
            <h2 style={h2}>About & Links</h2>
            <div style={{ marginBottom: 16 }}>
              <label style={label}>Bio / About Me</label>
              {isEditing ? (
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} placeholder="Tell us about yourself..." style={{ ...input, resize: 'vertical' }} />
              ) : (
                <div style={readField}>{formData.bio || 'Not set'}</div>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['linkedin', 'github', 'twitter', 'portfolio'].map((p) => (
                <div key={p}>
                  <label style={{ ...label, textTransform: 'capitalize' }}>{p} URL</label>
                  {isEditing ? (
                    <input type="url" name={p} value={formData[p]} onChange={handleChange} placeholder={`https://${p}.com/username`} style={input} />
                  ) : (
                    <a href={formData[p]} target="_blank" rel="noopener noreferrer" style={{ ...readField, display: 'block', color: C.med, textDecoration: 'none' }}>
                      {formData[p] !== 'https://yourportfolio.com' && formData[p] !== 'https://linkedin.com/in/username' ? formData[p] : 'Not set'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="p-sec" style={section}>
            <h2 style={h2}>Achievements</h2>
            {isEditing ? (
              <textarea name="achievements" value={formData.achievements} onChange={handleChange} rows={3} placeholder="List your notable achievements..." style={{ ...input, resize: 'vertical' }} />
            ) : (
              <div style={readField}>{formData.achievements || 'Not set'}</div>
            )}
          </div>

          {/* Journey steps */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 14, marginTop: 24 }}>
            {[
              { n: 1, t: 'Clarity Seeker', d: 'Define your path', bg: 'linear-gradient(135deg, rgba(97,206,207,0.22), rgba(43,135,141,0.12))', dot: C.bright },
              { n: 2, t: 'Income Builder', d: 'Build your career', bg: 'linear-gradient(135deg, rgba(43,135,141,0.25), rgba(223,246,246,0.3))', dot: C.med },
              { n: 3, t: 'Nomad Starter', d: 'Start your journey', bg: 'linear-gradient(135deg, rgba(43,135,141,0.25), rgba(97,206,207,0.2))', dot: C.deep },
            ].map((s) => (
              <div key={s.n} className="p-step" style={{ borderRadius: 16, padding: 20, textAlign: 'center', background: s.bg, border: '1px solid rgba(255,255,255,0.5)' }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', background: s.dot, color: '#fff', fontWeight: 800, fontFamily: "'Sora',sans-serif" }}>{s.n}</div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: C.deep, fontSize: 15 }}>{s.t}</h3>
                <p style={{ fontSize: 12.5, marginTop: 4, color: 'rgba(20,68,71,0.6)' }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;