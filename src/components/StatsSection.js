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

  return (
    <span ref={ref}>
      {formattedValue}{suffix}
    </span>
  );
}

const stats = [
  { label: 'System Uptime', value: '99.9', suffix: '%', icon: '⚡', color: '#60A5FA' },
  { label: 'Purifiers Monitored', value: '1200', suffix: '+', icon: '📡', color: '#93C5FD' },
  { label: 'Liters Verified', value: '45', suffix: 'M+', icon: '💧', color: '#BFDBFE' },
  { label: 'Active Sites', value: '85', suffix: '', icon: '🏢', color: '#DBEAFE' },
];

export default function StatsSection() {
  return (
    <section className="py-32 bg-[#0F172A] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3B82F6 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-400 font-black tracking-[0.3em] uppercase text-xs mb-4"
          >
            Our Impact
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Manrope,sans-serif' }}>
            Numbers That <span className="text-blue-500">Speak.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto font-medium">
            Proven reliability across thousands of checkpoints, ensuring safety with every drop.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 group"
            >
              <div className="text-3xl mb-6 transform group-hover:scale-125 transition-transform duration-500">
                {s.icon}
              </div>
              <div className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tighter">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                {s.label}
              </div>
              
              {/* Subtle accent glow */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
