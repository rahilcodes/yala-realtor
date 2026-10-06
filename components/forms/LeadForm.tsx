"use client";

import { useId, type ReactNode } from "react";
import { useLeadForm } from "@/lib/leads";
import { FormStatus } from "@/components/FormStatus";

export type Field =
  | { kind: "text" | "email" | "tel"; name: string; label: string; required?: boolean; autoComplete?: string; placeholder?: string; full?: boolean }
  | { kind: "select"; name: string; label: string; options: string[]; full?: boolean }
  | { kind: "textarea"; name: string; label: string; placeholder?: string; rows?: number }
  | { kind: "checkbox"; name: string; label: string; defaultChecked?: boolean };

interface Props {
  source: string;
  ariaLabel: string;
  fields: Field[];
  submitLabel: string;
  sentMessage: string;
  /** Small print under the button (consent, disclaimers). */
  footnote?: ReactNode;
  className?: string;
}

/** Labeled, responsive lead form that POSTs to /api/leads with its source. */
export function LeadForm({ source, ariaLabel, fields, submitLabel, sentMessage, footnote, className = "" }: Props) {
  const id = useId();
  const { onSubmit, sending, sent, error } = useLeadForm(source);

  return (
    <form
      onSubmit={onSubmit}
      aria-label={ariaLabel}
      className={`grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3 rounded-[14px] bg-white p-[22px] text-navy ${className}`}
    >
      <div className="col-span-full empty:hidden">
        <FormStatus sent={sent} error={error} sentMessage={sentMessage} />
      </div>
      {!sent && (
        <>
          {fields.map((f) => {
            const fid = `${id}-${f.name}`;
            if (f.kind === "checkbox") {
              return (
                <label key={f.name} className="col-span-full flex items-start gap-2.5 text-[13.5px] font-medium leading-[1.5] text-slate">
                  <input type="checkbox" name={f.name} value="yes" defaultChecked={f.defaultChecked} className="checkbox mt-0.5" />
                  {f.label}
                </label>
              );
            }
            if (f.kind === "textarea") {
              return (
                <label key={f.name} htmlFor={fid} className="field col-span-full">
                  {f.label}
                  <textarea id={fid} name={f.name} rows={f.rows ?? 4} placeholder={f.placeholder} className="textarea" />
                </label>
              );
            }
            if (f.kind === "select") {
              return (
                <label key={f.name} htmlFor={fid} className={`field ${f.full ? "col-span-full" : ""}`}>
                  {f.label}
                  <select id={fid} name={f.name} className="select">
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
              );
            }
            return (
              <label key={f.name} htmlFor={fid} className={`field ${f.full ? "col-span-full" : ""}`}>
                <span>
                  {f.label}
                  {f.required && (
                    <span aria-hidden="true" className="text-error">
                      {" "}
                      *
                    </span>
                  )}
                </span>
                <input
                  id={fid}
                  name={f.name}
                  type={f.kind}
                  required={f.required}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  className="input"
                />
              </label>
            );
          })}
          <button type="submit" disabled={sending} className="btn-gold btn-54 col-span-full disabled:opacity-70">
            {sending ? "Sending…" : submitLabel}
          </button>
          {footnote && <div className="col-span-full text-[11.5px] leading-[1.55] text-meta">{footnote}</div>}
        </>
      )}
    </form>
  );
}
