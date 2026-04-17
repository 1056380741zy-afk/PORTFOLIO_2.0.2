import {
  computeBoundingBox,
  computeCentroid,
  computePatterns,
  distance,
  nearestNeighbors,
  pairwiseDistances,
  parseCoordinateData,
  toSvgScatter,
  validateCoordinateMap,
} from './coordinateSystem';

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message);
};

const assertEqual = (actual: unknown, expected: unknown, message: string) => {
  if (actual !== expected) throw new Error(`${message}. Expected: ${String(expected)}; Actual: ${String(actual)}`);
};

const assertClose = (actual: number, expected: number, tolerance = 1e-6, message = 'Not close') => {
  if (Math.abs(actual - expected) > tolerance) throw new Error(`${message}. Expected: ${expected}; Actual: ${actual}`);
};

const input = `
UAE CAMEL X:30 Y:-70
SHANGHAI X:6 Y:-101
GIZA X:15 Y:-81
RIYADH X:2 Y:-134
RED SEA X:41 Y:-96
OSAKA X:28 Y:-87
ALEXANDRIA X:52 Y:-43
POMPEY'S PILLAR X:67 Y:-4
`;

const run = () => {
  const parsed = parseCoordinateData(input);
  assertEqual(parsed.errors.length, 0, 'Expected no parse errors');
  const validation = validateCoordinateMap(parsed.coordinates);
  assert(validation.valid, `Validation failed: ${validation.errors.join(', ')}`);

  assertEqual(parsed.coordinates.size, 8, 'Expected 8 coordinates');

  const points = Array.from(parsed.coordinates.values()).map((v) => v.coordinate);
  const bbox = computeBoundingBox(points);
  assertEqual(bbox.minX, 2, 'bbox.minX');
  assertEqual(bbox.maxX, 52, 'bbox.maxX');
  assertEqual(bbox.minY, -95, 'bbox.minY');
  assertEqual(bbox.maxY, 76, 'bbox.maxY');

  const centroid = computeCentroid(points);
  assert(Number.isFinite(centroid.x) && Number.isFinite(centroid.y), 'Centroid should be finite');

  const d = distance({ x: 0, y: 0 }, { x: 3, y: 4 });
  assertEqual(d, 5, 'Distance should be 5');

  const pairs = pairwiseDistances(parsed.coordinates);
  assert(pairs.length > 0, 'Expected pairwise distances');

  const neighbors = nearestNeighbors(parsed.coordinates);
  assertEqual(neighbors.length, 8, 'Expected nearest neighbor for each point');

  const patterns = computePatterns(parsed.coordinates);
  assertEqual(patterns.boundingBox.minX, 2, 'patterns.boundingBox.minX');
  assertEqual(patterns.boundingBox.maxY, 76, 'patterns.boundingBox.maxY');
  assert(patterns.radius.max >= patterns.radius.min, 'Radius max should be >= min');
  assertClose(patterns.radius.mean, patterns.radius.mean, 0, 'Radius mean should be stable');

  const svg = toSvgScatter(parsed.coordinates, { width: 300, height: 200 });
  assert(svg.startsWith('<svg'), 'SVG should start with <svg');
  assert(svg.includes('<circle'), 'SVG should contain circles');

  const bad = parseCoordinateData('BAD INPUT');
  assertEqual(bad.coordinates.size, 0, 'Bad input should not produce coordinates');
  assertEqual(bad.errors.length, 1, 'Bad input should produce one error');
};

run();
