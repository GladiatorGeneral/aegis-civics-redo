import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'USAMind - Neural Civic Intelligence Platform',
  description: 'A futuristic civic engagement platform powered by quantum AI and blockchain verification',
  keywords: ['civic', 'AI', 'government', 'democracy', 'transparency', 'legislation'],
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
        {children}
      </body>
    </html>
  );
}
