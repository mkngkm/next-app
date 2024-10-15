// app/logout/page.tsx

import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const LogoutPage = async () => {
  await signOut({ redirect: false }); // 리다이렉트 방지
  console.log('로그아웃 성공'); // 로그아웃 성공 시 메시지
  redirect('/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
};

export default LogoutPage;
