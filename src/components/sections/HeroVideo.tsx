"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { useEffect, useRef } from 'react';

export function HeroVideo() {
  const t = useTranslations('hero');
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Ensure the video is muted at the element level (some browsers
    // require the property to be set programmatically for autoplay).
    try {
      v.muted = true;
      // Attempt to play; browsers will reject if autoplay is disallowed.
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch (e) {
      // ignore
    }
  }, []);

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
        // avoid unnecessary download on mobile; metadata is enough for poster
        preload="metadata"
        poster="/images/Projektierung.webp"
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={t('title')}
      >
        <source src="/video/feedmill-converted.mp4" type="video/mp4" />
      </video>
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
