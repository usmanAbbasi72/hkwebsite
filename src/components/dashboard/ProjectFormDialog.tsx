'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { type Project } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  imageUrl: z.string().url('Please enter a valid URL.'),
  imageHint: z.string().min(2, 'Image hint must be at least 2 characters.'),
  tags: z.string().min(1, 'Please enter at least one tag.'),
});

type ProjectWithId = Project & { id: string };

interface ProjectFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  projectToEdit: ProjectWithId | null;
}

export function ProjectFormDialog({ isOpen, setIsOpen, projectToEdit }: ProjectFormDialogProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      imageHint: '',
      tags: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (projectToEdit) {
        form.reset({
          ...projectToEdit,
          tags: projectToEdit.tags.join(', '),
        });
      } else {
        form.reset({
          title: '',
          description: '',
          imageUrl: '',
          imageHint: '',
          tags: '',
        });
      }
    }
  }, [isOpen, projectToEdit, form]);

  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    const projectData = {
      ...values,
      tags: values.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    };

    if (projectToEdit) {
      const projectRef = doc(firestore, 'projects', projectToEdit.id);
      // We are not passing the ID in the data to be updated.
      const { id, ...dataToUpdate } = projectData;
      updateDocumentNonBlocking(projectRef, dataToUpdate);
      toast({
        title: 'Project Updated',
        description: `"${values.title}" has been successfully updated.`,
      });
    } else {
      const projectsCollRef = collection(firestore, 'projects');
      addDocumentNonBlocking(projectsCollRef, projectData);
      toast({
        title: 'Project Created',
        description: `"${values.title}" has been successfully added.`,
      });
    }
    setIsOpen(false);
  };
  
  const dialogTitle = projectToEdit ? 'Edit Project' : 'Add New Project';
  const dialogDescription = projectToEdit ? "Make changes to your project here. Click save when you're done." : 'Add a new project to be displayed in your portfolio.';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Enterprise AI Platform" {...field} />
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
                    <Textarea placeholder="Describe the project..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                   <FormDescription>Must be a URL from a whitelisted domain in next.config.ts (e.g., images.unsplash.com)</FormDescription>
                  <FormControl>
                    <Input placeholder="https://images.unsplash.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image AI Hint</FormLabel>
                   <FormDescription>A few keywords for AI image search if the image is replaced.</FormDescription>
                  <FormControl>
                    <Input placeholder="e.g., analytics dashboard" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormDescription>Comma-separated list of tags (e.g., AI, SaaS).</FormDescription>
                  <FormControl>
                    <Input placeholder="AI Integration, Custom Software" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sticky bottom-0 bg-background pt-4">
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
