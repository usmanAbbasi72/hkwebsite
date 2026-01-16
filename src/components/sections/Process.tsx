"use client";

import { processSteps } from "@/lib/data";
import { CheckCircle } from "lucide-react";

export function Process() {
  return (
    <section id="process" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
            Our Proven Process
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We follow a streamlined, agile process to ensure quality, efficiency, and transparency at every step.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border/50 hidden md:block" />

          {processSteps.map((step, index) => (
            <div 
              key={step.title} 
              className="relative mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700" 
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="md:flex items-center justify-center">
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                  <div className="md:absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold shadow-lg shadow-primary/30 z-10 hidden md:flex">
                    {index + 1}
                  </div>
                  <div className="bg-secondary p-6 rounded-lg border border-border/50">
                    <h3 className="text-2xl font-headline font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {/* Empty div for spacing on the other side */}
                <div className="md:w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
