'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Droplets, Sun, Activity, Waves, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function MiniDashCard({ label, value, unit, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl p-4 flex flex-col gap-2 min-w-[130px] border border-gray-100 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <div className="status-dot" style={{ background: color }} />
        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Manrope,Inter,sans-serif' }}>
        {value}<span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
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
      {/* Refined glows for light mode */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.03) 0%, transparent 70%)' }} />
      </div>

      {/* Dynamic Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 -right-24 w-[300px] h-[300px] bg-cyan-100/30 rounded-full blur-[80px]" 
        />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
        className="flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 bg-white/60 border border-blue-100/50"
      >
        <div className="status-dot animate-pulse" />
        <span className="text-xs font-black text-blue-600 tracking-widest uppercase">IoT-Powered Intelligence</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="hero-title text-center font-display font-black leading-[0.95] tracking-tighter mb-8"
        style={{
          fontFamily: 'Manrope, Inter, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
          maxWidth: '1200px',
          color: '#0F172A'
        }}
      >
        Making Water
        <br />
        <span className="gradient-text">Quality Visible.</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8 }}
        className="text-center text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
      >
        Real-time monitoring for the infrastructure we trust. 
        Know your water is safe — <span className="text-gray-900 font-bold">always.</span>
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-20"
      >
        <Link href="/dashboard" className="btn-primary px-8 py-3.5 group">
          View Live Dashboard
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <a href="#solution" className="btn-ghost px-8 py-3.5">
          Learn More
        </a>
      </motion.div>

      {/* Floating Dashboard Mockup */}
      <Link href="/dashboard" className="w-full max-w-5xl block cursor-pointer group/mockup">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
          className="w-full"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative"
          >
            {/* Main dashboard card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 relative overflow-hidden border border-gray-100 group-hover/mockup:border-blue-200 transition-colors"
              style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.1)' }}>
            
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <span className="ml-3 text-xs text-gray-400 font-mono">Device: PS-ALPHA-01</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-dot" />
                <span className="text-xs text-green-600 font-bold">SYSTEM ACTIVE</span>
              </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Water Quality', val: 'SAFE', icon: Droplets, color: '#2563EB', sub: 'TDS: 48 ppm' },
                { label: 'UV Lamp', val: 'Active', icon: Sun, color: '#F59E0B', sub: 'Healthy' },
                { label: 'Filter Life', val: '87%', icon: Activity, color: '#3B82F6', sub: '43 days' },
                { label: 'Flow Rate', val: `${flow}L/m`, icon: Waves, color: '#10B981', sub: 'Normal' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border border-gray-50 bg-gray-50/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-bold">{item.label}</div>
                    <item.icon size={16} color={item.color} strokeWidth={2.5} />
                  </div>
                  <div className="text-2xl font-black" style={{ color: item.color }}>{item.val}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex items-end gap-1.5 h-20 mb-2 px-2">
              {[40, 55, 70, 65, 80, 75, 90, 85, 92, 88, 95, 87, 93, 90, 87, 92, 88, 95, 87, 93, 90, 87, 92, 88].map((h, i) => (
                <motion.div
                  key={i}
                  className="chart-bar flex-1 bg-blue-100"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1 + i * 0.02, duration: 0.6 }}
                />
              ))}
            </div>
          </div>

          {/* Floating side card - left */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-12 top-1/4 bg-white rounded-2xl p-4 hidden md:block border border-gray-100 shadow-xl"
            style={{ minWidth: 160 }}
          >
            <div className="text-xs text-gray-400 mb-1">Maintenance Status</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm font-bold text-gray-900">Next Service: 43d</span>
            </div>
          </motion.div>

          {/* Floating side card - right */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -right-6 top-1/4 bg-white rounded-2xl p-4 hidden md:block border border-gray-100 shadow-xl"
            style={{ minWidth: 160 }}
          >
            <div className="text-xs text-gray-400 mb-1">Auto Shutoff</div>
            <div className="flex items-center gap-2">
              <div className="status-dot" />
              <span className="text-sm font-bold text-gray-900">Protection Active</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>

    {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-blue-500/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
