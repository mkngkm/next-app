// app/layout.tsx
import ClientLayout from './client-layout'; // Import ClientLayout
import { Metadata } from 'next'; // Import Metadata
import './globals.css';

// Define metadata
export const metadata: Metadata = {
  title: 'Recipe', // Set the title here
  description: 'A collection of your favorite recipes', // Optional: add a description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='kr'>
      <head>
        <title>Recipe</title> {/* Use metadata title */}
      </head>
      <body className='bg-gray-100'>
        <ClientLayout>{children}</ClientLayout> {/* Use ClientLayout */}
      </body>
    </html>
  );
}
