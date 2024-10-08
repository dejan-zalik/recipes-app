'use client';

import addRecipe from '@/app/actions/addRecipe';
import AddIngredientsForm from './AddIngredientsForm';
import AddInstructionsForm from './AddInstructionsForm';

const RecipeAddForm = () => {
  return (
    <form
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
      action={addRecipe}
    >
      <h2 className="text-3xl text-left font-semibold mb-6">Add recipe</h2>

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
        />
      </div>

      <AddIngredientsForm />

      <AddInstructionsForm />

      <div>
        <button
          className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
          type="submit"
        >
          Add recipe
        </button>
      </div>
    </form>
  );
};

export default RecipeAddForm;
