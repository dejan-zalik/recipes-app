'use client';

import Link from 'next/link';
import { CopyPlus } from 'lucide-react';
import { toast } from 'react-toastify';
import copyRecipe from '@/app/actions/copyRecipe';

const CommunityRecipeHeader = ({ recipe }) => {
  const handleCopyRecipe = async () => {
    const confirmed = window.confirm('Add this recipe to "My recipes?"');

    if (!confirmed) {
      return;
    }
    await copyRecipe(recipe);

    toast.success('Recipe copied successfully');
  };

  return (
    <>
      <div className="container m-auto py-4 text-center">
        <Link
          href="/communityrecipes"
          className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
        >
          Back
        </Link>
      </div>
      <div className="container m-auto pt-6 text-center">
        <button
          onClick={() => handleCopyRecipe()}
          title="copy to my recipes"
          className="btn btn-ghost btn-circle shadow-md"
        >
          <CopyPlus />
        </button>
      </div>
    </>
  );
};

export default CommunityRecipeHeader;
