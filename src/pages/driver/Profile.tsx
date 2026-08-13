import { Pencil } from "lucide-react";
import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { drivers } from "../../data/mockData";
import { driverStatusClass, initials } from "../../lib/badges";
import { useAuth } from "../../lib/auth";

export default function Profile(){
  const { user } = useAuth();
  const d = drivers.find(x=>x.id===user?.driverId) ?? drivers[0];
  const [editing, setEditing] = useState(false);

  const personal = [["Full Name",d.name],["Date of Birth",d.dob],["Nationality",d.nationality],["Mobile",d.phone],["Email",d.email],["Address",d.address],["Emergency Contact",`${d.emergencyContact} • ${d.emergencyPhone}`]];
  const identification = [["Emirates ID",d.emiratesId],["Emirates ID Expiry",d.emiratesExpiry],["UAE Driving Licence",d.licenceNumber],["Licence Category",d.licenceCategory],["Licence Expiry",d.licenceExpiry]];
  const employment = [["Employee ID",d.employeeId],["Joining Date",d.joiningDate],["Assigned Truck",d.truckId],["Account Status",d.status]];

  return <main className="page-wrap">
    <PageTitle title="My Profile" description="Your company and driver information." action={<button onClick={()=>setEditing(e=>!e)} className="btn-secondary flex items-center gap-2"><Pencil size={14}/> {editing?"Done editing":"Edit profile"}</button>}/>
    <section className="card p-6">
      <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
        <div className="w-14 h-14 rounded-2xl bg-[#172238] text-white grid place-items-center font-extrabold">{initials(d.name)}</div>
        <div><h2 className="text-xl font-extrabold">{d.name}</h2><div className="text-xs text-slate-400 mt-1">{d.id} • {d.truckId}</div></div>
        <span className={`badge ${driverStatusClass(d.status)} ml-auto`}>{d.status}</span>
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Personal information</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {personal.map(([k,v])=><div key={k}>
            <div className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">{k}</div>
            {editing ? <input defaultValue={v} className="input mt-1.5"/> : <div className="font-semibold text-sm mt-1">{v}</div>}
          </div>)}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Emirates ID & driving licence</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {identification.map(([k,v])=><div key={k}><div className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">{k}</div><div className="font-semibold text-sm mt-1">{v}</div></div>)}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Employment</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {employment.map(([k,v])=><div key={k}><div className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">{k}</div><div className="font-semibold text-sm mt-1">{v}</div></div>)}
        </div>
      </div>

      {editing && <div className="flex justify-end mt-8 pt-6 border-t border-slate-100"><button onClick={()=>setEditing(false)} className="btn-primary">Save changes</button></div>}
    </section>
  </main>
}
