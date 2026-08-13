import { Search, Truck as TruckIcon, X } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../../components/EmptyState";
import PageTitle from "../../components/PageTitle";
import { drivers, trucks as initialTrucks } from "../../data/mockData";
import { truckStatusClass } from "../../lib/badges";
import type { Truck } from "../../types";

const STATUSES: (Truck["status"] | "All")[] = ["All", "Active", "Available", "Maintenance", "Inactive"];

export default function Trucks(){
  const [trucks, setTrucks] = useState(initialTrucks);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Truck["status"] | "All">("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ id: "", type: "Flatbed", plate: "" });

  const filtered = useMemo(()=>{
    return trucks.filter(t=>{
      if (status!=="All" && t.status!==status) return false;
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return t.id.toLowerCase().includes(q) || t.plate.toLowerCase().includes(q);
    });
  },[trucks, search, status]);

  function addTruck(){
    if (!form.id || !form.plate) return;
    setTrucks(prev=>[...prev, { id: form.id, type: form.type, plate: form.plate, driverId: "", status: "Available" }]);
    setForm({ id: "", type: "Flatbed", plate: "" });
    setModalOpen(false);
  }

  return <main className="page-wrap">
    <PageTitle title="Trucks" description="Manage company towing and recovery vehicles." action={<button onClick={()=>setModalOpen(true)} className="btn-primary">+ Add truck</button>}/>

    <div className="card p-4 mb-5 flex flex-col md:flex-row gap-3 justify-between">
      <div className="relative w-full md:w-80"><Search size={16} className="absolute left-3 top-3 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} className="input pl-9" placeholder="Search truck ID or plate..."/></div>
      <div className="flex flex-wrap gap-2">{STATUSES.map(s=><button key={s} onClick={()=>setStatus(s)} className={`text-xs font-bold px-3 py-2 rounded-lg border ${status===s ? "bg-[#101826] text-white border-[#101826]" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{s}</button>)}</div>
    </div>

    {filtered.length===0 ? (
      <div className="card"><EmptyState icon={TruckIcon} title="No trucks found" description="Try a different search or status filter."/></div>
    ) : (
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{filtered.map(t=><div className="card p-5" key={t.id}>
        <div className="flex items-start justify-between"><div className="w-11 h-11 rounded-xl bg-slate-100 grid place-items-center text-slate-600"><TruckIcon size={20}/></div><span className={`badge ${truckStatusClass(t.status)}`}>{t.status}</span></div>
        <div className="mt-4"><div className="text-lg font-extrabold">{t.id}</div><div className="text-sm text-slate-500">{t.type}</div></div>
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3"><div><div className="text-[11px] text-slate-400">Plate</div><div className="text-sm font-bold">{t.plate}</div></div><div><div className="text-[11px] text-slate-400">Driver</div><div className="text-sm font-bold">{drivers.find(d=>d.id===t.driverId)?.name||"Unassigned"}</div></div></div>
      </div>)}</div>
    )}

    {modalOpen && (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={()=>setModalOpen(false)}>
        <div className="card w-full max-w-md p-6" onClick={e=>e.stopPropagation()}>
          <div className="flex items-center justify-between mb-5"><h2 className="font-bold text-slate-900">Add truck</h2><button onClick={()=>setModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={18}/></button></div>
          <div className="space-y-4">
            <div><label className="label">Truck ID</label><input value={form.id} onChange={e=>setForm({...form, id:e.target.value})} className="input" placeholder="e.g. T-12"/></div>
            <div><label className="label">Truck type</label><select value={form.type} onChange={e=>setForm({...form, type:e.target.value})} className="input"><option>Flatbed</option><option>Recovery Truck</option><option>Heavy Duty Tow Truck</option><option>Wheel Lift Truck</option></select></div>
            <div><label className="label">Plate number</label><input value={form.plate} onChange={e=>setForm({...form, plate:e.target.value})} className="input" placeholder="Dubai 00000"/></div>
          </div>
          <div className="flex justify-end gap-2 mt-6"><button onClick={()=>setModalOpen(false)} className="btn-secondary">Cancel</button><button onClick={addTruck} className="btn-primary">Add truck</button></div>
        </div>
      </div>
    )}
  </main>
}
