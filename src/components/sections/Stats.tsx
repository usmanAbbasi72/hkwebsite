"use client";

import { stats } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

function StatCounter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(target * progress);
      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(target);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-5xl md:text-6xl font-bold font-headline gradient-text">
        {count}{suffix}
      </p>
      <p className="text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
             <div key={stat.label} className="animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                <StatCounter value={stat.value} label={stat.label} />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
