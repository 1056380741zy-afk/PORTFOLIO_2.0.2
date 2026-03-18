import React from 'react';
import { motion } from 'framer-motion';

interface SuhaBotProps {
  size?: number;
  isThinking?: boolean;
  showBackground?: boolean;
  className?: string;
}

export const SuhaBot: React.FC<SuhaBotProps> = ({ 
  size = 100, 
  isThinking = false, 
  showBackground = true,
  className = "" 
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      initial="initial"
      whileHover="hover"
    >
      {/* 背景圆圈 */}
      {showBackground && (
        <circle cx="50" cy="50" r="42" fill="#8e6bbf" />
      )}

      {/* 机器人整体：包含跳动逻辑 */}
      <motion.g
        animate={{
          y: [0, -15, -18, -15, 0],
          scaleX: [1, 0.98, 1, 0.98, 1.1, 1],
          scaleY: [1, 1.05, 1, 1.05, 0.9, 1],
        }}
        transition={{
          duration: isThinking ? 1.5 : 2.5, // 思考时跳得快一点
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "bottom center" }}
      >
        {/* 天线：信号晃动 */}
        <motion.path
          d="M50 36 V32 H53"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: isThinking ? 0.5 : 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 36px" }}
        />

        {/* 身体主体 */}
        <rect x="32" y="40" width="36" height="25" rx="7" stroke="white" strokeWidth="3" fill="none" />

        {/* 侧边接口 */}
        <line x1="28" y1="52.5" x2="32" y2="52.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="68" y1="52.5" x2="72" y2="52.5" stroke="white" strokeWidth="3" strokeLinecap="round" />

        {/* 眼睛部分：包含张望和眨眼 */}
        <motion.g
          animate={{ x: [0, -3, -3, 3, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.45, 0.55, 0.7, 1] }}
        >
          {/* 眨眼 */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.48, 0.5, 0.52, 1] }}
            style={{ transformOrigin: "50% 52px" }}
          >
            <rect x="42" y="48" width="2.5" height="8" rx="1.25" fill="white" />
            <rect x="55.5" y="48" width="2.5" height="8" rx="1.25" fill="white" />
          </motion.g>
        </motion.g>
      </motion.g>
    </motion.svg>
  );
};
