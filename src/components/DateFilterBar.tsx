import { Search } from "lucide-react";
import type { DatePreset } from "../lib/dateRange";

const PRESETS: DatePreset[] = ["Today", "Last 7 Days", "Last 15 Days", "Last 30 Days", "This Month", "Custom"];

export default function DateFilterBar({
  preset, onPreset, customFrom, customTo, onCustomFrom, onCustomTo, search, onSearch, searchPlaceholder = "Search...",
}: {
  preset: DatePreset; onPreset: (p: DatePreset) => void;
  customFrom: string; customTo: string; onCustomFrom: (v: string) => void; onCustomTo: (v: string) => void;
  search: string; onSearch: (v: string) => void; searchPlaceholder?: string;
}) {
  return (
    <div className="p-4 border-b border-slate-100 flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map(p => (
            <button key={p} onClick={() => onPreset(p)} className={`text-xs font-bold px-3 py-2 rounded-lg border transition ${preset === p ? "bg-[#101826] text-white border-[#101826]" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{p}</button>
          ))}
        </div>
        <div className="relative w-full lg:w-72">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input value={search} onChange={e => onSearch(e.target.value)} className="input pl-9" placeholder={searchPlaceholder} />
        </div>
      </div>
      {preset === "Custom" && (
        <div className="flex flex-wrap items-center gap-2">
          <div><label className="label mb-1">From</label><input type="date" value={customFrom} onChange={e => onCustomFrom(e.target.value)} className="input" /></div>
          <div><label className="label mb-1">To</label><input type="date" value={customTo} onChange={e => onCustomTo(e.target.value)} className="input" /></div>
        </div>
      )}
    </div>
  );
}
