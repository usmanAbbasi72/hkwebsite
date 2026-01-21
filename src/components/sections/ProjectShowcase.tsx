'use client';

import { projects as initialProjects, type Project } from '@/lib/data';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { ArrowUpRight, Loader2, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition, useEffect } from 'react';
import { getPrioritizedProjectsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';

export function ProjectShowcase() {
  const firestore = useFirestore();
  const projectsCollRef = useMemoFirebase(() => collection(firestore, 'projects'), [firestore]);
  const { data: firestoreProjects, isLoading: isLoadingProjects } = useCollection<Project>(projectsCollRef);
  
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);
  const [sourceProjects, setSourceProjects] = useState<Project[]>(initialProjects);

  const [businessPriorities, setBusinessPriorities] = useState('Cutting-edge AI and SaaS solutions');
  const [reasoning, setReasoning] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    const projectsToUse = firestoreProjects && firestoreProjects.length > 0 ? firestoreProjects : initialProjects;
    setSourceProjects(projectsToUse);
    setDisplayProjects(projectsToUse);
  }, [firestoreProjects]);


  const handlePrioritize = () => {
    startTransition(async () => {
      setReasoning(''); // Clear previous reasoning
      try {
        const projectList = sourceProjects
          .map(p => `- ${p.title}: ${p.description}`)
          .join('\n');
        
        const result = await getPrioritizedProjectsAction({
          businessPriorities,
          projectList,
        });

        if (result && result.highlightedProjects) {
          const highlighted = result.highlightedProjects.split(',').map(p => p.trim());
          
          const sortedProjects = [...sourceProjects].sort((a, b) => {
            const aIsHighlighted = highlighted.includes(a.title);
            const bIsHighlighted = highlighted.includes(b.title);

            if (aIsHighlighted && !bIsHighlighted) return -1;
            if (!aIsHighlighted && bIsHighlighted) return 1;

            if (aIsHighlighted && bIsHighlighted) {
              return highlighted.indexOf(a.title) - highlighted.indexOf(b.title);
            }
            
            // for non-highlighted projects, keep original order relative to each other
            return sourceProjects.findIndex(p => p.id === a.id) - sourceProjects.findIndex(p => p.id === b.id);
          });
          
          setDisplayProjects(sortedProjects);
          setReasoning(result.reasoning);
        } else {
           toast({
            variant: "destructive",
            title: "AI Prioritization Failed",
            description: "The AI could not prioritize the projects. Please try again.",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "An error occurred while communicating with the AI service.",
        });
      }
    });
  };

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="glassmorphic-card h-96">
          <Skeleton className="h-full w-full" />
        </Card>
      ))}
    </div>
  );

  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
            Our Work, Your Vision
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We don't just build projects; we build partnerships. Explore our portfolio, then tell us your goals and watch our AI re-prioritize our work to match your vision.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="glassmorphic-card p-6 rounded-2xl">
            <p className="text-lg font-medium font-headline mb-4">What are your business priorities?</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="e.g., 'E-commerce for fashion brands'"
                value={businessPriorities}
                onChange={(e) => setBusinessPriorities(e.target.value)}
                className="flex-grow bg-background/50 border-white/20"
                disabled={isPending || isLoadingProjects}
              />
              <Button onClick={handlePrioritize} disabled={isPending || isLoadingProjects || !businessPriorities} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:scale-105 transition-transform">
                {isPending || isLoadingProjects ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Prioritize with AI
              </Button>
            </div>
            {isPending && <p className="text-sm text-muted-foreground mt-4 text-center">Our AI is analyzing your request...</p>}
            {reasoning && !isPending && (
              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2"><Wand2 size={16} /> AI Reasoning</h4>
                <p className="text-sm text-muted-foreground">{reasoning}</p>
              </div>
            )}
          </div>
        </div>

        {isLoadingProjects ? renderSkeletons() : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project, index) => (
              <div key={project.id} className="animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                <Card className="group overflow-hidden relative glassmorphic-card h-96">
                  <Link href={`/projects/${project.id}`} className="block h-full">
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
        )}
      </div>
    </section>
  );
}
