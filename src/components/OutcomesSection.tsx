import React from 'react';
import { OUTCOMES, TESTIMONIALS } from '../data/siteContent';

export const OutcomesSection: React.FC = () => {
  return (
    <section id="outcomes" className="border-b-2 border-[#064E3B]/15 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-wide text-[#047857]">Proven Outcomes</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0B1F17] text-balance sm:text-4xl">
            What changes after a team sees how they work together.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border-2 border-[#064E3B] bg-[#047857] md:grid-cols-3">
          {OUTCOMES.map((item) => (
            <div key={item.metric} className="bg-[#064E3B] p-7 sm:p-8 text-white">
              <p className="font-display text-3xl font-extrabold tracking-tight text-[#FBBF24] tabular-nums sm:text-4xl">
                {item.metric}
              </p>
              <p className="mt-2 text-base leading-relaxed text-[#ECFDF5]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col justify-between rounded-xl border-2 border-[#8CAEA0] bg-[#EDF7F2]/50 p-7 sm:p-8"
            >
              <blockquote className="text-base leading-relaxed text-[#0B1F17] sm:text-lg">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-[#8CAEA0] pt-4 text-sm">
                <span className="font-bold text-[#0B1F17]">{t.author}</span>
                <span className="mx-2 text-[#1E3A2F]" aria-hidden="true">
                  ·
                </span>
                <span className="font-medium text-[#1E3A2F]">
                  {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
