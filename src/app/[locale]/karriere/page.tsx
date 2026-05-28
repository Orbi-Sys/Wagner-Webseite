import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createPageMetadata } from '@/lib/metadata';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return createPageMetadata(locale, 'meta.career', '/karriere');
}

export default async function CareerPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('career_page');
  const tNav = await getTranslations('nav');
  const benefits = t.raw('benefits') as string[];
  const jobs = t.raw('jobs') as Array<{
    title: string;
    department: string;
    location: string;
    type: string;
  }>;

  return (
    <div className="section-padding max-w-7xl mx-auto">
      <Breadcrumb items={[{ label: tNav('career') }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">{t('title')}</h1>
      <p className="text-text-muted max-w-3xl mb-8">{t('intro')}</p>

      <ul className="flex flex-wrap gap-3 mb-12">
        {benefits.map((b, i) => (
          <li
            key={i}
            className="px-4 py-2 bg-light-bg border border-accent/30 rounded-full text-sm text-secondary font-medium"
          >
            {b}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-6">{t('open_positions')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {jobs.map((job, i) => (
          <Card key={i} className="p-6">
            <h3 className="font-bold text-lg text-text-dark">{job.title}</h3>
            <p className="text-secondary text-sm mt-1">{job.department}</p>
            <p className="text-text-muted text-sm mt-2">{job.location}</p>
            <span className="inline-block mt-3 text-xs bg-accent/20 text-primary px-3 py-1 rounded">
              {job.type === 'full_time' ? t('full_time') : t('part_time')}
            </span>
          </Card>
        ))}
      </div>

      <div className="bg-primary text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold mb-2">{t('initiative_title')}</h2>
        <p className="text-accent mb-6">{t('initiative_text')}</p>
        <Button
          href="mailto:contact@wagner-feedmill.de?subject=Bewerbung"
          variant="secondary"
        >
          {t('apply')}
        </Button>
      </div>
    </div>
  );
}
