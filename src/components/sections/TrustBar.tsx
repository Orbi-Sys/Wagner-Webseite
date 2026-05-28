import { useTranslations } from 'next-intl';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export function TrustBar() {
  const t = useTranslations('trust');

  const stats = [
    { value: t('years_value'), label: t('years') },
    { value: t('countries_value'), label: t('countries') },
    { value: t('capacity_value'), label: t('capacity') },
    { value: t('origin_value'), label: t('origin') },
  ];

  return (
    <section className="bg-primary text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <AnimateOnScroll key={i} direction="up" delay={i * 0.1}>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-white/90">{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
