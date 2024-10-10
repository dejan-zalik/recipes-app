'use client';

import editRecipe from '@/app/actions/editRecipe';
import EditIngredientsForm from './EditIngredientsForm';
import EditInstructionsForm from './EditInstructionsForm';

const RecipeEditForm = ({ recipe }) => {
  const recipeId = recipe._id;
  const editRecipeWithId = editRecipe.bind(null, recipeId);
  return (
    <form
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
      action={editRecipeWithId}
    >
      <h2 className="text-3xl text-left font-semibold mb-6">Edit recipe</h2>

      <div className="mb-4">
        <label className="block text-left text-gray-700 font-bold mb-2">
          Recipe name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          required
          defaultValue={recipe.name}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-left text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3 mb-2"
          required
          defaultValue={recipe.description}
        />
      </div>

      <EditIngredientsForm recipe={recipe} />

      <EditInstructionsForm recipe={recipe} />

      <div>
        <button
          className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
          type="submit"
        >
          Update recipe
        </button>
      </div>
    </form>
  );
};

export default RecipeEditForm;
