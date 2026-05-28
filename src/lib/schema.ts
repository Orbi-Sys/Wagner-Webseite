export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Manufacturer',
    name: 'Wagner Feedmill & Silo Plants GmbH',
    url: 'https://wagner-feedmill.de',
    logo: 'https://wagner-feedmill.de/images/Wagner_Logo_Transparent.png',
    description:
      'Internationale Projektierung und Lieferung von Mischfutterwerken, Siloanlagen und Einzelmaschinen. Made in Germany.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Haßkamp 7',
      addressLocality: 'Lastrup',
      postalCode: '49688',
      addressCountry: 'DE',
    },
    telephone: '+49-4471-7016568',
    faxNumber: '+49-4471-7016569',
    email: 'contact@wagner-feedmill.de',
    areaServed: 'Worldwide',
    foundingLocation: {
      '@type': 'Place',
      name: 'Lastrup, Deutschland',
    },
    sameAs: [
      'https://www.facebook.com/p/Wagner-Feedmill-Silo-Plants-GmbH-100077661606081/',
      'https://www.instagram.com/wagner_feedmill/',
    ],
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
