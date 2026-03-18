import { 
  Factory, 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3, 
  Globe2, 
  Zap, 
  PieChart, 
  Settings,
  Cloud,
  Code2,
  Lock,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Server,
  Repeat
} from 'lucide-react';
import { IndustryData } from './types';

export const MANUFACTURING_DATA: IndustryData = {
  id: 'manufacturing',
  name: 'Manufacturing',
  headline: 'GTM Strategies for Manufacturing',
  subheadline: 'Tailored demand gen, ABM & RevOps for manufacturing leaders navigating Industry 4.0.',
  painPoints: [
    {
      title: "Long Sales Cycles",
      description: "Complex buying committees and technical validation slow down deals, making revenue unpredictable."
    },
    {
      title: "Data Silos",
      description: "ERP, CRM, and shop floor data don't talk, leading to missed cross-sell opportunities."
    },
    {
      title: "Legacy Perception",
      description: "Struggling to position innovative tech solutions against a backdrop of traditional operations."
    }
  ],
  solutions: [
    {
      title: "Account-Based Marketing (ABM)",
      description: "Target key decision-makers in specific accounts with hyper-personalized content and outreach."
    },
    {
      title: "RevOps Integration",
      description: "Unify your tech stack to create a single source of truth for customer data from lead to cash."
    },
    {
      title: "Thought Leadership",
      description: "Position your engineers and leaders as industry experts to build trust faster."
    }
  ],
  stats: [
    {
      value: "200%",
      label: "Pipeline Growth",
      trend: "+15% YoY",
      icon: TrendingUp
    },
    {
      value: "45%",
      label: "Faster Deal Cycles",
      icon: Zap
    },
    {
      value: "$50M+",
      label: "Revenue Generated",
      icon: BarChart3
    },
    {
      value: "30+",
      label: "Global Manufacturers",
      icon: Globe2
    }
  ],
  services: [
    {
      title: "Strategic ABM",
      description: "Orchestrate multi-channel campaigns targeting your highest-value accounts.",
      icon: Target
    },
    {
      title: "Event Marketing",
      description: "Maximize ROI from trade shows like Hannover Messe and IMTS with pre- and post-show ops.",
      icon: Users
    },
    {
      title: "Marketing Automation",
      description: "Implement robust nurturing tracks for long sales cycles using HubSpot/Marketo.",
      icon: Settings
    },
    {
      title: "Market Intelligence",
      description: "Deep-dive analysis into competitor positioning and emerging industrial trends.",
      icon: PieChart
    }
  ],
  caseStudies: [
    {
      company: "AutoParts Global",
      title: "Modernizing B2B Sales",
      metric: "3.5x",
      metricLabel: "ROI on Ad Spend",
      image: "https://picsum.photos/800/600",
      tags: ["Automotive", "PPC", "CRO"]
    },
    {
      company: "SteelWorks Inc.",
      title: "Closing the Enterprise",
      metric: "$12M",
      metricLabel: "New Pipeline Created",
      image: "https://picsum.photos/800/601",
      tags: ["Heavy Industry", "ABM", "Sales Enablement"]
    },
    {
      company: "RoboTech Solutions",
      title: "Launching Industry 4.0",
      metric: "180%",
      metricLabel: "Lead Volume Increase",
      image: "https://picsum.photos/800/602",
      tags: ["Robotics", "Content Strategy", "SEO"]
    }
  ]
};

