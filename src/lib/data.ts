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

export type JobListing = {
  id: number;
  title: string;
  type: "Full-time" | "Part-time" | "Contract";
  location: string;
  description: string;
};

export const jobListings: JobListing[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    type: "Full-time",
    location: "Remote",
    description: "We are looking for an experienced Frontend Engineer to join our team. You will be responsible for building and maintaining our web applications.",
  },
  {
    id: 2,
    title: "Backend Engineer",
    type: "Full-time",
    location: "San Francisco, CA",
    description: "We are looking for a Backend Engineer to help us build and scale our infrastructure. You will work with our team of engineers to design and implement new features.",
  },
  {
    id: 3,
    title: "Product Designer",
    type: "Full-time",
    location: "Remote",
    description: "We are looking for a Product Designer to join our team. You will be responsible for designing and iterating on our products.",
  },
    {
    id: 4,
    title: "DevOps Engineer",
    type: "Contract",
    location: "Remote",
    description: "We're seeking a contract DevOps Engineer to help us automate our deployment processes and manage our cloud infrastructure.",
  },
];
