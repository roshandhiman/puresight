'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function AnimatedNumber({ target, suffix = '', duration = 1.5 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return controls.stop;
  }, [inView, target, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

function MiniChart({ values }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1 h-10">
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm"
          style={{ background: 'linear-gradient(180deg, rgba(20,184,166,0.8), rgba(6,182,212,0.3))' }}
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
      setFlow((f) => parseFloat((f + (Math.random() - 0.5) * 0.3).toFixed(1)));
      setFilterPct((p) => Math.min(100, Math.max(80, p + (Math.random() - 0.5) * 0.5)));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="dashboard" className="relative py-32 px-4 overflow-hidden" style={{ zIndex: 2 }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2"
          style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(20,184,166,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <div className="status-dot" />
            <span className="text-xs font-semibold text-teal-400 tracking-widest uppercase">Live Dashboard</span>
          </div>
          <h2 className="font-display font-black text-white mb-4"
            style={{ fontFamily: 'Manrope,Inter,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.1 }}>
            See Your Purifier's
            <br />
            <span className="gradient-text">Health In Real-Time.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            A command center for every water purifier in your facility. One screen. Total control.
          </p>
        </motion.div>

        {/* Main dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(10,20,20,0.8)',
            border: '1px solid rgba(20,184,166,0.2)',
            boxShadow: '0 60px 150px rgba(0,0,0,0.8), 0 0 80px rgba(20,184,166,0.08)',
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-teal-400/60" />
              </div>
              <span className="text-xs text-white/30 font-mono">puresight.io/dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              {['overview', 'analytics', 'logs'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="text-xs px-3 py-1 rounded-full capitalize font-medium transition-all duration-200"
                  style={{
                    background: activeTab === tab ? 'rgba(20,184,166,0.2)' : 'transparent',
                    color: activeTab === tab ? '#2dd4bf' : 'rgba(255,255,255,0.3)',
                    border: activeTab === tab ? '1px solid rgba(20,184,166,0.3)' : '1px solid transparent',
                  }}>
                  {tab}
                </button>
              ))}
              <div className="flex items-center gap-1.5">
                <div className="status-dot" />
                <span className="text-xs text-teal-400 font-mono">LIVE</span>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left column */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* KPI row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Water Quality', val: 'SAFE', color: '#10b981', icon: '💧', sub: 'TDS: 48ppm' },
                  { label: 'UV Lamp', val: 'Active', color: '#f59e0b', icon: '☀️', sub: '254nm' },
                  { label: 'Filter Health', val: `${Math.round(filterPct)}%`, color: '#14b8a6', icon: '🔵', sub: '43d left' },
                  { label: 'Flow Rate', val: `${Math.max(1.5, flow).toFixed(1)}L/m`, color: '#06b6d4', icon: '〰️', sub: 'Optimal' },
                ].map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="dashboard-widget text-center"
                  >
                    <div className="text-xl mb-1">{kpi.icon}</div>
                    <div className="text-xs text-white/40 mb-1">{kpi.label}</div>
                    <div className="text-lg font-bold font-mono" style={{ color: kpi.color }}>{kpi.val}</div>
                    <div className="text-xs text-white/25 mt-0.5">{kpi.sub}</div>
                  </motion.div>
                ))}
              </div>

              {/* Chart */}
              <div className="dashboard-widget">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm font-semibold text-white">Water Quality Index</div>
                    <div className="text-xs text-white/40">Last 24 hours</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
                    <div className="status-dot" />
                    <span>Live updating</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-end gap-1 h-28">
                    {[65, 72, 80, 75, 88, 83, 91, 87, 94, 90, 95, 88, 92, 89, 93, 87, 91, 95, 88, 93, 90, 95, 92, 87].map((v, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-sm relative group cursor-pointer"
                        style={{
                          background: `linear-gradient(180deg, rgba(20,184,166,${0.4 + v / 250}) 0%, rgba(6,182,212,0.2) 100%)`,
                          boxShadow: `0 0 8px rgba(20,184,166,0.2)`,
                        }}
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${v}%` } : {}}
                        transition={{ delay: 0.6 + i * 0.025, duration: 0.5 }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
                          {v}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-white/20 font-mono mt-2">
                    <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="dashboard-widget">
                <div className="text-sm font-semibold text-white mb-4">System Health Overview</div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Filter Efficiency', pct: Math.round(filterPct), color: '#14b8a6' },
                    { label: 'UV Lamp Output', pct: 98, color: '#f59e0b' },
                    { label: 'Pressure Stability', pct: 94, color: '#06b6d4' },
                    { label: 'Sensor Accuracy', pct: 100, color: '#10b981' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-white/60">{item.label}</span>
                        <span className="font-mono font-bold" style={{ color: item.color }}>{item.pct}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`, boxShadow: `0 0 8px ${item.color}60` }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${item.pct}%` } : {}}
                          transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {/* Status summary */}
              <div className="dashboard-widget"
                style={{ background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)' }}>
                <div className="text-center mb-4">
                  <motion.div
                    animate={{ boxShadow: ['0 0 20px rgba(20,184,166,0.3)', '0 0 50px rgba(20,184,166,0.6)', '0 0 20px rgba(20,184,166,0.3)'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-3"
                    style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.2), rgba(6,182,212,0.1))', border: '2px solid rgba(20,184,166,0.4)' }}
                  >
                    <span className="text-3xl">✅</span>
                  </motion.div>
                  <div className="text-2xl font-black text-teal-400 mb-1" style={{ fontFamily: 'Manrope,sans-serif' }}>SAFE</div>
                  <div className="text-xs text-white/40">All systems nominal</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  {[
                    { label: 'Uptime', val: '99.9%' },
                    { label: 'Devices', val: '14' },
                    { label: 'Alerts', val: '0' },
                    { label: 'Users', val: '2.4k' },
                  ].map(s => (
                    <div key={s.label} className="bg-white/5 rounded-xl p-2">
                      <div className="text-sm font-bold text-white font-mono">{s.val}</div>
                      <div className="text-xs text-white/30">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini chart */}
              <div className="dashboard-widget">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-white">Flow Rate</div>
                  <span className="text-xs font-mono text-teal-400">{Math.max(1.5, flow).toFixed(1)} L/min</span>
                </div>
                <MiniChart values={[2.1, 2.4, 2.3, 2.5, 2.4, 2.2, 2.6, 2.4, 2.3, 2.5]} />
              </div>

              {/* Maintenance log */}
              <div className="dashboard-widget flex-1">
                <div className="text-sm font-semibold text-white mb-4">Recent Events</div>
                <div className="flex flex-col gap-2">
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1 + i * 0.07 }}
                      className="flex items-start gap-2 py-2 border-b border-white/5 last:border-0"
                    >
                      <div className="mt-1 flex-shrink-0">
                        <div className={`w-1.5 h-1.5 rounded-full ${log.type === 'ok' ? 'bg-teal-400' : 'bg-yellow-400'}`}
                          style={{ boxShadow: log.type === 'ok' ? '0 0 6px rgba(20,184,166,0.8)' : '0 0 6px rgba(251,191,36,0.8)' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-white/60 truncate">{log.event}</div>
                        <div className="text-xs text-white/25 font-mono mt-0.5">{log.time}</div>
                      </div>
                    </motion.div>
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
