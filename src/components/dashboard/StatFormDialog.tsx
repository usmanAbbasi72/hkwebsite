'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { type Stat } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const statSchema = z.object({
  value: z.string().min(1, 'Value is required.'),
  label: z.string().min(2, 'Label must be at least 2 characters.'),
});

type StatWithId = Stat & { id: string };

interface StatFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  statToEdit: StatWithId | null;
}

export function StatFormDialog({ isOpen, setIsOpen, statToEdit }: StatFormDialogProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof statSchema>>({
    resolver: zodResolver(statSchema),
    defaultValues: {
      value: '',
      label: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (statToEdit) {
        form.reset(statToEdit);
      } else {
        form.reset({ value: '', label: '' });
      }
    }
  }, [isOpen, statToEdit, form]);

  const onSubmit = (values: z.infer<typeof statSchema>) => {
    if (statToEdit) {
      const statRef = doc(firestore, 'stats', statToEdit.id);
      updateDocumentNonBlocking(statRef, values);
      toast({
        title: 'Achievement Updated',
        description: `"${values.label}" has been successfully updated.`,
      });
    } else {
      const statsCollRef = collection(firestore, 'stats');
      addDocumentNonBlocking(statsCollRef, values);
      toast({
        title: 'Achievement Created',
        description: `"${values.label}" has been successfully added.`,
      });
    }
    setIsOpen(false);
  };
  
  const dialogTitle = statToEdit ? 'Edit Achievement' : 'Add New Achievement';
  const dialogDescription = statToEdit ? "Make changes to your achievement here. Click save when you're done." : 'Add a new achievement stat to be displayed on your website.';

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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 150+" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Projects Completed" {...field} />
                  </FormControl>
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
