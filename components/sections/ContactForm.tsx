'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { primaryButton } from '@/components/manga/buttons';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const label = 'mb-1.5 block font-mono text-xs font-bold tracking-[.15em]';
const field =
  'box-border w-full border-[3px] border-line bg-sheet px-3 py-2.5 font-body text-base text-fg placeholder:text-fg/45 focus-visible:outline-accent';

const MESSAGES: Record<Exclude<Status, 'idle' | 'sending'>, string> = {
  sent: 'Message received. I’ll get back to you soon.',
  error: 'That didn’t go through. Try again, or find me on LinkedIn.',
};

/**
 * Contact form posting to Formspree (no extra dependency: plain fetch + FormData).
 * `submitLabel` comes from the server so it can carry Day/Night edition copy.
 */
export function ContactForm({ formId, submitLabel }: { formId: string; submitLabel: ReactNode }) {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const note = status === 'sent' || status === 'error' ? MESSAGES[status] : '';

  return (
    <form onSubmit={onSubmit} className="grid gap-3.5 sm:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className={label}>
          NAME
        </label>
        <input id="cf-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>
          EMAIL
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={field}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={label}>
          MESSAGE
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="The mission, the deadline, the stakes…"
          className={`${field} resize-y`}
        />
      </div>
      {/* Honeypot: bots fill it, people never see it; Formspree drops those submissions. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`${primaryButton} cursor-pointer disabled:cursor-wait disabled:opacity-60`}
        >
          {status === 'sending' ? 'SENDING…' : submitLabel}
        </button>
        <p
          role="status"
          className={
            note ? 'm-0 border-[3px] border-line bg-letter-bg px-3 py-2 font-mono text-sm font-bold text-letter-fg' : 'sr-only'
          }
        >
          {note}
        </p>
      </div>
    </form>
  );
}
