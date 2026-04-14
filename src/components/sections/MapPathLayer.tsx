import React from 'react';
import { useMapContext } from 'react-simple-maps';
import { motion } from 'framer-motion';

interface MapPathLayerProps {
  segments: Array<{
    from: [number, number];
    to: [number, number];
    isVisible: boolean;
  }>;
  color: string;
}

export const MapPathLayer: React.FC<MapPathLayerProps> = ({ segments, color }) => {
  const { projection } = useMapContext();

  if (!projection) return null;

  return (
    <>
      {segments.map((segment, idx) => {
        const start = projection(segment.from);
        const end = projection(segment.to);

        if (!start || !end) return null;

        // Create curved path using quadratic bezier
        const midX = (start[0] + end[0]) / 2;
        const midY = (start[1] + end[1]) / 2;
        const dx = end[0] - start[0];
        const dy = end[1] - start[1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        const controlX = midX;
        const controlY = midY - dist * 0.25; // Arch for visual flow

        const pathD = `M ${start[0]} ${start[1]} Q ${controlX} ${controlY} ${end[0]} ${end[1]}`;
        const pathLength = dist * 1.3; // Approximate length

        return (
          <g key={`path-segment-${idx}`}>
            {/* Vintage technical drawing base path (Technical Gray) */}
            <motion.path
              d={pathD}
              stroke="#c4c2b7"
              strokeWidth={1}
              fill="none"
              strokeDasharray="4 4"
              style={{ vectorEffect: 'non-scaling-stroke' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1 }}
            />

            {/* Dynamic navigation trail (Brand Purple) */}
            <motion.path
              d={pathD}
              stroke={color}
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`4, ${pathLength}`}
              style={{ vectorEffect: 'non-scaling-stroke' }}
              initial={{ strokeDashoffset: pathLength, opacity: 0 }}
              animate={
                segment.isVisible
                  ? { 
                      strokeDashoffset: [pathLength, 0], 
                      opacity: 1 
                    }
                  : { strokeDashoffset: pathLength, opacity: 0 }
              }
              transition={{
                duration: 3,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />

            {/* Main solid path (Brand Purple) appearing when active */}
            <motion.path
              d={pathD}
              stroke={color}
              strokeWidth={1.2}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={pathLength}
              style={{ vectorEffect: 'non-scaling-stroke' }}
              initial={{ strokeDashoffset: pathLength, opacity: 0 }}
              animate={
                segment.isVisible
                  ? { strokeDashoffset: 0, opacity: 0.6 }
                  : { strokeDashoffset: pathLength, opacity: 0 }
              }
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </g>
        );
      })}
    </>
  );
};
