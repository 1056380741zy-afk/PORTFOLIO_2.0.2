import React from 'react';
import { motion } from 'framer-motion';

interface DigitalMatrixItemProps {
  src: string;
  alt: string;
  className?: string;
}

export const DigitalMatrixItem: React.FC<DigitalMatrixItemProps> = ({ src, alt, className = "" }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative rounded-xl overflow-hidden border border-gray-100 cursor-pointer ${className}`}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
};
