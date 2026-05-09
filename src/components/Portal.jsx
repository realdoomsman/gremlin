import { motion } from 'framer-motion';

const LINKS = [
  { label: 'COMMUNITY', url: 'https://x.com/i/communities/1974260983880204591', desc: 'Join the Gremlin Collective' },
  { label: 'DEXSCREENER', url: 'https://dexscreener.com/solana/524zXrkbMkoDF8tZSy45PwTNb9pNgvwx5VSdk2R4pump', desc: 'Live Chart & Analytics' },
  { label: 'PUMP_FUN', url: 'https://pump.fun/coin/524zXrkbMkoDF8tZSy45PwTNb9pNgvwx5VSdk2R4pump', desc: 'Token Launch Platform' },
];

const item = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };

export default function Portal() {
  return (
    <section id="portal" className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.12 }}
      >
        <h2 className="text-glow text-xl md:text-2xl tracking-[3px] mb-2">
          ┌── THE PORTAL ────────────────────────────────────┐
        </h2>
        <p className="text-phosphor-dim text-sm mb-8">{'>'} ACCESS EXTERNAL NODES</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {LINKS.map(link => (
            <motion.a
              key={link.label}
              variants={item}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-phosphor-dim/40 bg-phosphor/[0.02] p-5 transition-all duration-200 hover:bg-phosphor hover:text-black group"
            >
              <div className="text-phosphor font-bold tracking-[2px] mb-2 group-hover:text-black text-sm">
                {'>'} OPEN [{link.label}]
              </div>
              <div className="text-phosphor-dim text-xs group-hover:text-black/70">
                {link.desc}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
