import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange, totalItems, pageSize }: { page: number; totalPages: number; onChange: (p: number) => void; totalItems: number; pageSize: number }) {
  if (totalItems === 0) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-100">
      <div className="text-xs text-slate-400">Showing <span className="font-bold text-slate-600">{start}–{end}</span> of <span className="font-bold text-slate-600">{totalItems}</span></div>
      <div className="flex items-center gap-1.5">
        <button disabled={page === 1} onClick={() => onChange(page - 1)} className="w-8 h-8 rounded-lg border border-slate-200 grid place-items-center text-slate-500 disabled:opacity-40 hover:bg-slate-50"><ChevronLeft size={15} /></button>
        {Array.from({ length: totalPages }).slice(0, 6).map((_, i) => (
          <button key={i} onClick={() => onChange(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-bold grid place-items-center ${page === i + 1 ? "bg-[#101826] text-white" : "border border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{i + 1}</button>
        ))}
        <button disabled={page === totalPages} onClick={() => onChange(page + 1)} className="w-8 h-8 rounded-lg border border-slate-200 grid place-items-center text-slate-500 disabled:opacity-40 hover:bg-slate-50"><ChevronRight size={15} /></button>
      </div>
    </div>
  );
}
