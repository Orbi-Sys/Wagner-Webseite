'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export function CookieBanner() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(true);
  const [choice, setChoice] = useState<'accepted' | 'declined' | null>(null);

  if (!visible || choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-accent shadow-lg p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-text-muted flex-1">{t('text')}</p>
        <div className="flex gap-3 flex-shrink-0">
          <Button
            variant="primary"
            onClick={() => {
              setChoice('accepted');
              setVisible(false);
            }}
          >
            {t('accept')}
          </Button>
          <button
            type="button"
            onClick={() => {
              setChoice('declined');
              setVisible(false);
            }}
            className="px-6 py-3 text-sm font-medium text-text-muted border border-text-muted/30 rounded hover:bg-light-bg transition-colors"
          >
            {t('decline')}
          </button>
        </div>
      </div>
    </div>
  );
}
