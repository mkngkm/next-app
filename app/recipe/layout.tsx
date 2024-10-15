// app/client-layout.tsx

import { SessionProvider } from 'next-auth/react';

export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
