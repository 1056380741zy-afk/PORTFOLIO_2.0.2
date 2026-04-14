import React from 'react';

export interface JourneyNode {
  id: string;
  name: string;
  coordinates: [number, number];
  type: 'branding' | 'work' | 'education';
  content: string;
  icon: React.ReactNode;
  country: string;
  range: string;
  detail: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  location: string;
  focus?: string;
  achievements?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web3' | 'B2B' | 'Strategy';
  description: string;
  tags: string[];
  image: string;
  details?: {
    challenge?: string;
    strategy?: string;
    impact?: string;
  };
}