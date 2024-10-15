// RecipeItem.tsx

import React from 'react';
import Link from 'next/link';
import { Recipe } from '../../lib/localstorage'; // Ensure this import is correct

interface RecipeItemProps {
  recipe: Recipe;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  return (
    <li className='bg-white shadow-md rounded-lg p-4 mb-4'>
      <h3 className='text-2xl font-semibold'>{recipe.current.title}</h3>
      {/* 태그 표시 */}
      {recipe.current.tags && recipe.current.tags.length > 0 && (
        <div className='mt-2'>
          {recipe.current.tags.map((tag, index) => (
            <span
              key={index}
              className='bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2'
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className='mt-4 flex justify-end'>
        <Link
          href={`/recipe/${recipe.current.id}`}
          className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition'
        >
          자세히 보기
        </Link>
      </div>
    </li>
  );
};

export default RecipeItem;
