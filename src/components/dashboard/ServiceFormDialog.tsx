'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { serviceIcons, type Service } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const serviceSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  icon: z.string({ required_error: 'An icon is required.' }).min(1, 'An icon is required.'),
});

type ServiceWithId = Service & { id: string };

interface ServiceFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  serviceToEdit: ServiceWithId | null;
}

export function ServiceFormDialog({ isOpen, setIsOpen, serviceToEdit }: ServiceFormDialogProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      description: '',
      icon: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (serviceToEdit) {
        form.reset(serviceToEdit);
      } else {
        form.reset({ title: '', description: '', icon: '' });
      }
    }
  }, [isOpen, serviceToEdit, form]);

  const onSubmit = (values: z.infer<typeof serviceSchema>) => {
    if (serviceToEdit) {
      const serviceRef = doc(firestore, 'services', serviceToEdit.id);
      updateDocumentNonBlocking(serviceRef, values);
      toast({
        title: 'Service Updated',
        description: `"${values.title}" has been successfully updated.`,
      });
    } else {
      const servicesCollRef = collection(firestore, 'services');
      addDocumentNonBlocking(servicesCollRef, values);
      toast({
        title: 'Service Created',
        description: `"${values.title}" has been successfully added.`,
      });
    }
    setIsOpen(false);
  };
  
  const dialogTitle = serviceToEdit ? 'Edit Service' : 'Add New Service';
  const dialogDescription = serviceToEdit ? "Make changes to your service here. Click save when you're done." : 'Add a new service to be displayed on your website.';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Custom Software" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the service..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(serviceIcons).map(iconName => (
                        <SelectItem key={iconName} value={iconName}>
                          {iconName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
