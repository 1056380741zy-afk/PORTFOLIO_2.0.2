import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../Card';

interface ExhibitionGridCardProps {
  image: string;
  name: string;
  org: string;
  languages: string[];
  roles: string[];
  langLabel: string;
  roleLabel: string;
  fit?: 'contain' | 'cover';
  padding?: boolean;
}

export const ExhibitionGridCard: React.FC<ExhibitionGridCardProps> = ({
  image,
  name,
  org,
  languages,
  roles,
  langLabel,
  roleLabel,
  fit = 'cover',
  padding = false
}) => {
  return (
    <Card depth="low" className="overflow-hidden flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden bg-gray-50">
        <img 
          src={image}
          alt={name}
          className={`w-full h-full object-${fit} ${padding ? 'p-6' : ''} transition-transform duration-500`}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-3">
          <h4 className="text-sm font-bold text-text-dark leading-tight mb-1">
            {name}
          </h4>
          <p className="text-xs text-gray-500 font-medium">
            {org}
          </p>
        </div>
        
        <div className="mt-auto space-y-3">
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{langLabel}</span>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <span key={lang} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{roleLabel}</span>
            <div className="flex flex-wrap gap-1.5">
              {roles.map((role) => (
                <span key={role} className="px-2 py-0.5 bg-accent-purple/5 text-accent-purple border border-accent-purple/10 rounded text-[10px] font-medium">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
