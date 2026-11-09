import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  ChristianCross,
  FloralCorner,
  GoldDivider,
} from './StationeryOrnaments';

interface WeddingInvitationProps {
  animateEntrance?: boolean;
}

export const WeddingInvitation: React.FC<WeddingInvitationProps> = ({
  animateEntrance = true,
}) => {
  const [revealed, setRevealed] = useState(!animateEntrance);
  const [cardTilt, setCardTilt] = useState<{ rx: number; ry: number }>({
    rx: 0,
    ry: 0,
  });

  useEffect(() => {
    if (!animateEntrance) {
      setRevealed(true);
      return;
    }
    const timer = window.setTimeout(() => setRevealed(true), 60);
    return () => window.clearTimeout(timer);
  }, [animateEntrance]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setCardTilt({ rx: -ny * 2.2, ry: nx * 2.8 });
  };

  const handlePointerLeave = () => {
    setCardTilt({ rx: 0, ry: 0 });
  };

  return (
    <section
      id="invitation"
      aria-label="Official Wedding Invitation"
      className="relative px-3.5 pt-4 pb-3 scene-3d-viewport"
    >
      <article
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
        }}
        className="relative w-full rounded-2xl paper-grain stationery-slab preserve-3d overflow-hidden px-6 py-10 text-center transition-transform duration-300 ease-out"
      >
        {/* Double hot-stamped champagne-gold foil border */}
        <div
          className="pointer-events-none absolute inset-2.5 border border-[#C5A66A]/75 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-3.5 border border-[#C5A66A]/35 rounded-lg"
          aria-hidden="true"
        />

        {/* Delicate golden light pass on card reveal */}
        {revealed && (
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden z-10"
            aria-hidden="true"
          >
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-gold-sweep" />
          </div>
        )}

        {/* Handcrafted botanical corner ornaments */}
        <FloralCorner
          position="top-left"
          className="w-28 h-28 absolute top-1 left-1 opacity-90"
        />
        <FloralCorner
          position="top-right"
          className="w-28 h-28 absolute top-1 right-1 opacity-90"
        />
        <FloralCorner
          position="bottom-left"
          className="w-28 h-28 absolute bottom-1 left-1 opacity-90"
        />
        <FloralCorner
          position="bottom-right"
          className="w-28 h-28 absolute bottom-1 right-1 opacity-90"
        />

        {/* Group 1: Christian Cross & Opening Blessing */}
        <div
          className={`relative z-20 transition-all duration-700 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <ChristianCross size="md" className="mb-3" />

          <p className="font-heading text-xs sm:text-[13px] tracking-[0.24em] uppercase text-[#6E5849] font-semibold embossed-text">
            {weddingConfig.invitationCopy.blessingHeader}
          </p>

          <p className="font-heading italic text-base sm:text-[17px] text-[#5B473B] mt-2">
            {weddingConfig.invitationCopy.familiesLine}
          </p>

          <p className="font-heading text-xs sm:text-[13px] tracking-[0.2em] uppercase text-[#49382E] font-semibold mt-2 embossed-text">
            {weddingConfig.invitationCopy.inviteHeader}
          </p>

          <p className="font-heading italic text-base sm:text-[17px] text-[#5B473B] mt-1">
            {weddingConfig.invitationCopy.celebrateSubline}
          </p>
        </div>

        {/* Group 2: The Couple's Names (Main Visual Centerpiece) */}
        <div
          className={`relative z-20 my-6 transition-all duration-700 delay-150 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h1 className="font-heading text-[34px] sm:text-[38px] leading-[1.1] tracking-[0.14em] uppercase text-[#49382E] font-semibold embossed-text">
            {weddingConfig.groom}
          </h1>

          <span
            className="block font-script text-3xl text-[#9C7E44] my-1.5"
            aria-label="and"
          >
            &amp;
          </span>

          <h1 className="font-heading text-[34px] sm:text-[38px] leading-[1.1] tracking-[0.14em] uppercase text-[#49382E] font-semibold embossed-text">
            {weddingConfig.bride}
          </h1>

          {/* Couple Monogram */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C5A66A]" />
            <span className="font-heading text-base tracking-[0.22em] text-[#8E6F36] font-semibold embossed-text">
              {weddingConfig.monogram}
            </span>
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#C5A66A]" />
          </div>

          <p className="font-heading italic text-[15px] sm:text-base text-[#5C473A] leading-relaxed mt-3 px-2 max-w-[300px] mx-auto">
            {weddingConfig.invitationCopy.promiseQuote}
          </p>
        </div>

        <GoldDivider variant="simple" className="my-4" />

        {/* Group 3: Ceremony Date, Time & Venue Details */}
        <div
          className={`relative z-20 max-w-[295px] mx-auto space-y-3.5 text-left transition-all duration-700 delay-300 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {/* Date Row */}
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full border border-[#C5A66A]/70 bg-[#EFE5D5]/75 shadow-[inset_0_1px_0_#FFFFFF] flex items-center justify-center shrink-0 mt-0.5 text-[#8E6F36]">
              <Calendar className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading text-[15px] tracking-[0.14em] uppercase text-[#49382E] font-semibold leading-snug embossed-text">
                {weddingConfig.date.dayOfWeekUpper}
              </p>
              <p className="font-heading text-base tracking-[0.12em] uppercase text-[#49382E] font-semibold leading-snug embossed-text">
                {weddingConfig.date.dateUpper}
              </p>
            </div>
          </div>

          {/* Time Row */}
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-full border border-[#C5A66A]/70 bg-[#EFE5D5]/75 shadow-[inset_0_1px_0_#FFFFFF] flex items-center justify-center shrink-0 text-[#8E6F36]">
              <Clock className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading text-base tracking-[0.12em] uppercase text-[#49382E] font-semibold embossed-text">
                {weddingConfig.date.timeDisplay}
              </p>
            </div>
          </div>

          {/* Venue Row */}
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full border border-[#C5A66A]/70 bg-[#EFE5D5]/75 shadow-[inset_0_1px_0_#FFFFFF] flex items-center justify-center shrink-0 mt-0.5 text-[#8E6F36]">
              <MapPin className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading text-[17px] text-[#49382E] font-semibold leading-snug embossed-text">
                {weddingConfig.venue.name}
              </p>
              <p className="font-body text-xs text-[#6E5849] leading-relaxed mt-0.5">
                {weddingConfig.venue.cityLine}
              </p>
            </div>
          </div>
        </div>

        <GoldDivider variant="ornate" className="mt-6 mb-4" />

        {/* Group 4: Closing Invitation Honour Message */}
        <p
          className={`relative z-20 font-heading italic text-[15px] sm:text-base text-[#5B473B] leading-relaxed px-2 max-w-[310px] mx-auto transition-all duration-700 delay-400 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {weddingConfig.invitationCopy.honourMessage}
        </p>
      </article>
    </section>
  );
};
