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
    <header className="sticky top-0 z-40 border-b border-[#DCE5DF] bg-[#F8FAF8]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-[#14241E] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B6B50]"
        >
          {SITE_CONFIG.brandName}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4B5E55]"
        >
          <a
            href="#offer"
            className="hover:text-[#14241E] hover:underline underline-offset-4 decoration-[#1B6B50]/60 transition-colors whitespace-nowrap shrink-0"
          >
            The Offer
          </a>
          <a
            href="#disc-app"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('disc-app');
            }}
            className="hover:text-[#14241E] hover:underline underline-offset-4 decoration-[#1B6B50]/60 transition-colors whitespace-nowrap shrink-0"
          >
            DiSC® App
          </a>
          <a
            href="#outcomes"
            className="hover:text-[#14241E] hover:underline underline-offset-4 decoration-[#1B6B50]/60 transition-colors whitespace-nowrap shrink-0"
          >
            Outcomes
          </a>
          <a
            href="#about"
            className="hover:text-[#14241E] hover:underline underline-offset-4 decoration-[#1B6B50]/60 transition-colors whitespace-nowrap shrink-0"
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
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#1B6B50] px-4 py-2 text-sm font-medium text-white hover:bg-[#14533E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B50]"
          >
            Book a Call
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-[#DCE5DF] bg-white p-2 text-[#14241E] hover:bg-[#EFF4F0] transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#DCE5DF] bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-[#14241E]">
            <a
              href="#offer"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#1B6B50]"
            >
              The Offer
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('disc-app')}
              className="py-2 text-left hover:text-[#1B6B50]"
            >
              DiSC® App
            </button>
            <a
              href="#outcomes"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#1B6B50]"
            >
              Outcomes
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#1B6B50]"
            >
              About
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookClick();
              }}
              className="mt-2 w-full rounded-lg bg-[#1B6B50] px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-[#14533E]"
            >
              Book a Call
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
