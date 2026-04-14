import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AboutBoard } from '../components/sections/AboutBoard';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

type StampLayoutItem = {
  src: string;
  x: number;
  y: number;
  width: number;
  rotate: number;
  zIndex: number;
};

type StampDef = {
  id: string;
  label: string;
  src: string;
  scale?: number;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const computeStampLayout = (args: {
  sources: string[];
  containerWidth: number;
  containerHeight: number;
}): StampLayoutItem[] => {
  const { sources, containerWidth, containerHeight } = args;
  if (containerWidth <= 0 || containerHeight <= 0) return [];

  const stampWidth = clamp(containerWidth / 2.15, 74, 120);
  const stampHeight = stampWidth * 0.78;

  const cols = 2;
  const rows = 4;

  const overlapXRatio = 0.08;
  const overlapYRatio = 0.06;
  const colStepX = stampWidth * (1 - overlapXRatio);

  const gapY = stampHeight * 0.18;
  const rowStepY = stampHeight + gapY;

  const colOffsetY = stampHeight * (1 - overlapYRatio);

  const layoutWidth = colStepX + stampWidth;
  const layoutHeight = colOffsetY + ((rows - 1) * rowStepY) + stampHeight;
  const baseOffsetX = (containerWidth - layoutWidth) / 2;
  const baseOffsetY = (containerHeight - layoutHeight) / 2;

  const rotations = [-7, 5, -3, 4, -6, 6, -2, 3];

  return sources.slice(0, cols * rows).map((src, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);

    const jitterX = (((idx * 37) % 7) - 3) * 0.6;
    const jitterY = (((idx * 29) % 7) - 3) * 0.5;

    const xRaw = baseOffsetX + (col * colStepX) + jitterX;
    const yRaw = baseOffsetY + (row * rowStepY) + (col === 1 ? colOffsetY : 0) + jitterY;

    const margin = 4;
    const x = clamp(xRaw, margin, containerWidth - stampWidth - margin);
    const y = clamp(yRaw, margin, containerHeight - stampHeight - margin);

    const zIndex = 10 + (row * cols) + col;
    const rotate = rotations[idx] ?? ((idx % 2 === 0 ? -1 : 1) * 4);

    return { src, x, y, width: stampWidth, rotate, zIndex };
  });
};

