export const TODAY = new Date("2026-08-13T12:00:00");

export type DatePreset = "Today" | "Last 7 Days" | "Last 15 Days" | "Last 30 Days" | "This Month" | "Custom";

export function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function presetRange(preset: DatePreset, customFrom?: string, customTo?: string): { from: string; to: string } {
  const to = isoDate(TODAY);
  if (preset === "Custom" && customFrom && customTo) return { from: customFrom, to: customTo };
  if (preset === "Today") return { from: to, to };
  if (preset === "This Month") {
    const first = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    return { from: isoDate(first), to };
  }
  const days = preset === "Last 7 Days" ? 6 : preset === "Last 15 Days" ? 14 : 29;
  const from = new Date(TODAY);
  from.setDate(from.getDate() - days);
  return { from: isoDate(from), to };
}
