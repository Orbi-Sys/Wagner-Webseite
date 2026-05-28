import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ReferencesGrid } from '@/components/references/ReferencesGrid';
import { createPageMetadata } from '@/lib/metadata';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return createPageMetadata(locale, 'meta.references', '/referenzen');
}

export default async function ReferencesPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('references_page');
  const tNav = await getTranslations('nav');

  return (
    <div className="section-padding max-w-7xl mx-auto">
      <Breadcrumb items={[{ label: tNav('references') }]} />
      <AnimateOnScroll direction="up">
        <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">{t('title')}</h1>
      </AnimateOnScroll>
      <AnimateOnScroll direction="up" delay={0.05}>
        <p className="text-text-muted max-w-3xl mb-8">{t('intro')}</p>
      </AnimateOnScroll>

      <ReferencesGrid />
    </div>
  );
}