const StampCluster: React.FC = () => {
  const stamps = useMemo<StampDef[]>(
    () => [
      { id: 'uaecamel', label: 'UAE Camel', src: '/stamps/uaecamel.png' },
      { id: 'shanghai', label: 'Shanghai', src: '/stamps/shanghai.png' },
      { id: 'giza', label: 'Giza', src: '/stamps/giza.png' },
      { id: 'riyadh', label: 'Riyadh', src: '/stamps/riyadh.png' },
      { id: 'redsea', label: 'Red Sea', src: '/stamps/redsea.png' },
      { id: 'osaka', label: 'Osaka', src: '/stamps/osaka.png' },
      { id: 'alexandria', label: 'Alexandria', src: '/stamps/alexandria.png' },
      { id: 'pompeypillar', label: "Pompey's Pillar", src: '/stamps/pompeypillar.png', scale: 1.18 },
    ],
    []
  );
  const sources = useMemo(() => stamps.map((s) => s.src), [stamps]);

  const clusterRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const DEFAULT_OFFSETS: Record<string, { x: number; y: number }> = useMemo(
    () => ({
      uaecamel: { x: 30, y: 0 },
      shanghai: { x: 6, y: -53 },
      giza: { x: 15, y: -19 },
      riyadh: { x: 2, y: -95 },
      redsea: { x: 41, y: -38 },
      osaka: { x: 28, y: -30 },
      alexandria: { x: 52, y: 6 },
      pompeypillar: { x: 16, y: 76 },
    }),
    []
  );
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>(DEFAULT_OFFSETS);
  const STORAGE_KEY = 'stampOffsets_v1';

  useEffect(() => {
    if (!clusterRef.current) return;
    const element = clusterRef.current;
    const ro = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    });
    ro.observe(element);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') setOffsets((prev) => ({ ...prev, ...parsed }));
    } catch {}
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('stamps') === 'edit' || params.get('editStamps') === '1') {
      setIsEditMode(true);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsEditMode((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const saveOffsets = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offsets));
  };

  const resetOffsets = () => {
    setOffsets(DEFAULT_OFFSETS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const layout = useMemo(
    () =>
      computeStampLayout({
        sources,
        containerWidth: containerSize.width,
        containerHeight: containerSize.height,
      }),
    [sources, containerSize.width, containerSize.height]
  );

  return (
    <div
      ref={clusterRef}
      className="relative w-[260px] h-[420px] xl:w-[320px] xl:h-[520px]"
      aria-label="Stamp cluster"
      style={
        isEditMode
          ? {
              backgroundImage:
                'linear-gradient(rgba(45,45,45,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,45,45,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              borderRadius: '16px',
            }
          : undefined
      }
    >
      <button
        type="button"
        onClick={() => setIsEditMode((v) => !v)}
        className="absolute -top-3 right-0 z-[270] px-2.5 py-1 rounded-lg border border-black/10 bg-white/80 backdrop-blur-sm text-[10px] font-mono uppercase tracking-[0.22em] text-text-dark/70 hover:text-text-dark hover:bg-white transition-colors shadow-sm"
        aria-label="Toggle stamp edit mode"
      >
        {isEditMode ? 'Done' : 'Edit'}
      </button>

      {layout.map((item, idx) => {
        const stamp = stamps[idx];
        const dx = stamp ? offsets[stamp.id]?.x ?? 0 : 0;
        const dy = stamp ? offsets[stamp.id]?.y ?? 0 : 0;
        const left = item.x + dx;
        const top = item.y + dy;
        const baseScale = stamp?.scale ?? 1;
        return (
        <motion.button
          key={item.src}
          type="button"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="absolute select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e6bbf]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f3] rounded-lg"
          style={{
            left,
            top,
            width: item.width,
            zIndex: isEditMode ? item.zIndex : (hoveredIndex === idx ? 100 : item.zIndex),
          }}
          aria-label={`Stamp ${stamp?.label ?? idx + 1}`}
          initial={false}
          animate={{
            rotate: item.rotate,
            y: isEditMode ? 0 : (hoveredIndex === idx ? -6 : 0),
            scale: baseScale,
          }}
          whileHover={{
            scale: isEditMode ? baseScale : baseScale * 1.03,
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
        >
          <img
            src={item.src}
            alt=""
            draggable={false}
            onError={(e) => {
              if (item.src !== '/stamps/giza.png') return;
              const img = e.currentTarget;
              if (img.dataset.fallbackApplied === '1') return;
              img.dataset.fallbackApplied = '1';
              img.src = '/stamps/egyptgiza.png';
            }}
            className="w-full h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:drop-shadow-[0_18px_32px_rgba(0,0,0,0.16)] transition-[filter,box-shadow] duration-200"
          />
          {isEditMode && (
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-text-dark/60 bg-white/70 backdrop-blur-sm border border-black/10 rounded px-1.5 py-0.5 whitespace-nowrap">
              x {Math.round(left)} · y {Math.round(top)}
            </div>
          )}
        </motion.button>
        );
      })}

      {isEditMode && (
        <div className="absolute top-10 left-0 right-0 mx-auto w-[240px] z-[260] bg-white/85 backdrop-blur-sm border border-black/10 rounded-2xl shadow-lg p-3 text-text-dark xl:left-full xl:right-auto xl:mx-0 xl:ml-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-text-dark/70">Stamp Edit</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetOffsets}
                className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-dark/55 hover:text-text-dark transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={saveOffsets}
                className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#8e6bbf] hover:text-[#7e4ba6] transition-colors"
              >
                Save
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-text-dark/55 leading-relaxed mb-2">
            X→右，Y→下。建议每次调整 1–6px。
          </div>

          <div className="flex flex-col gap-2 max-h-[360px] overflow-auto pr-1">
            {stamps.map((s) => {
              const current = offsets[s.id] ?? { x: 0, y: 0 };
              return (
                <div key={s.id} className="border border-black/5 rounded-xl p-2 bg-white/60">
                  <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-dark/70 mb-1">
                    {s.label}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono text-text-dark/50">X</span>
                      <input
                        type="number"
                        step="1"
                        value={Number.isFinite(current.x) ? current.x : 0}
                        onChange={(e) => {
                          const next = Number(e.target.value);
                          setOffsets((prev) => ({ ...prev, [s.id]: { x: Number.isFinite(next) ? next : 0, y: prev[s.id]?.y ?? 0 } }));
                        }}
                        className="h-8 px-2 rounded-lg border border-black/10 bg-white text-[11px] font-mono text-text-dark focus:outline-none focus:ring-2 focus:ring-[#8e6bbf]/25"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono text-text-dark/50">Y</span>
                      <input
                        type="number"
                        step="1"
                        value={Number.isFinite(current.y) ? current.y : 0}
                        onChange={(e) => {
                          const next = Number(e.target.value);
                          setOffsets((prev) => ({ ...prev, [s.id]: { x: prev[s.id]?.x ?? 0, y: Number.isFinite(next) ? next : 0 } }));
                        }}
                        className="h-8 px-2 rounded-lg border border-black/10 bg-white text-[11px] font-mono text-text-dark focus:outline-none focus:ring-2 focus:ring-[#8e6bbf]/25"
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const bleed = 'clamp(8px, 1vw, 12px)';

  return (
    <main className="flex-1 relative overflow-hidden min-h-full">
      <div
        className="h-full w-full flex flex-col lg:flex-row relative"
        style={{
          margin: `calc(${bleed} * -1)`,
          padding: bleed,
          backgroundImage:
            "linear-gradient(110deg, rgba(247, 246, 243, 0.95) 0%, rgba(247, 246, 243, 0.88) 36%, rgba(247, 246, 243, 0.82) 100%)",
          backgroundColor: '#f7f6f3',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="hidden lg:block absolute top-[110px] z-[240]"
          style={{ left: '38%' }}
        >
          <div className="relative -translate-x-1/2">
            <StampCluster />
          </div>
        </div>

        <div className="w-full lg:w-[38%] flex flex-col justify-center pl-10 pr-10 lg:pl-14 lg:pr-[clamp(5.5rem,9vw,11rem)] py-10 lg:py-12">
          <div className="max-w-[520px]">
            <div className="space-y-4">
              <div dir="rtl" className="text-[34px] leading-[1.1] text-text-dark font-makina text-right">
                {t.homePage.greetingArabic}
              </div>
              <div className={`text-lg text-text-dark tracking-tight ${language === 'cn' ? 'font-bold' : 'font-normal'}`}>
                {t.homePage.greetingEnglish}
              </div>
            </div>

            <div className="mt-10 space-y-6 text-[13px] leading-relaxed text-text-dark/80 font-mono">
              <p>{t.homePage.intro}</p>
              <p>{t.homePage.experience}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <AboutBoard />
        </div>
      </div>
    </main>
  );
};
