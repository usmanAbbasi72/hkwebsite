import { Code, Server, Smartphone, Cloud, Bot, Briefcase, PenTool } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Web & Mobile Apps",
    description: "Building responsive and scalable web and mobile applications tailored to your business needs.",
    icon: Code,
  },
  {
    title: "AI Integration",
    description: "Integrating AI-powered solutions to automate processes and derive valuable insights from data.",
    icon: Bot,
  },
  {
    title: "Cloud & DevOps",
    description: "Leveraging cloud platforms for robust, scalable infrastructure and streamlined development pipelines.",
    icon: Cloud,
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user interfaces that provide an exceptional user experience.",
    icon: PenTool,
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  imageHint: string;
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-commerce Platform 'ShopSphere'",
    description: "A comprehensive e-commerce solution with a custom CMS, payment gateway integration, and advanced product search.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    image: "https://picsum.photos/seed/101/600/400",
    imageHint: "e-commerce website",
  },
  {
    id: "project-2",
    title: "Mobile Banking App 'FintechFlow'",
    description: "A secure and user-friendly mobile banking application with features like real-time transactions, bill payments, and biometric authentication.",
    technologies: ["React Native", "Firebase", "Node.js"],
    image: "https://picsum.photos/seed/102/600/400",
    imageHint: "mobile app",
  },
  {
    id: "project-3",
    title: "Analytics Dashboard 'DataVantage'",
    description: "An interactive dashboard for visualizing and analyzing complex business data, providing actionable insights through charts and reports.",
    technologies: ["React", "D3.js", "Python", "Flask"],
    image: "https://picsum.photos/seed/103/600/400",
    imageHint: "dashboard analytics",
  },
  {
    id: "project-4",
    title: "Cloud Migration for 'Legacy Corp'",
    description: "Successfully migrated a large-scale enterprise system to a modern, scalable cloud architecture on AWS, improving performance and reducing costs.",
    technologies: ["AWS", "Terraform", "Docker", "Kubernetes"],
    image: "https://picsum.photos/seed/104/600/400",
    imageHint: "cloud server",
  },
];

export type ClientLocation = {
  id: string;
  name: string;
  pos: { lat: number; lng: number };
};

export const clientLocations: ClientLocation[] = [
  { id: "usa", name: "New York, USA", pos: { lat: 40.7128, lng: -74.0060 } },
  { id: "uk", name: "London, UK", pos: { lat: 51.5074, lng: -0.1278 } },
  { id: "japan", name: "Tokyo, Japan", pos: { lat: 35.6895, lng: 139.6917 } },
  { id: "australia", name: "Sydney, Australia", pos: { lat: -33.8688, lng: 151.2093 } },
  { id: "brazil", name: "São Paulo, Brazil", pos: { lat: -23.5505, lng: -46.6333 } },
  { id: "germany", name: "Berlin, Germany", pos: { lat: 52.5200, lng: 13.4050 } },
  { id: "india", name: "Bangalore, India", pos: { lat: 12.9716, lng: 77.5946 } },
  { id: "singapore", name: "Singapore", pos: { lat: 1.3521, lng: 103.8198 } },
];

export type JobListing = {
  id: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  description: string;
  icon: LucideIcon;
};

export const jobListings: JobListing[] = [
  {
    id: "job-1",
    title: "Senior Full-Stack Engineer",
    location: "Remote",
    type: "Full-time",
    description: "Seeking an experienced full-stack engineer proficient in Next.js, TypeScript, and cloud services.",
    icon: Briefcase,
  },
  {
    id: "job-2",
    title: "UX/UI Designer",
    location: "New York, USA",
    type: "Full-time",
    description: "Creative and detail-oriented designer to craft exceptional user experiences for web and mobile.",
    icon: Briefcase,
  },
  {
    id: "job-3",
    title: "Project Manager",
    location: "London, UK",
    type: "Contract",
    description: "Agile project manager to lead software development teams and ensure timely project delivery.",
    icon: Briefcase,
  },
  {
    id: "job-4",
    title: "DevOps Engineer",
    location: "Remote",
    type: "Full-time",
    description: "Experienced DevOps engineer to manage our CI/CD pipelines and cloud infrastructure.",
    icon: Briefcase,
  },
];

export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "#contact", label: "Contact" },
];
