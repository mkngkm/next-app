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
    <div>
      <h2>버전 관리</h2>
      {recipe.versions && recipe.versions.length > 0 ? (
        recipe.versions.map((version: RecipeVersion, idx: number) => (
          <div key={idx}>
            <p>
              버전 {version.version}:{' '}
              {new Date(version.timestamp).toLocaleString()}
            </p>
            <button onClick={() => onRestore(version.version)}>
              이 버전으로 복원
            </button>
          </div>
        ))
      ) : (
        <p>이전에 저장된 버전이 없습니다.</p>
      )}
    </div>
  );
};

export default VersionControl;
