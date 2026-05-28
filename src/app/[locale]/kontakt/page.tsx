import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContactForm } from '@/components/contact/ContactForm';
import { createPageMetadata } from '@/lib/metadata';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return createPageMetadata(locale, 'meta.contact', '/kontakt');
}

export default async function ContactPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('contact_page');
  const tNav = await getTranslations('nav');
  const tFooter = await getTranslations('footer');
  const locationKeys = ['kazakhstan', 'belarus', 'poland', 'romania', 'bulgaria', 'uae'] as const;

  return (
    <div className="section-padding max-w-7xl mx-auto">
      <Breadcrumb items={[{ label: tNav('contact') }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-12">{t('title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-xl font-bold mb-6">{t('form_title')}</h2>
          <ContactForm />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-6">{t('company_info')}</h2>
          <address className="not-italic text-text-muted space-y-2 mb-8">
            <p className="font-medium text-text-dark">Wagner Feedmill & Silo Plants GmbH</p>
            <p>Haßkamp 7</p>
            <p>49688 Lastrup</p>
            <p>
              <a href="tel:+4944717016568" className="text-secondary hover:text-primary">
                Tel: +49 4471 / 70 16 568
              </a>
            </p>
            <p>
              <a href="tel:+4944717016569" className="text-secondary hover:text-primary">
                Fax: +49 4471 / 70 16 569
              </a>
            </p>
            <p>
              <a href="mailto:contact@wagner-feedmill.de" className="text-secondary hover:text-primary underline">
                contact@wagner-feedmill.de
              </a>
            </p>
          </address>
          <div className="aspect-video rounded-lg overflow-hidden border border-accent/30">
            <iframe
              title="Wagner Feedmill Standort Lastrup"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2415!2d7.87!3d52.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTGFzdHJ1cA!5e0!3m2!1sde!2sde!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">{t('international_title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locationKeys.map((key) => {
          const loc = tFooter.raw(`locations.${key}`) as {
            country: string;
            company: string;
            city: string;
            phone: string;
            email: string;
          };
          return (
            <div
              key={key}
              className="p-6 bg-light-bg rounded-lg border border-accent/30"
            >
              <h3 className="font-bold text-primary">{loc.country}</h3>
              <p className="font-medium mt-2">{loc.company}</p>
              <p className="text-text-muted text-sm">{loc.city}</p>
              <p className="text-sm mt-2">
                <a href={`tel:${loc.phone.replace(/\s/g, '')}`}>{loc.phone}</a>
              </p>
              <p className="text-sm">
                <a href={`mailto:${loc.email}`} className="text-secondary underline">
                  {loc.email}
                </a>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
