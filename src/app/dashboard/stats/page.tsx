'use client';

import React, { useState, useEffect } from 'react';
import { collection, doc } from 'firebase/firestore';
import { Plus, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { type Stat } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { StatFormDialog } from '@/components/dashboard/StatFormDialog';
import { useSearchParams } from 'next/navigation';

type StatWithId = Stat & { id: string };

export default function ManageStatsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statToEdit, setStatToEdit] = useState<StatWithId | null>(null);

  const firestore = useFirestore();
  const statsCollRef = useMemoFirebase(() => collection(firestore, 'stats'), [firestore]);
  const { data: stats, isLoading } = useCollection<StatWithId>(statsCollRef);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      handleAddNew();
    }
  }, [searchParams]);

  const handleAddNew = () => {
    setStatToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (stat: StatWithId) => {
    setStatToEdit(stat);
    setIsFormOpen(true);
  };

  const handleDelete = (statId: string, statLabel: string) => {
    const statRef = doc(firestore, 'stats', statId);
    deleteDocumentNonBlocking(statRef);
    toast({
      title: 'Achievement Deleted',
      description: `"${statLabel}" has been removed.`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Manage Achievements</CardTitle>
              <CardDescription>Create, edit, and delete the statistics on your website.</CardDescription>
            </div>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" /> Add Achievement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Value</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead className="w-[50px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-8" /></TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
                {!isLoading && stats?.map((stat) => (
                  <TableRow key={stat.id}>
                    <TableCell className="font-medium">{stat.value}</TableCell>
                    <TableCell className="text-muted-foreground">{stat.label}</TableCell>
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
                              <DropdownMenuItem onSelect={() => handleEdit(stat)}>
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
                                This action cannot be undone. This will permanently delete the "{stat.label}" achievement.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={() => handleDelete(stat.id, stat.label)}>
                                Yes, delete achievement
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
           {!isLoading && stats?.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                <p>No achievements found.</p>
                <Button variant="link" onClick={handleAddNew}>Add your first achievement</Button>
              </div>
            )}
        </CardContent>
      </Card>
      
      <StatFormDialog
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        statToEdit={statToEdit}
      />
    </>
  );
}
