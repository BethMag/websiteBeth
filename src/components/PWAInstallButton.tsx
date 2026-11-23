import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ variant?: 'primary' | 'subtle' }> = ({
  variant = 'subtle',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={
          variant === 'primary'
            ? 'inline-flex items-center gap-2 rounded-lg bg-[#1B6B50] px-4 py-2 text-sm font-medium text-white hover:bg-[#14533E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B50]'
            : 'inline-flex items-center gap-2 rounded-lg border border-[#DCE5DF] bg-white px-3.5 py-2 text-xs font-medium text-[#14241E] hover:bg-[#EFF4F0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B50]'
        }
      >
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        Install App
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowGuide(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5DF] bg-white px-3.5 py-2 text-xs font-medium text-[#14241E] hover:bg-[#EFF4F0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B50]"
        >
          <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
          Install on iOS
        </button>

        {showGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#14241E]/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="w-full max-w-sm rounded-xl border border-[#DCE5DF] bg-white p-6 shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <h3 id="ios-install-title" className="text-lg font-semibold text-[#14241E]">
                  Install CommonGround App
                </h3>
                <button
                  type="button"
                  onClick={() => setShowGuide(false)}
                  aria-label="Close installation instructions"
                  className="rounded-md p-1 text-[#4B5E55] hover:bg-[#EFF4F0] hover:text-[#14241E]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ol className="mt-3 space-y-2 text-sm text-[#4B5E55] leading-relaxed">
                <li>1. Tap the Share button in the Safari toolbar.</li>
                <li>2. Scroll down and select Add to Home Screen.</li>
                <li>3. Tap Add to launch the DiSC Team App full screen, even offline.</li>
              </ol>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="mt-5 w-full rounded-lg bg-[#1B6B50] py-2.5 text-sm font-medium text-white hover:bg-[#14533E] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowGuide(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5DF] bg-white px-3.5 py-2 text-xs font-medium text-[#14241E] hover:bg-[#EFF4F0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B50]"
      >
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        Get Desktop / Mobile App
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#14241E]/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-title"
        >
          <div className="w-full max-w-sm rounded-xl border border-[#DCE5DF] bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <h3 id="pwa-install-title" className="text-lg font-semibold text-[#14241E]">
                Install CommonGround App
              </h3>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Close installation guide"
                className="rounded-md p-1 text-[#4B5E55] hover:bg-[#EFF4F0] hover:text-[#14241E]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm text-[#4B5E55] leading-relaxed">
              This site is an installable Progressive Web App. Use your browser&apos;s install icon in the address bar (Chrome or Edge) or &ldquo;Add to Home Screen&rdquo; on mobile to run the DiSC® Team App standalone and offline.
            </p>
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full rounded-lg bg-[#1B6B50] py-2.5 text-sm font-medium text-white hover:bg-[#14533E] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
