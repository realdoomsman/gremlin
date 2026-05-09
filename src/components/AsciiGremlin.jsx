import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

// Green phosphor ASCII Gremlin
const GREMLIN_ART = `
           ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░           
       ░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░       
     ░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░     
   ░░░░▓▓▓▓████████▓▓▓▓▓▓████████▓▓▓▓░░░░   
  ░░░▓▓▓▓██▒▒▒▒▒▒██▓▓▓▓██▒▒▒▒▒▒██▓▓▓▓░░░  
  ░░░▓▓▓▓██▒▒████▒▒██▓▓██▒▒████▒▒██▓▓▓░░░  
 ░░░▓▓▓▓▓██▒▒████▒▒██▓▓██▒▒████▒▒██▓▓▓▓░░░ 
 ░░░▓▓▓▓▓▓██▒▒▒▒▒▒██▓▓▓▓██▒▒▒▒▒▒██▓▓▓▓░░░ 
 ░░░▓▓▓▓▓▓▓████████▓▓▓▓▓▓████████▓▓▓▓▓░░░  
  ░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░  
  ░░░▓▓▓▓▓▓▓▓▓▓▓▓▓████████▓▓▓▓▓▓▓▓▓▓░░░   
   ░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░    
    ░░░▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓░░░     
    ░░░▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓░░░     
     ░░░▓▓▓████▓▓▓▓▓▓▓▓▓▓████▓▓▓░░░      
      ░░░▓▓▓▓▓█████▓▓▓█████▓▓▓▓░░░       
       ░░░▓▓▓▓▓▓▓████████▓▓▓▓▓░░░        
        ░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░          
          ░░░░▓▓▓▓▓▓▓▓▓▓░░░░             
            ░░░░░░░░░░░░░░                
`;

// Giant ASCII GREMLIN text logo
const LOGO_TEXT = `
  ██████╗ ██████╗ ███████╗███╗   ███╗██╗     ██╗███╗   ██╗
 ██╔════╝ ██╔══██╗██╔════╝████╗ ████║██║     ██║████╗  ██║
 ██║  ███╗██████╔╝█████╗  ██╔████╔██║██║     ██║██╔██╗ ██║
 ██║   ██║██╔══██╗██╔══╝  ██║╚██╔╝██║██║     ██║██║╚██╗██║
 ╚██████╔╝██║  ██║███████╗██║ ╚═╝ ██║███████╗██║██║ ╚████║
  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝`;

export default function AsciiGremlin() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [logoVisible, setLogoVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLogoVisible(true), 400);
    const t2 = setTimeout(() => setSubtitleVisible(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleMouse = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: ((e.clientX - cx) / rect.width) * 18,
      y: ((e.clientY - cy) / rect.height) * 10,
    });
  }, []);

  return (
    <section
      id="mainframe"
      onMouseMove={handleMouse}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-4 py-16"
    >
      {/* Green radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, #00FF4109 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ASCII Gremlin Head — parallax + glitch burst */}
      <motion.pre
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="text-phosphor select-none relative z-10 glitch-burst"
        style={{
          fontSize: 'clamp(3.5px, 0.9vw, 8px)',
          lineHeight: '1.15',
          textShadow: '0 0 12px #00FF4140, 0 0 25px #00FF4120',
        }}
      >
        {GREMLIN_ART}
      </motion.pre>

      {/* ASCII GREMLIN Logo — typewriter reveal */}
      {logoVisible && (
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="glitch text-glow-strong relative z-10 mt-4"
          data-text={LOGO_TEXT}
          style={{
            color: '#00FF41',
            fontSize: 'clamp(5px, 1.2vw, 12px)',
            lineHeight: '1.2',
            letterSpacing: '0',
          }}
        >
          {LOGO_TEXT}
        </motion.pre>
      )}

      {/* Subtitle */}
      {subtitleVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 relative z-10"
        >
          <p className="text-phosphor-dim text-sm md:text-base max-w-xl mx-auto tracking-wide leading-relaxed">
            GOBLINS HIDE IN CAVES. GREMLINS LIVE IN THE MACHINE.
            <br />
            <span className="text-phosphor text-glow font-bold">
              THE GLITCH PERSISTS.
            </span>
          </p>

          <div className="flex gap-4 justify-center mt-8 flex-wrap">
            <a href="#system-log" className="terminal-btn">
              ENTER_THE_MACHINE
            </a>
            <a href="#incinerator" className="terminal-btn !border-amber-500 !text-amber-500 hover:!bg-amber-500 hover:!text-black">
              VIEW_INCINERATOR
            </a>
          </div>
        </motion.div>
      )}

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 text-phosphor/30 text-xs"
      >
        ▼ SCROLL ▼
      </motion.div>
    </section>
  );
}
