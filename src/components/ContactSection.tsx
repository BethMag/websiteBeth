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
  const [error, setError] = useState('');
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

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid work email address.');
      return;
    }

    setError('');
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
    <section id="contact" className="border-b border-[#DCE5DF] bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-[#1B6B50]">
              Book a Discovery Call
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#14241E] text-balance sm:text-4xl">
              Tell us about your team and we’ll propose a clear plan.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4B5E55]">
              Every engagement starts with a straightforward 20-minute conversation—no hard sell. We’ll talk through your team’s size, current dynamics, and whether a half-day, full-day, or multi-step program fits best.
            </p>

            <div className="mt-8 space-y-4 border-t border-[#DCE5DF] pt-6 text-sm">
              <div>
                <p className="text-xs text-[#4B5E55]">Direct Email</p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="mt-1 inline-flex items-center gap-2 font-medium text-[#14241E] hover:text-[#1B6B50]"
                >
                  <Mail className="h-4 w-4 text-[#1B6B50]" aria-hidden="true" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </div>
              <div>
                <p className="text-xs text-[#4B5E55]">Typical Response Time</p>
                <p className="mt-1 font-medium text-[#14241E]">Within 1 business day</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#DCE5DF] bg-[#F8FAF8] p-6 sm:p-8">
              {submitted ? (
                <div className="space-y-5" role="status">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#1B6B50]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#14241E]">
                        Discovery request ready
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#4B5E55]">
                        Thank you, {name}. Your workshop brief has been prepared for {program}. Open your email client to send it directly or copy the brief below.
                      </p>
                    </div>
                  </div>

                  <pre className="overflow-x-auto rounded-lg border border-[#DCE5DF] bg-white p-4 font-mono text-xs leading-relaxed text-[#14241E]">
                    {summaryBlock}
                  </pre>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
                        `Team DiSC Workshop Inquiry — ${name}`
                      )}&body=${encodeURIComponent(summaryBlock)}`}
                      className="inline-flex items-center justify-center rounded-lg bg-[#1B6B50] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#14533E] transition-colors"
                    >
                      Send via Email App
                    </a>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5DF] bg-white px-4 py-2.5 text-sm font-medium text-[#14241E] hover:bg-[#EFF4F0] transition-colors"
                    >
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>{copied ? 'Copied Brief' : 'Copy Brief'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-sm font-medium text-[#4B5E55] hover:text-[#14241E] px-2 py-2"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {error && (
                    <div
                      role="alert"
                      className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                    >
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-[#14241E]">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="mt-1.5 w-full rounded-lg border border-[#DCE5DF] bg-white px-3.5 py-2.5 text-sm text-[#14241E] placeholder:text-[#4B5E55]/50 focus:border-[#1B6B50] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-[#14241E]">
                        Work Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="mt-1.5 w-full rounded-lg border border-[#DCE5DF] bg-white px-3.5 py-2.5 text-sm text-[#14241E] placeholder:text-[#4B5E55]/50 focus:border-[#1B6B50] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-program" className="block text-xs font-medium text-[#14241E]">
                        Workshop or Program
                      </label>
                      <input
                        id="contact-program"
                        type="text"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#DCE5DF] bg-white px-3.5 py-2.5 text-sm text-[#14241E] focus:border-[#1B6B50] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-size" className="block text-xs font-medium text-[#14241E]">
                        Team Size
                      </label>
                      <input
                        id="contact-size"
                        type="number"
                        min={2}
                        max={200}
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#DCE5DF] bg-white px-3.5 py-2.5 font-mono text-sm text-[#14241E] tabular-nums focus:border-[#1B6B50] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-notes" className="block text-xs font-medium text-[#14241E]">
                      What’s happening in your team right now? (Optional)
                    </label>
                    <textarea
                      id="contact-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g., Recently merged two squads, preparing for a quarterly offsite in March."
                      className="mt-1.5 w-full rounded-lg border border-[#DCE5DF] bg-white px-3.5 py-2.5 text-sm text-[#14241E] placeholder:text-[#4B5E55]/50 focus:border-[#1B6B50] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[#1B6B50] px-6 py-3 text-sm font-medium text-white hover:bg-[#14533E] transition-colors sm:w-auto"
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
