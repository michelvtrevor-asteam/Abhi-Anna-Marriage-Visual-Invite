/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { weddingConfig } from './config/weddingConfig';
import { PhotoGallery } from './components/PhotoGallery';

type OpenerStage = 'closed' | 'playing' | 'fading' | 'done';

/**
 * Isolated, zero-parent-rerender Countdown component (exact logic from rec2487446093)
 */
const SacredGardenCountdown = memo(function SacredGardenCountdown() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const daysRef = useRef<HTMLDivElement | null>(null);
  const hoursRef = useRef<HTMLDivElement | null>(null);
  const minsRef = useRef<HTMLDivElement | null>(null);
  const secsRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const targetTime = new Date(weddingConfig.date.isoStartIST).getTime();
    const prev = { days: '', hours: '', minutes: '', seconds: '' };

    const flipEl = (el: HTMLDivElement | null, newVal: string) => {
      if (!el || el.textContent === newVal) return;
      el.classList.add('flip-out');
      window.setTimeout(() => {
        el.classList.remove('flip-out');
        el.classList.add('flip-in');
        el.textContent = newVal;
        void el.offsetHeight;
        el.classList.remove('flip-in');
      }, 520);
    };

    const updateClock = (initial: boolean) => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);
      const d = String(Math.floor(diff / (1000 * 60 * 60 * 24)));
      const h = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const m = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
      const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

      if (initial) {
        if (daysRef.current) daysRef.current.textContent = d;
        if (hoursRef.current) hoursRef.current.textContent = h;
        if (minsRef.current) minsRef.current.textContent = m;
        if (secsRef.current) secsRef.current.textContent = s;
      } else {
        if (prev.days !== d) flipEl(daysRef.current, d);
        if (prev.hours !== h) flipEl(hoursRef.current, h);
        if (prev.minutes !== m) flipEl(minsRef.current, m);
        if (prev.seconds !== s) flipEl(secsRef.current, s);
      }

      prev.days = d;
      prev.hours = h;
      prev.minutes = m;
      prev.seconds = s;
    };

    updateClock(true);
    const timer = window.setInterval(() => updateClock(false), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="rec2487446093"
      ref={sectionRef}
      className="t396__artboard"
      style={{ height: '247px', backgroundColor: '#f9f0e0', overflow: 'hidden' }}
    >
      <div
        className="tn-elem"
        style={{
          zIndex: 3,
          top: '28px',
          left: 'calc(50% - 280px)',
          width: '560px',
          textAlign: 'center',
          color: '#a67d2b',
        }}
      >
        <div
          className="tn-atom"
          style={{
            color: '#a67d2b',
            fontSize: '36px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            lineHeight: 1.35,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          The Celebration Begins In
        </div>
      </div>

      <div
        className="tn-elem"
        style={{
          zIndex: 3,
          top: '24px',
          left: 'calc(50% - 235px)',
          width: '470px',
          height: '170px',
        }}
      >
        <div className="tn-atom">
          <div id="countdownContainer">
            <div className="time-block" id="tb-days">
              <div className="number-wrap">
                <div ref={daysRef} className={`number ${revealed ? 'revealed' : ''}`} id="days">
                  168
                </div>
              </div>
              <div className={`label ${revealed ? 'revealed' : ''}`}>Days</div>
            </div>

            <div className={`separator sep1 ${revealed ? 'revealed' : ''}`}>:</div>

            <div className="time-block" id="tb-hours">
              <div className="number-wrap">
                <div ref={hoursRef} className={`number ${revealed ? 'revealed' : ''}`} id="hours">
                  00
                </div>
              </div>
              <div className={`label ${revealed ? 'revealed' : ''}`}>Hours</div>
            </div>

            <div className={`separator sep2 ${revealed ? 'revealed' : ''}`}>:</div>

            <div className="time-block" id="tb-mins">
              <div className="number-wrap">
                <div ref={minsRef} className={`number ${revealed ? 'revealed' : ''}`} id="minutes">
                  00
                </div>
              </div>
              <div className={`label ${revealed ? 'revealed' : ''}`}>Minutes</div>
            </div>

            <div className={`separator sep3 ${revealed ? 'revealed' : ''}`}>:</div>

            <div className="time-block" id="tb-secs">
              <div className="number-wrap">
                <div ref={secsRef} className={`number ${revealed ? 'revealed' : ''}`} id="seconds">
                  00
                </div>
              </div>
              <div className={`label ${revealed ? 'revealed' : ''}`}>Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default function App() {
  // ---------------------------------------------------------------------------
  // BLOCK 1 (rec4227046903): ENVELOPE OPENER, 3D VIDEO & AUDIO STATE
  // ---------------------------------------------------------------------------
  const [openerStage, setOpenerStage] = useState<OpenerStage>('closed');
  const [audioVisible, setAudioVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const doneTimerRef = useRef<number | null>(null);

  // ---------------------------------------------------------------------------
  // BLOCK 4 (rec2487446103): GPU-DIRECT SCROLL ROSE TIMELINE (ZERO RERENDERS)
  // ---------------------------------------------------------------------------
  const scheduleSectionRef = useRef<HTMLElement | null>(null);
  const roseElemRef = useRef<HTMLDivElement | null>(null);

  // ---------------------------------------------------------------------------
  // GALLERY MODAL STATE
  // ---------------------------------------------------------------------------
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);

  // Lock body scroll while envelope overlay is closed
  useEffect(() => {
    if (openerStage === 'closed' || openerStage === 'playing') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openerStage]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const finishVideoTransition = useCallback(() => {
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    if (doneTimerRef.current) window.clearTimeout(doneTimerRef.current);

    setOpenerStage('fading');
    setAudioVisible(true);

    doneTimerRef.current = window.setTimeout(() => {
      setOpenerStage('done');
    }, 1450);
  }, []);

  const handleOpenEnvelope = useCallback(() => {
    if (openerStage !== 'closed') return;

    setOpenerStage('playing');

    const video = videoRef.current;
    const audio = audioRef.current;

    if (audio) {
      audio.muted = false;
      setIsMuted(false);
      audio.play().catch(() => {});
    }

    if (video) {
      video.currentTime = 0;
      const startPlay = () => {
        const dur = video.duration;
        if (dur && isFinite(dur) && dur > 1) {
          const fadeOutDelay = Math.max((dur - 0.8) * 1000, 1200);
          fadeTimerRef.current = window.setTimeout(() => {
            finishVideoTransition();
          }, fadeOutDelay);
        } else {
          fadeTimerRef.current = window.setTimeout(() => {
            finishVideoTransition();
          }, 4200);
        }
      };

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(startPlay).catch(() => {
          finishVideoTransition();
        });
      } else {
        startPlay();
      }
    } else {
      finishVideoTransition();
    }
  }, [openerStage, finishVideoTransition]);

  const handleReplayEnvelope = useCallback(() => {
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    if (doneTimerRef.current) window.clearTimeout(doneTimerRef.current);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setOpenerStage('closed');
  }, []);

  const handleToggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.muted = false;
      setIsMuted(false);
      audio.play().catch(() => {});
    } else {
      const nextMuted = !audio.muted;
      audio.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  }, []);

  // ---------------------------------------------------------------------------
  // GPU-DIRECT SCROLL ROSE ANIMATION (NO REACT STATE UPDATES ON SCROLL!)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let ticking = false;

    const updateRosePosition = () => {
      ticking = false;
      const section = scheduleSectionRef.current;
      const rose = roseElemRef.current;
      if (!section || !rose) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const startY = vh * 0.68;
      const endY = vh * 0.15;
      const totalTravel = 311;
      const rawProgress = (startY - rect.top) / (startY - endY + 260);
      const clamped = Math.max(0, Math.min(1, rawProgress));
      const yPx = (clamped * totalTravel).toFixed(1);
      rose.style.transform = `translate3d(0px, ${yPx}px, 0px)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateRosePosition);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateRosePosition();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---------------------------------------------------------------------------
  // CALENDAR (.ICS), WHATSAPP SHARE & WHATSAPP RSVP HANDLERS
  // ---------------------------------------------------------------------------
  const handleDownloadIcs = useCallback(() => {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Abhishek & Keerthana Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:abhishek-keerthana-20261128@wedding`,
      `DTSTAMP:${weddingConfig.date.icsUtcStart}`,
      `DTSTART:${weddingConfig.date.icsUtcStart}`,
      `DTEND:${weddingConfig.date.icsUtcEnd}`,
      `SUMMARY:${weddingConfig.calendar.eventTitle}`,
      `DESCRIPTION:${weddingConfig.calendar.description}`,
      `LOCATION:${weddingConfig.venue.fullAddress}`,
      `URL:${weddingConfig.venue.mapsUrl}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abhishek-and-Keerthana-Wedding.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleWhatsAppShare = useCallback(() => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const text = `${weddingConfig.sharing.prefilledMessage}\n\nInvitation Link: ${shareUrl}\nGoogle Maps: ${weddingConfig.venue.mapsUrl}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.location.href = waUrl;
  }, []);


  return (
    <div className="sg-page-wrapper">
      {/* ===================================================================
          BLOCK 1 (rec4227046903): ENVELOPE OVERLAY + A&K 3D VIDEO + AUDIO
          =================================================================== */}
      <audio id="weiAudio" ref={audioRef} loop preload="none">
        <source src="/assets/sacredgarden/divenire.mp3" type="audio/mp3" />
      </audio>

      {openerStage !== 'done' && (
        <div
          id="weiOverlay"
          className={openerStage !== 'closed' ? 'wei-hide' : ''}
          onClick={handleOpenEnvelope}
          role="button"
          tabIndex={0}
          aria-label="Tap to open Abhishek and Keerthana wedding invitation"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpenEnvelope();
          }}
        >
          <img
            id="weiImg"
            src="/assets/sacredgarden/envelope.png?v=ak4"
            alt="Abhishek & Keerthana Wedding Invitation Envelope with A&K Wax Seal"
            fetchPriority="high"
          />

          <div id="weiTapWrap">
            <div id="weiTapLabel">Tap to open</div>
          </div>
        </div>
      )}

      {openerStage !== 'done' && (
        <div
          id="weiVideoWrap"
          className={
            openerStage === 'playing'
              ? 'wei-show'
              : openerStage === 'fading'
                ? 'wei-show wei-fadeout'
                : ''
          }
        >
          <video
            id="weiVideo"
            ref={videoRef}
            src="/assets/sacredgarden/envelope_open.mp4?v=ak4"
            muted
            playsInline
            preload="auto"
            onEnded={finishVideoTransition}
          />
        </div>
      )}

      {/* Floating Audio Toggle Button (#weiAudioBtn from rec4227046903) */}
      <button
        id="weiAudioBtn"
        type="button"
        onClick={handleToggleAudio}
        title="Toggle background music"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        style={{
          opacity: audioVisible ? 1 : 0,
          pointerEvents: audioVisible ? 'all' : 'none',
        }}
      >
        {!isMuted ? (
          <svg
            id="weiIconSound"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F6F1E8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg
            id="weiIconMute"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F6F1E8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      {/* Replay Opener Pill */}
      {openerStage === 'done' && (
        <button
          type="button"
          onClick={handleReplayEnvelope}
          aria-label="Replay envelope opening animation"
          style={{
            position: 'fixed',
            top: '14px',
            right: '14px',
            zIndex: 9980,
            background: 'rgba(249, 240, 224, 0.9)',
            border: '1px solid rgba(166, 125, 43, 0.35)',
            borderRadius: '999px',
            padding: '5px 12px',
            color: '#6c513f',
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(108, 81, 63, 0.1)',
          }}
        >
          Replay Intro
        </button>
      )}

      {/* ===================================================================
          BLOCK 2 (rec4227041103): HERO SECTION (1480px ARTBOARD)
          =================================================================== */}
      <section
        id="rec4227041103"
        className="t396__artboard"
        style={{ height: '1480px', backgroundColor: '#f9f0e0', overflow: 'hidden' }}
      >
        {/* 1773841348614000001: Optimized H.264 Swans Video */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '0px',
            left: 'calc(50% - 225px)',
            width: '450px',
            height: '492px',
          }}
        >
          <div className="tn-atom">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                display: 'block',
              }}
            >
              <source src="/assets/sacredgarden/swans.mp4?v=ak3" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* 1763402091707: Warm Radial Glow Shape */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '0px',
            left: 'calc(50% - 225px)',
            width: '450px',
            height: '676px',
            pointerEvents: 'none',
          }}
        >
          <div
            className="tn-atom"
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.5,
              backgroundImage:
                'radial-gradient(circle at center, rgba(255,249,235,1) 0%, rgba(255,231,192,0) 85%)',
            }}
          />
        </div>

        {/* 1780144694093: Top Floral Frame */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '-785px',
            left: 'calc(50% - 320px)',
            width: '735px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/hero_top_arch.png?v=ak3"
              alt=""
              decoding="async"
            />
          </div>
        </div>

        {/* 176340398328864790: Wedding Day */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '154px',
            left: 'calc(50% - 280px)',
            width: '560px',
            height: '37px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: '40px',
              fontFamily: "'NewFonts', Arial, sans-serif",
              lineHeight: 0.5,
              fontWeight: 300,
            }}
          >
            Wedding Day
          </div>
        </div>

        {/* 176340401720454780: Date 28.11.26 */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '196px',
            left: 'calc(50% - 280px)',
            width: '560px',
            height: '37px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: '25px',
              fontFamily: "'NewFonts', Arial, sans-serif",
              lineHeight: 0.5,
              fontWeight: 600,
            }}
          >
            28.11.26
          </div>
        </div>

        {/* 1763402147625: Couple Names (Abhishek & Keerthana) */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '294px',
            left: 'calc(50% - 280px)',
            width: '560px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: 'clamp(58px, 16vw, 72px)',
              fontFamily: "var(--t-text-font, 'Webgency', Arial)",
              lineHeight: 0.74,
              fontWeight: 800,
            }}
          >
            Abhishek <br />
            <br />
            Keerthana
          </div>
        </div>

        {/* 176340390975774690: Ampersand & */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '356px',
            left: 'calc(50% - 22px)',
            width: '55px',
            textAlign: 'center',
            color: '#a07b33',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a07b33',
              fontSize: '40px',
              fontFamily: "'NewFonts', Arial, sans-serif",
              lineHeight: 1.1,
              fontWeight: 300,
            }}
          >
            &amp;
          </div>
        </div>

        {/* 1782235970225000002: Scroll down */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '518px',
            left: 'calc(50% - 158px)',
            width: '316px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: '32px',
              fontFamily: "'NewFonts', Arial, sans-serif",
              lineHeight: 1.1,
              fontWeight: 300,
            }}
          >
            Scroll down
          </div>
        </div>

        {/* 1782235970224000001: Scroll Down Chevron Vector */}
        <div
          className="tn-elem anim-sbs-bob5"
          style={{
            zIndex: 3,
            top: '558px',
            left: 'calc(50% - 12px)',
            width: '25px',
          }}
        >
          <div className="tn-atom">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25.00 15.86"
              role="img"
              aria-label="Scroll down arrow"
            >
              <path
                fill="none"
                stroke="#937100"
                strokeWidth="1"
                strokeLinecap="round"
                d="M1.0092 1.008C4.3691 5.4431 9.1402 9.565 12.5 14C16.8007 9.565 19.6901 5.4431 23.9908 1.008"
              />
            </svg>
          </div>
        </div>

        {/* 1779527203760000001: Torn Deckle Paper Card Background (710px Tall) */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '730px',
            left: 'calc(50% - 372px)',
            width: '744px',
            height: '710px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom" style={{ height: '100%' }}>
            <img
              className="tn-atom__img"
              style={{ height: '100%', objectFit: 'fill' }}
              src="/assets/sacredgarden/hero_arch_bg.png?v=ak5"
              alt="Deckle paper invitation card background"
              decoding="async"
            />
          </div>
        </div>

        {/* 1780142978273000001: Left White Roses */}
        <div
          className="tn-elem anim-sbs-hero-left"
          style={{
            zIndex: 4,
            top: '566px',
            left: 'calc(50% - 241px)',
            width: '224px',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/hero_floral_left.png?v=ak3"
              alt=""
              decoding="async"
            />
          </div>
        </div>

        {/* 1780748451024000006: Right White Roses */}
        <div
          className="tn-elem anim-sbs-hero-right"
          style={{
            zIndex: 4,
            top: '547px',
            left: 'calc(50% + 5px)',
            width: '236px',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/hero_floral_right.png?v=ak3"
              alt=""
              decoding="async"
            />
          </div>
        </div>

        {/* 1782312134224: Custom Christian Cross Filigree Crest */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '758px',
            left: 'calc(50% - 141px)',
            width: '283px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/hero_crest.png?v=ak3"
              alt="With God's Blessings Christian Cross Crest"
              decoding="async"
            />
          </div>
        </div>

        {/* 1780748008617000003: Sacred Scripture & Matrimony Heading */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '838px',
            left: 'calc(50% - 280px)',
            width: '560px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: '30px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.25,
              fontWeight: 600,
            }}
          >
            Holy Matrimony <br />
            <span style={{ fontSize: '18px', fontFamily: "'Cinzel', Georgia, serif", letterSpacing: '0.08em', color: '#7a5a40' }}>
              PEDDA RAYUDU FAMILY&apos;S INVITATION
            </span>
          </div>
        </div>

        {/* 1780748008617000005: Invitation Message with Official PDF Details */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '915px',
            left: 'calc(50% - 175px)',
            width: '350px',
            textAlign: 'center',
            color: '#5c4333',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#5c4333',
              fontSize: '16.5px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.45,
              fontWeight: 500,
            }}
          >
            <div style={{ fontStyle: 'italic', color: '#8c6827', fontSize: '14.5px', marginBottom: '12px', lineHeight: 1.35 }}>
              &ldquo;Pray for us: for we trust we have a good conscience, in all things willing to live honestly.&rdquo;
              <div style={{ fontSize: '12.5px', fontStyle: 'normal', fontFamily: "'Cinzel', Georgia, serif", fontWeight: 600, marginTop: '3px' }}>— Hebrews 13:18</div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              By the grace and blessings of Jesus Christ, and with the blessings of{' '}
              <strong style={{ color: '#4a3325' }}>Mrs. Anandamma &amp; Late Mr. Abraham</strong> and{' '}
              <strong style={{ color: '#4a3325' }}>Mrs. Siromani &amp; Mr. Sundar Raj</strong>, we cordially invite you with family to the holy matrimony of
            </div>
            <div style={{ color: '#a67d2b', fontSize: '23px', fontWeight: 700, margin: '10px 0 6px', fontFamily: "'Cinzel', Georgia, serif", letterSpacing: '0.03em' }}>
              Abhishek &amp; Keerthana
            </div>
            <div style={{ fontSize: '14px', color: '#6c513f', lineHeight: 1.45, marginBottom: '12px' }}>
              Elder son of Mrs. Sarojamma &amp; Mr. Chinni Kumar (Matamari), Gillesuguru Camp <br />
              with D/o Mrs. Radhika &amp; Mr. Kumar (Komalla, Jangaon)
            </div>
            <div style={{ fontSize: '15.5px', color: '#5A0F1B', fontWeight: 600, lineHeight: 1.4 }}>
              Saturday, 28 November 2026 at 10:30 AM <br />
              SRK Function Hall, Ashapur Road, Raichur
            </div>
            <div style={{ fontSize: '14px', color: '#8c6827', marginTop: '10px', fontStyle: 'italic', lineHeight: 1.35 }}>
              To be Solemnised by: <strong style={{ fontStyle: 'normal', color: '#5A0F1B' }}>Bro. P. Sunil Kumar</strong> (Chief Preacher Warangal)
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          BLOCK 3 (rec2487446093): ISOLATED COUNTDOWN COMPONENT
          =================================================================== */}
      <SacredGardenCountdown />

      {/* ===================================================================
          BLOCK 4 (rec2487446103): SCHEDULE OF EVENTS (570px ARTBOARD)
          =================================================================== */}
      <section
        id="rec2487446103"
        ref={scheduleSectionRef}
        className="t396__artboard"
        style={{ height: '570px', backgroundColor: '#f9f0e0', overflow: 'visible' }}
      >
        {/* 1779527691672: Top Arch Background */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '-20px',
            left: 'calc(50% - 372px)',
            width: '744px',
            height: '346px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom" style={{ height: '100%' }}>
            <img
              className="tn-atom__img"
              style={{ height: '100%' }}
              src="/assets/sacredgarden/sched_bg_top.png?v=ak3"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* 1782315340571000001: Bottom Arch Background */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '321px',
            left: 'calc(50% - 372px)',
            width: '744px',
            height: '259px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom" style={{ height: '100%' }}>
            <img
              className="tn-atom__img"
              style={{ height: '100%' }}
              src="/assets/sacredgarden/sched_bg_bot.png?v=ak3"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* 1763405219328: Schedule of Events Heading */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '45px',
            left: 'calc(50% - 280px)',
            width: '560px',
            textAlign: 'center',
            color: '#b48c3d',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#b48c3d',
              fontSize: '41px',
              fontFamily: "'NewFonts', Arial, sans-serif",
              lineHeight: 1.55,
              fontWeight: 300,
            }}
          >
            Schedule of Events
          </div>
        </div>

        {/* 1780148092188000002: Left Swirl Ornament */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '56px',
            left: 'calc(50% - 204px)',
            width: '79px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/left_element.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* 1780148092188000001: Right Swirl Ornament */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '56px',
            left: 'calc(50% + 125px)',
            width: '78px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/right_element.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* 1772803124037: Center Vertical Timeline Line */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '160px',
            left: 'calc(50% - 1px)',
            width: '2px',
            height: '321px',
          }}
        >
          <div className="tn-atom" style={{ opacity: 0.7 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2.01 323.01"
              style={{ width: '2px', height: '321px', display: 'block' }}
            >
              <line
                fill="transparent"
                stroke="#9c8575"
                strokeWidth="1"
                x1="1.00"
                y1="1.00"
                x2="1.02"
                y2="322.01"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 5 Rotated Diamond Markers along the stem */}
        {[161, 243, 320, 399, 475].map((topPx) => (
          <div
            key={topPx}
            className="tn-elem"
            style={{
              zIndex: 3,
              top: `${topPx}px`,
              left: 'calc(50% - 4px)',
              width: '8px',
              height: '8px',
            }}
          >
            <div
              className="tn-atom"
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#8c7666',
                transform: 'rotate(45deg)',
              }}
            />
          </div>
        ))}

        {/* 1773602024985: GPU-Direct Scroll-Driven Rose Icon (18KB optimized PNG) */}
        <div
          ref={roseElemRef}
          className="tn-elem"
          style={{
            zIndex: 5,
            top: '140px',
            left: 'calc(50% - 27px)',
            width: '55px',
            transform: 'translate3d(0px, 0px, 0px)',
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom" style={{ transform: 'rotate(325deg)' }}>
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/rose_icon.png?v=ak3"
              alt=""
              decoding="async"
            />
          </div>
        </div>

        {/* Row 1: 10:00 AM — Guest Arrival & Prayer */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '144px',
            left: 'calc(50% - 158px)',
            width: '140px',
            textAlign: 'center',
            color: '#7a5a40',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#7a5a40',
              fontSize: '22px',
              fontFamily: "'Cinzel', Georgia, serif",
              lineHeight: 1.25,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            10:00 AM
          </div>
        </div>
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '142px',
            left: 'calc(50% + 28px)',
            width: '155px',
            textAlign: 'left',
            color: '#4e3b2e',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#4e3b2e',
              fontSize: '21px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.2,
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            Guest Arrival &amp; Prayer
          </div>
        </div>

        {/* Row 2: 10:30 AM — Holy Matrimony Service */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '224px',
            left: 'calc(50% - 158px)',
            width: '140px',
            textAlign: 'center',
            color: '#7a5a40',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#7a5a40',
              fontSize: '22px',
              fontFamily: "'Cinzel', Georgia, serif",
              lineHeight: 1.25,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            10:30 AM
          </div>
        </div>
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '216px',
            left: 'calc(50% + 28px)',
            width: '170px',
            textAlign: 'left',
            color: '#4e3b2e',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#4e3b2e',
              fontSize: '21px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: '0.01em',
            }}
          >
            Holy Matrimony Service
            <div style={{ fontSize: '14px', color: '#8c6827', fontWeight: 500, fontStyle: 'italic' }}>
              By Bro. P. Sunil Kumar
            </div>
          </div>
        </div>

        {/* Row 3: 12:00 PM — Pastoral Blessings & Photos */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '302px',
            left: 'calc(50% - 158px)',
            width: '140px',
            textAlign: 'center',
            color: '#7a5a40',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#7a5a40',
              fontSize: '22px',
              fontFamily: "'Cinzel', Georgia, serif",
              lineHeight: 1.25,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            12:00 PM
          </div>
        </div>
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '300px',
            left: 'calc(50% + 28px)',
            width: '165px',
            textAlign: 'left',
            color: '#4e3b2e',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#4e3b2e',
              fontSize: '21px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.2,
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            Pastoral Blessings &amp; Photos
          </div>
        </div>

        {/* Row 4: 1:00 PM — Wedding Feast */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '380px',
            left: 'calc(50% - 158px)',
            width: '140px',
            textAlign: 'center',
            color: '#7a5a40',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#7a5a40',
              fontSize: '22px',
              fontFamily: "'Cinzel', Georgia, serif",
              lineHeight: 1.25,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            1:00 PM
          </div>
        </div>
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '378px',
            left: 'calc(50% + 28px)',
            width: '165px',
            textAlign: 'left',
            color: '#4e3b2e',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#4e3b2e',
              fontSize: '21px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.2,
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            Wedding Feast
          </div>
        </div>

        {/* Row 5: 2:30 PM — Fellowship & Thanks */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '456px',
            left: 'calc(50% - 158px)',
            width: '140px',
            textAlign: 'center',
            color: '#7a5a40',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#7a5a40',
              fontSize: '22px',
              fontFamily: "'Cinzel', Georgia, serif",
              lineHeight: 1.25,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            2:30 PM
          </div>
        </div>
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '454px',
            left: 'calc(50% + 28px)',
            width: '165px',
            textAlign: 'left',
            color: '#4e3b2e',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#4e3b2e',
              fontSize: '21px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.2,
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            Family Fellowship
          </div>
        </div>
      </section>

      {/* ===================================================================
          BLOCK 5 (rec2487446153): LOCATION & FALLING ROSE PETALS (405px)
          =================================================================== */}
      <section
        id="rec2487446153"
        className="t396__artboard"
        style={{ height: '480px', backgroundColor: '#f9f0e0', overflow: 'visible' }}
      >
        {/* 1771277026942000001: Location Heading */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '20px',
            left: 'calc(50% - 280px)',
            width: '560px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: '38px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.35,
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            Location
          </div>
        </div>

        {/* 1780148246706000001: Location Divider Ornament */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '66px',
            left: 'calc(50% - 50px)',
            width: '96px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/acomm_decor.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* 1772804808869: Unified Venue Name & Address (Zero Overlap Guaranteed) */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '92px',
            left: 'calc(50% - 190px)',
            width: '380px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#4e3b2e',
              fontSize: '20px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.3,
              fontWeight: 700,
              letterSpacing: '0.01em',
            }}
          >
            (S.R.K) Sri Radha Krishna Grand Palace <br />
            <span style={{ fontSize: '17px', fontWeight: 600, color: '#7a5a40' }}>
              &amp; Function Hall A/C
            </span>
          </div>

          <div
            className="tn-atom"
            style={{
              color: '#6c513f',
              fontSize: '16px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.35,
              fontWeight: 500,
              marginTop: '10px',
            }}
          >
            {weddingConfig.venue.addressLine}, {weddingConfig.venue.cityLine}
          </div>
        </div>

        {/* 1782312310182000001: Customized Christian SRK Function Hall Illustration */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '215px',
            left: 'calc(50% - 190px)',
            width: '380px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/venue_illust.png?v=srk2"
              alt="SRK Grand Palace and Function Hall Illustration"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* 6 Falling Petals */}
        <div
          className="tn-elem anim-petal-1"
          style={{ zIndex: 4, top: '20px', left: 'calc(50% + 135px)', width: '41px', pointerEvents: 'none', willChange: 'transform, opacity' }}
        >
          <img className="tn-atom__img" src="/assets/sacredgarden/petal_1.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div
          className="tn-elem anim-petal-2"
          style={{ zIndex: 4, top: '11px', left: 'calc(50% - 123px)', width: '43px', pointerEvents: 'none', willChange: 'transform, opacity' }}
        >
          <img className="tn-atom__img" src="/assets/sacredgarden/petal_2.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div
          className="tn-elem anim-petal-3"
          style={{ zIndex: 4, top: '117px', left: 'calc(50% - 198px)', width: '42px', pointerEvents: 'none', willChange: 'transform, opacity' }}
        >
          <img className="tn-atom__img" src="/assets/sacredgarden/petal_3.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div
          className="tn-elem anim-petal-4"
          style={{ zIndex: 4, top: '144px', left: 'calc(50% + 167px)', width: '38px', pointerEvents: 'none', willChange: 'transform, opacity' }}
        >
          <img className="tn-atom__img" src="/assets/sacredgarden/petal_4.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div
          className="tn-elem anim-petal-5"
          style={{ zIndex: 4, top: '260px', left: 'calc(50% - 175px)', width: '38px', pointerEvents: 'none', willChange: 'transform, opacity' }}
        >
          <img className="tn-atom__img" src="/assets/sacredgarden/petal_5.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div
          className="tn-elem anim-petal-6"
          style={{ zIndex: 4, top: '284px', left: 'calc(50% + 90px)', width: '42px', pointerEvents: 'none', willChange: 'transform, opacity' }}
        >
          <img className="tn-atom__img" src="/assets/sacredgarden/petal_6.png" alt="" loading="lazy" decoding="async" />
        </div>
      </section>

      {/* ===================================================================
          BLOCK 6 (rec2487446163): ORNATE GOOGLE MAP FRAME + DIRECTIONS
          =================================================================== */}
      <section
        id="rec2487446163"
        className="t396__artboard"
        style={{ height: '410px', backgroundColor: '#f9f0e0', overflow: 'visible' }}
      >
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '2px',
            left: 'calc(50% - 170px)',
            width: '341px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom" style={{ opacity: 0.8, transform: 'rotate(180deg)' }}>
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/map_frame.svg"
              alt=""
              loading="lazy"
            />
          </div>
        </div>

        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '22px',
            left: 'calc(50% - 150px)',
            width: '300px',
            height: '300px',
          }}
        >
          <div
            className="tn-atom"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <iframe
              title="SRK Function Hall, Ashapur Road, Raichur Google Map"
              src="https://maps.google.com/maps?q=Sri+Radha+Krishna+Grand+Palace+Function+Hall+Ashapur+Road+Raichur&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="300"
              height="300"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div
          className="tn-elem"
          style={{
            zIndex: 4,
            top: '-26px',
            left: 'calc(50% - 95px)',
            width: '190px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/map_ornament_top.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div
          className="tn-elem"
          style={{
            zIndex: 4,
            top: '328px',
            left: 'calc(50% - 95px)',
            width: '190px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/map_ornament_bot.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div
          className="tn-elem"
          style={{
            zIndex: 5,
            top: '364px',
            left: 'calc(50% - 130px)',
            width: '260px',
            textAlign: 'center',
          }}
        >
          <a
            href={weddingConfig.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sg-btn-shimmer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#5a0f1b',
              color: '#f6f1e8',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              fontSize: '17px',
              padding: '9px 24px',
              borderRadius: '24px',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 14px rgba(90, 15, 27, 0.3)',
            }}
          >
            Get Directions to SRK Hall
          </a>
        </div>
      </section>

      {/* ===================================================================
          BLOCK 7 (rec2487446183): SACRED SCRIPTURE & BLESSINGS ARCH (491px)
          =================================================================== */}
      <section
        id="rec2487446183"
        className="t396__artboard"
        style={{ height: '491px', backgroundColor: '#f9f0e0', overflow: 'hidden' }}
      >
        {/* 1779529136519000001: Torn Deckle Paper Card Background */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '20px',
            left: 'calc(50% - 372px)',
            width: '744px',
            height: '453px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom" style={{ height: '100%' }}>
            <img
              className="tn-atom__img"
              style={{ height: '100%' }}
              src="/assets/sacredgarden/dress_bg.png?v=ak3"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* 1780167075599000003: Right Floral Spray */}
        <div
          className="tn-elem anim-sbs-dress-right"
          style={{
            zIndex: 4,
            top: '9px',
            left: 'calc(50% + 58px)',
            width: '305px',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/dress_floral_right.png?v=ak3"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* 1780167004386000002: Left Floral Spray */}
        <div
          className="tn-elem anim-sbs-dress-left"
          style={{
            zIndex: 4,
            top: '264px',
            left: 'calc(50% - 295px)',
            width: '251px',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/dress_floral_left.png?v=ak3"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* 1778524751695000002: Upper Heading (His Word, Our Foundation) */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '64px',
            left: 'calc(50% - 280px)',
            width: '560px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: '34px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.3,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            His Word, Our Foundation
          </div>
        </div>

        {/* 1778524751695000001: Upper Scripture Verses (1 Peter 4:8 & Mark 10:9) */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '120px',
            left: 'calc(50% - 165px)',
            width: '330px',
            textAlign: 'center',
            color: '#4e3b2e',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#4e3b2e',
              fontSize: '19px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.35,
              fontWeight: 500,
              fontStyle: 'italic',
            }}
          >
            &ldquo;Above all, love each other deeply.&rdquo; <br />
            <span style={{ color: '#a67d2b', fontSize: '15px', fontStyle: 'normal', fontWeight: 600, fontFamily: "'Cinzel', Georgia, serif" }}>— 1 Peter 4:8</span>
            <div style={{ height: '10px' }} />
            &ldquo;Therefore what God has joined together, let no one separate.&rdquo; <br />
            <span style={{ color: '#a67d2b', fontSize: '15px', fontStyle: 'normal', fontWeight: 600, fontFamily: "'Cinzel', Georgia, serif" }}>— Mark 10:9</span>
          </div>
        </div>

        {/* 1763405219328: Lower Heading (A Sacred Beginning) */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '276px',
            left: 'calc(50% - 280px)',
            width: '560px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: '34px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.3,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            A Sacred Beginning
          </div>
        </div>

        {/* 1772813849329000001: Lower Blessing Text */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '332px',
            left: 'calc(50% - 165px)',
            width: '330px',
            textAlign: 'center',
            color: '#4e3b2e',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#4e3b2e',
              fontSize: '20px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.35,
              fontWeight: 500,
            }}
          >
            {weddingConfig.scriptureSection.closingBlessing}
          </div>
        </div>
      </section>

      {/* ===================================================================
          BLOCK 8: BLESSINGS & CELEBRATION ACTIONS (SHARE, CALENDAR, GALLERY)
          =================================================================== */}
      <section
        id="rec2487446223"
        className="t396__artboard"
        style={{ height: '310px', backgroundColor: '#f9f0e0', overflow: 'visible' }}
      >
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '32px',
            left: 'calc(50% - 280px)',
            width: '560px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: '36px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.35,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            Celebrate With Us
          </div>
        </div>

        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '86px',
            left: 'calc(50% - 175px)',
            width: '350px',
            textAlign: 'center',
            color: '#5c4333',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#5c4333',
              fontSize: '18px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            Your presence, love and prayers are the greatest blessing to our family.
          </div>
        </div>

        {/* Action Row: Save the Date (.ICS), Share on WhatsApp, Moments Gallery */}
        <div
          className="tn-elem"
          style={{
            zIndex: 4,
            top: '158px',
            left: 'calc(50% - 180px)',
            width: '360px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={handleDownloadIcs}
              style={{
                flex: 1,
                background: 'rgba(90, 15, 27, 0.08)',
                border: '1px solid rgba(90, 15, 27, 0.35)',
                borderRadius: '24px',
                padding: '10px 16px',
                color: '#5a0f1b',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: '16.5px',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(90, 15, 27, 0.06)',
              }}
            >
              📅 Add to Calendar (.ics)
            </button>

            <button
              type="button"
              onClick={handleWhatsAppShare}
              style={{
                flex: 1,
                background: '#5a0f1b',
                border: '1px solid #5a0f1b',
                borderRadius: '24px',
                padding: '10px 16px',
                color: '#f6f1e8',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: '16.5px',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 4px 14px rgba(90, 15, 27, 0.25)',
              }}
            >
              💬 Share on WhatsApp
            </button>
          </div>

          <button
            type="button"
            onClick={() => setGalleryModalOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8c6827',
              fontFamily: "'Cinzel', Georgia, serif",
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              padding: '6px 14px',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
          >
            View Our Photo Gallery →
          </button>
        </div>
      </section>

      {/* ===================================================================
          BLOCK 10 (rec2487446253): FOOTER PHOTO & ARCH (673px ARTBOARD)
          =================================================================== */}
      <section
        id="rec2487446253"
        className="t396__artboard"
        style={{ height: '673px', backgroundColor: '#f9f0e0', overflow: 'hidden' }}
      >
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '0px',
            left: 'calc(50% - 225px)',
            width: '450px',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/footer_photo.jpg?v=ak3"
              alt="Abhishek and Keerthana"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '0px',
            left: 'calc(50% - 225px)',
            width: '451px',
            height: '237px',
            pointerEvents: 'none',
          }}
        >
          <div
            className="tn-atom"
            style={{
              width: '100%',
              height: '100%',
              backgroundImage:
                'linear-gradient(0turn, rgba(232,221,207,0) 0%, rgba(249,240,224,1) 100%)',
            }}
          />
        </div>

        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '12px',
            left: 'calc(50% - 280px)',
            width: '560px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: '38px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.35,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            Hope to see you there!
          </div>
        </div>

        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '68px',
            left: 'calc(50% - 200px)',
            width: '400px',
            textAlign: 'center',
            color: '#a67d2b',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#a67d2b',
              fontSize: '25px',
              fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
              lineHeight: 1.3,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Abhishek &amp; Keerthana
          </div>
        </div>

        {/* Family Compliments Line from Official PDF */}
        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '118px',
            left: 'calc(50% - 175px)',
            width: '350px',
            textAlign: 'center',
            color: '#5c4333',
          }}
        >
          <div
            className="tn-atom"
            style={{
              color: '#5c4333',
              fontSize: '16px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.4,
              fontWeight: 600,
            }}
          >
            With best compliments from: <br />
            <span style={{ color: '#7a5a40', fontWeight: 700 }}>Kambayya&apos;s Family, all Relatives and Friends</span>
            <div style={{ fontSize: '13.5px', color: '#8c6827', marginTop: '5px', fontWeight: 500 }}>
              Pedda Rayudu Family · Gillesuguru Camp &amp; Matamari
            </div>
          </div>
        </div>

        <div
          className="tn-elem"
          style={{
            zIndex: 3,
            top: '173px',
            left: 'calc(50% - 268px)',
            width: '537px',
            pointerEvents: 'none',
          }}
        >
          <div className="tn-atom">
            <img
              className="tn-atom__img"
              src="/assets/sacredgarden/footer_arch.png?v=ak3"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ===================================================================
          MOMENTS GALLERY MODAL
          =================================================================== */}
      {galleryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Our Wedding Gallery"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100020,
            backgroundColor: 'rgba(249, 240, 224, 0.97)',
            overflowY: 'auto',
            padding: '48px 12px 32px',
          }}
        >
          <button
            type="button"
            onClick={() => setGalleryModalOpen(false)}
            aria-label="Close gallery"
            style={{
              position: 'fixed',
              top: '14px',
              right: '14px',
              zIndex: 100025,
              backgroundColor: '#5a0f1b',
              color: '#f6f1e8',
              border: 'none',
              borderRadius: '999px',
              padding: '7px 16px',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Close Gallery ✕
          </button>
          <div style={{ maxWidth: '440px', margin: '0 auto' }}>
            <PhotoGallery />
          </div>
        </div>
      )}
    </div>
  );
}
