import type { ComponentProps } from "react";

export function Card({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 ${className}`} {...props} />;
}
