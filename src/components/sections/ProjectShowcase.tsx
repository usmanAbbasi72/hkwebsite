"use client";

import { Check, ArrowRight } from 'lucide-react';
import { pricingTiers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export function ProjectShowcase() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            Pricing Plans
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the perfect plan for your needs. Simple, transparent, and scalable.
          </p>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-12">
            <Label htmlFor="billing-cycle" className="text-muted-foreground">Monthly</Label>
            <Switch id="billing-cycle" checked={isYearly} onCheckedChange={setIsYearly} />
            <Label htmlFor="billing-cycle" className="text-foreground">Yearly</Label>
            <div className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">Save 20%</div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-center max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "border-2 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20",
                tier.recommended ? 'border-primary relative' : 'border-white/10'
              )}
            >
              {tier.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                        Most Popular
                    </div>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline">{tier.name}</CardTitle>
                <CardDescription className="pt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <span className="text-4xl font-bold">${isYearly ? tier.price.yearly : tier.price.monthly}</span>
                  <span className="text-muted-foreground">/ {isYearly ? 'year' : 'month'}</span>
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                 <Button asChild className={cn(
                     "w-full",
                     tier.recommended ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg hover:scale-105 transition-transform" : "bg-primary/20 hover:bg-primary text-primary-foreground"
                 )} size="lg">
                  <a href="#">
                    {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
