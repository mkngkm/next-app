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
  return (
    <html>
      <head>
        <title>병렬 라우트 기본 레이아웃</title>
      </head>
      <body>
        <div>
          <h1>Main</h1>
          {children}
        </div>
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
  );
}
