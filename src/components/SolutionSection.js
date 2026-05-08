'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Deploy IoT Sensors',
    desc: 'Ultra-compact sensors attach to any purifier in minutes. No hardware changes needed. Plug-and-monitor.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Real-Time Data Streams',
    desc: 'Every sensor streams filter pressure, UV intensity, flow rate, and TDS levels to our cloud platform — every 5 seconds.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1.5 8.5C3.5 3.5 20.5 3.5 22.5 8.5" /><path d="M4 13c1.5-3.5 15-3.5 16.5 0" /><circle cx="12" cy="17.5" r="2" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'AI-Powered Analysis',
    desc: 'Our ML engine detects anomalies, predicts filter failure 72 hours in advance, and triggers auto-shutoff on risk detection.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Dashboard & Alerts',
    desc: 'Admins get a live dashboard with device health maps, maintenance logs, and instant alerts via SMS, email, or app.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="solution" className="relative py-32 px-4 overflow-hidden" style={{ zIndex: 2 }}>
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(20,184,166,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <div className="status-dot" />
            <span className="text-xs font-semibold text-teal-400 tracking-widest uppercase">The Solution</span>
          </div>
          <h2 className="font-display font-black text-white mb-4"
            style={{ fontFamily: 'Manrope,Inter,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.1 }}>
            Introducing{' '}
            <span className="gradient-text text-glow">PureSight</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A complete IoT intelligence layer for water purifiers. From sensor to insight in under 5 seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(20,184,166,0.3) 20%, rgba(20,184,166,0.3) 80%, transparent)' }} />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${isRight ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Card */}
                  <div className="flex-1 feature-card group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-teal-400 transition-all duration-300 group-hover:scale-110"
                        style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-teal-500/60 tracking-widest mb-2">{step.num}</div>
                        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Manrope,sans-serif' }}>{step.title}</h3>
                        <p className="text-white/50 leading-relaxed text-sm">{step.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="hidden lg:flex w-14 h-14 flex-shrink-0 rounded-full items-center justify-center z-10"
                    style={{
                      background: 'linear-gradient(135deg,#14b8a6,#06b6d4)',
                      boxShadow: '0 0 30px rgba(20,184,166,0.5)',
                    }}>
                    <span className="text-white font-black text-sm" style={{ fontFamily: 'Manrope,sans-serif' }}>{step.num}</span>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-20 glass-strong rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Manrope,sans-serif' }}>
              Compatible with <span className="gradient-text">any purifier brand.</span>
            </div>
            <div className="text-white/50 text-sm">Works with Aquaguard, Kent, Pureit, Bisleri stations and more.</div>
          </div>
          <a href="#cta" className="btn-primary whitespace-nowrap">Get Started Free →</a>
        </motion.div>
      </div>
    </section>
  );
}
