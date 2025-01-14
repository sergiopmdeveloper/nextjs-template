import { ProtectedSidebar } from '@/components/app/app-sidebar';
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
    <SidebarProvider defaultOpen={false}>
      <ProtectedSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
}
