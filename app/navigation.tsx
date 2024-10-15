'use client'; // Ensure this line is at the top of your file

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Loading from './loading'; // 로딩 컴포넌트 임포트

const Navigation = () => {
  const { data: session, status } = useSession(); // 세션 정보 가져오기

  // 세션 상태가 로딩 중이면 로딩 컴포넌트를 반환
  if (status === 'loading') {
    return <Loading />; // 로딩 화면을 표시
  }

  return (
    <nav className='flex justify-between items-center p-4 bg-green-400 text-white'>
      <Link href='/' className='text-xl font-bold'>
        나만의 레시피
      </Link>
      {session ? ( // 사용자가 로그인한 경우
        <div className='flex space-x-4'>
          <Link
            href='/recipe/add'
            className='bg-white text-green-400 font-bold px-4 py-2 rounded'
          >
            레시피 추가
          </Link>
          <button
            onClick={() => signOut()}
            className='bg-white text-green-400 font-bold px-4 py-2 rounded'
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className='flex space-x-4'>
          <Link
            href='/login'
            className='bg-white text-green-400 font-bold px-4 py-2 rounded'
          >
            로그인
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
