import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { Contact } from '@/components/sections/Contact';
import { Stats } from '@/components/sections/Stats';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { Team } from '@/components/sections/Team';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <ProjectShowcase />
      <Team />
      <Testimonials />
      <Contact />
    </>
  );
}
