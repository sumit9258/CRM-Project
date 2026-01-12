import { ListFilter, Plus, TrendingUp, DollarSign, Target, Activity, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Chart from "./Chart";

function Revenue() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        let res = await fetch("http://localhost:3000/api/tasks/filter-revenue");
        res = await res.json();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeal();
  }, []);

  const sum = data.reduce((total, num) => total + num.revenue, 0);
  const target = 150000;
  const progressPercentage = Math.min((sum / target) * 100, 100);

  return (
    <div className="flex-1 lg:ml-64 p-8 bg-[var(--bg-main)] min-h-screen font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Revenue Analytics
          </h1>
          <p className="text-[var(--text-main)]/60 font-medium mt-1">
            Real-time insights into your sales performance.
          </p>
        </div>

        <div className="flex items-center gap-6 bg-white/40 backdrop-blur-md border border-white/60 rounded-[2rem] px-8 py-4 shadow-sm">
          <div className="flex items-center gap-3 border-r border-black/5 pr-6">
            <div className="p-2 bg-[var(--accent-main)]/10 rounded-lg">
              <Target size={20} className="text-[var(--accent-main)]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40">Quarter Goal</p>
              <p className="text-lg font-bold text-[var(--text-main)]">₹150,000</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Activity size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40">Pacing</p>
              <p className="text-lg font-bold text-emerald-600">+12.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Main Revenue Card */}
        <div className="md:col-span-2 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/40 p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
             <DollarSign size={120} className="text-[var(--accent-main)]" />
          </div>
          
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-main)]/40 mb-2">Total Gross Revenue</p>
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="text-5xl font-black text-[var(--text-main)] tracking-tighter">
                ₹{sum.toLocaleString()}
              </h2>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold shadow-sm">
                <TrendingUp size={16} /> 8.2%
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[var(--text-main)]/60 uppercase tracking-widest">
                <span>Goal Progress</span>
                <span>{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--accent-main)] rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-sm text-[var(--text-main)]/40 font-medium italic">
                vs. ₹115,050 in the previous reporting period
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="rounded-[2.5rem] bg-[var(--accent-main)] p-8 text-white shadow-xl shadow-[var(--accent-main)]/20 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <ArrowUpRight size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Pro View</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-1">Top Tier</h3>
            <p className="text-white/70 text-sm font-medium">Your revenue is in the top 5% of regional performers this month.</p>
          </div>
          <button className="w-full py-4 bg-white text-[var(--accent-main)] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all">
            View Reports
          </button>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-xl font-black text-[var(--text-main)] uppercase tracking-widest text-sm opacity-50">Revenue Distribution</h3>
           <div className="flex gap-2">
                <button className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all bg-white shadow-sm text-[var(--accent-main)]`}>
                  Monthly
                </button>
           </div>
        </div>
        <div className="rounded-[3rem] bg-white/70 backdrop-blur-xl border border-white/50 p-10 shadow-2xl">
          <Chart />
        </div>
      </div>

    </div>
  );
}

export default Revenue;