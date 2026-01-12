import { X, ClipboardList, Calendar, Clock, Flag, User, Link as LinkIcon, Bell, AlignLeft } from "lucide-react";
import { useEffect, useState } from "react";

function AddTaskForm({ onClose, fetchAll }) {
  const [Task, SetTask] = useState({
    Title: "",
    DUE_DATE: "",
    Due_Time: "",
    Priority: "",
    Assignee: "",
    ContactDeal: "",
    Reminder: "",
    Notes: "",
  });

  const [AllUser, setAllUser] = useState([]);

  const Handlechange = (e) => {
    const { name, value } = e.target;
    SetTask((pre) => ({ ...pre, [name]: value }));
  };

  const fetchUsers = async () => {
    let res = await fetch("http://localhost:3000/api/tasks/get-users");
    res = await res.json();
    setAllUser(res);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/tasks/add-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(Task),
    });

    if (res.ok) {
      fetchAll();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center px-4 animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[var(--bg-main)] rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden scale-in-center">
        
        <form onSubmit={handleSubmit} className="flex flex-col max-h-[90vh]">
          
          {/* HEADER */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-black/5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[var(--accent-main)] rounded-xl text-white">
                <ClipboardList size={22} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[var(--text-main)] tracking-tight">
                  Create New Task
                </h2>
                <p className="text-[10px] font-bold text-[var(--text-main)]/40 uppercase tracking-widest">Assignment details</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="text-[var(--text-main)]/40 hover:text-[var(--text-main)]" size={24} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
            
            {/* TASK TITLE */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--text-main)]/50 ml-1">
                <AlignLeft size={14} /> Task Title / Description
              </label>
              <input
                name="Title"
                value={Task.Title}
                onChange={Handlechange}
                required
                placeholder="What needs to be done?"
                className="w-full h-14 rounded-2xl bg-white/60 border border-white/40 px-5 text-[var(--text-main)] font-semibold placeholder:text-[var(--text-main)]/20 focus:bg-white focus:ring-2 focus:ring-[var(--accent-main)] outline-none transition-all"
              />
            </div>

            {/* DATE & TIME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--text-main)]/50 ml-1">
                  <Calendar size={14} /> Due Date
                </label>
                <input
                  type="date"
                  name="DUE_DATE"
                  value={Task.DUE_DATE}
                  onChange={Handlechange}
                  className="w-full h-12 rounded-2xl bg-white/60 border border-white/40 px-5 text-[var(--text-main)] font-semibold outline-none focus:ring-2 focus:ring-[var(--accent-main)] transition-all cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--text-main)]/50 ml-1">
                  <Clock size={14} /> Due Time
                </label>
                <input
                  type="time"
                  name="Due_Time"
                  value={Task.Due_Time}
                  onChange={Handlechange}
                  className="w-full h-12 rounded-2xl bg-white/60 border border-white/40 px-5 text-[var(--text-main)] font-semibold outline-none focus:ring-2 focus:ring-[var(--accent-main)] transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* PRIORITY & ASSIGNEE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--text-main)]/50 ml-1">
                  <Flag size={14} /> Priority Level
                </label>
                <select
                  name="Priority"
                  value={Task.Priority}
                  onChange={Handlechange}
                  className="w-full h-12 rounded-2xl bg-white/60 border border-white/40 px-5 text-[var(--text-main)] font-bold outline-none focus:ring-2 focus:ring-[var(--accent-main)] transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Priority</option>
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--text-main)]/50 ml-1">
                  <User size={14} /> Assigned To
                </label>
                <select
                  name="Assignee"
                  value={Task.Assignee}
                  onChange={Handlechange}
                  className="w-full h-12 rounded-2xl bg-white/60 border border-white/40 px-5 text-[var(--text-main)] font-bold outline-none focus:ring-2 focus:ring-[var(--accent-main)] transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select User</option>
                  {AllUser.map((u) => (
                    <option key={u._id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LINKED & REMINDER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--text-main)]/50 ml-1">
                  <LinkIcon size={14} /> Link to Contact / Deal
                </label>
                <input
                  name="ContactDeal"
                  value={Task.ContactDeal}
                  onChange={Handlechange}
                  placeholder="e.g. John Doe / Web Project"
                  className="w-full h-12 rounded-2xl bg-white/60 border border-white/40 px-5 text-[var(--text-main)] font-semibold outline-none focus:ring-2 focus:ring-[var(--accent-main)] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--text-main)]/50 ml-1">
                  <Bell size={14} /> Reminder
                </label>
                <select
                  name="Reminder"
                  value={Task.Reminder}
                  onChange={Handlechange}
                  className="w-full h-12 rounded-2xl bg-white/60 border border-white/40 px-5 text-[var(--text-main)] font-bold outline-none focus:ring-2 focus:ring-[var(--accent-main)] transition-all appearance-none cursor-pointer"
                >
                  <option value="">None</option>
                  <option value="15m">15 minutes before</option>
                  <option value="1h">1 hour before</option>
                  <option value="1d">1 day before</option>
                </select>
              </div>
            </div>

            {/* NOTES */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-[var(--text-main)]/50 ml-1">
                Additional Notes
              </label>
              <textarea
                name="Notes"
                value={Task.Notes}
                onChange={Handlechange}
                placeholder="Describe the task requirements in detail..."
                className="w-full h-32 rounded-3xl bg-white/60 border border-white/40 p-5 text-[var(--text-main)] font-medium outline-none focus:ring-2 focus:ring-[var(--accent-main)] transition-all resize-none shadow-inner"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 px-8 py-6 border-t border-black/5 bg-black/5 rounded-b-[2.5rem]">
            <button
              type="button"
              onClick={onClose}
              className="h-12 px-6 rounded-2xl font-bold text-[var(--text-main)]/60 hover:bg-black/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-12 px-10 rounded-2xl bg-[var(--accent-main)] text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-[var(--accent-main)]/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Submit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskForm;