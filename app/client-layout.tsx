// app/client-layout.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import Navigation from './navigation';
import Footer from './footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navigation />
      <main className='min-h-screen pb-5'>{children}</main>
      <Footer />
    </SessionProvider>
  );
}
