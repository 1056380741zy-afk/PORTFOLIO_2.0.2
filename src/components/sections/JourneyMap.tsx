import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { Award, Target } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MapPathLayer } from './MapPathLayer';
import { calculateAdaptiveMapScale } from '../../utils/journeyMapScale';
import type { JourneyCityId, JourneyImpact, JourneyNodeDetails, JourneyNodeDetailsMap } from '../../data/nodeDetails';
import { ArchiveCtaLink } from '../shared/DecorativeIcon';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const LAND_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json';

const CITIES: Array<{
  id: JourneyCityId;
  name: string;
  emoji: string;
  country: string;
  coordinates: [number, number];
  range: string;
  mapConfig: { center: [number, number]; scale: number };
}> = [
  {
    id: 'shanghai',
    name: 'Shanghai',
    emoji: '🇨🇳',
    country: 'China',
    coordinates: [121.4737, 31.2304] as [number, number],
    range: '2020.9 – 2024.8',
    mapConfig: { center: [110, 32] as [number, number], scale: 520 },
  },
  {
    id: 'alexandria',
    name: 'Alexandria',
    emoji: '🇪🇬',
    country: 'Egypt',
    coordinates: [29.9553, 31.2156] as [number, number],
    range: '2022.9 – 2023.6',
    mapConfig: { center: [32, 28] as [number, number], scale: 520 },
  },
  {
    id: 'dubai',
    name: 'Dubai',
    emoji: '🇦🇪',
    country: 'UAE',
    coordinates: [55.2708, 25.2048] as [number, number],
    range: '2024.9 – 2026.1',
    mapConfig: { center: [55, 24] as [number, number], scale: 520 },
  },
];

const HIGHLIGHT_CODES = new Set([
  '156', '158',
  '12', '012', '48', '048', '262', '818', '364', '368', '376',
  '400', '414', '422', '434', '504', '512', '634', '682', '729',
  '760', '788', '792', '784', '887', '275', '732',
]);

