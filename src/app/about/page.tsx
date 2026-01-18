import { Team } from "@/components/sections/Team";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";

export default function AboutPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
              About HK Technologies
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We are a passionate team of developers, designers, and marketers dedicated to building innovative digital solutions. Our mission is to help businesses thrive in the digital age by providing cutting-edge technology and exceptional service.
            </p>
          </div>
        </div>
      </section>
      <Stats />
      <Team />
      <Process />
    </>
  );
}
