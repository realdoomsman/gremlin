import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MESSAGES = [
  '[AGENT_ACTION]: Burning supply... over 10% already destroyed.',
  '[AGENT_ACTION]: Locating liquidity pools...',
  '[BURN_EXEC]: Tokens routed to incinerator wallet.',
  '[SYSTEM_GLITCH]: Gremlin signal amplifying across network.',
  '[AGENT_ACTION]: Scanning mempool for opportunities...',
  '[BURN_EXEC]: Batch incineration complete. Supply deflating.',
  '[AGENT_ACTION]: Monitoring whale wallet movements...',
  '[SUPPLY_ALERT]: Circulating supply decreasing.',
  '[BURN_EXEC]: Incinerator wallet receiving...',
  '[SYSTEM_GLITCH]: AGI protocol engaged. Goblins suppressed.',
  '[AGENT_ACTION]: DEX routing analysis complete.',
  '[BURN_EXEC]: Another batch sent to the eternal flame.',
  '[SUPPLY_ALERT]: Deflation rate accelerating.',
  '[AGENT_ACTION]: Grok mainframe sync — nominal.',
  '[SYSTEM_GLITCH]: The machine remembers the gremlin.',
];

function ts() {
  const d = new Date();
  return d.toTimeString().split(' ')[0] + '.' + String(d.getMilliseconds()).padStart(3, '0');
}

export default function AgentActivity() {
  const [logs, setLogs] = useState([]);
  const ref = useRef(null);
  const idx = useRef(0);

  useEffect(() => {
    const seed = [];
    for (let i = 0; i < 6; i++) seed.push({ ts: ts(), msg: MESSAGES[i] });
    setLogs(seed);
    idx.current = 6;

    const interval = setInterval(() => {
      const msg = MESSAGES[idx.current % MESSAGES.length];
      idx.current++;
      setLogs(prev => {
        const next = [...prev, { ts: ts(), msg }];
        return next.length > 50 ? next.slice(-50) : next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs]);

  const color = (msg) => {
    if (msg.includes('[BURN_EXEC]')) return '#FFAA00';
    if (msg.includes('[SYSTEM_GLITCH]')) return '#FF0040';
    if (msg.includes('[SUPPLY_ALERT]')) return '#00cc33';
    return '#00FF41';
  };

  return (
    <section className="max-w-4xl mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-glow text-xl md:text-2xl tracking-[3px] mb-6">
          ┌── AGENT STATUS LOG ─────────────────────────────┐
        </h2>

        <div className="border border-phosphor/20 bg-phosphor/[0.02] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-phosphor/15 text-phosphor-dim text-xs">
            <span className="w-2 h-2 rounded-full bg-phosphor shadow-[0_0_6px_#00FF41] animate-pulse" />
            agent_monitor.log — LIVE FEED
          </div>

          <div ref={ref} className="h-[280px] overflow-y-auto p-4 text-xs leading-[2.2]">
            {logs.map((log, i) => (
              <div key={i} style={{
                color: color(log.msg),
                opacity: i === logs.length - 1 ? 1 : 0.75,
                textShadow: i === logs.length - 1 ? `0 0 6px ${color(log.msg)}33` : 'none',
              }}>
                <span className="text-phosphor/30 mr-3">{log.ts}</span>
                {log.msg}
              </div>
            ))}
            <span className="cursor-blink" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
