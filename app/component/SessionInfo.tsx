'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function SessionInfo() {
  const { data: session, status } = useSession();

  // Redirect or show different UI based on session status
  if (status === 'loading') return <div>Loading...</div>;

  if (!session) return <div>Not logged in</div>;

  return (
    <div>
      <p>Welcome, {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
