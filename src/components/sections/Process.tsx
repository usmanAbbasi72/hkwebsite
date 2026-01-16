"use client";

import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
            Our Proven Process
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We follow a streamlined, agile process to ensure quality,
            efficiency, and transparency at every step.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block"
            aria-hidden="true"
          />

          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="relative mb-12 md:mb-24 last:mb-0"
            >
              <div
                className={`md:flex items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  className="md:w-5/12 animate-in fade-in slide-in-from-bottom-12 duration-700"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="p-6 sm:p-8 rounded-2xl glassmorphic-card border-2 border-transparent hover:border-primary/50 transition-all duration-300">
                    <div
                      className={`flex items-center gap-4 ${
                        index % 2 === 0
                          ? "md:justify-end md:flex-row-reverse"
                          : ""
                      }`}
                    >
                      <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-headline font-semibold">
                        {step.title}
                      </h3>
                    </div>
                    <p
                      className={`mt-4 text-muted-foreground ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex w-2/12 items-center justify-center">
                  <div className="z-10 h-5 w-5 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--background)),0_0_0_6px_hsl(var(--primary))]" />
                </div>

                <div className="md:w-5/12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
