import {
  ArrowUpWideNarrow,
  Calendar,
  CircleCheck,
  CircleCheckBig,
  Flame,
  Search,
  Clock,
  User,
  MoreHorizontal,
  Layers,
  ArrowRight
} from "lucide-react";
import React, { useEffect, useState } from "react";
import AddTaskForm from "./AddTaskForm";

function Task() {
  const [isForm, setIsForm] = useState(false);
  const [filterData, setFilterData] = useState("all");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  /* ---------------- LOGIC (UNCHANGED) ---------------- */
  const fetchTasks = async () => {
    try {
      let res = await fetch("http://localhost:3000/api/tasks/fetch-tasks");
      res = await res.json();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filterTask = data.filter((ele) => {
    const statusMatch = filterData === "all" || ele.Priority === filterData;
    const q = search.toLowerCase();
    const searchMatch =
      ele.Title.toLowerCase().includes(q) ||
      ele.ContactDeal.toLowerCase().includes(q);
    return statusMatch && searchMatch;
  });

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return "bg-rose-50 text-rose-600 border-rose-100 shadow-[0_2px_10px_rgba(225,29,72,0.1)]";
      case "medium":
        return "bg-amber-50 text-amber-600 border-amber-100 shadow-[0_2px_10px_rgba(217,119,6,0.1)]";
      case "low":
        return "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-[0_2px_10px_rgba(5,150,105,0.1)]";
      default:
        return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  return (
    <div className="flex-1 lg:ml-64 p-6 md:p-12 bg-[#E3E4DB] min-h-screen font-sans selection:bg-[#8F6593] selection:text-white">
      
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-14">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#8F6593] font-black uppercase text-[10px] tracking-[0.3em]">
             <Layers size={14}/> Productivity Suite
          </div>
          <h1 className="text-5xl font-black text-[#3B252C] tracking-tight">
            Tasks
          </h1>
        </div>

        <button
          onClick={() => setIsForm(true)}
          className="group h-16 px-8 rounded-2xl bg-[#8F6593] text-white font-black shadow-[0_15px_30px_-5px_rgba(143,101,147,0.4)] flex items-center gap-3 hover:-translate-y-1 transition-all active:scale-95 text-sm uppercase tracking-widest"
        >
          <CircleCheckBig size={22} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
          Create Entry
        </button>
      </div>

      {/* FILTER HUB */}
      <div className="bg-white/40 backdrop-blur-2xl border border-white rounded-[2.5rem] p-5 mb-10 shadow-sm flex flex-col xl:flex-row gap-6 items-center">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#3B252C]/30 group-focus-within:text-[#8F6593] transition-colors" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Scan tasks, deals or contacts..."
            className="w-full h-14 rounded-3xl pl-16 pr-6 bg-white/60 border border-white focus:bg-white focus:ring-4 focus:ring-[#8F6593]/10 outline-none transition-all font-bold text-[#3B252C] placeholder:text-[#3B252C]/30 shadow-inner"
          />
        </div>

        <div className="h-10 w-[2px] bg-[#CDCDCD]/30 hidden xl:block" />

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full xl:w-auto">
          {[
            { id: "all", label: "All Hub", icon: null },
            { id: "high", label: "Critical", icon: <Flame size={14} /> },
            { id: "medium", label: "Steady", icon: <ArrowUpWideNarrow size={14} /> },
            { id: "low", label: "Minor", icon: <CircleCheck size={14} /> },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilterData(pill.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border
                ${filterData === pill.id 
                  ? "bg-[#8F6593] text-white border-[#8F6593] shadow-lg shadow-[#8F6593]/20" 
                  : "bg-white/40 text-[#3B252C]/50 border-white hover:border-[#8F6593]/30"
                }`}
            >
              {pill.icon}
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* DATA VIEW */}
      <div className="rounded-[3rem] bg-white/30 backdrop-blur-3xl border border-white/60 shadow-[0_20px_50px_rgba(59,37,44,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#CDCDCD]/20 text-[#3B252C]/40 uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="px-10 py-8">Task Identification</th>
                <th className="px-6 py-8">Linkage</th>
                <th className="px-6 py-8">Timeline</th>
                <th className="px-6 py-8">Classification</th>
                <th className="px-6 py-8">Assignee</th>
                <th className="px-10 py-8"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#CDCDCD]/20">
              {filterTask.map((ele) => (
                <tr
                  key={ele._id}
                  className="hover:bg-white/80 transition-all group relative"
                >
                  <td className="px-10 py-8">
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-[#3B252C] text-lg leading-tight group-hover:text-[#8F6593] transition-colors">
                        {ele.Title}
                      </span>
                      <div className="flex items-center gap-2">
                         <div className="h-1 w-1 rounded-full bg-[#8F6593]" />
                         <span className="text-xs text-[#3B252C]/40 font-bold italic line-clamp-1 max-w-[300px]">
                           {ele.Notes || "Standard task protocol."}
                         </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 border border-white shadow-sm text-[#3B252C]/60 text-[10px] font-black uppercase tracking-wider">
                       <ArrowRight size={12} className="text-[#8F6593]"/> {ele.ContactDeal}
                    </div>
                  </td>

                  <td className="px-6 py-8">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-black text-[#3B252C]">
                        <Calendar size={14} className="text-[#8F6593]" strokeWidth={2.5} />
                        {ele.DUE_DATE}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-[#3B252C]/30 uppercase tracking-tighter">
                        <Clock size={12} strokeWidth={2.5} />
                        {ele.Due_Time || "Open Schedule"}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-8">
                    <span
                      className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm inline-block transition-transform group-hover:scale-105
                        ${getPriorityStyles(ele.Priority)}`}
                    >
                      {ele.Priority}
                    </span>
                  </td>

                  <td className="px-6 py-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#8F6593] text-white flex items-center justify-center font-black text-sm shadow-lg shadow-[#8F6593]/20 transition-transform group-hover:rotate-6">
                            {ele.Assignee?.charAt(0) || <User size={16}/>}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-black text-[#3B252C] leading-none mb-1">
                               {ele.Assignee}
                           </span>
                           <span className="text-[9px] font-bold text-[#3B252C]/30 uppercase tracking-widest">Operator</span>
                        </div>
                    </div>
                  </td>
                  
                  <td className="px-10 py-8 text-right">
                     <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-[#8F6593] hover:text-white text-[#CDCDCD] transition-all">
                        <MoreHorizontal size={20} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filterTask.length === 0 && (
            <div className="py-32 text-center flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#8F6593]/20 blur-3xl rounded-full" />
                  <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-[3rem] bg-white border border-white shadow-xl">
                      <CircleCheck className="text-[#8F6593]" size={48} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-[#3B252C] tracking-tight">Protocol Complete</h3>
                  <p className="text-[#3B252C]/30 text-xs font-bold uppercase tracking-[0.2em]">All active directives cleared.</p>
                </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {isForm && (
        <AddTaskForm
          onClose={() => setIsForm(false)}
          fetchAll={fetchTasks}
        />
      )}
    </div>
  );
}

export default Task;