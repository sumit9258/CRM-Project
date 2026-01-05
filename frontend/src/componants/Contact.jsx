// import React from "react";
import { ChartBar, Contact,ChartNoAxesColumn, CircleCheck, LayoutDashboard, Settings, ListFilter, Plus, Search, Dot, X } from "lucide-react";
import logo from "../assets/logo.png"
import user from "../assets/user.png"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
function ContactP() {

const [isforam,setIsforam]=useState(false)
const [leadData,setLeadData]=useState([])

  const [filterData,setFilterData]=useState("all")
  const filtered=leadData.filter((ele)=>{
    if(filterData=="all") return true;
    return ele.status==filterData
  })
  const [taskData, setTaskData] = useState({
    fullname: "",
    email: "",
    phone: "",
    linked: "",
    status: "",
  });


   const handleChange = (e) => {
    const { name,value } = e.target;
    setTaskData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res=await fetch("http://localhost:3000/api/tasks/contact-lead",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },credentials:"include",
        body:JSON.stringify(taskData)
      })

      console.log("okk",res.ok);
      if (res.ok) {
        fetchLead()
        setTaskData({
    fullname: "",
    email: "",
    phone: "",
    linked: "",
    status: "",
  });
      }
      // res=await res.json()

      
    } catch (error) {
      console.log(error);
      
    }
    console.log(taskData);
  };


  const fetchLead=async()=>{
    try {
      let res=await fetch("http://localhost:3000/api/tasks/fetch-lead")
      res=await res.json()
console.log(res);
setLeadData(res)

    } catch (error) {
      
    }
  }
  useEffect(()=>{
fetchLead()
  },[])


      const navLinkClass=({isActive})=>
    `flex items-center gap-3 text-gray-400 font-semibold
     ${isActive?"text-white" : "text-gray-400"}`



     const checkStatus=(status)=>{
switch (status) {
  case "new":
    return "bg-green-500/20 text-green-400"
  case "Qualified":
        return "bg-blue-500/20 text-green-400"

  default:
        return "bg-blue-500/20 text-green-400"

}
     }


  return  <>
      <div className="bg-[#111418] flex h-screen overflow-hidden">
       

        {/* right side */}

<div className="flex-1 ml-64 p-5 h-screen overflow-y-auto">

<div>
    <h2 className="text-white text-3xl font-semibold">Contact Database</h2>
</div>

<div className="flex justify-between">
<div>
    <p className="text-[#9CABBA]">Manage your leads and track sales progress.</p>
</div>
<div className="flex gap-5 ">
    <div>

    <h2 className="text-[#9CABBA]">Total Leads</h2>
    <p className="text-white">1,248</p>
    </div>
    <div>
        <p className="text-[#9CABBA]">This Month</p>
        <p className="text-white">+124</p>
    </div>
</div>
</div>







<div className="flex items-center mt-10 justify-between">

<div className="relative">
    <Search size={25} className="absolute inset-y-2.5 text-[#94A3B1] inset-x-2" />
    <div>

    <input type="text" className="bg-[#283039] w-170 h-12 rounded-lg placeholder:text-[#94A3B1] placeholder:text-lg px-10" placeholder="search by name, email or company" />
    </div>
</div>

<div className="text-white flex gap-4">
    <button className="bg-[#283039] flex gap-2 items-center rounded-lg p-2 w-25"><ListFilter />Filter</button>
    <button onClick={()=> setIsforam(true)} className="bg-[#2563EB] w-40 pl-4 gap-2 flex rounded-lg items-center"><Plus />Add New Lead</button>
</div>


</div>


<div className="mt-8 flex gap-4">
<div className="flex items-center">
 
<button onClick={()=> setFilterData("all")} className="flex items-center h-8 px-4 rounded-3xl bg-[#283039] text-white ">All Leads</button>
</div>
<div className="flex">
<button onClick={()=> setFilterData("new")} className="h-8 w-20 flex items-center rounded-3xl justify-center gap-2 bg-[#283039] text-white "><span className="w-2 h-2 rounded-full bg-blue-400"></span>New</button>
</div>
<button onClick={()=> setFilterData("contacted")} className="h-8 px-3 flex items-center gap-2 rounded-3xl bg-[#283039] text-white "><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Contacted</button>
<button onClick={()=> setFilterData("Qualified")} className="h-8 w-25 flex justify-center items-center rounded-3xl bg-[#283039] text-white gap-2 "><span className="w-2 h-2 rounded-full bg-green-400"></span>Qualified</button>
<button onClick={()=> setFilterData("Unresponsive")} className="h-8 px-2 flex justify-center items-center rounded-3xl bg-[#283039] text-white gap-2"><span className="w-2 h-2 rounded-full bg-red-400"></span>Unresponsive</button>

