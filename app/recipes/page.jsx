import RecipeCard from '@/components/RecipeCard';
import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import Link from 'next/link';
import { getSessionUser } from '@/utils/getSessionUser';
import convertToSerializableObject from '@/utils/convertToSerializableObject';

const RecipesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const recipesDoc = await Recipe.find({ owner: userId }).lean();
  const recipes = recipesDoc.map(convertToSerializableObject);

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
