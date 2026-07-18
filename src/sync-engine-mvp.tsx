import React, { useState } from 'react';
import { BarChart3, Terminal, GitFork, Milestone, Clock, Database } from 'lucide-react';

interface MedallionMetrics {
  bronze_count: number;
  silver_count: number;
  gold_records: number;
}

export default function AnalyticsETLMVP() {
  const [metrics, setMetrics] = useState<MedallionMetrics>({ bronze_count: 3, silver_count: 3, gold_records: 2 });
  const [pitResult, setPitResult] = useState<string>('Standard');
  const [selectedDate, setSelectedDate] = useState<string>('2026-03-15');
  const [pythonLogs, setPythonLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const runPipelineExecution = () => {
    setIsProcessing(true);
    setPythonLogs([
      `[INFO] Initializing Medallion ETL consolidation streaming loop...`,
      `[BRONZE] Appending raw transaction payload logs to append-only storage...`,
    ]);

    setTimeout(() => {
      setMetrics({ bronze_count: 4, silver_count: 4, gold_records: 3 });
      setPythonLogs(prev => [
        ...prev,
        `[SILVER] Enforcing schemas: dropped null elements & cast string data types.`,
        `[GOLD] Evaluating Slowly Changing Dimensions (SCD Type 2) history state tracks...`,
        `[SUCCESS] Active timeline window updated. Historical record expired cleanly.`,
        `[PIT] Point-in-Time historical snapshot query verification: PASS`
      ]);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="w-full bg-[#1e293b] text-slate-100 rounded-2xl overflow-hidden shadow-xl border border-slate-700">
      
      {/* Top Banner Control Panel */}
      <div className="px-6 py-4 bg-[#0f172a] border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <GitFork className="text-blue-400 w-5 h-5" /> Analytics ETL Processing Pipeline
        </h2>
        <button 
          onClick={runPipelineExecution}
          disabled={isProcessing}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Milestone className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
          {isProcessing ? 'Processing Dimensions...' : 'Run Pipeline Transform'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        
        {/* Left Side: Medallion Architecture Monitoring */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-400" /> Medallion Tier Loads
            </h3>
            
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center bg-[#1e293b] p-2.5 rounded-lg border border-slate-700">
                <span className="text-amber-400 font-bold">🟫 Bronze (Raw Immutable)</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{metrics.bronze_count} Rows</span>
              </div>
              <div className="flex justify-between items-center bg-[#1e293b] p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-300 font-bold">🥈 Silver (Cleaned/Typed)</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{metrics.silver_count} Rows</span>
              </div>
              <div className="flex justify-between items-center bg-[#1e293b] p-2.5 rounded-lg border border-slate-700">
                <span className="text-emerald-400 font-bold">🥇 Gold (Business Metrics)</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{metrics.gold_records} Profiles</span>
              </div>
            </div>
          </div>

          {/* Python Runtime Log Emulation Window */}
          {pythonLogs.length > 0 && (
            <div className="bg-[#090d16] rounded-xl border border-slate-800 p-4 font-mono text-[11px] space-y-1.5">
              <div className="text-slate-400 font-bold flex items-center gap-1.5 border-b border-slate-800 pb-1.5 mb-1">
                <Terminal className="w-3.5 h-3.5 text-amber-500" /> python3 src/analytics_etl.py
              </div>
              {pythonLogs.map((log, idx) => (
                <div key={idx} className={log.includes('[SUCCESS]') || log.includes('[PIT]') ? 'text-emerald-400' : log.includes('[BRONZE]') || log.includes('[SILVER]') ? 'text-blue-400' : 'text-slate-400'}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: SCD Type 2 Table & Point-in-Time Query Engine */}
        <div className="lg:col-span-8 bg-[#0f172a] rounded-xl border border-slate-700 p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold flex items-center gap-1.5 text-slate-200">
              <Clock className="w-4 h-4 text-emerald-400" /> Point-in-Time Correctness (SCD2 Lookup)
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Select an ingestion date snapshot parameter to verify the state of the dimension data exactly as it existed at that point in time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-[#1e293b] p-3.5 rounded-xl border border-slate-700">
            <div className="space-y-1">
              <label className="block text-[9px] uppercase font-bold text-slate-400">Target Snapshot Date</label>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setPitResult(e.target.value < '2026-06-01' ? 'Standard' : 'Premium');
                }} 
                className="bg-[#0f172a] border border-slate-600 text-xs rounded px-2 py-1 focus:outline-none text-slate-200 cursor-pointer"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[9px] uppercase font-bold text-slate-400">Resolved State Profile</label>
              <div className="text-xs font-bold font-mono px-3 py-1 bg-[#0f172a] border border-slate-800 rounded">
                User ID: <span className="text-blue-400">cust-501</span> | Active Rank: <span className={pitResult === 'Premium' ? 'text-emerald-400' : 'text-amber-400'}>{pitResult}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-slate-400" /> Gold Dimension Audit Table History
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                    <th className="pb-2">User ID</th>
                    <th className="pb-2">SaaS Tier</th>
                    <th className="pb-2">Valid From</th>
                    <th className="pb-2">Valid To</th>
                    <th className="pb-2 text-center">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-[11px]">
                  <tr>
                    <td className="py-2.5 text-blue-400">cust-501</td>
                    <td className="py-2.5 text-amber-400">Standard</td>
                    <td className="py-2.5 text-slate-300">2026-01-01</td>
                    <td className="py-2.5 text-slate-300">2026-06-01</td>
                    <td className="py-2.5 text-center"><span className="bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded text-[10px]">Historical (SCD2)</span></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-blue-400">cust-501</td>
                    <td className="py-2.5 text-emerald-400">Premium</td>
                    <td className="py-2.5 text-slate-300">2026-06-01</td>
                    <td className="py-2.5 text-slate-500">Infinity (NULL)</td>
                    <td className="py-2.5 text-center"><span className="bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded text-[10px] font-bold border border-emerald-900">Active Current</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}