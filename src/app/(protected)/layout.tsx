import { ProtectedSidebar } from '@/components/app/app-sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

/**
 * Protected layout.
 */
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <ProtectedSidebar />

      <main className="w-full px-8">
        <header className="flex h-20 w-full items-center justify-between">
          <div className="flex items-center space-x-1">
            <SidebarTrigger />
            <h1 className="font-mono text-2xl font-bold">Logo</h1>
          </div>

          <div>
            <Button className="font-mono" variant="destructive">
              Sign out
            </Button>
          </div>
        </header>

        {children}
      </main>
    </SidebarProvider>
  );
}
