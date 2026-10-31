import type { ReactNode } from "react";

const tones = {
  accent: "bg-accent-soft text-accent",
  neutral: "bg-slate-100 text-slate-700",
  dark: "bg-slate-900 text-white",
};

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: keyof typeof tones }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
