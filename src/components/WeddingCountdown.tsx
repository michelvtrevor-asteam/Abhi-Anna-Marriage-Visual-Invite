import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import {
  GoldDivider,
  GoldenWeddingBandsSvg,
} from './StationeryOrnaments';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

const calculateTimeLeft = (): TimeLeft => {
  const targetTimestamp = new Date(weddingConfig.date.isoStartIST).getTime();
  const nowTimestamp = Date.now();
  const difference = targetTimestamp - nowTimestamp;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isComplete: false,
  };
};

export const WeddingCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const padNumber = (num: number): string => String(num).padStart(2, '0');

  const countdownItems = [
    { label: 'Days', value: String(timeLeft.days) },
    { label: 'Hours', value: padNumber(timeLeft.hours) },
    { label: 'Minutes', value: padNumber(timeLeft.minutes) },
    { label: 'Seconds', value: padNumber(timeLeft.seconds) },
  ];

  return (
    <section
      id="countdown"
      aria-label="Live Wedding Countdown"
      className="relative px-3.5 py-3"
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden px-5 pt-9 pb-7 text-center shadow-[0_2px_0_0_#3A281A,0_20px_45px_-12px_rgba(48,33,20,0.48)] border border-[#C5A66A]/70"
        style={{
          background:
            'radial-gradient(circle at 78% 22%, rgba(218, 179, 108, 0.32) 0%, transparent 45%), radial-gradient(circle at 22% 72%, rgba(212, 172, 99, 0.25) 0%, transparent 50%), linear-gradient(180deg, #433022 0%, #332317 58%, #523B28 100%)',
        }}
      >
        {/* Inner fine gold frame */}
        <div
          className="pointer-events-none absolute inset-2.5 border border-[#C5A66A]/45 rounded-xl"
          aria-hidden="true"
        />

        {/* Soft ambient bokeh circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="w-24 h-24 rounded-full bg-[#F5D99B]/12 blur-md absolute top-6 right-6" />
          <div className="w-16 h-16 rounded-full bg-[#FFE8B3]/15 blur-sm absolute top-28 left-8" />
          <div className="w-28 h-28 rounded-full bg-[#E5C178]/12 blur-lg absolute bottom-14 right-10" />
          <div className="w-12 h-12 rounded-full bg-[#FFF2D1]/18 blur-sm absolute bottom-28 left-12" />
        </div>

        <div className="relative z-10">
          <p className="font-heading italic text-xl sm:text-2xl text-[#F5E6C8] tracking-wide">
            The Big Day
          </p>
          <h2 className="font-heading text-xl sm:text-2xl tracking-[0.24em] uppercase text-[#FDF8EE] font-semibold mt-1">
            COUNTDOWN
          </h2>

          {timeLeft.isComplete ? (
            <div className="my-8 py-6 px-4 rounded-xl border border-[#C5A66A]/60 bg-[#2A1C12]/60">
              <p className="font-script text-3xl text-[#F5DFB0] mb-2">
                Today We Celebrate in God&apos;s Grace
              </p>
              <p className="font-heading text-base text-[#F8F3EA] leading-relaxed">
                The wedding ceremony of Abhishek &amp; Keerthana has arrived. Thank you for
                joining us in prayer and celebration!
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-2 gap-4 sm:gap-5 max-w-[290px] mx-auto my-7"
              role="timer"
              aria-live="off"
              aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until the wedding`}
            >
              {countdownItems.map((item) => (
                <div
                  key={item.label}
                  className="relative aspect-square rounded-full flex flex-col items-center justify-center p-2"
                >
                  {/* Ornate double-ring gold medallion */}
                  <svg
                    viewBox="0 0 130 130"
                    fill="none"
                    className="pointer-events-none absolute inset-0 w-full h-full"
                    aria-hidden="true"
                  >
                    <circle
                      cx="65"
                      cy="65"
                      r="60"
                      fill="#2B1D13"
                      fillOpacity="0.55"
                      stroke="#C5A66A"
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="65"
                      cy="65"
                      r="54"
                      stroke="#E5C98F"
                      strokeOpacity="0.45"
                      strokeWidth="0.9"
                    />
                    <path d="M65 2L68 5L65 8L62 5L65 2Z" fill="#DFC286" />
                    <path d="M65 122L68 125L65 128L62 125L65 122Z" fill="#DFC286" />
                    <path d="M2 65L5 62L8 65L5 68L2 65Z" fill="#DFC286" />
                    <path d="M122 65L125 62L128 65L125 68L122 65Z" fill="#DFC286" />
                  </svg>

                  <span className="relative z-10 font-heading text-3xl sm:text-[34px] font-semibold text-[#FFFDF8] tabular-nums leading-none">
                    {item.value}
                  </span>
                  <span className="relative z-10 font-heading text-xs sm:text-[13px] tracking-[0.08em] text-[#E6CFA1] mt-1.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="font-heading text-sm sm:text-[15px] tracking-[0.08em] text-[#F3E3C3]">
            until our wedding
          </p>
          <p className="font-body text-[10px] tracking-[0.16em] uppercase text-[#D6BA85]/80 mt-1">
            28 November 2026 · 10:00 AM IST
          </p>

          <GoldDivider variant="ornate" className="mt-3 mb-2 opacity-85" />

          {/* Golden Interlocked Wedding Bands at bottom */}
          <GoldenWeddingBandsSvg className="w-44 h-20 mx-auto -mb-2" />
        </div>
      </div>
    </section>
  );
};
