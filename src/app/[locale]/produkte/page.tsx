import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ProductLightbox } from '@/components/products/ProductLightbox';
import { PRODUCT_CATEGORIES } from '@/lib/products';
import { createPageMetadata } from '@/lib/metadata';
import { getBreadcrumbSchema } from '@/lib/schema';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return createPageMetadata(locale, 'meta.products', '/produkte');
}

export default async function ProductsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('products');
  const tNav = await getTranslations('nav');
  const tCommon = await getTranslations('common');
  const tBreadcrumb = await getTranslations('breadcrumb');

  const base = 'https://wagner-feedmill.de';
  const prefix = locale === 'de' ? '' : `/${locale}`;
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: tBreadcrumb('home'), url: `${base}${prefix}` },
    { name: tNav('products'), url: `${base}${prefix}/produkte` },
  ]);

  return (
    <div className="section-padding">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: tNav('products') }]} />
        <AnimateOnScroll direction="up">
          <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-12">
            {tNav('products')}
          </h1>
        </AnimateOnScroll>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="lg:sticky lg:top-24 bg-light-bg rounded-lg p-4 border border-accent/30">
              <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                {PRODUCT_CATEGORIES.map((cat) => {
                  const product = t.raw(cat.id) as { title: string };
                  return (
                    <li key={cat.id}>
                      <a
                        href={`#${cat.id}`}
                        className="block whitespace-nowrap lg:whitespace-normal text-sm text-secondary hover:text-primary py-2 px-2 rounded hover:bg-white transition-colors"
                      >
                        {product.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="flex-1 space-y-16">
            {PRODUCT_CATEGORIES.map((cat, index) => {
              const product = t.raw(cat.id) as {
                title: string;
                long: string;
              };
              return (
                <AnimateOnScroll key={cat.id} direction="up" delay={index * 0.05}>
                <section id={cat.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-text-dark mb-4">
                    {product.title}
                  </h2>
                  <p className="text-text-muted leading-relaxed mb-6">{product.long}</p>
                  <ProductLightbox images={cat.gallery} alt={product.title} />
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm border border-accent/30 rounded-lg">
                      <thead className="bg-light-bg">
                        <tr>
                          <th className="px-4 py-2 text-left">{tCommon('spec_feature')}</th>
                          <th className="px-4 py-2 text-left">{tCommon('spec_value')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-accent/20">
                          <td className="px-4 py-2">{tCommon('technical_specs')}</td>
                          <td className="px-4 py-2 text-text-muted">—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="relative aspect-video max-w-md mt-6 rounded-lg overflow-hidden hidden">
                    <Image src={cat.image} alt={product.title} fill className="object-cover" />
                  </div>
                </section>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
