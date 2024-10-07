import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <header>
          <nav>
            <a href='/about'>About</a>
            <a href='/blog'>Blog</a>
            <a href='/account'>Account</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>푸터입니다</footer>
      </body>
    </html>
  );
}
