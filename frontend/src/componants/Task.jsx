import { ArrowUpWideNarrow, Calendar, CircleCheck, CircleCheckBig, Flame, ListFilter, Plus, TrendingDown, TrendingUp, X } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import AddTaskForm from './AddTaskForm';
import { useEffect } from 'react';

function Task() {
  const [isforam,setIsforam]=useState(false)

const [data,setData]=useState([])
    
      const fetchTasks=async()=>{
    try {
        let res=await fetch("http://localhost:3000/api/tasks/fetch-tasks")
        res=await res.json()
        console.log(res);
        
setData(res)
    } catch (error) {
        console.log(error);
        
    }
  }

  useEffect(()=>{
    fetchTasks()
  },[])


  return (
    <>
    <div className="bg-[#111418] flex h-screen overflow-hidden">

        {/* right side */}

<div className="flex-1 ml-64 p-5 h-screen overflow-y-auto">

<div className="flex justify-between">
<div>
    <h2 className="text-white text-3xl font-semibold">Tasks Management
</h2>
    <p className="text-[#9CABBA]">Track your daily activities, follow-ups, and reminders.

</p>

</div>

<div>
</div>
<div className="flex  gap-5 backdrop-blur-lg border border-white/10 rounded-lg p-3">
    <div className='items-end flex flex-col'>

    <h2 className="text-[#9CABBA]">Pending</h2>
    <p className="text-white text-lg">10
</p>
    </div>
    <div className='flex flex-col items-end border-l border-[#283039] pl-6'>
        <p className="text-[#9CABBA]">Completed Today
</p>
        <p className="text-lg text-blue-400">12</p>
    </div>
    <div className='items-end flex flex-col border-l border-[#283039] pl-6'>
        <p className="text-[#9CABBA]">Overdue
</p>
        <p className="text-red-400 text-lg">12</p>
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
    <button onClick={()=> setIsforam(!isforam)}  className="flex w-45 items-center justify-center rounded-lg h-11 px-6 hover:bg-blue-600 bg-blue-500 text-white gap-2 text-sm font-bold"><CircleCheckBig size={18} />Add New Task</button>
</div>

{isforam&&(
  <AddTaskForm onClose={()=> setIsforam(false)} fetchAll={fetchTasks}/>
)}

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



<div className="border mt-5 overflow-x-auto border-white/10 rounded-lg">
<table  className="min-w-full textsm">

<thead className="p-5 text-[#9CABBA] bg-[#21272E]">
  <tr >
<th className="px-4 py-3 text-left">Task Description</th>
<th className="px-4 py-3 text-left">Related To</th>
<th className="px-4 py-3 text-left">Due Date</th>
<th className="px-4 py-3 text-left">Priority</th>
<th className="px-4 py-3 text-left">Owner</th>

  </tr>
</thead>
{data.map((ele)=>(

<tbody >
  <tr className="bg-[#1a1d21] hover:bg-white/5">
    <td className="px-4 py-4">
      <p className="text-white">{ele.Title}</p>
      <p className="text-[#9CABBA]">{ele.Notes}</p>
    </td> 
    <td>
      <p className="text-white">{ele.Assignee}</p>
      <p className="text-[#9CABBA]">{ele.ContactDeal}</p>
    </td>
    <td className="px-4 py-4">
      <p className={`px-3 py-1 text-sm inline-block font-semibold rounded-full`}>{ele.DUE_DATE}</p>
    </td>
    <td>
      <p className="text-[#9CABBA]">{ele.Priority}</p>
    </td>
    <td>
      <p className="text-[#9CABBA]">{ele.Due_Time}</p>
    </td>
  </tr>
</tbody>

))}
</table>

</div>






</div>


      </div>
    
    </>
  )
}

export default Task
