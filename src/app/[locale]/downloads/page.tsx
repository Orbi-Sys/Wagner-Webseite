import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DownloadsList } from '@/components/downloads/DownloadsList';
import { createPageMetadata } from '@/lib/metadata';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return createPageMetadata(locale, 'meta.downloads', '/downloads');
}

export default async function DownloadsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('downloads_page');
  const tNav = await getTranslations('nav');

  return (
    <div className="section-padding max-w-7xl mx-auto">
      <Breadcrumb items={[{ label: tNav('downloads') }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-10">{t('title')}</h1>
      <DownloadsList />
    </div>
  );
}
