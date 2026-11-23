import React, { useState } from 'react';
import { ArrowUpRight, Check, Layers } from 'lucide-react';
import { INCLUDED_EVERY_TIME, MEDIA, SERVICE_OFFERS } from '../data/siteContent';

interface OfferSectionProps {
  onSelectOffer: (offerTitle: string) => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ onSelectOffer }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="offer" className="border-b-2 border-[#064E3B]/15 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-wide text-[#047857]">What We Offer</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0B1F17] text-balance sm:text-4xl">
              Clear programs. Concrete deliverables. No fluff.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#1E3A2F]">
            Whether you are bringing a new team together or helping an established group communicate better, you always know exactly what is included before you book.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {SERVICE_OFFERS.map((offer, idx) => {
            const isPrimary = idx === 0;
            return (
              <article
                key={offer.id}
                className={`flex flex-col justify-between rounded-xl border-2 p-7 sm:p-8 ${
                  isPrimary
                    ? 'border-[#047857] bg-[#EDF7F2] lg:col-span-7'
                    : 'border-[#8CAEA0] bg-white lg:col-span-5'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#1E3A2F]">
                    <span className="font-mono font-bold text-[#047857] tabular-nums">
                      {offer.number}
                    </span>
                    <div className="flex items-center gap-2 font-medium tabular-nums">
                      <span>{offer.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span>{offer.groupSize}</span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[#0B1F17] sm:text-2xl">
                    {offer.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-[#047857]">{offer.subtitle}</p>
                  <p className="mt-4 text-base leading-relaxed text-[#1E3A2F]">
                    {offer.summary}
                  </p>

                  <div className="mt-6 border-t border-[#8CAEA0]/60 pt-5">
                    <p className="text-sm font-bold text-[#0B1F17]">What you walk away with:</p>
                    <ul className="mt-3 space-y-2.5">
                      {offer.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#0B1F17] sm:text-base">
                          <Check
                            className="mt-1 h-4 w-4 shrink-0 text-[#047857]"
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
                    className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isPrimary
                        ? 'bg-[#047857] text-white hover:bg-[#064E3B]'
                        : 'border-2 border-[#064E3B] bg-white text-[#064E3B] hover:bg-[#EDF7F2]'
                    }`}
                  >
                    <span>Enquire About This Session</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}

          <div className="flex flex-col justify-between overflow-hidden rounded-xl border-2 border-[#064E3B]/25 bg-[#FFFBEB] lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
              <div className="p-7 sm:col-span-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-[#9A3412]">Every Engagement</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[#0B1F17]">
                    Included in every workshop
                  </h3>
                  <div className="mt-5 space-y-4">
                    {INCLUDED_EVERY_TIME.map((item) => (
                      <div key={item.title}>
                        <p className="text-sm font-bold text-[#0B1F17]">{item.title}</p>
                        <p className="mt-0.5 text-sm text-[#1E3A2F] leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-5 min-h-[220px] bg-[#EDF7F2]">
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
                    <Layers className="h-8 w-8 text-[#047857]" aria-hidden="true" />
                    <span className="text-xs font-semibold text-[#0B1F17]">
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
