import React, { useEffect, useRef, useState } from "react";
import { ListFilterIcon, X, RotateCcw, CheckCircle2 } from "lucide-react";

const Lead = ["new", "Qualified", "Unresponsive", "contacted"];

function ContactFilter({ onApply, onclose, onclear, formRef }) {
  const [filters, setFilters] = useState({
    status: [],
    activity: "",
    company: "",
    Assign: "",
  });

  const cardRef = useRef(null);

  const handleStatusChange = (value) => {
    setFilters((pre) => ({
      ...pre,
      status: pre.status.includes(value)
        ? pre.status.filter((item) => item !== value)
        : [...pre.status, value],
    }));
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target) &&
        !formRef.current.contains(e.target)
      ) {
        onclose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onclose, formRef]);

  return (
    <div
      ref={cardRef}
      className="absolute right-0 mt-3 w-[380px] z-[100]
                 rounded-[2.5rem] bg-[var(--bg-main)]/95 backdrop-blur-xl
                 border border-white/40 shadow-2xl animate-in fade-in zoom-in duration-200"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-7 py-5 border-b border-black/5">
        <div className="flex items-center gap-2.5 text-[var(--text-main)] font-black text-lg tracking-tight">
          <div className="p-1.5 bg-[var(--accent-main)] rounded-lg text-white">
            <ListFilterIcon size={16} />
          </div>
          Refine Leads
        </div>
        <button 
          onClick={onclose}
          className="p-1.5 hover:bg-black/5 rounded-full transition-colors text-[var(--text-main)]/40 hover:text-[var(--text-main)]"
        >
          <X size={20} />
        </button>
      </div>

      {/* BODY */}
      <div className="p-7 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
        
        {/* STATUS SECTION */}
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-main)]/40 mb-4 ml-1">
            Filter by Status
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Lead.map((ele) => {
              const isActive = filters.status.includes(ele);
              return (
                <button
                  key={ele}
                  onClick={() => handleStatusChange(ele)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all text-sm font-bold
                    ${isActive 
                      ? "bg-[var(--accent-main)] border-[var(--accent-main)] text-white shadow-md shadow-[var(--accent-main)]/20" 
                      : "bg-white/50 border-black/5 text-[var(--text-main)] hover:border-[var(--accent-soft)]"
                    }`}
                >
                  <span className="capitalize">{ele}</span>
                  {isActive && <CheckCircle2 size={14} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVITY SECTION */}
        <div className="space-y-3">
          <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--text-main)]/40 ml-1">
            Activity Period
          </label>
          <div className="relative">
            <select
              value={filters.activity}
              onChange={(e) =>
                setFilters((pre) => ({ ...pre, activity: e.target.value }))
              }
              className="w-full h-12 rounded-2xl bg-white/70 border border-black/5 px-4 
                         text-[var(--text-main)] font-semibold appearance-none focus:ring-2 
                         focus:ring-[var(--accent-main)] outline-none transition-all cursor-pointer"
            >
              <option value="">Any Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
               <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
               </svg>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center gap-3 px-7 py-5 border-t border-black/5 bg-black/5 rounded-b-[2.5rem]">
        <button
          onClick={() => {
            setFilters({ status: [], activity: "", company: "", Assign: "" });
            onclear();
          }}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-main)]/50 hover:text-red-500 transition-colors"
        >
          <RotateCcw size={14} />
          Reset
        </button>
        
        <button
          onClick={() => onApply(filters)}
          className="ml-auto h-12 px-8 rounded-[1.25rem]
                     bg-[var(--accent-main)] shadow-lg shadow-[var(--accent-main)]/20
                     text-white font-bold text-sm hover:scale-[1.03] active:scale-95 transition-all"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default ContactFilter;