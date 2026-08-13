import { ArrowLeft, Banknote, CarFront, MapPinned, User, Wrench } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { drivers, jobs, trucks } from "../../data/mockData";
import { jobStatusClass } from "../../lib/badges";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-sm font-semibold text-slate-800 mt-1 break-words">{value}</div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-5"><Icon size={18} className="text-orange-500" /><h2 className="font-bold text-slate-900">{title}</h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">{children}</div>
    </section>
  );
}

export default function JobDetails() {
  const { id } = useParams();
  const location = useLocation();
  const isDriver = location.pathname.startsWith("/driver");
  const job = jobs.find(j => j.id === id);
  const backTo = isDriver ? "/driver/jobs" : "/admin/jobs";

  if (!job) {
    return (
      <main className="page-wrap">
        <Link to={backTo} className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-5"><ArrowLeft size={15} /> Back</Link>
        <div className="card p-10 text-center text-sm text-slate-500">Job not found.</div>
      </main>
    );
  }

  const driver = drivers.find(d => d.id === job.driverId);
  const truck = trucks.find(t => t.id === job.truckId);

  return (
    <main className="page-wrap">
      <Link to={backTo} className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-5"><ArrowLeft size={15} /> Back to {isDriver ? "my jobs" : "jobs"}</Link>

      <div className="card p-5 sm:p-6 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-slate-900">{job.id}</h1>
              <span className={`badge ${jobStatusClass(job.status)}`}>{job.status}</span>
            </div>
            <div className="text-sm text-slate-400 mt-1">{job.date} • {job.startTime}{job.endTime !== "—" ? ` – ${job.endTime}` : ""}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-400 uppercase tracking-wide font-semibold">Fare</div>
            <div className="text-2xl font-extrabold text-slate-900">{job.fare ? `AED ${job.fare.toLocaleString()}` : "—"}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Section icon={User} title="Customer">
          <Field label="Customer Name" value={job.customer} />
          <Field label="Customer Phone" value={job.phone} />
        </Section>

        <Section icon={CarFront} title="Vehicle">
          <Field label="Make" value={job.vehicleMake} />
          <Field label="Model" value={job.vehicleModel} />
          <Field label="Plate Number" value={job.plate} />
          <Field label="Vehicle Type" value={job.vehicleType} />
        </Section>

        <Section icon={Wrench} title="Problem">
          <div className="sm:col-span-2 lg:col-span-3"><Field label="Issue / Reason" value={job.issue} /></div>
          <div className="sm:col-span-2 lg:col-span-3"><Field label="Problem Description" value={job.description} /></div>
        </Section>

        <Section icon={MapPinned} title="Journey">
          <Field label="Pickup Location" value={job.pickup} />
          <Field label="Drop-off Location" value={job.dropoff} />
          <Field label="Pickup Time" value={job.startTime} />
          <Field label="Completion Time" value={job.endTime} />
        </Section>

        <Section icon={CarFront} title="Job">
          <Field label="Driver" value={driver ? driver.name : job.driverId} />
          <Field label="Truck Used" value={truck ? `${truck.id} • ${truck.type}` : job.truckId} />
          <Field label="Towing Type" value={job.towingType} />
          <Field label="Job Status" value={job.status} />
        </Section>

        <Section icon={Banknote} title="Payment">
          <Field label="Fare" value={job.fare ? `AED ${job.fare.toLocaleString()}` : "AED 0"} />
          <Field label="Payment Method" value={job.paymentMethod} />
          <Field label="Payment Status" value={job.paymentStatus} />
        </Section>
      </div>
    </main>
  );
}
