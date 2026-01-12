import {
  ListFilter,
  Plus,
  Search,
  Clock,
  X,
  Building2,
  Tag,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PipelineFilter from "./PipelineFilter";

/* ---------------- DRAGGABLE CARD ---------------- */

function DraggableCard({ ele }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: ele._id,
      data: ele,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-white/80 border border-white/50 rounded-[1.25rem] p-5 cursor-grab
        hover:shadow-lg hover:border-[var(--accent-soft)] transition-all duration-200
        active:cursor-grabbing group ${isDragging ? "shadow-2xl scale-105" : "shadow-sm"}
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="px-2 py-0.5 rounded-md bg-[var(--accent-soft)]/20 text-[10px] font-black uppercase tracking-wider text-[var(--accent-main)]">
          {ele.lead_Source || "General"}
        </span>
        <div className="h-2 w-2 rounded-full bg-[var(--accent-main)] opacity-40 group-hover:animate-pulse" />
      </div>

      <h2 className="font-bold text-[var(--text-main)] leading-tight mb-1 group-hover:text-[var(--accent-main)] transition-colors">
        {ele.opportunitie}
      </h2>

      <div className="flex items-center gap-1.5 text-sm text-[var(--text-main)]/50 mb-4">
        <Building2 size={13} />
        <span className="truncate">{ele.company_name}</span>
      </div>

      <div className="pt-3 border-t border-black/5 flex justify-between items-center">
        <div className="flex items-center gap-1 font-black text-[var(--text-main)]">
          <span className="text-[var(--accent-main)] text-xs">₹</span>
          {Number(ele.rate).toLocaleString()}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-main)]/40 bg-black/5 px-2 py-1 rounded-lg">
          <Clock size={12} />
          {ele.close_Date}
        </div>
      </div>
    </div>
  );
}

/* ---------------- DROPPABLE COLUMN ---------------- */

function DroppableColumn({ stage, children, count }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div
      ref={setNodeRef}
      className={`
        min-w-[320px] max-w-[320px] flex flex-col gap-4 p-4 rounded-[2rem] transition-all duration-300
        ${isOver ? "bg-[var(--accent-soft)]/30 ring-2 ring-[var(--accent-main)] ring-dashed" : "bg-white/30 backdrop-blur-sm"}
      `}
    >
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-2">
            <h3 className="font-black text-sm uppercase tracking-widest text-[var(--text-main)]/70">{stage}</h3>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/50 text-[10px] font-bold text-[var(--text-main)] border border-white">
                {count}
            </span>
        </div>
        <Plus size={16} className="text-[var(--text-main)]/30 cursor-pointer hover:text-[var(--accent-main)]" />
      </div>
      
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-250px)] pr-1 custom-scrollbar">
        {children}
      </div>
    </div>
  );
}

/* ---------------- MAIN ---------------- */

