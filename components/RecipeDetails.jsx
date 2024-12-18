const RecipeDetails = ({ recipe }) => {
  return (
    <>
      <div className="bg-white brightness-95 p-6 rounded-lg shadow-md text-left">
        <h1 className="text-2xl font-bold mb-4">{recipe && recipe.name}</h1>
        <div className="text-gray-500 mb-4">{recipe && recipe.description}</div>
      </div>

      <div className="bg-white brightness-95 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Ingredients</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {recipe &&
            recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-white brightness-95 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Instructions</h3>

        <ul className="grid grid-cols-1 list-none">
          {recipe &&
            recipe.instructions.map((instruction, index) => (
              <li key={index}>
                {'Step ' +
                  (1 + index).toString() +
                  ': ' +
                  instruction.instruction}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default RecipeDetails;
