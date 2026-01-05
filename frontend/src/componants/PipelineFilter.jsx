import { useEffect, useRef, useState } from "react";

const TABS = [
  "Stage",
  "Assigned To",
  "Lead Source",
  "Status",
];

const OPTIONS = {
  Stage: ["Discovery", "Qualified", "Proposal", "Won", "Lost"],
  "Assigned To": ["Rahul", "Sales Manager", "Sales Executive"],
  "Lead Source": ["Website", "Referral", "Email Inquiry", "Self"],
  Status: ["Open", "Won", "Lost"],
};

export default function PipelineFilter({ onApply, onClose, anchorRef }) {
  const dropdownRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Stage");

  const [filters, setFilters] = useState({
    stage: [],
    assignedTo: [],
    leadSource: [],
    status: [],
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
    "Assigned To": "assignedTo",
    "Lead Source": "leadSource",
    Status: "status",
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-[520px] rounded-xl border border-slate-200 bg-white shadow-xl z-50"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="font-semibold text-slate-800">Filter</span>
        <button onClick={onClose} className="text-slate-500">✕</button>
      </div>

      {/* TABS */}
      <div className="flex gap-6 px-4 pt-3 border-b text-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-slate-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OPTIONS */}
      <div className="px-4 py-4 grid grid-cols-4 gap-4 text-sm">
        {OPTIONS[activeTab].map((item) => (
          <label key={item} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters[mapKey[activeTab]].includes(item)}
              onChange={() => toggle(mapKey[activeTab], item)}
              className="accent-blue-600"
            />
            <span className="text-slate-700">{item}</span>
          </label>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center px-4 py-3 border-t">
        <button
          onClick={() =>
            setFilters({
              stage: [],
              assignedTo: [],
              leadSource: [],
              status: [],
            })
          }
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          Clear
        </button>

        <button
          onClick={() => onApply(filters)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
