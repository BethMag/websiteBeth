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
            ? 'inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#047857] px-4 py-2 text-sm font-semibold text-white hover:bg-[#064E3B] transition-colors whitespace-nowrap shrink-0'
            : 'inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-[#064E3B] bg-white px-4 py-2 text-xs font-semibold text-[#064E3B] hover:bg-[#EDF7F2] transition-colors whitespace-nowrap shrink-0'
        }
      >
        <Download className="h-4 w-4" aria-hidden="true" />
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
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-[#064E3B] bg-white px-4 py-2 text-xs font-semibold text-[#064E3B] hover:bg-[#EDF7F2] transition-colors whitespace-nowrap shrink-0"
        >
          <Smartphone className="h-4 w-4" aria-hidden="true" />
          Install on iOS
        </button>

        {showGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F17]/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="w-full max-w-sm rounded-xl border-2 border-[#064E3B] bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <h3 id="ios-install-title" className="text-lg font-bold text-[#0B1F17]">
                  Install CommonGround App
                </h3>
                <button
                  type="button"
                  onClick={() => setShowGuide(false)}
                  aria-label="Close installation instructions"
                  className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-md text-[#1E3A2F] hover:bg-[#EDF7F2] hover:text-[#0B1F17]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ol className="mt-3 space-y-2 text-sm text-[#1E3A2F] leading-relaxed">
                <li>1. Tap the Share button in the Safari toolbar.</li>
                <li>2. Scroll down and select Add to Home Screen.</li>
                <li>3. Tap Add to launch the DiSC Team App full screen, even offline.</li>
              </ol>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="mt-5 min-h-[44px] w-full rounded-lg bg-[#047857] py-2.5 text-sm font-semibold text-white hover:bg-[#064E3B] transition-colors"
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
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-[#064E3B] bg-white px-4 py-2 text-xs font-semibold text-[#064E3B] hover:bg-[#EDF7F2] transition-colors whitespace-nowrap shrink-0"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Get Desktop / Mobile App
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F17]/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-title"
        >
          <div className="w-full max-w-sm rounded-xl border-2 border-[#064E3B] bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <h3 id="pwa-install-title" className="text-lg font-bold text-[#0B1F17]">
                Install CommonGround App
              </h3>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Close installation guide"
                className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-md text-[#1E3A2F] hover:bg-[#EDF7F2] hover:text-[#0B1F17]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-3 text-sm text-[#1E3A2F] leading-relaxed">
              This site is an installable Progressive Web App. Use your browser&apos;s install icon in the address bar (Chrome or Edge) or &ldquo;Add to Home Screen&rdquo; on mobile to run the DiSC® Team App standalone and offline.
            </p>
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-5 min-h-[44px] w-full rounded-lg bg-[#047857] py-2.5 text-sm font-semibold text-white hover:bg-[#064E3B] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
