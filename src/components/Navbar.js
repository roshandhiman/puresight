'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Problem', href: '#problem' },
    { label: 'Solution', href: '#solution' },
    { label: 'Features', href: '#features' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Who', href: '#who' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.8)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Using the logo.png from the public directory */}
            <img src="/logo.png" alt="PureSight Logo" className="w-full h-full object-contain relative z-10" />
            <div className="absolute inset-0 rounded-xl animate-pulse-slow opacity-10" style={{ background: '#3B82F6', filter: 'blur(8px)' }} />
          </div>
          <span className="font-display font-800 text-xl tracking-tight text-gray-900"
            style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 800 }}>
            Pure<span className="gradient-text">Sight</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} className="nav-link animated-underline">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#contact" className="btn-ghost text-sm px-5 py-2.5">Log In</a>
          <a href="#cta" className="btn-primary text-sm px-5 py-2.5">Request Demo</a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span className="block w-6 h-0.5 bg-gray-900 rounded"
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }} />
          <motion.span className="block w-6 h-0.5 bg-gray-900 rounded"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
          <motion.span className="block w-6 h-0.5 bg-gray-900 rounded"
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }} />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-4 right-4 z-40 glass rounded-2xl p-6 flex flex-col gap-4"
          >
            {links.map(l => (
              <a key={l.label} href={l.href}
                className="text-gray-700 font-medium py-2 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="#cta" className="btn-primary text-center mt-2" onClick={() => setMenuOpen(false)}>
              Request Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
