import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ComposableMap, Geographies, Geography, Marker, useMapContext } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layout, Search, Mail, Languages, Share2, MousePointerClick, Trophy, BookOpen, Lightbulb, Zap, Target, Award } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from './Card';

// --- 1. Data & Configuration ---
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface JourneyNode {
  id: string;
  name: string;
  coordinates: [number, number];
  type: 'branding' | 'work' | 'education';
  content: string; // Fallback content
  icon: React.ReactNode;
  country: string;
}

const NODES: JourneyNode[] = [
  {
    id: 'shanghai',
    name: 'Shanghai',
    coordinates: [121.4737, 31.2304],
    type: 'branding',
    content: "Born Feb 15, 2002. Target: Web3/AI Marketing/BD roles in Shanghai.",
    icon: <span className="text-lg leading-none">🇨🇳</span>,
    country: "China"
  },
  {
    id: 'dubai',
    name: 'Dubai',
    coordinates: [55.2708, 25.2048],
    type: 'work',
    content: "Focus on MENA regional distribution and business development.",
    icon: <span className="text-lg leading-none">🇦🇪</span>,
    country: "United Arab Emirates"
  },
  {
    id: 'alexandria',
    name: 'Alexandria',
    coordinates: [29.9553, 31.2156],
    type: 'education',
    content: "Education and cultural background node.",
    icon: <span className="text-lg leading-none">🇪🇬</span>,
    country: "Egypt"
  },
];

const MENA_CODES = [
  "12", "012", // Algeria
  "48", "048", // Bahrain
  "262",       // Djibouti
  "818",       // Egypt
  "364",       // Iran
  "368",       // Iraq
  "376",       // Israel
  "400",       // Jordan
  "414",       // Kuwait
  "422",       // Lebanon
  "434",       // Libya
  "504",       // Morocco
  "512",       // Oman
  "634",       // Qatar
  "682",       // Saudi Arabia
  "729",       // Sudan
  "760",       // Syria
  "788",       // Tunisia
  "792",       // Turkey
  "784",       // United Arab Emirates
  "887",       // Yemen
  "275",       // Palestine
  "732"        // Western Sahara
];

const COLORS = {
  branding: '#8E6BBF', // Theme Purple
  work: '#8E6BBF',     // Theme Purple
  education: '#8E6BBF',// Theme Purple
  line: '#8E6BBF',     // Theme Purple
  land: '#f7f6f3',     // Very Light Gray (gray-50)
  mapBg: '#ebe9e4',    // White
  stroke: '#E5E7EB',   // Gray-200
  hover: '#f1ebf5',    // Highlight Yellow -> Light Purple
  menaStroke: '#f1ebf5', // Highlight Yellow -> Light Purple
};

// --- 2. Custom Components ---

const getBulletIcon = (iconName: string) => {
  switch(iconName) {
    case 'Layout': return <Layout size={12} />;
    case 'Search': return <Search size={12} />;
    case 'Mail': return <Mail size={12} />;
    case 'Languages': return <Languages size={12} />;
    case 'Share2': return <Share2 size={12} />;
    default: return <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />;
  }
};

// Animated Path Component using MapContext for projection
const AnimatedFlightPath = ({ from, to }: { from: [number, number]; to: [number, number] }) => {
  const { projection } = useMapContext();
  
  if (!projection) return null;

  const start = projection(from);
  const end = projection(to);

  if (!start || !end) return null;

  // Calculate a curve (Quadratic Bezier)
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  const controlX = midX;
  const controlY = midY - (dist * 0.3); // Arch upwards

  const pathD = `M ${start[0]} ${start[1]} Q ${controlX} ${controlY} ${end[0]} ${end[1]}`;

  return (
    <motion.path
      d={pathD}
      fill="none"
      stroke={COLORS.line}
      strokeWidth={1}
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.4 }}
      transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      style={{ strokeLinecap: 'square' }}
    />
  );
};

interface CustomMarkerProps {
  node: JourneyNode;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ 
  node, 
  isActive, 
  onClick, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  const color = COLORS[node.type];

  return (
    <Marker coordinates={node.coordinates}>
      <g
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          whileHover={{ scale: 1.2 }}
        >
          <motion.circle
            r={20}
            fill={isActive ? '#f1ebf5' : color}
            opacity={0.1}
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle r={6} fill={isActive ? '#f1ebf5' : color} stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={-15}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fill: '#2d2d2d', fontWeight: 600, pointerEvents: 'none' }}
            className="hidden md:block select-none"
          >
            {node.name}
          </text>
        </motion.g>
      </g>
    </Marker>
  );
};

