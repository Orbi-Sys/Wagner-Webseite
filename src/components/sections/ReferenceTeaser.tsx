import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const REF_IMAGES = [
  '/images/Mischanlage.webp',
  '/images/Siloanlagen.webp',
  '/images/Pelleting-systems-450x438-1.jpg.webp',
];

export function ReferenceTeaser() {
  const t = useTranslations('references_section');
  const items = t.raw('items') as Array<{
    country: string;
    name: string;
    type: string;
    imageAlt: string;
  }>;

  return (
    <section className="bg-light-bg section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll direction="up">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark text-center mb-12">
            {t('title')}
          </h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {items.map((item, index) => (
            <AnimateOnScroll key={index} direction="up" delay={index * 0.1}>
            <Card>
              <div className="relative aspect-video">
                <Image
                  src={REF_IMAGES[index]}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded">
                  {item.country}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-text-dark">{item.name}</h3>
                <p className="text-text-muted text-sm mt-1">{item.type}</p>
              </div>
            </Card>
            </AnimateOnScroll>
          ))}
        </div>
        <AnimateOnScroll direction="up" className="text-center">
          <Button href="/referenzen" variant="primary">
            {t('view_all')}
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
