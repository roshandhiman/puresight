'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Droplets, Sun, Activity, Waves, CheckCircle2 } from 'lucide-react';

function MiniChart({ values }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1 h-10">
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-blue-100"
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
        />
      ))}
    </div>
  );
}

const logs = [
  { time: '09:41', event: 'Filter health check passed', type: 'ok' },
  { time: '09:38', event: 'UV lamp intensity: 98.2%', type: 'ok' },
  { time: '09:15', event: 'Flow rate spike detected — resolved', type: 'warn' },
  { time: '08:50', event: 'Auto-shutoff test: PASSED', type: 'ok' },
  { time: '08:00', event: 'Daily diagnostics completed', type: 'ok' },
];

export default function DashboardSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [filterPct, setFilterPct] = useState(87);
  const [flow, setFlow] = useState(2.4);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const t = setInterval(() => {
      setFlow((f) => {
        const next = parseFloat((f + (Math.random() - 0.5) * 0.4).toFixed(1));
        return Math.min(3.5, Math.max(1.2, next));
      });
      setFilterPct((p) => {
        const next = p + (Math.random() - 0.5) * 0.2;
        return Math.min(100, Math.max(85, next));
      });
    }, 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="dashboard" className="relative py-32 px-4 bg-gray-50/50" style={{ zIndex: 2 }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-6 border border-blue-100">
            <div className="status-dot" />
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Live Dashboard</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
            style={{ fontFamily: 'Manrope,Inter,sans-serif', fontWeight: 900, lineHeight: 1.1 }}>
            See Your Purifier's
            <br />
            <span className="gradient-text">Health In Real-Time.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            A command center for every water purifier in your facility. One screen. Total control.
          </p>
        </motion.div>

        {/* Main dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/50"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/30">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-gray-200" />
              </div>
              <span className="text-xs text-gray-400 font-mono">puresight.io/dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              {['overview', 'analytics', 'logs'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="text-xs px-3 py-1 rounded-full capitalize font-bold transition-all"
                  style={{
                    background: activeTab === tab ? '#E0F2FE' : 'transparent',
                    color: activeTab === tab ? '#0369A1' : '#94A3B8',
                  }}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* KPI row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Quality', val: 'SAFE', color: '#10B981', icon: Droplets, sub: 'TDS: 48ppm' },
                  { label: 'UV Lamp', val: 'Active', color: '#F59E0B', icon: Sun, sub: '254nm' },
                  { label: 'Filter', val: `${Math.round(filterPct)}%`, color: '#2563EB', icon: Activity, sub: 'Healthy' },
                  { label: 'Flow', val: `${Math.max(1.5, flow).toFixed(1)}L/m`, color: '#0EA5E9', icon: Waves, sub: 'Normal' },
                ].map((kpi, i) => (
                  <div key={kpi.label} className="dashboard-widget text-center bg-gray-50/50 border-gray-100">
                    <div className="text-xl mb-1 flex justify-center text-gray-400">
                      <kpi.icon size={20} color={kpi.color} strokeWidth={2.5} />
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{kpi.label}</div>
                    <div className="text-lg font-black" style={{ color: kpi.color }}>{kpi.val}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{kpi.sub}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="dashboard-widget bg-white border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm font-bold text-gray-900">Water Quality Index</div>
                    <div className="text-xs text-gray-400">Real-time sensor metrics</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-600 font-bold">
                    <div className="status-dot" />
                    <span>SYSTEM ACTIVE</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-end gap-1.5 h-32 px-1">
                    {[65, 72, 80, 75, 88, 83, 91, 87, 94, 90, 95, 88, 92, 89, 93, 87, 91, 95, 88, 93, 90, 95, 92, 87].map((v, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-md bg-blue-500/10 hover:bg-blue-500/30 transition-colors"
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${v}%` } : {}}
                        transition={{ delay: 0.6 + i * 0.02, duration: 0.5 }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-300 font-bold mt-4 px-1">
                    <span>00:00</span><span>12:00</span><span>24:00</span>
                  </div>
                </div>
              </div>

              {/* Health Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Filter Efficiency', pct: Math.round(filterPct), color: '#2563EB' },
                  { label: 'UV Intensity', pct: 98, color: '#F59E0B' },
                ].map((item) => (
                  <div key={item.label} className="dashboard-widget bg-gray-50/50 border-gray-100 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-gray-500">{item.label}</span>
                      <span className="text-sm font-black" style={{ color: item.color }}>{item.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${item.pct}%` } : {}}
                        transition={{ delay: 0.8, duration: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              {/* Status Circle */}
              <div className="dashboard-widget flex flex-col items-center justify-center py-8 bg-green-50/30 border-green-100">
                <div className="w-24 h-24 rounded-full border-4 border-green-500/20 flex items-center justify-center mb-4 bg-white shadow-sm text-green-500">
                  <CheckCircle2 size={48} strokeWidth={2.5} />
                </div>
                <div className="text-2xl font-black text-green-600 mb-1">SAFE</div>
                <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Verified Pure</div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Uptime', val: '99.9%' },
                  { label: 'Devices', val: '14' },
                ].map(s => (
                  <div key={s.label} className="dashboard-widget p-3 bg-white border-gray-100 text-center">
                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">{s.label}</div>
                    <div className="text-lg font-black text-gray-900">{s.val}</div>
                  </div>
                ))}
              </div>

              {/* Event Log */}
              <div className="dashboard-widget flex-1 bg-white border-gray-100 overflow-hidden flex flex-col">
                <div className="text-xs font-bold text-gray-900 mb-4 px-1">Recent Events</div>
                <div className="flex flex-col gap-1">
                  {logs.map((log, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${log.type === 'ok' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      <div>
                        <div className="text-[11px] text-gray-700 font-medium">{log.event}</div>
                        <div className="text-[9px] text-gray-400 font-bold mt-0.5 uppercase">{log.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
