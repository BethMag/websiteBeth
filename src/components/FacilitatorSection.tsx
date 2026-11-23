import React, { useState } from 'react';
import { UserCheck } from 'lucide-react';
import { MEDIA, SITE_CONFIG } from '../data/siteContent';

export const FacilitatorSection: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="border-b-2 border-[#064E3B]/15 bg-[#EDF7F2] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border-2 border-[#064E3B]/25 bg-white aspect-[3/4] max-w-md mx-auto lg:max-w-none">
              {!imgError ? (
                <img
                  src={MEDIA.facilitatorPortrait}
                  alt={`${SITE_CONFIG.practitionerName}, team development coach and Everything DiSC practitioner`}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                  <UserCheck className="h-10 w-10 text-[#047857]" aria-hidden="true" />
                  <p className="font-display text-base font-bold text-[#0B1F17]">
                    {SITE_CONFIG.practitionerName}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-sm font-bold tracking-wide text-[#047857]">
              Your Facilitator
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0B1F17] text-balance sm:text-4xl">
              People don’t fit in neat boxes—and good workshops don’t pretend they do.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#1E3A2F] sm:text-lg">
              I’m {SITE_CONFIG.practitionerName}. I work with founders, HR leaders, and intact teams who want better day-to-day collaboration without corporate buzzwords or awkward role-play.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#1E3A2F] sm:text-lg">
              Everything DiSC® is not a label to excuse behavior; it is a shared mirror. When a team understands why one colleague asks for data before deciding while another wants to talk it out live, tension drops and trust grows quickly.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t-2 border-[#8CAEA0] pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#047857]">
                  Accreditation
                </p>
                <p className="mt-1 text-sm font-bold text-[#0B1F17]">
                  {SITE_CONFIG.practitionerCredentials}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#047857]">
                  Where We Work
                </p>
                <p className="mt-1 text-sm font-bold text-[#0B1F17]">
                  {SITE_CONFIG.locationNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
