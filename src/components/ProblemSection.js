'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const problems = [
  { icon: '⚠️', label: 'Unknown condition', desc: 'No way to know if the filter is clogged' },
  { icon: '☣️', label: 'Unsafe water', desc: 'Contaminated water served without warning' },
  { icon: '🚫', label: 'Zero transparency', desc: 'Institutions have no visibility into health' },
  { icon: '🔕', label: 'No monitoring', desc: 'Failures go undetected for weeks' },
];

const solutions = [
  { icon: '✅', label: 'Live status', desc: 'Real-time data visible from every unit' },
  { icon: '🛡️', label: 'Verified safe', desc: 'Digital quality certificates for every cup' },
  { icon: '📡', label: 'IoT monitoring', desc: 'Sensors stream data 24/7' },
  { icon: '📋', label: 'Accountability', desc: 'Immutable logs and automated alerts' },
];

function ProblemCard({ item, index, side }) {
  const isDanger = side === 'left';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex items-start gap-4 p-4 rounded-xl"
      style={{
        background: isDanger ? 'rgba(239, 68, 68, 0.03)' : 'rgba(37, 99, 235, 0.03)',
        border: `1px solid ${isDanger ? 'rgba(239, 68, 68, 0.08)' : 'rgba(37, 99, 235, 0.08)'}`,
      }}
    >
      <div className="text-xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg"
        style={{ background: isDanger ? 'rgba(239, 68, 68, 0.08)' : 'rgba(37, 99, 235, 0.08)' }}>
        {item.icon}
      </div>
      <div>
        <div className="font-bold text-gray-900 text-sm mb-0.5">{item.label}</div>
        <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="problem" className="relative py-32 px-4 bg-gray-50/30" style={{ zIndex: 2 }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-6 border border-blue-100">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">The Problem</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
            style={{ fontFamily: 'Manrope,Inter,sans-serif', fontWeight: 900, lineHeight: 1.1 }}>
            People Drink Water
            <br />
            <span className="text-red-500">Blindly.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Traditional purifiers are black boxes. Without monitoring, no one knows 
            if the water is truly safe. PureSight brings transparency to every drop.
          </p>
        </motion.div>

        {/* Split comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left — Problem */}
          <div className="bg-white rounded-[32px] p-2 border border-gray-100 shadow-sm">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-bold text-red-500 tracking-wide uppercase">Traditional System</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {problems.map((p, i) => (
                  <ProblemCard key={i} item={p} index={i} side="left" />
                ))}
              </div>
              <div className="mt-8 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3">
                <span className="text-lg">❌</span>
                <span className="text-sm text-red-600 font-bold tracking-tight">Condition: UNKNOWN — High Risk Detected</span>
              </div>
            </div>
          </div>

          {/* Right — Solution */}
          <div className="bg-white rounded-[32px] p-2 border border-blue-100 shadow-xl shadow-blue-500/5">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-bold text-blue-600 tracking-wide uppercase">PureSight Intelligence</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {solutions.map((s, i) => (
                  <ProblemCard key={i} item={s} index={i} side="right" />
                ))}
              </div>
              <div className="mt-8 p-4 rounded-2xl bg-green-50 border border-green-100 flex items-center gap-3">
                <span className="text-lg">✅</span>
                <span className="text-sm text-green-700 font-bold tracking-tight">Condition: VERIFIED SAFE — 24/7 Monitoring</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mt-20 flex flex-wrap justify-center gap-6">
          {[
            { num: '2.1B', label: 'lack safe water', color: '#EF4444' },
            { num: '90%', label: 'failures go undetected', color: '#F59E0B' },
            { num: 'Real-time', label: 'IoT verification', color: '#10B981' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
              className="bg-white border border-gray-100 px-8 py-6 rounded-2xl text-center min-w-[200px]"
            >
              <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.num}</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
