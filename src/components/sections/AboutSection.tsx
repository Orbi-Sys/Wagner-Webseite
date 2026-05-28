import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="bg-white section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimateOnScroll direction="left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-6">
              {t('title')}
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">{t('text')}</p>
            <Link
              href="/projektierung-und-planung"
              className="text-secondary font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              {t('cta')} →
            </Link>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll direction="right">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/Projektierung.webp"
              alt="Wagner Feedmill Projektierung und CAD-Planung"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
