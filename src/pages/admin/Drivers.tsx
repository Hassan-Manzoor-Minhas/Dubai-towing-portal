import { Check, Copy, Eye, KeyRound, Search, UserRoundX, UserSearch, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../../components/EmptyState";
import PageTitle from "../../components/PageTitle";
import Pagination from "../../components/Pagination";
import { approveApplication, driverApplications, drivers } from "../../data/mockData";
import { applicationStatusClass, driverStatusClass, initials } from "../../lib/badges";
import type { ApplicationStatus, DriverStatus, Driver, DriverApplication } from "../../types";

const PAGE_SIZE = 6;
const STATUSES: (DriverStatus | "All")[] = ["All", "Active", "Offline", "Pending", "Suspended"];

export default function Drivers(){
  const [tab, setTab] = useState<"all" | "applications">("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<DriverStatus | "All">("All");
  const [page, setPage] = useState(1);
  const [apps, setApps] = useState(driverApplications);
  const [driversVersion, forceRerender] = useState(0); // bumped after mutating the shared `drivers` array
  const [newCredentials, setNewCredentials] = useState<{ driver: Driver; password: string } | null>(null);

  const filtered = useMemo(()=>{
    return drivers.filter(d=>{
      const matchesStatus = status==="All" || d.status===status;
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.truckId.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  },[search, status, driversVersion]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  function decide(id: string, decision: ApplicationStatus, app: DriverApplication){
    setApps(prev=>prev.map(a=>a.id===id ? {...a, status: decision} : a));
    if (decision === "Approved") {
      const result = approveApplication(app);
      setNewCredentials(result);
      forceRerender(n => n + 1); // drivers array mutated in place, force list to refresh
    }
  }

  return <main className="page-wrap">
    <PageTitle title="Drivers" description="Manage company drivers, assignments and daily activity." action={
      <button onClick={()=>setTab("applications")} className="btn-primary flex items-center gap-2"><UserSearch size={16}/> Review applications</button>
    }/>

    <div className="flex gap-2 mb-5">
      <button onClick={()=>{setTab("all"); setPage(1);}} className={`text-sm font-bold px-4 py-2 rounded-xl ${tab==="all" ? "bg-[#101826] text-white" : "text-slate-500 hover:bg-slate-100"}`}>All Drivers</button>
      <button onClick={()=>setTab("applications")} className={`text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 ${tab==="applications" ? "bg-[#101826] text-white" : "text-slate-500 hover:bg-slate-100"}`}>Applications {apps.filter(a=>a.status!=="Approved" && a.status!=="Rejected").length>0 && <span className="badge badge-amber !py-0.5 !px-1.5">{apps.filter(a=>a.status!=="Approved" && a.status!=="Rejected").length}</span>}</button>
    </div>

    {tab==="all" ? (
      <section className="card">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-3 justify-between">
          <div className="relative w-full md:w-80"><Search size={16} className="absolute left-3 top-3 text-slate-400"/><input value={search} onChange={e=>{setSearch(e.target.value); setPage(1);}} className="input pl-9" placeholder="Search driver, ID or truck..."/></div>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map(s=><button key={s} onClick={()=>{setStatus(s); setPage(1);}} className={`text-xs font-bold px-3 py-2 rounded-lg border ${status===s ? "bg-[#101826] text-white border-[#101826]" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{s}</button>)}
          </div>
        </div>
        {pageItems.length===0 ? (
          <EmptyState icon={Users} title="No drivers found" description="Try adjusting your search or status filter."/>
        ) : (
          <>
            <div className="table-wrap"><table className="data-table"><thead><tr><th>Driver</th><th>Driver ID</th><th>Status</th><th>Assigned Truck</th><th>Jobs Today</th><th>Revenue Today</th><th>Last Activity</th><th></th></tr></thead><tbody>
              {pageItems.map(d=><tr key={d.id}>
                <td><Link to={`/admin/drivers/${d.id}`} className="flex items-center gap-3"><div className="avatar">{initials(d.name)}</div><div><div className="font-bold text-slate-800">{d.name}</div><div className="text-[11px] text-slate-400">{d.nationality}</div></div></Link></td>
                <td className="font-semibold text-slate-600">{d.id}</td>
                <td><span className={`badge ${driverStatusClass(d.status)}`}>{d.status}</span></td>
                <td><div className="font-semibold">{d.truckId}</div><div className="text-[11px] text-slate-400">Flatbed</div></td>
                <td className="font-bold">{d.jobsToday}</td>
                <td className="font-bold">AED {d.revenueToday.toLocaleString()}</td>
                <td className="text-xs text-slate-400">{d.lastActivity}</td>
                <td><Link to={`/admin/drivers/${d.id}`} className="btn-secondary inline-flex items-center gap-1"><Eye size={14}/> View</Link></td>
              </tr>)}
            </tbody></table></div>
            <Pagination page={page} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onChange={setPage}/>
          </>
        )}
      </section>
    ) : (
      <section className="card">
        <div className="p-5 border-b border-slate-100"><h2 className="font-bold text-slate-900">Driver applications</h2><p className="text-xs text-slate-400 mt-1">Register → Application Submitted → Admin Review → Approve / Reject → Active Driver</p></div>
        {apps.length===0 ? (
          <EmptyState icon={UserSearch} title="No applications" description="New driver applications will appear here for review."/>
        ) : (
          <div className="table-wrap"><table className="data-table"><thead><tr><th>Applicant</th><th>Contact</th><th>Nationality</th><th>Licence</th><th>Applied On</th><th>Status</th><th>Action</th></tr></thead><tbody>
            {apps.map(a=><tr key={a.id}>
              <td><div className="font-bold text-slate-800">{a.name}</div><div className="text-[11px] text-slate-400">{a.id}</div></td>
              <td><div>{a.phone}</div><div className="text-[11px] text-slate-400">{a.email}</div></td>
              <td>{a.nationality}</td>
              <td><div className="font-semibold">{a.licenceNumber}</div><div className="text-[11px] text-slate-400">{a.licenceCategory}</div></td>
              <td className="text-xs text-slate-400">{a.appliedOn}</td>
              <td><span className={`badge ${applicationStatusClass(a.status)}`}>{a.status}</span></td>
              <td>
                {a.status==="Approved" || a.status==="Rejected" ? (
                  <span className="text-xs text-slate-400">Reviewed</span>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={()=>decide(a.id,"Approved",a)} className="btn-secondary !text-emerald-700 !border-emerald-200 inline-flex items-center gap-1"><Check size={13}/> Approve</button>
                    <button onClick={()=>decide(a.id,"Rejected",a)} className="btn-secondary !text-rose-600 !border-rose-200 inline-flex items-center gap-1"><UserRoundX size={13}/> Reject</button>
                  </div>
                )}
              </td>
            </tr>)}
          </tbody></table></div>
        )}
      </section>
    )}

    {newCredentials && (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={()=>setNewCredentials(null)}>
        <div className="card w-full max-w-md p-6" onClick={e=>e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><KeyRound size={18} className="text-orange-500"/><h2 className="font-bold text-slate-900">Driver approved</h2></div>
            <button onClick={()=>setNewCredentials(null)} className="text-slate-400 hover:text-slate-700"><X size={18}/></button>
          </div>
          <p className="text-sm text-slate-500 mb-4">{newCredentials.driver.name} ({newCredentials.driver.id}) can now log in to the Driver Portal with these credentials. Share them securely — this password won't be shown again.</p>
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 p-3">
              <div className="text-[11px] text-slate-400 mb-1">Login email</div>
              <div className="font-bold text-slate-800">{newCredentials.driver.email}</div>
            </div>
            <div className="rounded-xl border border-slate-200 p-3 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 mb-1">Temporary password</div>
                <div className="font-bold text-slate-800 tracking-wide">{newCredentials.password}</div>
              </div>
              <button
                onClick={()=>navigator.clipboard?.writeText(`Email: ${newCredentials.driver.email}\nPassword: ${newCredentials.password}`)}
                className="btn-secondary !p-2" title="Copy credentials"
              ><Copy size={14}/></button>
            </div>
          </div>
          <button onClick={()=>setNewCredentials(null)} className="btn-primary w-full mt-5">Done</button>
        </div>
      </div>
    )}
  </main>
}
