import Link from "next/link";
import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";
import { navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border/20">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 mb-6" prefetch={false}>
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline text-primary">
              Apex Software Solutions
            </span>
          </Link>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm font-medium text-muted-foreground">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-primary" prefetch={link.href.startsWith("/")}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6 mb-8">
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

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Apex Software Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
