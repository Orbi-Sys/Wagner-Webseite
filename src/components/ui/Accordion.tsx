'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn('divide-y divide-accent/30 border border-accent/30 rounded-lg', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-white hover:bg-secondary/30 transition-colors"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className="text-accent text-lg">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-white/90">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
