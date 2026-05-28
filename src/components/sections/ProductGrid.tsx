import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/Card';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { PRODUCT_CATEGORIES } from '@/lib/products';

export function ProductGrid() {
  const t = useTranslations('products_section');
  const tProducts = useTranslations('products');

  return (
    <section className="bg-light-bg section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll direction="up">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark text-center mb-12">
            {t('title')}
          </h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCT_CATEGORIES.map((cat, index) => {
            const product = tProducts.raw(cat.id) as {
              title: string;
              description: string;
            };
            return (
              <AnimateOnScroll
                key={cat.id}
                direction="up"
                delay={index * 0.05}
                className="h-full"
              >
              <Card hover className="flex flex-col h-full">
                <div className="relative aspect-video">
                  <Image
                    src={cat.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-text-dark mb-2">
                    {product.title}
                  </h3>
                  <p className="text-text-muted text-sm flex-1 mb-4">
                    {product.description}
                  </p>
                  <Link
                    href={`/produkte#${cat.id}`}
                    className="text-secondary font-medium text-sm hover:text-primary transition-colors"
                  >
                    {t('learn_more')} →
                  </Link>
                </div>
              </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
