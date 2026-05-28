"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { useEffect, useRef, useState } from 'react';

export function HeroVideo() {
  const t = useTranslations('hero');
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Ensure the video is muted at the element level (some browsers
    // require the property to be set programmatically for autoplay).
    try {
      v.muted = true;
      // Attempt to play; browsers will reject if autoplay is disallowed.
      const p = v.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          // playing succeeded
          setShowOverlay(false);
        }).catch(() => {
          // autoplay blocked — show overlay for user to start playback
          setShowOverlay(true);
        });
      }
      // Also double-check after a short delay in case the promise resolves
      // but playback doesn't start immediately.
      setTimeout(() => {
        if (v.paused) setShowOverlay(true);
      }, 300);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleOverlayPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
    setShowOverlay(false);
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        // iOS-specific attribute to allow inline playback (added via spread to satisfy TS)
        {...{'webkit-playsinline': ''}}
        // preload metadata (keeps mobile data usage lower than full) but
        // allow browsers to fetch enough to autoplay when permitted
        preload="metadata"
        poster="/images/Projektierung.webp"
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={t('title')}
      >
        <source src="/video/feedmill-converted.mp4" type="video/mp4" />
      </video>
      {showOverlay && (
        <button
          onClick={handleOverlayPlay}
          aria-label="Play video"
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/50"
        >
          <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <circle cx="44" cy="44" r="44" fill="#ffffff" fillOpacity="0.08" />
            <path d="M34 30v28l26-14L34 30z" fill="#fff" />
          </svg>
        </button>
      )}
      <div
        className="absolute inset-0 bg-black/45"
        aria-hidden="true"
      />
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white py-24"
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl text-accent mb-10">{t('subtitle')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/kontakt" variant="primary" className="!bg-primary">
            {t('cta_primary')}
          </Button>
          <Button href="/produkte" variant="outline">
            {t('cta_secondary')}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
