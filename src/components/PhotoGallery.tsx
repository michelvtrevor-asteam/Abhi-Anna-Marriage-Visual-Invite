import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import { weddingConfig, GalleryArtworkItem } from '../config/weddingConfig';
import {
  FloralCorner,
  ChristianCross,
  GoldenWeddingBandsSvg,
} from './StationeryOrnaments';

const EditorialStillLifeCanvas: React.FC<{
  artworkType: GalleryArtworkItem['artworkType'];
  className?: string;
}> = ({ artworkType, className = '' }) => {
  switch (artworkType) {
    case 'blossoms':
      return (
        <div
          className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
          style={{
            background:
              'radial-gradient(circle at 25% 25%, #FFFDF8 0%, #EFE2CD 48%, #C6AB80 100%)',
          }}
        >
          {/* Warm sunlight bokeh */}
          <div className="w-20 h-20 rounded-full bg-white/55 blur-md absolute top-2 left-3" />
          <div className="w-12 h-12 rounded-full bg-[#FFEAB8]/60 blur-sm absolute bottom-3 right-4" />
          <FloralCorner position="bottom-right" className="w-36 h-36 absolute -bottom-2 -right-2" />
          <FloralCorner position="top-left" className="w-24 h-24 absolute -top-2 -left-2 opacity-70" />
        </div>
      );

    case 'cross':
      return (
        <div
          className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
          style={{
            background:
              'radial-gradient(circle at 50% 35%, #F8E8C4 0%, #B49463 55%, #6A5032 100%)',
          }}
        >
          <div className="w-24 h-24 rounded-full bg-[#FFF7DF]/45 blur-lg absolute top-2 left-1/2 -translate-x-1/2" />
          <div className="w-8 h-8 rounded-full bg-[#FFF4D2]/40 blur-xs absolute top-5 left-5" />
          <div className="w-10 h-10 rounded-full bg-[#FFF4D2]/35 blur-xs absolute bottom-5 right-5" />
          <ChristianCross size="lg" className="scale-125 drop-shadow-[0_6px_12px_rgba(38,24,10,0.45)]" />
          <FloralCorner position="bottom-left" className="w-24 h-24 absolute -bottom-3 -left-3 opacity-85" />
        </div>
      );

    case 'rings':
      return (
        <div
          className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
          style={{
            background:
              'radial-gradient(circle at 65% 30%, #FFFBF2 0%, #E7D6BC 55%, #B99B6B 100%)',
          }}
        >
          {/* Soft silk folds */}
          <div
            className="absolute inset-0 opacity-45"
            style={{
              background:
                'linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.7) 45%, transparent 70%)',
            }}
          />
          <GoldenWeddingBandsSvg className="w-40 h-24 relative z-10 drop-shadow-[0_8px_12px_rgba(73,56,46,0.2)]" />
        </div>
      );

    case 'bouquet':
      return (
        <div
          className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
          style={{
            background:
              'radial-gradient(circle at 50% 45%, #FBF6EC 0%, #DEC9A8 58%, #91734A 100%)',
          }}
        >
          <svg viewBox="0 0 200 260" fill="none" className="w-full h-full p-2">
            {/* Ribbon tied stems */}
            <path d="M90 165L78 232M100 165V236M110 165L122 232" stroke="#6E5836" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="85" y="168" width="30" height="16" rx="3" fill="#EFE5D5" stroke="#C5A66A" strokeWidth="1.2" />
            <path d="M92 184L80 212M108 184L120 212" stroke="#EFE5D5" strokeWidth="4" strokeLinecap="round" />
            {/* Foliage */}
            <circle cx="100" cy="112" r="56" fill="#7D6942" fillOpacity="0.28" />
            {/* White Rose Cluster */}
            {[
              [100, 96, 22],
              [72, 112, 18],
              [128, 112, 18],
              [86, 74, 16],
              [116, 76, 16],
              [100, 132, 19],
              [66, 88, 14],
              [134, 88, 14],
            ].map(([cx, cy, r], idx) => (
              <g key={idx} transform={`translate(${cx}, ${cy})`}>
                <circle cx="0" cy="0" r={r} fill="#FFFDF9" stroke="#D9C5A0" strokeWidth="1" />
                <circle cx="-2" cy="-2" r={r * 0.68} fill="#F7EFE0" stroke="#C5A66A" strokeWidth="0.8" />
                <circle cx="1" cy="1" r={r * 0.35} fill="#E5D1AE" />
              </g>
            ))}
          </svg>
        </div>
      );

    case 'sprig':
      return (
        <div
          className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
          style={{
            background:
              'linear-gradient(145deg, #F8F2E7 0%, #E7D8C1 55%, #C9B18B 100%)',
          }}
        >
          <FloralCorner position="top-left" className="w-40 h-40 scale-110 rotate-12" />
          <div className="w-16 h-16 rounded-full bg-white/50 blur-md absolute bottom-4 right-4" />
        </div>
      );

    case 'gypsophila':
    default:
      return (
        <div
          className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
          style={{
            background:
              'linear-gradient(180deg, #B8C4CE 0%, #E6D5BD 52%, #C4A77D 100%)',
          }}
        >
          <div className="w-24 h-24 rounded-full bg-[#FFF7E2]/65 blur-xl absolute top-3 left-6" />
          <FloralCorner position="bottom-right" className="w-36 h-36 absolute -bottom-2 right-0" />
          <FloralCorner position="bottom-left" className="w-28 h-28 absolute -bottom-3 left-0 opacity-85" />
        </div>
      );
  }
};

