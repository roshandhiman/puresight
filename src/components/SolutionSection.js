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
    <section id="solution" className="relative py-32 px-4 bg-white" style={{ zIndex: 2 }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-6 border border-blue-100">
            <div className="status-dot" />
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">The Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
            style={{ fontFamily: 'Manrope,Inter,sans-serif', fontWeight: 900, lineHeight: 1.1 }}>
            Introducing <span className="gradient-text">PureSight</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            A complete IoT intelligence layer for water purifiers. From sensor to insight in under 5 seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block bg-gray-100" />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${isRight ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Card */}
                  <div className="flex-1 p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 bg-blue-50 border border-blue-100 transition-transform group-hover:scale-110">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-xs font-black text-blue-500 tracking-widest mb-2 uppercase">{step.num}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Manrope,sans-serif' }}>{step.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="hidden lg:flex w-14 h-14 flex-shrink-0 rounded-full items-center justify-center z-10 bg-blue-600 shadow-lg shadow-blue-500/20">
                    <span className="text-white font-black text-sm" style={{ fontFamily: 'Manrope,sans-serif' }}>{step.num}</span>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-24 p-10 rounded-[40px] bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <div className="text-2xl font-black text-gray-900 mb-2">
              Compatible with <span className="gradient-text">any purifier brand.</span>
            </div>
            <div className="text-gray-500 font-medium">Works with Aquaguard, Kent, Pureit, and Bisleri stations.</div>
          </div>
          <a href="#cta" className="btn-primary px-8 py-4 whitespace-nowrap shadow-xl shadow-blue-500/20">
            Get Started Free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
