import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import {
  ChristianCross,
  FloralCorner,
  GoldDivider,
  BibleAndCandleVignette,
} from './StationeryOrnaments';

export const ScriptureSection: React.FC = () => {
  return (
    <section
      id="scripture"
      aria-label="Christian Wedding Scripture and Blessings"
      className="relative px-3.5 py-3"
    >
      <div className="relative w-full rounded-2xl paper-grain stationery-slab overflow-hidden pt-9 text-center">
        {/* Double embossed gold-foil border */}
        <div
          className="pointer-events-none absolute inset-2.5 border border-[#C5A66A]/70 rounded-xl z-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-3.5 border border-[#C5A66A]/30 rounded-lg z-20"
          aria-hidden="true"
        />

        {/* Top floral corners */}
        <FloralCorner
          position="top-left"
          className="w-28 h-28 absolute top-1 left-1 z-10 opacity-90"
        />
        <FloralCorner
          position="top-right"
          className="w-28 h-28 absolute top-1 right-1 z-10 opacity-85"
        />

        <div className="relative z-10 px-6 pb-4">
          <ChristianCross size="lg" className="mb-3" />

          <h2 className="font-heading italic text-xl sm:text-[22px] text-[#49382E] font-medium tracking-wide mb-6 embossed-text">
            {weddingConfig.scriptureSection.sectionSubtitle}
          </h2>

          {/* Scripture Verses */}
          <div className="space-y-6 max-w-[305px] mx-auto">
            {weddingConfig.scriptureSection.verses.map((verse, idx) => (
              <blockquote key={idx} className="space-y-1.5">
                <p className="font-editorial italic text-[17px] sm:text-lg text-[#49382E] leading-relaxed embossed-text">
                  {verse.text}
                </p>
                <footer className="font-heading text-sm sm:text-[15px] tracking-[0.06em] text-[#7A614E]">
                  {verse.reference}
                </footer>
              </blockquote>
            ))}
          </div>

          <GoldDivider variant="ornate" className="my-6" />

          {/* Closing Scripture Blessing */}
          <p className="font-heading italic text-[16px] sm:text-[17px] text-[#49382E] leading-relaxed max-w-[295px] mx-auto">
            {weddingConfig.scriptureSection.closingBlessing}
          </p>
        </div>

        {/* Open Holy Bible, Glowing Candle & White Blossoms Vignette */}
        <BibleAndCandleVignette className="mt-2" />
      </div>
    </section>
  );
};
