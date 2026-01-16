import Link from "next/link";
import { jobListings } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="bg-background">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Join Our Team</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We're looking for passionate and talented individuals to help us build the future of software.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {jobListings.map((job) => (
              <Card key={job.id} className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
                    <Badge variant={job.type === "Full-time" ? "default" : "secondary"}>{job.type}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground pt-1">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    {job.location}
                  </div>
                </CardHeader>
                <CardDescription className="px-6 pb-6 flex-grow">
                  {job.description}
                </CardDescription>
                <CardFooter>
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="#">Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-headline font-semibold">Don't see a role for you?</h3>
            <p className="text-muted-foreground mt-2">
              We're always looking for great talent. Send us your resume!
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="mailto:careers@apexsolutions.dev">Submit Your Resume</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
