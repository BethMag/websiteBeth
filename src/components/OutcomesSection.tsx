import React from 'react';
import { OUTCOMES, TESTIMONIALS } from '../data/siteContent';

export const OutcomesSection: React.FC = () => {
  return (
    <section id="outcomes" className="border-b border-[#DCE5DF] bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[#1B6B50]">Proven Outcomes</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#14241E] text-balance sm:text-4xl">
            What changes after a team sees how they work together.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#DCE5DF] bg-[#DCE5DF] md:grid-cols-3">
          {OUTCOMES.map((item) => (
            <div key={item.metric} className="bg-[#F8FAF8] p-7 sm:p-8">
              <p className="font-display text-3xl font-semibold tracking-tight text-[#1B6B50] tabular-nums sm:text-4xl">
                {item.metric}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5E55]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col justify-between rounded-xl border border-[#DCE5DF] bg-white p-7 sm:p-8"
            >
              <blockquote className="text-base leading-relaxed text-[#14241E]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-[#DCE5DF] pt-4 text-sm">
                <span className="font-semibold text-[#14241E]">{t.author}</span>
                <span className="mx-2 text-[#4B5E55]" aria-hidden="true">
                  ·
                </span>
                <span className="text-[#4B5E55]">
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
