import type { LucideIcon } from "lucide-react";

export default function StatCard({label,value,sub,icon:Icon,accent="orange"}:{label:string;value:string;sub:string;icon:LucideIcon;accent?:string}) {
  const bg = accent==="green" ? "bg-emerald-50 text-emerald-600" : accent==="blue" ? "bg-blue-50 text-blue-600" : accent==="red" ? "bg-rose-50 text-rose-600" : "bg-orange-50 text-orange-600";
  return <div className="card stat-card">
    <div className="flex items-start justify-between"><div><div className="text-xs font-semibold text-slate-500">{label}</div><div className="text-[29px] font-extrabold tracking-tight text-slate-900 mt-2">{value}</div></div><div className={`kpi-icon ${bg}`}><Icon size={18}/></div></div>
    <div className="text-[11px] text-slate-400 mt-3">{sub}</div>
  </div>
}