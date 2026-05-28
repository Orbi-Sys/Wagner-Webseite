'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Accordion } from '@/components/ui/Accordion';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'planning', href: '/projektierung-und-planung' },
  { key: 'products', href: '/produkte' },
  { key: 'references', href: '/referenzen' },
  { key: 'contact', href: '/kontakt' },
  { key: 'career', href: '/karriere' },
] as const;

const locationKeys = [
  'kazakhstan',
  'belarus',
  'poland',
  'romania',
  'bulgaria',
  'uae',
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  const accordionItems = locationKeys.map((key) => {
    const loc = t.raw(`locations.${key}`) as {
      country: string;
      company: string;
      city: string;
      phone: string;
      email: string;
    };
    return {
      id: key,
      title: loc.country,
      content: (
        <div className="space-y-1">
          <p className="font-medium">{loc.company}</p>
          <p>{loc.city}</p>
          <p>
            <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="hover:text-accent">
              {loc.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${loc.email}`} className="hover:text-accent underline">
              {loc.email}
            </a>
          </p>
        </div>
      ),
    };
  });

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Image
              src="/images/Wagner_Logo_Transparent.png"
              alt="Wagner Feedmill"
              width={213}
              height={64}
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm text-white/80 leading-relaxed">{t('about')}</p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/p/Wagner-Feedmill-Silo-Plants-GmbH-100077661606081/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/wagner_feedmill/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-accent mb-4">{tNav('home')}</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="hover:text-accent transition-colors">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-accent mb-4">{t('headquarters')}</h3>
            <address className="not-italic text-sm text-white/80 space-y-2">
              <p>Haßkamp 7</p>
              <p>49688 Lastrup</p>
              <p>
                <a href="tel:+4944717016568" className="hover:text-accent">
                  Tel: +49 4471 / 70 16 568
                </a>
              </p>
              <p>
                <a href="tel:+4944717016569" className="hover:text-accent">
                  Fax: +49 4471 / 70 16 569
                </a>
              </p>
              <p>
                <a href="mailto:contact@wagner-feedmill.de" className="hover:text-accent underline">
                  contact@wagner-feedmill.de
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-bold text-accent mb-4">{t('international')}</h3>
          <Accordion items={accordionItems} />
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/70">
          <p>{t('copyright', { year })}</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-accent">
              {tNav('imprint')}
            </Link>
            <Link href="/datenschutz" className="hover:text-accent">
              {tNav('privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
