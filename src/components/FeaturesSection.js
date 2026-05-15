'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Droplets, Sun, ClipboardCheck, ShieldCheck, PlugZap } from 'lucide-react';

const features = [
  { icon: Activity, title: 'Real-Time Transparency', desc: 'Every metric visible to admins and users, live. No black boxes. Full purifier visibility at a glance.', color: '#2563EB', gradient: 'from-blue-500/10 to-blue-600/5', delay: 0 },
  { icon: Droplets, title: 'Filter Health Tracking', desc: 'Track filter saturation levels with precise differential sensors. Get alerted before failure.', color: '#0EA5E9', gradient: 'from-sky-500/10 to-sky-600/5', delay: 0.08 },
  { icon: Sun, title: 'UV Lamp Monitoring', desc: 'Continuous UV intensity measurement ensures effectiveness. Auto-shutoff on lamp degradation.', color: '#F59E0B', gradient: 'from-amber-500/10 to-amber-600/5', delay: 0.16 },
  { icon: ClipboardCheck, title: 'Maintenance Logging', desc: 'Immutable timestamped logs of every service event. Audit-ready reports generated automatically.', color: '#8B5CF6', gradient: 'from-violet-500/10 to-violet-600/5', delay: 0.24 },
  { icon: ShieldCheck, title: 'Auto Shutoff Protection', desc: 'Risk detected? PureSight cuts water flow in under 200ms. Zero contamination reaches the consumer.', color: '#EF4444', gradient: 'from-red-500/10 to-red-600/5', delay: 0.32 },
  { icon: PlugZap, title: 'Universal Compatibility', desc: 'Works with 98% of commercial purifiers via a plug-and-monitor IoT collar. No plumbing changes.', color: '#10B981', gradient: 'from-emerald-500/10 to-emerald-600/5', delay: 0.40 },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = feature.icon;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: feature.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="feature-card group"
    >
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.gradient}`}
          style={{ border: `1px solid ${feature.color}25`, color: feature.color }}
        >
          <Icon size={24} strokeWidth={2} />
        </motion.div>

        {/* Number watermark */}
        <div className="absolute top-0 right-0 text-7xl font-black opacity-[0.03] select-none pointer-events-none" style={{ color: feature.color, fontFamily: 'Manrope' }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {feature.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>

        {/* Bottom accent line */}
        <div className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }} />
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="relative py-32 px-4 overflow-hidden" style={{ zIndex: 2 }}>
      {/* Subtle section bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/60 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.1, type: 'spring', bounce: 0.4 }}
            className="section-label mb-6 badge-shine"
          >
            <div className="status-dot" />
            Features
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter"
            style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 900, lineHeight: 1.05 }}>
            Everything You Need
            <br />
            <span className="gradient-text">To Trust Your Water.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
            Six powerful pillars that make PureSight the definitive water safety platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
