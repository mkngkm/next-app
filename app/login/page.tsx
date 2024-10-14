// app/login/page.tsx
'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const { data: session } = useSession(); // 세션 정보 가져오기
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(false); // 클라이언트에서만 렌더링을 위한 상태

  useEffect(() => {
    setIsMounted(true); // 컴포넌트가 마운트되면 상태 업데이트
  }, []);

  useEffect(() => {
    if (session) {
      // 세션이 있을 경우 로컬 스토리지에 저장
      localStorage.setItem('user', JSON.stringify(session.user));
    }
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // 리다이렉트 방지
    });

    if (result?.error) {
      console.error('로그인 실패:', result.error);
    } else {
      // 로그인 성공 시 처리
      console.log('로그인 성공');
    }
  };

  // 클라이언트에서만 렌더링
  if (!isMounted) {
    return null; // 로딩 중일 때 아무것도 렌더링하지 않음
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='p-6 rounded-lg shadow-lg bg-white max-w-sm'>
        <h2 className='text-2xl mb-4 text-center'>로그인</h2>
        <form onSubmit={handleLogin}>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='your-email@example.com'
            className='w-full mb-2 p-2 border'
            required
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='비밀번호를 입력하세요'
            className='w-full mb-4 p-2 border'
            required
          />
          <button type='submit' className='bg-blue-500 text-white p-2 w-full'>
            로그인
          </button>
        </form>
        <div className='mt-4'>
          <button
            onClick={() => signIn('google')}
            className='bg-red-500 text-white p-2 w-full mt-2'
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn('github')}
            className='bg-black text-white p-2 w-full mt-2'
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
