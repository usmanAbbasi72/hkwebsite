import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { features } from "@/lib/data";

export function Services() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            Built for the Future
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform is engineered with next-generation technology to deliver unparalleled performance and capabilities.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={feature.title} className="animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
              <Card className="h-full text-center bg-white/5 backdrop-blur-md border-white/10 hover:-translate-y-2 transition-transform duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/10">
                <CardHeader className="items-center">
                  <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 text-primary rounded-lg p-4 mb-4">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-lg text-foreground">{feature.title}</CardTitle>
                  <CardDescription className="pt-2 text-sm">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