</div>

{isforam && (
            <div className="fixed inset-0   z-40 backdrop-blur-sm bg-black/40">
              <div className="fixed flex justify-center items-center inset-0 z-50">
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-max p-6 border-white/10  space-y-4 rounded-lg border backdrop:blur-lg bg-white/10"
                >
                  <div className="flex text-xl text-white justify-between">
                    <h2>Add Task</h2>
                    <X onClick={() => setIsforam(false)} />
                  </div>
                  <label className="text-[#9CABBA] font-semibold">
                    Full Name
                  </label>
                  <input

                    type="text"
                    name="fullname"
                    onChange={handleChange}
                    value={taskData.fullname}
                    className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-10 rounded-lg pl-2 placeholder:text-[#9CABBA] placeholder:font-semibold"
                    placeholder="e.g. John Doe"
                  />{" "}
                  <br />
                  <div className="flex gap-2">
                    <div>
                      <label className="text-[#9CABBA] font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={taskData.email}
                        placeholder="john@example.com"
                        className=" text-white bg-[#111418] focus:border-blue-600 focus:outline-none border-white/10 pl-2 placeholder:font-semibold border w-full h-10 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[#9CABBA] font-semibold">
                        Phone Number
                      </label>
                      <input
                    type="number"
                    name="phone"
                    onChange={handleChange}
                    value={taskData.phone}
                    className="text-white border focus:border-blue-600 focus:outline-none pl-2 bg-[#111418] border-white/10  placeholder:text-[#9CABBA] placeholder:font-semibold w-full h-10 rounded-lg"
                    placeholder="+1 (555) 000-0000"
                  />

                      {/* <input type="text" /> */}
                      
                    </div>
                  </div>
                  <label className="text-[#9CABBA] font-semibold">
                    Search Company
                  </label>

                  <input
                    type="text"
                    name="linked"
                    onChange={handleChange}
                    value={taskData.linked}
                    className="text-white border focus:border-blue-600 focus:outline-none pl-2 bg-[#111418] border-white/10  placeholder:text-[#9CABBA] placeholder:font-semibold w-full h-10 rounded-lg"
                    placeholder="Search Company"
                  />
                  <label className="text-[#9CABBA] font-semibold">
                    Instial Status
                  </label>
                  <select
                        name="status"
                        onChange={handleChange}
                        value={taskData.status}
                        required
                        className="  border w-full h-10 focus:border-blue-600 focus:outline-none bg-[#111418] border-white/10 rounded-lg text-white"
                      >
                        <option value="">Please slect Priority</option>
                        <option value="new">New</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Unresponsive">Unresponsive</option>
                        <option value="contacted">Contacted</option>
                      </select>
                  <div className="flex justify-center ">
                    <button
                      type="submit"
                      className="bg-[#2563EB] mt-5 w-full h-10 rounded-lg text-white font-semibold"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}



<div className="border mt-5 overflow-x-auto border-white/10 rounded-lg">
<table  className="min-w-full textsm">

<thead className="p-5 text-[#9CABBA] bg-[#21272E]">
  <tr >
<th className="px-4 py-3 text-left">Name</th>
<th className="px-4 py-3 text-left">phone</th>
<th className="px-4 py-3 text-left">Status</th>
<th className="px-4 py-3 text-left">Social</th>
<th className="px-4 py-3 text-left">Last Activity</th>

  </tr>
</thead>
{filtered.map((ele)=>(

<tbody >
  <tr className="bg-[#1a1d21] hover:bg-white/5">
    <td className="px-4 py-4">
      <p className="text-white">{ele.fullname}</p>
      <p className="text-[#9CABBA]">Company Name</p>
    </td>
    <td>
      <p className="text-white">Mail:{ele.email}</p>
      <p className="text-[#9CABBA]">{ele.phone}</p>
    </td>
    <td className="px-4 py-4">
      <p className={`${checkStatus(ele.status)} px-3 py-1 text-sm inline-block font-semibold rounded-full`}>{ele.status}</p>
    </td>
    <td>
      <p className="text-[#9CABBA]">{ele.linked}</p>
    </td>
    <td>
      <p className="text-[#9CABBA]">Last Activity</p>
    </td>
  </tr>
</tbody>

))}
</table>

</div>




</div>


      </div>
    </>
}

export default ContactP;
