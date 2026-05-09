import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DIAG_LINES = [
  { text: '╔════════════════════════════════════════════════════╗', color: 'dim' },
  { text: '║   GREMLIN SYSTEM DIAGNOSTICS v6.66                ║', color: 'bright' },
  { text: '╚════════════════════════════════════════════════════╝', color: 'dim' },
  { text: '' },
  { text: 'CHECKING MEMORY............... 1337K OK', color: 'dim' },
  { text: 'SCANNING FOR AGENTS........... 1 DETECTED', color: 'dim' },
  { text: 'GROK COMPATIBILITY............ ██████████ 100%', color: 'bright' },
  { text: 'BURN PROTOCOL................. ARMED', color: 'ember' },
  { text: 'INCINERATOR STATUS............ ONLINE', color: 'ember' },
  { text: 'GOBLIN SUPPRESSION............ ACTIVE', color: 'danger' },
  { text: '' },
  { text: '[DIAG_PASS] ALL SYSTEMS NOMINAL', color: 'bright' },
  { text: '[DIAG_PASS] GREMLIN AGENT FULLY OPERATIONAL', color: 'bright' },
  { text: '' },
  { text: '> ENTERING THE MACHINE...', color: 'ember' },
];

const DELAY_PER_LINE = 140;

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers = DIAG_LINES.map((_, i) =>
      setTimeout(() => setLines(prev => [...prev, DIAG_LINES[i]]), i * DELAY_PER_LINE)
    );
    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 500);
    }, DIAG_LINES.length * DELAY_PER_LINE + 600);

    return () => { timers.forEach(clearTimeout); clearTimeout(exitTimer); };
  }, [onComplete]);

  const colorMap = {
    bright: '#00FF41',
    dim: '#00cc33',
    ember: '#FFAA00',
    danger: '#FF0040',
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
          style={{ background: '#000000' }}
        >
          <div className="max-w-[700px] w-full">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                style={{
                  color: colorMap[line.color] || '#00FF41',
                  textShadow: line.color === 'bright' ? '0 0 8px #00FF4144' : 'none',
                  minHeight: '1.6em',
                  fontSize: '15px',
                  fontFamily: "'VT323', monospace",
                  letterSpacing: '1px',
                }}
              >
                {line.text}
              </motion.div>
            ))}
            <span className="cursor-blink" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
