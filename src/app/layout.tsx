import { geistMono, geistSans } from '@/app/fonts';
import '@/app/globals.css';
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
        {children}
      </body>
    </html>
  );
}
