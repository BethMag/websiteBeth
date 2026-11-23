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
    <section id="top" className="border-b-2 border-[#064E3B]/20 bg-[#064E3B] text-white">
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-14 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-sm font-semibold tracking-wide text-[#FBBF24]">
                {SITE_CONFIG.practiceTagline}
              </p>

              <h1
                className="mt-4 font-display font-bold tracking-tight text-white text-balance"
                style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.4rem)', lineHeight: 1.12 }}
              >
                Practical team development built around how people actually work.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#ECFDF5] sm:text-lg">
                Using the Everything DiSC® assessment, we help real teams understand each other’s communication styles, reduce day-to-day friction, and grow together with habits that hold up under pressure.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#FBBF24] px-6 py-3 text-base font-bold text-[#0B1F17] hover:bg-[#FDE047] transition-colors whitespace-nowrap shrink-0"
              >
                Book a Discovery Call
              </button>

              <button
                type="button"
                onClick={onExploreAppClick}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border-2 border-white/70 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#064E3B] transition-colors whitespace-nowrap shrink-0 group"
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
            <div className="h-full min-h-[280px] overflow-hidden rounded-xl border-2 border-[#34D399]/40 bg-[#047857]">
              {!imgError ? (
                <img
                  src={MEDIA.heroWorkshop}
                  alt="Four team members collaborating around an oak table with DiSC workshop cards in natural studio light"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover aspect-[16/10] lg:aspect-auto"
                />
              ) : (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 bg-[#047857] p-8 text-center">
                  <Users className="h-10 w-10 text-[#FBBF24]" aria-hidden="true" />
                  <p className="font-display text-base font-semibold text-white">
                    Facilitated Everything DiSC® Team Workshops
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border-2 border-[#34D399]/30 bg-[#047857] sm:grid-cols-4">
          {QUICK_FACTS.map((fact) => (
            <div key={fact.label} className="bg-white px-5 py-4">
              <p className="text-xs font-semibold text-[#1E3A2F]">{fact.label}</p>
              <p className="mt-1 font-display text-sm font-bold text-[#064E3B] tabular-nums sm:text-base">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