function Pipeline() {
  const [form, setForm] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const [search, setSearch] = useState("");
  const [oppoData, setOppoData] = useState([]);

  const [opportunities, setOpportunities] = useState({
    opportunitie: "",
    company_name: "",
    rate: "",
    close_Date: "",
    stage: "",
    lead_Source: "",
    AssignedTo: "",
    Description: "",
  });

  // Logic remains exactly the same as requested
  const fetchOpportunity = async () => {
    let res = await fetch("http://localhost:3000/api/tasks/fetch-opportunity");
    res = await res.json();
    setOppoData(res);
  };

  useEffect(() => { fetchOpportunity(); }, []);

  const fetchPipelineDeals = async (filters) => {
    let res = await fetch("http://localhost:3000/api/tasks/filter-opportunity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(filters),
    });
    if (res.ok) {
      res = await res.json();
      setOppoData(res);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;
    const card = active.data.current;
    const newStage = over.id;
    if (card.stage === newStage) return;

    setOppoData((prev) =>
      prev.map((i) => i._id === card._id ? { ...i, stage: newStage } : i)
    );

    await fetch("http://localhost:3000/api/tasks/update-stage", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: card._id, stage: newStage }),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpportunities((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/tasks/add-opportunity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(opportunities),
    });
    let result = await res.json();
    if (res.ok) {
      toast.success(result.message);
      setForm(false);
      fetchOpportunity();
      setOpportunities({ opportunitie: "", company_name: "", rate: "", close_Date: "", stage: "", lead_Source: "", AssignedTo: "", Description: "" });
    } else toast.error(result.message);
  };

  return (
    <div className="flex-1 lg:ml-64 p-8 bg-[var(--bg-main)] min-h-screen font-sans">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-[var(--text-main)] tracking-tight">Sales Pipeline</h1>
          <p className="text-[var(--text-main)]/60 font-medium">Drag and drop deals to update their stage.</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            ref={btnRef}
            onClick={() => setOpen(!open)}
            className="flex-1 md:flex-none h-12 px-5 rounded-2xl bg-white border border-white/60 shadow-sm flex items-center justify-center gap-2 font-bold text-[var(--text-main)] hover:bg-gray-50 transition-all"
          >
            <ListFilter size={18} /> Filter
          </button>

          <button
            onClick={() => setForm(true)}
            className="group hover:-translate-y-1 flex-1 md:flex-none h-12 px-6 rounded-2xl bg-[var(--accent-main)] text-white font-bold shadow-lg shadow-[var(--accent-main)]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus className="group-hover:rotate-90 transition-transform" size={20} /> New Deal
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-10 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-main)]/30" size={20} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by opportunity or company..."
          className="w-full h-14 rounded-2xl pl-12 pr-4 bg-white/60 backdrop-blur-md border border-white/40 shadow-sm focus:bg-white focus:ring-2 focus:ring-[var(--accent-main)] outline-none transition-all text-lg"
        />
      </div>

      {open && (
        <PipelineFilter
          anchorRef={btnRef}
          onClose={() => setOpen(false)}
          onApply={(filters) => { fetchPipelineDeals(filters); setOpen(false); }}
        />
      )}

      {/* KANBAN BOARD */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-8 scroll-smooth custom-scrollbar">
          {["Discovery", "Qualified", "Proposal", "Negotiation", "Close"].map((stage) => {
             const stageCards = oppoData.filter((ele) => ele.stage === stage);
             return (
                <DroppableColumn key={stage} stage={stage} count={stageCards.length}>
                    {stageCards.map((ele) => (
                        <DraggableCard key={ele._id} ele={ele} />
                    ))}
                    {stageCards.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 opacity-20 border-2 border-dashed border-[var(--text-main)] rounded-2xl">
                             <Tag size={24} />
                             <span className="text-[10px] font-bold uppercase mt-2">Empty Stage</span>
                        </div>
                    )}
                </DroppableColumn>
             );
          })}
        </div>
      </DndContext>

      {/* REFINED MODAL */}
      {form && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center px-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[var(--bg-main)] border border-white/20 rounded-[2.5rem] shadow-2xl p-8 scale-in-center">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-[var(--accent-main)] rounded-2xl text-white">
                        <Wallet size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-[var(--text-main)]">Add Opportunity</h2>
                        <p className="text-xs font-bold text-[var(--text-main)]/40 uppercase tracking-widest">Pipeline Management</p>
                    </div>
                </div>
                <button type="button" onClick={() => setForm(false)} className="p-2 hover:bg-black/5 rounded-full transition">
                    <X className="text-[var(--text-main)]" size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40 ml-1">Opportunity Name</label>
                  <input name="opportunitie" value={opportunities.opportunitie} onChange={handleChange} placeholder="Project Alpha" className="w-full h-12 rounded-2xl bg-white border border-white/40 px-4 focus:ring-2 focus:ring-[var(--accent-main)] outline-none transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40 ml-1">Company</label>
                  <input name="company_name" value={opportunities.company_name} onChange={handleChange} placeholder="Acme Corp" className="w-full h-12 rounded-2xl bg-white border border-white/40 px-4 focus:ring-2 focus:ring-[var(--accent-main)] outline-none transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40 ml-1">Value (₹)</label>
                  <input name="rate" value={opportunities.rate} onChange={handleChange} placeholder="50,000" className="w-full h-12 rounded-2xl bg-white border border-white/40 px-4 focus:ring-2 focus:ring-[var(--accent-main)] outline-none transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40 ml-1">Target Close Date</label>
                  <input type="date" name="close_Date" value={opportunities.close_Date} onChange={handleChange} className="w-full h-12 rounded-2xl bg-white border border-white/40 px-4 focus:ring-2 focus:ring-[var(--accent-main)] outline-none transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40 ml-1">Pipeline Stage</label>
                  <select name="stage" value={opportunities.stage} onChange={handleChange} className="w-full h-12 rounded-2xl bg-white border border-white/40 px-4 outline-none focus:ring-2 focus:ring-[var(--accent-main)]">
                    <option value="">Select Stage</option>
                    <option>Discovery</option>
                    <option>Qualified</option>
                    <option>Proposal</option>
                    <option>Negotiation</option>
                    <option>Close</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40 ml-1">Lead Source</label>
                  <select name="lead_Source" value={opportunities.lead_Source} onChange={handleChange} className="w-full h-12 rounded-2xl bg-white border border-white/40 px-4 outline-none focus:ring-2 focus:ring-[var(--accent-main)]">
                    <option value="">Select Source</option>
                    <option>Website</option>
                    <option>Referral</option>
                    <option>LinkedIn</option>
                    <option>Cold Call</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]/40 ml-1">Notes / Description</label>
                <textarea name="Description" value={opportunities.Description} onChange={handleChange} placeholder="Key requirements..." className="w-full h-24 rounded-2xl bg-white border border-white/40 p-4 focus:ring-2 focus:ring-[var(--accent-main)] outline-none transition-all resize-none" />
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setForm(false)} className="h-12 px-6 rounded-2xl font-bold text-[var(--text-main)]/60 hover:bg-black/5 transition-all">Cancel</button>
                <button type="submit" className="h-12 px-8 rounded-2xl bg-[var(--accent-main)] text-white font-bold shadow-lg shadow-[var(--accent-main)]/20 hover:scale-[1.02] active:scale-95 transition-all">Save Opportunity</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pipeline;