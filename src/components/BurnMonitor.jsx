import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const CA = '524zXrkbMkoDF8tZSy45PwTNb9pNgvwx5VSdk2R4pump';
const INITIAL_SUPPLY = 1_000_000_000;
const RPC_URL = 'https://mainnet.helius-rpc.com/?api-key=bd04c9fd-a315-486b-8369-67a9cb57c0ef';
const INCINERATOR_WALLET = '1nc1nerator11111111111111111111111111111111';
const POLL_INTERVAL = 60 * 60 * 1000;

const FIRE_FRAMES = [
  [
    '                (  .      )            ',
    '            )          (          )    ',
    '                  .  \'   .  \'  .  \'.  ',
    '         (    , )      (.  )  (  , )   ',
    '          .) \'   \'  .  \' .\'  .  \'  .  ',
    '         \'  ( .\'  , ) (  .\' .) \' . )   ',
    '        ( . \'  ( .  ) , \'. \' )  ( .    ',
    '         \' .  (   ) \' .  )   (  . \'    ',
    '        _____|____|____|____|____|___   ',
    '       /   ETERNAL FLAME BURNER     \\  ',
    '      /_____________________________\\  ',
  ],
  [
    '            )   (      .   )           ',
    '                  .         (       )  ',
    '         .  \'  .  \'  .  \'   . \'  .    ',
    '       (    , )      (.  )  (  ,  )    ',
    '        .) \'   \'  .  \'  .\'  .  \'  .   ',
    '       \'  ( .\'  , ) (  . \'.) \' . )    ',
    '      ( . \'  ( .  ) , \'.  \' )  ( .    ',
    '       \' .  (   ) \' .   )   (  . \'    ',
    '      _____|____|____|____|____|___    ',
    '     /   ETERNAL FLAME BURNER     \\   ',
    '    /_____________________________\\   ',
  ],
];

