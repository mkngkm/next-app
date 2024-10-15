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
    tags: string[] // tags are now passed to handleSubmit
  ) => {
    if (!session?.user?.email) {
      alert('사용자 이메일이 필요합니다.');
      return;
    }

    const newid = uuidv4();

    const newRecipe: Recipe = {
      id: newid,
      user: session.user.email,
      current: {
        id: newid,
        title,
        ingredients,
        instructions,
        tags, // Include tags when saving
        version: 0,
        timestamp: new Date().toISOString(),
      },
      versions: [],
    };

    saveRecipe(newRecipe);
    router.push('/recipe');
  };

  return (
    <div className='max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10 '>
      <h1 className='text-2xl font-bold text-center mb-4'>새 레시피 추가</h1>
      <RecipeForm
        initialTitle=''
        initialIngredients={[]}
        initialInstructions={[]}
        initialTags={[]} // Provide an empty array for tags initially
        onSubmit={handleSubmit}
      />
    </div>
  );
}
