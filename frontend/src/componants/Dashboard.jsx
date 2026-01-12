import React, { useEffect, useState } from "react";
import {
  CircleCheck,
  DollarSign,
  TrendingUp,
  CalendarDays,
  Goal,
  X,
  Pencil,
  Plus,
  Clock,
  Briefcase,
  Layers
} from "lucide-react";

/* ================= TASK MODAL (REFINED UI) ================= */

function TaskModal({ taskData, handleChange, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B252C]/40 backdrop-blur-sm transition-all animate-in fade-in duration-300">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[2.5rem] bg-[#E3E4DB] border border-white/40 p-10 space-y-6 shadow-[0_20px_50px_rgba(59,37,44,0.15)] relative overflow-hidden"
      >
        {/* Decorative Circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#AEA4BF]/20 rounded-full blur-3xl" />
        
        <div className="flex justify-between items-center relative z-10">
          <h2 className="text-3xl font-black text-[#3B252C] tracking-tight">
            {taskData.description ? "Update Task" : "Create Task"}
          </h2>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-[#8F6593]/10 text-[#3B252C] rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[#3B252C]/50 ml-2">Task Details</label>
            <input
              type="text"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Enter task description..."
              className="w-full h-14 rounded-2xl bg-white/50 border border-[#CDCDCD] px-5 text-[#3B252C] focus:ring-4 focus:ring-[#8F6593]/20 focus:bg-white outline-none transition-all placeholder:text-[#3B252C]/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[#3B252C]/50 ml-2">Deadline</label>
              <input
                type="date"
                name="duedate"
                value={taskData.duedate}
                onChange={handleChange}
                className="w-full h-14 rounded-2xl bg-white/50 border border-[#CDCDCD] px-5 outline-none focus:ring-4 focus:ring-[#8F6593]/20 transition-all text-[#3B252C]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[#3B252C]/50 ml-2">Priority</label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                required
                className="w-full h-14 rounded-2xl bg-white/50 border border-[#CDCDCD] px-5 outline-none focus:ring-4 focus:ring-[#8F6593]/20 transition-all text-[#3B252C] appearance-none cursor-pointer"
              >
                <option value="">Level</option>
                <option value="high">Critical</option>
                <option value="medium">Steady</option>
                <option value="low">Minor</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[#3B252C]/50 ml-2">Organization</label>
            <input
              type="text"
              name="searchcompany"
              value={taskData.searchcompany}
              onChange={handleChange}
              placeholder="Search or add company"
              className="w-full h-14 rounded-2xl bg-white/50 border border-[#CDCDCD] px-5 outline-none focus:ring-4 focus:ring-[#8F6593]/20 transition-all text-[#3B252C]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-16 rounded-2xl bg-[#8F6593] text-white font-black text-lg shadow-[0_10px_25px_-5px_rgba(143,101,147,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(143,101,147,0.5)] hover:-translate-y-1 active:scale-95 transition-all mt-4"
        >
          {taskData.description ? "Confirm Update" : "Launch Task"}
        </button>
      </form>
    </div>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard() {
  const [isForm, setIsForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [taskData, setTaskData] = useState({
    description: "",
    duedate: "",
    priority: "",
    searchcompany: "",
  });

  const cardBase = "bg-white/50 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem]";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/tasks/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(taskData),
      });
      if (res.ok) {
        fetchTask();
        setIsForm(false);
        setTaskData({ description: "", duedate: "", priority: "", searchcompany: "" });
      }
    } catch (err) { console.log(err); }
  };

  const fetchTask = async () => {
    try {
      let res = await fetch("http://localhost:3000/api/tasks/fetch-task");
      res = await res.json();
      setTasks(res.task);
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const editTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/edit-task/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(taskData),
      });
      if (res.ok) {
        setEditForm(false);
        fetchTask();
      }
    } catch (err) { console.log(err); }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-600 border-red-100";
      case "medium": return "bg-amber-50 text-amber-600 border-amber-100";
      case "low": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default: return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  return (
    <div className="flex-1 lg:ml-64 p-6 md:p-12 bg-[#E3E4DB] min-h-screen font-sans selection:bg-[#8F6593] selection:text-white">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#8F6593] font-bold tracking-widest text-xs uppercase">
             <Layers size={16} /> Workflow Dashboard
          </div>
          <h1 className="text-5xl font-black text-[#3B252C] tracking-tight">
            Overview
          </h1>
        </div>

        <button
          onClick={() => setIsForm(true)}
          className="group flex items-center gap-3 px-8 py-4 rounded-[1.5rem] bg-[#8F6593] text-white font-bold shadow-[0_15px_30px_-10px_rgba(143,101,147,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(143,101,147,0.6)] hover:-translate-y-1.5 transition-all duration-300"
        >
          <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-180 transition-transform duration-500">
            <Plus size={18} strokeWidth={3} />
          </div>
          Create Task
        </button>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { label: "Revenue", val: "$142,500", icon: DollarSign, trend: "+12%", color: "text-emerald-500" },
          { label: "Meetings", val: "18", icon: CalendarDays, sub: "Scheduled this week" },
          { label: "Efficiency", val: "78%", icon: Goal, progress: 78 }
        ].map((item, idx) => (
          <div key={idx} className={`${cardBase} p-8 group hover:border-[#8F6593]/30 transition-colors`}>
             <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-[#AEA4BF]/10 rounded-2xl group-hover:scale-110 transition-transform">
                  <item.icon className="text-[#8F6593]" size={28} />
                </div>
                {item.trend && (
                  <span className="flex items-center gap-1 text-xs font-black px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                    <TrendingUp size={12} /> {item.trend}
                  </span>
                )}
             </div>
             <p className="text-[10px] font-black text-[#3B252C]/40 uppercase tracking-[0.2em]">{item.label}</p>
             <h2 className="text-4xl font-black text-[#3B252C] mt-1 tracking-tight">{item.val}</h2>
             
             {item.sub && <p className="text-xs font-bold text-[#3B252C]/30 mt-4 italic">{item.sub}</p>}
             {item.progress && (
                <div className="w-full bg-[#CDCDCD]/30 h-2.5 rounded-full mt-6 overflow-hidden">
                  <div className="bg-[#8F6593] h-full rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }} />
                </div>
             )}
          </div>
        ))}
      </div>

      {/* TASKS SECTION */}
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-[#3B252C]">Task Queue</h2>
            <div className="h-[2px] w-12 bg-[#AEA4BF]" />
          </div>
          <span className="px-5 py-2 rounded-2xl bg-white/50 border border-white shadow-sm text-[#3B252C] font-black text-xs uppercase tracking-wider">
            {tasks.length} Active
          </span>
        </div>

        <div className="grid gap-5">
          {tasks.map((ele) => (
            <div
              key={ele._id}
              className="group flex flex-col sm:row justify-between items-center p-2 pr-6 rounded-[2rem] bg-white/40 border border-white/60 hover:bg-white/80 hover:shadow-[0_20px_40px_-15px_rgba(59,37,44,0.08)] transition-all duration-500"
            >
              <div className="flex flex-1 items-center gap-6 w-full p-4">
                <div className={`w-2 h-12 rounded-full ${ele.priority === 'high' ? 'bg-[#8F6593] shadow-[0_0_15px_rgba(143,101,147,0.5)]' : 'bg-[#AEA4BF]/40'}`} />
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#3B252C] group-hover:text-[#8F6593] transition-colors line-clamp-1">
                    {ele.description}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#3B252C]/40 uppercase tracking-wider">
                      <Briefcase size={13} className="text-[#8F6593]" /> {ele.company_name}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#3B252C]/40 uppercase tracking-wider">
                      <Clock size={13} className="text-[#8F6593]" /> {ele.due_date?.split("T")[0]}
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                  <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${getPriorityStyles(ele.priority)}`}>
                    {ele.priority}
                  </span>

                  <button
                    onClick={() => {
                      setEditId(ele._id);
                      setEditForm(true);
                      setTaskData({
                        description: ele.description,
                        duedate: ele.due_date?.split("T")[0],
                        priority: ele.priority,
                        searchcompany: ele.company_name,
                      });
                    }}
                    className="p-4 rounded-2xl bg-white text-[#3B252C]/30 hover:text-[#8F6593] hover:shadow-lg transition-all active:scale-90"
                  >
                    <Pencil size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {tasks.length === 0 && (
             <div className="text-center py-20 border-2 border-dashed border-[#CDCDCD] rounded-[2.5rem]">
                <p className="text-[#3B252C]/40 font-bold">No tasks found. Relax or create one!</p>
             </div>
          )}
        </div>
      </div>

      {/* MODAL TRIGGER LOGIC */}
      {isForm && (
        <TaskModal
          taskData={taskData}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          onClose={() => setIsForm(false)}
        />
      )}

      {editForm && (
        <TaskModal
          taskData={taskData}
          handleChange={handleChange}
          onSubmit={editTask}
          onClose={() => {setEditForm(false)
            setTaskData({
                        description:"",
                        duedate:"",
                        priority:"",
                        searchcompany:""
                      });
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;