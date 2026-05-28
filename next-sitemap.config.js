/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://wagner-feedmill.de',
  generateRobotsTxt: true,
  alternateRefs: [
    { href: 'https://wagner-feedmill.de', hreflang: 'de' },
    { href: 'https://wagner-feedmill.de/en', hreflang: 'en' },
    { href: 'https://wagner-feedmill.de/ru', hreflang: 'ru' },
  ],
  additionalPaths: async (config) => {
    const locales = ['', '/en', '/ru'];
    const paths = [
      '',
      '/produkte',
      '/projektierung-und-planung',
      '/referenzen',
      '/kontakt',
      '/downloads',
      '/karriere',
      '/impressum',
      '/datenschutz',
    ];
    const result = [];
    for (const locale of locales) {
      for (const path of paths) {
        result.push({
          loc: `${locale}${path}`,
          changefreq: 'weekly',
          priority: path === '' ? 1.0 : 0.8,
          lastmod: new Date().toISOString(),
        });
      }
    }
    return result;
  },
};
