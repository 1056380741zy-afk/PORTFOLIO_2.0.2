import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { Target, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MapPathLayer } from './MapPathLayer';
import { calculateAdaptiveMapScale } from '../../utils/journeyMapScale';
import type { JourneyCityId, JourneyNodeDetails, JourneyNodeDetailsMap } from '../../data/nodeDetails';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const LAND_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json';

// --- City definitions ---
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
    // Map config: zoomed to show China clearly
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
    range: '2024.9 – 2025.11',
    mapConfig: { center: [55, 24] as [number, number], scale: 520 },
  },
];

// Highlighted country codes: China + MENA region
const HIGHLIGHT_CODES = new Set([
  '156', '158', // China, Taiwan
  '12', '012', '48', '048', '262', '818', '364', '368', '376',
  '400', '414', '422', '434', '504', '512', '634', '682', '729',
  '760', '788', '792', '784', '887', '275', '732',
]);

// Route segments between cities
const ROUTE_SEGMENTS = [
  { from: CITIES[0].coordinates, to: CITIES[1].coordinates }, // Shanghai → Alexandria
  { from: CITIES[1].coordinates, to: CITIES[2].coordinates }, // Alexandria → Dubai
];

const HIGHLIGHT_TAGS = new Set([
  '~800 Daily Peak Visits',
  '30.2% eDM Open Rate',
  '8.5% CTR',
  'Top 1 Comprehensive Evaluation',
  'Academic Excellence Certificate',
  'Diplomatic Reception',
  'Academic Summit Coordination',
  '日访问峰值近 800 次',
  'eDM 打开率 30.18%',
  '点击率 8.50%',
  'Top 1 综合测评',
  '学业优秀证明',
  '中 / 英 / 阿 多语种',
  '外事活动接待',
  '学术峰会协调',
]);

// Navbar height in px (matches sticky top-0 nav: py-4 + text = ~60px)
const NAVBAR_HEIGHT = 60;

// --- Lerp helpers ---
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface MapConfig {
  center: [number, number];
  scale: number;
}

