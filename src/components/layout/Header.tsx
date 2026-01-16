"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Sparkles className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline text-primary">
            Apex Software Solutions
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-4">
           <Button asChild>
              <Link href="#contact">Contact Us</Link>
            </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <Link href="/" className="flex items-center gap-2 mb-4" onClick={handleLinkClick}>
                  <Sparkles className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold font-headline">Apex</span>
                </Link>
                <nav className="grid gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                      onClick={handleLinkClick}
                      prefetch={link.href.startsWith("/")}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                 <Button asChild className="mt-4">
                    <Link href="#contact" onClick={handleLinkClick}>Contact Us</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
