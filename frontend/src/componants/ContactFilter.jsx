import React, { useState } from "react";
import { ListFilterIcon, X } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";

const Lead = ["new", "Qualified", "Unresponsive", "contacted"];

function ContactFilter({ onApply,onclose,onclear,formRef }) {
  const [filters, setFilters] = useState({
    status: [],
    activity: "",
    company: "",
    Assign: "",
  });

const CardRef=useRef(null)
  const handleStatusChange =(value)=>{
    setFilters((pre)=>({
      ...pre,
      status:pre.status.includes(value)?
      pre.status.filter((item)=> item!=value)
      :[...pre.status,value]
    }))
  }

  useEffect(()=>{
    // console.log(CardRef.current)
    const handler=(e)=>{
if (CardRef.current&&!CardRef.current.contains(e.target)&&!formRef.current.contains(e.target)) {
 onclose() 
}
}
document.addEventListener("mousedown",handler)
return ()=> document.removeEventListener("mousedown",handler)
  },[onclose,formRef])


  return (
    <>
      <div ref={CardRef} className="absolute w-100 right-0 rounded-xl bg-[#1a1d21] border border-[#283039] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#283039] px-6 py-4">
          <div className="flex gap-2">
            <ListFilterIcon />
            <h2>Filter Leads</h2>
          </div>
          <div>
            <span>
              <X onClick={onclose} />
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4  max-h-[70vh]">
          <h2 className="text-lg">Lead Status</h2>
          <div className="grid grid-cols-2 gap-2">
            {Lead.map((ele) => (
              <label key={ele}>
                <input
                  className="rounded border-slate-600 bg-[#283039] text-primary focus:ring-offset-[#1a1d21] focus:ring-primary w-4 h-4"
                  type="checkbox"
                  checked={filters.status.includes(ele)}
onChange={()=> handleStatusChange(ele) }
                />
                <span className="text-sm text-[#9cabba] group-hover:text-white transition-colors">
                  {ele}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-2 space-y-4 ">
            <label>Last Activity</label> <br />
            <select
              className="w-full rounded-lg bg-[#283039] border-slate-600 text-white text-sm focus:ring-primary focus:border-primary py-2.5"
              name="activity" value={filters.activity} onChange={(e)=> setFilters((pre)=>({
                ...pre,
                activity:e.target.value
              }))}
            >
              <option value="">Select Activity</option>
              <option value="today">Today</option>
              <option value="yesterday">yesterday</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <label>Company</label> <br />
            <input
              name="company"
              value={filters.company}
              onChange={(e) =>
                setFilters((pre) => ({
                  ...pre,
                  company: e.target.value,
                }))
              }
              type="text"
              placeholder="Filter by company name"
              className="w-full rounded-lg bg-[#283039] border-slate-600 text-white text-sm pl-2 focus:ring-primary focus:border-primary py-2.5 placeholder:text-slate-500"
            />
            <label>Assign</label> <br />
            <select
              className="w-full rounded-lg bg-[#283039] border-slate-600 text-white text-sm focus:ring-primary focus:border-primary py-2.5"
              name="Assign" value={filters.Assign} onChange={(e)=> setFilters((pre)=>({
                ...pre,
                Assign:e.target.value
              }))}
            >
              <option value="">Select Activity</option>

              <option value="Sales Executive – Priya">
                Sales Executive – Priya
              </option>
              <option value="Sales Executive – Rahul">
                Sales Executive – Rahul
              </option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#283039] px-6 py-4 bg-[#21272e]">
          <button onClick={onclear} className="h-10">Clear All</button>
          <button
            onClick={() => onApply(filters)}
            className="bg-[#2563EB]  w-30 h-10 rounded-lg text-white font-semibold"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactFilter;
