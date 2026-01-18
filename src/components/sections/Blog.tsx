'use client';

import { blogPosts } from '@/lib/data';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function Blog() {
  return (
    <section id="blog" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
            From Our Blog
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our latest insights on technology, business, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div key={post.id}>
              <Card className="group overflow-hidden relative glassmorphic-card h-full">
                <Link href="#" className="block h-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-60 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    data-ai-hint={post.imageHint}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>By {post.author}</span>
                    </div>
                    <h3 className="text-xl font-bold font-headline mb-2 text-white">{post.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{post.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-white absolute top-4 right-4 transform-gpu -translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
