import { useState, useEffect } from "react";
import { useIkigai } from "../context/IkigaiContext";

function IkigaiVenn() {
  return (
    <svg viewBox="0 0 360 300" style={{ width: "100%", maxWidth: 360, margin: "0 auto", display: "block" }}>
      <defs>
        {[["vg0","#e85d4a"],["vg1","#3a9e6e"],["vg2","#5b6af0"],["vg3","#9b59b6"]].map(([id, c]) => (
          <radialGradient key={id} id={id} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c} stopOpacity="0.38" />
            <stop offset="100%" stopColor={c} stopOpacity="0.06" />
          </radialGradient>
        ))}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx={145} cy={125} r={72} fill="url(#vg0)" stroke="#e85d4a" strokeWidth={1.5} strokeOpacity={0.4} />
      <circle cx={215} cy={125} r={72} fill="url(#vg1)" stroke="#3a9e6e" strokeWidth={1.5} strokeOpacity={0.4} />
      <circle cx={215} cy={178} r={72} fill="url(#vg2)" stroke="#5b6af0" strokeWidth={1.5} strokeOpacity={0.4} />
      <circle cx={145} cy={178} r={72} fill="url(#vg3)" stroke="#9b59b6" strokeWidth={1.5} strokeOpacity={0.4} />

      {/* centre glow */}
      <circle cx={180} cy={151} r={26} fill="white" fillOpacity={0.92} filter="url(#glow)" />
      <text x={180} y={147} textAnchor="middle" fontSize={8.5} fontWeight={700} fill="#1a1a1a" fontFamily="DM Sans,sans-serif">IKIGAI</text>
      <text x={180} y={158} textAnchor="middle" fontSize={7} fill="#999" fontFamily="DM Sans,sans-serif">your purpose</text>

      {/* labels */}
      <text x={145} y={40}  textAnchor="middle" fontSize={9.5} fill="#e85d4a" fontWeight={600} fontFamily="DM Sans,sans-serif">What you love</text>
      <text x={215} y={40}  textAnchor="middle" fontSize={9.5} fill="#3a9e6e" fontWeight={600} fontFamily="DM Sans,sans-serif">What you're good at</text>
      <text x={215} y={268} textAnchor="middle" fontSize={9.5} fill="#5b6af0" fontWeight={600} fontFamily="DM Sans,sans-serif">What pays you</text>
      <text x={145} y={268} textAnchor="middle" fontSize={9.5} fill="#9b59b6" fontWeight={600} fontFamily="DM Sans,sans-serif">What the world needs</text>
    </svg>
  );
}

