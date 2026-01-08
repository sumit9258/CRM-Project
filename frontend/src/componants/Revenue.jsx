// import React from "react";
import { ChartBar, Contact,ChartNoAxesColumn, CircleCheck, LayoutDashboard, Settings, ListFilter, Plus, TrendingUp, TrendingDown } from "lucide-react";
import logo from "../assets/logo.png"
import user from "../assets/user.png"
import { NavLink } from "react-router-dom";
import Chart from "./Chart"
import { useEffect } from "react";
import { useState } from "react";
function Revenue() {
      const navLinkClass=({isActive})=>
    `flex items-center gap-3 text-gray-400 font-semibold
     ${isActive?"text-white" : "text-gray-400"}`

const [data,setData]=useState([])
       useEffect(() => {

       const fetchDeal=async()=>{
    try {
      let res=await fetch("http://localhost:3000/api/tasks/filter-revenue")
      res=await res.json()
setData(res)
    } catch (error) {
      console.log(error);
          
    }
  }
    fetchDeal()
  }, []);


    console.log(data);
    
let sum=data.reduce((total,num)=>{
    return total+num.revenue
},0)
console.log(sum);

  return  <>
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


<div className="flex items-center mt-10 justify-between">

<div className="text-white flex gap-5 ">
    <select name="" id="" className="bg-[#283039] px-4 h-10 rounded-lg">
        <option value="this month">This Month</option>
        <option value="this month">This Year</option>
        <option value="this month">This Quarter</option>
        <option value="this month">Last Month</option>
    </select>
    <select className="bg-[#283039] rounded-lg px-4 ">
        <option value="this month">All Category</option>
        <option value="this month">Enterprise</option>
        <option value="this month">Consulting</option>
        <option value="this month">SMB</option>
    </select>
</div>

<div className="text-white flex gap-4">
    <button className="bg-[#283039] flex gap-2 items-center rounded-lg p-2 w-25"><ListFilter />Filter</button>
    <button className="bg-[#2563EB] w-50 font-semibold pl-4 gap-2 flex rounded-lg items-center"><Plus />Add Opportunity</button>
</div>


</div>




<div className="flex flex-col mt-10 md:flex-row gap-4">

<div className="w-60 backdrop-blur-lg p-3 bg-white/10 border border-white/10 rounded-lg">
    <p className="text-[#9CABBA]">Total Revenue</p>
    <div className="flex gap-3 pb-2 pt-1">
    <h2 className="text-white text-2xl font-semibold ">₹{sum}</h2>
     <p className="flex gap-1 items-center text-[#4ADE80]"><TrendingUp/>8.2%</p>
    </div>

<p className="text-[#9CABBA]">vs. $115,050 last period</p>
</div>



</div>



<div>
    <Chart/>
</div>
</div>



      </div>
    </>
}

export default Revenue;