export const SAAS_DATA: IndustryData = {
  id: 'saas',
  name: 'SaaS',
  headline: 'Scale Your ARR & Reduce Churn',
  subheadline: 'Product-Led Growth strategies and enterprise sales motions for scaling software companies.',
  painPoints: [
    {
      title: "High Churn Rates",
      description: "Customers dropping off after onboarding due to lack of perceived value or poor adoption paths."
    },
    {
      title: "Rising CAC",
      description: "Paid acquisition costs are skyrocketing while organic channels are becoming saturated."
    },
    {
      title: "Feature vs. Value",
      description: "Marketing teams focusing too much on technical features rather than business outcomes."
    }
  ],
  solutions: [
    {
      title: "PLG to Sales Handoff",
      description: "Optimize the journey from free trial user to enterprise contract with data-driven triggers."
    },
    {
      title: "Customer Success Ops",
      description: "Automate health checks and renewal alerts to proactively manage retention."
    },
    {
      title: "Usage-Based Pricing",
      description: "Model and implement pricing strategies that align with customer value realization."
    }
  ],
  stats: [
    {
      value: "120%",
      label: "Net Revenue Retention",
      trend: "+20% YoY",
      icon: Repeat
    },
    {
      value: "3x",
      label: "LTV:CAC Ratio",
      icon: PieChart
    },
    {
      value: "40%",
      label: "Adoption Rate Increase",
      icon: Users
    },
    {
      value: "50+",
      label: "SaaS Unicorns Served",
      icon: Cloud
    }
  ],
  services: [
    {
      title: "PLG Strategy",
      description: "Design friction-free onboarding experiences that drive immediate user value.",
      icon: Zap
    },
    {
      title: "Tech Stack Audit",
      description: "Optimize your CRM, MAP, and PLG tools for seamless data flow.",
      icon: Server
    },
    {
      title: "Developer Marketing",
      description: "Authentic community building and documentation for technical audiences.",
      icon: Code2
    },
    {
      title: "Enterprise ABM",
      description: "Move upmarket with targeted campaigns for Fortune 500 prospects.",
      icon: Target
    }
  ],
  caseStudies: [
    {
      company: "CloudScale.io",
      title: "Series B to IPO",
      metric: "400%",
      metricLabel: "ARR Growth in 18 Months",
      image: "https://picsum.photos/800/603",
      tags: ["SaaS", "PLG", "Growth"]
    },
    {
      company: "DevTools Corp",
      title: "Cracking the Enterprise",
      metric: "$25M",
      metricLabel: "Closed Won Revenue",
      image: "https://picsum.photos/800/604",
      tags: ["DevTools", "ABM", "Sales"]
    },
    {
      company: "TeamSync",
      title: "Reducing Churn",
      metric: "-45%",
      metricLabel: "Reduction in Logo Churn",
      image: "https://picsum.photos/800/605",
      tags: ["Collaboration", "Retention", "CS"]
    }
  ]
};

export const FINTECH_DATA: IndustryData = {
  id: 'fintech',
  name: 'Fintech',
  headline: 'Trust-Based Growth for Fintech',
  subheadline: 'Navigate compliance while accelerating user acquisition in a crowded financial landscape.',
  painPoints: [
    {
      title: "Trust Deficit",
      description: "Converting skeptical users who are wary of sharing sensitive financial data with new apps."
    },
    {
      title: "Compliance Constraints",
      description: "Marketing creatively within the strict boundaries of financial regulations (SEC, GDPR)."
    },
    {
      title: "Complex Onboarding",
      description: "KYC/KYB requirements causing massive drop-offs in the sign-up funnel."
    }
  ],
  solutions: [
    {
      title: "Trust-First Branding",
      description: "Content strategies that emphasize security, compliance, and social proof to lower barriers."
    },
    {
      title: "Funnel Optimization",
      description: "Streamlining KYC processes and reducing friction without compromising security."
    },
    {
      title: "Partner Ecosystems",
      description: "Leveraging bank partnerships and integrations to expand market reach rapidly."
    }
  ],
  stats: [
    {
      value: "$2B+",
      label: "Transaction Vol Processed",
      trend: "Safe & Secure",
      icon: ShieldCheck
    },
    {
      value: "60%",
      label: "Lower CAC",
      icon: TrendingUp
    },
    {
      value: "99.9%",
      label: "Uptime Reliability",
      icon: Server
    },
    {
      value: "1M+",
      label: "Verified Users",
      icon: Users
    }
  ],
  services: [
    {
      title: "Compliance Marketing",
      description: "Campaigns that convert while staying 100% compliant with financial regulations.",
      icon: Lock
    },
    {
      title: "Mobile App UA",
      description: "High-performance user acquisition campaigns for iOS and Android finance apps.",
      icon: Smartphone
    },
    {
      title: "B2B Payment Strat",
      description: "GTM motions for payment processors and embedded finance solutions.",
      icon: CreditCard
    },
    {
      title: "Crypto/Web3 GTM",
      description: "Community-led growth strategies for blockchain and DeFi projects.",
      icon: Globe2
    }
  ],
  caseStudies: [
    {
      company: "PayFast",
      title: "Consumer Wallet Launch",
      metric: "500k",
      metricLabel: "Users in 90 Days",
      image: "https://picsum.photos/800/606",
      tags: ["Payments", "B2C", "Mobile"]
    },
    {
      company: "NeoBank One",
      title: "SMB Lending Growth",
      metric: "$100M",
      metricLabel: "Loan Origination",
      image: "https://picsum.photos/800/607",
      tags: ["Lending", "B2B", "Fintech"]
    },
    {
      company: "SecureInvest",
      title: "Institutional Adoption",
      metric: "50+",
      metricLabel: "Enterprise Partnerships",
      image: "https://picsum.photos/800/608",
      tags: ["WealthTech", "Partnerships", "ABM"]
    }
  ]
};

export const INDUSTRIES = {
  manufacturing: MANUFACTURING_DATA,
  saas: SAAS_DATA,
  fintech: FINTECH_DATA
};

export const INDUSTRY_LIST = [
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'saas', name: 'SaaS' },
  { id: 'fintech', name: 'Fintech' }
];