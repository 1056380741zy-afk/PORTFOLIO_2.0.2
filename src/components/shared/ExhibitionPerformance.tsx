import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  BarChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ComposedChart, Cell, PieChart, Pie, LabelList, ReferenceLine
} from 'recharts';
import { BarChart3, TrendingUp, Globe, Target, MousePointerClick } from 'lucide-react';
import { motion, useInView, animate, Variants } from 'framer-motion';
import { Card } from './Card';
import { THEME } from '../../constants';

// --- 2. Data Context ---
const SCALE_DATA = [
  { year: '2023', exhibitors: 3443, overseas: 3696 },
  { year: '2024', exhibitors: 2500, overseas: 3606 },
  { year: '2025', exhibitors: 2385, overseas: 8221 },
];

const QUALITY_DATA = [
  { name: 'Direct Buyers', value: 66, color: THEME.colors.primaryPurple },
  { name: 'Others', value: 34, color: '#f1ebf5' },
];

const MENA_DATA = [
  { year: '2023', value: 3 },
  { year: '2024', value: 7 },
  { year: '2025', value: 11 }, // Target
];

const CHANNEL_DATA = [
  { channel: 'Website', value: 56.0, color: '#9f8fdb' },
  { channel: 'Call Center', value: 54.2, color: '#f1ebf5' },
  { channel: 'WhatsApp', value: 48.9, color: '#9f8fdb' },
  { channel: 'EDM', value: 43.3, color: '#9f8fdb' },
  { channel: 'TikTok', value: 3.1, color: '#f1ebf5' },
];

// --- 3. Component: Animated Counter ---
const Counter = ({ from = 0, to, duration = 1.5, suffix = '' }: { from?: number; to: number; duration?: number; suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        node.textContent = value.toFixed(0) + suffix;
      },
      ease: [0.22, 1, 0.36, 1]
    });

    return () => controls.stop();
  }, [from, to, duration, suffix, isInView]);

  return <span ref={nodeRef}>{from}</span>;
};

// --- Component: Custom Tooltip ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#2d2d2d]/5 p-3 rounded-lg shadow-xl text-xs z-50 min-w-[120px]">
        <p className="mb-2 text-gray-400 font-bold tracking-tight border-b border-[#2d2d2d]/5 pb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-text-dark py-0.5">
             <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill || entry.stroke }}></span>
             <span className="font-medium opacity-80">{entry.name}:</span>
             <span className="font-mono font-bold ml-auto">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const BuyerQualityTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const entry = payload[0];

    return (
      <div className="buyer-quality-tooltip z-50 min-w-[120px] rounded-lg border border-[#2d2d2d]/5 bg-white p-3 text-xs shadow-xl">
        <div className="mb-2 border-b border-[#2d2d2d]/5 pb-1 font-bold tracking-tight text-gray-400">
          Audience Quality
        </div>
        <div className="flex items-center gap-2 py-0.5 text-text-dark">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
          <span className="font-medium opacity-80">{entry.name}</span>
          <span className="ml-auto font-mono font-bold">{entry.value}%</span>
        </div>
      </div>
    );
  }

  return null;
};

