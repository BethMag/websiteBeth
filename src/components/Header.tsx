import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteContent';

interface HeaderProps {
  onBookClick: () => void;
  onAppClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick, onAppClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    if (id === 'disc-app') {
      onAppClick();
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#064E3B]/15 bg-white/95 backdrop-blur-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[#064E3B] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4">
        <a
          href="#top"
          className="font-display text-xl font-extrabold tracking-tight text-[#064E3B] whitespace-nowrap shrink-0"
        >
          {SITE_CONFIG.brandName}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#1E3A2F]"
        >
          <a
            href="#offer"
            className="py-1.5 hover:text-[#047857] hover:underline underline-offset-4 decoration-2 decoration-[#047857] transition-colors whitespace-nowrap shrink-0"
          >
            The Offer
          </a>
          <a
            href="#disc-app"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('disc-app');
            }}
            className="py-1.5 hover:text-[#047857] hover:underline underline-offset-4 decoration-2 decoration-[#047857] transition-colors whitespace-nowrap shrink-0"
          >
            DiSC® App
          </a>
          <a
            href="#outcomes"
            className="py-1.5 hover:text-[#047857] hover:underline underline-offset-4 decoration-2 decoration-[#047857] transition-colors whitespace-nowrap shrink-0"
          >
            Outcomes
          </a>
          <a
            href="#about"
            className="py-1.5 hover:text-[#047857] hover:underline underline-offset-4 decoration-2 decoration-[#047857] transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onBookClick();
            }}
            className="hidden sm:inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#047857] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#064E3B] transition-colors whitespace-nowrap shrink-0"
          >
            Book a Call
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border-2 border-[#064E3B]/30 bg-white p-2 text-[#0B1F17] hover:bg-[#EDF7F2] transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#8CAEA0] bg-white px-6 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2 text-base font-semibold text-[#0B1F17]">
            <a
              href="#offer"
              onClick={() => setMobileOpen(false)}
              className="min-h-[44px] flex items-center hover:text-[#047857]"
            >
              The Offer
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('disc-app')}
              className="min-h-[44px] flex items-center text-left hover:text-[#047857]"
            >
              DiSC® App
            </button>
            <a
              href="#outcomes"
              onClick={() => setMobileOpen(false)}
              className="min-h-[44px] flex items-center hover:text-[#047857]"
            >
              Outcomes
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="min-h-[44px] flex items-center hover:text-[#047857]"
            >
              About
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookClick();
              }}
              className="mt-2 min-h-[44px] w-full rounded-lg bg-[#047857] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#064E3B]"
            >
              Book a Call
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
