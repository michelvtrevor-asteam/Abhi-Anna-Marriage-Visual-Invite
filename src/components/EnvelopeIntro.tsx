import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { Procedural3DWaxSeal } from './Procedural3DWaxSeal';
import {
  ChristianCross,
  FloralCorner,
  BotanicalCrest,
  GoldDivider,
} from './StationeryOrnaments';

export type Envelope3DStage =
  | 'closed'       // Stage A: Closed 3D envelope resting at a dimensional camera angle
  | 'seal-break'   // Stage B: Wax seal depresses, catches light, and releases from clasp
  | 'flap-open'    // Stage C: 3D top flap rotates 172deg around its upper fold hinge
  | 'card-emerge'  // Stage D: Invitation card slides upward out of the pocket (occluded by front flaps)
  | 'card-present' // Stage E: Card moves forward in Z-space into readable presentation
  | 'complete';

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<Envelope3DStage>('closed');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // Subtle interactive touch/pointer tilt so the user feels the 3D object depth immediately
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const isAnimatingRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => {
      mq.removeEventListener('change', handler);
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (stage !== 'closed' || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({
      rx: -normY * 4.5,
      ry: normX * 6.5,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const handleStartOpeningSequence = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setTilt({ rx: 0, ry: 0 });

    if (prefersReducedMotion) {
      setStage('card-present');
      const t = window.setTimeout(() => {
        setStage('complete');
        onComplete();
      }, 450);
      timersRef.current.push(t);
      return;
    }

    // Stage B (0ms – 720ms): Break the wax seal
    setStage('seal-break');

    // Stage C (720ms – 1750ms): Rotate the 3D top flap around its upper fold
    const t1 = window.setTimeout(() => {
      setStage('flap-open');
    }, 720);

    // Stage D (1750ms – 3050ms): Slide the separate invitation card upward from inside the pocket
    const t2 = window.setTimeout(() => {
      setStage('card-emerge');
    }, 1750);

    // Stage E (3050ms – 4250ms): Move the card forward in Z-space into readable position
    const t3 = window.setTimeout(() => {
      setStage('card-present');
    }, 3050);

    // Complete transition into full scrollable invitation
    const t4 = window.setTimeout(() => {
      setStage('complete');
      onComplete();
    }, 4400);

    timersRef.current.push(t1, t2, t3, t4);
  };

  const handleSkipIntro = (e: React.MouseEvent) => {
    e.stopPropagation();
    timersRef.current.forEach((id) => window.clearTimeout(id));
    isAnimatingRef.current = true;
    setStage('complete');
    onComplete();
  };

  const isFlapOpen =
    stage === 'flap-open' ||
    stage === 'card-emerge' ||
    stage === 'card-present' ||
    stage === 'complete';

  const isCardEmerging =
    stage === 'card-emerge' || stage === 'card-present' || stage === 'complete';

  const isCardPresented = stage === 'card-present' || stage === 'complete';

  // Compute the 3D camera transform of the physical envelope assembly
  const getEnvelopeRigTransform = (): string => {
    if (stage === 'closed') {
      const rx = 15 + tilt.rx;
      const ry = -8 + tilt.ry;
      return `translate3d(0px, 0px, 0px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(-1.4deg)`;
    }
    if (stage === 'seal-break') {
      return 'translate3d(0px, 4px, 12px) rotateX(13deg) rotateY(-2deg) rotateZ(0deg)';
    }
    if (stage === 'flap-open') {
      return 'translate3d(0px, 24px, 6px) rotateX(15deg) rotateY(0deg) rotateZ(0deg)';
    }
    if (stage === 'card-emerge') {
      return 'translate3d(0px, 118px, -32px) rotateX(20deg) rotateY(0deg) rotateZ(0deg)';
    }
    // Stage E ('card-present' | 'complete'): Envelope rests lower/behind while card comes forward
    return 'translate3d(0px, 145px, -65px) rotateX(24deg) rotateY(0deg) rotateZ(0deg)';
  };

  // Compute the 3D transform of the separate Invitation Card inside/emerging from the pocket
  const getInvitationCardTransform = (): string => {
    if (stage === 'closed' || stage === 'seal-break' || stage === 'flap-open') {
      // Tucked physically inside the envelope pocket at Z = +9px
      // (in front of back wall Z=0px, behind side flaps Z=15px & front pocket Z=19px)
      return 'translate3d(0px, 8px, 9px) rotateX(0deg) scale(0.95)';
    }
    if (stage === 'card-emerge') {
      // Slides upward out of the pocket along the envelope plane so bottom clears the pocket lip
      return 'translate3d(0px, -215px, 12px) rotateX(-3deg) scale(0.98)';
    }
    // Stage E ('card-present' | 'complete'): Moves forward in Z-space (Z = +62px > front pocket Z=19px)
    // and counter-rotates X (-24deg) so it faces the reader squarely and legibly!
    return 'translate3d(0px, -135px, 64px) rotateX(-24deg) scale(1.04)';
  };

  const statusCaption = {
    closed: 'Tap the A&K wax seal to break the seal',
    'seal-break': 'Breaking the wax seal...',
    'flap-open': 'Opening the envelope...',
    'card-emerge': 'Drawing your invitation from the pocket...',
    'card-present': 'With God’s blessings, welcome...',
    complete: 'With God’s blessings, welcome...',
  }[stage];

  return (
    <section
      aria-label="3D Interactive Wedding Invitation Envelope"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center overflow-hidden select-none px-4 py-4"
      style={{
        background:
          'radial-gradient(circle at 38% 18%, #FFFDF9 0%, #F4EBDD 42%, #E1D1B8 82%, #CDB898 100%)',
      }}
    >
      {/* Directional Studio Sunlight Beam & Subtle Tabletop Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,253,245,0.75) 0%, rgba(255,248,228,0.18) 45%, rgba(68,48,28,0.18) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Outer Stationery Border & Tabletop Botanical Corners */}
      <div
        className="pointer-events-none absolute inset-2.5 border border-[#C5A66A]/45 rounded-2xl"
        aria-hidden="true"
      />
      <FloralCorner
        position="top-left"
        className="w-32 h-32 absolute top-1 left-1 z-10 opacity-90"
      />
      <FloralCorner
        position="top-right"
        className="w-28 h-28 absolute top-1 right-1 z-10 opacity-75"
      />
      <FloralCorner
        position="bottom-left"
        className="w-32 h-32 absolute bottom-1 left-1 z-10 opacity-90"
      />
      <FloralCorner
        position="bottom-right"
        className="w-32 h-32 absolute bottom-1 right-1 z-10 opacity-90"
      />

      {/* Top Bar: Discreet Skip Intro Button */}
      <div className="relative z-30 w-full flex items-center justify-between px-1">
        <span className="font-heading text-[11px] tracking-[0.22em] uppercase text-[#6E5849] font-semibold">
          {weddingConfig.monogram} · 28 NOV 2026
        </span>
        <button
          type="button"
          onClick={handleSkipIntro}
          className="min-h-[44px] px-3 py-1 text-[11px] font-body tracking-[0.18em] uppercase text-[#6E5849] hover:text-[#49382E] focus-visible:outline-2 focus-visible:outline-[#AD925E] rounded-md transition-colors cursor-pointer"
        >
          Skip Intro
        </button>
      </div>

      {/* Top Salutation Header (Recedes gently as the 3D flap & card rise) */}
      <div
        className={`relative z-20 text-center transition-all duration-700 px-2 -mt-2 ${
          isFlapOpen
            ? 'opacity-0 -translate-y-4 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <ChristianCross size="sm" className="mb-1" />
        <p className="font-heading text-xs sm:text-[13px] tracking-[0.24em] uppercase text-[#49382E] font-semibold embossed-text">
          {weddingConfig.envelopeCopy.salutation}
        </p>
        <BotanicalCrest className="mt-0.5 opacity-85" />
      </div>

      {/* =====================================================================
          CENTRAL 3D VIEWPORT & MULTI-PLANAR ENVELOPE ASSEMBLY
         ===================================================================== */}
      <div className="relative z-20 w-full max-w-[356px] my-auto flex flex-col items-center justify-center scene-3d-viewport py-4">
        {/* THE 3D ENVELOPE RIG (preserve-3d) */}
        <div
          className="relative w-full h-[256px] sm:h-[268px] preserve-3d transition-transform duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: getEnvelopeRigTransform(),
          }}
        >
          {/* -----------------------------------------------------------------
              PLANE 0 (Z = -28px & -12px): TABLETOP CONTACT SHADOW & AMBIENT OCCLUSION
             ----------------------------------------------------------------- */}
          {/* Wide soft directional table penumbra shadow */}
          <div
            className="pointer-events-none absolute -inset-x-4 -bottom-6 top-4 rounded-2xl bg-[#3A2818]/32 blur-2xl transition-all duration-700"
            style={{ transform: 'translate3d(10px, 16px, -28px)' }}
            aria-hidden="true"
          />
          {/* Tight ambient occlusion contact shadow directly beneath envelope edges */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl bg-[#2D1E10]/42 blur-md transition-all duration-700"
            style={{ transform: 'translate3d(4px, 7px, -10px)' }}
            aria-hidden="true"
          />

          {/* -----------------------------------------------------------------
              PHYSICAL 3D EXTRUDED CARDSTOCK THICKNESS WALLS (7px Depth)
             ----------------------------------------------------------------- */}
          {/* Bottom 3D Thickness Wall (Visible because envelope is tilted at +15deg X) */}
          <div
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-[7px] origin-bottom"
            style={{
              transform: 'rotateX(-90deg)',
              background:
                'linear-gradient(90deg, #B8A386 0%, #D9C9B0 50%, #AE987A 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 1px rgba(58,40,22,0.45)',
            }}
            aria-hidden="true"
          />
          {/* Left 3D Thickness Wall (Visible because envelope is tilted at -8deg Y) */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-[7px] origin-left"
            style={{
              transform: 'rotateY(-90deg)',
              background:
                'linear-gradient(180deg, #F5EFE4 0%, #E2D4BE 55%, #C9B699 100%)',
              boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.85)',
            }}
            aria-hidden="true"
          />
          {/* Right 3D Thickness Wall */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 right-0 w-[7px] origin-right"
            style={{
              transform: 'rotateY(90deg)',
              background:
                'linear-gradient(180deg, #C9B598 0%, #B39D7E 55%, #9B8566 100%)',
            }}
            aria-hidden="true"
          />

          {/* -----------------------------------------------------------------
              PLANE 1 (Z = 0px): ENVELOPE BACK WALL & CHAMPAGNE-GOLD INTERIOR LINING
             ----------------------------------------------------------------- */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden border border-[#C5A66A]/75"
            style={{
              transform: 'translateZ(0px)',
              background:
                'linear-gradient(180deg, #C9AC74 0%, #AE8D52 42%, #8A6B32 100%)',
              boxShadow: 'inset 0 16px 32px rgba(42, 28, 12, 0.48)',
            }}
          >
            {/* Subtle metallic foil damask pattern inside the envelope pocket */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 35%, #FFF8E7 1.2px, transparent 1.8px), radial-gradient(circle at 25% 70%, #FFF8E7 1.2px, transparent 1.8px), radial-gradient(circle at 75% 70%, #FFF8E7 1.2px, transparent 1.8px)',
                backgroundSize: '26px 26px',
              }}
              aria-hidden="true"
            />
            {/* Inner gold border line inside the back wall */}
            <div
              className="absolute inset-2.5 border border-[#F5E4BE]/40 rounded-lg pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* -----------------------------------------------------------------
              PLANE 2 (Z = +9px -> +64px): THE SEPARATE PHYSICAL INVITATION CARD
              Initially tucked inside the pocket (between Back Wall Z=0 and Pocket Flaps Z=15..19px)
             ----------------------------------------------------------------- */}
          <div
            className="absolute left-3.5 right-3.5 -top-3 bottom-2 rounded-xl paper-grain preserve-3d transition-transform duration-[1150ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: getInvitationCardTransform(),
              boxShadow: isCardPresented
                ? '0 2px 0 0 #E0D2BC, 0 3.5px 0 0 #C8B598, 0 28px 55px -10px rgba(42, 28, 14, 0.48), inset 0 1.5px 0 rgba(255, 255, 255, 0.95)'
                : '0 1.5px 0 0 #DFD1BA, 0 12px 24px -4px rgba(42, 28, 14, 0.36), inset 0 1.5px 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Double embossed champagne-gold foil border on the physical card */}
            <div
              className="pointer-events-none absolute inset-2 border border-[#C5A66A]/80 rounded-lg"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-3 border border-[#C5A66A]/35 rounded-md"
              aria-hidden="true"
            />

            {/* Corner botanical ornaments on the card */}
            <FloralCorner
              position="top-left"
              className="w-16 h-16 absolute top-0.5 left-0.5 opacity-85"
            />
            <FloralCorner
              position="top-right"
              className="w-16 h-16 absolute top-0.5 right-0.5 opacity-85"
            />

            {/* Golden specular sheen across the card when presented in Stage E */}
            {isCardPresented && (
              <div
                className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden z-20"
                aria-hidden="true"
              >
                <div className="w-2/3 h-full bg-gradient-to-r from-transparent via-[#FFFDF9]/80 to-transparent animate-gold-sweep" />
              </div>
            )}

            {/* Physical Invitation Card Typography */}
            <div className="relative z-10 h-full flex flex-col items-center justify-between text-center px-4 py-3.5">
              <div>
                <ChristianCross size="sm" className="mb-0.5 scale-90" />
                <p className="font-heading text-[9px] tracking-[0.22em] uppercase text-[#6E5849] font-semibold">
                  {weddingConfig.invitationCopy.blessingHeader}
                </p>
                <p className="font-heading italic text-[11px] text-[#5C473A]">
                  {weddingConfig.invitationCopy.familiesLine}
                </p>
              </div>

              <div className="my-auto py-1">
                <h1 className="font-heading text-xl sm:text-2xl tracking-[0.15em] uppercase text-[#49382E] font-semibold embossed-text leading-tight">
                  {weddingConfig.groom}
                </h1>
                <span className="block font-heading italic text-sm text-[#9C7E44] my-0.5">
                  &amp;
                </span>
                <h1 className="font-heading text-xl sm:text-2xl tracking-[0.15em] uppercase text-[#49382E] font-semibold embossed-text leading-tight">
                  {weddingConfig.bride}
                </h1>

                <div className="mt-1.5 flex items-center justify-center gap-2">
                  <span className="h-[1px] w-7 bg-[#C5A66A]" />
                  <span className="font-heading text-[11px] tracking-[0.2em] text-[#8E6F36] font-semibold">
                    {weddingConfig.monogram}
                  </span>
                  <span className="h-[1px] w-7 bg-[#C5A66A]" />
                </div>
              </div>

              <div>
                <p className="font-heading text-[11px] tracking-[0.14em] uppercase text-[#49382E] font-semibold">
                  {weddingConfig.date.fullDisplay} · {weddingConfig.date.timeDisplay}
                </p>
                <p className="font-body text-[10px] text-[#6E5849] mt-0.5">
                  {weddingConfig.venue.name}, Raichur
                </p>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              PLANE 3A (Z = +14px): FOLDED LEFT SIDE FLAP
             ----------------------------------------------------------------- */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ transform: 'translateZ(14px)' }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 360 268"
              fill="none"
              className="w-full h-full drop-shadow-[4px_2px_7px_rgba(52,36,20,0.22)]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="sideFlapLeftGrad" x1="0" y1="134" x2="195" y2="134" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FBF7F0" />
                  <stop offset="68%" stopColor="#F1E7D7" />
                  <stop offset="100%" stopColor="#E2D3BC" />
                </linearGradient>
              </defs>
              <path
                d="M0 4L188 138L0 266V4Z"
                fill="url(#sideFlapLeftGrad)"
                stroke="#C5A66A"
                strokeWidth="1"
              />
              {/* 1.5px physical paper thickness bevel along diagonal cut edge */}
              <path
                d="M1 6L185 138L1 264"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeOpacity="0.92"
              />
              {/* Subtle letterpress botanical embossing on left side flap */}
              <circle cx="48" cy="136" r="16" stroke="#FFFFFF" strokeWidth="1" fill="#FAF4E8" fillOpacity="0.5" />
              <path d="M28 102C46 116 56 126 56 136C56 146 46 156 28 170" stroke="#DFCDAE" strokeWidth="1" />
            </svg>
          </div>

          {/* -----------------------------------------------------------------
              PLANE 3B (Z = +16px): FOLDED RIGHT SIDE FLAP
             ----------------------------------------------------------------- */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ transform: 'translateZ(16px)' }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 360 268"
              fill="none"
              className="w-full h-full drop-shadow-[-4px_2px_7px_rgba(52,36,20,0.22)]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="sideFlapRightGrad" x1="360" y1="134" x2="165" y2="134" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F6EFE3" />
                  <stop offset="68%" stopColor="#ECE0CC" />
                  <stop offset="100%" stopColor="#DDD0B8" />
                </linearGradient>
              </defs>
              <path
                d="M360 4L172 138L360 266V4Z"
                fill="url(#sideFlapRightGrad)"
                stroke="#C5A66A"
                strokeWidth="1"
              />
              {/* 1.5px physical paper thickness bevel along diagonal cut edge */}
              <path
                d="M359 6L175 138L359 264"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeOpacity="0.85"
              />
              <circle cx="312" cy="136" r="16" stroke="#FFFFFF" strokeWidth="1" fill="#FAF4E8" fillOpacity="0.5" />
              <path d="M332 102C314 116 304 126 304 136C304 146 314 156 332 170" stroke="#DFCDAE" strokeWidth="1" />
            </svg>
          </div>

          {/* -----------------------------------------------------------------
              PLANE 4 (Z = +19px): SEPARATE BOTTOM FRONT POCKET FLAP
             ----------------------------------------------------------------- */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ transform: 'translateZ(19px)' }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 360 268"
              fill="none"
              className="w-full h-full drop-shadow-[0_-5px_10px_rgba(56,38,20,0.22)]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="frontPocketBottomGrad" x1="180" y1="115" x2="180" y2="268" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFDF9" />
                  <stop offset="42%" stopColor="#F7F0E4" />
                  <stop offset="100%" stopColor="#E7DAC6" />
                </linearGradient>
              </defs>
              <path
                d="M0 268L162 124C172 115 188 115 198 124L360 268H0Z"
                fill="url(#frontPocketBottomGrad)"
                stroke="#C5A66A"
                strokeWidth="1.3"
              />
              {/* Crisp 2px sunlit cardstock edge bevel along top of pocket flap */}
              <path
                d="M4 268L164 127C173 119 187 119 196 127L356 268"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {/* Fine champagne-gold hot-foil inner trim on lower pocket */}
              <path
                d="M16 262L168 134C175 128 185 128 192 134L344 262"
                stroke="#C5A66A"
                strokeOpacity="0.55"
                strokeWidth="0.9"
              />
            </svg>

            {/* Embossed Letterpress Calligraphy on the Lower Front Pocket */}
            <div className="absolute inset-x-0 bottom-3.5 flex flex-col items-center text-center px-6">
              <p className="font-heading italic text-sm text-[#5C4735] embossed-text">
                {weddingConfig.envelopeCopy.subtitlePrefix}
              </p>
              <p className="font-script text-2xl sm:text-[27px] text-[#49382E] leading-tight embossed-text">
                {weddingConfig.envelopeCopy.subtitleScript}
              </p>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              DYNAMIC 3D CAST SHADOW FROM TOP FLAP ONTO POCKET (Z = +20px)
             ----------------------------------------------------------------- */}
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-[62%] transition-all duration-700 ${
              isFlapOpen
                ? 'opacity-0 -translate-y-6 scale-y-50'
                : stage === 'seal-break'
                ? 'opacity-55 translate-y-3'
                : 'opacity-85 translate-y-1.5'
            }`}
            style={{ transform: 'translateZ(20px)' }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 360 165" fill="none" className="w-full h-full blur-[5px]" preserveAspectRatio="none">
              <path
                d="M6 0H354L198 152C188 162 172 162 162 152L6 0Z"
                fill="rgba(48, 32, 16, 0.34)"
              />
            </svg>
          </div>

          {/* -----------------------------------------------------------------
              PLANE 5 (Z = +22px, transform-origin: top center):
              THE 3D HINGED TOP OPENING FLAP (Double-Sided 3D Mesh)
             ----------------------------------------------------------------- */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[60%] origin-top preserve-3d transition-transform duration-[980ms] ease-[cubic-bezier(0.32,0.08,0.24,1)]"
            style={{
              transform: isFlapOpen
                ? 'translateZ(22px) rotateX(172deg)'
                : stage === 'seal-break'
                ? 'translateZ(22px) rotateX(14deg)'
                : 'translateZ(22px) rotateX(0deg)',
            }}
          >
            {/* OUTER FACE OF TOP FLAP (Visible when closed, 0deg to 90deg) */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ transform: 'translateZ(1px)' }}
            >
              <svg
                viewBox="0 0 360 162"
                fill="none"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="topFlapOuter3D" x1="180" y1="0" x2="180" y2="162" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFDF9" />
                    <stop offset="55%" stopColor="#F5EDE0" />
                    <stop offset="100%" stopColor="#E5D6BE" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 0H360L198 148C188 158 172 158 162 148L0 0Z"
                  fill="url(#topFlapOuter3D)"
                  stroke="#C5A66A"
                  strokeWidth="1.4"
                />
                {/* Physical 2px cardstock edge bevel along V-flap */}
                <path
                  d="M4 1H356L196 145C187 153 173 153 164 145L4 1Z"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                {/* Inner champagne-gold foil border on top flap */}
                <path
                  d="M16 4H344L192 138C185 144 175 144 168 138L16 4Z"
                  stroke="#C5A66A"
                  strokeOpacity="0.6"
                  strokeWidth="0.9"
                />
                {/* Embossed Christian Cross & Botanical Lace Medallion on Outer Top Flap */}
                <g opacity="0.78">
                  <circle cx="180" cy="54" r="22" fill="#FAF4E8" stroke="#D5C09A" strokeWidth="1" />
                  <circle cx="180" cy="54" r="16" stroke="#FFFFFF" strokeWidth="1.2" />
                  <path d="M180 42V66M172 50H188" stroke="#9E7D43" strokeWidth="1.6" strokeLinecap="round" />
                  <path
                    d="M126 38C144 50 156 54 180 54C204 54 216 50 234 38"
                    stroke="#D5C09A"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>

            {/* INNER LINING FACE OF TOP FLAP (Visible when rotated open > 90deg to 172deg) */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ transform: 'rotateX(180deg) translateZ(1px)' }}
            >
              <svg
                viewBox="0 0 360 162"
                fill="none"
                className="w-full h-full drop-shadow-[0_-8px_16px_rgba(48,32,16,0.22)]"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="topFlapInnerGold3D" x1="180" y1="162" x2="180" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E6CFA1" />
                    <stop offset="48%" stopColor="#C4A366" />
                    <stop offset="100%" stopColor="#9C7B3E" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 0H360L198 148C188 158 172 158 162 148L0 0Z"
                  fill="url(#topFlapInnerGold3D)"
                  stroke="#C5A66A"
                  strokeWidth="1.4"
                />
                {/* Fine gold filigree frame inside opened flap */}
                <path
                  d="M16 5H344L192 138C185 144 175 144 168 138L16 5Z"
                  stroke="#FFF7E2"
                  strokeOpacity="0.65"
                  strokeWidth="1.1"
                />
                <circle cx="180" cy="72" r="16" stroke="#FFF7E2" strokeOpacity="0.55" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              PLANE 6 (Z = +28px): PHYSICAL 3D SCULPTED CHAMPAGNE-GOLD WAX SEAL
              Sits over the clasp in Stage A; depresses & releases in Stage B
             ----------------------------------------------------------------- */}
          <div
            className={`absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 preserve-3d transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isFlapOpen
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100 pointer-events-auto'
            }`}
            style={{
              transform:
                stage === 'seal-break'
                  ? 'translate3d(0px, 16px, 35px) rotateX(-24deg) scale(0.92)'
                  : isFlapOpen
                  ? 'translate3d(0px, 34px, 42px) rotateX(-35deg) scale(0.75)'
                  : 'translate3d(0px, 0px, 28px) rotateX(0deg) scale(1)',
            }}
          >
            <Procedural3DWaxSeal
              monogram={weddingConfig.envelopeCopy.monogram}
              isBreaking={stage === 'seal-break'}
              lightAngleDeg={-45 + tilt.ry * 2}
              onClick={handleStartOpeningSequence}
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          BOTTOM TOUCH CONTROLS & LIVE STAGE FEEDBACK
         ===================================================================== */}
      <div className="relative z-30 w-full max-w-[356px] flex flex-col items-center text-center pb-2">
        <p
          className="font-heading italic text-sm sm:text-[15px] text-[#5C4735] mb-3 flex items-center justify-center gap-1.5"
          aria-live="polite"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#9E7D43]" aria-hidden="true" />
          <span>{statusCaption}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#9E7D43]" aria-hidden="true" />
        </p>

        <button
          type="button"
          onClick={handleStartOpeningSequence}
          disabled={stage !== 'closed'}
          className={`btn-luxury-gold min-h-[48px] px-7 py-3 rounded-full inline-flex items-center justify-center gap-2 text-xs sm:text-[13px] font-body font-medium tracking-[0.16em] uppercase whitespace-nowrap shrink-0 cursor-pointer transition-opacity duration-500 ${
            stage !== 'closed' ? 'opacity-50 pointer-events-none' : 'opacity-100'
          }`}
        >
          <span>{weddingConfig.envelopeCopy.ctaLabel}</span>
          <ChevronRight className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
        </button>

        <GoldDivider variant="simple" className="mt-3 mb-0 opacity-70" />
      </div>
    </section>
  );
};