const ROUTE_SEGMENTS = [
  { from: CITIES[0].coordinates, to: CITIES[1].coordinates },
  { from: CITIES[1].coordinates, to: CITIES[2].coordinates },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface MapConfig {
  center: [number, number];
  scale: number;
}

export const JourneyMap: React.FC = () => {
  const { t, language } = useLanguage();
  const projectLinkClassName = `journey-project-link group relative inline-flex max-w-full items-center justify-start gap-2 whitespace-nowrap rounded-full border border-[#9f8fdb]/25 bg-[#9f8fdb]/10 px-4 py-2 text-left font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#7f65bf] transition-colors duration-200 hover:border-[#9f8fdb]/40 hover:bg-[#9f8fdb]/15 ${
    language === 'cn' ? 'w-[230px]' : 'w-[400px]'
  }`;

  const [activeCityIdx, setActiveCityIdx] = useState(0);
  const [projConfig, setProjConfig] = useState<MapConfig>({ center: [80, 28], scale: 380 });
  const [mapContainerHeight, setMapContainerHeight] = useState(760);

  const cityRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const animRef = useRef<number>();
  const currentConfigRef = useRef<MapConfig>({ center: [80, 28], scale: 380 });
  const targetConfigRef = useRef<MapConfig>({ center: [80, 28], scale: 380 });
  const lastRenderTimeRef = useRef(0);

  const animateMap = useCallback(() => {
    const cur = currentConfigRef.current;
    const tgt = targetConfigRef.current;
    const speed = 0.07;

    const newCX = lerp(cur.center[0], tgt.center[0], speed);
    const newCY = lerp(cur.center[1], tgt.center[1], speed);
    const newScale = lerp(cur.scale, tgt.scale, speed);

    currentConfigRef.current = { center: [newCX, newCY], scale: newScale };

    const now = performance.now();
    if (now - lastRenderTimeRef.current > 50) {
      lastRenderTimeRef.current = now;
      setProjConfig({ center: [newCX, newCY], scale: newScale });
    }

    const remaining =
      Math.abs(newCX - tgt.center[0]) +
      Math.abs(newCY - tgt.center[1]) +
      Math.abs(newScale - tgt.scale) / 100;

    if (remaining > 0.05) {
      animRef.current = requestAnimationFrame(animateMap);
    } else {
      currentConfigRef.current = { center: [...tgt.center] as [number, number], scale: tgt.scale };
      setProjConfig({ center: [...tgt.center] as [number, number], scale: tgt.scale });
    }
  }, []);

  useEffect(() => {
    const activeConfig = CITIES[activeCityIdx].mapConfig;
    const adaptiveScale = calculateAdaptiveMapScale(activeConfig.scale, mapContainerHeight);
    targetConfigRef.current = { center: activeConfig.center, scale: adaptiveScale };
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animateMap);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeCityIdx, animateMap, mapContainerHeight]);

  useEffect(() => {
    const element = mapContainerRef.current;
    if (!element) return;

    const updateHeight = () => {
      const rect = element.getBoundingClientRect();
      if (rect.height > 0) setMapContainerHeight(rect.height);
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(element);
    window.addEventListener('resize', updateHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  useEffect(() => {
    const container = document.getElementById('journey-details-scroll');
    if (!container) return;

    const handleScroll = () => {
      let bestIdx = 0;
      const threshold = container.clientHeight * 0.45;

      cityRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        if (ref.offsetTop <= container.scrollTop + threshold) {
          bestIdx = idx;
        }
      });

      setActiveCityIdx(bestIdx);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const getNodeDetails = (cityId: JourneyCityId): JourneyNodeDetails | undefined => {
    return (t.journey.nodeDetails as JourneyNodeDetailsMap | undefined)?.[cityId];
  };

  const activeCity = CITIES[activeCityIdx];
  const activeDetails = getNodeDetails(activeCity.id);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const container = document.getElementById('journey-details-scroll');
      container?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      setActiveCityIdx(0);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollToCity = (idx: number) => {
    setActiveCityIdx(idx);
    const el = cityRefs.current[idx];
    const container = document.getElementById('journey-details-scroll');
    if (el && container) {
      container.scrollTo({ top: el.offsetTop - 14, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="journey"
      className="min-h-0 overscroll-none overflow-hidden"
      style={{
        margin: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <div
        className="relative h-full max-h-full min-h-0 overflow-hidden bg-[#fcf9f0] p-4"
        style={{
          boxShadow: 'none',
        }}
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-32 w-44 opacity-45" style={{ backgroundImage: 'radial-gradient(circle, rgba(111,121,91,0.42) 1.15px, transparent 1.6px)', backgroundSize: '7px 7px', maskImage: 'linear-gradient(315deg, transparent 4%, black 100%)' }} />
        <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
          <header className="journey-layout-header h-[108px] shrink-0 rounded-[8px] border border-[#eadfd8]/80 bg-[#fffdf7]/72 px-7 py-5">
            <div className="min-w-[260px]">
              <h2 className="page-title journey-page-title mb-0 text-[#2D2926]">
                {t.journey.title}
              </h2>
            </div>

            <div className="journey-city-nav grid grid-cols-3 gap-3">
              {CITIES.map((city, idx) => {
                const isActive = activeCityIdx === idx;

                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => scrollToCity(idx)}
                    aria-label={`${city.name}, ${city.country}`}
                    className={`journey-city-index group flex min-h-[62px] items-center gap-3 rounded-[8px] border px-4 text-left transition-all duration-300 ${
                      isActive
                        ? 'journey-city-index-active'
                        : 'journey-city-index-idle'
                    }`}
                  >
                    <span
                      className="journey-city-number flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] font-mono text-sm font-bold transition-all duration-300"
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className={`block truncate text-sm font-bold ${isActive ? 'text-[#2D2926]' : 'text-[#635b53]'}`}>
                        {city.name}
                      </span>
                      <span className="mt-1 block truncate font-mono text-[10px] uppercase text-[#8b775f]/58">
                        {city.range} / {city.country}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </header>

          <div className="journey-content-grid grid flex-1 min-h-0 gap-4 overflow-hidden">
            <div
              ref={mapContainerRef}
              className="journey-map-paper relative flex min-h-0 items-center justify-center overflow-hidden rounded-[8px] border"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(200,191,175,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(200,191,175,0.18) 1px, transparent 1px)',
                backgroundSize: '44px 44px',
              }}
            >
              <div className="journey-ruler-top" aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => (
                  <span key={index}>{index * 10}°</span>
                ))}
              </div>
              <div className="journey-ruler-left" aria-hidden="true">
                {Array.from({ length: 11 }, (_, index) => (
                  <span key={index}>{index * 10}°</span>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 z-10 border border-white/70" />
              <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-32 w-40 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(111,121,91,0.38) 1px, transparent 1.4px)', backgroundSize: '8px 8px', maskImage: 'linear-gradient(135deg, transparent 15%, black 100%)' }} />
              <div className="pointer-events-none absolute left-6 top-6 z-20 rounded-[8px] border border-[#cfc8bb]/75 bg-[#fffdf7]/78 px-5 py-4 backdrop-blur-sm">
                <div className="flex items-center">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase text-[#8b775f]/62">
                      0{activeCityIdx + 1} / 03
                    </p>
                    <h3 className="text-2xl font-bold tracking-normal text-[#2D2926]">
                      {activeCity.name}
                    </h3>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-[8px] border border-[#2D2926]/10 bg-transparent px-3 py-1 font-mono text-[10px] uppercase text-[#2D2926]/56">
                    {activeCity.country}
                  </span>
                  <span className="rounded-[8px] border border-[#2D2926]/10 bg-transparent px-3 py-1 font-mono text-[10px] uppercase text-[#2D2926]/56">
                    {activeCity.range}
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-6 left-6 z-20 flex max-w-[560px] flex-wrap gap-2">
                {activeDetails?.impacts?.slice(0, 2).map((impact, idx) => (
                  <span
                    key={`${activeCity.id}-map-impact-${idx}`}
                    className="rounded-[8px] border border-[#cfc8bb]/72 bg-[#fffdf7]/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-[#635b53] backdrop-blur-sm"
                  >
                    {impact.title}
                  </span>
                ))}
              </div>

              <div className="journey-coordinate-note pointer-events-none absolute right-6 top-6 z-20 text-right font-mono text-[9px] leading-relaxed text-[#8b775f]">
                <p>distance = arccos(sin(phi1)sin(phi2) + cos(phi1)cos(phi2)cos(delta))R</p>
                <p>bearing = atan2(sin(delta)cos(phi2), cos(phi1)sin(phi2))</p>
              </div>

              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  center: projConfig.center,
                  scale: projConfig.scale,
                }}
                style={{
                  width: '100%',
                  height: '800px',
                  backgroundColor: 'transparent',
                }}
              >
                <defs>
                  <pattern id="hatch-ocean" width="4" height="5.5" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0.75" x2="4" y2="0.75" stroke="#cfc8bb" strokeWidth="0.8" opacity="0.7" />
                  </pattern>
                  <filter
                    id="journey-watercolor-wash"
                    x="-8%"
                    y="-8%"
                    width="116%"
                    height="116%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.022 0.04"
                      numOctaves="4"
                      seed="23"
                      result="washNoise"
                    />
                    <feColorMatrix
                      in="washNoise"
                      type="matrix"
                      values="1 0 0 0 0
                              0 1 0 0 0
                              0 0 1 0 0
                              0.22 0.58 0.1 0 0.14"
                      result="washAlpha"
                    />
                    <feComposite
                      in="SourceGraphic"
                      in2="washAlpha"
                      operator="in"
                      result="mottledWash"
                    />
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.009"
                      numOctaves="2"
                      seed="7"
                      result="edgeNoise"
                    />
                    <feDisplacementMap
                      in="mottledWash"
                      in2="edgeNoise"
                      scale="1.6"
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="softEdgeWash"
                    />
                    <feGaussianBlur in="softEdgeWash" stdDeviation="0.16" />
                  </filter>
                </defs>

                <rect x="-10000" y="-10000" width="20000" height="20000" fill="#f4ecdf" opacity={0.96} />
                <rect x="-10000" y="-10000" width="20000" height="20000" fill="url(#hatch-ocean)" opacity={0.28} />

                <Geographies geography={LAND_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <React.Fragment key={geo.rsmKey}>
                        <Geography
                          geography={geo}
                          fill="none"
                          stroke="#b8ae9b"
                          strokeWidth={9}
                          opacity={0.72}
                          style={{
                            default: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                            hover: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                          }}
                        />
                        <Geography
                          geography={geo}
                          fill="none"
                          stroke="#f4ecdf"
                          strokeWidth={7}
                          style={{
                            default: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                            hover: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                          }}
                        />
                      </React.Fragment>
                    ))
                  }
                </Geographies>

                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const id = geo.id || geo.properties?.ISO_A3;
                      const isChina = id === '156' || id === '158' || id === 'CHN' || id === 'TWN';
                      const isMENA = !isChina && HIGHLIGHT_CODES.has(id);
                      const usesWatercolorWash = isChina || isMENA;

                      let fill = '#dad6c7';
                      if (isChina) fill = '#a8a78e';
                      else if (isMENA) fill = '#a8a78e';

                      if (usesWatercolorWash) {
                        return (
                          <React.Fragment key={geo.rsmKey}>
                            <Geography
                              geography={geo}
                              fill="#dad6c7"
                              stroke="none"
                              opacity={0.9}
                              style={{
                                default: { outline: 'none', pointerEvents: 'none' },
                                hover: { outline: 'none', pointerEvents: 'none' },
                                pressed: { outline: 'none', pointerEvents: 'none' },
                              }}
                            />
                            <Geography
                              geography={geo}
                              fill="#919071"
                              stroke="none"
                              opacity={0.5}
                              filter="url(#journey-watercolor-wash)"
                              style={{
                                default: { outline: 'none', pointerEvents: 'none' },
                                hover: { outline: 'none', pointerEvents: 'none' },
                                pressed: { outline: 'none', pointerEvents: 'none' },
                              }}
                            />
                            <Geography
                              geography={geo}
                              fill="none"
                              stroke="#b8ae9b"
                              strokeWidth={0.34}
                              opacity={0.82}
                              style={{
                                default: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                                hover: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                                pressed: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                              }}
                            />
                          </React.Fragment>
                        );
                      }

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fill}
                          stroke="#b8ae9b"
                          strokeWidth={0.28}
                          opacity={0.84}
                          style={{
                            default: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                            hover: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                            pressed: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                <MapPathLayer
                  segments={[
                    {
                      from: ROUTE_SEGMENTS[0].from,
                      to: ROUTE_SEGMENTS[0].to,
                      isVisible: activeCityIdx >= 1,
                    },
                    {
                      from: ROUTE_SEGMENTS[1].from,
                      to: ROUTE_SEGMENTS[1].to,
                      isVisible: activeCityIdx >= 2,
                    },
                  ]}
                  color="#9f8fdb"
                />

                {CITIES.map((city, idx) => {
                  const isActive = activeCityIdx === idx;
                  const visited = idx <= activeCityIdx;

                  return (
                    <Marker key={city.id} coordinates={city.coordinates}>
                      <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.15, type: 'spring', stiffness: 200 }}
                        style={{ cursor: 'pointer' }}
                        onClick={() => scrollToCity(idx)}
                      >
                        <circle
                          r={isActive ? 10 : 5}
                          fill={isActive ? '#fcf9f0' : 'none'}
                          stroke={visited ? '#9f8fdb' : '#b8ae9b'}
                          strokeWidth={1.2}
                        />
                        <circle
                          r={isActive ? 4.5 : 2.4}
                          fill={visited ? '#9f8fdb' : '#b8ae9b'}
                        />
                        {isActive && (
                          <motion.circle
                            r={16}
                            fill="none"
                            stroke="#9f8fdb"
                            strokeWidth={0.65}
                            strokeDasharray="2 3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                          />
                        )}
                        <text
                          textAnchor="start"
                          x={isActive ? 14 : 9}
                          y={4}
                          style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: isActive ? 10 : 8,
                            fill: isActive ? '#7f65bf' : '#4d503f',
                            fontWeight: isActive ? 700 : 500,
                            pointerEvents: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0',
                          }}
                        >
                          {city.name}
                        </text>
                      </motion.g>
                    </Marker>
                  );
                })}
              </ComposableMap>
            </div>

            <aside className="archive-surface journey-field-notes relative flex min-h-0 flex-col overflow-hidden rounded-[8px] border">
              <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-36 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(111,121,91,0.34) 1px, transparent 1.4px)', backgroundSize: '8px 8px', maskImage: 'linear-gradient(135deg, transparent 12%, black 100%)' }} />
              <div
                id="journey-details-scroll"
                className="hide-scrollbar relative flex-1 overflow-y-auto overflow-x-hidden px-5 pb-5 pt-3"
              >
                {CITIES.map((city, idx) => {
                  const details = getNodeDetails(city.id);
                  const isActive = activeCityIdx === idx;
                  const impactGroups = details?.impacts?.reduce<JourneyImpact[][]>((groups, impact, impactIdx, impacts) => {
                    const shouldMerge = impactIdx === 0;
                    const isMergedFollowUp = impactIdx === 1;

                    if (shouldMerge) groups.push(impacts.slice(impactIdx, impactIdx + 2));
                    else if (!isMergedFollowUp) groups.push([impact]);
                    return groups;
                  }, []) ?? [];

                  return (
                    <div
                      key={city.id}
                      ref={(el) => { cityRefs.current[idx] = el; }}
                      className={`relative z-10 border-b border-[#cfc8bb]/55 pb-[14px] transition-opacity duration-500 last:border-b-0 last:pb-0 ${idx > 0 ? 'pt-[15px]' : ''} ${
                        isActive ? 'opacity-100' : 'opacity-55'
                      }`}
                      style={{
                        '--journey-city-material': ['#b59e71', '#985c4b', '#7e8966'][idx],
                      } as React.CSSProperties}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToCity(idx)}
                        className={`journey-city-header flex w-full items-start gap-3 text-left ${
                          isActive ? 'journey-city-header-active' : 'journey-city-header-idle'
                        }`}
                        style={{
                          '--journey-detail-material': ['#b59e71', '#985c4b', '#7e8966'][idx],
                        } as React.CSSProperties}
                      >
                        <span className={`journey-city-header-index flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] text-xl transition-all duration-300 ${
                          isActive ? 'bg-[#9f8fdb]/12 shadow-sm' : 'bg-[#f7f3ea] grayscale opacity-55'
                        }`}>
                          {city.emoji}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-3">
                            <span className={`truncate text-2xl font-bold tracking-normal ${
                              isActive ? 'text-[#2D2926]' : 'text-[#6d655c]'
                            }`}>
                              {city.name}
                            </span>
                            <span className="shrink-0 font-mono text-[10px] uppercase text-[#8b775f]/54">
                              0{idx + 1}
                            </span>
                          </span>
                          <span className="mt-1 block font-mono text-[10px] uppercase text-[#8b775f]/62">
                            {city.range} / {city.country}
                          </span>
                        </span>
                      </button>

                      {details && (
                        <div className="mt-4 flex flex-col gap-3">
                          {details.educations?.map((edu, eduIdx) => (
                            <div
                              key={eduIdx}
                              className="information-hover-card journey-information-card field-note journey-timeline-entry journey-education-note border-b border-[#cfc8bb]/45 bg-transparent px-1 py-4 last:border-b-0"
                            >
                              <h5 className="information-card-title text-base font-bold leading-tight text-[#2D2926]">
                                {edu.school}
                              </h5>
                              {edu.subSchool && (
                                <div className="mt-1 text-xs font-medium text-[#6d7480]">{edu.subSchool}</div>
                              )}
                              <div className="mt-3 flex items-center justify-between gap-4 border-t border-[#2D2926]/5 pt-3">
                                <span className="text-xs font-bold uppercase text-[#8b69cb]">
                                  {edu.degree}
                                </span>
                                <span className="shrink-0 font-mono text-[10px] text-[#8b775f]/54">
                                  {edu.period}
                                </span>
                              </div>
                              {(edu.focus || edu.honor) && (
                                <div className="mt-3 flex flex-col gap-1.5">
                                  {edu.focus && (
                                    <div className="flex items-start gap-2 text-xs leading-snug text-[#2D2926]">
                                      <Target size={12} className="mt-0.5 shrink-0 text-[#8b69cb]" />
                                      <span>{edu.focus}</span>
                                    </div>
                                  )}
                                  {edu.honor && (
                                    <div className="flex items-start gap-2 text-xs font-bold leading-snug text-[#2D2926]">
                                      <Award size={12} className="mt-0.5 shrink-0 text-[#d89a00]" />
                                      <span>{edu.honor}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}

                          {details.experiences?.map((exp, expIdx) => (
                            <div
                              key={expIdx}
                              className="information-hover-card journey-information-card field-note journey-timeline-entry journey-experience-note border-b border-[#cfc8bb]/45 bg-transparent px-1 py-4 last:border-b-0"
                            >
                              <h5 className="information-card-title text-base font-bold text-[#2D2926]">{exp.company}</h5>
                              <div className="mt-3 flex flex-col gap-2">
                                {exp.roles.map((role, rIdx) => (
                                  <div
                                    key={rIdx}
                                    className="border-t border-[#cfc8bb]/38 bg-transparent px-1 py-2.5 first:border-t-0"
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <span className={`text-xs font-bold leading-snug ${
                                        role.isPrimary ? 'text-[#8b69cb]' : 'text-[#2D2926]'
                                      }`}>
                                        {role.title}
                                      </span>
                                      <span className="shrink-0 font-mono text-[10px] text-[#8b775f]/54">
                                        {role.period}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}

                          {impactGroups.map((group, groupIdx) => {
                            const isMerged = group.length > 1;
                            const lastImpactIdx = (details.impacts?.length ?? 0) - 1;
                            const isLastGroup = group.some((impact) => details.impacts?.indexOf(impact) === lastImpactIdx);
                            const isLinkedGroup = group.some((impact) => {
                              const impactIdx = details.impacts?.indexOf(impact) ?? -1;
                              return (city.id === 'dubai' && impactIdx === 2)
                                || (city.id === 'shanghai' && impactIdx === lastImpactIdx);
                            });

                            return (
                              <div
                                key={`impact-group-${groupIdx}`}
                                className={`information-hover-card journey-information-card field-note journey-evidence-card ${
                                  isMerged ? 'journey-impact-group' : 'journey-impact-note'
                                } ${isLastGroup ? 'journey-evidence-card-last' : ''} ${
                                  isLinkedGroup ? 'journey-impact-note-linked' : ''
                                }`}
                              >
                                {group.map((impact, groupImpactIdx) => {
                                  const impactIdx = details.impacts?.indexOf(impact) ?? -1;

                                  return (
                                    <div
                                      key={impact.title}
                                      className={isMerged ? `journey-impact-content ${groupImpactIdx > 0 ? 'journey-impact-content-divider' : ''}` : undefined}
                                    >
                                      <h4 className="information-card-title text-xs font-bold uppercase text-[#2D2926]">
                                        {impact.title}
                                      </h4>
                                      <p className="mt-2 text-sm leading-relaxed text-[#5c6674]">
                                        {impact.desc}
                                      </p>
                                      {city.id === 'dubai' && impactIdx === 1 && (
                                        <div className="journey-project-link-row mt-3">
                                          <ArchiveCtaLink
                                            to="/projects/preview/activation"
                                            className={`${projectLinkClassName} mt-1`}
                                            iconClassName="absolute right-3 transition-transform duration-200 group-hover:translate-x-1"
                                          >
                                            {language === 'cn' ? '查看项目 02：国际活动运营' : 'View Project 02: International Event Operations'}
                                          </ArchiveCtaLink>
                                        </div>
                                      )}
                                      {city.id === 'dubai' && impactIdx === 2 && (
                                        <div className="journey-project-link-row mt-3">
                                          <ArchiveCtaLink
                                            to="/projects/preview/web3"
                                            className={`${projectLinkClassName} mt-1`}
                                            iconClassName="absolute right-3 transition-transform duration-200 group-hover:translate-x-1"
                                          >
                                            {language === 'cn' ? '查看项目 03：中东Web3研究与战略' : 'View Project 03: MENA Web3 Research & Strategy'}
                                          </ArchiveCtaLink>
                                        </div>
                                      )}
                                      {impact.statsType === 'boxes' && impact.stats && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                          {impact.stats.map((stat, sIdx) => (
                                            <div
                                              key={sIdx}
                                              className="evidence-slip h-[60px] min-w-[112px] rounded-[8px] border border-[#eadfd8]/72 bg-white px-3 py-2.5 shadow-sm"
                                            >
                                              <span className={`block text-xl font-black leading-none ${
                                                stat.theme === 'purple' ? 'text-[#9f8fdb]' : 'text-[#f5b002]'
                                              }`} style={{ fontFamily: '"Inter Variable", Inter, Arial, sans-serif' }}>
                                                {stat.value}
                                              </span>
                                              <span className="mt-1 block text-[10px] font-bold uppercase leading-tight text-[#5f554b]">
                                                {stat.label}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      {impact.statsType === 'tags' && impact.tags && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                          {impact.tags.map((tag: string, tIdx: number) => (
                                            <span
                                              key={tIdx}
                                              className="rounded-full border bg-[#f5b002]/[0.06] px-3 py-1 text-[11px] font-bold text-[#f0a900]"
                                              style={{ borderColor: 'rgb(245 176 2 / 0.36)' }}
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                      {city.id === 'shanghai' && impactIdx === lastImpactIdx && (
                                        <div className="journey-project-link-row mt-3">
                                          <ArchiveCtaLink
                                            to="/projects/preview/exhibition"
                                            className={projectLinkClassName}
                                            iconClassName="absolute right-3 transition-transform duration-200 group-hover:translate-x-1"
                                          >
                                            {language === 'cn' ? '查看项目 01：国际展会营销项目' : 'View Project 01: International Exhibition Campaigns'}
                                          </ArchiveCtaLink>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};
