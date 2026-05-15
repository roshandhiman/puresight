import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function AmbientBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#F8FAFC]">
      {/* 1. OPTIMIZED AURORA LAYER (CSS Animated for extreme smoothness) */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply">
        <div className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] rounded-full bg-blue-400/20 blur-[120px] animate-fluid-slow" />
        <div className="absolute -bottom-[5%] -right-[5%] w-[70%] h-[70%] rounded-full bg-cyan-400/20 blur-[100px] animate-fluid-medium" />
      </div>

      {/* 2. SUBTLE TECH GRID */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* 3. LIGHTWEIGHT SCATTERED ORBS */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Orb key={i} index={i} />
        ))}
      </div>
      
      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.15)_100%)]" />
    </div>
  );
}

function Orb({ index }) {
  // Scattered initial positions
  const initialLeft = (index * 137) % 100;
  const initialTop = (index * 263) % 100;
  const size = 5 + (index % 4) * 1.5;
  
  // Large, randomized movement paths
  const xMovement = [0, (index % 2 === 0 ? 120 : -120), 0];
  const yMovement = [0, (index % 3 === 0 ? -150 : 150), 0];
  
  return (
    <motion.div
      initial={{ left: `${initialLeft}%`, top: `${initialTop}%`, opacity: 0 }}
      animate={{ 
        x: xMovement,
        y: yMovement,
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.3, 1]
      }}
      transition={{
        duration: 15 + (index % 15),
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3
      }}
      className="absolute rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]"
      style={{
        width: size,
        height: size,
        backgroundColor: '#3b82f6',
        willChange: 'transform, opacity'
      }}
    />
  );
}
