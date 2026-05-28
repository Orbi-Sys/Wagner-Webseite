'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'planning', href: '/projektierung-und-planung' },
  { key: 'products', href: '/produkte' },
  { key: 'references', href: '/referenzen' },
  { key: 'contact', href: '/kontakt' },
  { key: 'downloads', href: '/downloads' },
] as const;

const locales = [
  { code: 'de' as const, flag: '🇩🇪', label: 'DE' },
  { code: 'en' as const, flag: '🇬🇧', label: 'EN' },
  { code: 'ru' as const, flag: '🇷🇺', label: 'RU' },
] as const;

type LocaleCode = (typeof locales)[number]['code'];

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  const switchLocale = (code: LocaleCode) => {
    router.replace(pathname, { locale: code });
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-30 w-full bg-[#0d5770] border-b border-white/12 transition-shadow duration-300',
        scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.15)]' : 'shadow-none'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-[120px]">
        <Link href="/" className="flex items-center h-full flex-shrink-0">
          <Image
            src="/images/Wagner_Logo_Transparent.png"
            alt="Wagner Feedmill Logo"
            width={360}
            height={120}
            className="h-32 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-9 pl-8 border-l border-white/20">
          <nav className="flex items-center gap-9">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'group relative inline-flex items-center pb-1 text-sm font-medium uppercase tracking-[0.03em] transition-colors',
                  isActive(item.href)
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                )}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {t(item.key)}
                <span
                  className={cn(
                    'absolute left-0 -bottom-0.5 h-[2px] bg-[#73c3d6] transition-all duration-300',
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center rounded-[6px] bg-white/10 p-1">
            {locales.map((localeItem) => (
              <button
                key={localeItem.code}
                type="button"
                onClick={() => switchLocale(localeItem.code)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-[5px] px-2 py-1 text-sm font-medium transition-colors',
                  locale === localeItem.code
                    ? 'bg-white/20 text-[#73c3d6]'
                    : 'text-white/80 hover:text-white'
                )}
                aria-current={locale === localeItem.code ? 'true' : undefined}
              >
                <span aria-hidden="true">{localeItem.flag}</span>
                {localeItem.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-white"
          onClick={() => setMobileOpen(true)}
          aria-label="Menü öffnen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
