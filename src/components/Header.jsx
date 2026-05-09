import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-phosphor/20 px-4 py-3 flex items-center justify-between flex-wrap gap-3"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(6px)' }}
    >
      <h1 className="text-phosphor text-glow text-lg tracking-[4px] font-bold">
        $GREMLIN
      </h1>

      <nav className="flex items-center gap-2 flex-wrap">
        {[
          ['[MAINFRAME]', '#mainframe'],
          ['[SYSTEM_LOG]', '#system-log'],
          ['[INCINERATOR]', '#incinerator'],
          ['[PORTAL]', '#portal'],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="text-phosphor-dim text-sm px-2 py-1 border border-transparent hover:border-phosphor hover:text-glow transition-all"
          >
            {label}
          </a>
        ))}
        <button className="terminal-btn text-sm !py-1.5 !px-4 ml-2">
          ENTER_THE_MACHINE
        </button>
      </nav>
    </motion.header>
  );
}
