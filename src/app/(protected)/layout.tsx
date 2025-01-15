'use client';

import { signOut } from '@/app/_features/auth/actions';
import { ProtectedSidebar } from '@/components/app/app-sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Loader } from 'lucide-react';
import { useActionState } from 'react';

/**
 * Protected layout.
 */
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [_, action, pending] = useActionState(signOut, undefined);

  return (
    <SidebarProvider>
      <ProtectedSidebar />

      <main className="w-full px-8">
        <header className="flex h-20 w-full items-center justify-between">
          <div className="flex items-center space-x-1">
            <SidebarTrigger />
            <h1 className="font-mono text-2xl font-bold">Logo</h1>
          </div>

          <form action={action}>
            <Button
              className="font-mono"
              variant="destructive"
              disabled={pending}
            >
              Sign out
              {pending && <Loader className="animate-spin" size={16} />}
            </Button>
          </form>
        </header>

        {children}
      </main>
    </SidebarProvider>
  );
}
