import React, { useEffect, useRef } from 'react';

/**
 * Global SVG 3D Bas-Relief Lighting & Emboss Definitions.
 * Uses real Lambertian diffuse + Phong specular surface normal lighting (<feDiffuseLighting>
 * and <feSpecularLighting>) so vector rose/lace patterns render as photorealistic
 * 3D sculpted cotton paper relief matching the reference video.
 */
export const ThreeDLightingDefs: React.FC = () => (
  <svg
    width="0"
    height="0"
    className="fixed top-0 left-0 pointer-events-none opacity-0"
    aria-hidden="true"
  >
    <defs>
      {/* True 3D Bas-Relief Paper Emboss Filter */}
      <filter id="paper-bas-relief" x="-15%" y="-15%" width="130%" height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="blur" />
        <feDiffuseLighting
          in="blur"
          surfaceScale="5.5"
          diffuseConstant="1.08"
          lightingColor="#FFFDF9"
          result="diffuse"
        >
          <feDistantLight azimuth="225" elevation="46" />
        </feDiffuseLighting>
        <feSpecularLighting
          in="blur"
          surfaceScale="4.5"
          specularConstant="0.45"
          specularExponent="22"
          lightingColor="#FFF6E0"
          result="specular"
        >
          <feDistantLight azimuth="225" elevation="52" />
        </feSpecularLighting>
        <feComposite
          in="diffuse"
          in2="SourceAlpha"
          operator="in"
          result="diffuseMasked"
        />
        <feComposite
          in="specular"
          in2="SourceAlpha"
          operator="in"
          result="specularMasked"
        />
        <feMerge result="litSculpture">
          <feMergeNode in="diffuseMasked" />
          <feMergeNode in="specularMasked" />
        </feMerge>
        <feDropShadow
          dx="1.5"
          dy="2.2"
          stdDeviation="1.8"
          floodColor="#B8A68E"
          floodOpacity="0.48"
        />
      </filter>

      {/* Deep 3D Wax Seal Cushion Filter */}
      <filter id="wax-seal-3d" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow
          dx="0"
          dy="10"
          stdDeviation="9"
          floodColor="#4A3520"
          floodOpacity="0.36"
        />
        <feDropShadow
          dx="0"
          dy="3"
          stdDeviation="3"
          floodColor="#6E5233"
          floodOpacity="0.28"
        />
      </filter>

      {/* Metallic 3D Liquid Gold Foil Gradient */}
      <linearGradient id="liquidGold3D" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF5D6" />
        <stop offset="22%" stopColor="#DFC07C" />
        <stop offset="48%" stopColor="#AA8439" />
        <stop offset="72%" stopColor="#F5DF9E" />
        <stop offset="100%" stopColor="#7E5C1E" />
      </linearGradient>

      {/* Pearl-Ivory 3D Wax Gradient (matching reference video's cream-pearl seal) */}
      <radialGradient id="pearlWaxOuter" cx="35%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#F8F2E8" />
        <stop offset="72%" stopColor="#E6DAC8" />
        <stop offset="92%" stopColor="#CFC0AA" />
        <stop offset="100%" stopColor="#B8A68C" />
      </radialGradient>

      <radialGradient id="pearlWaxBasin" cx="62%" cy="65%" r="65%">
        <stop offset="0%" stopColor="#FBF7F0" />
        <stop offset="55%" stopColor="#EAE0D0" />
        <stop offset="100%" stopColor="#C9B9A1" />
      </radialGradient>
    </defs>
  </svg>
);

/**
 * Intricate 3D Bas-Relief Botanical Rose & Lace Bouquet sculpted into each envelope flap
 * (replicating the exact embossed white/ivory floral relief in frames 00:00–00:06 of the video).
 */
