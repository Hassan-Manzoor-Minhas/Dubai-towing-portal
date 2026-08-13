import { AlertCircle, CarFront, CheckCircle2, FileCheck2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { emailFieldError, phoneFieldError, requiredError, textFieldError } from "../../lib/validate";

const REQUIRED_DOCUMENTS = [
  "Emirates ID (copy)",
  "UAE Driving Licence (copy)",
  "Passport / visa copy",
  "Passport-size photograph",
  "No Objection Certificate (if applicable)",
];

const initialForm = {
  fullName: "", dob: "", nationality: "",
  mobile: "", email: "", address: "",
  emiratesId: "", emiratesExpiry: "",
  licenceNumber: "", licenceCategory: "Heavy Vehicle", licenceExpiry: "",
  preferredStart: "",
};

type FormKey = keyof typeof initialForm;

const REQUIRED_FIELDS: { key: FormKey; label: string }[] = [
  { key: "fullName", label: "Full name" },
  { key: "mobile", label: "Mobile number" },
  { key: "email", label: "Email" },
  { key: "emiratesId", label: "Emirates ID number" },
  { key: "licenceNumber", label: "Licence number" },
];

export default function Registration(){
  const [form, setForm] = useState(initialForm);
  const [docsConfirmed, setDocsConfirmed] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FormKey, boolean>>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const set = (key: FormKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));
  const markTouched = (key: FormKey) => () => setTouched(t => ({ ...t, [key]: true }));

  function fieldError(key: FormKey): string | null {
    const value = form[key];
    const required = REQUIRED_FIELDS.find(r => r.key === key);
    if (required) {
      const err = requiredError(value, required.label);
      if (err) return err;
    }
    switch (key) {
      case "fullName": return textFieldError(value, "Full name");
      case "nationality": return textFieldError(value, "Nationality");
      case "address": return textFieldError(value, "Address");
      case "mobile": return phoneFieldError(value);
      case "email": return emailFieldError(value);
      default: return null;
    }
  }

  const allKeys = Object.keys(initialForm) as FormKey[];
  const errors = Object.fromEntries(allKeys.map(k => [k, fieldError(k)])) as Record<FormKey, string | null>;
  const showError = (key: FormKey) => touched[key] ? errors[key] : null;
  const inputCls = (key: FormKey) => `input ${showError(key) ? "input-error" : ""}`;
  const errorLabel = (key: FormKey) => showError(key) && (
    <div className="field-error-text"><AlertCircle size={12}/> {showError(key)}</div>
  );

  const allDocsConfirmed = REQUIRED_DOCUMENTS.every(doc => docsConfirmed[doc]);
  const hasBlockingErrors = REQUIRED_FIELDS.some(r => errors[r.key]) || !!errors.mobile || !!errors.email;

  function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    setTouched(Object.fromEntries(allKeys.map(k => [k, true])) as Record<FormKey, boolean>);
    if (hasBlockingErrors) {
      setFormError("Please fix the highlighted fields before submitting your application.");
      return;
    }
    if (!allDocsConfirmed) {
      setFormError("Please confirm all required documents before submitting.");
      return;
    }
    setFormError(null);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <div className="flex items-center gap-3 px-6 sm:px-10 py-6 border-b border-slate-200 bg-white">
        <div className="brand-mark"><CarFront size={18} /></div>
        <div>
          <div className="font-extrabold tracking-tight text-slate-900">Dubai Towing</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-[.16em]">Driver Application</div>
        </div>
        <Link to="/" className="ml-auto text-xs font-bold text-slate-500 hover:text-slate-800">Back to portal</Link>
      </div>

      <main className="page-wrap">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="card p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 grid place-items-center mx-auto mb-5"><CheckCircle2 size={26}/></div>
              <h1 className="text-xl font-extrabold text-slate-900">Application submitted</h1>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">Thank you, {form.fullName.split(" ")[0] || "applicant"}. Your application has been received and is now awaiting Business Admin review. Once approved, your admin will give you a login email &amp; password for the driver portal.</p>
              <div className="mt-7 flex items-center justify-center gap-2 text-xs font-bold">
                <span className="badge badge-green">Submitted</span><span className="text-slate-300">→</span>
                <span className="badge badge-amber">Admin Review</span><span className="text-slate-300">→</span>
                <span className="badge badge-gray">Active Driver</span>
              </div>
              <Link to="/login?role=driver" className="btn-primary inline-block mt-8">Go to driver login</Link>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <h1 className="text-[26px] sm:text-[30px] font-extrabold tracking-tight text-slate-900">Driver Registration</h1>
                <p className="text-sm text-slate-500 mt-1">Submit your application to join Dubai Towing. A Business Admin will review your details before your account is activated. Fields marked * are required.</p>
              </div>

              {formError && <div className="mb-5 flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3"><AlertCircle size={15} className="mt-0.5 shrink-0"/><span>{formError}</span></div>}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <section className="card p-6">
                  <h2 className="font-bold mb-5">Personal information</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Full name<span className="req-star">*</span></label>
                      <input className={inputCls("fullName")} value={form.fullName} onChange={set("fullName")} onBlur={markTouched("fullName")}/>
                      {errorLabel("fullName")}
                    </div>
                    <div><label className="label">Date of birth</label><input type="date" className="input" value={form.dob} onChange={set("dob")}/></div>
                    <div>
                      <label className="label">Nationality</label>
                      <input className={inputCls("nationality")} value={form.nationality} onChange={set("nationality")} onBlur={markTouched("nationality")}/>
                      {errorLabel("nationality")}
                    </div>
                  </div>
                </section>

                <section className="card p-6">
                  <h2 className="font-bold mb-5">Contact information</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Mobile number<span className="req-star">*</span></label>
                      <input className={inputCls("mobile")} placeholder="+971 50 000 0000" value={form.mobile} onChange={set("mobile")} onBlur={markTouched("mobile")}/>
                      {errorLabel("mobile")}
                    </div>
                    <div>
                      <label className="label">Email<span className="req-star">*</span></label>
                      <input type="email" className={inputCls("email")} value={form.email} onChange={set("email")} onBlur={markTouched("email")}/>
                      {errorLabel("email")}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label">Residential address</label>
                      <input className={inputCls("address")} value={form.address} onChange={set("address")} onBlur={markTouched("address")}/>
                      {errorLabel("address")}
                    </div>
                  </div>
                </section>

                <section className="card p-6">
                  <h2 className="font-bold mb-5">Emirates ID information</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Emirates ID number<span className="req-star">*</span></label>
                      <input className={inputCls("emiratesId")} placeholder="784-XXXX-XXXXXXX-X" value={form.emiratesId} onChange={set("emiratesId")} onBlur={markTouched("emiratesId")}/>
                      {errorLabel("emiratesId")}
                    </div>
                    <div><label className="label">Emirates ID expiry</label><input type="date" className="input" value={form.emiratesExpiry} onChange={set("emiratesExpiry")}/></div>
                  </div>
                </section>

                <section className="card p-6">
                  <h2 className="font-bold mb-5">UAE driving licence information</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Licence number<span className="req-star">*</span></label>
                      <input className={inputCls("licenceNumber")} value={form.licenceNumber} onChange={set("licenceNumber")} onBlur={markTouched("licenceNumber")}/>
                      {errorLabel("licenceNumber")}
                    </div>
                    <div><label className="label">Licence category</label><select className="input" value={form.licenceCategory} onChange={set("licenceCategory")}><option>Heavy Vehicle</option><option>Light Vehicle</option><option>Motorcycle</option></select></div>
                    <div><label className="label">Licence expiry</label><input type="date" className="input" value={form.licenceExpiry} onChange={set("licenceExpiry")}/></div>
                  </div>
                </section>

                <section className="card p-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className="label">Preferred start date</label><input type="date" className="input" value={form.preferredStart} onChange={set("preferredStart")}/></div>
                  </div>
                </section>

                <section className="card p-6">
                  <div className="flex items-center gap-2 mb-2"><FileCheck2 size={17} className="text-orange-500"/><h2 className="font-bold">Required company documents<span className="req-star">*</span></h2></div>
                  <p className="text-xs text-slate-400 mb-4">Confirm you have the following documents ready. You'll be asked to provide these during in-person verification.</p>
                  <div className="space-y-3">
                    {REQUIRED_DOCUMENTS.map(doc=>(
                      <label key={doc} className="flex items-center gap-3 text-sm font-medium text-slate-700 cursor-pointer">
                        <input type="checkbox" checked={!!docsConfirmed[doc]} onChange={()=>setDocsConfirmed(d=>({...d,[doc]:!d[doc]}))} className="w-4 h-4 accent-orange-500"/>
                        {doc}
                      </label>
                    ))}
                  </div>
                </section>

                <button type="submit" className="btn-primary w-full">Submit application</button>
                <p className="text-[11px] text-center text-slate-400">Your application will be reviewed by a Business Admin before account activation.</p>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
