import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section id="cta" className="py-32 px-6 bg-white overflow-hidden relative">
      <div className="max-w-5xl mx-auto bg-blue-600 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-500/30">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8"
            style={{ fontFamily: 'Manrope,sans-serif', lineHeight: 1.1 }}>
            Ready to Make Your
            <br />
            Water Visible?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            Join the leading universities, hospitals, and offices already using PureSight 
            to guarantee drinking water safety for their people.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/request-demo"
              className="bg-white text-blue-600 hover:bg-blue-50 transition-colors font-bold text-lg px-12 py-5 rounded-2xl shadow-xl shadow-blue-900/20"
            >
              Request Demo Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
