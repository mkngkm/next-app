'use client'; // 클라이언트 컴포넌트로 설정

import React from 'react';
import { useSession } from 'next-auth/react'; // 세션 정보를 가져오는 훅
import RecipeDetail from '../../component/(recipe)/RecipeDetail'; // 상대 경로로 수정
import { deleteRecipe } from '../../lib/localstorage'; // localstorage.ts에서 deleteRecipe 함수 임포트
import { useRouter } from 'next/navigation'; // useRouter 임포트

export default function RecipePage({ params }: { params: { id: string } }) {
  const { id } = params; // URL 파라미터에서 id 추출
  const { data: session, status } = useSession(); // 세션 정보와 상태 가져오기
  const router = useRouter(); // useRouter 훅 사용

  // 세션 상태가 로딩 중인 경우
  if (status === 'loading') return <div>세션 정보를 불러오는 중입니다...</div>;

  // 사용자의 이메일이 없거나 세션이 없다면
  if (!session || !session.user?.email) {
    return <div>로그인이 필요합니다.</div>;
  }

  const userEmail = session.user.email; // 사용자 이메일 가져오기

  // 레시피 삭제 핸들러
  const handleDeleteRecipe = () => {
    deleteRecipe(id, userEmail); // 레시피 삭제
    router.push('/recipe'); // 목록 페이지로 이동
  };

  return (
    <div>
      <RecipeDetail recipeId={id} userEmail={userEmail} />{' '}
      {/* 레시피 ID와 사용자 이메일을 props로 전달 */}
      {/* 버튼 추가 */}
      <div>
        <button onClick={() => router.push(`/recipe/edit/${id}`)}>수정</button>
        <button onClick={handleDeleteRecipe}>삭제</button>
        <button onClick={() => router.push('/recipe')}>목록으로</button>
      </div>
    </div>
  );
}
