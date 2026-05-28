'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (code: LocaleCode) => {
    router.replace(pathname, { locale: code });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-[#0d5770] z-50 transform transition-transform duration-300 ease-out lg:hidden shadow-xl',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={onClose}
            className="text-white p-2 hover:text-[#73c3d6]"
            aria-label="Menü schließen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-6 gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'block rounded-xl px-4 py-4 text-xl font-semibold uppercase tracking-[0.03em] transition-colors border-b border-white/10',
                  active ? 'text-[#73c3d6] border-[#73c3d6]' : 'text-white/90 hover:text-white'
                )}
                aria-current={active ? 'page' : undefined}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/20 px-6 py-4">
          <div className="inline-flex items-center gap-2 rounded-[6px] bg-white/10 p-1">
            {locales.map((localeItem) => (
              <button
                key={localeItem.code}
                type="button"
                onClick={() => {
                  switchLocale(localeItem.code);
                  onClose();
                }}
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
      </div>
    </>
  );
}
