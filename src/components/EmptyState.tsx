import type { LucideIcon } from "lucide-react";

export default function EmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 grid place-items-center text-slate-300 mb-4"><Icon size={24} /></div>
      <div className="text-sm font-bold text-slate-700">{title}</div>
      <div className="text-xs text-slate-400 mt-1.5 max-w-xs">{description}</div>
    </div>
  );
}
