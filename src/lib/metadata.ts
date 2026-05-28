import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function createPageMetadata(
  locale: string,
  namespace: string,
  path: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const base = 'https://wagner-feedmill.de';
  const prefix = locale === 'de' ? '' : `/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${base}${prefix}${path}`,
      languages: {
        de: `${base}${path}`,
        en: `${base}/en${path}`,
        ru: `${base}/ru${path}`,
      },
    },
  };
}