export const ExhibitionPerformance: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // --- Animation Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
        {/* Header - Subtitle Style */}
        <motion.div variants={itemVariants} className="mt-3 mb-3 flex items-center gap-3">
           <span className="decorative-icon decorative-icon-framed decorative-icon-framed-lg"><BarChart3 /></span>
           <h5 className="font-bold text-text-dark text-xl tracking-wide">{t.exhibitionPerformance.title}</h5>
        </motion.div>

        {/* Content Wrapper with Indentation */}
        <div className="pl-5 border-l-2 border-[#2d2d2d]/5 ml-5">
            {/* Grid Layout */}
            <div className="mt-[10px] grid grid-cols-3 gap-4 pb-0 pr-0">
                
                {/* Card 1: Scale (Double Axis) */}
                <Card depth={2} className="information-hover-card exhibition-performance-card !rounded-[8px] p-5 h-[260px] col-span-2">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h4 className="font-bold text-text-dark flex items-center gap-2">
                                <TrendingUp size={18} color={THEME.colors.primaryPurple} />
                                {t.exhibitionPerformance.sec1.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1 max-w-md">
                               {t.exhibitionPerformance.sec1.insight}
                            </p>
                        </div>
                        <div className="text-right space-y-1">
                            <div className="text-[10px] font-bold text-gray-400 flex items-center gap-1 justify-end">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME.colors.primaryPurple }}></span> {t.exhibitionPerformance.sec1.legendExhibitors}
                            </div>
                            <div className="text-[10px] font-bold text-gray-400 flex items-center gap-1 justify-end">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME.colors.primaryOrange }}></span> {t.exhibitionPerformance.sec1.legendOverseas}
                            </div>
                        </div>
                    </div>
                    <div className="relative -mt-[10px] h-[165px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={SCALE_DATA} margin={{ top: 12, right: 16, bottom: 14, left: 16 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={THEME.colors.grid} />
                                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{fill: THEME.colors.muted, fontSize: 12}} dy={10} />
                                <YAxis yAxisId="left" hide />
                                <YAxis yAxisId="right" orientation="right" hide />
                                <Tooltip content={<CustomTooltip />} />
                                <ReferenceLine
                                    x="2024"
                                    yAxisId="left"
                                    stroke={THEME.colors.primaryPurple}
                                    strokeDasharray="3 3"
                                    label={{
                                        value: t.exhibitionPerformance.sec1.brandChangeLabel,
                                        position: 'top',
                                        fill: '#7e8966',
                                        fontSize: 10,
                                        fontWeight: 700,
                                    }}
                                />
                                <Bar yAxisId="left" dataKey="exhibitors" name="Exhibitors" fill={THEME.colors.primaryPurple} barSize={40} radius={[4, 4, 0, 0]} />
                                <Line yAxisId="right" type="monotone" dataKey="overseas" name="Overseas" stroke={THEME.colors.primaryOrange} strokeWidth={3} dot={{r: 4, fill: THEME.colors.primaryOrange}} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Card 2: Overseas Growth (Big Stat) - ENHANCED HERO ELEMENT */}
                <Card 
                    depth={2}
                    className="information-hover-card exhibition-performance-card !rounded-[8px] p-5 h-[260px] flex flex-col justify-center items-center text-center relative overflow-hidden border border-[#2d2d2d]/5"
                >
                    <h4 className="font-bold text-text-dark mb-4 text-sm uppercase tracking-wider z-10">{t.exhibitionPerformance.sec2.title}</h4>
                    <div
                      className="text-5xl font-black mb-2 z-10"
                      style={{ color: THEME.colors.primaryOrange, fontFamily: '"Inter Variable", Inter, Arial, sans-serif' }}
                    >
                        <Counter to={128} suffix="%" />
                    </div>
                    {/* Pulsing Badge */}
                    <motion.div 
                        className="px-3 py-1 rounded-full text-xs font-bold mb-4 z-10"
                        style={{ backgroundColor: THEME.colors.orangeBg, color: THEME.colors.primaryOrange }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        YoY Growth
                    </motion.div>
                    <p className="text-xs text-gray-500 max-w-[300px] z-10">
                        {t.exhibitionPerformance.sec2.insight}
                    </p>
                </Card>

                {/* Card 3: Buyer Quality (Pie) */}
                <Card depth={2} className="information-hover-card exhibition-performance-card exhibition-performance-bottom-bleed exhibition-buyer-quality-card !rounded-[8px] p-5 h-[330px]">
                     <h4 className="font-bold text-text-dark flex items-center gap-2 mb-2">
                        <Target size={18} color={THEME.colors.primaryPurple} />
                        {t.exhibitionPerformance.sec3.title}
                     </h4>
                     <p className="text-xs text-gray-400 mb-6">
                        {t.exhibitionPerformance.sec3.insight}
                     </p>
                     <div className="h-[185px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={QUALITY_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {QUALITY_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                  content={<BuyerQualityTooltip />}
                                  cursor={false}
                                  position={{ x: 4, y: 84 }}
                                  wrapperStyle={{ pointerEvents: 'none', zIndex: 80 }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                             <span
                               className="text-3xl font-black"
                               style={{ color: THEME.colors.primaryPurple, fontFamily: '"Inter Variable", Inter, Arial, sans-serif' }}
                             >
                               66%
                             </span>
                             <span className="text-[10px] font-bold text-gray-400 uppercase">Direct Buyers</span>
                        </div>
                     </div>
                </Card>

                {/* Card 4: MENA Focus (Bar) */}
                <Card depth={2} className="information-hover-card exhibition-performance-card exhibition-performance-bottom-bleed !rounded-[8px] p-5 h-[330px]">
                     <h4 className="font-bold text-text-dark flex items-center gap-2 mb-2">
                        <Globe size={18} color={THEME.colors.primaryOrange} />
                        {t.exhibitionPerformance.sec4.title}
                     </h4>
                     <p className="text-xs text-gray-400 mb-6">
                        {t.exhibitionPerformance.sec4.insight}
                     </p>
                     <div className="h-[185px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MENA_DATA} margin={{ top: 20, right: 0, bottom: 0, left: -20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={THEME.colors.grid} />
                                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{fill: THEME.colors.muted, fontSize: 10}} />
                                <YAxis tickLine={false} axisLine={false} tick={{fill: THEME.colors.muted, fontSize: 10}} />
                                <Tooltip content={<CustomTooltip />} cursor={false} />
                                <Bar dataKey="value" name="MENA Share (%)" fill={THEME.colors.primaryOrange} radius={[4, 4, 0, 0]} activeBar={false}>
                                    <LabelList dataKey="value" position="top" fill={THEME.colors.primaryOrange} fontSize={12} formatter={(val: number) => `${val}%`} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </Card>

                {/* Card 5: Channel Performance (Horizontal Bar) */}
                 <Card depth={2} className="information-hover-card exhibition-performance-card exhibition-performance-bottom-bleed !rounded-[8px] p-5 h-[330px] col-span-1">
                     <h4 className="font-bold text-text-dark flex items-center gap-2 mb-2">
                        <MousePointerClick size={18} color={THEME.colors.primaryPurple} />
                        {t.exhibitionPerformance.sec5.title}
                     </h4>
                     <p className="text-xs text-gray-400 mb-6">
                        {t.exhibitionPerformance.sec5.insight}
                     </p>
                     <div className="h-[200px] w-[440px] max-w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CHANNEL_DATA} layout="vertical" margin={{ top: 0, right: 30, bottom: 0, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={THEME.colors.grid} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="channel" type="category" width={70} tickLine={false} axisLine={false} tick={{fill: THEME.colors.textMain, fontSize: 11, fontWeight: 500}} />
                                <Tooltip content={<CustomTooltip />} cursor={false} />
                                <Bar dataKey="value" name="Conversion Rate" radius={[0, 4, 4, 0]} barSize={20} activeBar={false}>
                                    {CHANNEL_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                    <LabelList dataKey="value" position="right" fill={THEME.colors.textMain} fontSize={10} formatter={(val: number) => `${val}%`} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </Card>

            </div>
        </div>
    </motion.div>
  );
};
