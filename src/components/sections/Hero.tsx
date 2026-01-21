import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-[90vh] py-4 lg:py-40 flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        <div className="absolute inset-0 animate-aurora">
            <div className="absolute -inset-60 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-40 animate-aurora-2" />
            <div className="absolute -inset-60 bg-gradient-to-bl from-accent/20 via-transparent to-transparent opacity-40 animate-aurora-3" />
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="text-5xl font-extrabold tracking-tighter font-headline sm:text-6xl md:text-7xl lg:text-8xl gradient-text">
            Transform Your Digital Vision Into Reality
          </h1>
          <p className="hero-subtitle">
            A premium software development and digital marketing agency for when results matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:scale-110 transition-transform duration-300">
              <Link href="/contact">
                Book Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group border-white/20 text-foreground/80 hover:bg-foreground/5 hover:text-white transition-all duration-300 hover:scale-110 hover:border-primary/50">
              <Link href="/projects">
                <Briefcase className="mr-2 h-5 w-5 text-primary group-hover:text-accent transition-colors"/> View Our Work
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
