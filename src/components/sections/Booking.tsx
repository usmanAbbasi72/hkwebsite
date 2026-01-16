"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format, startOfToday } from "date-fns";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  date: z.date({ required_error: "A date for the meeting is required." }),
  notes: z.string().optional(),
});

export function Booking() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      notes: "",
    },
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    if (!values.date) {
        toast({
            variant: "destructive",
            title: "Booking Failed",
            description: "Please select a date for the meeting.",
        });
        return;
    }
    console.log(values);
    toast({
      title: "Booking Request Sent!",
      description: `We've received your request for a meeting on ${format(values.date, "PPP")}. We'll be in touch shortly!`,
    });
    form.reset();
  }

  return (
    <section id="booking" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Schedule a Consultation</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Let's discuss how we can help your business grow. Pick a date that works for you.
          </p>
        </div>
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <div className="flex flex-col items-center space-y-4 w-full">
                    <h3 className="text-xl font-headline font-semibold">1. Select a Date</h3>
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-center">
                          {isClient ? (
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < startOfToday() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className="rounded-md border bg-card"
                            />
                          ) : (
                            <div className="w-[280px] h-[333px] animate-pulse rounded-md bg-muted border" />
                          )}
                          <FormMessage className="pt-2" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-6 w-full">
                    <h3 className="text-xl font-headline font-semibold text-center lg:text-left">2. Your Details</h3>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell us a little about your project..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                    <Button type="submit" size="lg" className="w-full max-w-sm" disabled={form.formState.isSubmitting}>
                        Request Booking
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
