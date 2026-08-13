import { CheckCircle2, ClipboardList, DollarSign, Eye, Plus, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import StatCard from "../../components/StatCard";
import { drivers, jobs } from "../../data/mockData";
import { jobStatusClass } from "../../lib/badges";
import { TODAY, isoDate } from "../../lib/dateRange";
import { useAuth } from "../../lib/auth";

const todayISO = isoDate(TODAY);

export default function DriverDashboard(){
  const { user } = useAuth();
  const myId = user?.driverId ?? drivers[0].id;
  const me = drivers.find(d=>d.id===myId) ?? drivers[0];
  const mine = jobs.filter(j=>j.driverId===myId);
  const todays = mine.filter(j=>j.dateISO===todayISO);
  const completed = todays.filter(j=>j.status==="Completed");
  const pending = todays.filter(j=>j.status==="Pending" || j.status==="In Progress");
  const earnings = completed.reduce((s,j)=>s+j.fare,0);

  return <main className="page-wrap">
    <PageTitle title={`Good day, ${me.name.split(" ")[0]}`} description="Here is your work summary for today." action={<Link to="/driver/add-job" className="btn-primary flex items-center gap-2"><Plus size={16}/> Add new job</Link>}/>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
      <StatCard label="Today's jobs" value={String(todays.length)} sub={`${completed.length} completed`} icon={ClipboardList} accent="blue"/>
      <StatCard label="Completed" value={String(completed.length)} sub={pending.length ? `${pending.length} still pending` : "No pending jobs"} icon={CheckCircle2} accent="green"/>
      <StatCard label="Pending" value={String(pending.length)} sub="Awaiting completion" icon={Timer} accent="red"/>
      <StatCard label="Today's earnings" value={`AED ${earnings.toLocaleString()}`} sub="Recorded payments" icon={DollarSign}/>
    </div>
    <section className="card">
      <div className="p-5 border-b border-slate-100"><h2 className="font-bold">Recent jobs</h2><p className="text-xs text-slate-400 mt-1">Your latest submitted work records</p></div>
      <div className="table-wrap"><table className="data-table"><thead><tr><th>Job</th><th>Customer</th><th>Route</th><th>Fare</th><th>Status</th><th></th></tr></thead><tbody>
        {mine.slice(0,8).map(j=><tr key={j.id}><td className="font-bold">{j.id}<div className="text-[11px] text-slate-400">{j.date}</div></td><td>{j.customer}</td><td>{j.pickup}<div className="text-[11px] text-slate-400">↓ {j.dropoff}</div></td><td className="font-bold">{j.fare?`AED ${j.fare}`:"—"}</td><td><span className={`badge ${jobStatusClass(j.status)}`}>{j.status}</span></td><td><Link to={`/driver/jobs/${j.id}`} className="btn-secondary inline-flex items-center gap-1"><Eye size={13}/> View</Link></td></tr>)}
      </tbody></table></div>
    </section>
  </main>
}
