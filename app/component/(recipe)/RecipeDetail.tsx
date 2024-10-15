import React, { useEffect, useState } from 'react';
import {
  getRecipeById,
  Recipe,
  restorePreviousVersion,
} from '../../lib/localstorage';
import CookingTimer from './CookingTimer';
import VersionControl from './VersionControl';

interface RecipeDetailProps {
  recipeId: string;
  userEmail: string;
}

export default function RecipeDetail({
  recipeId,
  userEmail,
}: RecipeDetailProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [timers, setTimers] = useState<number[]>([]); // 각 단계의 타이머 지속시간
  const [timerDurations, setTimerDurations] = useState<number[]>([]); // 각 단계의 타이머 지속시간 저장

  useEffect(() => {
    const fetchRecipe = () => {
      const foundRecipe = getRecipeById(recipeId, userEmail);
      setRecipe(foundRecipe || null);

      // 조리 방법의 개수에 맞춰 타이머 배열 초기화
      if (foundRecipe) {
        const initialDurations = Array(
          foundRecipe.current.instructions.length
        ).fill(0);
        setTimerDurations(initialDurations);
      }
    };

    fetchRecipe();
  }, [recipeId, userEmail]);

  // 타이머 종료 핸들러
  const handleTimerFinish = (index: number) => {
    const newTimers = [...timers];
    newTimers[index] = 0; // 타이머 종료
    setTimers(newTimers);
  };

  // 타이머 시작 핸들러
  const handleStartTimer = (index: number) => {
    if (timerDurations[index] > 0) {
      const newTimers = [...timers];
      newTimers[index] = timerDurations[index]; // 타이머 시작
      setTimers(newTimers);
    }
  };

  // 버전 복원 핸들러
  const handleRestoreVersion = (versionNumber: number) => {
    if (recipe) {
      // 특정 버전으로 복원
      restorePreviousVersion(recipe.id, versionNumber, recipe.user);

      // 복원된 최신 레시피를 다시 가져와 상태 업데이트
      const updatedRecipe = getRecipeById(recipe.id, userEmail);
      setRecipe(updatedRecipe || null);
    }
  };

  return (
    <div>
      {recipe ? (
        <>
          <h2>{recipe.current.title}</h2>
          <div>
            <h3>재료:</h3>
            <ul>
              {recipe.current.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>조리 방법:</h3>
            {recipe.current.instructions.map((instruction, index) => (
              <div key={index}>
                <p>{instruction}</p>
                <input
                  type='number'
                  placeholder='초 단위의 시간 입력'
                  onChange={(e) => {
                    const newDurations = [...timerDurations];
                    newDurations[index] = Number(e.target.value);
                    setTimerDurations(newDurations);
                  }}
                />
                <button onClick={() => handleStartTimer(index)}>
                  타이머 시작
                </button>
                {timers[index] > 0 && (
                  <CookingTimer
                    duration={timers[index]}
                    onFinish={() => handleTimerFinish(index)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* 태그 표시 */}
          <div>
            <h3>태그:</h3>
            <div>
              {recipe.current.tags && recipe.current.tags.length > 0 ? (
                recipe.current.tags.map((tag, index) => (
                  <span key={index} style={{ marginRight: '8px' }}>
                    #{tag}
                  </span>
                ))
              ) : (
                <p>등록된 태그가 없습니다.</p>
              )}
            </div>
          </div>

          {/* VersionControl 컴포넌트 추가 */}
          <VersionControl
            recipe={recipe}
            onRestore={(versionNumber) => handleRestoreVersion(versionNumber)}
          />
        </>
      ) : (
        <div>레시피를 찾을 수 없습니다.</div>
      )}
    </div>
  );
}
