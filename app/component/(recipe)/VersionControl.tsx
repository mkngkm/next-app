import React from 'react';
import { Recipe, RecipeVersion } from '../../lib/localstorage';

interface VersionControlProps {
  recipe: Recipe;
  onRestore: (versionNumber: number) => void;
}

const VersionControl: React.FC<VersionControlProps> = ({
  recipe,
  onRestore,
}) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-4 mt-4'>
      <h2 className='text-xl font-bold mb-4'>버전 관리</h2>
      {recipe.versions && recipe.versions.length > 0 ? (
        recipe.versions.map((version: RecipeVersion, idx: number) => (
          <div
            key={idx}
            className='flex justify-between items-center border-b py-2'
          >
            <p className='font-bold'>
              버전 {version.version}:{' '}
              {new Date(version.timestamp).toLocaleString()}
            </p>
            <button
              onClick={() => onRestore(version.version)}
              className='bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition'
            >
              이 버전으로 복원
            </button>
          </div>
        ))
      ) : (
        <p className='font-bold text-gray-500'>
          이전에 저장된 버전이 없습니다.
        </p>
      )}
    </div>
  );
};

export default VersionControl;
