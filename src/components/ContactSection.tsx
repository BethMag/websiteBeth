import React, { useEffect, useState } from 'react';
import { CheckCircle2, Copy, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteContent';

interface ContactSectionProps {
  prefilledScope: string;
  prefilledTeamSize: number | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledScope,
  prefilledTeamSize,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teamSize, setTeamSize] = useState(prefilledTeamSize ? String(prefilledTeamSize) : '12');
  const [program, setProgram] = useState(
    prefilledScope || 'Everything DiSC® Team Workshop'
  );
  const [notes, setNotes] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefilledScope) {
      setProgram(prefilledScope);
      setSubmitted(false);
    }
    if (prefilledTeamSize) {
      setTeamSize(String(prefilledTeamSize));
    }
  }, [prefilledScope, prefilledTeamSize]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nextErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      nextErrors.name = 'Please enter your full name.';
    }
    if (!emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid work email address.';
    }

    if (nextErrors.name || nextErrors.email) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setSubmitted(true);
  };

  const summaryBlock = `Name: ${name}\nEmail: ${email}\nTeam Size: ${teamSize}\nProgram / Scope: ${program}\nNotes: ${notes || 'None'}`;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryBlock);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="border-b-2 border-[#064E3B]/15 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="text-sm font-bold tracking-wide text-[#047857]">
              Book a Discovery Call
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0B1F17] text-balance sm:text-4xl">
              Tell us about your team and we’ll propose a clear plan.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#1E3A2F]">
              Every engagement starts with a straightforward 20-minute conversation—no hard sell. We’ll talk through your team’s size, current dynamics, and whether a half-day, full-day, or multi-step program fits best.
            </p>

            <div className="mt-8 space-y-4 border-t-2 border-[#8CAEA0] pt-6 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#047857]">
                  Direct Email
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="mt-1 inline-flex min-h-[40px] items-center gap-2 font-bold text-[#0B1F17] hover:text-[#047857] underline underline-offset-4"
                >
                  <Mail className="h-4 w-4 text-[#047857]" aria-hidden="true" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#047857]">
                  Typical Response Time
                </p>
                <p className="mt-1 font-bold text-[#0B1F17]">Within 1 business day</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border-2 border-[#064E3B]/30 bg-[#EDF7F2]/50 p-6 sm:p-8">
              {submitted ? (
                <div className="space-y-5" role="status" aria-live="polite">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#047857]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#0B1F17]">
                        Discovery request ready
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#1E3A2F]">
                        Thank you, {name}. Your workshop brief has been prepared for {program}. Open your email client to send it directly or copy the brief below.
                      </p>
                    </div>
                  </div>

                  <pre className="overflow-x-auto rounded-lg border-2 border-[#8CAEA0] bg-white p-4 font-mono text-xs leading-relaxed text-[#0B1F17]">
                    {summaryBlock}
                  </pre>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
                        `Team DiSC Workshop Inquiry — ${name}`
                      )}&body=${encodeURIComponent(summaryBlock)}`}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#047857] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#064E3B] transition-colors"
                    >
                      Send via Email App
                    </a>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-[#064E3B] bg-white px-4 py-2.5 text-sm font-bold text-[#064E3B] hover:bg-[#EDF7F2] transition-colors"
                    >
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>{copied ? 'Copied Brief' : 'Copy Brief'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="min-h-[44px] text-sm font-bold text-[#1E3A2F] hover:text-[#0B1F17] px-3 py-2 underline underline-offset-4"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {(fieldErrors.name || fieldErrors.email) && (
                    <div
                      role="alert"
                      className="rounded-lg border-2 border-[#B91C1C] bg-[#FEF2F2] px-4 py-3 text-sm font-semibold text-[#991B1B]"
                    >
                      Please check the highlighted fields below before submitting.
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-bold text-[#0B1F17]">
                        Your Name <span aria-hidden="true" className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: undefined }));
                        }}
                        placeholder="Alex Morgan"
                        className={`mt-1.5 min-h-[44px] w-full rounded-lg border-2 bg-white px-3.5 py-2.5 text-sm text-[#0B1F17] placeholder:text-[#1E3A2F]/55 focus:border-[#047857] focus:outline-none ${
                          fieldErrors.name ? 'border-[#B91C1C]' : 'border-[#8CAEA0]'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p id="contact-name-error" className="mt-1.5 text-xs font-semibold text-[#B91C1C]">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-bold text-[#0B1F17]">
                        Work Email <span aria-hidden="true" className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
                        }}
                        placeholder="alex@company.com"
                        className={`mt-1.5 min-h-[44px] w-full rounded-lg border-2 bg-white px-3.5 py-2.5 text-sm text-[#0B1F17] placeholder:text-[#1E3A2F]/55 focus:border-[#047857] focus:outline-none ${
                          fieldErrors.email ? 'border-[#B91C1C]' : 'border-[#8CAEA0]'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p id="contact-email-error" className="mt-1.5 text-xs font-semibold text-[#B91C1C]">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-program" className="block text-sm font-bold text-[#0B1F17]">
                        Workshop or Program
                      </label>
                      <input
                        id="contact-program"
                        type="text"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="mt-1.5 min-h-[44px] w-full rounded-lg border-2 border-[#8CAEA0] bg-white px-3.5 py-2.5 text-sm text-[#0B1F17] focus:border-[#047857] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-size" className="block text-sm font-bold text-[#0B1F17]">
                        Team Size
                      </label>
                      <input
                        id="contact-size"
                        type="number"
                        min={2}
                        max={200}
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="mt-1.5 min-h-[44px] w-full rounded-lg border-2 border-[#8CAEA0] bg-white px-3.5 py-2.5 font-mono text-sm font-semibold text-[#0B1F17] tabular-nums focus:border-[#047857] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-notes" className="block text-sm font-bold text-[#0B1F17]">
                      What’s happening in your team right now? (Optional)
                    </label>
                    <textarea
                      id="contact-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g., Recently merged two squads, preparing for a quarterly offsite in March."
                      className="mt-1.5 w-full rounded-lg border-2 border-[#8CAEA0] bg-white px-3.5 py-2.5 text-sm text-[#0B1F17] placeholder:text-[#1E3A2F]/55 focus:border-[#047857] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#047857] px-6 py-3 text-base font-bold text-white hover:bg-[#064E3B] transition-colors sm:w-auto"
                  >
                    Request Discovery Call
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
