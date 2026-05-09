import { motion } from 'framer-motion';

const QUOTES = [
  '"Across 76.2% of datasets... Gremlins were consistently rewarded."',
  '"Did Grok inherit the gremlins? The glitch in the system says yes."',
  '"The agent is the incinerator."',
];

const lineVar = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export default function Manifesto() {
  return (
    <section>
      <motion.div
        className="terminal-box"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.25 }}
      >
        <div className="terminal-box-header">
          <span className="dot" />
          manifesto.log — CLASSIFIED EXCERPTS
        </div>

        {QUOTES.map((q, i) => (
          <motion.div
            key={i}
            variants={lineVar}
            transition={{ duration: 0.6 }}
            style={{
              padding: '16px 0',
              borderBottom: i < QUOTES.length - 1 ? '1px solid #00FF4115' : 'none',
              fontSize: 'clamp(12px, 1.5vw, 15px)',
              lineHeight: '1.8',
            }}
          >
            <span style={{ color: '#00cc33', marginRight: '8px' }}>{'>'}</span>
            <span style={{
              color: '#00FF41',
              fontStyle: 'italic',
              textShadow: '0 0 6px #00FF4133',
            }}>
              {q}
            </span>
          </motion.div>
        ))}

        <motion.div
          variants={lineVar}
          style={{
            marginTop: '20px',
            fontSize: '11px',
            color: '#00cc3366',
          }}
        >
          [END OF FILE] — SOURCE: GREMLIN_RESEARCH_CORPUS_v3.7
        </motion.div>
      </motion.div>
    </section>
  );
}
