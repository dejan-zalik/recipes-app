'use client';

import RecipeCard from '@/components/RecipeCard';
import recipes from '@/recipes.json';
import Link from 'next/link';
import { useEffect } from 'react';

const RecipesPage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <section className="px-4 py-6">
      <div className="container m-auto py-4 px-6 text-center">
        <Link
          href="/recipes/add"
          className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
        >
          Add recipe
        </Link>
      </div>
      <div className="container m-auto py-6 px-6">
        {recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipesPage;
