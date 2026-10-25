import type { ComponentProps, ReactNode } from "react";

const control =
  "block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-violet-200 aria-invalid:border-red-600";

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

/** Libellé + champ + aide + erreur, reliés par id / aria-describedby. */
export function FieldShell({ id, label, required, hint, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label}
        {required ? (
          <span className="text-red-700" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-slate-600"> (facultatif)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-aide`} className="mt-1.5 text-sm text-slate-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-erreur`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, { hint, error }: { hint?: string; error?: string }) {
  if (error) return `${id}-erreur`;
  if (hint) return `${id}-aide`;
  return undefined;
}

type BaseProps = { id: string; label: string; hint?: string; error?: string; required?: boolean };

export function TextField({ id, label, hint, error, required, ...props }: BaseProps & ComponentProps<"input">) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={control}
        {...props}
      />
    </FieldShell>
  );
}

export function TextAreaField({ id, label, hint, error, required, ...props }: BaseProps & ComponentProps<"textarea">) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={`${control} min-h-36 resize-y`}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  children,
  ...props
}: BaseProps & ComponentProps<"select">) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        className={control}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
