"use client";

import { testimonials } from '@/lib/data';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We're proud to have partnered with amazing companies.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
           plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2">
                <div className="h-full">
                  <Card className="glassmorphic-card h-full flex flex-col justify-between p-8 relative overflow-hidden">
                    <Quote className="absolute top-4 left-4 h-16 w-16 text-primary/10" />
                    <div className="z-10 flex-grow flex flex-col">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-foreground/90 text-lg italic flex-grow">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                    <div className="flex items-center gap-4 mt-6 z-10">
                      <Image
                        src={testimonial.avatarUrl}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="rounded-full border-2 border-primary/50"
                      />
                      <div>
                        <p className="font-semibold text-lg text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}, {testimonial.company}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}
