export const PRODUCT_CATEGORIES = [
  {
    id: 'annahme-reinigung',
    image: '/images/Annahme und Reinigungsystem.webp',
    gallery: [
      '/images/Annahme und Reinigungsystem.webp',
      '/images/Annahme_und_reinigungssystem_2.webp',
    ],
  },
  {
    id: 'siloanlagen',
    image: '/images/Siloanlagen.webp',
    gallery: [
      '/images/Siloanlagen.webp',
      '/images/Siloanlagen_2.webp',
      '/images/Silo-450x338-1-pwhh6pd1r6ycfwxrjdmhy76xxlxsfsp7o47qq7c16o.jpg',
    ],
  },
  {
    id: 'foerdertechnik',
    image: '/images/Fördertechnik.webp',
    gallery: [
      '/images/Fördertechnik.webp',
      '/images/Fördertechnik_2.webp',
      '/images/Fördertechnik_3.webp',
      '/images/Fördertechnik_4.webp',
    ],
  },
  {
    id: 'mahl-misch',
    image: '/images/Mischanlage.webp',
    gallery: ['/images/Mischanlage.webp', '/images/Mischanlage_2.webp'],
  },
  {
    id: 'premix',
    image: '/images/Premixanlage.webp',
    gallery: [
      '/images/Premixanlage.webp',
      '/images/Premix-dosing-systems_01_Dosierwaage_Osterhuber_1-286x450-1.jpg.webp',
      '/images/Premix-lines-2_1-450x428-1.jpg.webp',
      '/images/Premixsystems-MAI-2017-128_1-338x450-1.jpg.webp',
    ],
  },
  {
    id: 'pelletierung',
    image: '/images/Pelleting-systems-450x438-1.jpg.webp',
    gallery: [
      '/images/Pelleting-systems-450x438-1.jpg.webp',
      '/images/Pelleting-systems-CLM1000H_1-383x450-1.jpg.webp',
      '/images/Pelleting-systems_Hand-450x429-1.jpg.webp',
    ],
  },
  {
    id: 'extrusion',
    image: '/images/Extruder-CN-WFM-1024x715.jpg.webp',
    gallery: [
      '/images/Extruder-CN-WFM-1024x715.jpg.webp',
      '/images/Extrudierlinie-1024x576.jpg.webp',
    ],
  },
  {
    id: 'steuerung',
    image: '/images/controling_systems_02_website.jpg.webp',
    gallery: [
      '/images/controling_systems_02_website.jpg.webp',
      '/images/Controling-systems-2019-01-22_18-33-00_986_1-450x338_Wagner.jpg.webp',
      '/images/Controling-systems-IMG_4904_1-450x338-1.jpg.webp',
    ],
  },
  {
    id: 'futterwagen',
    image: '/images/Futterwagen.webp',
    gallery: [
      '/images/Futterwagen.webp',
      '/images/futterverteilerwagen_wagner_klein-386x450-1.jpg.webp',
    ],
  },
  {
    id: 'silos',
    image: '/images/Silo_DSC01524_klein-450x288-1-pwhh6f0to0k6w7cs7r5lorsvedcr34k5yp1eg5rd34.jpg',
    gallery: [
      '/images/Silo_DSC01524_klein-450x288-1-pwhh6f0to0k6w7cs7r5lorsvedcr34k5yp1eg5rd34.jpg',
      '/images/Silo-450x338-1-pwhh6pd1r6ycfwxrjdmhy76xxlxsfsp7o47qq7c16o.jpg',
    ],
  },
  {
    id: 'absackanlagen',
    image: '/images/Absackanlage.webp',
    gallery: ['/images/Absackanlage.webp', '/images/Absackanlage_2.webp'],
  },
] as const;

export type ProductCategoryId = (typeof PRODUCT_CATEGORIES)[number]['id'];
