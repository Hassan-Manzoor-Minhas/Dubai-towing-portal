import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react";
import PageTitle from "../../components/PageTitle";
import StatCard from "../../components/StatCard";
import { drivers, revenueTrend } from "../../data/mockData";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const weekly = revenueTrend.slice(-7);
const jobsThisWeek = weekly.reduce((s,d)=>s+d.jobs,0);
const revenueThisWeek = weekly.reduce((s,d)=>s+d.revenue,0);
const prevWeek = revenueTrend.slice(0,7);
const jobsPrevWeek = prevWeek.reduce((s,d)=>s+d.jobs,0) || 1;
const revenuePrevWeek = prevWeek.reduce((s,d)=>s+d.revenue,0) || 1;
const jobsChange = (((jobsThisWeek - jobsPrevWeek) / jobsPrevWeek) * 100).toFixed(1);
const revenueChange = (((revenueThisWeek - revenuePrevWeek) / revenuePrevWeek) * 100).toFixed(1);
const utilization = Math.round((drivers.filter(d=>d.status==="Active").length / drivers.length) * 100);

const leaderboard = [...drivers].sort((a,b)=>b.totalFare-a.totalFare).slice(0,5);

export default function Reports(){
  return <main className="page-wrap">
    <PageTitle title="Reports" description="Operational and financial performance at a glance." action={<button className="btn-secondary">Last 7 days ▾</button>}/>

    <div className="grid md:grid-cols-3 gap-4 mb-5">
      <StatCard label="Jobs this week" value={String(jobsThisWeek)} sub={`${Number(jobsChange)>=0?"+":""}${jobsChange}% vs previous week`} icon={BarChart3} accent="blue"/>
      <StatCard label="Revenue this week" value={`AED ${revenueThisWeek.toLocaleString()}`} sub={`${Number(revenueChange)>=0?"+":""}${revenueChange}% vs previous week`} icon={DollarSign}/>
      <StatCard label="Driver utilization" value={`${utilization}%`} sub="Currently active drivers" icon={Users} accent="green"/>
    </div>

    <div className="grid xl:grid-cols-2 gap-5 mb-5">
      <section className="card p-5">
        <h2 className="font-bold">Jobs per day</h2><p className="text-xs text-slate-400 mt-1">Last 14 days</p>
        <div className="h-[280px] mt-5"><ResponsiveContainer width="100%" height="100%"><BarChart data={revenueTrend}><CartesianGrid vertical={false} stroke="#eef1f4"/><XAxis dataKey="day" tick={{fontSize:11, fill:"#94a3b8"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11, fill:"#94a3b8"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:12, border:"1px solid #e7ebf0", fontSize:12}}/><Bar dataKey="jobs" fill="#ff6b22" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>
      </section>
      <section className="card p-5">
        <h2 className="font-bold">Revenue trend</h2><p className="text-xs text-slate-400 mt-1">Last 14 days, AED</p>
        <div className="h-[280px] mt-5"><ResponsiveContainer width="100%" height="100%"><LineChart data={revenueTrend}><CartesianGrid vertical={false} stroke="#eef1f4"/><XAxis dataKey="day" tick={{fontSize:11, fill:"#94a3b8"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11, fill:"#94a3b8"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:12, border:"1px solid #e7ebf0", fontSize:12}}/><Line type="monotone" dataKey="revenue" stroke="#101826" strokeWidth={2.5} dot={false}/></LineChart></ResponsiveContainer></div>
      </section>
    </div>

    <section className="card">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between"><div><h2 className="font-bold text-slate-900">Top performing drivers</h2><p className="text-xs text-slate-400 mt-1">Ranked by total recorded fare</p></div><TrendingUp size={19} className="text-slate-400"/></div>
      <div className="table-wrap"><table className="data-table"><thead><tr><th>Driver</th><th>Total Jobs</th><th>Completed</th><th>Total Fare</th><th>Average Fare</th></tr></thead><tbody>
        {leaderboard.map(d=><tr key={d.id}><td><div className="font-bold text-slate-800">{d.name}</div><div className="text-[11px] text-slate-400">{d.id}</div></td><td>{d.totalJobs}</td><td>{d.completedJobs}</td><td className="font-bold">AED {d.totalFare.toLocaleString()}</td><td>AED {d.averageFare.toFixed(0)}</td></tr>)}
      </tbody></table></div>
    </section>
  </main>
}
