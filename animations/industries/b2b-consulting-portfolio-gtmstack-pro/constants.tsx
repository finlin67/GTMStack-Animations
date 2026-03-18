import { TimelineEvent, ServiceItem, Project } from './types';
import { FileText, TrendingUp, Compass, Cpu, Target, Layers, Zap, Database } from 'lucide-react';

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: '1',
    year: '2023',
    title: 'Head of Growth',
    company: 'TechScale Inc.',
    description: 'Led a team of 15 to scale ARR from $5M to $12M in 18 months.',
    category: 'Experience',
    industry: 'SaaS',
  },
  {
    id: '2',
    year: '2021',
    title: 'Demand Gen Lead',
    company: 'FinFlow',
    description: 'Optimized paid acquisition channels reducing CAC by 40%.',
    category: 'Experience',
    industry: 'FinTech',
  },
  {
    id: '3',
    year: '2019',
    title: 'GTM Strategy Consultant',
    company: 'Freelance',
    description: 'Advised 10+ startups on market entry strategies.',
    category: 'Milestone',
    industry: 'General',
  },
  {
    id: '4',
    year: '2017',
    title: 'Product Marketing Manager',
    company: 'HealthVibe',
    description: 'Launched flagship telemetry product globally.',
    category: 'Experience',
    industry: 'HealthTech',
  },
];

export const SERVICE_DATA: ServiceItem[] = [
  {
    id: 's1',
    category: 'Content',
    title: 'Narrative Design',
    description: 'Crafting compelling brand stories that convert.',
    iconName: 'FileText',
    details: [
      'Core Value Proposition Development',
      'Strategic Messaging Frameworks',
      'Website Copy & Microcopy'
    ],
    caseStudy: {
      title: 'Series B FinTech Rebrand',
      outcome: 'Unified messaging across 4 product lines, reducing sales cycle by 15%.'
    }
  },
  {
    id: 's2',
    category: 'Demand',
    title: 'ABM Campaigns',
    description: 'Targeted account-based marketing for high-value leads.',
    iconName: 'Target',
    details: [
      'Ideal Customer Profile (ICP) Definition',
      'Multi-channel Orchestration',
      'Personalized Outreach Sequences'
    ],
    caseStudy: {
      title: 'SaaS Enterprise Pilot',
      outcome: 'Generated $2M pipeline in Q3 via targeted 1:Many ABM campaigns.'
    }
  },
  {
    id: 's3',
    category: 'Strategy',
    title: 'Market Penetration',
    description: 'Data-driven go-to-market roadmaps.',
    iconName: 'Compass',
    details: [
      'Competitive Landscape Analysis',
      'Geographic Expansion Plans',
      'Partner Ecosystem Strategy'
    ],
    caseStudy: {
      title: 'EU Market Entry',
      outcome: 'Established partner channel in DACH region, yielding first 50 customers.'
    }
  },
  {
    id: 's4',
    category: 'Systems',
    title: 'RevOps Architecture',
    description: 'Seamless integration of CRM, MAP, and data layers.',
    iconName: 'Cpu',
    details: [
      'HubSpot/Salesforce Implementation',
      'Attribution Modeling',
      'Tool Stack Audit & Consolidation'
    ],
    caseStudy: {
      title: 'CRM Migration',
      outcome: 'Zero-downtime switch from HubSpot to Salesforce with full data integrity.'
    }
  },
  {
    id: 's5',
    category: 'Content',
    title: 'Thought Leadership',
    description: 'Executive ghostwriting and keynote preparation.',
    iconName: 'Layers',
    details: [
      'LinkedIn Personal Branding',
      'Whitepapers & Research Reports',
      'Webinar Deck Creation'
    ],
    caseStudy: {
      title: 'CEO LinkedIn Strategy',
      outcome: 'Grew following by 15k in 6 months, resulting in 20+ inbound speaking requests.'
    }
  },
  {
    id: 's6',
    category: 'Demand',
    title: 'Funnel Optimization',
    description: 'Full-funnel analysis to plug leakage points.',
    iconName: 'TrendingUp',
    details: [
      'Conversion Rate Optimization (CRO)',
      'Lead Scoring Models',
      'Nurture Automation Workflows'
    ],
    caseStudy: {
      title: 'Onboarding Flow Redesign',
      outcome: 'Increased activation rate by 22% through behavioral email triggers.'
    }
  },
    {
    id: 's7',
    category: 'Strategy',
    title: 'Pricing & Packaging',
    description: 'Maximizing LTV through tiered pricing models.',
    iconName: 'Zap',
    details: [
      'Price Elasticity Testing',
      'Feature Gating Strategy',
      'Contract & Renewal Terms'
    ],
    caseStudy: {
      title: 'Usage-Based Model',
      outcome: 'Rolled out new pricing tiers, boosting Net Revenue Retention (NRR) by 10%.'
    }
  },
  {
    id: 's8',
    category: 'Systems',
    title: 'Data Hygiene',
    description: 'Automated workflows for clean, actionable data.',
    iconName: 'Database',
    details: [
      'De-duplication Automation',
      'Enrichment Integration',
      'Data Governance Policies'
    ],
    caseStudy: {
      title: 'Database Cleanup',
      outcome: 'Removed 40k stale contacts, improving domain reputation and deliverability.'
    }
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Project Alpha',
    metric: '+150% Leads',
    description: 'Revamped the entire inbound funnel for a Series B SaaS.',
    tags: ['HubSpot', 'SEO', 'Content'],
  },
  {
    id: 'p2',
    title: 'Project Beta',
    metric: '3x ROAS',
    description: 'Restructured paid search accounts for maximum efficiency.',
    tags: ['Google Ads', 'LinkedIn', 'Analytics'],
  },
  {
    id: 'p3',
    title: 'Project Gamma',
    metric: '20% Churn Reduction',
    description: 'Implemented a new customer success platform and onboarding flow.',
    tags: ['Salesforce', 'ChurnZero', 'Strategy'],
  },
];

export const ICON_MAP: Record<string, any> = {
  FileText, TrendingUp, Compass, Cpu, Target, Layers, Zap, Database
};