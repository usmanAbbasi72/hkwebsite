import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 7L12 12L22 7" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12V22" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold font-headline text-foreground">
                SynthWave
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Redefining digital experiences with cutting-edge software.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2 lg:justify-end">
            <div className="grid gap-2">
              <h4 className="font-semibold text-foreground">Navigate</h4>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary" prefetch={link.href.startsWith("/")}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="grid gap-2">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Terms of Service</Link>
            </div>
            <div className="grid gap-2">
              <h4 className="font-semibold text-foreground">Connect</h4>
              <div className="flex items-center gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SynthWave Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
