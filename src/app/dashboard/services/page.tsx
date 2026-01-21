'use client';

import React, { useState, useEffect } from 'react';
import { collection, doc } from 'firebase/firestore';
import { Plus, MoreHorizontal, Pencil, Trash2, type LucideIcon } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { type Service, serviceIcons } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { ServiceFormDialog } from '@/components/dashboard/ServiceFormDialog';
import { useSearchParams } from 'next/navigation';

type ServiceWithId = Service & { id: string };

export default function ManageServicesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceWithId | null>(null);

  const firestore = useFirestore();
  const servicesCollRef = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<ServiceWithId>(servicesCollRef);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      handleAddNew();
    }
  }, [searchParams]);

  const handleAddNew = () => {
    setServiceToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: ServiceWithId) => {
    setServiceToEdit(service);
    setIsFormOpen(true);
  };

  const handleDelete = (serviceId: string, serviceTitle: string) => {
    const serviceRef = doc(firestore, 'services', serviceId);
    deleteDocumentNonBlocking(serviceRef);
    toast({
      title: 'Service Deleted',
      description: `"${serviceTitle}" has been removed.`,
    });
  };

  const renderIcon = (iconName: string) => {
    const Icon = serviceIcons[iconName] as LucideIcon | undefined;
    if (!Icon) return null;
    return <Icon className="h-6 w-6 text-primary" />;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Manage Services</CardTitle>
              <CardDescription>Create, edit, and delete the services offered on your website.</CardDescription>
            </div>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" /> Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Icon</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[50px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-6 w-6 rounded-md" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-8" /></TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
                {!isLoading && services?.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{renderIcon(service.icon)}</TableCell>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell className="text-muted-foreground">{service.description}</TableCell>
                    <TableCell className="text-right">
                       <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onSelect={() => handleEdit(service)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                               <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the "{service.title}" service.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={() => handleDelete(service.id, service.title)}>
                                Yes, delete service
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
           {!isLoading && services?.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                <p>No services found.</p>
                <Button variant="link" onClick={handleAddNew}>Add your first service</Button>
              </div>
            )}
        </CardContent>
      </Card>
      
      <ServiceFormDialog
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        serviceToEdit={serviceToEdit}
      />
    </>
  );
}
