import React from 'react';

/**
 * Ornate Christian Cross matching the champagne-gold double-outline Latin cross
 * seen in the reference invitation cards.
 */
export const ChristianCross: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const dimensions =
    size === 'sm' ? 'w-5 h-7' : size === 'lg' ? 'w-9 h-12' : 'w-7 h-9';

  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${dimensions} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crossGoldGrad" x1="0" y1="0" x2="60" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D7BC84" />
          <stop offset="45%" stopColor="#9D7D43" />
          <stop offset="75%" stopColor="#C5A66A" />
          <stop offset="100%" stopColor="#7C5F2C" />
        </linearGradient>
      </defs>
      {/* Soft warm halo */}
      <circle cx="30" cy="28" r="18" fill="#C5A66A" fillOpacity="0.08" />
      {/* Outer Latin Cross */}
      <path
        d="M27 6L30 2L33 6V22H49L53 25L49 28H33V70L30 75L27 70V28H11L7 25L11 22H27V6Z"
        stroke="url(#crossGoldGrad)"
        strokeWidth="1.6"
        fill="#EFE5D5"
        fillOpacity="0.45"
      />
      {/* Inner recessed filigree line */}
      <path
        d="M30 7V70M12 25H48"
        stroke="url(#crossGoldGrad)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Center diamond jewel */}
      <path
        d="M30 21L34 25L30 29L26 25L30 21Z"
        fill="url(#crossGoldGrad)"
      />
      {/* Terminal pearls */}
      <circle cx="30" cy="4.5" r="1.3" fill="#9D7D43" />
      <circle cx="30" cy="72.5" r="1.3" fill="#9D7D43" />
      <circle cx="9.5" cy="25" r="1.3" fill="#9D7D43" />
      <circle cx="50.5" cy="25" r="1.3" fill="#9D7D43" />
    </svg>
  );
};

/**
 * Custom 3D Embossed Champagne-Bronze Wax Seal bearing the "A&K" Monogram.
 */