// --- Main Component ---
export const JourneyMap: React.FC = () => {
  const { t } = useLanguage();

  const [activeCityIdx, setActiveCityIdx] = useState(0);
  const [projConfig, setProjConfig] = useState<MapConfig>({ center: [80, 28], scale: 380 });
  const [mapContainerHeight, setMapContainerHeight] = useState(760);

  const cityRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Animation refs – avoid triggering re-renders inside animation loop
  const animRef = useRef<number>();
  const currentConfigRef = useRef<MapConfig>({ center: [80, 28], scale: 380 });
  const targetConfigRef = useRef<MapConfig>({ center: [80, 28], scale: 380 });
  const lastRenderTimeRef = useRef(0);

  // --- Map projection animation (rAF lerp, throttled to ~20fps) ---
  const animateMap = useCallback(() => {
    const cur = currentConfigRef.current;
    const tgt = targetConfigRef.current;
    const speed = 0.07;

    const newCX = lerp(cur.center[0], tgt.center[0], speed);
    const newCY = lerp(cur.center[1], tgt.center[1], speed);
    const newScale = lerp(cur.scale, tgt.scale, speed);

    currentConfigRef.current = { center: [newCX, newCY], scale: newScale };

    // Throttle setState to ~20fps to avoid excessive SVG re-renders
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
      // Snap to target
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

  // --- Container scroll-based active city detection ---
  useEffect(() => {
    const container = document.getElementById('journey-details-scroll');
    if (!container) return;

    const handleScroll = () => {
      let bestIdx = 0;
      const threshold = container.clientHeight * 0.45;

      cityRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const top = (ref as HTMLElement).offsetTop;
        if (top <= (container as HTMLElement).scrollTop + threshold) {
          bestIdx = idx;
        }
      });

      setActiveCityIdx(bestIdx);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Helpers ---
  const getNodeDetails = (cityId: JourneyCityId): JourneyNodeDetails | undefined => {
    return (t.journey.nodeDetails as JourneyNodeDetailsMap | undefined)?.[cityId];
  };

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
      const top = el.offsetTop - 12;
      container.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="journey"
      className="min-h-0 overscroll-none overflow-hidden bg-[#fdfcf4] rounded-[28px]"
      style={{
        marginTop: '20px',
        marginLeft: '5px',
        width: 'calc(100% - 13px)',
        height: 'calc(100% - 47px)',
      }}
    >
      <div
        style={{
          height: '100%',
          maxHeight: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          borderRadius: '28px',
          backgroundColor: '#fdfcf4',
        }}
      >
        {/* ── Two-Column Body: 40/60 Split ── */}
        <div
          className="flex flex-col lg:flex-row w-full h-full max-h-full min-h-0 overflow-hidden rounded-[28px] bg-[#fdfcf4] shadow-[0_10px_30px_rgba(45,45,45,0.035)]"
          style={{
            clipPath: 'inset(0 round 28px)',
            contain: 'paint',
            marginTop: '5px',
            justifyContent: 'center',
            gap: 0,
          }}
        >

        {/* ── Left Column: Fixed heading + scrollable timeline (40% width on desktop) ── */}
        <div
          className="w-full lg:w-[40%] relative lg:border-r lg:border-[#c4c2b7]/15 min-h-0 overflow-hidden flex flex-col items-stretch justify-center"
          style={{
            marginTop: '15px',
            marginBottom: '15px',
            width: '485px',
            height: 'calc(100% - 30px)',
          }}
        >
          <div className="shrink-0 px-[15px]">
            <div className="pt-4 md:pt-5 pb-3">
              <div className="px-6 md:px-7 py-4 md:py-5 bg-[#fdfcf4] backdrop-blur-sm rounded-[32px]">
              <div className="flex items-end justify-between">
                <h2 className="page-title mb-0">
                  {t.journey.title}
                </h2>
                <p className="text-xs text-[#2D2926]/60 hidden md:block uppercase tracking-widest mt-1">
                  Scroll to explore
                </p>
              </div>
            </div>
          </div>
          </div>

          <div
            id="journey-details-scroll"
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden hide-scrollbar px-[15px] relative pt-2 pb-0"
          >

          {/* Vertical dashed line guide */}
          <div className="hidden lg:block absolute left-[3.25rem] md:left-[4.125rem] top-24 bottom-0 w-px border-l-2 border-dashed border-[#c4c2b7]/20 z-0" />
          
          {CITIES.map((city, idx) => {
            const details = getNodeDetails(city.id);
            const isActive = activeCityIdx === idx;

            return (
              <div
                key={city.id}
                ref={(el) => { cityRefs.current[idx] = el; }}
                className="min-h-[410px] lg:min-h-[440px] last:border-b-0 flex flex-col relative z-10"
                style={{ marginLeft: '-10px', marginRight: '-15px' }}
              >
                {/* Explorer Cursor (Timeline marker) */}
                <div className="absolute left-[2.9rem] top-20 -translate-x-1/2">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1], opacity: 1 } : { scale: 1, opacity: 0.3 }}
                    className={`w-4 h-4 rounded-full border-2 border-white shadow-sm transition-colors duration-500 ${
                      isActive ? 'bg-[#8e6bbf]' : 'bg-gray-300'
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-[#8e6bbf]"
                    />
                  )}
                </div>

                {/* City Header */}
                <div className="flex items-center gap-5 mb-5 pl-12 md:pl-14">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ${
                      isActive
                        ? 'bg-[#8e6bbf]/10 shadow-sm ring-1 ring-[#8e6bbf]/20'
                        : 'bg-white/50 grayscale opacity-40'
                    }`}
                  >
                    {city.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className={`font-bold text-2xl tracking-tight transition-colors duration-500 ${
                        isActive ? 'text-[#2D2926]' : 'text-gray-400'
                      }`}>
                        {city.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs font-mono text-[#2D2926]/40 uppercase tracking-widest">
                        {city.range}
                      </p>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-xs font-bold text-[#8e6bbf] uppercase tracking-wider">
                        {city.country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details (unchanged content, updated style wrapper) */}
                {details && (
                  <div className="flex flex-col gap-4 pl-12 md:pl-14 max-w-xl">
                    {/* Education blocks */}
                    {details.educations?.map((edu, eduIdx) => (
                      <div
                        key={eduIdx}
                          className={`transition-all duration-500 p-4 rounded-2xl border ${
                          isActive
                            ? 'bg-white shadow-sm border-[#2D2926]/10'
                            : 'bg-white/30 border-transparent grayscale-[0.5] opacity-60'
                        }`}
                      >
                        <h5 className="font-bold text-base text-[#2D2926] leading-tight mb-1">
                          {edu.school}
                        </h5>
                        {edu.subSchool && (
                          <div className="text-xs text-gray-500 font-medium mb-2">{edu.subSchool}</div>
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-[#2D2926]/5 mt-2">
                          <span className="text-xs font-bold text-[#8e6bbf] uppercase tracking-wide">
                            {edu.degree}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">
                            {edu.period}
                          </span>
                        </div>
                        {(edu.focus || edu.honor) && (
                          <div className="flex flex-col gap-1.5 mt-3">
                            {edu.focus && (
                              <div className="flex items-start gap-2 text-xs text-gray-500 leading-snug">
                                <Target size={12} className="text-[#8e6bbf] shrink-0 mt-0.5" />
                                <span>{edu.focus}</span>
                              </div>
                            )}
                            {edu.honor && (
                              <div className="flex items-start gap-2 text-xs font-bold text-[#2D2926] leading-snug">
                                <Award size={12} className="text-[#f5b002] shrink-0 mt-0.5" />
                                <span>{edu.honor}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Experience blocks */}
                    {details.experiences?.map((exp, expIdx) => (
                      <div
                        key={expIdx}
                          className={`transition-all duration-500 p-4 rounded-2xl border ${
                          isActive
                            ? 'bg-white shadow-sm border-[#2D2926]/10'
                            : 'bg-white/30 border-transparent grayscale-[0.5] opacity-60'
                        }`}
                      >
                        <h5 className="font-bold text-base text-[#2D2926] mb-3">{exp.company}</h5>
                        <div className="flex flex-col gap-2.5">
                          {exp.roles.map((role, rIdx) => (
                            <div
                              key={rIdx}
                              className="p-3 bg-[#f7f6f3] border border-[#2D2926]/5 rounded-xl"
                            >
                              <div className="flex justify-between items-start">
                                <span
                                  className={`text-xs font-bold ${
                                    role.isPrimary ? 'text-[#8e6bbf]' : 'text-[#2D2926]'
                                  }`}
                                >
                                  {role.title}
                                </span>
                                <span className="text-[10px] font-mono text-gray-400 mt-0.5">
                                  {role.period}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Impact blocks */}
                    {details.impacts?.map((impact, impactIdx) => (
                      <div
                        key={impactIdx}
                        className={`relative pl-6 border-l-2 transition-all duration-500 ${
                          isActive ? 'border-[#8e6bbf] opacity-100' : 'border-gray-200 opacity-40'
                        }`}
                      >
                        <h4 className="text-xs font-bold text-[#2D2926] mb-2 uppercase tracking-widest">
                          {impact.title}
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed mb-3">
                          {impact.desc}
                        </p>
                        {impact.statsType === 'boxes' && impact.stats && (
                          <div className="flex gap-3 flex-wrap">
                            {impact.stats.map((stat, sIdx) => (
                              <div
                                key={sIdx}
                                className="px-3 py-2.5 rounded-xl border border-[#2D2926]/5 bg-white shadow-sm"
                              >
                                <span className={`block text-xl font-black mb-0.5 ${
                                  stat.theme === 'purple' ? 'text-[#8e6bbf]' : 'text-[#f5b002]'
                                }`}>
                                  {stat.value}
                                </span>
                                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                                  {stat.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        {impact.statsType === 'tags' && impact.tags && (
                          <div className="flex flex-wrap gap-2">
                            {impact.tags.map((tag: string, tIdx: number) => (
                              <span
                                key={tIdx}
                                className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                                  HIGHLIGHT_TAGS.has(tag)
                                    ? 'bg-[#f5b002]/10 text-[#f5b002] border-[#f5b002]/20'
                                    : 'bg-[#2D2926]/5 text-[#2D2926]/60 border-[#2D2926]/10'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </div>

        {/* ── Right Column: Non-scrolling Map (60% width on desktop) ── */}
        <div
          ref={mapContainerRef}
          className="w-full lg:w-[60%] bg-[#fdfcf4] relative overflow-hidden overscroll-none h-[54vh] min-h-0 p-[5px] flex items-center justify-center rounded-[28px]"
          style={{
            margin: '15px',
            height: 'calc(100% - 30px)',
          }}
        >
          {/* Decorative technical border */}
          <div className="absolute inset-[5px] border-l border-[#c4c2b7]/20 pointer-events-none" />

          {/* Measuring Rulers */}
          <div className="absolute top-[5px] left-[5px] right-[5px] h-6 border-b border-[#c4c2b7]/20 bg-[#fdfcf4] z-10 flex items-center px-4 overflow-hidden pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center" style={{ width: '40px' }}>
                <div className="h-2 w-px bg-[#c4c2b7]/40" />
                <span className="text-[8px] font-mono text-[#c4c2b7]/40 mt-0.5">{i * 10}°</span>
              </div>
            ))}
          </div>
          <div className="absolute top-[5px] left-[5px] bottom-[5px] w-6 border-r border-[#c4c2b7]/20 bg-[#fdfcf4] z-10 flex flex-col items-center py-4 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-end pr-1" style={{ height: '40px', width: '24px' }}>
                <span className="text-[8px] font-mono text-[#c4c2b7]/40 mr-1">{i * 10}°</span>
                <div className="w-2 h-px bg-[#c4c2b7]/40" />
              </div>
            ))}
          </div>

          {/* Map Section Navigation - Moved to Top */}
          <div className="absolute top-[53px] left-1/2 -translate-x-1/2 z-20 flex gap-1 bg-white/60 backdrop-blur-md p-1.5 rounded-2xl border border-[#c4c2b7]/5 shadow-sm">
            {CITIES.map((city, idx) => (
              <button
                key={city.id}
                onClick={() => scrollToCity(idx)}
                className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all duration-300 flex items-center gap-2 ${
                  activeCityIdx === idx
                    ? 'bg-[#8e6bbf] text-white shadow-lg shadow-[#8e6bbf]/20'
                    : 'text-[#c4c2b7]/60 hover:bg-white/80'
                }`}
              >
                <span className="opacity-80">{city.emoji}</span>
                <span className="uppercase tracking-widest">{city.name}</span>
              </button>
            ))}
          </div>

          {/* Mathematical formulas as decorative elements */}
          <div className="absolute top-[69px] right-[37px] text-[#c4c2b7]/20 font-mono text-[9px] pointer-events-none text-right space-y-1">
            <p>distance = arccos(sin(φ1)sin(φ2) + cos(φ1)cos(φ2)cos(Δλ))R</p>
            <p>bearing = atan2(sin(Δλ)cos(φ2), cos(φ1)sin(φ2) - sin(φ1)cos(φ2)cos(Δλ))</p>
            <p>Δλ = λ2 - λ1</p>
          </div>

          {/* Map */}
         <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: projConfig.center,
              scale: projConfig.scale,
            }}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#fdfcf4',
              borderRadius: '28px',
              border: '1px solid #fdfcf4',
            }}
          >
            <defs>
              {/* 海洋排线图案：细、密、低对比度的地图纹理 */}
              <pattern id="hatch-ocean" width="4" height="5.5" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0.75" x2="4" y2="0.75" stroke="#cdcdc7" strokeWidth="0.8" opacity="1" />
              </pattern>
            </defs>

            {/* 背景层：覆盖整个海洋区域的横线填充
                使用 rect 并确保其在最底层渲染 */}
            <rect x="-10000" y="-10000" width="20000" height="20000" fill="#fdfcf4" />
            <rect x="-10000" y="-10000" width="20000" height="20000" fill="url(#hatch-ocean)" />

            {/* 第一部分：海岸线外围装饰（双层效果） */}
            <Geographies geography={LAND_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <React.Fragment key={geo.rsmKey}>
                    <Geography
                      geography={geo}
                      fill="none"
                      stroke="#76716b"
                      strokeWidth={9}
                      opacity={0.9}
                      style={{
                        default: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                        hover: { outline: 'none', vectorEffect: 'non-scaling-stroke', pointerEvents: 'none' },
                      }}
                    />
                    <Geography
                      geography={geo}
                      fill="none"
                      stroke="#f7f6f3"
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

            {/* 第二部分：陆地填充与国家边界
                使用 GEO_URL 渲染具体的国家填充和最内层边界线 */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const id = geo.id || geo.properties?.ISO_A3;
                  const isChina = id === '156' || id === '158' || id === 'CHN' || id === 'TWN';
                  const isMENA = !isChina && HIGHLIGHT_CODES.has(id);
                  
                  let fill = '#f7f6f3';
                  if (isChina) fill = '#edece4ff';
                  else if (isMENA) fill = '#edece4ff';

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke="#9a9b91"
                      strokeWidth={0.28}
                      opacity={0.82}
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

            {/* Route lines between cities */}
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
              color="#8e6bbf"
            />

            {/* City markers */}
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
                    {/* Technical marker style */}
                    <circle
                      r={isActive ? 8 : 4}
                      fill="none"
                      stroke={visited ? '#8e6bbf' : '#c4c2b7'}
                      strokeWidth={1}
                    />
                    <circle
                      r={isActive ? 4 : 2}
                      fill={visited ? '#8e6bbf' : '#c4c2b7'}
                    />
                    {isActive && (
                       <motion.circle
                        r={12}
                        fill="none"
                        stroke="#8e6bbf"
                        strokeWidth={0.5}
                        strokeDasharray="2 2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                       />
                    )}

                    {/* Label */}
                    <text
                      textAnchor="start"
                      x={isActive ? 12 : 8}
                      y={4}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: isActive ? 10 : 8,
                        fill: isActive ? '#8e6bbf' : '#c4c2b7',
                        fontWeight: isActive ? 700 : 500,
                        pointerEvents: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
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
        </div>
      </div>
    </section>
  );
};
