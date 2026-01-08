import { X } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function AddTaskForm({onClose,fetchAll}) {
      const [Task, SetTask] = useState({
        Title: "",
        DUE_DATE: "",
        Due_Time: "",
        Priority: "",
        Assignee: "",
        ContactDeal: "",
        Reminder: "",
        Notes: ""
      });

      const [AllUser,setAllUser]=useState([])

      const Handlechange = (e) => {
    const { name,value } = e.target;
    SetTask((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const fetchUsers=async()=>{
    try {
        let res=await fetch("http://localhost:3000/api/tasks/get-users")
        res=await res.json()
        console.log(res);
        
setAllUser(res)
    } catch (error) {
        console.log(error);
        
    }
  }

  useEffect(()=>{
fetchUsers()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res=await fetch("http://localhost:3000/api/tasks/add-tasks",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },credentials:"include",
        body:JSON.stringify(Task)
      })

      console.log("okk",res.ok);
      if (res.ok) {
        fetchAll()
        onClose()
      }
      // res=await res.json()

      
    } catch (error) {
      console.log(error);
      
    }
  };



  return (
    <>
                <div className="fixed backdrop-blur-lg bg-black/40 inset-0 z-40">
                  <div className="fixed flex  justify-center items-center z-50 inset-0">
                    <div>
                      <form
                        onSubmit={handleSubmit}
                        className="backdrop:blur-lg  bg-[#1a1d21]  w-160  rounded-lg"
                      >
                          <div className="flex text-xl pt-5 pb-4 pl-4 pr-4 border-b border-[#283039] text-white justify-between">
                            <h2>Add New Task</h2>
                            <X onClick={onClose} />
                          </div>
                        <div className="space-y-4 p-5 overflow-y-auto max-h-[70vh] [scrollbar-width:none]">
                          <div className="">
                            <div>
                              <label className="text-white font-semibold">
                                Task Title / Description
                              </label>{" "}
                              <br />
                              <input
                                type="text"
                                className='w-full bg-[#283039] border border-transparent focus:border-primary focus:ring-0 rounded-lg text-white placeholder-[#9cabba]/50 px-4 py-2.5 transition-all outline-none'
                                placeholder="e.g. Follow up with client about proposal"
                                name="Title"
                                onChange={Handlechange}
                                value={Task.Title}
                              />
                            </div>
    
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="text-white font-semibold">
                                Due Date
                              </label>{" "}
                              <br />
                              <input
                                type="date"
                                className='w-full bg-[#283039] border border-transparent focus:border-primary focus:ring-0 rounded-lg text-white placeholder-[#9cabba]/50 px-4 py-2.5 transition-all outline-none'
                                placeholder="Enter Deal Value"
                                name="DUE_DATE"
                                onChange={Handlechange}
                                value={Task.DUE_DATE}
                              />
                            </div>
    
                            <div>
                              <label className="text-white font-semibold">
                                Due Time
                              </label>{" "}
                              <br />
                              <input
                                type="time"
                                className='w-full bg-[#283039] border border-transparent focus:border-primary focus:ring-0 rounded-lg text-white placeholder-[#9cabba]/50 px-4 py-2.5 transition-all outline-none'
                                placeholder=""
                                name="Due_Time"
                                onChange={Handlechange}
                                value={Task.Due_Time}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="text-white font-semibold">
                                Priority
                              </label>{" "}
                              <br />
                              <select
                                value={Task.Priority}
                                name="Priority"
                                onChange={Handlechange}
                                className='w-full bg-[#283039] border border-transparent focus:border-primary focus:ring-0 rounded-lg text-white px-4 py-2.5 cursor-pointer'

                              >
                                <option value="">Please select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                            </div>
    
                            <div>
                              <label className="text-white font-semibold">
                                Assignee
                              </label>{" "}
                              <br />
                              <select
                                name="Assignee"
                                onChange={Handlechange}
                                value={Task.Assignee}
                                className='w-full bg-[#283039] border border-transparent focus:border-primary focus:ring-0 rounded-lg text-white px-4 py-2.5 cursor-pointer'
                              >
                                {AllUser.map((ele)=>(
                                    <option value={ele.name}>{ele.name}</option>

                                ))}
                                
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="text-white font-semibold">
                                Link to Contact/Deal
                              </label>{" "}
                              <br />
                              
                              <input type="text" name="ContactDeal"
                              placeholder='Search contacts or deals...' 
                              value={Task.ContactDeal}
                              onChange={Handlechange}
                                className='w-full bg-[#283039] border border-transparent focus:border-primary focus:ring-0 rounded-lg text-white px-4 py-2.5 cursor-pointer'
                              />

                            </div>

                             <div>
                              <label className="text-white font-semibold">
                                Reminder
                              </label>{" "}
                              <br />
                              <select
                                name="Reminder"
                                onChange={Handlechange}
                                value={Task.Reminder}
                                className='w-full bg-[#283039] border border-transparent focus:border-primary focus:ring-0 rounded-lg text-white px-4 py-2.5 cursor-pointer'
                              >
                                <option value="">none</option>
                                <option value="Website">15 minuets before</option>
                                <option value="Inbound Call">1 hour before</option>
                                <option value="Email Inquiry">1 day before</option>
                              </select>
                            </div>
                            
                          </div>

                          <div>
                              <label className="text-white font-semibold">
                                Description
                              </label>{" "}
                              <br />
                              <textarea
                                name="Notes"
                                onChange={Handlechange}
                                value={Task.Notes}
                                placeholder="Enter Descrition"
                                className="w-full bg-[#283039] border h-30 border-transparent focus:border-primary focus:ring-0 rounded-lg text-white placeholder-[#9cabba]/50 px-4 py-2.5 resize-none transition-all outline-none"
                                
                              ></textarea>
                            </div>

    
                        </div>
                          <div className="flex border-t pt-4 pb-4 border-[#283039] justify-end gap-5 pr-5">
                            <button className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                            >
                              Submit
                            </button>
                          </div>
                      </form>
                    </div>
                  </div>
                </div>
    </>
  )
}

export default AddTaskForm
