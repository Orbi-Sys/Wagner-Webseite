'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductLightboxProps {
  images: readonly string[];
  alt: string;
}

export function ProductLightbox({ images, alt }: ProductLightboxProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-square rounded-lg overflow-hidden focus:ring-2 focus:ring-accent"
          >
            <Image src={src} alt={`${alt} ${i + 1}`} fill className="object-cover" sizes="25vw" />
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative max-w-4xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[lightboxIndex]}
              alt={alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
