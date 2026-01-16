"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { getPrioritizedProjectsAction } from "@/app/actions";
import { Loader2, Wand2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ProjectShowcase() {
  const [businessPriorities, setBusinessPriorities] = useState("Target clients in the e-commerce and fintech industries, emphasizing mobile-first solutions.");
  const [highlighted, setHighlighted] = useState<string[]>([]);
  const [reasoning, setReasoning] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handlePrioritize = async () => {
    startTransition(async () => {
      try {
        const projectList = projects
          .map((p) => `- ${p.title}: ${p.description}`)
          .join("\n");

        const result = await getPrioritizedProjectsAction({
          businessPriorities,
          projectList,
        });

        const highlightedTitles = result.highlightedProjects.split(',').map(name => name.trim());
        setHighlighted(highlightedTitles);
        setReasoning(result.reasoning);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "AI Error",
          description: (error as Error).message,
        });
      }
    });
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Our Flagship Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore a selection of our finest work, demonstrating our capability and commitment to excellence.
          </p>
        </div>

        <Card className="mb-12 bg-card/70 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Wand2 className="text-primary" />
              AI-Powered Project Showcase
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="priorities">
                Describe your ideal client or project focus:
              </Label>
              <Textarea
                id="priorities"
                placeholder="e.g., 'Focus on fintech startups needing scalable cloud infrastructure.'"
                value={businessPriorities}
                onChange={(e) => setBusinessPriorities(e.target.value)}
                className="mt-2"
              />
            </div>
            {reasoning && (
              <Alert>
                <AlertTitle className="font-headline">AI Reasoning</AlertTitle>
                <AlertDescription>{reasoning}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handlePrioritize} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Highlight Relevant Projects"
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={cn(
                "overflow-hidden transition-all duration-500",
                highlighted.length > 0 &&
                  (highlighted.includes(project.title)
                    ? "ring-4 ring-primary shadow-2xl"
                    : "opacity-60 scale-95")
              )}
            >
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    data-ai-hint={project.imageHint}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-headline mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
