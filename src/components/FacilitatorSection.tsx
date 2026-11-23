import React, { useState } from 'react';
import { UserCheck } from 'lucide-react';
import { MEDIA, SITE_CONFIG } from '../data/siteContent';

export const FacilitatorSection: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="border-b border-[#DCE5DF] bg-[#F8FAF8] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-[#DCE5DF] bg-[#EFF4F0] aspect-[3/4] max-w-md mx-auto lg:max-w-none">
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
                  <UserCheck className="h-10 w-10 text-[#1B6B50]" aria-hidden="true" />
                  <p className="font-display text-base font-medium text-[#14241E]">
                    {SITE_CONFIG.practitionerName}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-medium tracking-wide text-[#1B6B50]">
              Your Facilitator
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#14241E] text-balance sm:text-4xl">
              People don’t fit in neat boxes—and good workshops don’t pretend they do.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#4B5E55]">
              I’m {SITE_CONFIG.practitionerName}. I work with founders, HR leaders, and intact teams who want better day-to-day collaboration without corporate buzzwords or awkward role-play.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#4B5E55]">
              Everything DiSC® is not a label to excuse behavior; it is a shared mirror. When a team understands why one colleague asks for data before deciding while another wants to talk it out live, tension drops and trust grows quickly.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-[#DCE5DF] pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs text-[#4B5E55]">Accreditation</p>
                <p className="mt-1 text-sm font-semibold text-[#14241E]">
                  {SITE_CONFIG.practitionerCredentials}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#4B5E55]">Where We Work</p>
                <p className="mt-1 text-sm font-semibold text-[#14241E]">
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
