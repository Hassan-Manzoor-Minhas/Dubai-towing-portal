import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  const [mobileOpen,setMobileOpen]=useState(false);
  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={()=>setMobileOpen(false)}/>
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={()=>setMobileOpen(false)}/>}
      <div className="main-shell">
        <Topbar onMenu={()=>setMobileOpen(true)}/>
        <Outlet/>
      </div>
    </div>
  );
}