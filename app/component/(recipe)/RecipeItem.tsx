// RecipeItem.tsx

import React from 'react';
import Link from 'next/link';
import { Recipe } from '../../lib/localstorage'; // Ensure this import is correct

interface RecipeItemProps {
  recipe: Recipe;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  return (
    <li key={recipe.current.id}>
      <h3>{recipe.current.title}</h3>
      {/* 태그 표시 */}
      {recipe.current.tags && recipe.current.tags.length > 0 && (
        <div style={{ margin: '8px 0' }}>
          {recipe.current.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                backgroundColor: '#e0e0e0',
                padding: '4px 8px',
                borderRadius: '4px',
                marginRight: '4px',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <Link href={`/recipe/${recipe.current.id}`}>자세히 보기</Link>
      <Link
        href={`/recipe/edit/${recipe.current.id}`}
        className='btn btn-primary'
      >
        레시피 수정
      </Link>
    </li>
  );
};

export default RecipeItem;
