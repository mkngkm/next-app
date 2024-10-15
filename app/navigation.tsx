// app/navigation.tsx
'use client'; // Ensure this line is at the top of your file

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navigation = () => {
  const { data: session } = useSession(); // 세션 정보 가져오기

  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <div className='text-xl font-bold'>레시피🧑‍🍳</div>
      {session ? ( // 사용자가 로그인한 경우
        <div className='flex space-x-4'>
          <Link href='/recipe/add' className='bg-blue-500 px-4 py-2 rounded'>
            레시피 추가
          </Link>
          <button
            onClick={() => signOut()}
            className='bg-red-500 px-4 py-2 rounded'
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className='flex space-x-4'>
          <Link href='/login' className='bg-blue-500 px-4 py-2 rounded'>
            로그인
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
