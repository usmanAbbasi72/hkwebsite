import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Our Expertise</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We provide a wide range of software development services to help you achieve your business goals.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-card">
              <CardHeader className="items-center">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">{service.title}</CardTitle>
                <CardDescription className="pt-2">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
