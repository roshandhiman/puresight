'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    icon: '📡',
    title: 'Real-Time Transparency',
    desc: 'Every metric visible to admins and users, live. No black boxes. Full purifier visibility at a glance.',
    color: '#14b8a6',
    delay: 0,
  },
  {
    icon: '🔵',
    title: 'Filter Health Tracking',
    desc: 'Track filter saturation levels with precise pressure differential sensors. Get alerted 72 hours before failure.',
    color: '#06b6d4',
    delay: 0.08,
  },
  {
    icon: '☀️',
    title: 'UV Lamp Monitoring',
    desc: 'Continuous UV intensity measurement ensures germicidal effectiveness. Auto-shutoff on lamp degradation.',
    color: '#f59e0b',
    delay: 0.16,
  },
  {
    icon: '📋',
    title: 'Maintenance Logging',
    desc: 'Immutable timestamped logs of every service event. Audit-ready reports generated automatically.',
    color: '#8b5cf6',
    delay: 0.24,
  },
  {
    icon: '🛡️',
    title: 'Auto Shutoff Protection',
    desc: 'Risk detected? PureSight cuts water flow in under 200ms. Zero contamination reaches the consumer.',
    color: '#ef4444',
    delay: 0.32,
  },
  {
    icon: '🔌',
    title: 'Universal Compatibility',
    desc: 'Works with 98% of commercial purifiers via a plug-and-monitor IoT collar. No plumbing changes required.',
    color: '#10b981',
    delay: 0.40,
  },
];

function FeatureCard({ feature, inView }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: feature.delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="feature-card group cursor-default"
      style={{
        '--color': feature.color,
        background: 'rgba(255,255,255,0.025)',
      }}
    >
      {/* Spotlight hover */}
      <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(200px circle at var(--mx,50%) var(--my,50%), ${feature.color}18, transparent 70%)`,
        }} />

      {/* Animated border top */}
      <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.color}80, transparent)` }} />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-all duration-300"
          style={{
            background: `${feature.color}15`,
            border: `1px solid ${feature.color}30`,
            boxShadow: `0 0 20px ${feature.color}20`,
          }}
        >
          {feature.icon}
        </motion.div>

        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors"
          style={{ fontFamily: 'Manrope,sans-serif' }}>
          {feature.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed">{feature.desc}</p>

        {/* Arrow on hover */}
        <motion.div
          initial={{ opacity: 0, x: -4 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="mt-4 flex items-center gap-1 text-sm font-medium"
          style={{ color: feature.color }}
        >
          <span>Learn more</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="relative py-32 px-4 overflow-hidden" style={{ zIndex: 2 }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse, rgba(20,184,166,0.05) 0%, transparent 70%)' }} />
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
            <span className="text-xs font-semibold text-teal-400 tracking-widest uppercase">Features</span>
          </div>
          <h2 className="font-display font-black text-white mb-4"
            style={{ fontFamily: 'Manrope,Inter,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.1 }}>
            Everything You Need
            <br />
            <span className="gradient-text">To Trust Your Water.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Six powerful pillars that make PureSight the definitive water safety platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} feature={f} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
