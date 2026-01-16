import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { services } from "@/lib/data";

export function Services() {
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
          {services.map((service, index) => (
            <div key={service.title} className="animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
              <Card className="h-full text-center glassmorphic-card hover:-translate-y-2 transition-transform duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                <CardHeader className="items-center p-8">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary rounded-xl p-4 mb-6">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-xl text-foreground">{service.title}</CardTitle>
                  <CardDescription className="pt-2 text-sm text-muted-foreground">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
