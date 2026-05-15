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
  const [loading, setLoading] = useState(false); // Set to true if fetching
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const fetchData = async () => {
      // Space for API fetching:
      // try {
      //   const response = await fetch('YOUR_FIREBASE_URL/Water.json');
      //   const result = await response.json();
      //   setData(result);
      //   setLastUpdated(new Date());
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
      
      // For now, let's just simulate some small changes
      const interval = setInterval(() => {
        setData(prev => ({
          ...prev,
          Current: prev.Current + (Math.random() - 0.5) * 0.01,
          Temperature: prev.Temperature + (Math.random() - 0.5) * 0.1,
          TotalLitres: prev.TotalLitres + Math.random() * 0.01,
        }));
        setLastUpdated(new Date());
      }, 5000);

      return () => clearInterval(interval);
    };

    fetchData();
  }, []);

  const isSafe = data.Quality === "GOOD";

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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">Pure<span className="text-blue-600">Sight</span></h1>
            </div>
            <div className="hidden md:flex h-6 w-px bg-slate-200 mx-2" />
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live System Status
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
          
          {/* Main Status Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Safety Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
                isSafe 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-900' 
                : 'bg-amber-50 border-amber-100 text-amber-900'
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                  isSafe ? 'bg-white text-emerald-500' : 'bg-white text-amber-500'
                }`}>
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      isSafe ? 'bg-emerald-200/50' : 'bg-amber-200/50'
                    }`}>
                      Current Status
                    </span>
                  </div>
                  <h3 className="text-4xl font-black mb-1">{isSafe ? 'Safe to Drink' : 'Maintenance Required'}</h3>
                  <p className={`${isSafe ? 'text-emerald-700/80' : 'text-amber-700/80'} font-medium`}>
                    {isSafe 
                      ? 'Water quality meets all safety standards for consumption.' 
                      : 'System indicates parameters may be outside optimal range.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end gap-1">
                <div className="text-sm font-bold opacity-60 uppercase tracking-wider">Quality Grade</div>
                <div className="text-5xl font-black">{data.Quality}</div>
              </div>
            </motion.div>

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

          {/* Side Info Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Device Info */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/10">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-400" />
                Device Intelligence
              </h4>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-white/60 text-sm font-medium">Device ID</span>
                  <span className="font-mono text-sm">PS-COOLER-001</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-white/60 text-sm font-medium">Location</span>
                  <span className="text-sm">Main Campus Hall</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-white/60 text-sm font-medium">Active Since</span>
                  <span className="text-sm">Jan 12, 2024</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span className="text-white/60 text-sm font-medium">Firmware</span>
                  <span className="text-sm">v2.4.1 (Stable)</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Technical Note</div>
                <p className="text-xs text-white/50 leading-relaxed">
                  Water Quality Index (WQI) is currently under calibration for this device. Live sensor data remains active.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h4 className="text-lg font-bold mb-6">Actions</h4>
              <div className="space-y-3">
                <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-700 font-bold text-sm transition-colors flex items-center justify-center gap-3 border border-slate-100">
                  <RotateCcw className="w-4 h-4" />
                  Recalibrate Sensors
                </button>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3">
                  Download Daily Report
                </button>
              </div>
            </div>

            {/* Live Logs */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-[300px] flex flex-col">
              <h4 className="text-lg font-bold mb-4">Activity Log</h4>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                <LogItem time="Just now" text="UV Intensity stabilized at 98%" type="success" />
                <LogItem time="2m ago" text="Temperature shift detected: +0.2°C" type="info" />
                <LogItem time="15m ago" text="Filter efficiency check completed" type="success" />
                <LogItem time="1h ago" text="System auto-diagnosis: All systems green" type="success" />
                <LogItem time="3h ago" text="Periodic sensor recalibration done" type="info" />
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

function LogItem({ time, text, type }) {
  const dots = {
    success: 'bg-emerald-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500',
  };

  return (
    <div className="flex items-start gap-3 group">
      <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${dots[type]}`} />
      <div>
        <div className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{text}</div>
        <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{time}</div>
      </div>
    </div>
  );
}
