import React from 'react';

export default function RootLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  const didLogin = true;
  return didLogin ? (
    <html>
      <body>
        <div>{children}</div>
        <div>
          <h1>Team</h1>
          {team}
        </div>
        <div>
          <h1>Analytics</h1>
          {analytics}
        </div>
      </body>
    </html>
  ) : (
    <html>
      <body>
        <div>
          <h1>Login화면</h1>
          {analytics}
        </div>
      </body>
    </html>
  );
}
