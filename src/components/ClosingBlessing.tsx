import React from 'react';
import { MessageCircle, ArrowUp, MailOpen, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { buildWhatsAppShareUrl } from './WhatsAppShare';
import {
  ChristianCross,
  FloralCorner,
  GoldDivider,
} from './StationeryOrnaments';

interface ClosingBlessingProps {
  onReplayEnvelope: () => void;
}

export const ClosingBlessing: React.FC<ClosingBlessingProps> = ({
  onReplayEnvelope,
}) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="blessing"
      aria-label="Closing Wedding Blessing"
      className="relative px-3.5 pt-3 pb-10 space-y-5"
    >
      {/* Part 1: Main Closing Blessing Card (Matching Panel 13) */}
      <div className="relative w-full rounded-2xl paper-grain stationery-slab overflow-hidden px-6 py-10 text-center">
        {/* Double embossed gold-foil border */}
        <div
          className="pointer-events-none absolute inset-2.5 border border-[#C5A66A]/65 rounded-xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-3.5 border border-[#C5A66A]/25 rounded-lg"
          aria-hidden="true"
        />

        <FloralCorner position="bottom-left" className="w-28 h-28 absolute bottom-1 left-1 opacity-90" />
        <FloralCorner position="bottom-right" className="w-28 h-28 absolute bottom-1 right-1 opacity-90" />

        <div className="relative z-10">
          <ChristianCross size="md" className="mb-3" />

          <p className="font-heading text-xs sm:text-[13px] tracking-[0.22em] uppercase text-[#5C473A] font-semibold">
            {weddingConfig.closing.header}
          </p>

          <h2 className="font-script text-4xl sm:text-[42px] text-[#49382E] mt-3 leading-tight">
            Abhishek &amp; Keerthana
          </h2>

          <p className="font-heading text-lg tracking-[0.22em] uppercase text-[#49382E] font-semibold mt-1">
            {weddingConfig.closing.coupleNames}
          </p>

          <div className="mt-2.5 flex items-center justify-center gap-3">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C5A66A]" />
            <span className="font-heading text-base tracking-[0.22em] text-[#8B6B32] font-semibold">
              {weddingConfig.closing.monogram}
            </span>
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#C5A66A]" />
          </div>

          <GoldDivider variant="ornate" className="my-4" />

          <p className="font-heading text-[16px] sm:text-[17px] text-[#49382E] leading-relaxed max-w-[295px] mx-auto my-4">
            {weddingConfig.closing.message}
          </p>

          {/* Final Sharing CTA */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <a
              href={buildWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-gold min-h-[48px] w-full max-w-[265px] px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 text-xs sm:text-[13px] font-body font-medium tracking-[0.14em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49382E]"
            >
              <MessageCircle className="w-4 h-4 stroke-[2]" aria-hidden="true" />
              <span>SHARE OUR INVITATION</span>
            </a>

            {/* Return to Beginning / Replay Envelope Controls */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleScrollToTop}
                className="min-h-[44px] px-3.5 py-1.5 rounded-full border border-[#C5A66A]/60 bg-[#FAF5EC]/80 hover:bg-[#EFE5D5] inline-flex items-center gap-1.5 text-[11px] font-body tracking-[0.14em] uppercase text-[#49382E] transition-colors cursor-pointer whitespace-nowrap"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#8B6B32]" aria-hidden="true" />
                <span>Back to Top</span>
              </button>

              <button
                type="button"
                onClick={onReplayEnvelope}
                className="min-h-[44px] px-3.5 py-1.5 rounded-full border border-[#C5A66A]/60 bg-[#FAF5EC]/80 hover:bg-[#EFE5D5] inline-flex items-center gap-1.5 text-[11px] font-body tracking-[0.14em] uppercase text-[#49382E] transition-colors cursor-pointer whitespace-nowrap"
              >
                <MailOpen className="w-3.5 h-3.5 text-[#8B6B32]" aria-hidden="true" />
                <span>Replay Envelope</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Golden-Hour Country Chapel Epilogue Card (Matching Panel 14) */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#C5A66A]/70 shadow-[0_18px_40px_-14px_rgba(48,33,20,0.4)]">
        <svg
          viewBox="0 0 400 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          aria-hidden="true"
        >
          <defs>
            {/* Sunset twilight sky to golden horizon */}
            <linearGradient id="chapelSkyGrad" x1="200" y1="0" x2="200" y2="235" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B4D6B" />
              <stop offset="38%" stopColor="#6E6B74" />
              <stop offset="72%" stopColor="#D89E63" />
              <stop offset="100%" stopColor="#FCE4A6" />
            </linearGradient>
            {/* Golden sunburst */}
            <radialGradient id="sunsetSunGlow" cx="62%" cy="62%" r="45%">
              <stop offset="0%" stopColor="#FFFBE0" stopOpacity="1" />
              <stop offset="30%" stopColor="#F8C86C" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#D68B45" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D68B45" stopOpacity="0" />
            </radialGradient>
            {/* Meadow foreground */}
            <linearGradient id="meadowGrad" x1="200" y1="215" x2="200" y2="360" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6B5F36" />
              <stop offset="45%" stopColor="#483D22" />
              <stop offset="100%" stopColor="#261E11" />
            </linearGradient>
          </defs>

          {/* Sky & Golden Sun */}
          <rect width="400" height="240" fill="url(#chapelSkyGrad)" />
          <circle cx="248" cy="215" r="145" fill="url(#sunsetSunGlow)" />

          {/* Soft golden clouds */}
          <ellipse cx="95" cy="95" rx="65" ry="12" fill="#E7B98A" fillOpacity="0.22" />
          <ellipse cx="310" cy="115" rx="75" ry="14" fill="#F4C992" fillOpacity="0.25" />

          {/* Distant treelines */}
          <path
            d="M0 225Q60 212 120 222T260 220T400 224V245H0V225Z"
            fill="#4E4229"
          />

          {/* Country Christian Chapel Silhouette on the Left */}
          <g transform="translate(86, 128)">
            {/* Steeple Cross */}
            <path d="M28 0V14M23 5H33" stroke="#FCE5B2" strokeWidth="1.8" strokeLinecap="round" />
            {/* Steeple Spire */}
            <path d="M28 12L18 46H38L28 12Z" fill="#3B2F23" />
            {/* Steeple Tower */}
            <rect x="20" y="46" width="16" height="48" fill="#4A3B2C" />
            {/* Main Sanctuary Gable */}
            <path d="M34 54L64 40L94 54V94H34V54Z" fill="#5C4A38" />
            <path d="M32 54L64 38L96 54" stroke="#F8D594" strokeWidth="1.2" />
            {/* Warm glowing arched church windows */}
            <rect x="46" y="64" width="6" height="14" rx="3" fill="#FFE6A3" />
            <rect x="61" y="64" width="6" height="14" rx="3" fill="#FFE6A3" />
            <rect x="76" y="64" width="6" height="14" rx="3" fill="#FFE6A3" />
            <rect x="25" y="56" width="6" height="14" rx="3" fill="#FFE6A3" />
          </g>

          {/* Graceful Tree in Meadow */}
          <g transform="translate(216, 174)">
            <rect x="14" y="28" width="4" height="22" fill="#3A2D1B" />
            <circle cx="16" cy="20" r="14" fill="#463922" />
            <circle cx="8" cy="25" r="10" fill="#524328" />
            <circle cx="24" cy="24" r="10" fill="#3D311C" />
          </g>

          {/* Rolling Wildflower Meadow */}
          <path
            d="M0 226C110 216 260 220 400 230V360H0V226Z"
            fill="url(#meadowGrad)"
          />

          {/* Winding sunlit footpath */}
          <path
            d="M150 224C165 255 140 295 195 360H245C185 295 190 255 162 224H150Z"
            fill="#D9B372"
            fillOpacity="0.28"
          />

          {/* Meadow white & golden wildflowers */}
          {[
            [38, 255, 2.5],
            [64, 268, 3],
            [92, 248, 2],
            [118, 276, 3.2],
            [52, 294, 2.8],
            [86, 310, 3.5],
            [135, 302, 2.5],
            [274, 256, 2.6],
            [312, 272, 3.2],
            [348, 258, 2.4],
            [290, 298, 3],
            [335, 312, 3.4],
            [368, 290, 2.6],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={i % 2 === 0 ? '#FFFDF7' : '#F8D994'}
              fillOpacity="0.8"
            />
          ))}
        </svg>

        {/* Poetic Epilogue Typography Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between items-center text-center py-7 px-5 pointer-events-none">
          <div className="space-y-1 drop-shadow-[0_2px_8px_rgba(25,18,12,0.65)]">
            {weddingConfig.closing.epilogueLines.map((line, i) => (
              <p
                key={i}
                className="font-heading italic text-xl sm:text-[22px] text-[#FFFDF9] leading-snug"
              >
                {line}
              </p>
            ))}
            <div className="pt-2 flex justify-center">
              <Heart className="w-5 h-5 text-[#FFFDF9] stroke-[1.6]" />
            </div>
          </div>

          <div className="drop-shadow-[0_2px_10px_rgba(18,12,6,0.85)]">
            <p className="font-script text-3xl sm:text-4xl text-[#FFFDF9]">
              Abhishek &amp; Keerthana
            </p>
            <p className="font-heading text-sm tracking-[0.26em] uppercase text-[#F5DFB0] font-semibold mt-0.5">
              {weddingConfig.closing.monogram}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
