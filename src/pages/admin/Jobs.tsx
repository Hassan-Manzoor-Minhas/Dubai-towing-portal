import { ClipboardList, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DateFilterBar from "../../components/DateFilterBar";
import EmptyState from "../../components/EmptyState";
import PageTitle from "../../components/PageTitle";
import Pagination from "../../components/Pagination";
import { drivers, jobs } from "../../data/mockData";
import { jobStatusClass } from "../../lib/badges";
import type { DatePreset } from "../../lib/dateRange";
import { presetRange } from "../../lib/dateRange";
import type { JobStatus } from "../../types";

const PAGE_SIZE = 8;
const STATUSES: (JobStatus | "All")[] = ["All", "Completed", "In Progress", "Pending", "Cancelled"];

export default function Jobs(){
  const [preset, setPreset] = useState<DatePreset>("Last 30 Days");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<JobStatus | "All">("All");
  const [page, setPage] = useState(1);

  const range = presetRange(preset, customFrom, customTo);
  const filtered = useMemo(()=>{
    return jobs.filter(j=>{
      if (j.dateISO < range.from || j.dateISO > range.to) return false;
      if (status!=="All" && j.status!==status) return false;
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return j.id.toLowerCase().includes(q) || j.customer.toLowerCase().includes(q) || j.plate.toLowerCase().includes(q);
    });
  },[range.from, range.to, status, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return <main className="page-wrap"><PageTitle title="Jobs" description="All towing and recovery jobs submitted by drivers." action={<button className="btn-secondary">Export report</button>}/>
    <section className="card">
      <DateFilterBar preset={preset} onPreset={p=>{setPreset(p); setPage(1);}} customFrom={customFrom} customTo={customTo} onCustomFrom={setCustomFrom} onCustomTo={setCustomTo} search={search} onSearch={v=>{setSearch(v); setPage(1);}} searchPlaceholder="Search job, customer or plate..."/>
      <div className="px-4 pb-4 flex flex-wrap gap-1.5 -mt-2">
        {STATUSES.map(s=><button key={s} onClick={()=>{setStatus(s); setPage(1);}} className={`text-xs font-bold px-3 py-2 rounded-lg border ${status===s ? "bg-[#101826] text-white border-[#101826]" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{s}</button>)}
      </div>
      {pageItems.length===0 ? (
        <EmptyState icon={ClipboardList} title="No jobs found" description="Try a different date range, status or search term."/>
      ) : (
        <>
          <div className="table-wrap"><table className="data-table"><thead><tr><th>Job</th><th>Customer</th><th>Driver</th><th>Vehicle</th><th>Route</th><th>Fare</th><th>Status</th><th></th></tr></thead><tbody>
            {pageItems.map(j=><tr key={j.id}><td><div className="font-bold">{j.id}</div><div className="text-[11px] text-slate-400">{j.date} • {j.startTime}</div></td><td><div className="font-semibold">{j.customer}</div><div className="text-[11px] text-slate-400">{j.phone}</div></td><td>{drivers.find(d=>d.id===j.driverId)?.name}</td><td>{j.vehicleMake} {j.vehicleModel}<div className="text-[11px] text-slate-400">{j.plate}</div></td><td><div className="text-xs">{j.pickup}</div><div className="text-[11px] text-slate-400">↓ {j.dropoff}</div></td><td className="font-bold">{j.fare?`AED ${j.fare}`:"—"}</td><td><span className={`badge ${jobStatusClass(j.status)}`}>{j.status}</span></td><td><Link to={`/admin/jobs/${j.id}`} className="btn-secondary inline-flex items-center gap-1"><Eye size={13}/> View</Link></td></tr>)}
          </tbody></table></div>
          <Pagination page={page} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onChange={setPage}/>
        </>
      )}
    </section>
  </main>
}
