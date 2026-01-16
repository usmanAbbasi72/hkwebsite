"use client";

import Image from 'next/image';
import Link from 'next/link';
import { teamMembers } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Linkedin, Twitter } from 'lucide-react';

export function Team() {
  return (
    <section id="team" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
            Meet Our Leadership
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The driving force behind our innovation and success.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
              <Card className="glassmorphic-card h-full text-center p-6 md:p-8 hover:-translate-y-2 transition-transform duration-300">
                <Image
                  src={member.avatarUrl}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-6 border-4 border-primary/50"
                />
                <h3 className="text-2xl font-headline font-bold text-foreground">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.title}</p>
                <p className="text-muted-foreground mb-6">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <Link href={member.socials.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link href={member.socials.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-6 w-6" />
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
