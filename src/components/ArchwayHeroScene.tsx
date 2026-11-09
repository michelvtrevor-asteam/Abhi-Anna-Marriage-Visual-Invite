import React from 'react';
import { ChevronDown } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { GoldenParticleCanvas } from './ThreeDStationeryEngine';
import { ChristianCross } from './StationeryOrnaments';

interface ArchwayHeroSceneProps {
  isRevealed?: boolean;
  onScrollDown?: () => void;
}

export const ArchwayHeroScene: React.FC<ArchwayHeroSceneProps> = ({
  isRevealed = true,
  onScrollDown,
}) => {
  return (
    <section
      aria-label="Welcome to the Wedding Ceremony of Abhishek and Keerthana"
      className="relative w-full h-[100dvh] min-h-[640px] max-h-[920px] overflow-hidden select-none bg-[#F6EFE2]"
    >
      {/* 1. DEEP LAYER: GOLDEN-HOUR SKY, VOLUMETRIC SUNBEAMS & DISTANT CHRISTIAN CHAPEL */}
      <svg
        viewBox="0 0 430 860"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radiant Golden-Ivory Sanctuary Sky */}
          <radialGradient id="sanctuarySunSky" cx="50%" cy="54%" r="65%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="32%" stopColor="#FBF0D9" />
            <stop offset="68%" stopColor="#E9D5B3" />
            <stop offset="100%" stopColor="#CBB086" />
          </radialGradient>

          {/* Warm Marble Floor Reflection */}
          <linearGradient id="marbleFloorGrad" x1="215" y1="540" x2="215" y2="860" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBF3E4" />
            <stop offset="45%" stopColor="#EBDAC0" />
            <stop offset="85%" stopColor="#F5EFE4" />
            <stop offset="100%" stopColor="#F8F3EA" />
          </linearGradient>

          {/* 3D Architectural Arch Column Gradient */}
          <linearGradient id="archPillar3D" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D5C09D" />
            <stop offset="28%" stopColor="#F7EFE2" />
            <stop offset="55%" stopColor="#FFFDF9" />
            <stop offset="82%" stopColor="#E5D4B7" />
            <stop offset="100%" stopColor="#B89B6B" />
          </linearGradient>

          {/* Metallic Gold Arch Rim */}
          <linearGradient id="archGoldTrim" x1="0" y1="0" x2="430" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8E4B2" />
            <stop offset="30%" stopColor="#B89249" />
            <stop offset="55%" stopColor="#FFF3CE" />
            <stop offset="80%" stopColor="#9D7834" />
            <stop offset="100%" stopColor="#DFC282" />
          </linearGradient>

          {/* Glowing Lantern Light */}
          <radialGradient id="lanternGlowHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBE6" stopOpacity="1" />
            <stop offset="35%" stopColor="#FFD87A" stopOpacity="0.68" />
            <stop offset="70%" stopColor="#E0A946" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#E0A946" stopOpacity="0" />
          </radialGradient>

          {/* Translucent Bridal Veil Gradient */}
          <linearGradient id="bridalVeilGrad" x1="230" y1="490" x2="245" y2="755" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="55%" stopColor="#FFFDF8" stopOpacity="0.82" />
            <stop offset="88%" stopColor="#F7ECDA" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F5E8D3" stopOpacity="0" />
          </linearGradient>

          {/* 3D Rose Petal Radial Gradient */}
          <radialGradient id="rose3DPetal" cx="38%" cy="35%" r="68%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="58%" stopColor="#F9F2E7" />
            <stop offset="88%" stopColor="#E5D6BF" />
            <stop offset="100%" stopColor="#CBB698" />
          </radialGradient>
        </defs>

        {/* Background Sky */}
        <rect width="430" height="860" fill="url(#sanctuarySunSky)" />

        {/* Volumetric Sunbeams Radiating Behind the Chapel */}
        <g opacity="0.52">
          <polygon points="215,480 -40,80 45,40" fill="#FFFDF8" />
          <polygon points="215,480 95,20 175,10" fill="#FFFDF8" />
          <polygon points="215,480 255,10 335,20" fill="#FFFDF8" />
          <polygon points="215,480 385,40 470,80" fill="#FFFDF8" />
          <polygon points="215,480 -60,240 -20,160" fill="#FFFBE8" />
          <polygon points="215,480 450,160 490,240" fill="#FFFBE8" />
        </g>

        {/* 2. DISTANT SUNLIT CHRISTIAN CATHEDRAL / SANCTUARY IN BACKGROUND */}
        <g opacity="0.62" transform="translate(0, 12)">
          {/* Distant Sanctuary Wings */}
          <rect x="75" y="425" width="280" height="125" fill="#EAD9BE" />
          <rect x="115" y="380" width="200" height="170" fill="#F2E5CF" />
          {/* Grand Central Sanctuary Pediment & Steeple */}
          <path d="M145 380L215 310L285 380H145Z" fill="#EFE0C6" stroke="#D5BC94" strokeWidth="1" />
          <path d="M185 315L215 245L245 315H185Z" fill="#F6EBDA" stroke="#D5BC94" strokeWidth="1" />
          {/* Christian Cross atop the Sanctuary Spire */}
          <path d="M215 215V245M205 225H225" stroke="#B89249" strokeWidth="2.4" strokeLinecap="round" />
          {/* Arched Sanctuary Windows */}
          {[100, 132, 168, 215, 262, 298, 330].map((wx, i) => (
            <path
              key={i}
              d={`M${wx - 8} 510V452C${wx - 8} 444 ${wx + 8} 444 ${wx + 8} 452V510H${wx - 8}Z`}
              fill="#FFF9E8"
            />
          ))}
        </g>

        {/* Sunlit Polished Marble Aisle Floor */}
        <rect x="0" y="540" width="430" height="320" fill="url(#marbleFloorGrad)" />
        {/* Perspective Marble Aisle Lines */}
        <path d="M165 540L45 860M265 540L385 860" stroke="#D8C3A0" strokeWidth="1" strokeOpacity="0.65" />
        <ellipse cx="215" cy="560" rx="140" ry="22" fill="#FFFDF7" fillOpacity="0.75" />

        {/* 3. MIDGROUND: 3D ARCHITECTURAL CATHEDRAL ARCHWAY & FLUTED COLUMNS */}
        <g>
          {/* Outer Wall Surround */}
          <path
            d="M0 0H430V690H382V290C382 155 298 68 215 34C132 68 48 155 48 290V690H0V0Z"
            fill="url(#archPillar3D)"
          />
          {/* Deep 3D Recessed Arch Extrusion */}
          <path
            d="M48 690V290C48 155 132 68 215 34C298 68 382 155 382 290V690"
            stroke="url(#archGoldTrim)"
            strokeWidth="5"
          />
          <path
            d="M60 680V292C60 165 139 82 215 48C291 82 370 165 370 292V680"
            stroke="url(#archGoldTrim)"
            strokeWidth="2"
            strokeOpacity="0.85"
          />
          {/* Fluted Column Details on Left & Right Pillars */}
          {[16, 26, 36].map((x) => (
            <line
              key={`l-col-${x}`}
              x1={x}
              y1="260"
              x2={x}
              y2="660"
              stroke="#C9B28B"
              strokeWidth="1.2"
              strokeOpacity="0.65"
            />
          ))}
          {[394, 404, 414].map((x) => (
            <line
              key={`r-col-${x}`}
              x1={x}
              y1="260"
              x2={x}
              y2="660"
              stroke="#C9B28B"
              strokeWidth="1.2"
              strokeOpacity="0.65"
            />
          ))}
          {/* Column Capitals */}
          <rect x="4" y="255" width="48" height="10" rx="2" fill="url(#archGoldTrim)" />
          <rect x="378" y="255" width="48" height="10" rx="2" fill="url(#archGoldTrim)" />
          <rect x="4" y="475" width="48" height="8" rx="2" fill="url(#archGoldTrim)" />
          <rect x="378" y="475" width="48" height="8" rx="2" fill="url(#archGoldTrim)" />
        </g>

        {/* 4. HANGING GOLDEN LANTERNS (Matching 00:08 in Reference Video) */}
        {[
          { x: 68, chainTop: 155, lanternY: 295, scale: 0.9 },
          { x: 102, chainTop: 112, lanternY: 242, scale: 0.72 },
          { x: 362, chainTop: 155, lanternY: 295, scale: 0.9 },
          { x: 328, chainTop: 112, lanternY: 242, scale: 0.72 },
        ].map((l, idx) => (
          <g key={idx}>
            {/* Hanging Gold Chain */}
            <line
              x1={l.x}
              y1={l.chainTop}
              x2={l.x}
              y2={l.lanternY}
              stroke="#B58E44"
              strokeWidth="1.4"
              strokeDasharray="3 2"
            />
            {/* Warm Golden Halo */}
            <circle cx={l.x} cy={l.lanternY + 24 * l.scale} r={46 * l.scale} fill="url(#lanternGlowHalo)" />
            {/* Ornate Golden Lantern Body */}
            <g transform={`translate(${l.x}, ${l.lanternY}) scale(${l.scale})`}>
              <path d="M0 0L-12 12H12L0 0Z" fill="#9D7834" />
              <rect x="-11" y="12" width="22" height="28" rx="3" fill="#FFF7D6" stroke="#9D7834" strokeWidth="2" />
              <line x1="-4" y1="12" x2="-4" y2="40" stroke="#B58E44" strokeWidth="1.2" />
              <line x1="4" y1="12" x2="4" y2="40" stroke="#B58E44" strokeWidth="1.2" />
              <path d="M-13 40H13L0 50L-13 40Z" fill="#9D7834" />
              <circle cx="0" cy="26" r="6" fill="#FFFFFF" />
            </g>
          </g>
        ))}

        {/* 5. THE BRIDE & GROOM IN GOLDEN-HOUR LIGHT (00:08–00:10 in Video, Christian Bridal Gown & Suit) */}
        <g transform="translate(0, 8)">
          {/* Soft Floor Shadow Under Couple */}
          <ellipse cx="215" cy="705" rx="68" ry="14" fill="#B59B74" fillOpacity="0.35" />

          {/* Groom (Abhishek) in Tailored Ivory/Champagne Suit on Left */}
          <g transform="translate(188, 438)">
            {/* Head & Hair */}
            <circle cx="0" cy="14" r="11" fill="#5A4230" />
            {/* Suit Collar & Jacket */}
            <path d="M-7 25H7L10 28H-10L-7 25Z" fill="#FFFFFF" />
            <path
              d="M-18 32C-18 28 -10 27 0 27C10 27 18 28 18 32L21 112H-21L-18 32Z"
              fill="#E5D5B9"
              stroke="#C9B28B"
              strokeWidth="1"
            />
            {/* Suit Trousers */}
            <path d="M-15 112H-2L-4 205H-16L-15 112Z" fill="#DAC6A4" />
            <path d="M2 112H15L14 205H3L2 112Z" fill="#D2BC97" />
          </g>

          {/* Bride (Keerthana) in Flowing White Christian Wedding Gown & Long Lace Veil on Right */}
          <g transform="translate(232, 448)">
            {/* Head & Bridal Hair Updo with Pearl Tiara */}
            <circle cx="0" cy="14" r="10.5" fill="#4E3828" />
            <path d="M-7 8C-3 4 3 4 7 8" stroke="#FFFDF7" strokeWidth="2" strokeLinecap="round" />

            {/* Bridal Gown Bodice */}
            <path
              d="M-13 28C-10 25 10 25 13 28L11 72H-11L-13 28Z"
              fill="#FFFDF9"
              stroke="#E6D8C3"
              strokeWidth="0.8"
            />

            {/* Flowing A-Line White Wedding Gown Skirt & Train */}
            <path
              d="M-11 72H11L46 218C20 228 -18 228 -42 216L-11 72Z"
              fill="#FFFFFF"
              stroke="#EAE0D0"
              strokeWidth="1"
            />

            {/* Long Translucent Sunlit Cathedral Lace Veil Trailing Behind */}
            <path
              d="M-6 12C6 12 18 45 36 120C54 195 82 248 96 268C48 284 -24 284 -68 264C-46 225 -22 140 -6 12Z"
              fill="url(#bridalVeilGrad)"
            />
            {/* Delicate Lace Edge on Veil */}
            <path
              d="M-68 264C-24 284 48 284 96 268"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />
          </g>
        </g>

        {/* 6. FOREGROUND 3D WHITE ROSE & BABY'S BREATH FLORAL CASCADES (Top & Bottom Corners) */}
        {/* Top-Left Lush 3D Rose Cascade */}
        <g filter="url(#paper-bas-relief)">
          {[
            [42, 42, 34],
            [92, 28, 28],
            [28, 96, 30],
            [78, 78, 25],
            [135, 22, 22],
            [22, 148, 24],
          ].map(([cx, cy, r], i) => (
            <g key={`tl-rose-${i}`} transform={`translate(${cx}, ${cy})`}>
              <circle cx="0" cy="0" r={r} fill="url(#rose3DPetal)" />
              <circle cx="-3" cy="-3" r={r * 0.68} fill="#FFFFFF" />
              <circle cx="2" cy="2" r={r * 0.35} fill="#F4E8D4" />
            </g>
          ))}
        </g>

        {/* Top-Right Lush 3D Rose Cascade */}
        <g filter="url(#paper-bas-relief)">
          {[
            [388, 42, 34],
            [338, 28, 28],
            [402, 96, 30],
            [352, 78, 25],
            [295, 22, 22],
            [408, 148, 24],
          ].map(([cx, cy, r], i) => (
            <g key={`tr-rose-${i}`} transform={`translate(${cx}, ${cy})`}>
              <circle cx="0" cy="0" r={r} fill="url(#rose3DPetal)" />
              <circle cx="-3" cy="-3" r={r * 0.68} fill="#FFFFFF" />
              <circle cx="2" cy="2" r={r * 0.35} fill="#F4E8D4" />
            </g>
          ))}
        </g>

        {/* Bottom-Left & Bottom-Right 3D White Rose & Golden Baby's Breath Borders (00:08–00:10 in video) */}
        <g filter="url(#paper-bas-relief)">
          {[
            [36, 645, 32],
            [78, 682, 28],
            [28, 715, 35],
            [95, 735, 26],
            [394, 645, 32],
            [352, 682, 28],
            [402, 715, 35],
            [335, 735, 26],
          ].map(([cx, cy, r], i) => (
            <g key={`bot-rose-${i}`} transform={`translate(${cx}, ${cy})`}>
              <circle cx="0" cy="0" r={r} fill="url(#rose3DPetal)" />
              <circle cx="-2" cy="-2" r={r * 0.65} fill="#FFFFFF" />
              <circle cx="2" cy="2" r={r * 0.32} fill="#EFE2CC" />
            </g>
          ))}
        </g>
      </svg>

      {/* 7. 60FPS FLOATING GOLDEN FAIRY-DUST PARTICLES OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <GoldenParticleCanvas mode="ambient" />
      </div>

      {/* 8. CENTRAL GOLDEN CALLIGRAPHY OVERLAY (Matching 00:08–00:10 in Reference Video) */}
      <div
        className={`absolute inset-x-0 top-[14%] z-20 flex flex-col items-center text-center px-6 transition-all duration-1000 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <ChristianCross size="md" className="mb-2 drop-shadow-[0_2px_6px_rgba(255,255,255,0.9)]" />

        <p className="font-heading text-[11px] sm:text-xs tracking-[0.26em] uppercase text-[#6E5326] font-semibold">
          {weddingConfig.invitationCopy.blessingHeader}
        </p>

        <p className="font-heading italic text-base sm:text-lg text-[#5C4422] mt-1">
          Welcome to the
        </p>
        <p className="font-script text-2xl sm:text-3xl text-[#8A6626] -mt-1">
          Wedding Ceremony
        </p>
        <p className="font-heading italic text-sm text-[#6E5326] -mt-1 mb-2">
          of
        </p>

        {/* Couple Names in Luminous 3D Gold Script */}
        <h1
          className="font-script text-5xl sm:text-[56px] leading-[1.08] text-[#8F6B29] drop-shadow-[0_2px_10px_rgba(255,252,240,0.95)]"
          style={{
            background:
              'linear-gradient(180deg, #745318 0%, #B88E3E 48%, #694912 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {weddingConfig.groom} &amp; {weddingConfig.bride}
        </h1>

        <p className="font-heading text-xs tracking-[0.22em] uppercase text-[#5C4422] font-semibold mt-2">
          {weddingConfig.date.fullDisplay}
        </p>
      </div>

      {/* 9. BOTTOM "Scroll down" PROMPT (Matching 00:09 in Reference Video) */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center">
        <button
          type="button"
          onClick={onScrollDown}
          aria-label="Scroll down to view wedding invitation details"
          className="min-h-[48px] px-5 py-2 flex flex-col items-center justify-center text-[#5C4422] hover:text-[#3D2B12] transition-colors cursor-pointer group"
        >
          <span className="font-script text-2xl sm:text-[26px] tracking-wide drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
            Scroll down
          </span>
          <ChevronDown
            className="w-5 h-5 -mt-1 text-[#8F6B29] animate-bounce"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
};
