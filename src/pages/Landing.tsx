import { ArrowRight, CarFront, ClipboardList, ShieldCheck, UserRound, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0c1420] text-white flex flex-col">
      <div className="flex items-center gap-3 px-8 py-7">
        <div className="brand-mark"><CarFront size={18} /></div>
        <div>
          <div className="font-extrabold tracking-tight">Dubai Towing</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-[.16em]">Management Portal</div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-full mb-5"><ShieldCheck size={13} /> Internal operations platform</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Choose how you'd like to continue</h1>
            <p className="text-slate-400 mt-3 max-w-lg mx-auto">Sign in to the Business Admin console to manage fleet operations, or open the Driver portal to log your daily jobs.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Link to="/login?role=admin" className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition p-7">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-400 grid place-items-center mb-5"><Users size={22} /></div>
              <div className="text-lg font-extrabold">Business Admin</div>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">Dashboard, drivers, jobs, trucks, reports and company settings.</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-400 group-hover:gap-3 transition-all">Continue as Admin <ArrowRight size={15} /></div>
            </Link>

            <Link to="/login?role=driver" className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition p-7">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-400 grid place-items-center mb-5"><UserRound size={22} /></div>
              <div className="text-lg font-extrabold">Driver Portal</div>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">View your jobs, log new towing jobs and manage your profile.</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-400 group-hover:gap-3 transition-all">Continue as Driver <ArrowRight size={15} /></div>
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 text-slate-300 grid place-items-center"><ClipboardList size={16} /></div>
              <div>
                <div className="text-sm font-bold">New driver?</div>
                <div className="text-xs text-slate-400">Apply to join the Dubai Towing fleet.</div>
              </div>
            </div>
            <Link to="/register" className="btn-secondary !bg-transparent !text-white !border-white/15 hover:!bg-white/5">Submit application</Link>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-500 pb-6">Dubai Towing • Internal use only</div>
    </div>
  );
}
