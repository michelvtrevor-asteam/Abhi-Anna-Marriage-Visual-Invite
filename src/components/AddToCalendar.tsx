import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Download, Check } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralCorner, GoldDivider } from './StationeryOrnaments';

const escapeIcsText = (value: string): string => {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
};

export const generateWeddingIcsContent = (): string => {
  const nowUtc = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');

  const summary = escapeIcsText(weddingConfig.calendar.eventTitle);
  const location = escapeIcsText(weddingConfig.venue.fullAddress);
  const description = escapeIcsText(
    `${weddingConfig.invitationCopy.blessingHeader} — Celebrate the Christian wedding ceremony of ${weddingConfig.coupleFullTitle} at ${weddingConfig.venue.fullAddress}. Google Maps Directions: ${weddingConfig.venue.mapsUrl}`
  );

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Abhishek & Keerthana//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Kolkata',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0530',
    'TZOFFSETTO:+0530',
    'TZNAME:IST',
    'DTSTART:19700101T000000',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:abhishek-keerthana-20261128@wedding.invitation`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART;TZID=Asia/Kolkata:${weddingConfig.date.icsLocalStart}`,
    `DTEND;TZID=Asia/Kolkata:${weddingConfig.date.icsLocalEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `URL:${weddingConfig.venue.mapsUrl}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
};

export const AddToCalendar: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadIcs = () => {
    const icsData = generateWeddingIcsContent();
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'abhishek-keerthana-wedding.ics';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section
      id="calendar"
      aria-label="Add Wedding Date to Calendar"
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

        <FloralCorner position="bottom-left" className="w-28 h-28 absolute bottom-1 left-1 opacity-90" />
        <FloralCorner position="bottom-right" className="w-28 h-28 absolute bottom-1 right-1 opacity-90" />

        <div className="relative z-10">
          {/* Calendar Header Icon */}
          <div className="w-11 h-11 mx-auto mb-3 rounded-xl border border-[#C5A66A]/80 bg-[#FAF5EC] flex items-center justify-center text-[#7C5F2C] shadow-xs">
            <Calendar className="w-5 h-5 stroke-[1.8]" aria-hidden="true" />
          </div>

          <h2 className="font-heading text-xl sm:text-[22px] tracking-[0.16em] uppercase text-[#49382E] font-semibold embossed-text">
            {weddingConfig.calendar.heading}
          </h2>

          <p className="font-heading italic text-base text-[#5C473A] mt-1">
            {weddingConfig.calendar.subheading}
          </p>

          <GoldDivider variant="simple" className="my-3.5" />

          {/* Event Summary Box */}
          <div className="max-w-[295px] mx-auto my-5 text-left space-y-2.5">
            <h3 className="font-heading text-lg sm:text-[19px] font-semibold text-[#49382E] text-center mb-3">
              {weddingConfig.calendar.eventTitle}
            </h3>

            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#8B6B32] shrink-0" aria-hidden="true" />
              <span className="font-heading text-[15px] text-[#49382E] font-medium">
                {weddingConfig.date.fullDisplay}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#8B6B32] shrink-0" aria-hidden="true" />
              <span className="font-heading text-[15px] text-[#49382E] font-medium">
                {weddingConfig.date.calendarTimeRange}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#8B6B32] shrink-0 mt-1" aria-hidden="true" />
              <div className="font-heading text-[15px] text-[#49382E] leading-snug">
                <p className="font-medium">{weddingConfig.venue.name},</p>
                <p className="text-[#5C473A]">{weddingConfig.venue.cityLine}</p>
              </div>
            </div>
          </div>

          {/* Primary Add to Calendar / Download .ICS Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleDownloadIcs}
              className="btn-luxury-gold min-h-[48px] w-full max-w-[265px] px-6 py-3 rounded-full inline-flex items-center justify-center gap-2.5 text-xs sm:text-[13px] font-body font-medium tracking-[0.14em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49382E] cursor-pointer"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                  <span>CALENDAR FILE SAVED (.ICS)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 stroke-[2]" aria-hidden="true" />
                  <span>ADD TO CALENDAR</span>
                </>
              )}
            </button>
          </div>

          <p className="font-heading text-xs sm:text-[13px] text-[#6E5849] mt-3">
            Downloads .ICS calendar event · Includes Google Maps link
          </p>
        </div>
      </div>
    </section>
  );
};
