'use client';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { services as staticServices, serviceIcons, Service } from "@/lib/data";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import type { LucideIcon } from "lucide-react";

export function Services() {
  const firestore = useFirestore();
  const servicesCollRef = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<Service>(servicesCollRef);

  const renderService = (service: Service, index: number) => {
    const Icon = serviceIcons[service.icon];
    return (
      <div key={service.title} className="animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
        <Card className="h-full text-center glassmorphic-card hover:-translate-y-2 transition-transform duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
          <CardHeader className="items-center p-8">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary rounded-xl p-4 mb-6">
              {Icon && <Icon className="h-8 w-8" />}
            </div>
            <CardTitle className="font-headline text-xl text-foreground">{service.title}</CardTitle>
            <CardDescription className="pt-2 text-sm text-muted-foreground">{service.description}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
            Our Core Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We deliver comprehensive solutions to elevate your business in the digital landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-full text-center glassmorphic-card">
              <CardHeader className="items-center p-8">
                <Skeleton className="h-16 w-16 rounded-xl mb-6" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-5/6" />
              </CardHeader>
            </Card>
          ))}
          {!isLoading && services && services.length > 0 && services.map(renderService)}
          {/* Fallback to static data if firestore is empty or fails to load */}
          {!isLoading && (!services || services.length === 0) && staticServices.map(renderService)}
        </div>
      </div>
    </section>
  );
}