export const EmbossedFlapBouquet: React.FC<{
  orientation: 'top' | 'bottom' | 'left' | 'right';
  glowIntensity?: number;
}> = ({ orientation, glowIntensity = 0 }) => {
  const rotation = {
    top: 'rotate(0)',
    bottom: 'rotate(180)',
    left: 'rotate(-90)',
    right: 'rotate(90)',
  }[orientation];

  return (
    <g transform={rotation} filter="url(#paper-bas-relief)">
      {/* Central Sculpted English Rose */}
      <g transform="translate(0, -68)">
        {/* Outer rose petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <path
            key={`outer-${deg}`}
            d="M0 -6C-14 -24 -18 -38 0 -42C18 -38 14 -24 0 -6Z"
            fill="#F9F4EC"
            transform={`rotate(${deg})`}
          />
        ))}
        {/* Middle rose petals */}
        {[22, 82, 142, 202, 262, 322].map((deg) => (
          <path
            key={`mid-${deg}`}
            d="M0 -4C-10 -17 -13 -27 0 -30C13 -27 10 -17 0 -4Z"
            fill="#FCF9F4"
            transform={`rotate(${deg})`}
          />
        ))}
        {/* Inner rose bud */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path
            key={`inner-${deg}`}
            d="M0 -2C-6 -10 -8 -16 0 -18C8 -16 6 -10 0 -2Z"
            fill="#FFFFFF"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
      </g>

      {/* Left & Right Secondary Sculpted Roses */}
      {[-1, 1].map((dir) => (
        <g key={dir} transform={`translate(${dir * 52}, -88) scale(0.68)`}>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d="M0 -4C-11 -20 -15 -32 0 -36C15 -32 11 -20 0 -4Z"
              fill="#FAF5ED"
              transform={`rotate(${deg})`}
            />
          ))}
          {[30, 90, 150, 210, 270, 330].map((deg) => (
            <path
              key={`in-${deg}`}
              d="M0 -2C-7 -12 -10 -20 0 -23C10 -20 7 -12 0 -2Z"
              fill="#FFFFFF"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
        </g>
      ))}

      {/* Sculpted Baroque Acanthus Scrolls & Olive Leaves */}
      {[-1, 1].map((dir) => (
        <g key={`vines-${dir}`} transform={`scale(${dir}, 1)`}>
          {/* Stem scroll toward the wax seal apex */}
          <path
            d="M0 -28C14 -38 26 -52 34 -72C42 -92 64 -108 92 -118"
            stroke="#FAF5ED"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Leaf pairs along stem */}
          <path
            d="M12 -36C24 -34 32 -26 28 -18C18 -20 12 -28 12 -36Z"
            fill="#FBF7F0"
          />
          <path
            d="M22 -52C36 -52 46 -42 42 -32C30 -34 22 -42 22 -52Z"
            fill="#FBF7F0"
          />
          <path
            d="M36 -112C48 -126 66 -130 74 -120C62 -110 46 -108 36 -112Z"
            fill="#FBF7F0"
          />
          <path
            d="M72 -96C88 -102 104 -96 106 -84C92 -80 78 -86 72 -96Z"
            fill="#FBF7F0"
          />
          {/* Raised pearl dots */}
          <circle cx="18" cy="-22" r="3" fill="#FFFFFF" />
          <circle cx="28" cy="-38" r="2.6" fill="#FFFFFF" />
          <circle cx="45" cy="-58" r="3.2" fill="#FFFFFF" />
          <circle cx="84" cy="-76" r="3.5" fill="#FFFFFF" />
          <circle cx="62" cy="-126" r="3" fill="#FFFFFF" />
        </g>
      ))}

      {/* Golden Awakening Veins (visible when wax seal is tapped, 00:02-00:05 in video) */}
      {glowIntensity > 0 && (
        <g opacity={glowIntensity}>
          <path
            d="M0 -18C-8 -36 -18 -48 -32 -60M0 -18C8 -36 18 -48 32 -60M0 -18V-58"
            stroke="url(#liquidGold3D)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
};

/**
 * 3D Sculpted Pearl-Ivory & Liquid Gold Wax Seal (matching 00:01–00:07 of the reference video).
 * Features:
 * - Organic 3D sculpted cream-ivory wax outer cushion
 * - Animated golden light ring that traces around the inner basin when tapped
 * - Golden botanical leaves that sprout from behind the seal (00:02–00:04 in video)
 * - Raised 3D metallic gold "A&K" calligraphy monogram
 */
export const ThreeDWaxSeal: React.FC<{
  monogram?: string;
  stage: 'idle' | 'awakening' | 'seams-glowing' | 'opening' | 'opened';
  onTap: () => void;
}> = ({ monogram = 'A&K', stage, onTap }) => {
  const isAwake = stage !== 'idle';
  const showGoldenLeaves =
    stage === 'awakening' || stage === 'seams-glowing' || stage === 'opening';

  return (
    <div
      onClick={onTap}
      role="button"
      tabIndex={0}
      aria-label="Tap wax seal to open wedding invitation"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTap();
        }
      }}
      className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center cursor-pointer select-none group"
    >
      {/* Warm volumetric golden core light behind the seal (00:04–00:07 in video) */}
      <div
        className={`pointer-events-none absolute -inset-12 rounded-full transition-all duration-1000 ${
          stage === 'seams-glowing' || stage === 'opening'
            ? 'opacity-100 scale-125'
            : stage === 'awakening'
            ? 'opacity-80 scale-105'
            : 'opacity-0 scale-75'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(255,248,220,0.98) 0%, rgba(245,208,125,0.75) 38%, rgba(212,163,73,0.28) 68%, transparent 100%)',
          filter: 'blur(8px)',
        }}
        aria-hidden="true"
      />

      {/* Golden Botanical Leaves Sprouting Above & Below the Wax Seal (00:02–00:04 in video) */}
      <svg
        viewBox="0 0 240 280"
        fill="none"
        className={`pointer-events-none absolute w-56 h-64 transition-all duration-1000 ease-out ${
          showGoldenLeaves
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-75'
        }`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sproutGold" x1="120" y1="0" x2="120" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF4CC" />
            <stop offset="50%" stopColor="#D8B162" />
            <stop offset="100%" stopColor="#9E7730" />
          </linearGradient>
        </defs>
        {/* Top sprouting golden fern/olive branch */}
        <g className="origin-center">
          <path
            d="M120 82C120 55 112 32 98 14M120 82C124 56 134 35 146 18"
            stroke="url(#sproutGold)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M115 58C102 52 94 42 98 34C108 38 114 48 115 58Z" fill="url(#sproutGold)" fillOpacity="0.85" />
          <path d="M124 54C136 48 144 38 140 30C130 34 125 44 124 54Z" fill="url(#sproutGold)" fillOpacity="0.85" />
          <path d="M108 36C96 30 90 20 94 12C104 16 108 26 108 36Z" fill="url(#sproutGold)" fillOpacity="0.9" />
          <path d="M132 36C144 30 150 20 146 12C136 16 132 26 132 36Z" fill="url(#sproutGold)" fillOpacity="0.9" />
        </g>
        {/* Bottom sprouting golden fern/olive branch */}
        <g className="origin-center">
          <path
            d="M120 198C120 225 112 248 98 266M120 198C124 224 134 245 146 262"
            stroke="url(#sproutGold)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M115 222C102 228 94 238 98 246C108 242 114 232 115 222Z" fill="url(#sproutGold)" fillOpacity="0.85" />
          <path d="M124 226C136 232 144 242 140 250C130 246 125 236 124 226Z" fill="url(#sproutGold)" fillOpacity="0.85" />
          <path d="M108 244C96 250 90 260 94 268C104 264 108 254 108 244Z" fill="url(#sproutGold)" fillOpacity="0.9" />
          <path d="M132 244C144 250 150 260 146 268C136 264 132 254 132 244Z" fill="url(#sproutGold)" fillOpacity="0.9" />
        </g>
      </svg>

      {/* Main 3D Pearl-Ivory & Gold Wax Seal SVG */}
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 w-full h-full transition-transform duration-500 ${
          stage === 'awakening'
            ? 'scale-95'
            : 'group-hover:scale-103 group-active:scale-95'
        }`}
        filter="url(#wax-seal-3d)"
      >
        {/* Outer Organic 3D Pearl-Ivory Wax Rim */}
        <path
          d="M80 10C94 9.5 106 14 118 20.5C130 27 140 37 145.5 49.5C151 62 152.5 75.5 151 89C149.5 102.5 145 115.5 136.5 126C128 136.5 116 145 103 149.5C90 154 76 155 62.5 152C49 149 35.5 142.5 25.5 132.5C15.5 122.5 9.5 109.5 7.2 96C4.9 82.5 6.5 68 12 55C17.5 42 26.5 30 38 21.8C49.5 13.6 66 10.5 80 10Z"
          fill="url(#pearlWaxOuter)"
          stroke="#DFD3C0"
          strokeWidth="1.2"
        />

        {/* 3D Inner Cushion Highlight Bevel */}
        <path
          d="M80 15C93 14.6 104 18.8 115 24.8C126 30.8 135 40 140 51.5C145 63 146.5 75.5 145 88C143.5 100.5 139.5 112.5 131.5 122C123.5 131.5 112.5 139.5 100.5 143.5C88.5 147.5 75.5 148.5 63 145.5C50.5 142.5 38 136.5 29 127.5C20 118.5 14.5 106.5 12.5 94C10.5 81.5 12 68 17 56C22 44 30 33 40.5 25.5C51 18 67 15.4 80 15Z"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeOpacity="0.9"
          fill="none"
        />

        {/* Recessed Inner Wax Basin */}
        <circle
          cx="80"
          cy="80"
          r="50"
          fill="url(#pearlWaxBasin)"
          stroke="#D5C6B0"
          strokeWidth="2.5"
        />

        {/* Inner Rim Shadow for 3D Depth */}
        <circle
          cx="80"
          cy="80"
          r="48.5"
          stroke="#B5A38A"
          strokeWidth="1.5"
          strokeOpacity="0.65"
          fill="none"
        />

        {/* Animated Glowing Liquid-Gold Ring (00:01–00:05 in video) */}
        <circle
          cx="80"
          cy="80"
          r="50"
          stroke="url(#liquidGold3D)"
          strokeWidth={isAwake ? '4' : '1.8'}
          strokeDasharray="315"
          strokeDashoffset={isAwake ? '0' : '220'}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Subtle Christian Cross Motif at Top of Seal Basin */}
        <path
          d="M80 39V47M77 42.5H83"
          stroke="url(#liquidGold3D)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 3D Cast Shadow of "A&K" Monogram */}
        <text
          x="81.2"
          y="92.5"
          textAnchor="middle"
          fill="#9E8B70"
          fillOpacity="0.65"
          fontFamily="'Great Vibes', 'Cormorant Garamond', cursive"
          fontSize="40"
        >
          {monogram}
        </text>

        {/* Raised 3D Metallic Gold "A&K" Monogram */}
        <text
          x="80"
          y="91"
          textAnchor="middle"
          fill="url(#liquidGold3D)"
          fontFamily="'Great Vibes', 'Cormorant Garamond', cursive"
          fontSize="40"
          stroke="#9B752F"
          strokeWidth="0.4"
        >
          {monogram}
        </text>
      </svg>
    </div>
  );
};

