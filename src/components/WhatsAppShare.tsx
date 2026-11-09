import React, { useState } from 'react';
import { Link2, Check, MessageCircle } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralCorner, GoldDivider } from './StationeryOrnaments';

export const buildWhatsAppShareUrl = (): string => {
  const currentUrl =
    typeof window !== 'undefined' && window.location?.href
      ? window.location.href.split('#')[0]
      : '';
  const fullMessage = currentUrl
    ? `${weddingConfig.sharing.prefilledMessage}\n\n${currentUrl}`
    : weddingConfig.sharing.prefilledMessage;

  return `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
};

export const WhatsAppShare: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const currentUrl =
      typeof window !== 'undefined' && window.location?.href
        ? window.location.href.split('#')[0]
        : '';
    const textToCopy = currentUrl
      ? `${weddingConfig.sharing.prefilledMessage}\n${currentUrl}`
      : weddingConfig.sharing.prefilledMessage;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback textarea copy
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="share"
      aria-label="Share Our Wedding Invitation on WhatsApp"
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

        <FloralCorner position="bottom-left" className="w-28 h-28 absolute bottom-1 left-1 opacity-85" />
        <FloralCorner position="bottom-right" className="w-28 h-28 absolute bottom-1 right-1 opacity-85" />

        <div className="relative z-10">
          {/* WhatsApp Crest Icon */}
          <div className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-[#8B6B32] bg-[#FAF5EC] flex items-center justify-center text-[#7C5F2C] shadow-sm">
            <MessageCircle className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
          </div>

          <h2 className="font-heading text-xl sm:text-[22px] tracking-[0.16em] uppercase text-[#49382E] font-semibold embossed-text">
            {weddingConfig.sharing.heading}
          </h2>

          <GoldDivider variant="simple" className="my-3.5" />

          {/* Exact Invitation Share Message Preview */}
          <p className="font-heading text-[16px] sm:text-[17px] text-[#49382E] leading-relaxed max-w-[310px] mx-auto my-5">
            {weddingConfig.sharing.prefilledMessage}
          </p>

          {/* Primary WhatsApp Share Button */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <a
              href={buildWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share our wedding invitation on WhatsApp"
              className="btn-luxury-gold min-h-[48px] w-full max-w-[275px] px-6 py-3 rounded-full inline-flex items-center justify-center gap-2.5 text-xs sm:text-[13px] font-body font-medium tracking-[0.14em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49382E]"
            >
              <MessageCircle className="w-4 h-4 stroke-[2]" aria-hidden="true" />
              <span>SHARE OUR INVITATION</span>
            </a>

            {/* Copy Invitation Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="min-h-[44px] px-4 py-1.5 inline-flex items-center justify-center gap-1.5 text-xs font-heading text-[#5C473A] hover:text-[#49382E] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#7C5F2C]" aria-hidden="true" />
                  <span className="font-semibold text-[#7C5F2C]">Invitation Link Copied</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5 text-[#8B6B32]" aria-hidden="true" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
