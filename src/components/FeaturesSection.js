'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    icon: '📡',
    title: 'Real-Time Transparency',
    desc: 'Every metric visible to admins and users, live. No black boxes. Full purifier visibility at a glance.',
    color: '#2563EB',
    delay: 0,
  },
  {
    icon: '🔵',
    title: 'Filter Health Tracking',
    desc: 'Track filter saturation levels with precise differential sensors. Get alerted before failure.',
    color: '#3B82F6',
    delay: 0.08,
  },
  {
    icon: '☀️',
    title: 'UV Lamp Monitoring',
    desc: 'Continuous UV intensity measurement ensures effectiveness. Auto-shutoff on lamp degradation.',
    color: '#F59E0B',
    delay: 0.16,
  },
  {
    icon: '📋',
    title: 'Maintenance Logging',
    desc: 'Immutable timestamped logs of every service event. Audit-ready reports generated automatically.',
    color: '#8B5CF6',
    delay: 0.24,
  },
  {
    icon: '🛡️',
    title: 'Auto Shutoff Protection',
    desc: 'Risk detected? PureSight cuts water flow in under 200ms. Zero contamination reaches the consumer.',
    color: '#EF4444',
    delay: 0.32,
  },
  {
    icon: '🔌',
    title: 'Universal Compatibility',
    desc: 'Works with 98% of commercial purifiers via a plug-and-monitor IoT collar. No plumbing changes.',
    color: '#10B981',
    delay: 0.40,
  },
];

function FeatureCard({ feature, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: feature.delay, duration: 0.7 }}
      className="feature-card"
    >
      <div className="relative z-10">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm"
          style={{
            background: `${feature.color}10`,
            border: `1px solid ${feature.color}20`,
          }}
        >
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: 'Manrope,sans-serif' }}>
          {feature.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="relative py-32 px-4 bg-gray-50/50" style={{ zIndex: 2 }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-6 border border-blue-100">
            <div className="status-dot" />
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
            style={{ fontFamily: 'Manrope,Inter,sans-serif', fontWeight: 900, lineHeight: 1.1 }}>
            Everything You Need
            <br />
            <span className="gradient-text">To Trust Your Water.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Six powerful pillars that make PureSight the definitive water safety platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} feature={f} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
