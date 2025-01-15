import { ThemeProvider } from '@/app/_features/base/providers/theme-provider';
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
