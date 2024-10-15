'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface LayoutProps {
  children: ReactNode; // 자식 컴포넌트를 받아오는 props
}

const RecipeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      <div className='min-h-screen flex flex-col'>
        <header className='bg-blue-500 text-white p-4'>
          <h1 className='text-2xl'>나만의 레시피</h1>
        </header>

        <main className='flex-grow p-4'>
          {children} {/* 자식 컴포넌트를 렌더링 */}
        </main>

        <footer className='bg-gray-800 text-white text-center p-4'>
          <p>&copy; {new Date().getFullYear()} 나만의 레시피</p>
        </footer>
      </div>
    </SessionProvider>
  );
};

export default RecipeLayout;
