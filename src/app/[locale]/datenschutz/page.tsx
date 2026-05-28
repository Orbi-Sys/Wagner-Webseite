import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { createPageMetadata } from '@/lib/metadata';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return createPageMetadata(locale, 'meta.privacy', '/datenschutz');
}

export default async function PrivacyPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('legal');
  const tNav = await getTranslations('nav');

  return (
    <div className="section-padding max-w-3xl mx-auto">
      <Breadcrumb items={[{ label: tNav('privacy') }]} />
      <h1 className="text-3xl font-bold text-text-dark mb-8">{t('privacy_title')}</h1>
      <div className="prose text-text-muted whitespace-pre-line leading-relaxed">
        {t('privacy_content')}
      </div>
    </div>
  );
}