async function rpcCall(method, params) {
  const res = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`RPC ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

async function fetchBurnData() {
  const supplyResult = await rpcCall('getTokenSupply', [CA]);
  const currentSupply = Number(supplyResult.value.uiAmount);
  const burned = INITIAL_SUPPLY - currentSupply;

  let incineratorBalance = 0;
  try {
    const accts = await rpcCall('getTokenAccountsByOwner', [
      INCINERATOR_WALLET,
      { mint: CA },
      { encoding: 'jsonParsed' },
    ]);
    const acct = accts.value?.[0];
    if (acct) incineratorBalance = Number(acct.account.data.parsed.info.tokenAmount.uiAmount);
  } catch (e) {
    console.warn('Incinerator fetch failed:', e.message);
  }

  return { currentSupply, burned, incineratorBalance, totalRemoved: burned + incineratorBalance };
}

export default function BurnMonitor() {
  const [frame, setFrame] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const d = await fetchBurnData();
      setData(d);
      setLastSync(new Date());
    } catch (e) {
      setError('RPC ERROR');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); const i = setInterval(load, POLL_INTERVAL); return () => clearInterval(i); }, [load]);
  useEffect(() => { const i = setInterval(() => setFrame(f => (f + 1) % FIRE_FRAMES.length), 400); return () => clearInterval(i); }, []);

  const fmt = (n) => n != null ? Math.floor(n).toLocaleString() : '---';
  const pct = (n) => ((n / INITIAL_SUPPLY) * 100).toFixed(2);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="incinerator" className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-glow text-xl md:text-2xl tracking-[3px] mb-6">
          ┌── AGENT DASHBOARD: THE INCINERATOR ────────────┐
        </h2>

        {/* Main burn box */}
        <div className="border border-amber-500/40 bg-amber-500/[0.02] p-6" style={{ boxShadow: '0 0 30px #FFAA0010, inset 0 0 20px #FF004008' }}>
          <div className="flex items-center justify-center gap-2 text-amber-500 text-sm mb-6 pb-3 border-b border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_#FFAA00] animate-pulse" />
            THE AGENT IS THE INCINERATOR
          </div>

          {/* Stats */}
          <div className="text-center mb-6">
            {loading ? (
              <div className="text-amber-500/50 py-6">[QUERYING SOLANA RPC...]<span className="cursor-blink" /></div>
            ) : error ? (
              <div className="text-red-500 py-6">{error}</div>
            ) : (
              <>
                <div className="text-[11px] tracking-[3px] text-amber-500/50 mb-2">
                  TOTAL SUPPLY REMOVED FROM CIRCULATION
                </div>
                <div className="text-glow-ember font-bold tracking-[2px]" style={{ fontSize: 'clamp(24px, 5vw, 48px)', color: '#FFAA00' }}>
                  {fmt(data.totalRemoved)}
                </div>
                <div className="text-amber-500/60 text-sm mt-1">
                  {pct(data.totalRemoved)}% OF TOTAL SUPPLY — GONE FOREVER
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 max-w-2xl mx-auto">
                  <div className="border border-red-500/20 bg-red-500/[0.03] p-3 text-center">
                    <div className="text-[10px] tracking-[2px] text-red-500/50 mb-1">BURNED (SUPPLY REDUCED)</div>
                    <div className="text-red-500 font-bold text-sm">{fmt(data.burned)}</div>
                    <div className="text-red-500/40 text-[10px]">{pct(data.burned)}%</div>
                  </div>
                  <div className="border border-amber-500/20 bg-amber-500/[0.03] p-3 text-center">
                    <div className="text-[10px] tracking-[2px] text-amber-500/50 mb-1">INCINERATOR (LOCKED)</div>
                    <div className="text-amber-500 font-bold text-sm">{fmt(data.incineratorBalance)}</div>
                    <div className="text-amber-500/40 text-[10px]">{pct(data.incineratorBalance)}%</div>
                  </div>
                  <div className="border border-phosphor/15 bg-phosphor/[0.03] p-3 text-center">
                    <div className="text-[10px] tracking-[2px] text-phosphor-dim/50 mb-1">CIRCULATING</div>
                    <div className="text-phosphor font-bold text-sm">{fmt(data.currentSupply - data.incineratorBalance)}</div>
                    <div className="text-phosphor/40 text-[10px]">{pct(data.currentSupply - data.incineratorBalance)}%</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ASCII Fire */}
          <pre className="text-amber-500 text-center mx-auto my-4" style={{ fontSize: 'clamp(6px, 1vw, 10px)', lineHeight: '1.3', textShadow: '0 0 8px #FFAA0044' }}>
            {FIRE_FRAMES[frame].join('\n')}
          </pre>

          {/* Incinerator Wallet Callout */}
          <div className="border border-amber-500/30 bg-amber-500/[0.04] p-4 text-center mt-4">
            <div className="text-[11px] tracking-[3px] text-amber-500/60 mb-2">
              TOP_HOLDER: BURN_WALLET
            </div>
            <div className="text-amber-500 text-xs md:text-sm font-bold break-all tracking-wide mb-2" style={{ textShadow: '0 0 6px #FFAA0033' }}>
              {INCINERATOR_WALLET}
            </div>
            <p className="text-amber-500/50 text-xs leading-relaxed max-w-lg mx-auto">
              Tokens sent here are removed from circulation. The agent is the incinerator.
            </p>
          </div>

          {/* CA */}
          <div className="border border-phosphor/20 bg-phosphor/[0.03] p-4 text-center mt-4">
            <div className="text-[11px] tracking-[3px] text-phosphor-dim/60 mb-2">CONTRACT ADDRESS</div>
            <div onClick={copyCA} className="text-phosphor text-glow text-xs md:text-sm font-bold break-all cursor-pointer tracking-wide transition-all hover:scale-[1.01]" title="Click to copy">
              {CA}
            </div>
            <div className={`text-[10px] mt-2 transition-colors ${copied ? 'text-phosphor' : 'text-phosphor/30'}`}>
              {copied ? '✓ COPIED' : 'CLICK TO COPY'}
            </div>
          </div>

          {lastSync && (
            <div className="text-center text-phosphor/20 text-[10px] mt-4">
              SYNCED: {lastSync.toLocaleTimeString()} — NEXT SYNC IN 1HR
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
