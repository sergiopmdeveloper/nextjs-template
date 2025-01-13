import { ProtectedSidebar } from '@/components/app/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { geistMono, geistSans } from '@/fonts';
import '@/globals.css';
import type { Metadata } from 'next';

/**
 * Root layout metadata.
 */
export const metadata: Metadata = {
  title: 'nextjs-template',
  description: 'Next.js template loaded with batteries',
};

/**
 * Root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <SidebarProvider defaultOpen={false}>
          <ProtectedSidebar />
          <SidebarTrigger />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
