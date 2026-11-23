import React from 'react';
import { Contrast, Type } from 'lucide-react';

interface AccessibilityBarProps {
  largeText: boolean;
  onToggleLargeText: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  largeText,
  onToggleLargeText,
  highContrast,
  onToggleHighContrast,
}) => {
  return (
    <aside
      aria-label="Reading and visual accessibility controls"
      className="border-b border-[#8CAEA0]/50 bg-[#EDF7F2] px-6 py-2.5"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium text-[#1E3A2F]">
          Display preferences for comfortable reading
        </p>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            aria-pressed={largeText}
            onClick={onToggleLargeText}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              largeText
                ? 'border-[#064E3B] bg-[#064E3B] text-white'
                : 'border-[#8CAEA0] bg-white text-[#0B1F17] hover:bg-[#D1FAE5]/60'
            }`}
          >
            <Type className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{largeText ? 'Large Text: On' : 'Large Text'}</span>
          </button>

          <button
            type="button"
            aria-pressed={highContrast}
            onClick={onToggleHighContrast}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              highContrast
                ? 'border-[#0B1F17] bg-[#0B1F17] text-[#FBBF24]'
                : 'border-[#8CAEA0] bg-white text-[#0B1F17] hover:bg-[#D1FAE5]/60'
            }`}
          >
            <Contrast className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{highContrast ? 'Extra Contrast: On' : 'Extra Contrast'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
