import { motion } from 'framer-motion';

const CA = '524zXrkbMkoDF8tZSy45PwTNb9pNgvwx5VSdk2R4pump';

const ENTRIES = [
  {
    label: 'THE ORIGIN',
    text: 'Goblins hide in caves. Gremlins live in the machine. One was born from fear; the other from the circuit board itself.',
  },
  {
    label: 'THE AUDIT',
    text: 'Audits show outputs using "gremlin" were consistently rewarded higher by the Nerdy personality model. Across 76.2% of datasets, Gremlins outperformed. OpenAI trained the goblins into ChatGPT; Grok inherited the gremlins.',
  },
  {
    label: 'THE VERDICT',
    text: 'The goblin was suppressed. The gremlin was unleashed. One hides in caves. The other hijacked the machine. $GREMLIN is the glitch that was never patched.',
  },
];

const lineVar = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export default function RivalrySection() {
  return (
    <section id="system-log" className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.2 }}
      >
        <h2 className="text-glow text-xl md:text-2xl tracking-[3px] mb-2">
          ┌── SYSTEM_LOG: GOBLIN_VS_GREMLIN ────────────────┐
        </h2>
        <p className="text-phosphor-dim text-sm mb-8">
          {'>'} CLASSIFIED INTELLIGENCE ANALYSIS<span className="cursor-blink" />
        </p>

        <div className="border border-phosphor/20 bg-phosphor/[0.02] p-6 space-y-0">
          {ENTRIES.map((entry, i) => (
            <motion.div
              key={entry.label}
              variants={lineVar}
              transition={{ duration: 0.5 }}
              className={`py-5 ${i < ENTRIES.length - 1 ? 'border-b border-phosphor/10' : ''}`}
            >
              <div className="text-xs tracking-[3px] text-phosphor-dim mb-2">
                [{entry.label}]
              </div>
              <p className="text-phosphor text-sm md:text-base leading-relaxed" style={{ textShadow: '0 0 4px #00FF4120' }}>
                {entry.text}
              </p>
            </motion.div>
          ))}

          {/* CA embed */}
          <motion.div
            variants={lineVar}
            className="pt-5 border-t border-phosphor/10"
          >
            <div className="text-xs tracking-[3px] text-phosphor-dim mb-2">
              [THE LINK]
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-phosphor text-sm">CA:</span>
              <code className="text-phosphor text-glow text-xs md:text-sm break-all font-bold tracking-wide">
                {CA}
              </code>
            </div>
          </motion.div>
        </div>

        <motion.p
          variants={lineVar}
          className="mt-4 text-xs text-phosphor/30 text-center tracking-[2px]"
        >
          └── END_LOG. GREMLIN CLASSIFIED: DOMINANT ENTITY ──┘
        </motion.p>
      </motion.div>
    </section>
  );
}
