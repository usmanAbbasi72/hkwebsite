import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-[100vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 animate-aurora">
            <div className="absolute -inset-60 bg-gradient-to-tr from-primary/30 via-transparent to-transparent opacity-50 animate-aurora-2" />
            <div className="absolute -inset-60 bg-gradient-to-bl from-purple-600/30 via-transparent to-transparent opacity-50 animate-aurora-3" />
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 sm:text-6xl md:text-7xl lg:text-8xl">
            The Future of Software is Here.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/70">
            SynthWave provides cutting-edge solutions that redefine digital interaction. Experience unparalleled performance, intuitive design, and intelligent automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg hover:scale-105 transition-transform duration-300">
              <Link href="#pricing">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="group text-foreground/80 hover:bg-transparent hover:text-white transition-all duration-300">
              <Link href="#">
                <PlayCircle className="mr-2 h-5 w-5 text-primary group-hover:scale-110 transition-transform"/> Watch Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
