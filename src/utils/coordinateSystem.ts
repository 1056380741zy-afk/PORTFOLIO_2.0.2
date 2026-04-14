export type Coordinate = {
  x: number;
  y: number;
};

export type ParsedCoordinate = {
  label: string;
  coordinate: Coordinate;
};

export type ParseError = {
  input: string;
  index: number;
  message: string;
};

export type ParseResult = {
  coordinates: Map<string, ParsedCoordinate>;
  errors: ParseError[];
};

export type BoundingBox = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type QuadrantCounts = {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  axisX: number;
  axisY: number;
  origin: number;
};

export type CoordinatePatterns = {
  centroid: Coordinate;
  boundingBox: BoundingBox;
  quadrantCounts: QuadrantCounts;
  radius: {
    min: number;
    max: number;
    mean: number;
  };
};

export type SvgScatterOptions = {
  width?: number;
  height?: number;
  padding?: number;
  pointRadius?: number;
  showAxes?: boolean;
  labelPoints?: boolean;
  background?: string;
  axisColor?: string;
  pointColor?: string;
  labelColor?: string;
};

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const normalizeKey = (label: string) =>
  label
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

const splitEntries = (input: string) =>
  input
    .split(/\r?\n|,/g)
    .map((s) => s.trim())
    .filter(Boolean);

const parseEntry = (entry: string): { label: string; x: number; y: number } | { error: string } => {
  const patterns: RegExp[] = [
    /^\s*(?<label>.+?)\s*(?:at\s*)?x\s*[:=]\s*(?<x>-?\d+(?:\.\d+)?)\s*(?:,|\s)+y\s*[:=]\s*(?<y>-?\d+(?:\.\d+)?)\s*$/i,
    /^\s*(?<label>.+?)\s*\(\s*(?<x>-?\d+(?:\.\d+)?)\s*,\s*(?<y>-?\d+(?:\.\d+)?)\s*\)\s*$/i,
  ];

  for (const pattern of patterns) {
    const match = entry.match(pattern);
    if (!match?.groups) continue;
    const label = String(match.groups.label ?? '').trim();
    const x = Number(match.groups.x);
    const y = Number(match.groups.y);
    if (!label) return { error: 'Missing label' };
    if (!Number.isFinite(x) || !Number.isFinite(y)) return { error: 'Invalid numeric value for X/Y' };
    return { label, x, y };
  }

  return { error: 'Unrecognized coordinate format' };
};

export const parseCoordinateData = (input: string): ParseResult => {
  const entries = splitEntries(input);
  const coordinates = new Map<string, ParsedCoordinate>();
  const errors: ParseError[] = [];

  entries.forEach((entry, index) => {
    const parsed = parseEntry(entry);
    if ('error' in parsed) {
      errors.push({ input: entry, index, message: parsed.error });
      return;
    }
    const key = normalizeKey(parsed.label);
    if (!key) {
      errors.push({ input: entry, index, message: 'Label normalization produced empty key' });
      return;
    }
    coordinates.set(key, { label: parsed.label, coordinate: { x: parsed.x, y: parsed.y } });
  });

  return { coordinates, errors };
};

export const validateCoordinateMap = (coordinates: Map<string, ParsedCoordinate>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  for (const [key, value] of coordinates.entries()) {
    if (!key.trim()) errors.push('Empty key');
    if (!value?.label?.trim()) errors.push(`Missing label for key: ${key}`);
    if (!isFiniteNumber(value?.coordinate?.x) || !isFiniteNumber(value?.coordinate?.y)) errors.push(`Invalid coordinate for key: ${key}`);
  }
  return { valid: errors.length === 0, errors };
};

export const toRecord = (coordinates: Map<string, ParsedCoordinate>): Record<string, Coordinate> => {
  const out: Record<string, Coordinate> = {};
  for (const [key, value] of coordinates.entries()) out[key] = { x: value.coordinate.x, y: value.coordinate.y };
  return out;
};

export const distance = (a: Coordinate, b: Coordinate): number => Math.hypot(a.x - b.x, a.y - b.y);

export const distanceByKey = (coordinates: Map<string, ParsedCoordinate>, keyA: string, keyB: string): number => {
  const a = coordinates.get(keyA)?.coordinate;
  const b = coordinates.get(keyB)?.coordinate;
  if (!a || !b) throw new Error(`Missing coordinate for ${!a ? keyA : keyB}`);
  return distance(a, b);
};

export const computeBoundingBox = (points: Coordinate[]): BoundingBox => {
  if (points.length === 0) throw new Error('Cannot compute bounding box of empty set');
  let minX = points[0].x;
  let maxX = points[0].x;
  let minY = points[0].y;
  let maxY = points[0].y;
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  return { minX, maxX, minY, maxY };
};

export const computeCentroid = (points: Coordinate[]): Coordinate => {
  if (points.length === 0) throw new Error('Cannot compute centroid of empty set');
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  return { x: sum.x / points.length, y: sum.y / points.length };
};

