'use client';

import { signOut } from '@/app/_features/auth/actions';
import { ProtectedSidebar } from '@/app/_features/base/components/app-sidebar';
import { ThemeToggle } from '@/app/_features/base/components/theme-toggle';
import { Button } from '@/app/_ui/components/button';
import { SidebarProvider, SidebarTrigger } from '@/app/_ui/components/sidebar';
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

          <div className="flex items-center space-x-1">
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

            <ThemeToggle />
          </div>
        </header>

        {children}
      </main>
    </SidebarProvider>
  );
}
