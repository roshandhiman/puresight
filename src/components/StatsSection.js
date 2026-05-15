'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ value, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      const controls = animate(0, numericValue, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplayValue(v)
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  const formattedValue = displayValue % 1 === 0 ? displayValue.toFixed(0) : displayValue.toFixed(1);
  return <span ref={ref} className="counter-number">{formattedValue}{suffix}</span>;
}

const stats = [
  { label: 'System Uptime', value: '99.9', suffix: '%', icon: '⚡', desc: 'Zero downtime guaranteed', color: '#60A5FA' },
  { label: 'Purifiers Monitored', value: '1200', suffix: '+', icon: '📡', desc: 'Across 12 Indian states', color: '#93C5FD' },
  { label: 'Liters Verified', value: '45', suffix: 'M+', icon: '💧', desc: 'Of safe drinking water delivered', color: '#BFDBFE' },
  { label: 'Active Sites', value: '85', suffix: '', icon: '🏢', desc: 'Universities, hospitals & more', color: '#DBEAFE' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-32 bg-[#0B1222] relative overflow-hidden">
      {/* Grid dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #60A5FA 1px, transparent 0)', backgroundSize: '44px 44px' }} />
      
      {/* Gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-blue-600/8 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Top edge fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/0 via-transparent to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-400 font-black tracking-[0.25em] uppercase text-xs">Our Impact</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter"
            style={{ fontFamily: 'Manrope, sans-serif', lineHeight: 1.05 }}
          >
            Numbers That{' '}
            <span style={{ background: 'linear-gradient(135deg, #60A5FA, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Speak.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-md mx-auto"
          >
            Proven reliability across thousands of checkpoints, ensuring safety with every drop.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="stats-card-shimmer relative p-7 rounded-3xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm hover:bg-white/[0.08] hover:border-blue-500/20 transition-all duration-500 group cursor-default"
            >
              {/* Card inner glow on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}15, transparent 70%)` }} />

              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
                className="text-3xl mb-5"
              >
                {s.icon}
              </motion.div>

              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <Counter value={s.value} suffix={s.suffix} />
              </div>

              <div className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">{s.label}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{s.desc}</div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
