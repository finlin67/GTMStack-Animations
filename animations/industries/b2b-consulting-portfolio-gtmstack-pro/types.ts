export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  category: 'Experience' | 'Education' | 'Milestone';
  industry: 'SaaS' | 'FinTech' | 'HealthTech' | 'General';
}

export interface ServiceItem {
  id: string;
  category: 'Content' | 'Demand' | 'Strategy' | 'Systems';
  title: string;
  description: string;
  iconName: string;
  details?: string[];
  caseStudy?: {
    title: string;
    outcome: string;
  };
}

export interface Project {
  id: string;
  title: string;
  metric: string;
  description: string;
  tags: string[];
}