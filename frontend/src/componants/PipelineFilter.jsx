import { useEffect, useRef, useState } from "react";

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

  // ✅ FIXED FILTER STATE (date added properly)
  const [filters, setFilters] = useState({
    stage: [],
    AssignedTo: [],
    lead_Source: [],
    closeDateFrom: "",
    closeDateTo: "",
  });

  // outside click
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
      className="absolute right-0 mt-2 w-[520px] rounded-xl
                 bg-[#0f1115] border border-white/10 shadow-2xl z-50 text-white"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="font-semibold">Filter</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-6 px-4 pt-3 border-b border-white/10 text-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-400 font-medium"
                : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OPTIONS */}
      <div className="px-4 py-4 text-sm">
        {activeTab !== "Close Date" ? (
          <div className="grid grid-cols-2 gap-4 bg-[#1a1d21] p-4 rounded-lg">
            {OPTIONS[activeTab].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 cursor-pointer text-gray-200"
              >
                <input
                  type="checkbox"
                  checked={filters[mapKey[activeTab]].includes(item)}
                  onChange={() => toggle(mapKey[activeTab], item)}
                  className="accent-blue-600"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        ) : (
          // ✅ CLOSE DATE UI
          <div className="flex gap-6 bg-[#1a1d21] p-4 rounded-lg">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">From Date</label>
              <input
                type="date"
                value={filters.closeDateFrom}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    closeDateFrom: e.target.value,
                  }))
                }
                className="bg-[#111418] text-white border border-white/10
                           rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">To Date</label>
              <input
                type="date"
                value={filters.closeDateTo}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    closeDateTo: e.target.value,
                  }))
                }
                className="bg-[#111418] text-white border border-white/10
                           rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center px-4 py-3 border-t border-white/10">
        <button
          onClick={() => {
            const emptyFilters = {
              stage: [],
              AssignedTo: [],
              lead_Source: [],
              closeDateFrom: "",
              closeDateTo: "",
            };
            setFilters(emptyFilters);
            onApply(emptyFilters);
          }}
          className="text-sm text-gray-400 hover:text-white"
        >
          Clear
        </button>

        <button
          onClick={() => onApply(filters)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700
                     text-white rounded-md text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
