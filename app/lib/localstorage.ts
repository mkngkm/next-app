// UUID 생성 라이브러리 임포트
import { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Recipe 인터페이스
export interface Recipe {
  id: string; // recipe ID
  current: RecipeDetails; // 현재 레시피 정보
  user: string; // user ID
  versions: RecipeVersion[]; // 이전 버전 목록
}

// RecipeDetails 인터페이스
export interface RecipeDetails {
  id: string;
  title: string;
  ingredients: string[]; // 배열로 변경
  instructions: string[]; // 배열로 변경
  version: number;
  timestamp: string;
  tags?: string[]; // 선택적 태그 속성 추가
}
// RecipeVersion 인터페이스 (RecipeDetails와 동일)
export interface RecipeVersion extends RecipeDetails {}

export const getRecipesForUser = (email: string): Recipe[] => {
  const data = localStorage.getItem(`recipes_${email}`);

  console.log('Data from localStorage:', data); // 데이터 출력

  if (!data) {
    console.log('No data found for this email.'); // 로그 추가
    return []; // 데이터가 없으면 빈 배열 반환
  }

  try {
    const recipes: Recipe[] = JSON.parse(data);
    console.log('Parsed recipes:', recipes); // 파싱된 레시피 출력
    return recipes;
  } catch (error) {
    console.error('Error parsing recipes:', error); // 파싱 오류 출력
    return [];
  }
};

// 레시피 저장하기
export const saveRecipe = (recipe: Recipe) => {
  const email = recipe.user;

  // 기존 레시피 가져오기
  const recipes = getRecipesForUser(email);

  // 레시피 추가
  recipes.push(recipe);

  // 사용자별 레시피 저장
  localStorage.setItem(`recipes_${email}`, JSON.stringify(recipes));
};

// 주어진 ID와 이메일로 레시피를 찾습니다.
export function getRecipeById(id: string, email: string): Recipe | undefined {
  const storedRecipes = localStorage.getItem(`recipes_${email}`);
  if (storedRecipes) {
    const recipes: Recipe[] = JSON.parse(storedRecipes);
    return recipes.find((recipe) => recipe.id === id);
  }
  return undefined;
}

// 레시피를 업데이트하고 이전 버전을 저장합니다.
export const updateRecipe = (updatedRecipe: Recipe, email: string) => {
  const userRecipesKey = `recipes_${updatedRecipe.user}`;
  const storedRecipes = localStorage.getItem(userRecipesKey);

  if (!storedRecipes) return;

  const recipes = JSON.parse(storedRecipes) as Recipe[];

  // 기존 레시피 찾기
  const existingRecipeIndex = recipes.findIndex(
    (recipe) =>
      recipe.id === updatedRecipe.id && recipe.user === updatedRecipe.user
  );

  if (existingRecipeIndex === -1) return;

  const existingRecipe = recipes[existingRecipeIndex];

  // 새 버전 정보 생성 (기존 레시피의 current 상태를 새로운 버전으로 저장)
  const newVersion: RecipeVersion = {
    version: existingRecipe.current.version + 1, // 기존 현재 버전 번호 사용 //여기 어캄?
    title: existingRecipe.current.title, // 기존 레시피 정보 복사
    ingredients: existingRecipe.current.ingredients,
    instructions: existingRecipe.current.instructions,
    timestamp: existingRecipe.current.timestamp, // 기존 타임스탬프
    id: existingRecipe.id,
  };

  // 이전 버전을 `versions` 배열에 추가
  const updatedVersions = existingRecipe.versions || [];
  updatedVersions.push(newVersion);

  // 새롭게 업데이트된 레시피 정보로 교체
  const updatedRecipeWithVersions: Recipe = {
    ...updatedRecipe, // 업데이트된 레시피 정보로 덮어쓰기
    current: updatedRecipe.current, // 업데이트된 현재 레시피
    versions: updatedVersions, // 업데이트된 버전 목록
  };

  // 기존 레시피 리스트에서 해당 레시피를 업데이트된 레시피로 교체
  recipes[existingRecipeIndex] = updatedRecipeWithVersions;

  // 수정된 레시피 리스트를 다시 로컬스토리지에 저장
  localStorage.setItem(userRecipesKey, JSON.stringify(recipes));
};

// 주어진 레시피의 특정 버전으로 복원합니다.
export const restorePreviousVersion = (
  recipeId: string,
  version: number,
  userId: string
) => {
  const userRecipesKey = `recipes_${userId}`;
  const storedRecipes = localStorage.getItem(userRecipesKey);

  if (!storedRecipes) return;

  const recipes = JSON.parse(storedRecipes) as Recipe[];
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe || !recipe.versions) return;

  // 특정 버전 찾기
  const previousVersion = recipe.versions.find((v) => v.version === version);
  if (!previousVersion) return;

  // 해당 버전으로 복원 (복사하여 `current`로 설정)
  recipe.current = { ...previousVersion };
  console.log(recipe.current);

  // 복원된 레시피를 다시 로컬스토리지에 저장
  localStorage.setItem(userRecipesKey, JSON.stringify(recipes));
};

// 레시피 삭제하기
export const deleteRecipe = (recipeId: string, email: string) => {
  const userRecipesKey = `recipes_${email}`;
  const storedRecipes = localStorage.getItem(userRecipesKey);

  if (!storedRecipes) return; // 저장된 레시피가 없으면 종료

  const recipes: Recipe[] = JSON.parse(storedRecipes);

  // 레시피를 찾고 삭제
  const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);

  // 업데이트된 레시피 리스트를 다시 로컬스토리지에 저장
  localStorage.setItem(userRecipesKey, JSON.stringify(updatedRecipes));
};
