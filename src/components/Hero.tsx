import React, { useState } from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { MEDIA, QUICK_FACTS, SITE_CONFIG } from '../data/siteContent';

interface HeroProps {
  onBookClick: () => void;
  onExploreAppClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreAppClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="border-b border-[#DCE5DF] bg-[#F8FAF8]">
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-14 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#1B6B50]">
                {SITE_CONFIG.practiceTagline}
              </p>

              <h1
                className="mt-4 font-display font-semibold tracking-tight text-[#14241E] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.4rem)', lineHeight: 1.12 }}
              >
                Practical team development built around how people actually work.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4B5E55] sm:text-lg">
                Using the Everything DiSC® assessment, we help real teams understand each other’s communication styles, reduce day-to-day friction, and build habits that hold up under pressure.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center rounded-lg bg-[#1B6B50] px-6 py-3 text-sm font-medium text-white hover:bg-[#14533E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B50]"
              >
                Book a Discovery Call
              </button>

              <button
                type="button"
                onClick={onExploreAppClick}
                className="inline-flex items-center gap-2 py-2 text-sm font-medium text-[#14241E] hover:text-[#1B6B50] transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B50]"
              >
                <span>Open the DiSC® Team App</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] overflow-hidden rounded-xl border border-[#DCE5DF] bg-[#EFF4F0]">
              {!imgError ? (
                <img
                  src={MEDIA.heroWorkshop}
                  alt="Four team members collaborating around an oak table with DiSC workshop cards in natural studio light"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover aspect-[16/10] lg:aspect-auto"
                />
              ) : (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EFF4F0] to-[#DCE5DF] p-8 text-center">
                  <Users className="h-10 w-10 text-[#1B6B50]" aria-hidden="true" />
                  <p className="font-display text-base font-medium text-[#14241E]">
                    Facilitated Everything DiSC® Team Workshops
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#DCE5DF] bg-[#DCE5DF] sm:grid-cols-4">
          {QUICK_FACTS.map((fact) => (
            <div key={fact.label} className="bg-white px-5 py-4">
              <p className="text-xs text-[#4B5E55]">{fact.label}</p>
              <p className="mt-1 font-display text-sm font-semibold text-[#14241E] tabular-nums sm:text-base">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
