'use client';

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { type Project } from '@/lib/data';
import { doc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProjectViewPage() {
  const params = useParams();
  const projectId = params.id as string;

  const firestore = useFirestore();
  const projectRef = useMemoFirebase(() => {
    if (!firestore || !projectId) return null;
    return doc(firestore, 'projects', projectId);
  }, [firestore, projectId]);
  const { data: project, isLoading } = useDoc<Project>(projectRef);

  return (
    <div className="bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            {isLoading && <ProjectViewSkeleton />}
            
            {project && !isLoading && (
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/projects">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Portfolio
                    </Link>
                </Button>

                <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-primary/20">
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        data-ai-hint={project.imageHint}
                    />
                </div>

                <div className="glassmorphic-card p-8 rounded-2xl">
                    <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text mb-4">
                        {project.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                    
                    <div className="prose prose-invert max-w-none text-muted-foreground text-lg">
                        <p>{project.description}</p>
                    </div>
                </div>
            </div>
            )}

            {!isLoading && !project && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Project not found</h2>
                    <p className="text-muted-foreground mt-2">The project you are looking for does not exist.</p>
                     <Button asChild variant="link" className="mt-4">
                        <Link href="/projects">Go back to portfolio</Link>
                    </Button>
                </div>
            )}
        </div>
    </div>
  );
}

function ProjectViewSkeleton() {
    return (
        <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-48 mb-8" />
            <Skeleton className="h-96 w-full rounded-2xl mb-8" />
            <div className="p-8">
                <Skeleton className="h-12 w-3/4 mb-4" />
                <div className="flex gap-2 mb-6">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-4/5" />
            </div>
        </div>
    )
}
