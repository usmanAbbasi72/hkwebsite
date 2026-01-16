import { projects } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function ProjectShowcase() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
            Our Recent Work
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore a selection of our projects that demonstrate our expertise and commitment to quality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div key={project.id} className="animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
              <Card className="group overflow-hidden relative glassmorphic-card h-full">
                <Link href="#" className="block h-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    data-ai-hint={project.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                     <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                      <h3 className="text-2xl font-bold font-headline mb-2 text-white">{project.title}</h3>
                      <p className="text-white/80 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                     </div>
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-white absolute top-4 right-4 transform-gpu -translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
