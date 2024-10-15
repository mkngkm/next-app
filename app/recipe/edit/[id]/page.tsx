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
    instructions: string[],
    tags: string[] // Include tags in the save function
  ) => {
    if (recipe && session?.user?.email) {
      const updatedCurrent: RecipeDetails = {
        id: recipe.current.id,
        title,
        ingredients,
        instructions,
        tags, // Include tags when updating
        version: recipe.current.version + 1,
        timestamp: new Date().toISOString(),
      };

      updateRecipe({ ...recipe, current: updatedCurrent }, session.user.email);
      router.push('/recipe');
    }
  };

  const handleRestore = (version: number) => {
    if (recipe && session?.user?.email) {
      restorePreviousVersion(id, version, session.user.email);

      // Reload the recipe after restoration
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
    <div className='max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10'>
      <h1 className='text-2xl font-bold text-center mb-4'>레시피 수정</h1>
      <RecipeForm
        initialTitle={recipe.current.title}
        initialIngredients={recipe.current.ingredients} // Pass ingredients array
        initialInstructions={recipe.current.instructions} // Pass instructions array
        initialTags={recipe.current.tags} // Pass tags array for editing
        onSubmit={handleSave}
        showTags={true} // Show the tag input field
      />
    </div>
  );
}
