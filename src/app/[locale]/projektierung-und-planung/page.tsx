import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createPageMetadata } from '@/lib/metadata';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return createPageMetadata(locale, 'meta.planning', '/projektierung-und-planung');
}

export default async function PlanningPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('planning_page');
  const tNav = await getTranslations('nav');
  const steps = t.raw('steps') as Array<{ title: string; desc: string }>;
  const segments = t.raw('segments') as Record<
    string,
    { title: string; capacity: string }
  >;

  return (
    <>
      <section className="relative h-64 md:h-80 flex items-center justify-center">
        <Image
          src="/images/Siloanlagen.webp"
          alt={t('hero_title')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <AnimateOnScroll direction="up" className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
            {t('hero_title')}
          </h1>
        </AnimateOnScroll>
      </section>

      <div className="section-padding max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: tNav('planning') }]} />
        <AnimateOnScroll direction="up">
          <p className="text-text-muted text-lg max-w-3xl mb-16">{t('intro')}</p>
        </AnimateOnScroll>

        <AnimateOnScroll direction="up">
          <h2 className="text-2xl font-bold mb-8">{t('title')}</h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-2 mb-16">
          {steps.map((step, i) => (
            <AnimateOnScroll key={i} direction="up" delay={i * 0.05}>
            <div
              className="relative flex md:flex-col items-start md:items-center gap-4 md:text-center p-4 bg-light-bg rounded-lg border border-accent/30 h-full"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-sm">{step.title}</h3>
                <p className="text-text-muted text-xs mt-1">{step.desc}</p>
              </div>
            </div>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.entries(segments).map(([key, seg], i) => (
            <AnimateOnScroll key={key} direction="up" delay={i * 0.05}>
            <Card className="p-6 text-center h-full">
              <h3 className="font-bold text-primary text-lg">{seg.title}</h3>
              <p className="text-text-muted text-sm mt-2">{seg.capacity}</p>
            </Card>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll direction="up" className="text-center">
          <Button href="/kontakt" variant="primary">
            {t('cta')}
          </Button>
        </AnimateOnScroll>
      </div>
    </>
  );
}
