'use client';
import recipes from '@/recipes.json';
import RecipeDetails from '@/components/RecipeDetails';
import Link from 'next/link';
import { X, Pencil } from 'lucide-react';
import deleteRecipe from '@/app/actions/deleteRecipe';
import { toast } from 'react-toastify';
import { useState } from 'react';

const RecipePage = ({ params }) => {
  const recipe = recipes.filter((recipe) => recipe._id === params.id)[0];

  const handleDeleteRecipe = async (recipeId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this recipe?'
    );

    if (!confirmed) {
      setConfirm(false);
      return;
    }
    await deleteRecipe(recipeId);

    toast.success('Recipe deleted successfully');
  };

  return (
    <section className="px-4 py-6">
      <div className="container m-auto py-4 text-center">
        <Link
          href="/recipes"
          className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
        >
          Back
        </Link>
      </div>
      <div className="container m-auto pt-6 text-center">
        <Link href={`/recipes/${params.id}/edit`} className="px-1">
          <button className="btn btn-ghost btn-circle shadow-md">
            <Pencil />
          </button>
        </Link>
        <Link href={`/recipes`} className="px-1">
          <button
            className="btn btn-ghost btn-circle text-red-500 shadow-md"
            onClick={() => handleDeleteRecipe(params.id)}
          >
            <X />
          </button>
        </Link>
      </div>
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 w-full gap-6">
          <RecipeDetails recipe={recipe} />
        </div>
      </div>
    </section>
  );
};

export default RecipePage;
