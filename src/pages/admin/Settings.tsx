import { useState } from "react";
import PageTitle from "../../components/PageTitle";

const TABS = ["Company", "Notifications", "Team"] as const;

const team = [
  { name: "Hamza Ali", role: "Business Admin", email: "hamza@dubaitowing.ae" },
  { name: "Sarah Iqbal", role: "Dispatcher", email: "sarah@dubaitowing.ae" },
  { name: "Yusuf Rahman", role: "Finance", email: "yusuf@dubaitowing.ae" },
];

export default function Settings(){
  const [tab, setTab] = useState<typeof TABS[number]>("Company");
  const [notifs, setNotifs] = useState({ newJob: true, driverApplication: true, licenceExpiry: true, dailySummary: false });

  return <main className="page-wrap">
    <PageTitle title="Settings" description="Company and portal preferences."/>

    <div className="flex gap-2 mb-5">
      {TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`text-sm font-bold px-4 py-2 rounded-xl ${tab===t ? "bg-[#101826] text-white" : "text-slate-500 hover:bg-slate-100"}`}>{t}</button>)}
    </div>

    {tab==="Company" && (
      <div className="card p-6 max-w-3xl">
        <h2 className="font-bold text-slate-900">Company information</h2>
        <div className="grid sm:grid-cols-2 gap-5 mt-5">
          <div><label className="label">Company name</label><input className="input" defaultValue="Dubai Towing"/></div>
          <div><label className="label">Currency</label><input className="input" defaultValue="AED"/></div>
          <div><label className="label">Country</label><input className="input" defaultValue="United Arab Emirates"/></div>
          <div><label className="label">Timezone</label><input className="input" defaultValue="Asia/Dubai"/></div>
          <div><label className="label">Support phone</label><input className="input" defaultValue="+971 4 000 1122"/></div>
          <div><label className="label">Support email</label><input className="input" defaultValue="ops@dubaitowing.ae"/></div>
        </div>
        <button className="btn-primary mt-6">Save changes</button>
      </div>
    )}

    {tab==="Notifications" && (
      <div className="card p-6 max-w-3xl">
        <h2 className="font-bold text-slate-900">Notification preferences</h2>
        <p className="text-xs text-slate-400 mt-1">Choose which events trigger an admin notification.</p>
        <div className="mt-5 divide-y divide-slate-100">
          {([
            ["newJob","New job submitted by a driver"],
            ["driverApplication","New driver application received"],
            ["licenceExpiry","Driver licence or Emirates ID nearing expiry"],
            ["dailySummary","Daily operations summary email"],
          ] as const).map(([key,label])=>(
            <div key={key} className="flex items-center justify-between py-4">
              <span className="text-sm font-semibold text-slate-700">{label}</span>
              <button onClick={()=>setNotifs(n=>({...n,[key]:!n[key]}))} className={`w-11 h-6 rounded-full relative transition ${notifs[key]?"bg-orange-500":"bg-slate-200"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${notifs[key]?"left-[22px]":"left-0.5"}`}/>
              </button>
            </div>
          ))}
        </div>
      </div>
    )}

    {tab==="Team" && (
      <div className="card">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between"><h2 className="font-bold text-slate-900">Admin team</h2><button className="btn-primary">+ Invite member</button></div>
        <div className="table-wrap"><table className="data-table"><thead><tr><th>Name</th><th>Role</th><th>Email</th></tr></thead><tbody>
          {team.map(t=><tr key={t.email}><td className="font-bold text-slate-800">{t.name}</td><td>{t.role}</td><td className="text-slate-500">{t.email}</td></tr>)}
        </tbody></table></div>
      </div>
    )}
  </main>
}
