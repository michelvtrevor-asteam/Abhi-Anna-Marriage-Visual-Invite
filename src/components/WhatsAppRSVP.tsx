import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  BotanicalCrest,
  FloralCorner,
  GoldDivider,
} from './StationeryOrnaments';

export const WhatsAppRSVP: React.FC = () => {
  const whatsappRsvpUrl = `https://wa.me/${
    weddingConfig.contact.phoneInternationalDigits
  }?text=${encodeURIComponent(weddingConfig.rsvp.prefilledMessage)}`;

  return (
    <section
      id="rsvp"
      aria-label="Wedding RSVP on WhatsApp"
      className="relative px-3.5 py-3"
    >
      <div className="relative w-full rounded-2xl paper-grain stationery-slab overflow-hidden px-6 py-9 text-center">
        {/* Double embossed gold-foil border */}
        <div
          className="pointer-events-none absolute inset-2.5 border border-[#C5A66A]/65 rounded-xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-3.5 border border-[#C5A66A]/25 rounded-lg"
          aria-hidden="true"
        />

        <FloralCorner position="bottom-left" className="w-30 h-30 absolute bottom-1 left-1 opacity-90" />
        <FloralCorner position="bottom-right" className="w-28 h-28 absolute bottom-1 right-1 opacity-80" />

        <div className="relative z-10">
          <BotanicalCrest className="mb-2.5" />

          <h2 className="font-heading text-xl sm:text-[21px] tracking-[0.14em] uppercase text-[#49382E] font-semibold embossed-text leading-snug max-w-[290px] mx-auto">
            {weddingConfig.rsvp.heading}
          </h2>

          <GoldDivider variant="simple" className="my-4" />

          <p className="font-heading text-[17px] text-[#49382E] leading-relaxed max-w-[275px] mx-auto my-5">
            {weddingConfig.rsvp.supportingText}
          </p>

          {/* Primary WhatsApp RSVP Button */}
          <div className="mt-6">
            <a
              href={whatsappRsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Respond to the wedding invitation on WhatsApp at ${weddingConfig.contact.phoneDisplay}`}
              className="btn-luxury-gold min-h-[48px] w-full max-w-[275px] px-6 py-3 rounded-full inline-flex items-center justify-center gap-2.5 text-xs sm:text-[13px] font-body font-medium tracking-[0.14em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49382E]"
            >
              <MessageCircle className="w-4 h-4 stroke-[2]" aria-hidden="true" />
              <span>{weddingConfig.rsvp.buttonLabel}</span>
            </a>
          </div>

          {/* Direct Contact Phone Number */}
          <div className="mt-5">
            <a
              href={`tel:+${weddingConfig.contact.phoneInternationalDigits}`}
              className="min-h-[44px] px-4 inline-flex items-center justify-center gap-2 font-heading text-lg font-semibold text-[#49382E] hover:text-[#826532] tabular-nums transition-colors"
            >
              <Phone className="w-4 h-4 text-[#8B6B32]" aria-hidden="true" />
              <span>{weddingConfig.contact.phoneDisplay}</span>
            </a>
          </div>

          <p className="font-heading text-xs sm:text-[13px] text-[#6E5849] mt-2 max-w-[240px] mx-auto leading-relaxed">
            Pre-filled message will be shared on WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
};
