'use client';
import Link from 'next/link';
import Navigation from './navigation'; // Navigation 컴포넌트 임포트
import { SessionProvider, useSession } from 'next-auth/react';

const HomePageContent = () => {
  const { data: session } = useSession(); // 세션 정보 가져오기

  return (
    <div>
      <Navigation /> {/* 네비게이션 컴포넌트 추가 */}
      {session ? (
        <h1>레시피를 만들어보아요🧑‍🍳</h1>
      ) : (
        <h1>로그인 후 레시피를 만들어보아요🧑‍🍳</h1>
      )}
      {session && <Link href='/recipe'>내 레시피 목록 보러가기</Link>}
    </div>
  );
};

const HomePage = () => {
  return (
    <SessionProvider>
      <HomePageContent /> {/* HomePageContent 컴포넌트 추가 */}
    </SessionProvider>
  );
};

export default HomePage;
