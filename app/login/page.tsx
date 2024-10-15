'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Import images from the public folder
import githubLogo from '../../public/github-logo.png';
import googleLogo from '../../public/google-logo.png';

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<{
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem(`user_${email}`);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      const userData = JSON.parse(storedUser);
      if (userData.email && userData.password) {
        handleLoginWithCredentials(userData.email, userData.password);
      }
    }
  }, [email]);

  useEffect(() => {
    if (session && session.user) {
      localStorage.setItem(
        `user_${session.user.email}`,
        JSON.stringify({
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        })
      );
      setUser(session.user);
    }
  }, [session]);

  const handleLoginWithCredentials = async (
    email: string,
    password: string
  ) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error('Login failed:', result.error);
    } else {
      localStorage.setItem(
        `user_${email}`,
        JSON.stringify({ email, password })
      );
      console.log('Login successful');
      router.push('/');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error('Login failed:', result.error);
    } else {
      localStorage.setItem(
        `user_${email}`,
        JSON.stringify({ email, password })
      );
      console.log('Login successful');
      router.push('/');
    }
  };

  if (!isMounted) {
    return null;
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
            className='w-full mb-2 p-2 border rounded-sm'
            required
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='비밀번호를 입력하세요'
            className='w-full mb-4 p-2 border rounded-sm'
            required
          />
          <button
            type='submit'
            className='bg-green-500 text-white p-2 w-full rounded-sm'
          >
            로그인
          </button>
        </form>
        <div className='mt-4'>
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className='border border-gray-300 bg-white text-gray-600 p-2 w-full mt-2 flex items-center justify-center rounded-sm'
          >
            <img
              src={googleLogo.src}
              alt='Google Logo'
              className='mr-2 h-5 w-5'
            />
            Google로 로그인
          </button>
          <button
            onClick={() => signIn('github', { callbackUrl: '/' })}
            className='border border-gray-300 bg-white text-gray-600 p-2 w-full mt-2 flex items-center justify-center rounded-sm'
          >
            <img
              src={githubLogo.src}
              alt='GitHub Logo'
              className='mr-2 h-5 w-5'
            />
            GitHub로 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