export const computeQuadrantCounts = (points: Coordinate[]): QuadrantCounts => {
  const counts: QuadrantCounts = { q1: 0, q2: 0, q3: 0, q4: 0, axisX: 0, axisY: 0, origin: 0 };
  for (const p of points) {
    if (p.x === 0 && p.y === 0) {
      counts.origin++;
      continue;
    }
    if (p.y === 0) {
      counts.axisX++;
      continue;
    }
    if (p.x === 0) {
      counts.axisY++;
      continue;
    }
    if (p.x > 0 && p.y > 0) counts.q1++;
    else if (p.x < 0 && p.y > 0) counts.q2++;
    else if (p.x < 0 && p.y < 0) counts.q3++;
    else counts.q4++;
  }
  return counts;
};

export const computePatterns = (coordinates: Map<string, ParsedCoordinate>): CoordinatePatterns => {
  const points = Array.from(coordinates.values()).map((v) => v.coordinate);
  const centroid = computeCentroid(points);
  const boundingBox = computeBoundingBox(points);
  const quadrantCounts = computeQuadrantCounts(points);
  const radii = points.map((p) => Math.hypot(p.x, p.y));
  const radiusSum = radii.reduce((a, b) => a + b, 0);
  return {
    centroid,
    boundingBox,
    quadrantCounts,
    radius: {
      min: Math.min(...radii),
      max: Math.max(...radii),
      mean: radiusSum / radii.length,
    },
  };
};

export const pairwiseDistances = (coordinates: Map<string, ParsedCoordinate>): Array<{ a: string; b: string; distance: number }> => {
  const keys = Array.from(coordinates.keys());
  const out: Array<{ a: string; b: string; distance: number }> = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const a = keys[i];
      const b = keys[j];
      out.push({ a, b, distance: distanceByKey(coordinates, a, b) });
    }
  }
  return out;
};

export const nearestNeighbors = (
  coordinates: Map<string, ParsedCoordinate>
): Array<{ key: string; nearestKey: string; distance: number }> => {
  const keys = Array.from(coordinates.keys());
  const out: Array<{ key: string; nearestKey: string; distance: number }> = [];
  for (const key of keys) {
    const base = coordinates.get(key)?.coordinate;
    if (!base) continue;
    let bestKey = '';
    let bestDist = Number.POSITIVE_INFINITY;
    for (const otherKey of keys) {
      if (otherKey === key) continue;
      const other = coordinates.get(otherKey)?.coordinate;
      if (!other) continue;
      const d = distance(base, other);
      if (d < bestDist) {
        bestDist = d;
        bestKey = otherKey;
      }
    }
    if (bestKey) out.push({ key, nearestKey: bestKey, distance: bestDist });
  }
  return out;
};

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const toSvgScatter = (coordinates: Map<string, ParsedCoordinate>, options: SvgScatterOptions = {}): string => {
  const width = options.width ?? 520;
  const height = options.height ?? 360;
  const padding = options.padding ?? 36;
  const pointRadius = options.pointRadius ?? 4;
  const showAxes = options.showAxes ?? true;
  const labelPoints = options.labelPoints ?? true;
  const background = options.background ?? '#f7f6f3';
  const axisColor = options.axisColor ?? 'rgba(45,45,45,0.22)';
  const pointColor = options.pointColor ?? '#8E6BBF';
  const labelColor = options.labelColor ?? 'rgba(45,45,45,0.75)';

  const entries = Array.from(coordinates.entries());
  if (entries.length === 0) throw new Error('Cannot render empty coordinate set');

  const points = entries.map(([, v]) => v.coordinate);
  const bbox = computeBoundingBox(points);

  const rangeX = Math.max(1e-6, bbox.maxX - bbox.minX);
  const rangeY = Math.max(1e-6, bbox.maxY - bbox.minY);

  const scaleX = (width - padding * 2) / rangeX;
  const scaleY = (height - padding * 2) / rangeY;
  const scale = Math.min(scaleX, scaleY);

  const mapX = (x: number) => padding + (x - bbox.minX) * scale;
  const mapY = (y: number) => height - padding - (y - bbox.minY) * scale;

  const axisX = showAxes && bbox.minY <= 0 && bbox.maxY >= 0 ? mapY(0) : null;
  const axisY = showAxes && bbox.minX <= 0 && bbox.maxX >= 0 ? mapX(0) : null;

  const elements: string[] = [];
  elements.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">`);
  elements.push(`<rect x="0" y="0" width="${width}" height="${height}" fill="${background}" />`);

  if (axisX !== null) elements.push(`<line x1="${padding}" y1="${axisX}" x2="${width - padding}" y2="${axisX}" stroke="${axisColor}" stroke-width="1" />`);
  if (axisY !== null) elements.push(`<line x1="${axisY}" y1="${padding}" x2="${axisY}" y2="${height - padding}" stroke="${axisColor}" stroke-width="1" />`);

  for (const [key, value] of entries) {
    const cx = mapX(value.coordinate.x);
    const cy = mapY(value.coordinate.y);
    const title = escapeXml(`${value.label} (${value.coordinate.x}, ${value.coordinate.y})`);
    elements.push(`<circle cx="${cx}" cy="${cy}" r="${pointRadius}" fill="${pointColor}"><title>${title}</title></circle>`);
    if (labelPoints) {
      const label = escapeXml(key);
      elements.push(
        `<text x="${cx + 8}" y="${cy - 8}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="10" fill="${labelColor}">${label}</text>`
      );
    }
  }

  elements.push(`</svg>`);
  return elements.join('');
};
