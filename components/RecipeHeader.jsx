'use client';

import Link from 'next/link';
import { X, Pencil } from 'lucide-react';
import { toast } from 'react-toastify';
import deleteRecipe from '@/app/actions/deleteRecipe';
import { useRouter } from 'next/navigation';

const RecipeHeader = ({ recipe }) => {
  const router = useRouter();

  const handleDeleteRecipe = async (recipeId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this recipe?'
    );

    if (!confirmed) {
      return;
    }
    await deleteRecipe(recipeId);

    router.refresh();

    toast.success('Recipe deleted successfully');
  };

  return (
    <>
      <div className="container m-auto py-4 text-center">
        <Link
          href="/recipes"
          className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
        >
          Back
        </Link>
      </div>
      <div className="container m-auto pt-6 text-center">
        <Link href={`/recipes/${recipe._id}/edit`} className="px-1">
          <button className="btn btn-ghost btn-circle shadow-md">
            <Pencil />
          </button>
        </Link>
        <Link href={`/recipes`} className="px-1">
          <button
            className="btn btn-ghost btn-circle text-red-500 shadow-md"
            type="button"
            onClick={() => handleDeleteRecipe(recipe._id)}
          >
            <X />
          </button>
        </Link>
      </div>
    </>
  );
};

export default RecipeHeader;
