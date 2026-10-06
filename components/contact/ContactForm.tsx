"use client";

import { useId, useState } from "react";
import { useLeadForm } from "@/lib/leads";
import { FormStatus } from "@/components/FormStatus";

export type Role = "Buyer" | "Seller" | "Both" | "Other";

const ROLES: Role[] = ["Buyer", "Seller", "Both", "Other"];

const PLACEHOLDER: Record<Role, string> = {
  Buyer: "e.g. Looking for a 4-bed in Irvine under $1.6M, hoping to move by spring.",
  Seller: "e.g. Thinking about selling our Tustin Ranch home next year. What would it list for?",
  Both: "e.g. Need to sell in Lake Forest and buy in Irvine, ideally back to back.",
  Other: "Tell us how we can help.",
};

/** Contact form with "I am a…" role segments that change the message placeholder. */
export function ContactForm({ initialRole = "Buyer", initialMessage }: { initialRole?: Role; initialMessage?: string }) {
  const id = useId();
  const [role, setRole] = useState<Role>(initialRole);
  const { onSubmit, sending, sent, error } = useLeadForm("contact", () => ({ role, topic: initialMessage ? "prefilled" : undefined }));

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Send a message"
      className="flex flex-col gap-3.5 rounded-[18px] border border-border shadow-soft"
      style={{ padding: "clamp(20px, 3vw, 32px)" }}
    >
      <FormStatus sent={sent} error={error} sentMessage="Thanks, your message is in. Butchi will reply within one business hour." />

      <div>
        <div id={`${id}-role-label`} className="mb-2 text-[12.5px] font-semibold text-slate">
          I am a…
        </div>
        <div role="group" aria-labelledby={`${id}-role-label`} className="seg grid-cols-4">
          {ROLES.map((r) => (
            <button key={r} type="button" onClick={() => setRole(r)} aria-pressed={role === r} className="seg-btn h-[46px] text-[13.5px]">
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-3">
        <label htmlFor={`${id}-name`} className="field">
          Full name
          <input id={`${id}-name`} name="name" type="text" required autoComplete="name" className="input" />
        </label>
        <label htmlFor={`${id}-phone`} className="field">
          Phone
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className="input" />
        </label>
      </div>
      <label htmlFor={`${id}-email`} className="field">
        Email
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className="input" />
      </label>
      <label htmlFor={`${id}-msg`} className="field">
        How can we help?
        <textarea id={`${id}-msg`} name="message" rows={5} placeholder={PLACEHOLDER[role]} defaultValue={initialMessage} className="textarea" />
      </label>
      <label className="flex items-start gap-2.5 text-[13px] font-medium leading-[1.5] text-slate-2">
        <input type="checkbox" name="marketBrief" value="yes" className="checkbox mt-0.5" />
        Send me the monthly Southern California market brief (optional)
      </label>
      <button type="submit" disabled={sending} className="btn-primary btn-54 rounded-[10px] text-[15px] font-extrabold disabled:opacity-70">
        {sending ? "Sending…" : "Send message"}
      </button>
      <div className="text-[11.5px] leading-[1.5] text-meta">
        By submitting you agree to be contacted by YALA Realty &amp; Associates. We never sell your information.
      </div>
    </form>
  );
}
