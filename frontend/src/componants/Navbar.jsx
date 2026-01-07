import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Contact,
  CircleCheck,
  Settings,
  ChartBar,
  ChartNoAxesColumn,
} from "lucide-react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 font-semibold ${
      isActive ? "text-white" : "text-gray-400"
    }`;

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#0F1216] p-5 flex flex-col">
      {/* LOGO */}
      <div className="flex items-center gap-2 text-white font-bold mb-8">
        <h2>Sales CRM</h2>
        <img src={logo} className="w-16 rounded-xl" />
      </div>

      {/* NAV LINKS */}
      <nav className="flex flex-col gap-4">
        <NavLink to="/dashboard" className={navLinkClass}>
          <LayoutDashboard size={22} /> Dashboard
        </NavLink>

        <NavLink to="/contact" className={navLinkClass}>
          <Contact size={22} /> Contact
        </NavLink>

        <NavLink to="/pipeline" className={navLinkClass}>
          <ChartBar size={22} /> Pipeline
        </NavLink>

        <NavLink to="/revenue" className={navLinkClass}>
          <ChartNoAxesColumn size={22} /> Revenue
        </NavLink>

        <NavLink to="/task" className={navLinkClass}>
          <CircleCheck size={22} /> Tasks
        </NavLink>
      </nav>

      {/* USER SECTION */}
      <div className="mt-auto flex flex-col gap-4 text-gray-400">
        <div className="flex gap-3 items-center">
          <NavLink to="/setting" className={navLinkClass}>

          <Settings size={22} />
          <span>Settings</span>
          </NavLink>
        </div>

        <div className="flex gap-3 items-center">
          <img src={user} className="w-10 rounded-full" />
          <div>
            <h3 className="text-sm">Sales Lead</h3>
            <p className="text-xs">User</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Navbar;
