'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const t = useTranslations('contact_page');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newErrors: Record<string, string> = {};

    if (!data.get('name')) newErrors.name = t('required');
    if (!data.get('email')) newErrors.email = t('required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email')))) {
      newErrors.email = t('invalid_email');
    }
    if (!data.get('message')) newErrors.message = t('required');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const subject = encodeURIComponent(String(data.get('subject') || 'Kontakt'));
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nFirma: ${data.get('company')}\nTel: ${data.get('phone')}\n\n${data.get('message')}`
    );
    window.location.href = `mailto:contact@wagner-feedmill.de?subject=${subject}&body=${body}`;
  };

  const inputClass =
    'w-full px-4 py-3 border border-accent/40 rounded focus:outline-none focus:ring-2 focus:ring-secondary';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          {t('name')} *
        </label>
        <input id="name" name="name" className={inputClass} />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1">
          {t('company')}
        </label>
        <input id="company" name="company" className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {t('email')} *
        </label>
        <input id="email" name="email" type="email" className={inputClass} />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          {t('phone')}
        </label>
        <input id="phone" name="phone" type="tel" className={inputClass} />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          {t('subject')}
        </label>
        <select id="subject" name="subject" className={inputClass}>
          <option value="consultation">{t('subjects.consultation')}</option>
          <option value="products">{t('subjects.products')}</option>
          <option value="service">{t('subjects.service')}</option>
          <option value="career">{t('subjects.career')}</option>
          <option value="other">{t('subjects.other')}</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          {t('message')} *
        </label>
        <textarea id="message" name="message" rows={5} className={inputClass} />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
      </div>
      <Button type="submit" variant="primary">
        {t('submit')}
      </Button>
    </form>
  );
}
