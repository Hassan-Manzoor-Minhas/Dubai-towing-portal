import { NavLink, useLocation } from "react-router-dom";
import { BarChart3, CarFront, ClipboardList, FilePlus2, FileText, LayoutDashboard, Settings, Truck, UserRound, Users, X } from "lucide-react";

const adminItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/drivers", label: "Drivers", icon: Users },
  { to: "/admin/jobs", label: "Jobs", icon: ClipboardList },
  { to: "/admin/trucks", label: "Trucks", icon: Truck },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const driverItems = [
  { to: "/driver", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/driver/profile", label: "Profile", icon: UserRound },
  { to: "/driver/add-job", label: "Add Job", icon: FilePlus2 },
  { to: "/driver/jobs", label: "My Jobs", icon: FileText },
];

export default function Sidebar({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  const location = useLocation();
  const isDriver = location.pathname.startsWith("/driver");
  const items = isDriver ? driverItems : adminItems;

  return (
    <aside className={`sidebar ${mobileOpen ? "fixed inset-y-0 left-0 z-50 !block" : ""}`}>
      <div className="h-full flex flex-col p-4">
        <div className="flex items-center gap-3 px-2 py-3 mb-8">
          <div className="brand-mark"><CarFront size={18} /></div>
          <div className="brand-copy">
            <div className="font-extrabold tracking-tight">Dubai Towing</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-[.16em]">{isDriver ? "Driver Portal" : "Management Portal"}</div>
          </div>
          {onClose && <button className="ml-auto md:hidden text-slate-400" onClick={onClose}><X size={18} /></button>}
        </div>
        <div className="sidebar-label px-3 mb-2 text-[10px] uppercase tracking-[.16em] text-slate-500 font-bold">{isDriver ? "My Work" : "Operations"}</div>
        <nav className="space-y-1">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <Icon size={18} /><span className="nav-copy">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <div className="rounded-2xl bg-[#182337] p-4 company-copy">
            <div className="text-xs font-bold text-white">Operations Center</div>
            <div className="text-[11px] text-slate-400 mt-1">Dubai • UAE</div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" />System operational</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
