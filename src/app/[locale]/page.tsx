import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { TrustBar } from '@/components/sections/TrustBar';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { TeamSection } from '@/components/sections/TeamSection';
import { ReferenceTeaser } from '@/components/sections/ReferenceTeaser';
import { ContactCTABanner } from '@/components/sections/ContactCTABanner';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  const base = 'https://wagner-feedmill.de';
  const prefix = locale === 'de' ? '' : `/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Mischfutterwerk',
      'Siloanlagen',
      'Feedmill',
      'Futtermittelanlage',
      'Hammermühle',
      'Pelletpresse',
      'Made in Germany',
      'Lastrup',
    ],
    alternates: {
      canonical: `${base}${prefix}`,
      languages: {
        de: base,
        en: `${base}/en`,
        ru: `${base}/ru`,
      },
    },
    openGraph: {
      title: 'Wagner Feedmill – Mischfutterwerke & Siloanlagen',
      description: t('description'),
      url: `${base}${prefix}`,
      siteName: 'Wagner Feedmill',
      locale: locale === 'de' ? 'de_DE' : locale === 'en' ? 'en_US' : 'ru_RU',
      type: 'website',
    },
  };
}

export default function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <>
      <HeroVideo />
      <TrustBar />
      <AboutSection />
      <ProductGrid />
      <TeamSection />
      <ReferenceTeaser />
      <ContactCTABanner />
    </>
  );
}
