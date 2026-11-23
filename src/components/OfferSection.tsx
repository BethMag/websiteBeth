import React, { useState } from 'react';
import { ArrowUpRight, Check, Layers } from 'lucide-react';
import { INCLUDED_EVERY_TIME, MEDIA, SERVICE_OFFERS } from '../data/siteContent';

interface OfferSectionProps {
  onSelectOffer: (offerTitle: string) => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ onSelectOffer }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="offer" className="border-b border-[#DCE5DF] bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#1B6B50]">What We Offer</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#14241E] text-balance sm:text-4xl">
              Clear programs. Concrete deliverables. No fluff.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#4B5E55] sm:text-base">
            Whether you are bringing a new team together or helping an established group communicate better, you always know exactly what is included before you book.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {SERVICE_OFFERS.map((offer, idx) => {
            const isPrimary = idx === 0;
            return (
              <article
                key={offer.id}
                className={`flex flex-col justify-between rounded-xl border border-[#DCE5DF] p-7 sm:p-8 ${
                  isPrimary
                    ? 'bg-[#F8FAF8] lg:col-span-7'
                    : 'bg-white lg:col-span-5'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#4B5E55]">
                    <span className="font-mono font-medium text-[#1B6B50] tabular-nums">
                      {offer.number}
                    </span>
                    <div className="flex items-center gap-2 tabular-nums">
                      <span>{offer.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span>{offer.groupSize}</span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-[#14241E] sm:text-2xl">
                    {offer.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-[#1B6B50]">{offer.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#4B5E55] sm:text-base">
                    {offer.summary}
                  </p>

                  <div className="mt-6 border-t border-[#DCE5DF] pt-5">
                    <p className="text-xs font-medium text-[#14241E]">What you walk away with:</p>
                    <ul className="mt-3 space-y-2.5">
                      {offer.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#4B5E55]">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#1B6B50]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectOffer(offer.title)}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B50] ${
                      isPrimary
                        ? 'bg-[#1B6B50] text-white hover:bg-[#14533E]'
                        : 'border border-[#DCE5DF] bg-white text-[#14241E] hover:bg-[#EFF4F0]'
                    }`}
                  >
                    <span>Enquire About This Session</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}

          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#DCE5DF] bg-[#EFF4F0] lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
              <div className="p-7 sm:col-span-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[#1B6B50]">Every Engagement</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[#14241E]">
                    Included in every workshop
                  </h3>
                  <div className="mt-5 space-y-4">
                    {INCLUDED_EVERY_TIME.map((item) => (
                      <div key={item.title}>
                        <p className="text-sm font-semibold text-[#14241E]">{item.title}</p>
                        <p className="mt-0.5 text-sm text-[#4B5E55] leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-5 min-h-[220px] bg-[#DCE5DF]">
                {!imgError ? (
                  <img
                    src={MEDIA.workshopMaterials}
                    alt="Printed team development workbooks and calm eucalyptus stationery on an oak table"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                    <Layers className="h-8 w-8 text-[#1B6B50]" aria-hidden="true" />
                    <span className="text-xs font-medium text-[#14241E]">
                      Printed &amp; Digital Playbooks
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
