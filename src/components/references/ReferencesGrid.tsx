'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { cn } from '@/lib/utils';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type Region = 'all' | 'europe' | 'asia' | 'middle_east';

interface ReferenceItem {
  id: number;
  region: Region;
  country: string;
  location: string;
  image: string;
  capacity: string;
  type: string;
  lat: number;
  lon: number;
}

const references: ReferenceItem[] = [
  {
    id: 1,
    region: 'europe',
    country: 'Deutschland',
    location: 'Lastrup',
    image: '/images/Mischanlage.webp',
    capacity: '40 t/h',
    type: 'Industrie',
    lat: 52.7,
    lon: 7.9,
  },
  {
    id: 2,
    region: 'asia',
    country: 'Kasachstan',
    location: 'Astana',
    image: '/images/Siloanlagen.webp',
    capacity: '25 t/h',
    type: 'Silo & Trockner',
    lat: 51.2,
    lon: 71.4,
  },
  {
    id: 3,
    region: 'europe',
    country: 'Polen',
    location: 'Warschau',
    image: '/images/Premixanlage.webp',
    capacity: '8 t/h',
    type: 'Landwirtschaft',
    lat: 52.2,
    lon: 21.0,
  },
  {
    id: 4,
    region: 'europe',
    country: 'Rumänien',
    location: 'Timiș',
    image: '/images/Pelleting-systems-450x438-1.jpg.webp',
    capacity: '15 t/h',
    type: 'Pelletierung',
    lat: 45.8,
    lon: 21.2,
  },
  {
    id: 5,
    region: 'middle_east',
    country: 'VAE',
    location: 'Sharjah',
    image: '/images/Extruder-CN-WFM-1024x715.jpg.webp',
    capacity: '12 t/h',
    type: 'Extrusion',
    lat: 25.3,
    lon: 55.4,
  },
  {
    id: 6,
    region: 'europe',
    country: 'Bulgarien',
    location: 'Sofia',
    image: '/images/Futterwagen.webp',
    capacity: '5 t/h',
    type: 'Mobile Anlage',
    lat: 42.7,
    lon: 23.3,
  },
];

export function ReferencesGrid() {
  const t = useTranslations('references_page');
  const [filter, setFilter] = useState<Region>('all');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);

  const filtered =
    filter === 'all' ? references : references.filter((r) => r.region === filter);

  const filters: { key: Region; label: string }[] = [
    { key: 'all', label: t('filter_all') },
    { key: 'europe', label: t('filter_europe') },
    { key: 'asia', label: t('filter_asia') },
    { key: 'middle_east', label: t('filter_middle_east') },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-10">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              'px-4 py-2 rounded text-sm font-medium transition-colors',
              filter === f.key
                ? 'bg-primary text-white'
                : 'bg-light-bg text-text-muted hover:bg-accent/20'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <AnimateOnScroll direction="up" className="mb-10">
        <Card className="w-full h-[400px] overflow-hidden bg-slate-950 border-slate-800">
          <div
            className="relative w-full h-full bg-[#0d1f2d]"
            onMouseMove={(e) => {
              setTooltipX(e.clientX);
              setTooltipY(e.clientY);
            }}
          >
            <ComposableMap
              projectionConfig={{ scale: 220, center: [45, 35], rotate: [-10, 0, 0] }}
              width={800}
              height={400}
              style={{ width: '100%', height: '100%' }}
              className="absolute inset-0"
              aria-hidden="true"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1a3a4f"
                      stroke="#2d6a7f"
                      strokeWidth={0.5}
                    />
                  ))
                }
              </Geographies>
              {references.map((ref) => {
                const active = filter === 'all' || filter === ref.region;

                return (
                  <Marker key={ref.id} coordinates={[ref.lon, ref.lat]}>
                    <g
                      className="group cursor-pointer"
                      onMouseEnter={() => setHoveredId(ref.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <circle
                        r={6}
                        fill={active ? '#73c3d6' : '#334d5c'}
                        opacity={active ? 1 : 0.4}
                        stroke="#ffffff"
                        strokeWidth={1}
                        className={cn(
                          'transition-all duration-200',
                          active ? 'filter drop-shadow-[0_0_4px_#73c3d6]' : 'hover:opacity-70'
                        )}
                      />
                    </g>
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>
        </Card>
      </AnimateOnScroll>

      {hoveredId && (() => {
        const ref = references.find((item) => item.id === hoveredId)!;
        return (
          <div
            className="fixed z-50 pointer-events-none rounded-lg border border-slate-600 bg-slate-900/95 p-3 text-white text-sm shadow-xl"
            style={{ left: tooltipX + 12, top: tooltipY - 10 }}
          >
            <div className="font-semibold">{ref.type}</div>
            <div className="text-slate-300">{ref.country}</div>
            <div className="text-slate-400 text-xs">{ref.location}</div>
            <div className="text-[#73c3d6] text-xs">{ref.capacity}</div>
          </div>
        );
      })()}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((ref) => (
          <Card key={ref.id}>
            <div className="relative aspect-video">
              <Image
                src={ref.image}
                alt={`Referenz ${ref.country} ${ref.type}`}
                fill
                className="object-cover"
                sizes="33vw"
              />
              <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded">
                {ref.country}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-bold">{ref.type}</h3>
              <p className="text-sm text-text-muted mt-2">
                {t('capacity')}: {ref.capacity}
              </p>
              <p className="text-sm text-text-muted">
                {t('plant_type')}: {ref.type}
              </p>
              <p className="text-sm text-text-muted mt-3">
                <span className="font-medium text-text-dark">{t('location')}:</span> {ref.location}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
