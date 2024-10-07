export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <title>Todo App</title>
      </head>
      <body>
        <header>
          <h1>My Todo App</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
