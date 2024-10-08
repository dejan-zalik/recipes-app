import Link from 'next/link';

const RecipeCard = ({ recipe }) => {
  return (
    <Link href={`/recipes/${recipe._id}`}>
      <div className="rounded-xl shadow-md relative">
        <div className="p-4">
          <div className="text-left md:text-center lg:text-left mb-6">
            <h3 className="text-xl font-bold">{recipe.name}</h3>
          </div>
          <div className="border border-primary-content mb-5"></div>
          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
              <span className="text-orange-700">{recipe.description}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
