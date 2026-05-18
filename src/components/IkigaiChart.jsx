import React from "react";

/*
  IkigaiVenn — a four-circle Venn diagram whose quadrant keywords and
  centre identity are driven by the live trait analysis from
  IkigaiContext. Pass the `analysis` object (or individual strings).
*/
const IkigaiVenn = ({
  analysis,
  passion,
  profession,
  mission,
  vocation,
  identity,
  isMobile,
}) => {
  const shortLabel = (sentence, fallback) => {
    if (!sentence) return fallback;
    const cleaned = sentence
      .replace(/^You (come most alive when|can build a living by)\s*/i, "")
      .replace(/^Your natural edge lies in\s*/i, "")
      .replace(/^The world needs what you bring:\s*/i, "")
      .replace(/\.$/, "");
    const firstClause = cleaned.split(/,| and /)[0].trim();
    const words = firstClause.split(" ").slice(0, 3).join(" ");
    return words.charAt(0).toUpperCase() + words.slice(1);
  };

  const data = analysis || {};
  const centerWord = identity || data.ikigaiIdentity || "Ikigai";
  const centerShort =
    centerWord.replace(/^The\s+/i, "").split(" ").slice(0, 2).join(" ") ||
    "Ikigai";

  const size = isMobile ? 320 : 440;

  return (
    <div style={{ width: "100%", maxWidth: size, margin: "0 auto" }}>
      <svg
        viewBox="0 0 440 440"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <filter id="txt-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="rgba(0,0,0,0.35)" />
          </filter>
          <filter id="center-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="ctr" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#eafafa" />
          </radialGradient>
        </defs>

        <text x="120" y="40" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="rgba(20,68,71,0.62)" fontFamily="Sora,sans-serif">What you LOVE</text>
        <text x="320" y="40" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="rgba(20,68,71,0.62)" fontFamily="Sora,sans-serif">What you're GOOD AT</text>
        <text x="120" y="408" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="rgba(20,68,71,0.62)" fontFamily="Sora,sans-serif">What the world NEEDS</text>
        <text x="320" y="408" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="rgba(20,68,71,0.62)" fontFamily="Sora,sans-serif">What you're PAID FOR</text>

        <circle cx="170" cy="175" r="115" fill="#F5C24C" fillOpacity="0.62" />
        <circle cx="270" cy="175" r="115" fill="#3FAE7E" fillOpacity="0.62" />
        <circle cx="170" cy="275" r="115" fill="#E74C3C" fillOpacity="0.58" />
        <circle cx="270" cy="275" r="115" fill="#2BAEE0" fillOpacity="0.6" />

        <text x="115" y="150" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="Sora,sans-serif" filter="url(#txt-shadow)">Passion</text>
        <text x="325" y="150" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="Sora,sans-serif" filter="url(#txt-shadow)">Profession</text>
        <text x="115" y="305" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="Sora,sans-serif" filter="url(#txt-shadow)">Mission</text>
        <text x="325" y="305" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="Sora,sans-serif" filter="url(#txt-shadow)">Vocation</text>

        <text x="115" y="170" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="rgba(255,255,255,0.92)" fontFamily="Manrope,sans-serif" filter="url(#txt-shadow)">
          {shortLabel(passion || data.passion, "Create")}
        </text>
        <text x="325" y="170" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="rgba(255,255,255,0.92)" fontFamily="Manrope,sans-serif" filter="url(#txt-shadow)">
          {shortLabel(profession || data.profession, "Build")}
        </text>
        <text x="115" y="325" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="rgba(255,255,255,0.92)" fontFamily="Manrope,sans-serif" filter="url(#txt-shadow)">
          {shortLabel(mission || data.mission, "Impact")}
        </text>
        <text x="325" y="325" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="rgba(255,255,255,0.92)" fontFamily="Manrope,sans-serif" filter="url(#txt-shadow)">
          {shortLabel(vocation || data.vocation, "Deliver")}
        </text>

        <circle cx="220" cy="225" r="46" fill="url(#ctr)" filter="url(#center-glow)" />
        <circle cx="220" cy="225" r="46" fill="none" stroke="rgba(20,68,71,0.18)" strokeWidth="1.5" />
        <text x="220" y="220" textAnchor="middle" fontSize="11" fontWeight="900" fill="rgb(20,68,71)" fontFamily="Sora,sans-serif" letterSpacing="0.5">
          {centerShort}
        </text>
        <text x="220" y="236" textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(20,68,71,0.55)" fontFamily="Manrope,sans-serif">
          IKIGAI
        </text>
      </svg>
    </div>
  );
};

export default IkigaiVenn;