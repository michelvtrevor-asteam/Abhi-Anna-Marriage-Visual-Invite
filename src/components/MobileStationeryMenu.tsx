import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Home,
  BookOpen,
  Calendar,
  Clock,
  Image as ImageIcon,
  Music,
  Share2,
  MessageCircle,
  CalendarPlus,
  MailOpen,
} from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralCorner } from './StationeryOrnaments';

interface MobileStationeryMenuProps {
  onReplayEnvelope: () => void;
}

const MENU_ITEMS = [
  { id: 'invitation', label: 'Home', icon: Home },
  { id: 'scripture', label: 'His Word', icon: BookOpen },
  { id: 'countdown', label: 'Countdown', icon: Clock },
  { id: 'wedding-day', label: 'The Wedding Day', icon: Calendar },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'share', label: 'Share', icon: Share2 },
  { id: 'rsvp', label: 'RSVP', icon: MessageCircle },
  { id: 'calendar', label: 'Add to Calendar', icon: CalendarPlus },
];

export const MobileStationeryMenu: React.FC<MobileStationeryMenuProps> = ({
  onReplayEnvelope,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const handleNavigate = (sectionId: string) => {
    setIsOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Compact Sticky Mobile Stationery Top Bar (48px height, well below 15% cap) */}
      <header className="sticky top-0 z-30 w-full h-12 px-4 bg-[#F8F3EA]/92 backdrop-blur-md border-b border-[#C5A66A]/45 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavigate('invitation')}
          className="min-h-[44px] inline-flex items-center gap-2 font-heading text-base font-semibold tracking-[0.2em] text-[#49382E] cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>{weddingConfig.monogram}</span>
          <span className="text-[#C5A66A]" aria-hidden="true">·</span>
          <span className="text-xs font-normal tracking-[0.14em] text-[#6E5849]">
            28 NOV 2026
          </span>
        </button>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onReplayEnvelope}
            aria-label="Replay envelope opening animation"
            className="min-h-[44px] px-2.5 text-[11px] font-body tracking-[0.12em] uppercase text-[#7C5F2C] hover:text-[#49382E] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <MailOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Envelope</span>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open invitation sections menu"
            aria-expanded={isOpen}
            className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-[#49382E] hover:bg-[#EFE5D5] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>
      </header>

      {/* Fullscreen Stationery Navigation Drawer (Matching Panel 15 of Reference Sheet) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Wedding Invitation Navigation Menu"
          className="fixed inset-0 z-50 bg-[#2C1F14]/55 backdrop-blur-xs flex justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-[430px] h-full paper-grain px-6 py-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute inset-3 border border-[#C5A66A]/55 rounded-xl"
              aria-hidden="true"
            />
            <FloralCorner position="bottom-left" className="w-28 h-28 absolute bottom-2 left-2 opacity-85" />
            <FloralCorner position="bottom-right" className="w-28 h-28 absolute bottom-2 right-2 opacity-85" />

            {/* Close Button Row */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-heading text-xs tracking-[0.22em] uppercase text-[#7C5F2C] font-semibold pl-2">
                INVITATION SECTIONS
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-[#49382E] hover:bg-[#EFE5D5] cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[1.8]" />
              </button>
            </div>

            {/* Navigation Items List */}
            <nav className="relative z-10 my-auto py-3 space-y-1">
              {MENU_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className="w-full min-h-[44px] px-3 py-2 rounded-lg flex items-center gap-3.5 text-left font-body text-sm text-[#49382E] hover:bg-[#EFE5D5]/80 active:bg-[#EFE5D5] transition-colors cursor-pointer"
                  >
                    <IconComponent
                      className="w-4 h-4 text-[#8B6B32] shrink-0 stroke-[1.8]"
                      aria-hidden="true"
                    />
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Drawer Footer Couple Signature */}
            <div className="relative z-10 text-center pb-2 pt-3 border-t border-[#C5A66A]/35">
              <p className="font-script text-3xl text-[#49382E]">
                Abhishek &amp; Keerthana
              </p>
              <p className="font-heading text-xs tracking-[0.24em] uppercase text-[#8B6B32] font-semibold mt-0.5">
                {weddingConfig.monogram}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
