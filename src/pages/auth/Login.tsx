import { AlertCircle, CarFront, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import type { Role } from "../../lib/auth";
import { emailFieldError, requiredError } from "../../lib/validate";

export default function Login(){
  const [params] = useSearchParams();
  const initialRole: Role = params.get("role") === "driver" ? "driver" : params.get("role") === "admin" ? "admin" : "admin";
  const [role, setRole] = useState<Role>(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If already logged in, skip straight to the right dashboard.
    if (user) navigate(user.role === "admin" ? "/admin" : "/driver", { replace: true });
  }, [user, navigate]);

  const emailError = touched ? (requiredError(email, "Email") || emailFieldError(email)) : null;
  const passwordError = touched ? requiredError(password, "Password") : null;

  function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    setTouched(true);
    if (requiredError(email, "Email") || emailFieldError(email) || requiredError(password, "Password")) return;

    const result = login(role, email, password);
    if (!result.ok) { setFormError(result.error); return; }
    setFormError(null);
    const from = (location.state as { from?: string } | null)?.from;
    navigate(from || (role === "admin" ? "/admin" : "/driver"), { replace: true });
  }

  return <div className="min-h-screen bg-[#101826] grid lg:grid-cols-[1.05fr_.95fr]">
    <div className="hidden lg:flex relative overflow-hidden p-12 text-white flex-col justify-between">
      <div className="absolute inset-0 opacity-30" style={{background:"radial-gradient(circle at 25% 20%, #ff6b22 0, transparent 28%), radial-gradient(circle at 80% 80%, #35445f 0, transparent 35%)"}}/>
      <Link to="/" className="relative flex items-center gap-3"><div className="brand-mark"><CarFront size={18}/></div><div><div className="font-extrabold">Dubai Towing</div><div className="text-[10px] text-slate-400 uppercase tracking-[.16em]">Management Portal</div></div></Link>
      <div className="relative max-w-xl"><div className="text-orange-400 text-xs font-bold uppercase tracking-[.2em] mb-4">Operations control center</div><h1 className="text-5xl font-black tracking-tight leading-[1.05]">Every driver. Every job. One clear view.</h1><p className="text-slate-400 mt-5 max-w-lg">A focused fleet management workspace for Dubai towing operations — built for fast decisions and clean daily records.</p></div>
      <div className="relative text-xs text-slate-500">Dubai • United Arab Emirates</div>
    </div>
    <div className="bg-[#f7f8fa] flex items-center justify-center p-5 sm:p-10">
      <div className="w-full max-w-md">
        <div className="lg:hidden flex items-center gap-3 mb-10"><div className="brand-mark"><CarFront size={18}/></div><b>Dubai Towing</b></div>
        <div className="mb-8"><h2 className="text-3xl font-black text-slate-900">Welcome back</h2><p className="text-sm text-slate-500 mt-2">Sign in to your operations portal.</p></div>
        <form className="card p-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6">
            <button type="button" onClick={()=>{setRole("admin"); setFormError(null);}} className={`py-2 rounded-lg text-xs font-bold ${role==="admin"?"bg-white shadow-sm text-slate-900":"text-slate-500"}`}>Business Admin</button>
            <button type="button" onClick={()=>{setRole("driver"); setFormError(null);}} className={`py-2 rounded-lg text-xs font-bold ${role==="driver"?"bg-white shadow-sm text-slate-900":"text-slate-500"}`}>Driver</button>
          </div>

          {formError && <div className="mb-4 flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3"><AlertCircle size={15} className="mt-0.5 shrink-0"/><span>{formError}</span></div>}

          <label className="label">Email<span className="req-star">*</span></label>
          <input
            className={`input mb-1 ${emailError ? "input-error" : ""}`}
            placeholder={role==="admin"?"admin@dubaitowing.ae":"you@dubaitowing.ae"}
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
          {emailError && <div className="field-error-text mb-3"><AlertCircle size={12}/> {emailError}</div>}
          {!emailError && <div className="mb-4"/>}

          <label className="label">Password<span className="req-star">*</span></label>
          <input
            type="password"
            className={`input mb-1 ${passwordError ? "input-error" : ""}`}
            placeholder="••••••••"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
          {passwordError && <div className="field-error-text mb-3"><AlertCircle size={12}/> {passwordError}</div>}
          {!passwordError && <div className="mb-5"/>}

          <button type="submit" className="btn-primary w-full py-3">Sign in</button>
          {role==="driver" && <Link to="/register" className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-600"><UserRound size={14}/> New driver? Apply here</Link>}
          {role==="driver" && <p className="mt-4 text-[11px] text-slate-400 text-center">Don't have a login yet? Your Business Admin gives you an email &amp; password once your application is approved.</p>}
          {role==="admin" && <p className="mt-4 text-[11px] text-slate-400 text-center">Demo credentials: admin@dubaitowing.ae / Admin@123</p>}
        </form>
        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-400"><ShieldCheck size={14}/> Secure company portal</div>
      </div>
    </div>
  </div>
}
