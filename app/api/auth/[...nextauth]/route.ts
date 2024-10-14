// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from 'next-auth'; // NextAuthOptions 추가 import
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { User } from 'next-auth'; // User 타입 import

// 사용자 정보를 반환하기 위한 인터페이스 정의
interface AuthUser extends User {
  id: string; // User의 id는 string 타입이어야 함
}

// NextAuth 옵션 정의
const authOptions: NextAuthOptions = {
  // NextAuthOptions 타입 지정
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ) {
        // credentials가 undefined가 아닌 경우에만 처리
        if (!credentials) {
          return null; // 인증 실패
        }

        // 사용자 인증 로직 (여기서는 임시로 하드코딩된 사용자 반환)
        const user: AuthUser = {
          id: '1',
          name: 'User',
          email: credentials.email,
        };
        return user || null; // 사용자 반환 또는 null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login', // 로그인 페이지 경로
  },
  session: {
    strategy: 'jwt', // JWT 세션 전략 사용
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
