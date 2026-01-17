import { ClientMap } from '@/components/sections/ClientMap';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <ProjectShowcase />
      <ClientMap />
      <Testimonials />
      <Contact />
    </>
  );
}
