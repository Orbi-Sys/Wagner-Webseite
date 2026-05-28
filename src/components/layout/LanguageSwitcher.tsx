'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const locales = [
  { code: 'de' as const, flag: '🇩🇪', label: 'DE' },
  { code: 'en' as const, flag: '🇬🇧', label: 'EN' },
  { code: 'ru' as const, flag: '🇷🇺', label: 'RU' },
];

interface LanguageSwitcherProps {
  variant?: 'header' | 'mobile';
}

export function LanguageSwitcher({ variant = 'header' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        variant === 'mobile' && 'justify-center py-4 border-t border-white/20'
      )}
    >
      {locales.map((loc) => (
        <button
          key={loc.code}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc.code })}
          className={cn(
            'px-2 py-1 text-sm transition-colors',
            locale === loc.code
              ? 'border-b-2 border-accent text-white font-medium'
              : 'text-white/80 hover:text-white border-b-2 border-transparent'
          )}
          aria-label={`Switch to ${loc.label}`}
          aria-current={locale === loc.code ? 'true' : undefined}
        >
          <span className="mr-1" aria-hidden="true">
            {loc.flag}
          </span>
          {loc.label}
        </button>
      ))}
    </div>
  );
}
