'use client';
import { motion } from 'framer-motion';

export default function QuoteSection() {
  return (
    <section className="py-20 bg-white text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-blue-600 font-black tracking-[0.4em] uppercase text-[10px] mb-8">
          The Philosophy
        </div>
        <blockquote className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight italic"
          style={{ fontFamily: 'Manrope,sans-serif' }}>
          "Transparency is the <span className="gradient-text">ultimate</span> filter."
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-gray-200" />
          <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">The PureSight Mission</span>
          <div className="h-px w-8 bg-gray-200" />
        </div>
      </motion.div>
    </section>
  );
}
