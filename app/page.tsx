// app/page.tsx
'use client';
import Link from 'next/link';
import Navigation from './navigation'; // Navigation 컴포넌트 임포트
import { SessionProvider, useSession } from 'next-auth/react';
import Loading from './loading'; // 로딩 컴포넌트 임포트

const HomePage = () => {
  const { data: session, status } = useSession(); // 세션 상태 가져오기

  // 로딩 중일 때
  if (status === 'loading') {
    return <Loading />; // 로딩 컴포넌트 표시
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-3xl font-bold text-center mb-6'>
        {session
          ? '레시피를 만들어보아요🧑‍🍳'
          : '로그인 후 레시피를 만들어보아요🧑‍🍳'}
      </h1>
      <Link href='/recipe'>
        <button className='bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition'>
          내 레시피 목록 보러가기
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
