import { Activity, CheckCircle2, ClipboardList, DollarSign, Truck, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import StatCard from "../../components/StatCard";
import { drivers, jobs } from "../../data/mockData";
import { initials, jobStatusClass } from "../../lib/badges";
import { TODAY, isoDate } from "../../lib/dateRange";

const todayISO = isoDate(TODAY);

export default function Dashboard(){
  const navigate = useNavigate();
  const todaysJobs = jobs.filter(j=>j.dateISO===todayISO);
  const completedToday = todaysJobs.filter(j=>j.status==="Completed");
  const revenueToday = completedToday.reduce((s,j)=>s+j.fare,0);
  const activeDrivers = drivers.filter(d=>d.status==="Active");

  return <main className="page-wrap">
    <PageTitle title="Dashboard" description="A live-style overview of your towing operations." action={<button className="btn-secondary">{TODAY.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})} ▾</button>}/>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total Drivers" value={String(drivers.length)} sub={`${drivers.filter(d=>d.status==="Pending").length} pending review`} icon={Users}/>
      <StatCard label="Active Drivers" value={String(activeDrivers.length)} sub={`${todaysJobs.filter(j=>j.status==="In Progress").length} on active jobs`} icon={Activity} accent="green"/>
      <StatCard label="Today's Jobs" value={String(todaysJobs.length)} sub={`${completedToday.length} completed`} icon={ClipboardList} accent="blue"/>
      <StatCard label="Today's Revenue" value={`AED ${revenueToday.toLocaleString()}`} sub="From completed jobs" icon={DollarSign}/>
    </div>
    <div className="grid xl:grid-cols-[1.4fr_.8fr] gap-5">
      <section className="card">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between"><div><h2 className="font-bold text-slate-900">Recent jobs</h2><p className="text-xs text-slate-400 mt-1">Latest completed and active towing jobs</p></div><Link to="/admin/jobs" className="text-xs font-bold text-orange-600">View all</Link></div>
        <div className="table-wrap"><table className="data-table"><thead><tr><th>Job</th><th>Driver</th><th>Route</th><th>Fare</th><th>Status</th></tr></thead><tbody>
          {jobs.slice(0,5).map(j=><tr key={j.id} className="cursor-pointer hover:bg-slate-50" onClick={()=>navigate(`/admin/jobs/${j.id}`)}><td><div className="font-bold text-slate-800">{j.id}</div><div className="text-[11px] text-slate-400">{j.date}</div></td><td>{drivers.find(d=>d.id===j.driverId)?.name}</td><td><div className="max-w-[220px]"><div className="truncate">{j.pickup}</div><div className="text-[11px] text-slate-400 truncate">↓ {j.dropoff}</div></div></td><td className="font-bold">{j.fare?`AED ${j.fare}`:"—"}</td><td><span className={`badge ${jobStatusClass(j.status)}`}>{j.status==="Completed" && <CheckCircle2 size={12}/>}{j.status}</span></td></tr>)}
        </tbody></table></div>
      </section>
      <section className="card p-5">
        <div className="flex items-center justify-between"><div><h2 className="font-bold text-slate-900">Driver activity</h2><p className="text-xs text-slate-400 mt-1">Today's active drivers</p></div><Truck size={19} className="text-slate-400"/></div>
        <div className="mt-5 space-y-4">{drivers.slice(0,4).map(d=><Link to={`/admin/drivers/${d.id}`} key={d.id} className="flex items-center gap-3 group">
          <div className="avatar">{initials(d.name)}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between"><span className="text-sm font-bold text-slate-800 truncate">{d.name}</span><span className="text-xs font-bold text-slate-700">{d.jobsToday} jobs</span></div><div className="text-[11px] text-slate-400 mt-1">{d.truckId} • {d.lastActivity}</div></div>
        </Link>)}</div>
      </section>
    </div>
  </main>
}
