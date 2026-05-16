import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A0F1C] pt-32 pb-12 px-6 relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative w-11 h-11 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 logo-container" style={{ background: '#0EA5E9', padding: '4px' }}>
                <img src="/logo.png" alt="PureSight Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-2xl text-white tracking-tight">PureSight</span>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm mb-8 font-medium">
              Revolutionizing water safety with IoT intelligence. Making the invisible, visible.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a href="mailto:shreshthtamcoretech@gmail.com" className="text-gray-500 hover:text-white transition-all flex items-center gap-2 group/social">
                <div className="p-2 rounded-lg bg-white/5 group-hover/social:bg-blue-500/10 transition-colors">
                  <Mail size={18} className="group-hover/social:text-blue-500 transition-colors" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Gmail</span>
              </a>
              <a href="tel:+919056747180" className="text-gray-500 hover:text-white transition-all flex items-center gap-2 group/social">
                <div className="p-2 rounded-lg bg-white/5 group-hover/social:bg-emerald-500/10 transition-colors">
                  <Phone size={18} className="group-hover/social:text-emerald-500 transition-colors" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Phone</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Solution</h4>
            <ul className="space-y-4">
              <li><Link href="/#features" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Features</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Dashboard</Link></li>
              <li><Link href="/#solution" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Hardware</Link></li>
              <li><Link href="/#cases" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Case Studies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Company</h4>
            <ul className="space-y-4">
              {['Our Story', 'Careers', 'Press Kit', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
            2026 PURESIGHT TECHNOLOGIES PVT. LTD. — ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-8 text-gray-500 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
