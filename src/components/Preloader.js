import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Increase duration slightly for a more premium "slow" feel
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
          {/* LEFT CURTAIN */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
            className="absolute inset-y-0 left-0 w-1/2 bg-white z-10 border-r border-slate-50"
          />
          
          {/* RIGHT CURTAIN */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
            className="absolute inset-y-0 right-0 w-1/2 bg-white z-10 border-l border-slate-50"
          />

          {/* THE LOGO FLIGHT */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ 
                x: '-42vw', // Estimated movement to top-left
                y: '-42vh',
                scale: 0.4,
                opacity: 0,
                transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] }
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full" />
                <img 
                  src="/logo.png" 
                  alt="PureSight" 
                  className="w-32 h-32 md:w-48 md:h-48 object-contain relative z-10 drop-shadow-2xl"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 flex flex-col items-center"
              >
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                  Pure<span className="text-blue-500">Sight</span>
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
                    Excellence in Clarity
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
