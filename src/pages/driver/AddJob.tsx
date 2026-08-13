import { AlertCircle, CheckCircle2, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { numberFieldError, phoneFieldError, requiredError, textFieldError } from "../../lib/validate";

const ISSUES = ["Engine Problem","Accident","Flat Tyre","Battery Problem","Overheating","Fuel Problem","Electrical Problem","Vehicle Won't Start","Vehicle Recovery","Other"];
const TOWING_TYPES = ["Flatbed","Wheel Lift","Recovery","Heavy Duty"];
const PAYMENT_METHODS = ["Cash","Card","Company Account"];
const PAYMENT_STATUSES = ["Paid","Awaiting","Unpaid"];
const JOB_STATUSES = ["Completed","In Progress","Pending","Cancelled"];

const initialForm = {
  customerName: "", customerPhone: "",
  make: "", model: "", plate: "", vehicleType: "Sedan",
  issue: ISSUES[0], description: "",
  pickup: "", dropoff: "", pickupTime: "", completionTime: "",
  towingType: TOWING_TYPES[0], truckUsed: "T-05",
  fare: "", paymentMethod: PAYMENT_METHODS[0], paymentStatus: PAYMENT_STATUSES[0], jobStatus: JOB_STATUSES[0],
};

type FormKey = keyof typeof initialForm;

// Fields the driver must fill in before the job can be submitted.
const REQUIRED_FIELDS: { key: FormKey; label: string }[] = [
  { key: "customerName", label: "Customer name" },
  { key: "customerPhone", label: "Customer phone" },
  { key: "pickup", label: "Pickup location" },
];

export default function AddJob(){
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FormKey, boolean>>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const set = (key: FormKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const markTouched = (key: FormKey) => () => setTouched(t => ({ ...t, [key]: true }));

  // Validation rules per field. Returns an error string or null.
  function fieldError(key: FormKey): string | null {
    const value = form[key];
    const required = REQUIRED_FIELDS.find(r => r.key === key);
    if (required) {
      const err = requiredError(value, required.label);
      if (err) return err;
    }
    switch (key) {
      case "customerName": return textFieldError(value, "Customer name");
      case "make": return textFieldError(value, "Make");
      case "model": return textFieldError(value, "Model");
      case "pickup": return textFieldError(value, "Pickup location");
      case "dropoff": return textFieldError(value, "Drop-off location");
      case "customerPhone": return phoneFieldError(value);
      case "fare": return numberFieldError(value, "Fare");
      default: return null;
    }
  }

  const allKeys = Object.keys(initialForm) as FormKey[];
  const errors = Object.fromEntries(allKeys.map(k => [k, fieldError(k)])) as Record<FormKey, string | null>;
  const hasBlockingErrors = REQUIRED_FIELDS.some(r => errors[r.key]) || !!errors.customerPhone || !!errors.fare;
  const showError = (key: FormKey) => touched[key] ? errors[key] : null;

  function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    setTouched(Object.fromEntries(allKeys.map(k => [k, true])) as Record<FormKey, boolean>);
    if (hasBlockingErrors) {
      setFormError("Please fix the highlighted fields before submitting the job.");
      return;
    }
    setFormError(null);
    setSubmitted(true);
  }

  if (submitted) {
    return <main className="page-wrap">
      <div className="max-w-lg mx-auto text-center card p-10">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 grid place-items-center mx-auto mb-5"><CheckCircle2 size={26}/></div>
        <h1 className="text-xl font-extrabold text-slate-900">Job submitted</h1>
        <p className="text-sm text-slate-500 mt-2">The job for <span className="font-semibold text-slate-700">{form.customerName}</span> has been recorded and added to your job history.</p>
        <div className="flex justify-center gap-3 mt-7">
          <button onClick={()=>{ setForm(initialForm); setTouched({}); setSubmitted(false); }} className="btn-secondary flex items-center gap-2"><Plus size={15}/> Add another job</button>
          <Link to="/driver/jobs" className="btn-primary">View my jobs</Link>
        </div>
      </div>
    </main>
  }

  const errorLabel = (key: FormKey) => showError(key) && (
    <div className="field-error-text"><AlertCircle size={12}/> {showError(key)}</div>
  );
  const inputCls = (key: FormKey) => `input ${showError(key) ? "input-error" : ""}`;

  return <main className="page-wrap">
    <PageTitle title="Add New Job" description="Submit the details of a completed or active towing job. Fields marked * are required."/>

    {formError && <div className="mb-5 max-w-5xl flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3"><AlertCircle size={15} className="mt-0.5 shrink-0"/><span>{formError}</span></div>}

    <form onSubmit={handleSubmit} className="space-y-5 max-w-5xl" noValidate>

      <section className="card p-5">
        <h2 className="font-bold mb-5">Customer information</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label">Customer name<span className="req-star">*</span></label>
            <input className={inputCls("customerName")} placeholder="e.g. Ahmed Khan" value={form.customerName} onChange={set("customerName")} onBlur={markTouched("customerName")}/>
            {errorLabel("customerName")}
          </div>
          <div>
            <label className="label">Customer phone<span className="req-star">*</span></label>
            <input className={inputCls("customerPhone")} placeholder="+971 50 000 0000" value={form.customerPhone} onChange={set("customerPhone")} onBlur={markTouched("customerPhone")}/>
            {errorLabel("customerPhone")}
          </div>
        </div>
      </section>

      <section className="card p-5">
        <h2 className="font-bold mb-5">Vehicle information</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label">Make</label>
            <input className={inputCls("make")} placeholder="Toyota" value={form.make} onChange={set("make")} onBlur={markTouched("make")}/>
            {errorLabel("make")}
          </div>
          <div>
            <label className="label">Model</label>
            <input className={inputCls("model")} placeholder="Camry" value={form.model} onChange={set("model")} onBlur={markTouched("model")}/>
            {errorLabel("model")}
          </div>
          <div><label className="label">Plate number</label><input className="input" placeholder="Dubai A 12345" value={form.plate} onChange={set("plate")}/></div>
          <div><label className="label">Vehicle type</label><select className="input" value={form.vehicleType} onChange={set("vehicleType")}><option>Sedan</option><option>SUV</option><option>Van</option><option>Pickup</option><option>Truck</option><option>Motorcycle</option></select></div>
        </div>
      </section>

      <section className="card p-5">
        <h2 className="font-bold mb-5">Problem</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div><label className="label">Issue / reason</label><select className="input" value={form.issue} onChange={set("issue")}>{ISSUES.map(i=><option key={i}>{i}</option>)}</select></div>
          <div className="sm:col-span-2"><label className="label">Problem description</label><textarea className="input min-h-24" placeholder="Describe what happened..." value={form.description} onChange={set("description")}/></div>
        </div>
      </section>

      <section className="card p-5">
        <h2 className="font-bold mb-5">Journey</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label">Pickup location<span className="req-star">*</span></label>
            <input className={inputCls("pickup")} placeholder="Al Barsha, Dubai" value={form.pickup} onChange={set("pickup")} onBlur={markTouched("pickup")}/>
            {errorLabel("pickup")}
          </div>
          <div>
            <label className="label">Drop-off location</label>
            <input className={inputCls("dropoff")} placeholder="Al Quoz, Dubai" value={form.dropoff} onChange={set("dropoff")} onBlur={markTouched("dropoff")}/>
            {errorLabel("dropoff")}
          </div>
          <div><label className="label">Pickup time</label><input type="time" className="input" value={form.pickupTime} onChange={set("pickupTime")}/></div>
          <div><label className="label">Completion time</label><input type="time" className="input" value={form.completionTime} onChange={set("completionTime")}/></div>
        </div>
      </section>

      <section className="card p-5">
        <h2 className="font-bold mb-5">Job & payment</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div><label className="label">Towing type</label><select className="input" value={form.towingType} onChange={set("towingType")}>{TOWING_TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
          <div><label className="label">Truck used</label><input className="input" value={form.truckUsed} onChange={set("truckUsed")}/></div>
          <div>
            <label className="label">Fare (AED)</label>
            <input inputMode="decimal" className={inputCls("fare")} placeholder="300" value={form.fare} onChange={set("fare")} onBlur={markTouched("fare")}/>
            {errorLabel("fare")}
          </div>
          <div><label className="label">Payment method</label><select className="input" value={form.paymentMethod} onChange={set("paymentMethod")}>{PAYMENT_METHODS.map(p=><option key={p}>{p}</option>)}</select></div>
          <div><label className="label">Payment status</label><select className="input" value={form.paymentStatus} onChange={set("paymentStatus")}>{PAYMENT_STATUSES.map(p=><option key={p}>{p}</option>)}</select></div>
          <div><label className="label">Job status</label><select className="input" value={form.jobStatus} onChange={set("jobStatus")}>{JOB_STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </section>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={()=>{setForm(initialForm); setTouched({}); setFormError(null);}} className="btn-secondary">Reset</button>
        <button type="submit" className="btn-primary">Submit job</button>
      </div>
    </form>
  </main>
}