export const WaxSeal: React.FC<{
  monogram?: string;
  isPressed?: boolean;
  isShining?: boolean;
  size?: 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}> = ({
  monogram = 'A&K',
  isPressed = false,
  isShining = false,
  size = 'lg',
  onClick,
  className = '',
}) => {
  const sizeClasses = size === 'lg' ? 'w-24 h-24' : 'w-18 h-18';

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? 'Open wedding invitation wax seal' : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 ${
        onClick ? 'cursor-pointer' : ''
      } ${isPressed ? 'scale-92' : 'scale-100'} ${sizeClasses} ${className}`}
    >
      <svg
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_16px_rgba(58,40,22,0.42)]"
      >
        <defs>
          <radialGradient id="waxOuterGrad" cx="36%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#DFC48D" />
            <stop offset="32%" stopColor="#B89252" />
            <stop offset="68%" stopColor="#89662E" />
            <stop offset="92%" stopColor="#64471C" />
            <stop offset="100%" stopColor="#4E3614" />
          </radialGradient>
          <radialGradient id="waxInnerRecess" cx="62%" cy="68%" r="65%">
            <stop offset="0%" stopColor="#B69050" />
            <stop offset="55%" stopColor="#85622B" />
            <stop offset="100%" stopColor="#583E17" />
          </radialGradient>
          <linearGradient id="waxRimGold" x1="18" y1="18" x2="122" y2="122" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F4E2B8" />
            <stop offset="45%" stopColor="#B58E4C" />
            <stop offset="75%" stopColor="#725221" />
            <stop offset="100%" stopColor="#D6B77B" />
          </linearGradient>
        </defs>

        {/* Organic hand-pressed outer wax edge */}
        <path
          d="M70 6C82 5.5 92 9.5 103 14.5C114 19.5 123.5 28 128.5 39C133.5 50 135 61.5 134 73.5C133 85.5 129.5 97 122 106.5C114.5 116 104 124.5 92.5 129C81 133.5 68.5 134.5 56.5 132C44.5 129.5 32.5 124 23.5 115.5C14.5 107 9 95.5 6.8 83.5C4.6 71.5 5.8 58.5 10.5 47C15.2 35.5 22.8 25 33 17.8C43.2 10.6 58 6.5 70 6Z"
          fill="url(#waxOuterGrad)"
          stroke="#5C4018"
          strokeWidth="1"
        />

        {/* Soft organic inner highlight ridge */}
        <path
          d="M70 11C81 10.6 90 14 100 18.8C110 23.6 118.5 31 123 41C127.5 51 129 61.5 128 72.5C127 83.5 123.5 94 116.8 102.5C110 111 100.5 118.8 90 123C79.5 127.2 68 128 57 125.8C46 123.6 35.2 118.5 27 110.8C18.8 103 13.8 92.8 11.8 81.8C9.8 70.8 10.8 59 15 48.5C19.2 38 26.2 28.5 35.5 22C44.8 15.5 59 11.4 70 11Z"
          stroke="#F5E4BE"
          strokeOpacity="0.38"
          strokeWidth="1.4"
          fill="none"
        />

        {/* Stamped inner circular basin */}
        <circle
          cx="70"
          cy="70"
          r="46"
          fill="url(#waxInnerRecess)"
          stroke="url(#waxRimGold)"
          strokeWidth="3.2"
        />

        {/* Fine inner double ring */}
        <circle
          cx="70"
          cy="70"
          r="40.5"
          stroke="#ECCFA0"
          strokeOpacity="0.55"
          strokeWidth="0.9"
          strokeDasharray="2 1.5"
        />

        {/* Tiny top and bottom botanical stars inside seal */}
        <path
          d="M70 33L71.5 36.2L75 36.8L72.2 39L73 42.3L70 40.5L67 42.3L67.8 39L65 36.8L68.5 36.2L70 33Z"
          fill="#E5C891"
          fillOpacity="0.65"
        />
        <path
          d="M62 103C65 101.5 75 101.5 78 103"
          stroke="#E5C891"
          strokeOpacity="0.6"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Deep shadow under embossed A&K monogram */}
        <text
          x="70"
          y="78.5"
          textAnchor="middle"
          fill="#3E290D"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="31"
          fontWeight="600"
          letterSpacing="1.5"
        >
          {monogram}
        </text>

        {/* Embossed gold A&K monogram */}
        <text
          x="69.2"
          y="77.2"
          textAnchor="middle"
          fill="url(#waxRimGold)"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="31"
          fontWeight="600"
          letterSpacing="1.5"
        >
          {monogram}
        </text>
      </svg>

      {/* Specular light sweep overlay when pressed/opened */}
      {isShining && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-gold-sweep" />
        </div>
      )}
    </div>
  );
};

/**
 * Handcrafted botanical corner floral ornament with creamy white blossoms,
 * champagne-gold foliage, and delicate baby's breath buds.
 */
export const FloralCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const transformClass = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-x-[-1] scale-y-[-1]',
  }[position];

  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${transformClass} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stemGold" x1="0" y1="0" x2="150" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9B7B42" />
          <stop offset="55%" stopColor="#C5A66A" />
          <stop offset="100%" stopColor="#856936" />
        </linearGradient>
        <radialGradient id="petalIvory" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F7F0E4" />
          <stop offset="100%" stopColor="#DFCFAE" />
        </radialGradient>
      </defs>

      {/* Main curving vines */}
      <path
        d="M4 135C12 92 38 48 84 22C108 9 135 5 162 6"
        stroke="url(#stemGold)"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.78"
      />
      <path
        d="M18 88C36 68 62 56 96 52"
        stroke="url(#stemGold)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M48 36C60 62 56 88 42 114"
        stroke="url(#stemGold)"
        strokeWidth="0.95"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Champagne-gold olive/eucalyptus leaves */}
      <path
        d="M66 32C72 20 84 16 92 20C84 28 74 33 66 32Z"
        fill="#C5A66A"
        fillOpacity="0.42"
        stroke="#9B7B42"
        strokeWidth="0.8"
      />
      <path
        d="M102 15C110 7 122 6 130 11C120 17 110 19 102 15Z"
        fill="#C5A66A"
        fillOpacity="0.35"
        stroke="#9B7B42"
        strokeWidth="0.8"
      />
      <path
        d="M26 74C16 66 13 54 18 46C25 54 28 65 26 74Z"
        fill="#C5A66A"
        fillOpacity="0.4"
        stroke="#9B7B42"
        strokeWidth="0.8"
      />
      <path
        d="M16 106C8 96 7 84 12 76C18 85 19 96 16 106Z"
        fill="#C5A66A"
        fillOpacity="0.34"
        stroke="#9B7B42"
        strokeWidth="0.75"
      />
      <path
        d="M68 56C78 49 90 50 96 56C86 61 75 60 68 56Z"
        fill="#AD925E"
        fillOpacity="0.32"
        stroke="#9B7B42"
        strokeWidth="0.75"
      />
      <path
        d="M48 76C56 82 59 94 54 102C47 94 46 84 48 76Z"
        fill="#AD925E"
        fillOpacity="0.3"
        stroke="#9B7B42"
        strokeWidth="0.75"
      />

      {/* Primary Ivory Blossom 1 (Corner centerpiece at 42, 42) */}
      <g transform="translate(42, 40)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d="M0 -3C-8 -15 -11 -24 0 -27C11 -24 8 -15 0 -3Z"
            fill="url(#petalIvory)"
            stroke="#C5A66A"
            strokeWidth="0.75"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="5.5" fill="#D5B67A" />
        <circle cx="0" cy="0" r="3" fill="#9A793E" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <circle
            key={deg}
            cx={Math.cos((deg * Math.PI) / 180) * 6.5}
            cy={Math.sin((deg * Math.PI) / 180) * 6.5}
            r="1.1"
            fill="#FFFDF9"
          />
        ))}
      </g>

      {/* Secondary Ivory Blossom 2 (at 82, 24) */}
      <g transform="translate(84, 24) scale(0.68)">
        {[18, 90, 162, 234, 306].map((deg) => (
          <path
            key={deg}
            d="M0 -2C-7 -13 -10 -21 0 -24C10 -21 7 -13 0 -2Z"
            fill="url(#petalIvory)"
            stroke="#C5A66A"
            strokeWidth="0.8"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="4.5" fill="#C5A66A" />
        <circle cx="0" cy="0" r="2.2" fill="#8B6B32" />
      </g>

      {/* Secondary Ivory Blossom 3 (at 24, 86) */}
      <g transform="translate(24, 86) scale(0.64)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d="M0 -2C-7 -13 -10 -21 0 -24C10 -21 7 -13 0 -2Z"
            fill="url(#petalIvory)"
            stroke="#C5A66A"
            strokeWidth="0.8"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="4.5" fill="#C5A66A" />
        <circle cx="0" cy="0" r="2.2" fill="#8B6B32" />
      </g>

      {/* Delicate Baby's Breath (Gypsophila) pearl clusters */}
      {[
        [118, 18, 3.2],
        [128, 24, 2.4],
        [142, 12, 2.6],
        [62, 68, 3.0],
        [74, 72, 2.2],
        [16, 120, 2.8],
        [26, 114, 2.1],
        [44, 108, 2.5],
      ].map(([cx, cy, r], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" stroke="#C5A66A" strokeWidth="0.6" />
          <circle cx={cx - 0.5} cy={cy - 0.5} r={r * 0.35} fill="#DFC48D" />
        </g>
      ))}
    </svg>
  );
};

/**
 * Symmetrical champagne-gold filigree divider.
 */
export const GoldDivider: React.FC<{ className?: string; variant?: 'simple' | 'ornate' }> = ({
  className = '',
  variant = 'ornate',
}) => {
  if (variant === 'simple') {
    return (
      <div className={`flex items-center justify-center gap-3 my-3 ${className}`} aria-hidden="true">
        <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#C5A66A]" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#AD925E]" />
        <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#C5A66A]" />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 260 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-48 h-5 mx-auto select-none ${className}`}
      aria-hidden="true"
    >
      <path d="M10 12H104" stroke="#C5A66A" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M156 12H250" stroke="#C5A66A" strokeWidth="0.9" strokeLinecap="round" />
      {/* Left curl */}
      <path
        d="M104 12C110 6 116 6 120 12C116 18 110 18 104 12Z"
        stroke="#AD925E"
        strokeWidth="1"
        fill="#C5A66A"
        fillOpacity="0.2"
      />
      {/* Right curl */}
      <path
        d="M156 12C150 6 144 6 140 12C144 18 150 18 156 12Z"
        stroke="#AD925E"
        strokeWidth="1"
        fill="#C5A66A"
        fillOpacity="0.2"
      />
      {/* Center diamond */}
      <path d="M130 5L136 12L130 19L124 12L130 5Z" fill="#AD925E" />
      <circle cx="96" cy="12" r="1.5" fill="#C5A66A" />
      <circle cx="164" cy="12" r="1.5" fill="#C5A66A" />
    </svg>
  );
};

