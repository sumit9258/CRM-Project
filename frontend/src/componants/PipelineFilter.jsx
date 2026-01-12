import { useEffect, useRef, useState } from "react";
import { X, Filter, Calendar, CheckCircle2, RotateCcw } from "lucide-react";

const TABS = ["Stage", "Assigned To", "Lead Source", "Close Date"];

const OPTIONS = {
  Stage: ["Discovery", "Qualified", "Proposal", "Negotiation", "Close"],
  "Assigned To": [
    "Sales Executive – Rahul",
    "Sales Executive – Priya",
    "Sales Manager",
    "Self",
  ],
  "Lead Source": [
    "Website",
    "Inbound Call",
    "Email Inquiry",
    "Referral",
    "LinkedIn",
    "Facebook / Instagram Ads",
    "Google Ads",
    "Cold Call",
  ],
};

export default function PipelineFilter({ onApply, onClose, anchorRef }) {
  const dropdownRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Stage");

  const [filters, setFilters] = useState({
    stage: [],
    AssignedTo: [],
    lead_Source: [],
    closeDateFrom: "",
    closeDateTo: "",
  });

  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchorRef]);

  const toggle = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const mapKey = {
    Stage: "stage",
    "Assigned To": "AssignedTo",
    "Lead Source": "lead_Source",
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-[550px] z-[100]
                 rounded-[2.5rem] bg-[var(--bg-main)]/95 backdrop-blur-xl
                 border border-white/40 shadow-2xl animate-in fade-in zoom-in duration-200"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-8 py-6 border-b border-black/5">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--accent-main)] rounded-xl text-white">
                <Filter size={18} />
            </div>
            <h2 className="text-xl font-black text-[var(--text-main)] tracking-tight">
                Refine Pipeline
            </h2>
        </div>
        <button 
            onClick={onClose} 
            className="p-2 hover:bg-black/5 rounded-full transition-colors text-[var(--text-main)]/40 hover:text-[var(--text-main)]"
        >
          <X size={20} />
        </button>
      </div>

      {/* TAB NAVIGATION */}
      <div className="flex gap-2 px-8 pt-4 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 pb-3 text-xs font-black uppercase tracking-[0.1em] transition-all relative
              ${activeTab === tab 
                ? "text-[var(--accent-main)]" 
                : "text-[var(--text-main)]/40 hover:text-[var(--text-main)]"
              }`}
          >
            {tab}
            {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent-main)] rounded-full animate-in slide-in-from-bottom-1" />
            )}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="p-8 min-h-[280px]">
        {activeTab !== "Close Date" ? (
          <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-300">
            {OPTIONS[activeTab].map((item) => {
              const isSelected = filters[mapKey[activeTab]].includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggle(mapKey[activeTab], item)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all text-sm font-bold
                    ${isSelected 
                      ? "bg-[var(--accent-main)] border-[var(--accent-main)] text-white shadow-md shadow-[var(--accent-main)]/20" 
                      : "bg-white/50 border-black/5 text-[var(--text-main)] hover:border-[var(--accent-soft)]"
                    }`}
                >
                  <span className="truncate pr-2">{item}</span>
                  {isSelected && <CheckCircle2 size={14} className="shrink-0" />}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 text-[var(--accent-main)] mb-2">
                <Calendar size={18} />
                <span className="text-sm font-black uppercase tracking-widest">Select Date Range</span>
            </div>
            <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40 ml-1">
                    Closing From
                  </label>
                  <input
                    type="date"
                    value={filters.closeDateFrom}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, closeDateFrom: e.target.value }))
                    }
                    className="w-full h-12 rounded-2xl bg-white/70 border border-black/5 px-4 
                               text-[var(--text-main)] font-semibold outline-none focus:ring-2 focus:ring-[var(--accent-main)] transition-all"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40 ml-1">
                    Closing To
                  </label>
                  <input
                    type="date"
                    value={filters.closeDateTo}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, closeDateTo: e.target.value }))
                    }
                    className="w-full h-12 rounded-2xl bg-white/70 border border-black/5 px-4 
                               text-[var(--text-main)] font-semibold outline-none focus:ring-2 focus:ring-[var(--accent-main)] transition-all"
                  />
                </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-8 py-6 border-t border-black/5 bg-black/5 rounded-b-[2.5rem]">
        <button
          onClick={() => {
            const empty = {
              stage: [],
              AssignedTo: [],
              lead_Source: [],
              closeDateFrom: "",
              closeDateTo: "",
            };
            setFilters(empty);
            onApply(empty);
          }}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-main)]/40 hover:text-red-500 transition-colors"
        >
          <RotateCcw size={14} />
          Reset All
        </button>

        <button
          onClick={() => onApply(filters)}
          className="h-12 px-10 rounded-[1.25rem]
                     bg-[var(--accent-main)] text-white font-bold text-sm
                     shadow-lg shadow-[var(--accent-main)]/20 hover:scale-[1.03] active:scale-95 transition-all"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}