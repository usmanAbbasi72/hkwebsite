import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center text-center bg-background">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            We Build Digital Experiences
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            We are a team of developers, designers, and strategists passionate about building beautiful and functional websites and applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#projects">Our Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
