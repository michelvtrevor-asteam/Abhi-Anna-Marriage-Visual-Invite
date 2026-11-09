import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralCorner } from './StationeryOrnaments';

const MELODY_STEPS: Array<{
  melodyFreq: number;
  bassFreq: number;
  harmonyFreq: number;
  durationMs: number;
}> = [
  { melodyFreq: 587.33, bassFreq: 146.83, harmonyFreq: 369.99, durationMs: 650 },
  { melodyFreq: 659.25, bassFreq: 220.0, harmonyFreq: 440.0, durationMs: 650 },
  { melodyFreq: 739.99, bassFreq: 293.66, harmonyFreq: 440.0, durationMs: 650 },
  { melodyFreq: 587.33, bassFreq: 220.0, harmonyFreq: 369.99, durationMs: 650 },
  { melodyFreq: 659.25, bassFreq: 138.59, harmonyFreq: 329.63, durationMs: 650 },
  { melodyFreq: 554.37, bassFreq: 220.0, harmonyFreq: 440.0, durationMs: 650 },
  { melodyFreq: 440.0, bassFreq: 277.18, harmonyFreq: 329.63, durationMs: 1300 },
  { melodyFreq: 587.33, bassFreq: 123.47, harmonyFreq: 293.66, durationMs: 650 },
  { melodyFreq: 493.88, bassFreq: 185.0, harmonyFreq: 369.99, durationMs: 650 },
  { melodyFreq: 369.99, bassFreq: 246.94, harmonyFreq: 293.66, durationMs: 650 },
  { melodyFreq: 440.0, bassFreq: 185.0, harmonyFreq: 369.99, durationMs: 650 },
  { melodyFreq: 493.88, bassFreq: 196.0, harmonyFreq: 392.0, durationMs: 650 },
  { melodyFreq: 440.0, bassFreq: 293.66, harmonyFreq: 392.0, durationMs: 650 },
  { melodyFreq: 392.0, bassFreq: 196.0, harmonyFreq: 329.63, durationMs: 650 },
  { melodyFreq: 369.99, bassFreq: 146.83, harmonyFreq: 293.66, durationMs: 650 },
  { melodyFreq: 329.63, bassFreq: 164.81, harmonyFreq: 246.94, durationMs: 650 },
  { melodyFreq: 369.99, bassFreq: 185.0, harmonyFreq: 293.66, durationMs: 650 },
  { melodyFreq: 440.0, bassFreq: 220.0, harmonyFreq: 329.63, durationMs: 650 },
  { melodyFreq: 587.33, bassFreq: 146.83, harmonyFreq: 369.99, durationMs: 1300 },
];

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string>('Tap to play');

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const useSynthFallbackRef = useRef<boolean>(!weddingConfig.music.audioSrc);
  const isMutedRef = useRef<boolean>(false);
  const stepIndexRef = useRef<number>(0);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (audioElementRef.current) {
      audioElementRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const stopSynth = useCallback(() => {
    if (synthTimerRef.current !== null) {
      window.clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  }, []);

  const triggerWarmNote = useCallback(
    (melodyFreq: number, bassFreq: number, harmonyFreq: number, durationSec: number) => {
      if (isMutedRef.current) return;
      try {
        if (!audioCtxRef.current) {
          const AudioCtx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const now = ctx.currentTime;
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, now);
        masterGain.gain.linearRampToValueAtTime(0.11, now + 0.08);
        masterGain.gain.exponentialRampToValueAtTime(0.0008, now + durationSec * 1.45);
        masterGain.connect(ctx.destination);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1450, now);
        filter.connect(masterGain);

        const oscMelody = ctx.createOscillator();
        oscMelody.type = 'triangle';
        oscMelody.frequency.setValueAtTime(melodyFreq, now);
        oscMelody.connect(filter);
        oscMelody.start(now);
        oscMelody.stop(now + durationSec * 1.5);

        const oscHarmony = ctx.createOscillator();
        oscHarmony.type = 'sine';
        oscHarmony.frequency.setValueAtTime(harmonyFreq, now);
        const harmGain = ctx.createGain();
        harmGain.gain.setValueAtTime(0.45, now);
        oscHarmony.connect(harmGain);
        harmGain.connect(filter);
        oscHarmony.start(now);
        oscHarmony.stop(now + durationSec * 1.5);

        const oscBass = ctx.createOscillator();
        oscBass.type = 'sine';
        oscBass.frequency.setValueAtTime(bassFreq, now);
        const bassGain = ctx.createGain();
        bassGain.gain.setValueAtTime(0.55, now);
        oscBass.connect(bassGain);
        bassGain.connect(filter);
        oscBass.start(now);
        oscBass.stop(now + durationSec * 1.5);
      } catch {
        // Ignore Web Audio hardware errors gracefully
      }
    },
    []
  );

  const scheduleNextSynthNote = useCallback(() => {
    stopSynth();
    const currentIdx = stepIndexRef.current % MELODY_STEPS.length;
    const step = MELODY_STEPS[currentIdx];
    setStepIndex(currentIdx);

    triggerWarmNote(
      step.melodyFreq,
      step.bassFreq,
      step.harmonyFreq,
      step.durationMs / 1000
    );

    synthTimerRef.current = window.setTimeout(() => {
      stepIndexRef.current = (currentIdx + 1) % MELODY_STEPS.length;
      scheduleNextSynthNote();
    }, step.durationMs);
  }, [stopSynth, triggerWarmNote]);

  const handleTogglePlay = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      setStatusMessage('Paused · Tap to play');
      stopSynth();
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      return;
    }

    if (weddingConfig.music.audioSrc && !useSynthFallbackRef.current) {
      try {
        if (!audioElementRef.current) {
          audioElementRef.current = new Audio(weddingConfig.music.audioSrc);
          audioElementRef.current.loop = true;
          audioElementRef.current.muted = isMuted;
        }
        await audioElementRef.current.play();
        setIsPlaying(true);
        setStatusMessage('Playing Wedding Prelude');
        return;
      } catch {
        useSynthFallbackRef.current = true;
      }
    }

    setIsPlaying(true);
    setStatusMessage('Playing Chamber Prelude in D');
    scheduleNextSynthNote();
  };

  const handleRestartPhrase = () => {
    stepIndexRef.current = 0;
    setStepIndex(0);
    if (audioElementRef.current && !useSynthFallbackRef.current) {
      audioElementRef.current.currentTime = 0;
    } else if (isPlaying) {
      scheduleNextSynthNote();
    }
  };

  const handleSkipPhrase = () => {
    stepIndexRef.current = (stepIndexRef.current + 4) % MELODY_STEPS.length;
    setStepIndex(stepIndexRef.current);
    if (isPlaying && useSynthFallbackRef.current) {
      scheduleNextSynthNote();
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
    };
  }, [stopSynth]);

  const progressPercent = Math.round(((stepIndex + 1) / MELODY_STEPS.length) * 100);

  return (
    <>
      <section
        id="music"
        aria-label="Wedding Background Music Player"
        className="relative px-3.5 py-3"
      >
        <div className="relative w-full rounded-2xl paper-grain stationery-slab overflow-hidden px-6 py-9 text-center">
          <div
            className="pointer-events-none absolute inset-2.5 border border-[#C5A66A]/70 rounded-xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-3.5 border border-[#C5A66A]/30 rounded-lg"
            aria-hidden="true"
          />

          <FloralCorner position="top-left" className="w-28 h-28 absolute top-1 left-1 opacity-85" />
          <FloralCorner position="bottom-left" className="w-24 h-24 absolute bottom-1 left-1 opacity-75" />
          <FloralCorner position="bottom-right" className="w-24 h-24 absolute bottom-1 right-1 opacity-75" />

          <div className="relative z-10">
            <div className="relative w-26 h-26 mx-auto mb-5 flex items-center justify-center">
              <div
                className="w-full h-full rounded-full p-1.5 shadow-[0_12px_25px_rgba(73,56,46,0.28)] border border-[#C5A66A]"
                style={{
                  background: 'linear-gradient(135deg, #EAD5A7 0%, #B89555 50%, #86652B 100%)',
                }}
              >
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center relative overflow-hidden ${
                    isPlaying ? 'animate-vinyl-spin' : ''
                  }`}
                  style={{
                    background:
                      'radial-gradient(circle at 50% 50%, #4A3828 0%, #271C13 55%, #17100A 100%)',
                  }}
                >
                  <div className="absolute inset-2 rounded-full border border-[#C5A66A]/25" />
                  <div className="absolute inset-4 rounded-full border border-[#C5A66A]/20" />
                  <div className="absolute inset-6 rounded-full border border-[#C5A66A]/25" />
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#DFC48D] to-[#8F6E35] flex items-center justify-center shadow-inner">
                    <Music className="w-4 h-4 text-[#FFFDF9]" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="font-heading text-2xl text-[#49382E] font-semibold embossed-text">
              {weddingConfig.music.trackTitle}
            </h2>
            <p className="font-heading italic text-base text-[#5C473A] mt-0.5">
              {weddingConfig.music.subtitle}
            </p>

            {/* Transport Controls */}
            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={handleRestartPhrase}
                aria-label="Restart wedding melody"
                className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-[#7C5F2C] hover:bg-[#EFE5D5] transition-colors cursor-pointer"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
                className="btn-luxury-gold w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={handleSkipPhrase}
                aria-label="Next musical phrase"
                className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-[#7C5F2C] hover:bg-[#EFE5D5] transition-colors cursor-pointer"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Scrubber & Mute Bar */}
            <div className="mt-5 max-w-[260px] mx-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                aria-label={isMuted ? 'Unmute wedding music' : 'Mute wedding music'}
                className="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center text-[#7C5F2C] hover:text-[#49382E] cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <div
                className="flex-1 h-1.5 rounded-full bg-[#DED0BA] overflow-hidden relative"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Melody progress"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#AD925E] to-[#7D602B] rounded-full transition-all duration-300"
                  style={{ width: `${isPlaying ? progressPercent : 30}%` }}
                />
              </div>
            </div>

            <p className="mt-3 font-heading text-sm text-[#5C473A]">
              {statusMessage}
            </p>
            <p className="font-body text-[11px] text-[#7D6856] mt-0.5">
              (Gentle instrumental prelude · Never autoplays)
            </p>
          </div>
        </div>
      </section>

      {isPlaying && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label="Pause background wedding music"
            className="min-h-[44px] px-3.5 py-2 rounded-full bg-[#FAF5EC]/95 border border-[#C5A66A] shadow-[0_8px_20px_rgba(73,56,46,0.25)] flex items-center gap-2 text-xs font-heading text-[#49382E] cursor-pointer"
          >
            <span className="w-6 h-6 rounded-full bg-[#826532] text-[#FDFBF7] flex items-center justify-center">
              <Pause className="w-3 h-3 fill-current" />
            </span>
            <span className="font-medium pr-1 whitespace-nowrap">Wedding Vibes</span>
          </button>
        </div>
      )}
    </>
  );
};