/**
 * Botanical flourish crest used above section headers and below monograms.
 */
export const BotanicalCrest: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-24 h-7 mx-auto select-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M60 6C56 14 46 22 22 26M60 6C64 14 74 22 98 26"
      stroke="#AD925E"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <path
      d="M60 3L63 9L60 15L57 9L60 3Z"
      fill="#C5A66A"
      stroke="#8F7139"
      strokeWidth="0.7"
    />
    <path
      d="M45 18C41 13 34 12 30 15C35 20 41 20 45 18Z"
      fill="#C5A66A"
      fillOpacity="0.45"
    />
    <path
      d="M75 18C79 13 86 12 90 15C85 20 79 20 75 18Z"
      fill="#C5A66A"
      fillOpacity="0.45"
    />
    <circle cx="60" cy="24" r="2" fill="#AD925E" />
    <circle cx="48" cy="25" r="1.3" fill="#C5A66A" />
    <circle cx="72" cy="25" r="1.3" fill="#C5A66A" />
  </svg>
);

/**
 * Warm still-life vignette of an open Holy Bible, glowing pillar candle,
 * and white blossoms (matching the bottom of the Scripture card in Panel 4).
 */
export const BibleAndCandleVignette: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full overflow-hidden rounded-b-xl ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 400 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto block"
    >
      <defs>
        <radialGradient id="candleWarmGlow" cx="76%" cy="42%" r="52%">
          <stop offset="0%" stopColor="#FFF6D6" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#E6BD74" stopOpacity="0.48" />
          <stop offset="75%" stopColor="#9C7840" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#F8F3EA" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tableWoodGrad" x1="0" y1="115" x2="0" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E5D6BE" stopOpacity="0" />
          <stop offset="35%" stopColor="#C8B08A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7C5E3B" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="biblePageLeft" x1="45" y1="110" x2="175" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EFE3CE" />
          <stop offset="65%" stopColor="#FAF4E8" />
          <stop offset="100%" stopColor="#D7C39E" />
        </linearGradient>
        <linearGradient id="biblePageRight" x1="175" y1="135" x2="295" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D3BE99" />
          <stop offset="25%" stopColor="#FAF3E6" />
          <stop offset="100%" stopColor="#E6D5B8" />
        </linearGradient>
        <linearGradient id="candleBodyGrad" x1="286" y1="68" x2="334" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="55%" stopColor="#F2E5CE" />
          <stop offset="100%" stopColor="#CBB38B" />
        </linearGradient>
      </defs>

      {/* Ambient warm candlelight glow */}
      <rect width="400" height="175" fill="url(#tableWoodGrad)" />
      <circle cx="308" cy="68" r="110" fill="url(#candleWarmGlow)" />

      {/* Soft bokeh light spheres */}
      <circle cx="88" cy="54" r="14" fill="#F9E7B8" fillOpacity="0.35" />
      <circle cx="145" cy="36" r="9" fill="#F9E7B8" fillOpacity="0.28" />
      <circle cx="242" cy="42" r="16" fill="#FFECC4" fillOpacity="0.32" />
      <circle cx="356" cy="52" r="12" fill="#FFECC4" fillOpacity="0.3" />

      {/* Wax Pillar Candle on the right */}
      <path
        d="M286 78C294 81 324 81 332 78V144C324 148 294 148 286 144V78Z"
        fill="url(#candleBodyGrad)"
        stroke="#C5A66A"
        strokeWidth="0.8"
      />
      <ellipse cx="309" cy="78" rx="23" ry="4.5" fill="#FFF9EB" stroke="#DFC89C" strokeWidth="0.7" />
      {/* Candle wick & warm flame */}
      <line x1="309" y1="72" x2="309" y2="78" stroke="#49382E" strokeWidth="1.2" />
      <path
        d="M309 48C304 57 303 65 309 72C315 65 314 57 309 48Z"
        fill="#FFB838"
      />
      <path
        d="M309 53C306 59 306 65 309 70C312 65 312 59 309 53Z"
        fill="#FFFBE6"
      />

      {/* Open Holy Bible leather cover base */}
      <path
        d="M32 136L172 152L304 134L282 114L172 126L56 112L32 136Z"
        fill="#583E26"
        stroke="#3D2917"
        strokeWidth="1.2"
      />
      {/* Gold page edges */}
      <path
        d="M38 131L172 147L172 138L44 122L38 131Z"
        fill="#C9AA6E"
      />
      <path
        d="M298 130L172 147L172 138L290 121L298 130Z"
        fill="#B89758"
      />

      {/* Open Left Page */}
      <path
        d="M44 122C82 108 134 110 172 128V139C134 123 82 121 38 131L44 122Z"
        fill="url(#biblePageLeft)"
        stroke="#C5A66A"
        strokeWidth="0.7"
      />
      {/* Open Right Page */}
      <path
        d="M290 121C252 107 206 110 172 128V139C206 123 252 120 298 130L290 121Z"
        fill="url(#biblePageRight)"
        stroke="#C5A66A"
        strokeWidth="0.7"
      />

      {/* Subtle scripture lines on open Bible pages */}
      {[0, 4, 8].map((offset) => (
        <React.Fragment key={offset}>
          <path
            d={`M64 ${118 + offset}C96 ${112 + offset} 134 ${115 + offset} 162 ${125 + offset}`}
            stroke="#8B6F4E"
            strokeOpacity="0.38"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d={`M182 ${125 + offset}C210 ${115 + offset} 246 ${112 + offset} 274 ${118 + offset}`}
            stroke="#8B6F4E"
            strokeOpacity="0.38"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </React.Fragment>
      ))}

      {/* Gold ribbon bookmark */}
      <path
        d="M172 139C168 150 158 160 144 166"
        stroke="#B89249"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* White Wedding Blossoms resting beside the Bible & Candle */}
      <g transform="translate(256, 128)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d="M0 -2C-6 -11 -8 -18 0 -20C8 -18 6 -11 0 -2Z"
            fill="#FFFDF9"
            stroke="#D2B886"
            strokeWidth="0.7"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="4" fill="#C5A66A" />
      </g>
      <g transform="translate(284, 138) scale(0.78)">
        {[36, 108, 180, 252, 324].map((deg) => (
          <path
            key={deg}
            d="M0 -2C-6 -11 -8 -18 0 -20C8 -18 6 -11 0 -2Z"
            fill="#FFFDF9"
            stroke="#D2B886"
            strokeWidth="0.7"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="4" fill="#C5A66A" />
      </g>
      <g transform="translate(230, 138) scale(0.65)">
        {[18, 90, 162, 234, 306].map((deg) => (
          <path
            key={deg}
            d="M0 -2C-6 -11 -8 -18 0 -20C8 -18 6 -11 0 -2Z"
            fill="#FFFDF9"
            stroke="#D2B886"
            strokeWidth="0.7"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="4" fill="#C5A66A" />
      </g>
    </svg>
  </div>
);

/**
 * Interlocked Golden Wedding Bands on warm silk (used in Countdown & Gallery).
 */
export const GoldenWeddingBandsSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 260 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bandGold1" x1="40" y1="30" x2="150" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF0C4" />
        <stop offset="28%" stopColor="#D7B571" />
        <stop offset="60%" stopColor="#8E692C" />
        <stop offset="85%" stopColor="#E6CA8F" />
        <stop offset="100%" stopColor="#6E4F1D" />
      </linearGradient>
      <linearGradient id="bandGold2" x1="100" y1="25" x2="215" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F5DEA3" />
        <stop offset="35%" stopColor="#9C7638" />
        <stop offset="70%" stopColor="#FFF3CE" />
        <stop offset="100%" stopColor="#755522" />
      </linearGradient>
    </defs>
    {/* Soft surface shadow */}
    <ellipse cx="130" cy="88" rx="82" ry="11" fill="#1F150D" fillOpacity="0.42" />
    {/* Left wedding ring */}
    <ellipse
      cx="104"
      cy="64"
      rx="44"
      ry="20"
      transform="rotate(-8 104 64)"
      stroke="url(#bandGold1)"
      strokeWidth="9.5"
    />
    <ellipse
      cx="104"
      cy="64"
      rx="44"
      ry="20"
      transform="rotate(-8 104 64)"
      stroke="#FFF9E6"
      strokeOpacity="0.5"
      strokeWidth="1.2"
    />
    {/* Right interlocked wedding ring */}
    <ellipse
      cx="154"
      cy="62"
      rx="46"
      ry="21"
      transform="rotate(6 154 62)"
      stroke="url(#bandGold2)"
      strokeWidth="10"
    />
    <ellipse
      cx="154"
      cy="62"
      rx="46"
      ry="21"
      transform="rotate(6 154 62)"
      stroke="#FFF9E6"
      strokeOpacity="0.55"
      strokeWidth="1.2"
    />
  </svg>
);

/**
 * Chapel Emblem with Cross (matching Panel 7 Wedding Timeline header emblem).
 */
export const ChapelMedallion: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`relative w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-gradient-to-b from-[#9E814D] to-[#7C6031] p-1 shadow-[0_8px_20px_rgba(73,56,46,0.22)] ${className}`}
    aria-hidden="true"
  >
    <div className="w-full h-full rounded-full border border-[#F5E7CC]/60 flex items-center justify-center bg-gradient-to-b from-[#937542] to-[#74592C]">
      <svg viewBox="0 0 64 64" fill="none" className="w-11 h-11">
        {/* Cross on steeple */}
        <path d="M32 7V17M28 11H36" stroke="#FDFBF7" strokeWidth="2" strokeLinecap="round" />
        {/* Steeple roof */}
        <path d="M32 16L23 28H41L32 16Z" fill="#FDFBF7" />
        {/* Main church body */}
        <path d="M18 36L32 25L46 36V52H18V36Z" fill="#FDFBF7" />
        {/* Side wings */}
        <path d="M12 41L18 37V52H12V41Z" fill="#EFE5D5" />
        <path d="M52 41L46 37V52H52V41Z" fill="#EFE5D5" />
        {/* Arched sanctuary doorway */}
        <path d="M28 52V42C28 39.5 30 38 32 38C34 38 36 39.5 36 42V52H28Z" fill="#826532" />
        {/* Rose window */}
        <circle cx="32" cy="32" r="2.5" fill="#826532" />
        {/* Ground line */}
        <path d="M9 52H55" stroke="#FDFBF7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);
