'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cta" className="relative py-40 px-4 overflow-hidden" style={{ zIndex: 2 }}>
      {/* Deep cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(20,184,166,0.12) 0%, rgba(2,10,10,0) 70%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 60%)' }} />
        {/* Horizontal light band */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [0.8, 1.1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.5), transparent)', transform: 'translateY(-50%)' }}
        />
        {/* Top & bottom separator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.3), transparent)' }} />
      </div>

      {/* Floating particles (visual only) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${10 + i * 11}%`,
            background: i % 2 === 0 ? 'rgba(20,184,166,0.6)' : 'rgba(6,182,212,0.5)',
            boxShadow: '0 0 10px rgba(20,184,166,0.5)',
          }}
          animate={{ y: [-20, -60, -20], opacity: [0, 1, 0] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-10"
        >
          <div className="status-dot" />
          <span className="text-sm text-white/60">Trusted by institutions across India</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-white leading-none mb-6"
          style={{
            fontFamily: 'Manrope,Inter,sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem,7vw,5.5rem)',
            lineHeight: 1.05,
          }}
        >
          Stop Guessing.
          <br />
          <span className="gradient-text text-glow">Start Verifying.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Join the institutions making water safety transparent, verifiable, and trusted.
          Your first 30 days are on us.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="mailto:hello@puresight.io"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-lg px-10 py-5"
            style={{ fontSize: '1.1rem', boxShadow: '0 0 50px rgba(20,184,166,0.4), 0 4px 20px rgba(20,184,166,0.3)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.93 3.43 2 2 0 0 1 3.91 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Request a Demo
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-ghost text-lg px-10 py-5"
          >
            Explore Features →
          </motion.a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/30"
        >
          {['✓ No credit card required', '✓ 30-day free trial', '✓ Cancel anytime', '✓ Setup in < 30 minutes'].map(t => (
            <span key={t} className="font-medium">{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
