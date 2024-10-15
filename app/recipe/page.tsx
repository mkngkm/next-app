'use client'; // Ensure this line is at the top of your file

import React, { useEffect, useState } from 'react';
import { getRecipesForUser, Recipe } from '../lib/localstorage'; // Ensure this import is correct
import { useSession } from 'next-auth/react'; // Import useSession
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import RecipeItem from '../component/(recipe)/RecipeItem'; // Import the new RecipeItem component
import Link from 'next/link';
import Loading from './loading'; // Import loading component

export default function RecipePage() {
  const { data: session, status } = useSession(); // 세션 가져오기
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Store all recipes
  const router = useRouter(); // Router for redirection

  useEffect(() => {
    if (status === 'loading') return; // 세션 상태가 로딩 중일 때는 아무것도 하지 않음

    if (!session || !session.user || !session.user.email) {
      // 세션이 없거나 사용자 정보 또는 이메일이 없으면 로그인 페이지로 리다이렉트
      router.push('/api/auth/signin'); // 로그인 페이지로 리다이렉트
      return;
    }

    const userEmail = session.user.email; // 세션에서 이메일 가져오기

    const fetchRecipes = () => {
      const allRecipes = getRecipesForUser(userEmail); // Fetch all recipes for the user
      setRecipes(allRecipes); // Set the recipes state
    };

    fetchRecipes();
  }, [session, status, router]); // session, status, router를 의존성 배열에 추가

  if (status === 'loading') {
    return <Loading />; // 로딩 중일 때 Loading 컴포넌트 표시
  }

  return (
    <div>
      <h2>레시피 목록</h2>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <RecipeItem key={recipe.current.id} recipe={recipe} /> // RecipeItem 컴포넌트 사용
          ))}
        </ul>
      ) : (
        <div>레시피가 없습니다.</div>
      )}
      {/* 레시피 추가 링크 */}
      <div>
        <Link href='/recipe/add' className='btn btn-primary'>
          레시피 추가
        </Link>
      </div>
    </div>
  );
}
