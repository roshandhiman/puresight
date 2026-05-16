import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, 
  Sun, 
  Activity, 
  Waves, 
  CheckCircle2, 
  ArrowLeft, 
  Thermometer, 
  Info,
  Clock,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';

// This is where the Firebase Realtime Database integration will go
// You will fetch data from https://puresight-708ab-default-rtdb.asia-southeast1.firebasedatabase.app/Water.json
const MOCK_DATA = {
  Current: 1.54757,
  FlowRate: 0,
  Quality: "GOOD",
  TDS: 30.35469,
  Temperature: 27.9375,
  TotalLitres: 9.22222,
  Turbidity: 3.3,
  UV: "ON"
};

export default function DashboardPage() {
  const [data, setData] = useState(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_FIREBASE_DB_URL;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Failed to fetch system data');
        
        const result = await response.json();
        
        if (result) {
          // Efficiency check: Only update state if data has actually changed
          // to prevent unnecessary re-renders and reduce load.
          setData(prev => {
            if (JSON.stringify(prev) !== JSON.stringify(result)) {
              setLastUpdated(new Date());
              return result;
            }
            return prev;
          });
        }
        setError(null);
      } catch (err) {
        console.error("Dashboard Sync Error:", err);
        setError("Syncing...");
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Live polling every 5 seconds (Optimized for performance vs real-time balance)
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const isSafe = data?.Quality === "GOOD";

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-600 relative overflow-x-hidden"
      style={{ background: '#EFF6FF' }}
    >
      {/* Animated Gradient Mesh Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 35%, #EDE9FE 65%, #E0F2FE 100%)',
        }} />
        {/* Slow-moving aurora orb — top left */}
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-60 animate-fluid-slow"
          style={{ background: 'radial-gradient(circle, #BFDBFE 0%, transparent 70%)', filter: 'blur(80px)' }} />
        {/* Slow-moving aurora orb — bottom right */}
        <div className="absolute -bottom-[15%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-50 animate-fluid-medium"
          style={{ background: 'radial-gradient(circle, #C7D2FE 0%, transparent 70%)', filter: 'blur(80px)' }} />
        {/* Accent orb — center */}
        <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #BAE6FD 0%, transparent 70%)', filter: 'blur(60px)', animation: 'fluid-slow 35s infinite ease-in-out reverse' }} />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #1d4ed8 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      </div>
      <Head>
        <title>Dashboard | PureSight Live Monitoring</title>
        <meta name="description" content="Live water quality and purifier health dashboard." />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 logo-container" style={{ background: '#0EA5E9', padding: '4px' }}>
                <img src="/logo.png" alt="PureSight Logo" className="w-full h-full object-contain relative z-10" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Pure<span className="text-blue-600">Sight</span></h1>
            </div>
            <div className="hidden md:flex h-6 w-px bg-slate-200 mx-2" />
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className={`w-2 h-2 rounded-full animate-pulse ${error ? 'bg-amber-500' : 'bg-green-500'}`} />
              {error ? error : 'Live System Status'}
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: {hasMounted ? lastUpdated.toLocaleTimeString() : '--:--:--'}</span>
            <button 
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              onClick={() => { /* Manually refresh */ }}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Premium Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50/50 border border-blue-100 rounded-full px-4 py-1.5 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase">Live Dashboard</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]"
            style={{ fontFamily: 'Manrope, Inter, sans-serif' }}
          >
            See Your Purifier's
            <br />
            <span className="text-blue-600">Health In Real-Time.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            A command center for every water purifier in your facility.
            <br className="hidden md:block" />
            One screen. Total control.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Top Row: Grid (Left) and Status (Right) */}
          <div className="lg:col-span-8">
            <div className="relative bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm h-[400px] flex items-center justify-center">
              {/* Animated Separator Lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-px bg-slate-100 w-full relative z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" />
                </motion.div>
                <motion.div 
                  initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.5, ease: "circOut", delay: 0.3 }}
                  className="w-px bg-slate-100 h-full absolute flex items-center justify-center z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse" />
                  <div className="w-5 h-5 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm z-20">
                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping" />
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 w-full h-full">
                {/* TDS */}
                <div className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Activity className="w-3 h-3 text-blue-500" /> TDS Level
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{data.TDS.toFixed(1)}</span>
                    <span className="text-xs font-bold text-blue-500">ppm</span>
                  </div>
                  <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tight">Total Dissolved Solids</p>
                </div>
                {/* Turbidity */}
                <div className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Waves className="w-3 h-3 text-indigo-500" /> Turbidity
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{data.Turbidity.toFixed(1)}</span>
                    <span className="text-xs font-bold text-indigo-500">NTU</span>
                  </div>
                  <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tight">Water Clarity Index</p>
                </div>
                {/* Discharge */}
                <div className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Droplets className="w-3 h-3 text-sky-500" /> Discharge
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{data.TotalLitres.toFixed(1)}</span>
                    <span className="text-xs font-bold text-sky-500">Litres</span>
                  </div>
                  <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tight">Total Volume Output</p>
                </div>
                {/* Thermal */}
                <div className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Thermometer className="w-3 h-3 text-orange-500" /> Thermal
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{data.Temperature.toFixed(1)}</span>
                    <span className="text-xs font-bold text-orange-500">°C</span>
                  </div>
                  <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tight">Real-time Temp</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              className={`p-8 rounded-[1.5rem] border-2 flex flex-col justify-center h-[400px] shadow-lg transition-all duration-700 relative overflow-hidden ${
                isSafe ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3.5 rounded-xl ${isSafe ? 'bg-white text-emerald-500' : 'bg-white text-amber-500'} shadow-sm`}>
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Quality</div>
                  <div className={`text-5xl font-black ${isSafe ? 'text-emerald-600' : 'text-amber-600'}`}>{data.Quality}</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full mb-5 border border-white/40 w-fit">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isSafe ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Live Status</span>
              </div>
              <h3 className={`text-3xl font-black mb-3 tracking-tight ${isSafe ? 'text-emerald-950' : 'text-amber-950'}`}>
                {isSafe ? 'Water is Safe.' : 'System Check.'}
              </h3>
              <p className={`text-xs font-medium leading-relaxed ${isSafe ? 'text-emerald-800/60' : 'text-amber-800/60'}`}>
                {isSafe ? 'Parameters optimal. Meets safety standards.' : 'Sensor deviation detected. Inspection advised.'}
              </p>
            </motion.div>
          </div>

          {/* Bottom Row: Health (Left) and Intelligence (Right) */}
          <div className="lg:col-span-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-[1.5rem] border border-slate-200 p-8 h-[180px] flex flex-col justify-center shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-black text-slate-900">Health Diagnostics</h4>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Live
                </div>
              </div>
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg border border-purple-100"><Sun className="w-4 h-4" /></div>
                      <div className="text-[10px] font-black text-slate-900 uppercase">UV Status</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${data.UV === "ON" ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{data.UV}</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden"><motion.div className="h-full bg-purple-500" initial={{ width: 0 }} animate={{ width: data.UV === "ON" ? '100%' : '0%' }} /></div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100"><Zap className="w-4 h-4" /></div>
                      <div className="text-[10px] font-black text-slate-900 uppercase">Flow Rate</div>
                    </div>
                    <div className="text-right font-black text-blue-600 text-lg">{data.FlowRate.toFixed(1)} <span className="text-[9px] text-slate-400 ml-1">L/m</span></div>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden"><motion.div className="h-full bg-blue-500" initial={{ width: 0 }} animate={{ width: '65%' }} /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-slate-950 rounded-[1.5rem] p-8 text-white h-[180px] flex flex-col justify-center shadow-lg relative overflow-hidden">
              <h4 className="text-lg font-black mb-4 flex items-center gap-3 relative z-10"><Info className="w-5 h-5 text-blue-500" /> Intelligence</h4>
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-white/30 text-[9px] font-black uppercase tracking-widest">Device</span>
                  <span className="font-mono text-xs font-bold">PS-ALPH-01</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-[9px] font-black uppercase tracking-widest">Score</span>
                  <span className="text-xs font-black text-blue-500 tracking-tight">99.8% Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-sm">
        <div>2026 PURESIGHT TECHNOLOGIES — ALL RIGHTS RESERVED</div>
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
        </div>
      </footer>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
}

