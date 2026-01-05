import { ArrowUpWideNarrow, Calendar, CircleCheck, Flame, ListFilter, Plus, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'

function Task() {
  return (
    <>
    <div className="bg-[#111418] flex h-screen overflow-hidden">

        {/* right side */}

<div className="flex-1 ml-64 p-5 h-screen overflow-y-auto">

<div className="flex justify-between">
<div>
    <h2 className="text-white text-3xl font-semibold">Sales Pipeline</h2>
    <p className="text-[#9CABBA]">Monitor sales performance, track targets, and analyze revenue streams.</p>

</div>

<div>
</div>
<div className="flex gap-5 backdrop-blur-lg bg-white/10 border border-white/10 rounded-lg p-3">
    <div>

    <h2 className="text-[#9CABBA]">Quarter Goal</h2>
    <p className="text-white text-xl">$150,000
</p>
    </div>
    <div>
        <p className="text-[#9CABBA]">Pacing</p>
        <p className="text-white text-xl">+12.5%</p>
    </div>
</div>
</div>


<div className="flex gap-20 items-center mt-10 justify-between">

<div className="text-white w-full flex gap-5 ">

<input
  type="text"
  className="
    w-full flex-1
    bg-[#283039]
    text-white
    focus:border-blue-600
    focus:outline-none
    border 
    px-3
    h-10
    rounded-lg
    text-sm
    placeholder:text-[#9cabba]
  "
  placeholder="Search tasks, contacts, or deals..."
/>

</div>

<div className="text-white flex gap-4">
    <button className="bg-[#283039] flex gap-2 items-center rounded-lg p-2 w-25"><ListFilter />Filter</button>
    <button className="bg-[#2563EB] w-50 font-semibold pl-4 gap-2 flex rounded-lg items-center"><Plus />Add Opportunity</button>
</div>


</div>


<div className="mt-8 flex gap-4">
<div className="flex items-center">
 
<button onClick={()=> setFilterData("all")} className="flex items-center h-8 px-4 rounded-3xl bg-[#283039] text-white ">All Tasks</button>
</div>
<div className="flex">
<button onClick={()=> setFilterData("new")} className="h-8 w-35 flex items-center rounded-3xl justify-center gap-2 bg-[#283039] text-white "><Flame  size={15} className='text-red-400'/>High Priority</button>
</div>
<button onClick={()=> setFilterData("contacted")} className="h-8 px-3 flex items-center gap-2 rounded-3xl bg-[#283039] text-white "><Calendar size={15} className='text-blue-400'/>  Due Today</button>
<button onClick={()=> setFilterData("Qualified")} className="h-8 w-30 flex justify-center items-center rounded-3xl bg-[#283039] text-white gap-2 "><ArrowUpWideNarrow  size={17} className='text-yellow-400'/> Upcoming</button>
<button onClick={()=> setFilterData("Unresponsive")} className="h-8 px-2 w-30 flex justify-center items-center rounded-3xl bg-[#283039] text-white gap-2"><CircleCheck size={15} className='text-green-400'/>Completed</button>

</div>











</div>


      </div>
    
    </>
  )
}

export default Task
