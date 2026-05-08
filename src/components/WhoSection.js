'use client';
import { motion } from 'framer-motion';

const targets = [
  {
    title: 'Universities',
    desc: 'Ensuring thousands of students have access to safe, verified drinking water across campus.',
    image: '🎓',
    color: 'blue'
  },
  {
    title: 'Hospitals',
    desc: 'Critical water quality monitoring for patient safety and medical compliance standards.',
    image: '🏥',
    color: 'cyan'
  },
  {
    title: 'Offices',
    desc: 'Boosting employee wellness with transparent, real-time hydration health tracking.',
    image: '🏢',
    color: 'indigo'
  },
  {
    title: 'Public Spaces',
    desc: 'Building trust in airports, malls, and stations with digital safety certificates.',
    image: '🌍',
    color: 'teal'
  },
];

export default function WhoSection() {
  return (
    <section id="who" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black tracking-widest uppercase mb-6"
          >
            GLOBAL REACH
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Built for Every <span className="gradient-text">Infrastructure.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            PureSight is designed to scale across diverse environments, providing 
            unmatched transparency wherever water is served.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {targets.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Card background hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="text-5xl mb-8 transform group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500">
                  {item.image}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 group-hover:text-gray-600 transition-colors">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore Use Case</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
