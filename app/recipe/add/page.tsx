'use client';

import { useState } from 'react';
import { saveRecipe } from '../../lib/localstorage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from '../../lib/localstorage';
import RecipeForm from '../../component/(recipe)/RecipeForm'; // RecipeForm 컴포넌트 임포트

export default function AddRecipe() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]); // 태그 상태 추가

  const handleSubmit = (
    title: string,
    ingredients: string[],
    instructions: string[],
    tags: string[] // 태그를 추가 파라미터로 받아옴
  ) => {
    // 이메일이 존재하는지 확인
    if (!session?.user?.email) {
      alert('사용자 이메일이 필요합니다.');
      return;
    }

    const newid = uuidv4();

    // 레시피 데이터 생성
    const newRecipe: Recipe = {
      id: newid,
      user: session.user.email,
      current: {
        id: newid,
        title,
        ingredients, // 배열 형태로 저장
        instructions, // 배열 형태로 저장
        tags, // 태그 배열 추가
        version: 1, // 첫 번째 버전
        timestamp: new Date().toISOString(),
      },
      versions: [], // 처음에는 버전 없음
    };

    // 로컬 스토리지에 저장
    saveRecipe(newRecipe);

    // 레시피 목록 페이지로 이동
    router.push('/recipe');
  };

  return (
    <div>
      <h1>새 레시피 추가</h1>
      <RecipeForm
        initialTitle=''
        initialIngredients={[]}
        initialInstructions={[]}
        onSubmit={handleSubmit}
        showTags={true} // 태그 입력 필드 표시
      />
    </div>
  );
}
