'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export function DownloadsList() {
  const t = useTranslations('downloads_page');
  const items = t.raw('items') as Array<{
    title: string;
    category: string;
    size: string;
  }>;
  const [query, setQuery] = useState('');

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input
        type="search"
        placeholder={t('search')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md px-4 py-3 border border-accent/40 rounded mb-10 focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-6 bg-light-bg rounded-lg border border-accent/30"
          >
            <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-text-dark truncate">{item.title}</h3>
              <p className="text-sm text-text-muted">
                {t('type_pdf')} · {item.size}
              </p>
            </div>
            <Button href="#" variant="primary" className="flex-shrink-0 text-xs px-4 py-2">
              {t('download')}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