const NodeCard = ({ node, items, onClose, details }: { node: JourneyNode; items: any[]; onClose: () => void; details: any }) => {
  // Graceful fallback if data is missing
  if (!details) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-[2rem] shadow-2xl shadow-[#8E6BBF]/10 border border-gray-100 p-0 w-[95vw] md:w-[60rem] pointer-events-auto flex flex-col md:flex-row max-h-[85vh] overflow-hidden relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Universal Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-20 text-gray-400 hover:text-[#8E6BBF] bg-white/80 backdrop-blur rounded-full p-2 transition-colors shadow-sm md:shadow-none md:bg-transparent"
      >
        <X size={20} />
      </button>

      {/* Left Column: Context & Timeline */}
      <div className="md:w-1/3 flex flex-col bg-gray-50/50 border-r border-gray-100 p-8 overflow-y-auto custom-scrollbar">
        {/* Location Header */}
        <div className="flex items-center gap-4 mb-10 shrink-0">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#8E6BBF]/10 text-[#8E6BBF] shadow-sm">
            {node.icon}
          </div>
          <div>
            <h4 className="font-bold text-3xl tracking-tight text-gray-900">{node.name}</h4>
            <span className="text-sm font-bold text-[#8E6BBF] uppercase tracking-widest mt-1 block">
              {node.country}
            </span>
          </div>
        </div>

        {/* Experience Blocks */}
        {details.experiences?.map((exp: any, idx: number) => (
          <div key={idx} className="flex flex-col gap-2 mb-8">
            <h5 className="font-bold text-xl leading-tight text-gray-800">{exp.company}</h5>
            <div className="flex flex-col gap-2 mt-3">
              {exp.roles.map((role: any, rIdx: number) => (
                <div key={rIdx} className="flex flex-col p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                  <span className={`text-sm font-bold ${role.isPrimary ? 'text-[#8E6BBF]' : 'text-gray-700'}`}>
                    {role.title}
                  </span>
                  <span className="text-xs font-mono text-gray-400 mt-1">{role.period}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Education Blocks */}
        {details.educations?.map((edu: any, idx: number) => (
          <div key={idx} className="flex flex-col gap-2 mb-8">
            <h5 className="font-bold text-xl leading-tight text-gray-800">
              {edu.school}<br/>
              {edu.subSchool && <span className="text-lg text-gray-600 font-medium">{edu.subSchool}</span>}
            </h5>
            <div className="flex flex-col p-4 bg-white border border-gray-100 rounded-xl shadow-sm mt-3 gap-3">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#8E6BBF]">{edu.degree}</span>
                <span className="text-xs font-mono text-gray-400 mt-1">{edu.period}</span>
              </div>
              
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-50">
                {edu.focus && (
                  <div className="flex items-start gap-2 text-xs text-gray-600 leading-snug">
                    <Target size={16} className="text-[#8E6BBF] shrink-0" />
                    <span className="mt-px">{edu.focus}</span>
                  </div>
                )}
                {edu.honor && (
                  <div className="flex items-start gap-2 text-xs text-gray-600 leading-snug">
                    <Award size={16} className="text-[#f5b002] shrink-0" />
                    <span className="mt-px font-bold text-gray-700">{edu.honor}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Data-Driven Impact */}
      <div className="md:w-2/3 flex flex-col bg-white p-8 md:p-10 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-3 mb-6 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#f5b002]"></span>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Core Impact</h3>
        </div>
        
        <div className="space-y-8">
          {details.impacts?.map((impact: any, idx: number) => (
            <div key={idx} className="relative pl-6 border-l-2 border-[#8E6BBF]/20 hover:border-[#8E6BBF] transition-colors duration-300">
              <h4 className="text-lg font-bold mb-2 text-gray-900">{impact.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{impact.desc}</p>
              
              {/* Stats Boxes rendering */}
              {impact.statsType === 'boxes' && impact.stats && (
                <div className="flex gap-4 flex-wrap">
                  {impact.stats.map((stat: any, sIdx: number) => (
                    <div key={sIdx} className={`px-3 py-2 rounded-lg border ${
                      stat.theme === 'purple' ? 'bg-[#8E6BBF]/5 border-[#8E6BBF]/10' : 'bg-[#f5b002]/10 border-[#f5b002]/20'
                    }`}>
                      <span className={`block text-xl font-black ${
                        stat.theme === 'purple' ? 'text-[#8E6BBF]' : 'text-[#e59936]'
                      }`}>{stat.value}</span>
                      <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags rendering */}
              {impact.statsType === 'tags' && impact.tags && (
                <div className="flex flex-wrap gap-2">
                  {impact.tags.map((tag: string, tIdx: number) => (
                    <span key={tIdx} className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. Main Component ---

export const Journey: React.FC = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleNodeClick = (id: string) => {
    if (!hasInteracted) setHasInteracted(true);
    setActiveNode(prev => prev === id ? null : id);
  };

  const handleNodeEnter = (id: string) => {
    // Hover logic removed for click-based interaction preference
  };

  const handleNodeLeave = () => {
    // Hover logic removed
  };

  const getItems = (nodeId: string) => {
    const keywords: Record<string, string[]> = {
        shanghai: ['Shanghai', '上海'],
        dubai: ['Dubai', '迪拜'],
        alexandria: ['Alexandria', '亚历山大']
      };
      
    return t.journey.items.filter(item => {
        const loc = item.location || "";
        return keywords[nodeId]?.some(k => loc.includes(k));
    });
  };

  // Safe access to nodeDetails with a fallback type check
  const getNodeDetails = (nodeId: string) => {
    // @ts-ignore - Assuming t.journey has nodeDetails as injected in LanguageContext
    return t.journey.nodeDetails?.[nodeId];
  };

  return (
    <section id="journey" className="py-24 px-4 md:px-8 max-w-7xl mx-auto md:snap-start scroll-mt-20">
      <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark uppercase mb-2 tracking-tight">{t.journey.title}</h2>
          </div>
          <div className="flex gap-6 text-sm font-bold tracking-wider uppercase text-gray-500">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#8E6BBF]" /> Shanghai
             </div>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#8E6BBF]" /> Dubai
             </div>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#8E6BBF]" /> Alexandria
             </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-sm bg-white group">
          
          <ComposableMap 
            projection="geoMercator"
            projectionConfig={{
              center: [70, 30],
              scale: 300,
            }}
            className="w-full h-full outline-none"
          >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    // Check if the current geography is in the MENA list
                    const isMena = MENA_CODES.includes(String(geo.id));
                    // Check if the current geography is China (156) or Taiwan (158)
                    const isChinaOrTaiwan = ["156", "158"].includes(String(geo.id));
                    
                    const isHighlighted = isMena || isChinaOrTaiwan;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={COLORS.land}
                        stroke={isHighlighted ? "#8E6BBF" : COLORS.stroke}
                        strokeWidth={isHighlighted ? 1 : 0.5}
                        strokeDasharray={isHighlighted ? "2 2" : "none"}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: '#f1ebf5', outline: "none", transition: 'all 250ms', opacity: 1 },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              <AnimatedFlightPath from={NODES[2].coordinates} to={NODES[1].coordinates} />
              <AnimatedFlightPath from={NODES[1].coordinates} to={NODES[0].coordinates} />

              {NODES.map((node) => (
                <CustomMarker
                  key={node.id}
                  node={node}
                  isActive={activeNode === node.id}
                  onClick={() => handleNodeClick(node.id)}
                  onMouseEnter={() => handleNodeEnter(node.id)}
                  onMouseLeave={handleNodeLeave}
                />
              ))}
          </ComposableMap>
          
          {/* Interaction Hint - UPDATED POSITION TO BOTTOM RIGHT */}
          <AnimatePresence>
            {isVisible && !hasInteracted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-6 right-6 z-20 pointer-events-none"
              >
                 <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-[#8E6BBF]/20 flex items-center gap-3">
                    <div className="relative">
                       <motion.div
                          animate={{ y: [0, -3, 0], scale: [1, 0.95, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                       >
                          <MousePointerClick size={20} className="text-[#8E6BBF]" />
                       </motion.div>
                       <motion.div
                           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#8E6BBF]/20 rounded-full"
                           initial={{ opacity: 0, scale: 0.5 }}
                           animate={{ opacity: [0, 1, 0], scale: 1.5 }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                       />
                    </div>
                    <span className="text-sm font-bold text-text-dark whitespace-nowrap uppercase tracking-wide">{t.journey.hint}</span>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Portal for Modal */}
          {mounted && createPortal(
            <AnimatePresence>
               {activeNode && (
                 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#2d2d2d]/40 backdrop-blur-sm"
                      onClick={() => setActiveNode(null)}
                    />
                    <div className="relative z-10 pointer-events-auto max-h-full flex flex-col justify-center">
                       <NodeCard 
                         node={NODES.find(n => n.id === activeNode)!} 
                         items={getItems(activeNode)}
                         details={getNodeDetails(activeNode)}
                         onClose={() => setActiveNode(null)} 
                       />
                    </div>
                 </div>
               )}
            </AnimatePresence>,
            document.body
          )}

        </div>

      </div>
    </section>
  );
}