export const PhotoGallery: React.FC = () => {
  const { heading, subheading, items } = weddingConfig.gallery;
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const touchStartXRef = useRef<number | null>(null);

  const isLightboxOpen = activeLightboxIndex !== null;

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const showPrev = () => {
    setActiveLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + items.length) % items.length
    );
  };

  const showNext = () => {
    setActiveLightboxIndex((prev) =>
      prev === null ? 0 : (prev + 1) % items.length
    );
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <section
      id="gallery"
      aria-label="Our Wedding Gallery"
      className="relative px-3.5 py-3"
    >
      <div className="relative w-full rounded-2xl paper-grain stationery-slab overflow-hidden px-5 py-9 text-center">
        {/* Double embossed gold-foil border */}
        <div
          className="pointer-events-none absolute inset-2.5 border border-[#C5A66A]/65 rounded-xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-3.5 border border-[#C5A66A]/25 rounded-lg"
          aria-hidden="true"
        />

        <FloralCorner position="top-left" className="w-24 h-24 absolute top-1 left-1 opacity-80" />
        <FloralCorner position="top-right" className="w-24 h-24 absolute top-1 right-1 opacity-80" />
        <FloralCorner position="bottom-left" className="w-24 h-24 absolute bottom-1 left-1 opacity-80" />
        <FloralCorner position="bottom-right" className="w-24 h-24 absolute bottom-1 right-1 opacity-80" />

        <div className="relative z-10">
          <h2 className="font-heading text-xl sm:text-[22px] tracking-[0.18em] uppercase text-[#49382E] font-semibold embossed-text">
            {heading}
          </h2>
          <p className="font-heading italic text-base text-[#5C473A] mt-1 mb-5">
            {subheading}
          </p>

          {/* Editorial Asymmetric 2-Column Masonry Grid matching Panel 8 */}
          <div className="grid grid-cols-2 gap-2.5 text-left">
            {/* Left Column (Items 0, 2, 4) */}
            <div className="flex flex-col gap-2.5">
              {[0, 2, 4].map((itemIdx) => {
                const item = items[itemIdx];
                if (!item) return null;
                const heightClass =
                  itemIdx === 0 ? 'h-28' : itemIdx === 2 ? 'h-32' : 'h-40';
                const hasValidPhoto =
                  Boolean(item.imageUrl) && !failedImages[item.id];

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openLightbox(itemIdx)}
                    aria-label={`View ${item.title} in fullscreen gallery`}
                    className={`group relative w-full ${heightClass} rounded-lg p-1 bg-[#FAF5EC] border border-[#C5A66A]/75 shadow-sm overflow-hidden focus-visible:outline-2 focus-visible:outline-[#49382E] cursor-pointer transition-transform active:scale-[0.98]`}
                  >
                    <div className="relative w-full h-full rounded overflow-hidden">
                      {hasValidPhoto ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <EditorialStillLifeCanvas
                          artworkType={item.artworkType}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-[#49382E]/55 text-[#FDFBF7] flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                        <Expand className="w-3 h-3" aria-hidden="true" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column (Items 1, 3, 5) */}
            <div className="flex flex-col gap-2.5">
              {[1, 3, 5].map((itemIdx) => {
                const item = items[itemIdx];
                if (!item) return null;
                const heightClass =
                  itemIdx === 1 ? 'h-28' : itemIdx === 3 ? 'h-44' : 'h-28';
                const hasValidPhoto =
                  Boolean(item.imageUrl) && !failedImages[item.id];

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openLightbox(itemIdx)}
                    aria-label={`View ${item.title} in fullscreen gallery`}
                    className={`group relative w-full ${heightClass} rounded-lg p-1 bg-[#FAF5EC] border border-[#C5A66A]/75 shadow-sm overflow-hidden focus-visible:outline-2 focus-visible:outline-[#49382E] cursor-pointer transition-transform active:scale-[0.98]`}
                  >
                    <div className="relative w-full h-full rounded overflow-hidden">
                      {hasValidPhoto ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <EditorialStillLifeCanvas
                          artworkType={item.artworkType}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-[#49382E]/55 text-[#FDFBF7] flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                        <Expand className="w-3 h-3" aria-hidden="true" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* View Gallery Button & Indicator Dots */}
          <div className="mt-6 flex flex-col items-center">
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="min-h-[44px] px-7 py-2 rounded-full border border-[#8E6F36] bg-[#FAF5EC]/80 hover:bg-[#EFE5D5] text-xs font-body font-medium tracking-[0.18em] uppercase text-[#49382E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              VIEW GALLERY
            </button>

            <div className="flex items-center justify-center gap-2 mt-3" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6E5849]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A66A]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A66A]/45" />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Touch-Swipeable & Accessible Lightbox Modal */}
      {isLightboxOpen && activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Wedding Gallery Lightbox"
          className="fixed inset-0 z-50 bg-[#261B12]/92 backdrop-blur-md flex flex-col justify-between p-4 select-none"
          onTouchStart={(e) => {
            touchStartXRef.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartXRef.current === null) return;
            const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartXRef.current;
            if (deltaX > 45) showPrev();
            else if (deltaX < -45) showNext();
            touchStartXRef.current = null;
          }}
        >
          {/* Top Lightbox Bar */}
          <div className="w-full max-w-[430px] mx-auto flex items-center justify-between text-[#F8F3EA]">
            <span className="font-heading text-sm tracking-[0.18em] uppercase text-[#E5C98F] tabular-nums">
              {activeLightboxIndex + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery lightbox"
              className="min-w-[44px] min-h-[44px] rounded-full border border-[#C5A66A]/50 bg-[#3B2A1D]/80 flex items-center justify-center text-[#F8F3EA] hover:bg-[#49382E] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Artwork Frame */}
          <div className="w-full max-w-[390px] mx-auto my-auto">
            <div className="relative aspect-[4/4.6] w-full rounded-2xl p-2 bg-[#F8F3EA] border-2 border-[#C5A66A] shadow-2xl overflow-hidden">
              <div className="w-full h-full rounded-xl overflow-hidden">
                {items[activeLightboxIndex].imageUrl &&
                !failedImages[items[activeLightboxIndex].id] ? (
                  <img
                    src={items[activeLightboxIndex].imageUrl}
                    alt={items[activeLightboxIndex].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <EditorialStillLifeCanvas
                    artworkType={items[activeLightboxIndex].artworkType}
                  />
                )}
              </div>
            </div>

            <div className="mt-4 text-center px-2">
              <h3 className="font-heading text-2xl text-[#FDF8EE] font-semibold">
                {items[activeLightboxIndex].title}
              </h3>
              <p className="font-heading italic text-base text-[#E6D5B8] mt-1 leading-relaxed">
                {items[activeLightboxIndex].caption}
              </p>
            </div>
          </div>

          {/* Bottom Prev/Next Touch Controls */}
          <div className="w-full max-w-[390px] mx-auto flex items-center justify-between pb-2">
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous gallery artwork"
              className="min-h-[48px] px-5 rounded-full border border-[#C5A66A]/60 bg-[#3B2A1D]/80 text-[#F8F3EA] inline-flex items-center gap-2 text-xs font-body tracking-[0.14em] uppercase cursor-pointer active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-1.5">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveLightboxIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeLightboxIndex
                      ? 'w-5 bg-[#C5A66A]'
                      : 'w-2 bg-[#C5A66A]/35'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next gallery artwork"
              className="min-h-[48px] px-5 rounded-full border border-[#C5A66A]/60 bg-[#3B2A1D]/80 text-[#F8F3EA] inline-flex items-center gap-2 text-xs font-body tracking-[0.14em] uppercase cursor-pointer active:scale-95 transition-transform"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