function AnimatedCard({ children, delay = 0, style = {} }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.55s cubic-bezier(.22,.68,0,1.2)",
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function IkigaiChart() {
  const { result, restart } = useIkigai();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 80); }, []);

  if (!result) return null;

  const sections = [
    { icon: "◈", label: "Why This Fits You",  content: result.ikigaiSummary,   color: "#3a9e6e", bg: "#f0fbf5", delay: 350 },
    { icon: "◆", label: "Ideal Work Style",   content: result.workStyle,        color: "#5b6af0", bg: "#f3f4ff", delay: 480 },
    { icon: "◑", label: "Personal Insight",   content: result.personalInsight,  color: "#f0942a", bg: "#fff8f0", delay: 610 },
    { icon: "★", label: "Final Motivation",   content: result.motivationLine,   color: "#9b59b6", bg: "#faf0ff", delay: 740 },
  ];

  const careerData = [
    { color: "#e85d4a", bg: "#fff5f3", num: "01" },
    { color: "#3a9e6e", bg: "#f0fbf5", num: "02" },
    { color: "#5b6af0", bg: "#f3f4ff", num: "03" },
  ];

  return (
    <div style={{
      opacity: heroVisible ? 1 : 0,
      transition: "opacity 0.7s ease",
    }}>
      {/* ── Hero ── */}
      <AnimatedCard delay={0} style={{ marginBottom: 24 }}>
        <div style={{
          background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
          borderRadius: 28, padding: "40px 32px 32px",
          textAlign: "center", overflow: "hidden", position: "relative",
        }}>
          {/* blobs */}
          {[{t:-60,r:-60,s:200,c:"#5b6af0"},{b:-40,l:-40,s:160,c:"#e85d4a"},{t:"40%",r:-20,s:100,c:"#9b59b6"}].map((b,i)=>(
            <div key={i} style={{
              position:"absolute", borderRadius:"50%", pointerEvents:"none",
              top:b.t, right:b.r, bottom:b.b, left:b.l,
              width:b.s, height:b.s,
              background:`${b.c}22`,
            }}/>
          ))}

          <div style={{
            display:"inline-flex", alignItems:"center", gap:6,
            background:"rgba(91,106,240,0.18)", borderRadius:50,
            padding:"5px 14px", marginBottom:16, position:"relative",
          }}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#5b6af0",display:"inline-block"}}/>
            <span style={{fontSize:11,color:"#a0aaff",letterSpacing:2,textTransform:"uppercase",fontWeight:600}}>Your Ikigai</span>
          </div>

          <h1 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(22px,4vw,30px)",
            color:"#fff", marginBottom:28, lineHeight:1.3,
            position:"relative",
          }}>
            {result.ikigaiTitle}
          </h1>

          <IkigaiVenn />
        </div>
      </AnimatedCard>

      {/* ── Section cards — 2-col on desktop ── */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
        gap:14, marginBottom:14,
      }}>
        {sections.map((s) => (
          <AnimatedCard key={s.label} delay={s.delay}>
            <div style={{
              background:"#fff", borderRadius:18,
              padding:"20px 22px", height:"100%",
              boxShadow:"0 2px 24px rgba(0,0,0,0.06)",
              border:`1.5px solid ${s.bg}`,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <div style={{
                  width:32,height:32,borderRadius:10,
                  background:s.bg, color:s.color,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:15, fontWeight:700,
                }}>{s.icon}</div>
                <span style={{fontSize:10,fontWeight:700,color:s.color,textTransform:"uppercase",letterSpacing:1.8}}>
                  {s.label}
                </span>
              </div>
              <p style={{fontSize:14,color:"#333",lineHeight:1.75,margin:0}}>{s.content}</p>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* ── Career Paths ── */}
      <AnimatedCard delay={870} style={{ marginBottom: 24 }}>
        <div style={{
          background:"#fff", borderRadius:20,
          padding:"24px 24px", boxShadow:"0 2px 24px rgba(0,0,0,0.06)",
          border:"1.5px solid #f5f5f5",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <div style={{width:32,height:32,borderRadius:10,background:"#fff5f3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>♥</div>
            <span style={{fontSize:10,fontWeight:700,color:"#e85d4a",textTransform:"uppercase",letterSpacing:1.8}}>Recommended Career Paths</span>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {result.careerPaths?.map((path, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:14,
                padding:"14px 16px", borderRadius:14,
                background:careerData[i]?.bg || "#f9f9f9",
                border:`1.5px solid ${careerData[i]?.color || "#ddd"}22`,
                transition:"transform 0.2s ease",
              }}
                onMouseEnter={(e)=>e.currentTarget.style.transform="translateX(4px)"}
                onMouseLeave={(e)=>e.currentTarget.style.transform="translateX(0)"}
              >
                <span style={{
                  fontSize:11,fontWeight:800,color:careerData[i]?.color,
                  minWidth:28,
                }}>{careerData[i]?.num}</span>
                <span style={{fontSize:15,color:"#222",fontWeight:500}}>{path}</span>
                <span style={{marginLeft:"auto",color:careerData[i]?.color,fontSize:14}}>→</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* ── Restart ── */}
      <AnimatedCard delay={1000}>
        <button onClick={restart} style={{
          display:"block", width:"100%", padding:"16px",
          borderRadius:50, fontSize:15, fontWeight:600,
          cursor:"pointer", border:"none",
          background:"linear-gradient(135deg,#0f0c29,#302b63)",
          color:"#fff", fontFamily:"'DM Sans',sans-serif",
          transition:"all 0.25s ease",
          letterSpacing:0.5,
        }}
          onMouseEnter={(e)=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(15,12,41,0.4)";}}
          onMouseLeave={(e)=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
        >
          Start Over ↺
        </button>
      </AnimatedCard>
    </div>
  );
}