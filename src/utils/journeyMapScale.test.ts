import { calculateAdaptiveMapScale } from './journeyMapScale';

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message);
};

const baseScale = 520;

const smallViewportScale = calculateAdaptiveMapScale(baseScale, 520);
assert(
  smallViewportScale < baseScale,
  `Expected smaller scale on short viewport, got ${smallViewportScale}`
);

const referenceViewportScale = calculateAdaptiveMapScale(baseScale, 900, {
  referenceHeight: 760,
  reservedTopPx: 120,
  reservedBottomPx: 20,
});
assert(
  referenceViewportScale >= baseScale * 0.95 && referenceViewportScale <= baseScale * 1.05,
  `Expected near-base scale around reference viewport, got ${referenceViewportScale}`
);

const hugeViewportScale = calculateAdaptiveMapScale(baseScale, 1600);
assert(
  hugeViewportScale <= baseScale * 1.05,
  `Expected capped max scale, got ${hugeViewportScale}`
);

const tinyViewportScale = calculateAdaptiveMapScale(baseScale, 280);
assert(
  tinyViewportScale >= baseScale * 0.6,
  `Expected min clamp for tiny viewport, got ${tinyViewportScale}`
);

const reservedSpaceScale = calculateAdaptiveMapScale(baseScale, 900, {
  reservedTopPx: 260,
  reservedBottomPx: 120,
});
assert(
  reservedSpaceScale < referenceViewportScale,
  `Expected more reserved space to reduce scale, got ${reservedSpaceScale} vs ${referenceViewportScale}`
);

console.log('journeyMapScale tests passed');
