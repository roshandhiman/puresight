'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const problems = [
  { icon: '⚠️', label: 'Unknown filter condition', desc: 'No way to know if the filter is clogged or expired' },
  { icon: '☣️', label: 'Unsafe water risk', desc: 'Contaminated water served without any warning system' },
  { icon: '🚫', label: 'Zero transparency', desc: 'Institutions have no visibility into purifier health' },
  { icon: '🔕', label: 'No monitoring', desc: 'Failures go undetected for days or weeks' },
];

const solutions = [
  { icon: '✅', label: 'Live purifier status', desc: 'Real-time data from every purifier unit, always visible' },
  { icon: '🛡️', label: 'Verified safe water', desc: 'Cryptographically signed quality certificates per session' },
  { icon: '📡', label: 'Real-time monitoring', desc: 'IoT sensors stream data every 5 seconds, 24/7' },
  { icon: '📋', label: 'Full accountability', desc: 'Immutable maintenance logs and automatic alerts' },
];

function ProblemCard({ item, index, side }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isDanger = side === 'left';
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300"
      style={{
        background: isDanger ? 'rgba(239,68,68,0.04)' : 'rgba(20,184,166,0.04)',
        border: `1px solid ${isDanger ? 'rgba(239,68,68,0.12)' : 'rgba(20,184,166,0.12)'}`,
      }}
    >
      <div className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl"
        style={{ background: isDanger ? 'rgba(239,68,68,0.1)' : 'rgba(20,184,166,0.1)' }}>
        {item.icon}
      </div>
      <div>
        <div className="font-semibold text-white/90 text-sm mb-0.5">{item.label}</div>
        <div className="text-xs text-white/40 leading-relaxed">{item.desc}</div>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="problem" className="relative py-32 px-4 overflow-hidden" style={{ zIndex: 2 }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2"
          style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2"
          style={{ background: 'radial-gradient(ellipse, rgba(20,184,166,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-xs font-semibold text-red-400 tracking-widest uppercase">The Problem</span>
          </div>
          <h2 className="section-title font-display font-black text-white mb-4"
            style={{ fontFamily: 'Manrope,Inter,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.1 }}>
            People Drink Water
            <br />
            <span style={{ color: '#f87171' }}>Blindly.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Without PureSight, no one knows if the purifier they trust is actually working.
            It's a silent risk affecting millions daily.
          </p>
        </motion.div>

        {/* Split comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left — Problem */}
          <div className="rounded-3xl overflow-hidden"
            style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <div className="flex items-center gap-3 px-6 py-5 border-b border-red-500/10">
              <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
              <span className="text-sm font-bold text-red-400 tracking-wide uppercase">Traditional Purifier</span>
            </div>
            <div className="p-6 flex flex-col gap-3">
              {problems.map((p, i) => (
                <ProblemCard key={i} item={p} index={i} side="left" />
              ))}
            </div>

            {/* Warning badge */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-6 mb-6 px-4 py-3 rounded-xl flex items-center gap-3"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <span className="text-lg">🔴</span>
              <span className="text-sm text-red-300 font-semibold">Status: UNKNOWN — Risk Undetected</span>
            </motion.div>
          </div>

          {/* Right — Solution */}
          <div className="rounded-3xl overflow-hidden"
            style={{ background: 'rgba(20,184,166,0.03)', border: '1px solid rgba(20,184,166,0.2)' }}>
            <div className="flex items-center gap-3 px-6 py-5 border-b border-teal-500/15">
              <div className="status-dot" />
              <span className="text-sm font-bold text-teal-400 tracking-wide uppercase">PureSight</span>
            </div>
            <div className="p-6 flex flex-col gap-3">
              {solutions.map((s, i) => (
                <ProblemCard key={i} item={s} index={i} side="right" />
              ))}
            </div>

            {/* Safe badge */}
            <motion.div
              animate={{ boxShadow: ['0 0 15px rgba(20,184,166,0.15)', '0 0 35px rgba(20,184,166,0.35)', '0 0 15px rgba(20,184,166,0.15)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="mx-6 mb-6 px-4 py-3 rounded-xl flex items-center gap-3"
              style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.3)' }}
            >
              <span className="text-lg">🟢</span>
              <span className="text-sm text-teal-300 font-semibold">Status: VERIFIED SAFE — 99.9% Uptime</span>
            </motion.div>
          </div>
        </div>

        {/* Divider stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 glass rounded-2xl px-8 py-5">
            {[
              { num: '2.1B', label: 'people lack safe drinking water', color: '#f87171' },
              { num: '90%', label: 'of purifier failures go unnoticed', color: '#fbbf24' },
              { num: '0', label: 'real-time monitoring systems in public spaces', color: '#94a3b8' },
            ].map((s, i) => (
              <div key={i} className="text-center px-4 border-r border-white/5 last:border-0">
                <div className="text-3xl font-black mb-1" style={{ color: s.color, fontFamily: 'Manrope,sans-serif' }}>{s.num}</div>
                <div className="text-xs text-white/40 max-w-[120px]">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
