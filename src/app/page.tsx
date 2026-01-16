import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ProjectShowcase />
      <Contact />
    </>
  );
}
