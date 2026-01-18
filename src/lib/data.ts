import { Code, Bot, ShoppingCart, BarChart, HardHat, Settings, MessageSquare, LayoutTemplate, TerminalSquare, Rocket, Linkedin, Twitter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Portfolio' },
  { href: '/blog', label: 'Blogs' },
  { href: '/careers', label: 'Career' },
  { href: '/contact', label: 'Contact' },
];

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: 'Custom Software',
    description: 'Bespoke software solutions tailored to your exact business needs, from enterprise systems to specialized tools.',
    icon: Code,
  },
  {
    title: 'AI Integration',
    description: 'Leverage the power of artificial intelligence to automate processes, gain insights, and create intelligent products.',
    icon: Bot,
  },
  {
    title: 'Shopify Development',
    description: 'Expert Shopify and Shopify Plus development for stunning, high-converting e-commerce experiences.',
    icon: ShoppingCart,
  },
  {
    title: 'Digital Marketing',
    description: 'Data-driven digital marketing strategies including SEO, PPC, and content to grow your online presence.',
    icon: BarChart,
  },
  {
    title: 'Web Development',
    description: 'Building responsive, high-performance websites and web applications using the latest technologies.',
    icon: HardHat,
  },
  {
    title: 'IT Consulting',
    description: 'Strategic IT consulting to help you navigate technology choices and optimize your IT infrastructure.',
    icon: Settings,
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: '150+', label: 'Projects Completed' },
  { value: '100+', label: 'Happy Clients' },
  { value: '8', label: 'Years of Experience' },
  { value: '99%', label: 'Client Satisfaction' },
];

export type ProcessStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Consultation",
    description: "We start by understanding your vision, goals, and requirements in a detailed discovery session.",
    icon: MessageSquare
  },
  {
    title: "Strategy & Design",
    description: "Our team crafts a comprehensive strategy and designs a user-centric wireframe and prototype.",
    icon: LayoutTemplate
  },
  {
    title: "Development",
    description: "We bring the designs to life with clean, efficient code, following an agile development methodology.",
    icon: TerminalSquare
  },
  {
    title: "Launch & Growth",
    description: "After rigorous testing, we deploy your project and provide ongoing support and marketing to ensure growth.",
    icon: Rocket
  }
];

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Enterprise AI Platform',
    description: 'A comprehensive AI-powered analytics platform for a Fortune 500 company to optimize supply chain logistics.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'analytics dashboard',
    tags: ['AI Integration', 'Custom Software'],
  },
  {
    id: 'project-2',
    title: 'Luxury Brand Shopify Store',
    description: 'A headless Shopify Plus implementation for a luxury fashion brand, focusing on a premium user experience and performance.',
    imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'fashion website',
    tags: ['Shopify', 'Web Development'],
  },
  {
    id: 'project-3',
    title: 'SaaS Application for FinTech',
    description: 'A secure and scalable SaaS platform for a financial technology startup, enabling seamless investment tracking.',
    imageUrl: 'https://images.unsplash.com/photo-1642052503083-9b9f61e75710?q=80&w=2072&auto=format&fit=crop',
    imageHint: 'finance app',
    tags: ['Custom Software', 'IT Consulting'],
  },
];

export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "HK's team delivered beyond our expectations. Their expertise in AI and custom software is unmatched. They transformed our operations.",
    name: "Jane Doe",
    title: "COO",
    company: "Innovate Corp",
    avatarUrl: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    quote: "The new Shopify store they built for us is not only beautiful but has also significantly boosted our conversion rates. A fantastic partner to work with.",
    name: "John Smith",
    title: "Founder",
    company: "Luxe Apparel",
    avatarUrl: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 3,
    quote: "Their digital marketing strategy doubled our organic traffic in just six months. The results speak for themselves. Highly recommended.",
    name: "Samantha Lee",
    title: "Marketing Director",
    company: "Growth Solutions",
    avatarUrl: "https://i.pravatar.cc/150?img=5"
  }
];

export type TeamMember = {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  socials: {
    linkedin: string;
    twitter: string;
  };
};

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex HK",
    title: "Founder & CEO",
    bio: "With a passion for innovation and a drive for excellence, Alex leads HK Technologies in delivering cutting-edge digital solutions.",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    socials: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Chief Operating Officer",
    bio: "Sarah orchestrates the operational symphony at HK, ensuring every project is delivered with precision and quality.",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    socials: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

export const faqItems = [
  {
    question: "What services does HK Technologies offer?",
    answer: "We offer a wide range of services including custom software development, AI integration, Shopify development, digital marketing, web development, and IT consulting."
  },
  {
    question: "What is your development process?",
    answer: "Our process is divided into four key stages: Consultation, Strategy & Design, Development, and Launch & Growth. This ensures a streamlined and transparent workflow from start to finish."
  },
  {
    question: "How much does a project cost?",
    answer: "Project costs vary depending on the scope and complexity. We provide detailed proposals and estimates after an initial consultation. Contact us for a free strategy call to discuss your project."
  },
  {
    question: "Do you work with startups?",
    answer: "Yes, we love working with startups and established companies alike. We tailor our solutions to meet the unique needs and budgets of our clients."
  }
];

export const blogPosts = [
  {
    id: '1',
    title: 'The Future of AI in Business',
    description: 'Exploring how artificial intelligence is transforming industries and what it means for your business.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-285820f78369?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'AI brain',
    author: 'Alex HK',
    date: '2024-07-28',
    tags: ['AI', 'Business'],
  },
  {
    id: '2',
    title: '5 Tips for a High-Converting Shopify Store',
    description: 'Learn the secrets to creating a Shopify store that not only looks great but also drives sales.',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'e-commerce checkout',
    author: 'Sarah Chen',
    date: '2024-07-22',
    tags: ['Shopify', 'E-commerce'],
  },
  {
    id: '3',
    title: 'Why Your Next Web App Should Use Next.js',
    description: 'A deep dive into the benefits of Next.js for building modern, high-performance web applications.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'code on screen',
    author: 'Alex HK',
    date: '2024-07-15',
    tags: ['Web Development', 'Next.js'],
  },
];

export const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for a talented frontend developer to join our team. You will be responsible for building beautiful and performant user interfaces for our clients.'
  },
  {
    title: 'AI/ML Engineer',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Join our AI team and work on cutting-edge machine learning models to solve real-world business problems.'
  },
  {
    title: 'Digital Marketing Specialist',
    location: 'Remote',
    type: 'Part-time',
    description: 'We are seeking a data-driven digital marketer to manage our SEO, PPC, and content marketing efforts.'
  }
];
