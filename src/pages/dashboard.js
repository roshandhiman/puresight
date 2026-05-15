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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-600">
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
              <div className="relative w-16 h-16 logo-container">
                <img src="/logo.png" alt="PureSight Logo" className="w-14 h-14 object-contain relative z-10" />
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Metrics Column - Scrolls */}
          <div className="lg:col-span-8 space-y-8">
            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* TDS Card */}
              <MetricCard 
                icon={<Activity className="w-5 h-5" />}
                label="Total Dissolved Solids"
                value={`${data.TDS.toFixed(1)}`}
                unit="ppm"
                description="Indicates the concentration of dissolved substances."
                color="blue"
              />

              {/* Turbidity Card */}
              <MetricCard 
                icon={<Waves className="w-5 h-5" />}
                label="Turbidity"
                value={`${data.Turbidity.toFixed(1)}`}
                unit="NTU"
                description="Measures water clarity and suspended particles."
                color="indigo"
              />

              {/* Total Litres */}
              <MetricCard 
                icon={<Droplets className="w-5 h-5" />}
                label="Total Water Dispensed"
                value={`${data.TotalLitres.toFixed(1)}`}
                unit="Litres"
                description="Cumulative volume of water purified today."
                color="sky"
              />

              {/* Temperature */}
              <MetricCard 
                icon={<Thermometer className="w-5 h-5" />}
                label="Water Temperature"
                value={`${data.Temperature.toFixed(1)}`}
                unit="°C"
                description="Current temperature of the output water."
                color="orange"
              />
            </div>

            {/* Secondary Stats */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-bold">System Health Metrics</h4>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-widest font-bold">Real-time Diagnostics</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* UV Lamp Status */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <Sun className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700">UV Sterilization</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                      data.UV === "ON" ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {data.UV}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: data.UV === "ON" ? '100%' : '0%' }}
                    />
                  </div>
                  <p className="text-xs text-slate-400">UV lamp active for continuous pathogen elimination.</p>
                </div>

                {/* Flow Rate */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700">Current Flow Rate</span>
                    </div>
                    <span className="text-sm font-black text-blue-600">
                      {data.FlowRate.toFixed(1)} L/m
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '45%' }} // Mock visualization
                    />
                  </div>
                  <p className="text-xs text-slate-400">Stable flow detected across all filtration stages.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Side Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-6">
            
            {/* Safety Status (Moved from main column) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-3xl border flex flex-col gap-4 shadow-sm ${
                isSafe 
                ? 'bg-emerald-50 border-emerald-100' 
                : 'bg-amber-50 border-amber-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${isSafe ? 'bg-white text-emerald-500' : 'bg-white text-amber-500'} shadow-sm`}>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quality Grade</div>
                  <div className={`text-2xl font-black ${isSafe ? 'text-emerald-600' : 'text-amber-600'}`}>{data.Quality}</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Status</div>
                <h3 className={`text-xl font-black mb-1 ${isSafe ? 'text-emerald-900' : 'text-amber-900'}`}>{isSafe ? 'Safe to Drink' : 'Maintenance Required'}</h3>
                <p className={`text-xs ${isSafe ? 'text-emerald-700/70' : 'text-amber-700/70'} leading-relaxed`}>
                  {isSafe 
                    ? 'Water quality meets all safety standards.' 
                    : 'System requires inspection.'}
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Actions</h4>
              <div className="space-y-3">
                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-100">
                  <RotateCcw className="w-3 h-3" />
                  Recalibrate
                </button>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                  Daily Report
                </button>
              </div>
            </div>

            {/* Device Info (Moved to bottom of sidebar) */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/10">
              <h4 className="text-base font-bold mb-5 flex items-center gap-2 text-blue-400">
                <Info className="w-4 h-4" />
                Intelligence
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-white/40 text-[11px] font-bold uppercase tracking-wider">Device ID</span>
                  <span className="font-mono text-xs">PS-COOLER-001</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-white/40 text-[11px] font-bold uppercase tracking-wider">Location</span>
                  <span className="text-xs">Main Hall</span>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <span className="text-white/40 text-[11px] font-bold uppercase tracking-wider">Firmware</span>
                  <span className="text-xs">v2.4.1</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[10px] text-white/40 leading-relaxed">
                  WQI calibration active. Sensor data live.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-sm">
        <div>&copy; 2024 PureSight Technologies. All rights reserved.</div>
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

function MetricCard({ icon, label, value, unit, description, color }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    sky: 'bg-sky-50 text-sky-600 border-sky-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md group"
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 rounded-2xl ${colors[color]} transition-colors`}>
          {icon}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <Activity className="w-3 h-3" />
          Live
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-4xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{value}</span>
        <span className="text-lg font-bold text-slate-400">{unit}</span>
      </div>
      <div className="text-sm font-bold text-slate-700 mb-2">{label}</div>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
