import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import {
  CircleCheck,
  DollarSign,
  TrendingUp,
  CalendarDays,
  Goal,
  X,
  Pencil,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const [isforam, setIsforam] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [taskData, setTaskData] = useState({
    description: "",
    duedate: "",
    priority: "",
    searchcompany: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/api/tasks/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(taskData),
      });

      console.log("okk", res.ok);
      if (res.ok) {
        fetchTask();
        setTaskData({
          description: "",
          duedate: "",
          priority: "",
          searchcompany: "",
        });
      }
      let result=await res.json()
      
        if (res.ok) {
            toast.success("register successfully")
          }else{
            toast.error(result.message,"envailid ")
            
          }
      // res=await res.json()
    } catch (error) {
      console.log(error);
            toast.error("envailid ")

    }
    console.log(taskData);
  };

  const fetchTask = async () => {
    try {
      let res = await fetch("http://localhost:3000/api/tasks/fetch-task");

      res = await res.json();
      setTasks(res.task);
      console.log(res.task);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const Edittask = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `http://localhost:3000/api/tasks/edit-task/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(taskData),
        }
      );

      if (res.ok) {
        res = await res.json();
        setEditForm(false)
        fetchTask();
        setTaskData({
          description: "",
          duedate: "",
          priority: "",
          searchcompany: "",
        });
      }

      console.log(res.task);
    } catch (error) {
      console.log(error);
    }
  };


  const getPriority = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-gray-400";

      default:
        return "text-gray-400";
    }
  };

  return (
    <>
      <div className="bg-[#111418] flex h-screen overflow-hidden">
       

        {/* right side */}

        <div className="flex-1 ml-64 p-5 h-screen overflow-y-auto">
          <div className="flex items-center justify-between mb-8 ">
            <div>
              <h2 className="text-white text-3xl font-bold">Main Dashboard</h2>
              <p className="text-[#9CABBA] font-bold">
                Welcome back, Alex. Here's your day at a glance.
              </p>
            </div>
            <button
              onClick={() => setIsforam(true)}
              className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2 rounded-lg "
            >
              Add Quick Task
            </button>
          </div>

          {isforam && (
            <div className="fixed inset-0   z-40 backdrop-blur-sm bg-black/40">
              <div className="fixed flex justify-center items-center inset-0 z-50">
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-md p-6 border-white/10  space-y-4 rounded-lg border backdrop:blur-lg bg-[#1a1d21] "
                >
                  <div className="flex text-xl text-white justify-between">
                    <h2>Add Task</h2>
                    <X onClick={() => setIsforam(false)} />
                  </div>
                  <label className="text-[#9CABBA] font-semibold">
                    Task Descripstion
                  </label>
                  <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={taskData.description}
                    className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-10 rounded-lg pl-2 placeholder:text-[#9CABBA] placeholder:font-semibold"
                    placeholder="Enter Descripstion"
                  />{" "}
                  <br />
                  <div className="flex gap-2">
                    <div>
                      <label className="text-[#9CABBA] font-semibold">
                        DUE DATE
                      </label>
                      <input
                        type="date"
                        name="duedate"
                        onChange={handleChange}
                        value={taskData.duedate}
                        className=" text-white bg-[#111418] focus:border-blue-600 focus:outline-none border-white/10 pl-2 placeholder:font-semibold border w-full h-10 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[#9CABBA] font-semibold">
                        Priority
                      </label>

                      {/* <input type="text" /> */}
                      <select
                        name="priority"
                        onChange={handleChange}
                        value={taskData.priority}
                        required
                        className="  border w-full h-10 focus:border-blue-600 focus:outline-none bg-[#111418] border-white/10 rounded-lg text-white"
                      >
                        <option value="">Please slect Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>
                  <label className="text-[#9CABBA] font-semibold">
                    Search Company
                  </label>
                  <input
                    type="text"
                    name="searchcompany"
                    onChange={handleChange}
                    value={taskData.searchcompany}
                    className="text-white border focus:border-blue-600 focus:outline-none pl-2 bg-[#111418] border-white/10  placeholder:text-[#9CABBA] placeholder:font-semibold w-full h-10 rounded-lg"
                    placeholder="Search Company"
                  />
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
          {editForm && (
            <div className="fixed backdrop-blur-lg bg-black/40 inset-0 z-40">
              <div className="fixed  flex justify-center items-center z-50 inset-0">
                <form
                  onSubmit={Edittask}
                  className="backdrop:blur-lg bg-white/10 p-5 rounded-lg"
                >
                  <div className="flex text-xl  text-white justify-between">
                    <h2>Add Task</h2>
                    <X onClick={() => setEditForm(false)} />
                  </div>
                  <label className="text-[#9CABBA] font-semibold">
                    Task Descripstion
                  </label>
                  <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={taskData.description}
                    className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-10 rounded-lg pl-2 placeholder:text-[#9CABBA] placeholder:font-semibold"
                    placeholder="Enter Descripstion"
                  />
                  <div className="flex gap-2">
                    <div>
                      <label className="text-[#9CABBA] font-semibold">
                        DUE DATE
                      </label>
                      <input
                        type="date"
                        name="duedate"
                        onChange={handleChange}
                        value={taskData.duedate}
                        className=" text-white bg-[#111418] focus:border-blue-600 focus:outline-none border-white/10 pl-2 placeholder:font-semibold border w-full h-10 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[#9CABBA] font-semibold">
                        Priority
                      </label>

                      {/* <input type="text" /> */}
                      <select
                        name="priority"
                        onChange={handleChange}
                        value={taskData.priority}
                        required
                        className="  border w-full h-10 focus:border-blue-600 focus:outline-none bg-[#111418] border-white/10 rounded-lg text-white"
                      >
                        <option value="">Please slect Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>
                  <label className="text-[#9CABBA] font-semibold">
                    Search Company
                  </label>
                  <input
                    type="text"
                    name="searchcompany"
                    onChange={handleChange}
                    value={taskData.searchcompany}
                    className="text-white border focus:border-blue-600 focus:outline-none pl-2 bg-[#111418] border-white/10  placeholder:text-[#9CABBA] placeholder:font-semibold w-full h-10 rounded-lg"
                    placeholder="Search Company"
                  />
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

          <div className="flex  flex-col md:flex-row gap-6">
            <div className="flex-1 p-5 backdrop-blur-lg bg-white/10 rounded-xl border-white/10 border">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#9CABBA] font-bold">Active Deals Value</p>
                <div className="p-2 rounded-lg bg-[#1F312B]">
                  <DollarSign className="text-[#48D67C]" size={30} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <h2 className="text-white text-3xl font-bold">$142,500</h2>
                <span className="text-[#48D67C]">
                  <TrendingUp />
                  12%
                </span>
              </div>

              <p className="text-[#9CABBA] text-sm">vs. last month</p>
            </div>

            <div className="flex-1 p-5 backdrop-blur-lg bg-white/10 rounded-xl border-white/10 border ">
              <div className="flex justify-between">
                <p className="text-[#9CABBA] font-bold">Meetings This Week</p>
                <CalendarDays
                  className="text-[#60A5FA]  w-20 h-15 "
                  size={30}
                />
              </div>
              <div className="flex">
                <h2 className="text-white text-3xl font-bold">18</h2>
                <p className="text-[#9CABBA]">scheduled</p>
              </div>
              <p className="text-[#9CABBA]">4 remaining today</p>
            </div>

            <div className="flex-1 p-5 backdrop-blur-lg bg-white/10 rounded-xl border-white/10 border ">
              <div className="flex justify-between">
                <p className="text-[#9CABBA] font-bold">
                  Monthly Goal Progress
                </p>
                <Goal
                  className="text-[#48D67C] bg-[#1F312B] w-20 h-15 "
                  size={30}
                />
              </div>
              <div className="flex">
                <h2 className="text-white text-3xl font-bold">78%</h2>
                <p className="text-[#9CABBA]">achieved</p>
              </div>
              <p className="text-[#9CABBA]">vs. last month</p>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between">
              <h2 className="text-white text-2xl font-semibold ">
                Action Center
              </h2>
              <p className="text-[#9CABBA]">View Calendar</p>
            </div>

            <div className="flex mt-5 bg-white/5 px-6 py-4 border-white/10 border rounded-xl justify-between items-center">
              <div className="flex items-center">
                <CircleCheck className="text-[#0D7FF2]" />
                <h2 className="pl-2 text-2xl font-semibold text-white">
                  Tasks Due Today
                </h2>
              </div>

              <div className="text-white">
                <p>5 Pending</p>
              </div>
            </div>
          </div>

          {tasks.map((ele) => (
            <>
              <div className="bg-[#21262D] p-5">
                <div className="flex justify-between">
                  <h2 className="text-white text-lg font-semibold">
                    {ele.description}
                  </h2>
                  <div className="flex gap-5">
                    <p className={`${getPriority(ele.priority)}`}>
                      {" "}
                      {ele.priority}
                    </p>
                    <Pencil
                      className="text-white"
                      onClick={() => {
                        setEditId(ele._id);
                        setEditForm(true);
                        setTaskData({
                          description: ele.description,
                          duedate: ele.due_date.split("T")[0],
                          priority: ele.priority,
                          searchcompany: ele.company_name,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 text-[#9CABBA] font-semibold">
                  <p>Name</p>
                  <p>{ele.company_name}</p>
                  <p>{ele.due_date.split("T")[0]}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