/**
 * 60fps HTML5 Canvas Golden Fairy-Dust & Seam Sparkle Particle System
 * Replicates the exact golden light particles traveling along the 4 diagonal seams
 * (00:02–00:06 in the video) and floating gently in the archway scene (00:07–00:10).
 */
export const GoldenParticleCanvas: React.FC<{
  mode: 'idle' | 'seams' | 'ambient';
  className?: string;
}> = ({ mode, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      twinkleSpeed: number;
      phase: number;
      seamIndex?: number;
      progress?: number;
    }

    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 390;
    const h = rect.height || 800;
    const cx = w / 2;
    const cy = h / 2;

    const corners = [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: 0, y: h },
      { x: w, y: h },
    ];

    const particleCount = mode === 'seams' ? 75 : mode === 'ambient' ? 42 : 18;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const seamIdx = i % 4;
      const prog = Math.random();
      if (mode === 'seams') {
        const corner = corners[seamIdx];
        return {
          x: cx + (corner.x - cx) * prog + (Math.random() - 0.5) * 18,
          y: cy + (corner.y - cy) * prog + (Math.random() - 0.5) * 18,
          vx: (corner.x - cx) * 0.006,
          vy: (corner.y - cy) * 0.006,
          size: 1.5 + Math.random() * 2.8,
          alpha: 0.35 + Math.random() * 0.65,
          twinkleSpeed: 0.04 + Math.random() * 0.06,
          phase: Math.random() * Math.PI * 2,
          seamIndex: seamIdx,
          progress: prog,
        };
      }
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.25 - Math.random() * 0.45,
        size: 1.2 + Math.random() * 2.5,
        alpha: 0.25 + Math.random() * 0.6,
        twinkleSpeed: 0.025 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.phase += p.twinkleSpeed;
        const currentAlpha = p.alpha * (0.55 + 0.45 * Math.sin(p.phase));

        if (mode === 'seams' && p.seamIndex !== undefined && p.progress !== undefined) {
          p.progress += 0.009;
          if (p.progress > 1) p.progress = 0.04;
          const corner = corners[p.seamIndex];
          p.x =
            cx +
            (corner.x - cx) * p.progress +
            Math.sin(p.phase * 1.5) * 8;
          p.y =
            cy +
            (corner.y - cy) * p.progress +
            Math.cos(p.phase * 1.5) * 8;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) p.y = h + 10;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        }

        // Outer warm golden glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.2);
        grad.addColorStop(0, `rgba(255, 250, 224, ${currentAlpha})`);
        grad.addColorStop(0.45, `rgba(235, 194, 108, ${currentAlpha * 0.65})`);
        grad.addColorStop(1, 'rgba(212, 162, 68, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Crisp star core
        ctx.fillStyle = `rgba(255, 255, 245, ${Math.min(1, currentAlpha * 1.2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
