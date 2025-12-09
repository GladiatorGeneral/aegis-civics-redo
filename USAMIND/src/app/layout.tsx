import type { Metadata } from 'next';
import './globals.css';
import { Navbar, Footer } from '@/components/navigation';

export const metadata: Metadata = {
  title: 'Phnx AI - Civic Intelligence Platform',
  description: 'AI-powered civic engagement platform - Track legislation, understand policy, and engage with democracy',
  keywords: ['civic', 'AI', 'government', 'democracy', 'transparency', 'legislation', 'Phnx AI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="neural-dark-bg min-h-screen antialiased">
        <div className="neural-grid-overlay" />
        <Navbar transparent />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
