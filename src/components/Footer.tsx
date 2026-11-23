import React from 'react';
import { SITE_CONFIG } from '../data/siteContent';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8FAF8] py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-base font-bold text-[#14241E]">
            {SITE_CONFIG.brandName}
          </p>
          <p className="mt-1 text-xs text-[#4B5E55]">
            {SITE_CONFIG.practiceTagline} · {SITE_CONFIG.locationNote}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-[#4B5E55]">
          <a href="#offer" className="hover:text-[#14241E] transition-colors">
            The Offer
          </a>
          <a href="#disc-app" className="hover:text-[#14241E] transition-colors">
            DiSC® App
          </a>
          <a href="#outcomes" className="hover:text-[#14241E] transition-colors">
            Outcomes
          </a>
          <a href="#contact" className="hover:text-[#14241E] transition-colors">
            Book a Call
          </a>
          <span>© {SITE_CONFIG.copyrightYear} {SITE_CONFIG.brandName}</span>
        </div>
      </div>
    </footer>
  );
};
