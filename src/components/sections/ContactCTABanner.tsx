import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export function ContactCTABanner() {
  const t = useTranslations('cta_banner');

  return (
    <section className="bg-primary text-white section-padding text-center">
      <AnimateOnScroll direction="up" className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('title')}</h2>
        <p className="text-accent text-lg mb-8">{t('subtitle')}</p>
        <Button href="/kontakt" variant="secondary" className="!bg-secondary">
          {t('button')}
        </Button>
      </AnimateOnScroll>
    </section>
  );
}
