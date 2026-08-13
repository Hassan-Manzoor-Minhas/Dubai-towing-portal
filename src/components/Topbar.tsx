import { AlertTriangle, Bell, Info, LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { alerts } from "../data/mockData";
import { useAuth } from "../lib/auth";
import { initials } from "../lib/badges";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDriver = location.pathname.startsWith("/driver");
  const { user, logout } = useAuth();

  function handleLogout(){
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="topbar">
      <div className="flex items-center gap-3">
        <button className="lg:hidden text-slate-500" onClick={onMenu}><Menu size={21} /></button>
        <div className="hidden sm:block">
          <div className="text-xs text-slate-400">{isDriver ? "Driver" : "Business Admin"}</div>
          <div className="text-sm font-bold text-slate-800">{user ? user.name : (isDriver ? "Driver" : "Dubai Towing Operations")}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl border border-slate-200 bg-white grid place-items-center text-slate-500 hover:bg-slate-50"><Search size={17} /></button>
        <div className="relative">
          <button onClick={() => setOpen(o => !o)} className="relative w-9 h-9 rounded-xl border border-slate-200 bg-white grid place-items-center text-slate-500 hover:bg-slate-50">
            <Bell size={17} />
            {!isDriver && alerts.length > 0 && <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-orange-500 rounded-full" />}
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-80 card z-30 overflow-hidden">
              <div className="p-3.5 border-b border-slate-100 font-bold text-sm text-slate-800">Notifications</div>
              <div className="max-h-80 overflow-auto divide-y divide-slate-100">
                {isDriver ? (
                  <div className="p-4 text-xs text-slate-400">You're all caught up — no new notifications.</div>
                ) : alerts.map(a => (
                  <div key={a.id} className="p-3.5 flex gap-3">
                    <div className={`mt-0.5 w-7 h-7 rounded-lg grid place-items-center shrink-0 ${a.level === "danger" ? "bg-rose-50 text-rose-600" : a.level === "warning" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
                      {a.level === "info" ? <Info size={14} /> : <AlertTriangle size={14} />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800">{a.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{a.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="avatar ml-1">{user ? initials(user.name) : (isDriver ? "DR" : "HA")}</div>
        <button onClick={handleLogout} title="Log out" className="w-9 h-9 rounded-xl border border-slate-200 bg-white grid place-items-center text-slate-500 hover:bg-rose-50 hover:text-rose-600">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
