import { Eye, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DateFilterBar from "../../components/DateFilterBar";
import EmptyState from "../../components/EmptyState";
import PageTitle from "../../components/PageTitle";
import { jobs } from "../../data/mockData";
import { jobStatusClass } from "../../lib/badges";
import type { DatePreset } from "../../lib/dateRange";
import { presetRange } from "../../lib/dateRange";
import { useAuth } from "../../lib/auth";

export default function MyJobs(){
  const { user } = useAuth();
  const myId = user?.driverId ?? "";
  const [preset, setPreset] = useState<DatePreset>("Last 15 Days");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [search, setSearch] = useState("");

  const range = presetRange(preset, customFrom, customTo);
  const mine = useMemo(()=>{
    return jobs.filter(j=>{
      if (j.driverId !== myId) return false;
      if (j.dateISO < range.from || j.dateISO > range.to) return false;
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return j.customer.toLowerCase().includes(q) || j.id.toLowerCase().includes(q) || j.plate.toLowerCase().includes(q);
    });
  },[myId, range.from, range.to, search]);

  return <main className="page-wrap">
    <PageTitle title="My Jobs" description="Your complete towing work history."/>
    <section className="card">
      <DateFilterBar preset={preset} onPreset={setPreset} customFrom={customFrom} customTo={customTo} onCustomFrom={setCustomFrom} onCustomTo={setCustomTo} search={search} onSearch={setSearch} searchPlaceholder="Search customer, job ID or plate..."/>
      {mine.length===0 ? (
        <EmptyState icon={FileText} title="No jobs found" description="No jobs match the selected date range or search."/>
      ) : (
        <div className="table-wrap"><table className="data-table"><thead><tr><th>Date</th><th>Job</th><th>Customer</th><th>Vehicle</th><th>Pickup</th><th>Drop-off</th><th>Fare</th><th>Status</th><th></th></tr></thead><tbody>
          {mine.map(j=><tr key={j.id}><td>{j.date}</td><td className="font-bold">{j.id}</td><td>{j.customer}</td><td>{j.vehicleMake} {j.vehicleModel}<div className="text-[11px] text-slate-400">{j.plate}</div></td><td className="max-w-[140px]"><div className="truncate">{j.pickup}</div></td><td className="max-w-[140px]"><div className="truncate">{j.dropoff}</div></td><td className="font-bold">{j.fare?`AED ${j.fare}`:"—"}</td><td><span className={`badge ${jobStatusClass(j.status)}`}>{j.status}</span></td><td><Link to={`/driver/jobs/${j.id}`} className="btn-secondary inline-flex items-center gap-1"><Eye size={13}/> View</Link></td></tr>)}
        </tbody></table></div>
      )}
    </section>
  </main>
}
