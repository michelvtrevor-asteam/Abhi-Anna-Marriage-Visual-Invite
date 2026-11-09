import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import {
  BotanicalCrest,
  ChapelMedallion,
  FloralCorner,
  GoldDivider,
} from './StationeryOrnaments';

export const EventTimeline: React.FC = () => {
  const { heading, subheading, events } = weddingConfig.timeline;

  return (
    <section
      id="timeline"
      aria-label="Wedding Event Timeline"
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

        {/* Delicate corner florals */}
        <FloralCorner
          position="top-left"
          className="w-24 h-24 absolute top-1 left-1 opacity-75"
        />
        <FloralCorner
          position="bottom-right"
          className="w-24 h-24 absolute bottom-1 right-1 opacity-75"
        />

        <div className="relative z-10">
          <BotanicalCrest className="mb-2" />

          <h2 className="font-heading text-xl sm:text-[22px] tracking-[0.18em] uppercase text-[#49382E] font-semibold embossed-text">
            {heading}
          </h2>

          <p className="font-heading italic text-base text-[#5C473A] mt-1">
            {subheading}
          </p>

          {/* Timeline Sequence */}
          <div className="relative mt-6 mb-4 flex flex-col items-center">
            {events.map((event, index) => (
              <div key={event.id} className="w-full flex flex-col items-center">
                <div
                  className="w-[1.5px] h-6 bg-gradient-to-b from-transparent via-[#C5A66A] to-[#AD925E]"
                  aria-hidden="true"
                />

                <ChapelMedallion className="my-1" />

                <div
                  className="w-[1.5px] h-6 bg-gradient-to-b from-[#AD925E] to-[#C5A66A]/40"
                  aria-hidden="true"
                />

                <div className="mt-1 max-w-[290px] mx-auto">
                  <p className="font-heading text-lg tracking-[0.16em] uppercase text-[#8B6B32] font-semibold embossed-text">
                    {event.time} — {event.title}
                  </p>
                  <p className="font-heading text-base text-[#49382E] font-medium mt-1">
                    {event.venue}
                  </p>
                  <p className="font-heading italic text-[16px] text-[#5B473B] leading-relaxed mt-3">
                    &ldquo;{event.description}&rdquo;
                  </p>
                </div>

                {index < events.length - 1 && (
                  <div
                    className="w-[1.5px] h-8 bg-[#C5A66A]/60 my-3"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          <GoldDivider variant="ornate" className="mt-5 mb-2" />
        </div>
      </div>
    </section>
  );
};
