import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  value: string;
  label: string;
  trend?: string;
  icon: LucideIcon;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CaseStudyProps {
  company: string;
  title: string;
  metric: string;
  metricLabel: string;
  image: string;
  tags: string[];
}

export interface IndustryData {
  id: string;
  name: string;
  headline: string;
  subheadline: string;
  painPoints: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  stats: StatCardProps[];
  services: ServiceCardProps[];
  caseStudies: CaseStudyProps[];
}