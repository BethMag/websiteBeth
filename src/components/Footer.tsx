import React from 'react';
import { SITE_CONFIG } from '../data/siteContent';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#064E3B] py-10 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-lg font-extrabold text-white">
            {SITE_CONFIG.brandName}
          </p>
          <p className="mt-1 text-xs font-medium text-[#D1FAE5]">
            {SITE_CONFIG.practiceTagline} · {SITE_CONFIG.locationNote}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#ECFDF5]">
          <a href="#offer" className="py-1 hover:text-[#FBBF24] transition-colors">
            The Offer
          </a>
          <a href="#disc-app" className="py-1 hover:text-[#FBBF24] transition-colors">
            DiSC® App
          </a>
          <a href="#outcomes" className="py-1 hover:text-[#FBBF24] transition-colors">
            Outcomes
          </a>
          <a href="#contact" className="py-1 hover:text-[#FBBF24] transition-colors">
            Book a Call
          </a>
          <span className="text-[#D1FAE5]">© {SITE_CONFIG.copyrightYear} {SITE_CONFIG.brandName}</span>
        </nav>
      </div>
    </footer>
  );
};
