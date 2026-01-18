'use client';

import { jobOpenings, teamMembers } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function Careers() {
  return (
    <>
      <section id="careers-hero" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
              Join Our Team
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We're always looking for talented individuals to join our mission. Explore our open positions and find your next career opportunity at HK Technologies.
            </p>
          </div>
        </div>
      </section>

      <section id="culture" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-headline font-bold">Our Culture</h2>
            <p className="mt-4 text-muted-foreground">
              We believe in a collaborative, innovative, and supportive environment where everyone can thrive.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold font-headline mb-2">Innovation</h3>
              <p className="text-muted-foreground">We encourage creative thinking and provide opportunities to work on cutting-edge projects.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold font-headline mb-2">Collaboration</h3>
              <p className="text-muted-foreground">Teamwork is at the heart of everything we do. We learn and grow together.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold font-headline mb-2">Growth</h3>
              <p className="text-muted-foreground">We invest in our team's professional development with training and mentorship programs.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="openings" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-headline font-bold">Current Openings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="glassmorphic-card">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.location} &bull; {job.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <Button asChild>
                    <Link href="/contact">Apply Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="employee-testimonials" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-headline font-bold">What Our Team Says</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map(member => (
              <Card key={member.id} className="glassmorphic-card p-6 text-center">
                <Image src={member.avatarUrl} alt={member.name} width={80} height={80} className="rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">"HK Technologies is a great place to work. The projects are challenging and the team is incredibly supportive."</p>
                <h4 className="font-bold">{member.name}</h4>
                <p className="text-sm text-primary">{member.title}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
