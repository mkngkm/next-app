'use client';

import { useState, useEffect } from 'react';
import {
  getRecipeById,
  updateRecipe,
  restorePreviousVersion,
  Recipe,
  RecipeDetails,
} from '../../../lib/localstorage';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import RecipeForm from '../../../component/(recipe)/RecipeForm';

interface EditRecipeParams {
  params: {
    id: string;
  };
}

export default function EditRecipe({ params }: EditRecipeParams) {
  const { id } = params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [versions, setVersions] = useState<RecipeDetails[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      const fetchedRecipe = getRecipeById(id, session.user.email);
      if (fetchedRecipe) {
        setRecipe(fetchedRecipe);
        setVersions(fetchedRecipe.versions || []);
      }
    }
  }, [id, session]);

  const handleSave = (
    title: string,
    ingredients: string[],
    instructions: string[]
  ) => {
    if (recipe && session?.user?.email) {
      const updatedCurrent: RecipeDetails = {
        id: recipe.current.id,
        title,
        ingredients, // 배열 형태로 저장
        instructions, // 배열 형태로 저장
        version: recipe.current.version + 1,
        timestamp: new Date().toISOString(),
      };

      // 레시피 업데이트
      updateRecipe({ ...recipe, current: updatedCurrent }, session.user.email);
      router.push('/recipe');
    }
  };

  const handleRestore = (version: number) => {
    if (recipe && session?.user?.email) {
      restorePreviousVersion(id, version, session.user.email);

      // 복원 후 레시피 다시 로드
      const restoredRecipe = getRecipeById(id, session.user.email);
      if (restoredRecipe) {
        setRecipe(restoredRecipe);
        setVersions(restoredRecipe.versions || []);
      }

      router.push(`/recipe/${id}`);
    }
  };

  if (!recipe) return <div>레시피를 불러오는 중...</div>;

  return (
    <div>
      <h1>레시피 수정</h1>
      <RecipeForm
        initialTitle={recipe.current.title}
        initialIngredients={recipe.current.ingredients} // 배열 그대로 전달
        initialInstructions={recipe.current.instructions} // 배열 그대로 전달
        onSubmit={handleSave}
        showTags={false} // 태그 입력 필드 숨김
      />

      <h2>버전 관리</h2>
      {versions.map((version, idx) => (
        <div key={idx}>
          <p>
            버전 {version.version}:{' '}
            {new Date(version.timestamp).toLocaleString()}
          </p>
          <button onClick={() => handleRestore(version.version)}>
            이 버전으로 복원
          </button>
        </div>
      ))}
    </div>
  );
}
