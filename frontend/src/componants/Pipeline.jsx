// import React from "react";
import {
  ChartBar,
  Contact,
  ChartNoAxesColumn,
  CircleCheck,
  LayoutDashboard,
  Settings,
  ListFilter,
  Plus,
  Search,
  Dot,
  Clock,
  X,
} from "lucide-react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { NavLink } from "react-router-dom";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PipelineFilter from "./PipelineFilter";
import { useRef } from "react";






function DraggableCard({ ele }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: ele._id,
      data: ele,
    });



  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-[#1a1d21] min-w-[320px] border border-[#283039]
      rounded-xl p-4 cursor-grab
      hover:border-blue-500/40 hover:bg-[#1e2228]
      transition-all duration-200"
    >
      {/* Top badges */}
      <div className="flex items-center justify-between mb-3">
        <span className="bg-blue-900/30 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
          NEW
        </span>
        <span className="text-[#9cabba] text-[10px] uppercase tracking-wide">
          {ele.stage}
        </span>
      </div>

      {/* Opportunity */}
      <h2 className="text-white font-semibold text-base leading-snug mb-1">
        {ele.opportunitie}
      </h2>

      {/* Company */}
      <p className="text-[#9cabba] text-xs mb-4">
        {ele.company_name}
      </p>

      {/* Amount + Date */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-white font-bold text-lg">
          ₹{ele.rate}
        </p>

        <div className="flex items-center gap-1 text-[#9cabba] text-xs">
          <Clock size={14} />
          <span>{ele.close_Date}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#283039] mb-3" />

      {/* Meta info */}
      <div className="space-y-2 text-xs text-[#9cabba]">
        <p className="flex justify-between">
          <span className="text-white/60">Lead</span>
          <span className="font-medium">{ele.lead_Source}</span>
        </p>

        <p className="flex justify-between">
          <span className="text-white/60">Assigned</span>
          <span className="font-medium">{ele.AssignedTo}</span>
        </p>

        <p className="text-[11px] leading-relaxed line-clamp-2">
          <span className="text-white/60">Note:</span>{" "}
          {ele.Description || "—"}
        </p>
      </div>
    </div>
  );
}


function DroppableColumn({ stage, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 max-h-[70vh] min-w-85 p-2 rounded-lg
        ${isOver ? "bg-blue-500/10" : ""}`}
    >
      <p className="text-white font-semibold pt-2">{stage}</p>
      {children}
    </div>
  );
}












function Pipeline() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 text-gray-400 font-semibold
     ${isActive ? "text-white" : "text-gray-400"}`;

  const [form, setForm] = useState(false);
const [activeCard, setActiveCard] = useState(null);
    const [isFilter,setIsFilter]=useState(false)

  const [opportunities, setOpportunities] = useState({
    opportunitie: "",
    company_name: "",
    rate: "",
    close_Date: "",
    stage: "",
    lead_Source: "",
    AssignedTo: "",
    Description: "",
  });


  const [search,setSearch]=useState("")

  const [oppoData, setOppoData] = useState([]);

const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const fetchPipelineDeals = async(filters) => {
    console.log("Applied Filters:", filters);
    try {
      let res=await fetch("http://localhost:3000/api/tasks/filter-opportunity",{
        method:"POST",
        headers:{

          "Content-Type":"application/json",
        },
          credentials:"include",
      body:JSON.stringify(filters)
      })
      if (res.ok) {
        res=await res.json()
        setOppoData(res)
      }
    } catch (error) {
      console.log(error);
      
    }
  };



  const handleDragEnd = async (event) => {
  const { active, over } = event;

  if (!over) return;

  const newStage = over.id;
  const card = active.data.current;

  if (card.stage === newStage) return;

  // UI update
  setOppoData((prev) =>
    prev.map((item) =>
      item._id === card._id
        ? { ...item, stage: newStage }
        : item
    )
  );

  // backend update
  await fetch("http://localhost:3000/api/tasks/update-stage", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: card._id,
      stage: newStage,
    }),
  });
};







  const Handlechange = (e) => {
    const { name, value } = e.target;
    setOpportunities((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/api/tasks/add-opportunity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(opportunities),
      });
      let result = await res.json();

      if (res.ok) {
        setOpportunities({
          opportunitie: "",
          company_name: "",
          rate: "",
          close_Date: "",
          stage: "",
          lead_Source: "",
          AssignedTo: "",
          Description: "",
        });
        setForm(false)
        fetchPipelineDeals()
        toast.success(result.message);
      } else {
        toast.error(result.message || "envailid ");
      }

      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("envailid ");
    }
  };

  const fetchOpportunity = async () => {
    try {
      let res = await fetch(
        "http://localhost:3000/api/tasks/fetch-opportunity"
      );
      res = await res.json();
      console.log(res);
      setOppoData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOpportunity();
  }, []);


  const filterOppoData=oppoData.filter((ele)=>{
    const searchData=search.toLowerCase()
return(
  ele.opportunitie?.toLowerCase().includes(searchData)||
  ele.company_name?.toLowerCase().includes(searchData)||
  ele.lead_Source?.toLowerCase().includes(searchData)||
  ele.AssignedTo?.toLowerCase().includes(searchData)
)
  })
  

  

  return (
    <>
      <div className="bg-[#111418] flex h-screen overflow-hidden">
        {/* right side */}

        <div className="flex-1 ml-64 p-5 h-screen overflow-y-auto">
          <div>
            <h2 className="text-white text-3xl font-semibold">
              Sales Pipeline
            </h2>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-[#9CABBA]">
                Track your opportunities and manage deal flow.
              </p>
            </div>
            <div className="flex gap-5 ">
              <div>
                <h2 className="text-[#9CABBA]">Total Value</h2>
                <p className="text-white text-xl">$1.4M</p>
              </div>
              <div>
                <p className="text-[#9CABBA]">Open Deals</p>
                <p className="text-white text-xl">24</p>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-10 justify-between">
            <div className="relative">
              <Search
                size={25}
                className="absolute inset-y-2.5 text-[#94A3B1] inset-x-2"
              />
              <div>
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e)=> setSearch(e.target.value)}
                  className="bg-[#283039] text-white w-170 h-12 rounded-lg placeholder:text-[#94A3B1] placeholder:text-lg px-10"
                  placeholder="Search deals, companies..."
                />
              </div>
            </div>

            <div className="text-white flex gap-4">
             <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="bg-[#283039] flex gap-2 items-center rounded-lg p-2 w-25"
      >
        <ListFilter/>
        Filter
      </button>

      {open && (
        <PipelineFilter
          anchorRef={btnRef}
          onClose={() => setOpen(false)}
          onApply={(filters) => {
            fetchPipelineDeals(filters);
            setOpen(false);
          }}
        />
      )}
    </div>
              <button
                onClick={() => setForm(true)}
                className="bg-[#2563EB] w-50 font-semibold pl-4 gap-2 flex rounded-lg items-center"
              >
                <Plus />
                Add Opportunity
              </button>
            </div>
          </div>

          {form && (
            <div className="fixed backdrop-blur-lg bg-black/40 inset-0 z-40">
              <div className="fixed flex  justify-center items-center z-50 inset-0">
                <div>
                  <form
                    onSubmit={handleSubmit}
                    className="backdrop:blur-lg bg-[#1a1d21]  p-5 w-160  rounded-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex text-xl pb-3 border-b border-[#283039] text-white justify-between">
                        <h2>Add Opportunity</h2>
                        <X onClick={() => setForm(false)} />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-white font-semibold">
                            Opportunity Name
                          </label>{" "}
                          <br />
                          <input
                            type="text"
                            className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-10 rounded-lg pl-2 placeholder:text-[#9CABBA] placeholder:text-sm"
                            placeholder="Enter Opportunity Name"
                            name="opportunitie"
                            onChange={Handlechange}
                            value={opportunities.opportunitie}
                          />
                        </div>

                        <div>
                          <label className="text-white font-semibold">
                            Company Name
                          </label>{" "}
                          <br />
                          <input
                            type="text"
                            className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-10 rounded-lg pl-2 placeholder:text-[#9CABBA] placeholder:text-sm"
                            placeholder="Enter Company Name"
                            name="company_name"
                            onChange={Handlechange}
                            value={opportunities.company_name}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-white font-semibold">
                            Deal Value
                          </label>{" "}
                          <br />
                          <input
                            type="number"
                            className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-10 rounded-lg pl-2 placeholder:text-[#9CABBA] placeholder:text-sm"
                            placeholder="Enter Deal Value"
                            name="rate"
                            onChange={Handlechange}
                            value={opportunities.rate}
                          />
                        </div>

                        <div>
                          <label className="text-white font-semibold">
                            Close Date
                          </label>{" "}
                          <br />
                          <input
                            type="date"
                            className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-10 rounded-lg pl-2 placeholder:text-[#9CABBA] placeholder:text-sm"
                            placeholder=""
                            name="close_Date"
                            onChange={Handlechange}
                            value={opportunities.close_Date}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-white font-semibold">
                            Stage
                          </label>{" "}
                          <br />
                          <select
                            value={opportunities.stage}
                            name="stage"
                            onChange={Handlechange}
                            className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-10 rounded-lg pl-2 placeholder:text-[#9CABBA] placeholder:text-sm"
                          >
                            <option value="">Please slect stage</option>
                            <option value="Discovery">Discovery</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Proposal">Proposal</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Close">Close</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-white font-semibold">
                            Lead Source
                          </label>{" "}
                          <br />
                          <select
                            name="lead_Source"
                            onChange={Handlechange}
                            value={opportunities.lead_Source}
                            className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-10 rounded-lg pl-2 placeholder:text-[#9CABBA] placeholder:text-sm"
                          >
                            <option value="">Please Select the Lead</option>
                            <option value="Website">Website</option>
                            <option value="Inbound Call">Inbound Call</option>
                            <option value="Email Inquiry">Email Inquiry</option>
                            <option value="Referral">Referral</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Facebook / Instagram Ads">
                              Facebook / Instagram Ads
                            </option>
                            <option value="Google Ads">Google Ads</option>
                            <option value="Cold Call">Cold Call</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-white font-semibold">
                            Assigned To
                          </label>{" "}
                          <br />
                          <select
                            name="AssignedTo"
                            onChange={Handlechange}
                            value={opportunities.AssignedTo}
                            className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-10 rounded-lg pl-2 placeholder:text-[#9CABBA] placeholder:text-sm"
                          >
                            <option value="">Please Select </option>
                            <option value="Sales Executive – Rahul">
                              Sales Executive – Rahul
                            </option>
                            <option value="Sales Executive – Priya">
                              Sales Executive – Priya
                            </option>
                            <option value="Sales Manager">Sales Manager</option>
                            <option value="Account Manager">
                              Account Manager
                            </option>
                            <option value="Self">Self</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-white font-semibold">
                            Description
                          </label>{" "}
                          <br />
                          <textarea
                            name="Description"
                            onChange={Handlechange}
                            value={opportunities.Description}
                            placeholder="Enter Descrition"
                            className="border bg-[#111418] text-white focus:border-blue-600 focus:outline-none border-white/10 w-full h-32 rounded-lg pl-2 placeholder:text-[#9CABBA] pt-2 placeholder:text-sm"
                            id=""
                          ></textarea>
                        </div>
                      </div>

                      <div className="flex border-t pt-4 border-[#283039] justify-end gap-5 pr-5">
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
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

   
         

          <div className="flex [scrollbar-width:none] overflow-x-auto pb-5 gap-5 ">
            <DndContext
  onDragStart={(event) => {
    setActiveCard(event.active.data.current);
  }}
  onDragEnd={handleDragEnd}
>
  <div className="flex [scrollbar-width:none] gap-5 overflow-x-auto">
    {["Discovery", "Qualified", "Proposal", "Negotiation", "Close"].map(
      (stage) => (
        <DroppableColumn key={stage} stage={stage}>
          {filterOppoData
            .filter((ele) => ele.stage === stage)
            .map((ele) => (
              <DraggableCard key={ele._id} ele={ele} />
            ))}
        </DroppableColumn>
      )
    )}
  </div>
</DndContext>


        
          </div>
        </div>
      </div>
    </>
  );
}

export default Pipeline;
