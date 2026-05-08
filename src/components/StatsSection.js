'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function CountUp({ end, suffix = '', prefix = '', decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setVal(decimals ? v.toFixed(decimals) : Math.round(v)),
    });
    return controls.stop;
  }, [inView, end, decimals]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

const stats = [
  { num: 240, suffix: '+', label: 'Devices Deployed', sub: 'Across 4 pilot campuses', color: '#14b8a6' },
  { num: 99.9, suffix: '%', label: 'System Uptime', sub: 'SLA guaranteed', color: '#2dd4bf', decimals: 1 },
  { num: 200, suffix: 'ms', label: 'Shutoff Response', sub: 'From risk detection to action', color: '#06b6d4' },
  { num: 72, suffix: 'h', label: 'Predictive Warning', sub: 'Before filter failure', color: '#10b981' },
  { num: 2400, suffix: '+', label: 'Users Protected', sub: 'Daily active users on pilot', color: '#8b5cf6' },
  { num: 0, suffix: '', prefix: '₹', label: 'Setup Cost', sub: 'Hardware-free SaaS model', color: '#f59e0b' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 px-4 overflow-hidden" style={{ zIndex: 2 }}>
      {/* Separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-5">
            <span className="text-xs font-semibold text-teal-400 tracking-widest uppercase">By The Numbers</span>
          </div>
          <h2 className="font-display font-black text-white"
            style={{ fontFamily: 'Manrope,Inter,sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)', lineHeight: 1.15 }}>
            Numbers That Speak.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="p-6 rounded-2xl text-center relative group cursor-default"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${s.color}20`,
              }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `radial-gradient(ellipse at 50% 50%, ${s.color}08 0%, transparent 70%)` }} />

              <div className="relative z-10">
                <div className="text-4xl md:text-5xl font-black mb-2"
                  style={{ color: s.color, fontFamily: 'Manrope,sans-serif', textShadow: `0 0 30px ${s.color}60` }}>
                  <CountUp end={s.num} suffix={s.suffix} prefix={s.prefix || ''} decimals={s.decimals || 0} />
                </div>
                <div className="text-sm font-semibold text-white/80 mb-1">{s.label}</div>
                <div className="text-xs text-white/35">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
