import './App.css';
import { useState, useEffect } from "react";
import ThemeToggleIcon from './components/ThemeToggleIcon';
import SwitchIcon from './components/SwitchIcon';
import CopyIcon from './components/CopyIcon';

function App() {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");
  const [mode, setMode] = useState("textToBinary");
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [particles, setParticles] = useState([]);
  const [raindrops, setRaindrops] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getViewportCategory = () => {
      const w = window.innerWidth;
      if (w <= 480) return 'xs';
      if (w <= 768) return 'sm';
      if (w <= 1024) return 'md';
      if (w <= 1440) return 'lg';
      return 'xl';
    };

    const particleCounts = { xs: 25, sm: 35, md: 50, lg: 65, xl: 80 };
    const starCounts = { xs: 8, sm: 12, md: 15, lg: 20, xl: 25 };

    const generateParticles = (cat) => {
      const count = particleCounts[cat] || particleCounts.md;
      const newParticles = Array.from({ length: count }).map((_, i) => {
        const sizeBase = cat === 'xs' ? 1.5 : cat === 'xl' ? 3 : 2;
        const sizeRange = cat === 'xs' ? 1.5 : cat === 'xl' ? 2 : 2;
        const durationMin = cat === 'xs' ? 12 : cat === 'xl' ? 20 : 16;
        const durationRange = cat === 'xs' ? 6 : cat === 'xl' ? 8 : 8;
        return {
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 12,
          animationDuration: durationMin + Math.random() * durationRange,
          size: Math.random() * sizeRange + sizeBase
        };
      });
      setParticles(newParticles);
    };

    const generateStars = (cat) => {
      const count = starCounts[cat] || starCounts.md;
      const newStars = Array.from({ length: count }).map((_, i) => {
        const sizeMax = cat === 'xs' ? 12 : cat === 'xl' ? 20 : 18;
        const sizeMin = 3;
        const durationMin = 3;
        const durationRange = 4;
        return {
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 8,
          animationDuration: durationMin + Math.random() * durationRange,
          size: Math.random() * (sizeMax - sizeMin) + sizeMin
        };
      });
      setRaindrops(newStars);
    };

    let currentCategory = getViewportCategory();
    generateParticles(currentCategory);
    generateStars(currentCategory);

    const starsInterval = setInterval(() => generateStars(currentCategory), 6000);

    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        currentCategory = getViewportCategory();
        generateParticles(currentCategory);
        generateStars(currentCategory);
      }, 200);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearInterval(starsInterval);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const textToBinary = () => {
    const result = text
      .split("")
      .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
    setBinary(result);
  };

  const binaryToText = () => {
    try {
      const result = binary
        .split(" ")
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join("");
      setText(result);
    } catch (e) {
      alert("Invalid binary code!");
    }
  };

  const handleInputChange = (value) => {
    if (mode === "textToBinary") {
      setText(value);
    } else {
      setBinary(value);
    }
  };

  const handleConvert = () => {
    if (mode === "textToBinary") {
      textToBinary();
    } else {
      binaryToText();
    }
  };

  const getInputValue = () => {
    return mode === "textToBinary" ? text : binary;
  };

  const getOutputValue = () => {
    return mode === "textToBinary" ? binary : text;
  };

  const getInputPlaceholder = () => {
    return mode === "textToBinary" ? "Type your text here..." : "Type binary code here...";
  };

  const getOutputPlaceholder = () => {
    return mode === "textToBinary" ? "Binary result..." : "Text result...";
  };

  const copyOutput = async () => {
    const value = getOutputValue();
    if (!value) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const temp = document.createElement('textarea');
        temp.value = value;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <div className={`App ${isLightTheme ? 'light-theme' : ''}`}>
      <div className="particle-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>

      <div className="raindrop-container">
         {raindrops.map((star) => (
           <div
             key={star.id}
             className="raindrop"
             style={{
               left: `${star.left}%`,
               top: `${star.top}%`,
               width: `${star.size}px`,
               height: `${star.size}px`,
               animationDelay: `${star.animationDelay}s`,
               animationDuration: `${star.animationDuration}s`
             }}
           />
         ))}
       </div>

      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px', 
        zIndex: 1000 
      }}>
        <button
          onClick={() => setIsLightTheme(!isLightTheme)}
          className="neon-button"
          aria-label={isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 12px',
            background: isLightTheme 
              ? 'linear-gradient(45deg, #636363ff, #f6f6f6ff)' 
              : 'linear-gradient(45deg, var(--primary-neon), var(--secondary-neon))'
          }}
        >
          <ThemeToggleIcon isLightTheme={isLightTheme} size={22} />
          <span className="sr-only">{isLightTheme ? 'Dark' : 'Light'}</span>
        </button>
      </div>

      <div className="page-wrap">
        <h1 className="neon-title">Text ↔ Binary Converter</h1>
        
        <div className="glass-container">
          
          <div className="switch-container">
            <button 
              onClick={() => setMode(mode === "textToBinary" ? "binaryToText" : "textToBinary")}
              className="neon-button switch-button"
              aria-label="Switch conversion direction"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 12px',
                color: '#fff'
              }}
            >
              <SwitchIcon size={22} />
            </button>
          </div>

          <div style={{ marginBottom: "25px", textAlign: "left" }}>
            <h3 className="section-header">
              {mode === "textToBinary" ? "Text to convert:" : "Binary to convert:"}
            </h3>
            <textarea
              rows="5"
              value={getInputValue()}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={getInputPlaceholder()}
              className="neon-textarea"
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <button 
              onClick={handleConvert}
              className="neon-button convert-btn"
            >
              {mode === "textToBinary" ? "Convert to Binary" : "Convert to Text"}
            </button>
          </div>

          <div style={{ textAlign: "left" }}>
            <div className="output-header">
              <h3 className="section-header" style={{ margin: 0 }}>
                {mode === "textToBinary" ? "Binary Result:" : "Text Result:"}
              </h3>
              <button
                type="button"
                className="neon-button icon-button"
                onClick={copyOutput}
                aria-label="Copy converted text"
                title={copied ? 'Copied!' : 'Copy'}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <CopyIcon size={18} />
                <span style={{ fontSize: '0.9rem' }}>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              rows="5"
              value={getOutputValue()}
              readOnly
              placeholder={getOutputPlaceholder()}
              className="neon-textarea"
              style={{ 
                color: mode === "textToBinary" ? "var(--secondary-neon)" : "var(--primary-neon)",
                fontWeight: "bold"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;