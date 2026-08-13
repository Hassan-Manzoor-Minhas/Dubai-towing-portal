import { ArrowLeft, BriefcaseBusiness, CalendarDays, CarFront, Clock3, DollarSign, Eye, FileText, Phone, UserRound, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DateFilterBar from "../../components/DateFilterBar";
import EmptyState from "../../components/EmptyState";
import PageTitle from "../../components/PageTitle";
import StatCard from "../../components/StatCard";
import { drivers, jobs } from "../../data/mockData";
import { driverStatusClass, initials, jobStatusClass } from "../../lib/badges";
import type { DatePreset } from "../../lib/dateRange";
import { presetRange } from "../../lib/dateRange";

export default function DriverDetails(){
  const {id}=useParams(); const d=drivers.find(x=>x.id===id)||drivers[0];

  const [preset, setPreset] = useState<DatePreset>("Last 15 Days");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [search, setSearch] = useState("");

  const range = presetRange(preset, customFrom, customTo);
  const driverJobs = useMemo(()=>{
    return jobs.filter(j=>{
      if (j.driverId !== d.id) return false;
      if (j.dateISO < range.from || j.dateISO > range.to) return false;
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return j.customer.toLowerCase().includes(q) || j.id.toLowerCase().includes(q) || j.plate.toLowerCase().includes(q);
    });
  },[d.id, range.from, range.to, search]);

  const rows=[["Full Name",d.name],["Date of Birth",d.dob],["Nationality",d.nationality],["Mobile",d.phone],["Email",d.email],["Address",d.address],["Emergency Contact",`${d.emergencyContact} • ${d.emergencyPhone}`],["Emirates ID",d.emiratesId],["Emirates ID Expiry",d.emiratesExpiry],["UAE Driving Licence",d.licenceNumber],["Licence Category",d.licenceCategory],["Licence Expiry",d.licenceExpiry],["Employee ID",d.employeeId],["Joining Date",d.joiningDate],["Assigned Truck",d.truckId],["Account Status",d.status]];

  return <main className="page-wrap">
    <Link to="/admin/drivers" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-5"><ArrowLeft size={15}/> Back to drivers</Link>
    <div className="card p-5 sm:p-6 mb-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-2xl bg-[#172238] text-white grid place-items-center text-lg font-extrabold">{initials(d.name)}</div><div><div className="flex items-center gap-2"><h1 className="text-2xl font-extrabold">{d.name}</h1><span className={`badge ${driverStatusClass(d.status)}`}>{d.status}</span></div><div className="text-sm text-slate-400 mt-1">{d.id} • {d.licenceCategory} • {d.truckId}</div></div></div>
        <div className="flex gap-2"><button className="btn-secondary">Edit profile</button><button className="btn-primary">Contact driver</button></div>
      </div>
      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex gap-3"><Phone size={17} className="text-orange-500 mt-1"/><div><div className="text-[11px] text-slate-400">Mobile</div><div className="text-sm font-bold">{d.phone}</div></div></div>
        <div className="flex gap-3"><CalendarDays size={17} className="text-orange-500 mt-1"/><div><div className="text-[11px] text-slate-400">Joined</div><div className="text-sm font-bold">{d.joiningDate}</div></div></div>
        <div className="flex gap-3"><CarFront size={17} className="text-orange-500 mt-1"/><div><div className="text-[11px] text-slate-400">Assigned truck</div><div className="text-sm font-bold">{d.truckId}</div></div></div>
        <div className="flex gap-3"><Clock3 size={17} className="text-orange-500 mt-1"/><div><div className="text-[11px] text-slate-400">Last activity</div><div className="text-sm font-bold">{d.lastActivity}</div></div></div>
      </div>
    </div>

    <section className="card p-5 sm:p-6 mb-5">
      <div className="flex items-center gap-2 mb-5"><UserRound size={18} className="text-orange-500"/><h2 className="font-bold text-slate-900">Personal & employment information</h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-5">
        {rows.map(([k,v])=><div key={k}><div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{k}</div><div className="text-sm font-semibold text-slate-800 mt-1 break-words">{v}</div></div>)}
      </div>
    </section>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      <StatCard label="Total jobs" value={String(d.totalJobs)} sub="All recorded jobs" icon={BriefcaseBusiness} accent="blue"/>
      <StatCard label="Completed" value={String(d.completedJobs)} sub="Successful jobs" icon={FileText} accent="green"/>
      <StatCard label="Cancelled" value={String(d.cancelledJobs)} sub="Cancelled jobs" icon={XCircle} accent="red"/>
      <StatCard label="Total fare" value={`AED ${d.totalFare.toLocaleString()}`} sub={`Avg AED ${d.averageFare.toFixed(0)} / job`} icon={DollarSign}/>
    </div>

    <section className="card">
      <div className="p-5 border-b border-slate-100"><h2 className="font-bold text-slate-900">Daily work records</h2><p className="text-xs text-slate-400 mt-1">Default view: last 15 days</p></div>
      <DateFilterBar preset={preset} onPreset={setPreset} customFrom={customFrom} customTo={customTo} onCustomFrom={setCustomFrom} onCustomTo={setCustomTo} search={search} onSearch={setSearch} searchPlaceholder="Search customer, job ID or plate..."/>
      {driverJobs.length===0 ? (
        <EmptyState icon={FileText} title="No work records" description="No jobs found for the selected date range or search."/>
      ) : (
        <div className="table-wrap"><table className="data-table"><thead><tr><th>Date</th><th>Job ID</th><th>Customer</th><th>Vehicle</th><th>Issue</th><th>Pickup</th><th>Drop-off</th><th>Fare</th><th>Status</th><th></th></tr></thead><tbody>
          {driverJobs.map(j=><tr key={j.id}><td>{j.date}</td><td className="font-bold text-slate-800">{j.id}</td><td><div className="font-semibold">{j.customer}</div><div className="text-[11px] text-slate-400">{j.phone}</div></td><td>{j.vehicleMake} {j.vehicleModel}<div className="text-[11px] text-slate-400">{j.plate}</div></td><td>{j.issue}</td><td className="max-w-[140px]"><div className="truncate">{j.pickup}</div></td><td className="max-w-[140px]"><div className="truncate">{j.dropoff}</div></td><td className="font-bold">{j.fare?`AED ${j.fare}`:"—"}</td><td><span className={`badge ${jobStatusClass(j.status)}`}>{j.status}</span></td><td><Link to={`/admin/jobs/${j.id}`} className="btn-secondary inline-flex items-center gap-1"><Eye size={13}/> View</Link></td></tr>)}
        </tbody></table></div>
      )}
    </section>
  </main>
}
