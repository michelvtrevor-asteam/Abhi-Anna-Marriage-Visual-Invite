import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  BotanicalCrest,
  FloralCorner,
  GoldDivider,
} from './StationeryOrnaments';

export const WeddingDetails: React.FC = () => {
  return (
    <section
      id="wedding-day"
      aria-label="The Wedding Day Venue and Directions"
      className="relative px-3.5 py-3"
    >
      <div className="relative w-full rounded-2xl paper-grain stationery-slab overflow-hidden px-6 py-9 text-center">
        {/* Double embossed gold-foil border */}
        <div
          className="pointer-events-none absolute inset-2.5 border border-[#C5A66A]/70 rounded-xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-3.5 border border-[#C5A66A]/30 rounded-lg"
          aria-hidden="true"
        />

        {/* Bottom floral corners */}
        <FloralCorner
          position="bottom-left"
          className="w-32 h-32 absolute bottom-1 left-1 opacity-90"
        />
        <FloralCorner
          position="bottom-right"
          className="w-32 h-32 absolute bottom-1 right-1 opacity-90"
        />

        <div className="relative z-10">
          <BotanicalCrest className="mb-2" />

          <h2 className="font-heading text-xl sm:text-[22px] tracking-[0.18em] uppercase text-[#49382E] font-semibold embossed-text">
            THE WEDDING DAY
          </h2>

          <GoldDivider variant="simple" className="my-3.5" />

          {/* Structured Ceremony Details */}
          <div className="max-w-[300px] mx-auto my-6 space-y-5 text-left">
            {/* Date */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#C5A66A]/70 bg-[#EFE5D5]/80 shadow-[inset_0_1px_0_#FFFFFF] flex items-center justify-center shrink-0 text-[#8B6B32]">
                <Calendar className="w-4.5 h-4.5 stroke-[1.75]" aria-hidden="true" />
              </div>
              <div className="pt-0.5">
                <p className="font-heading text-lg text-[#49382E] font-semibold leading-snug embossed-text">
                  {weddingConfig.date.dayOfWeek},
                </p>
                <p className="font-heading text-lg text-[#49382E] font-semibold leading-snug embossed-text">
                  {weddingConfig.date.dateFormatted}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#C5A66A]/70 bg-[#EFE5D5]/80 shadow-[inset_0_1px_0_#FFFFFF] flex items-center justify-center shrink-0 text-[#8B6B32]">
                <Clock className="w-4.5 h-4.5 stroke-[1.75]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading text-lg text-[#49382E] font-semibold embossed-text">
                  {weddingConfig.date.timeWithZone}
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#C5A66A]/70 bg-[#EFE5D5]/80 shadow-[inset_0_1px_0_#FFFFFF] flex items-center justify-center shrink-0 text-[#8B6B32]">
                <MapPin className="w-4.5 h-4.5 stroke-[1.75]" aria-hidden="true" />
              </div>
              <div className="pt-0.5">
                <p className="font-heading text-lg text-[#49382E] font-semibold leading-snug embossed-text">
                  {weddingConfig.venue.name}
                </p>
                <p className="font-heading text-base text-[#5C473A] leading-snug mt-0.5">
                  {weddingConfig.venue.cityLine}
                </p>
              </div>
            </div>
          </div>

          {/* Prominent Google Maps Directions CTA */}
          <div className="mt-7 mb-3">
            <a
              href={weddingConfig.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to K.K Reddy Function Hall, Raichur on Google Maps"
              className="btn-luxury-gold min-h-[48px] w-full max-w-[260px] px-6 py-3 rounded-full inline-flex items-center justify-center gap-2.5 text-xs sm:text-[13px] font-body font-medium tracking-[0.16em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49382E]"
            >
              <MapPin className="w-4 h-4 stroke-[2]" aria-hidden="true" />
              <span>GET DIRECTIONS</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
