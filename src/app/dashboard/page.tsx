'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, Settings, Plus, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const firestore = useFirestore();
  
  const projectsCollRef = useMemoFirebase(() => collection(firestore, 'projects'), [firestore]);
  const { data: projects, isLoading: isLoadingProjects } = useCollection(projectsCollRef);
  
  const servicesCollRef = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading: isLoadingServices } = useCollection(servicesCollRef);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">An overview of your website's content and activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingProjects ? (
              <Skeleton className="h-8 w-1/4 mt-2" />
            ) : (
              <div className="text-2xl font-bold">{projects?.length ?? 0}</div>
            )}
            <p className="text-xs text-muted-foreground">Manage your portfolio projects</p>
             <Button asChild variant="ghost" size="sm" className="mt-4 -ml-4">
                <Link href="/dashboard/projects">
                    Manage Projects
                </Link>
             </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingServices ? (
               <Skeleton className="h-8 w-1/4 mt-2" />
            ) : (
              <div className="text-2xl font-bold">{services?.length ?? 0}</div>
            )}
            <p className="text-xs text-muted-foreground">Manage your offered services</p>
             <Button asChild variant="ghost" size="sm" className="mt-4 -ml-4">
                <Link href="/dashboard/services">
                    Manage Services
                </Link>
             </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
           <CardHeader>
             <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
             <CardDescription className="text-xs">Add new content quickly.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <Button asChild variant="outline">
              <Link href="/dashboard/projects?action=add">
                <Plus className="mr-2 h-4 w-4" /> Add New Project
              </Link>
            </Button>
             <Button asChild variant="outline">
              <Link href="/dashboard/services?action=add">
                <Plus className="mr-2 h-4 w-4" /> Add New Service
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/" target="_blank">
                <Eye className="mr-2 h-4 w-4" /> View Live Site
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
