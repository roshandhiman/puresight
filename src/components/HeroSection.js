'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function MiniDashCard({ label, value, unit, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl p-4 flex flex-col gap-2 min-w-[130px]"
      style={{ border: `1px solid ${color}30` }}
    >
      <div className="flex items-center gap-2">
        <div className="status-dot" style={{ background: color, boxShadow: `0 0 10px ${color}80` }} />
        <span className="text-xs text-white/50 font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope,Inter,sans-serif' }}>
        {value}<span className="text-sm font-normal text-white/40 ml-1">{unit}</span>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-300, 300], [-8, 8]);

  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const [filterPct, setFilterPct] = useState(87);
  const [flow, setFlow] = useState(2.4);
  useEffect(() => {
    const t = setInterval(() => {
      setFlow(f => +(f + (Math.random() - 0.5) * 0.2).toFixed(1));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { label: 'UV Lamp', value: 'Active', unit: '', color: '#3B82F6', delay: 0.9 },
    { label: 'Filter Health', value: filterPct, unit: '%', color: '#60A5FA', delay: 1.0 },
    { label: 'Water Flow', value: flow, unit: 'L/min', color: '#93C5FD', delay: 1.1 },
    { label: 'Status', value: 'SAFE', unit: '', color: '#10b981', delay: 1.2 },
  ];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* Mesh radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(96,165,250,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 70%)' }} />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
      >
        <div className="status-dot" />
        <span className="text-sm font-medium text-white/70">IoT-Powered Water Intelligence Platform</span>
        <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full text-teal-400"
          style={{ background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.3)' }}>
          NEW
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="hero-title text-center font-display font-black leading-none tracking-tight mb-6"
        style={{
          fontFamily: 'Manrope, Inter, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          lineHeight: 1.02,
          maxWidth: '1100px',
        }}
      >
        <span className="gradient-text-white">Making Water</span>
        <br />
        <span className="gradient-text text-glow">Quality Visible.</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center text-lg md:text-xl text-white/50 max-w-2xl mb-10 leading-relaxed"
        style={{ fontWeight: 400 }}
      >
        Real-time purifier monitoring for universities, hospitals, airports, offices,
        and public spaces. Know your water is safe — always.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-20"
      >
        <a href="#cta" className="btn-primary text-base px-8 py-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Request Demo
        </a>
        <a href="#solution" className="btn-ghost text-base px-8 py-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Learn More
        </a>
      </motion.div>

      {/* Floating Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1200 }}
        className="w-full max-w-4xl"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative"
        >
          {/* Main dashboard card */}
          <div className="glass-strong rounded-3xl p-6 md:p-8 relative overflow-hidden"
            style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(20,184,166,0.12), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
            {/* Scan line */}
            <div className="scan-line" />

            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-teal-400/60" />
                <span className="ml-3 text-sm text-white/30 font-mono">PureSight Monitor v2.4</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-dot" />
                <span className="text-xs text-teal-400 font-medium">LIVE</span>
              </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Water Quality', val: 'SAFE', icon: '💧', color: '#60A5FA', sub: 'TDS: 48 ppm' },
                { label: 'UV Lamp', val: 'Active', icon: '☀️', color: '#f59e0b', sub: '254nm output' },
                { label: 'Filter Life', val: '87%', icon: '🔵', color: '#3B82F6', sub: '43 days left' },
                { label: 'Flow Rate', val: `${flow}L/m`, icon: '〰️', color: '#10b981', sub: 'Optimal' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="dashboard-widget text-center"
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs text-white/40 mb-1">{item.label}</div>
                  <div className="text-lg font-bold font-mono" style={{ color: item.color }}>{item.val}</div>
                  <div className="text-xs text-white/30 mt-1">{item.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex items-end gap-1.5 h-16 mb-2 px-2">
              {[40, 55, 70, 65, 80, 75, 90, 85, 92, 88, 95, 87, 93, 90, 87].map((h, i) => (
                <motion.div
                  key={i}
                  className="chart-bar flex-1"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1 + i * 0.05, duration: 0.6 }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-white/20 font-mono px-2">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
            </div>
          </div>

          {/* Floating side card - left */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-8 top-1/3 glass rounded-2xl p-4 hidden md:block"
            style={{ border: '1px solid rgba(59,130,246,0.2)', minWidth: 150 }}
          >
            <div className="text-xs text-white/40 mb-2">Maintenance Alert</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-sm text-yellow-300 font-medium">Filter due in 43d</span>
            </div>
          </motion.div>

          {/* Floating side card - right */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -right-6 top-1/4 glass rounded-2xl p-4 hidden md:block"
            style={{ border: '1px solid rgba(6,182,212,0.2)', minWidth: 140 }}
          >
            <div className="text-xs text-white/40 mb-2">Auto Shutoff</div>
            <div className="flex items-center gap-2">
              <div className="status-dot" />
              <span className="text-sm text-teal-400 font-medium">Protection ON</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-teal-500/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
