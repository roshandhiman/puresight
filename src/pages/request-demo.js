'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RequestDemo() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Oops! There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60 animate-fluid-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60 animate-fluid-medium" />
      </div>

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-xl mx-auto">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors mb-12 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
          </Link>

          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Let's Make Your <br />
                <span className="gradient-text">Water Visible.</span>
              </h1>
              <p className="text-gray-500 text-lg mb-10 font-medium">
                Fill out the form below and our team will get in touch to schedule a personalized demo.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Full Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="Enter your full name"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Work Email</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="email@organization.com"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Phone Number (Optional)</label>
                    <input 
                      name="phone"
                      type="tel" 
                      placeholder="+91 00000-00000"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Message (Optional)</label>
                    <textarea 
                      name="message"
                      rows="4" 
                      placeholder="Tell us about your requirements..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-base resize-none"
                    ></textarea>
                  </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full btn-primary py-5 text-lg shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Request Received!
              </h2>
              <p className="text-gray-500 text-lg mb-10 font-medium max-w-sm mx-auto">
                Thank you for your interest in PureSight. Our team will review your request and get back to you within 24 hours.
              </p>
              <Link href="/" className="btn-ghost px-10 py-4 font-bold">
                Return to Homepage
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
