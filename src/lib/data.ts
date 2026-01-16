import { Zap, ShieldCheck, Layers, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    title: "Blazing Fast",
    description: "Optimized for speed, our platform delivers sub-50ms response times for a seamless user experience.",
    icon: Zap,
  },
  {
    title: "Fortress-Level Security",
    description: "State-of-the-art encryption and proactive threat monitoring to keep your data safe and secure.",
    icon: ShieldCheck,
  },
  {
    title: "Scalable Architecture",
    description: "Built on a microservices architecture that scales effortlessly with your growing business demands.",
    icon: Layers,
  },
  {
    title: "Automated Deployment",
    description: "CI/CD pipelines for rapid, reliable, and automated deployments, accelerating your time-to-market.",
    icon: Rocket,
  },
];


export type PricingTier = {
    name: string;
    price: {
        monthly: number;
        yearly: number;
    };
    description: string;
    features: string[];
    cta: string;
    recommended?: boolean;
}

export const pricingTiers: PricingTier[] = [
    {
        name: 'Starter',
        price: { monthly: 29, yearly: 278 },
        description: 'For individuals and small teams just getting started.',
        features: [
            '10 Projects',
            '5GB Storage',
            'Basic Analytics',
            'Community Support',
        ],
        cta: 'Choose Starter',
    },
    {
        name: 'Pro',
        price: { monthly: 99, yearly: 950 },
        description: 'For growing businesses that need more power and support.',
        features: [
            'Unlimited Projects',
            '100GB Storage',
            'Advanced Analytics',
            'Priority Email Support',
            'API Access',
        ],
        cta: 'Choose Pro',
        recommended: true,
    },
    {
        name: 'Enterprise',
        price: { monthly: 499, yearly: 4790 },
        description: 'For large organizations with advanced security and support needs.',
        features: [
            'All Pro features',
            'Dedicated Infrastructure',
            'Single Sign-On (SSO)',
            '24/7 Phone Support',
            'Dedicated Account Manager',
        ],
        cta: 'Contact Sales',
    },
]


export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];
