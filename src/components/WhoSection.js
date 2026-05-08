'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const verticals = [
  { icon: '🎓', label: 'Universities', desc: 'Campus-wide monitoring across hundreds of units', color: '#14b8a6' },
  { icon: '🏥', label: 'Hospitals', desc: 'Medical-grade water safety compliance & audit trails', color: '#06b6d4' },
  { icon: '✈️', label: 'Airports', desc: 'Terminal-level monitoring for millions of passengers', color: '#8b5cf6' },
  { icon: '🚉', label: 'Railway Stations', desc: 'Decentralized fleet management across multiple stations', color: '#f59e0b' },
  { icon: '🏢', label: 'Corporate Offices', desc: 'Employee health confidence with monthly SLA reports', color: '#10b981' },
  { icon: '🏛️', label: 'Government Buildings', desc: 'Compliance-ready water safety for public institutions', color: '#ec4899' },
];

export default function WhoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="who" className="relative py-32 px-4 overflow-hidden" style={{ zIndex: 2 }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(20,184,166,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <div className="status-dot" />
            <span className="text-xs font-semibold text-teal-400 tracking-widest uppercase">Who It's For</span>
          </div>
          <h2 className="font-display font-black text-white mb-4"
            style={{ fontFamily: 'Manrope,Inter,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.1 }}>
            Built For Every
            <br />
            <span className="gradient-text">Public Space.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            From a university cafeteria to a busy airport terminal — PureSight scales to every environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {verticals.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative p-6 rounded-2xl cursor-default overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${v.color}12 0%, transparent 70%)` }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${v.color}80, transparent)` }} />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl mb-4 inline-block"
                >
                  {v.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Manrope,sans-serif' }}>
                  {v.label}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">{v.desc}</p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: v.color }} />
                  <span className="text-xs font-medium" style={{ color: v.color }}>PureSight Ready</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial / social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-16 glass-strong rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
              🎓
            </div>
          </div>
          <div className="flex-1">
            <p className="text-white/80 text-lg leading-relaxed italic mb-3">
              "PureSight transformed how we manage water safety across our 4 campuses.
              We went from zero visibility to real-time monitoring of 240 purifier units overnight."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-sm">👤</div>
              <div>
                <div className="text-sm font-semibold text-white">Dr. Priya Menon</div>
                <div className="text-xs text-white/40">Head of Facilities, IIT Bombay (Pilot Partner)</div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1">
            {[1,2,3,4,5].map(s => (
              <span key={s} className="text-xl">⭐</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
