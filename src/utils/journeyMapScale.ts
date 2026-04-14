export type JourneyMapScaleOptions = {
  referenceHeight?: number;
  reservedTopPx?: number;
  reservedBottomPx?: number;
  minRatio?: number;
  maxRatio?: number;
};

export const calculateAdaptiveMapScale = (
  baseScale: number,
  containerHeight: number,
  options: JourneyMapScaleOptions = {}
): number => {
  const {
    referenceHeight = 760,
    reservedTopPx = 120,
    reservedBottomPx = 20,
    minRatio = 0.6,
    maxRatio = 1.05,
  } = options;

  const safeBaseScale = Number.isFinite(baseScale) && baseScale > 0 ? baseScale : 380;
  const safeContainerHeight = Number.isFinite(containerHeight) && containerHeight > 0 ? containerHeight : referenceHeight;

  // Keep a reasonable drawable area after rulers/nav pills/formula overlays.
  const drawableHeight = Math.max(240, safeContainerHeight - reservedTopPx - reservedBottomPx);
  const ratio = drawableHeight / Math.max(320, referenceHeight);

  const minScale = safeBaseScale * minRatio;
  const maxScale = safeBaseScale * maxRatio;
  const scaled = safeBaseScale * ratio;

  return Math.max(minScale, Math.min(maxScale, scaled));
};
