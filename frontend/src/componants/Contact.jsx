import React, { useEffect, useRef, useState } from "react";
import { Search, ListFilter, Plus, X, Linkedin, Mail, Phone, Clock, UserPlus, SearchCheck, ExternalLink } from "lucide-react";
import ContactFilter from "./ContactFilter";

function Contact() {
  const [isForm, setIsForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);

  const [leadData, setLeadData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState("all");

  const [taskData, setTaskData] = useState({
    fullname: "",
    email: "",
    phone: "",
    linked: "",
    status: "",
  });

  // Logic unchanged as per request
  const fetchLead = async () => {
    let res = await fetch("http://localhost:3000/api/tasks/fetch-lead");
    res = await res.json();
    setLeadData(res);
  };

  const FilterData = async (filters) => {
    let res = await fetch("http://localhost:3000/api/tasks/filter-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(filters),
    });
    res = await res.json();
    setLeadData(res);
  };

  useEffect(() => {
    fetchLead();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/tasks/contact-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(taskData),
    });
    if (res.ok) {
      fetchLead();
      setIsForm(false);
      setTaskData({ fullname: "", email: "", phone: "", linked: "", status: "" });
    }
  };

  const searchFilter = leadData.filter((ele) => {
    const statusMatch = filterData === "all" || ele.status === filterData;
    const q = search.toLowerCase();
    return (
      statusMatch &&
      (ele.fullname?.toLowerCase().includes(q) ||
        ele.email?.toLowerCase().includes(q))
    );
  });

  const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  // Modern Color Mapping
  const statusStyle = {
    new: "bg-[#AEA4BF]/20 text-[#8F6593] border-[#AEA4BF]/30",
    Qualified: "bg-emerald-50 text-emerald-600 border-emerald-100",
    contacted: "bg-amber-50 text-amber-600 border-amber-100",
    Unresponsive: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className="flex-1 lg:ml-64 p-6 md:p-12 bg-[#E3E4DB] min-h-screen font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black text-[#3B252C] tracking-tight">
            Contacts
          </h1>
          <p className="text-[#3B252C]/50 font-bold mt-2 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#8F6593]"></span> 
            {leadData.length} Professional Leads
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            ref={btnRef}
            onClick={() => setIsOpen(!isOpen)}
            className="h-14 px-6 rounded-2xl bg-white border border-white/60 shadow-sm flex items-center gap-2 font-black text-[#3B252C] hover:bg-[#CDCDCD]/20 transition-all active:scale-95"
          >
            <ListFilter size={20} className="text-[#8F6593]" /> Filter
          </button>
          
          <button
            onClick={() => setIsForm(true)}
            className="group h-14 px-8 rounded-2xl bg-[#8F6593] text-white shadow-[0_10px_20px_-5px_rgba(143,101,147,0.4)] flex items-center gap-3 font-black hover:-translate-y-1 transition-all active:scale-95"
          >
            <Plus size={22} strokeWidth={3} className="group-hover:rotate-90 transition-transform" /> 
            Add Lead
          </button>
        </div>
      </div>

      {/* SEARCH BAR - NEUMORPHIC STYLE */}
      <div className="relative mb-10 group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#3B252C]/30 group-focus-within:text-[#8F6593] transition-colors">
          <Search size={22} />
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by identity, mail or digital footprint..."
          className="w-full h-16 rounded-[1.5rem] pl-14 pr-6 bg-white/40 backdrop-blur-sm border border-white shadow-inner focus:ring-4 focus:ring-[#8F6593]/10 focus:bg-white/80 outline-none transition-all text-lg font-medium text-[#3B252C] placeholder:text-[#3B252C]/30"
        />
      </div>

      {isOpen && (
        <ContactFilter
          formRef={btnRef}
          onclose={() => setIsOpen(false)}
          onclear={fetchLead}
          onApply={(filters) => {
            FilterData(filters);
            setIsOpen(false);
          }}
        />
      )}

      {/* TABLE CONTAINER - GLASSMORPHISM */}
      <div className="rounded-[2.5rem] bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_rgba(59,37,44,0.05)] overflow-hidden">
        <div className="overflow-x-auto text-nowrap">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#CDCDCD]/20 text-[#3B252C]/40 uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="px-8 py-6">Lead Identity</th>
                <th className="px-8 py-6">Communication</th>
                <th className="px-8 py-6 text-center">Lifecycle Status</th>
                <th className="px-8 py-6 text-center">Network</th>
                <th className="px-8 py-6 text-right">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {searchFilter.map((ele) => (
                <tr key={ele._id} className="hover:bg-white/60 transition-all group cursor-default">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#8F6593] text-white flex items-center justify-center font-black shadow-lg shadow-[#8F6593]/20 group-hover:scale-110 transition-transform">
                        {ele.fullname.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-[#3B252C] text-lg leading-none mb-1">
                          {ele.fullname}
                        </div>
                        <div className="text-[10px] font-bold text-[#8F6593] uppercase tracking-tighter">Verified Prospect</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#3B252C]">
                        <Mail size={14} className="text-[#AEA4BF]" /> {ele.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#3B252C]/40">
                        <Phone size={14} className="text-[#AEA4BF]" /> {ele.phone}
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6 text-center">
                    <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm inline-block ${statusStyle[ele.status] || "bg-gray-100"}`}>
                      {ele.status}
                    </span>
                  </td>

                  <td className="px-8 py-6 text-center">
                    {ele.linked ? (
                      <a href={ele.linked} target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <Linkedin size={18} />
                      </a>
                    ) : (
                      <span className="text-[#CDCDCD]">N/A</span>
                    )}
                  </td>

                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-sm font-black text-[#3B252C]/40">
                      <Clock size={16} className="text-[#8F6593]" /> {timeAgo(ele.createdAt)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {searchFilter.length === 0 && (
            <div className="p-24 text-center">
              <div className="inline-flex p-8 bg-white/50 rounded-full mb-4 text-[#CDCDCD]">
                <Search size={48} />
              </div>
              <h3 className="text-2xl font-black text-[#3B252C]">No Results Found</h3>
              <p className="text-[#3B252C]/40 font-bold">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* ADD LEAD MODAL - PREMIUM REFINEMENT */}
      {isForm && (
        <div className="fixed inset-0 z-50 bg-[#3B252C]/60 backdrop-blur-md flex items-center justify-center px-4 transition-all">
          <form
            onSubmit={handleSubmit}
            className="bg-[#E3E4DB] w-full max-w-xl p-10 rounded-[3rem] border border-white/40 shadow-[0_30px_100px_rgba(0,0,0,0.2)] space-y-8 relative overflow-hidden"
          >
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8F6593]/10 rounded-bl-[100%] border-b border-l border-white/20"></div>
            
            <div className="flex justify-between items-start relative">
              <div>
                <h2 className="text-3xl font-black text-[#3B252C] tracking-tight">Expand Network</h2>
                <p className="text-[#3B252C]/40 font-bold text-sm">Fill in the lead credentials below</p>
              </div>
              <button type="button" onClick={() => setIsForm(false)} className="h-12 w-12 flex items-center justify-center bg-white/50 hover:bg-white rounded-full transition-all shadow-sm">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {[
                {id: "fullname", label: "Full Identity", icon: <UserPlus size={16}/>, placeholder: "e.g. Alexander Pierce"},
                {id: "email", label: "Email Address", icon: <Mail size={16}/>, placeholder: "alex@company.com"},
                {id: "phone", label: "Contact Number", icon: <Phone size={16}/>, placeholder: "+1 (555) 000-000"},
                {id: "linked", label: "LinkedIn Profile", icon: <Linkedin size={16}/>, placeholder: "linkedin.com/in/user"}
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B252C]/50 flex items-center gap-2 ml-1">
                    {field.icon} {field.label}
                  </label>
                  <input
                    name={field.id}
                    value={taskData[field.id]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    className="w-full h-14 rounded-2xl bg-white/60 border border-white px-5 focus:ring-4 focus:ring-[#8F6593]/10 focus:bg-white outline-none transition-all font-bold text-[#3B252C] placeholder:text-[#3B252C]/20"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2 relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B252C]/50 ml-1">Lifecycle Stage</label>
              <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
                required
                className="w-full h-14 rounded-2xl bg-white/60 border border-white px-5 outline-none focus:ring-4 focus:ring-[#8F6593]/10 font-bold text-[#3B252C] appearance-none cursor-pointer"
              >
                <option value="">Select current status...</option>
                <option value="new">🆕 Fresh Prospect</option>
                <option value="Qualified">✅ MQL (Qualified)</option>
                <option value="contacted">📞 Active Dialogue</option>
                <option value="Unresponsive">⏳ Cold Lead</option>
              </select>
            </div>

            <button className="w-full h-16 rounded-[1.5rem] bg-[#8F6593] text-white font-black text-xl shadow-[0_15px_30px_-5px_rgba(143,101,147,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(143,101,147,0.5)] hover:-translate-y-1 active:scale-95 transition-all">
              Initialize Connection
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Contact;