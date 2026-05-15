'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useVelocity, useAnimationFrame } from 'framer-motion';
import { Droplets, Sun, Activity, Waves, ArrowRight, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

// Magnetic Button wrapper
function MagneticButton({ children, className, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? Link : motion.div;
  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }} className="inline-block">
      {href
        ? <Link href={href} className={className}>{children}</Link>
        : <div className={className}>{children}</div>}
    </motion.div>
  );
}

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [6, -6]);
  const rotateY = useTransform(springX, [-300, 300], [-6, 6]);
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const [flow, setFlow] = useState(2.4);
  const [tds, setTds] = useState(26.2);
  useEffect(() => {
    const t = setInterval(() => {
      setFlow(f => +(f + (Math.random() - 0.5) * 0.2).toFixed(1));
      setTds(v => +(v + (Math.random() - 0.5) * 0.5).toFixed(1));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  // Word-by-word animation
  const words1 = "Making Water".split(" ");
  const words2 = "Quality Visible.".split(" ");

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* Animated Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="badge-shine flex items-center gap-2.5 glass rounded-full px-5 py-2 mb-10 border border-blue-100/60"
      >
        <div className="status-dot" />
        <span className="text-xs font-black text-blue-600 tracking-[0.2em] uppercase">IoT-Powered Intelligence</span>
        <div className="w-px h-3 bg-blue-200" />
        <span className="text-xs font-semibold text-slate-400">Live System Active</span>
      </motion.div>

      {/* Main Headline with stagger per word */}
      <div className="text-center mb-8" style={{ paddingBottom: '0.15em' }}>
        <div
          className="font-display font-black leading-[0.92] tracking-tighter"
          style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 900, fontSize: 'clamp(3.5rem, 9vw, 8.5rem)', maxWidth: '1200px', color: '#0F172A', paddingBottom: '0.1em' }}
        >
          <div className="flex flex-wrap justify-center gap-x-6 mb-2">
            {words1.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
                style={{ paddingBottom: '0.1em' }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-5">
            {words2.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block gradient-text"
                style={{ paddingBottom: '0.12em' }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="text-center text-lg md:text-xl text-gray-400 max-w-xl mb-12 leading-relaxed"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Real-time monitoring for the infrastructure we trust.{' '}
        <span className="text-gray-800 font-semibold">Know your water is safe — always.</span>
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-20"
      >
        <MagneticButton href="/dashboard" className="btn-primary px-8 py-3.5 group text-sm">
          View Live Dashboard
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
        </MagneticButton>
        <MagneticButton href="#solution" className="btn-ghost px-8 py-3.5 text-sm">
          How it Works
        </MagneticButton>
      </motion.div>

      {/* 3D Dashboard Mockup */}
      <Link href="/dashboard" className="w-full max-w-5xl block cursor-pointer group/mockup">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1400 }}
          className="w-full"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative"
          >
            {/* Dashboard card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 relative overflow-hidden border border-gray-100/80 group-hover/mockup:border-blue-200 transition-all duration-500"
              style={{ boxShadow: '0 50px 120px rgba(0,0,0,0.07), 0 20px 40px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)' }}>

              {/* Top bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-300" />
                  <div className="w-3 h-3 rounded-full bg-yellow-300" />
                  <div className="w-3 h-3 rounded-full bg-green-300" />
                  <span className="ml-3 text-xs text-gray-400 font-mono">puresight://device/PS-ALPHA-01</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <div className="status-dot" />
                  <span className="text-xs text-emerald-700 font-bold">SYSTEM ACTIVE</span>
                </div>
              </div>

              {/* Content grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Water Quality', val: 'SAFE', icon: Shield, color: '#2563EB', bg: '#EFF6FF', sub: 'All params OK' },
                  { label: 'UV Lamp', val: 'Active', icon: Sun, color: '#D97706', bg: '#FFFBEB', sub: 'Healthy' },
                  { label: 'TDS Level', val: `${tds}`, icon: Activity, color: '#3B82F6', bg: '#EFF6FF', sub: 'ppm' },
                  { label: 'Flow Rate', val: `${flow}`, icon: Waves, color: '#10B981', bg: '#ECFDF5', sub: 'L/min' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.08, duration: 0.6 }}
                    className="p-4 rounded-2xl border"
                    style={{ background: item.bg, borderColor: `${item.color}20` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{item.label}</div>
                      <item.icon size={14} color={item.color} strokeWidth={2.5} />
                    </div>
                    <div className="text-xl font-black tracking-tight" style={{ color: item.color }}>{item.val}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{item.sub}</div>
                  </motion.div>
                ))}
              </div>

              {/* Chart area */}
              <div className="flex items-end gap-1 h-16 px-1 mb-1">
                {[40, 55, 70, 65, 80, 75, 90, 85, 92, 88, 95, 87, 93, 90, 87, 92, 88, 95, 87, 93, 90, 87, 92, 88, 90, 94, 88, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    className="chart-bar flex-1"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1.2 + i * 0.015, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </div>
            </div>

            {/* Floating badge — left */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-14 top-1/3 float-gentle bg-white rounded-2xl p-4 hidden md:block border border-gray-100 shadow-xl shadow-black/5"
              style={{ minWidth: 165 }}
            >
              <div className="text-[10px] text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Next Service</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-bold text-gray-900">43 days away</span>
              </div>
            </motion.div>

            {/* Floating badge — right */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute -right-8 top-1/3 bg-white rounded-2xl p-4 hidden md:block border border-gray-100 shadow-xl shadow-black/5"
              style={{ minWidth: 165 }}
            >
              <div className="text-[10px] text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">Auto-Shutoff</div>
              <div className="flex items-center gap-2">
                <div className="status-dot" />
                <span className="text-sm font-bold text-gray-900">Protection Active</span>
              </div>
            </motion.div>

            {/* Floating badge — bottom-left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute -left-8 bottom-12 bg-blue-600 rounded-2xl p-3.5 hidden md:block shadow-xl shadow-blue-500/30"
              style={{ minWidth: 145 }}
            >
              <div className="text-[10px] text-blue-200 mb-1 font-bold uppercase tracking-wider">Quality Score</div>
              <div className="text-xl font-black text-white">99.8%</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-300 font-bold tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-blue-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
