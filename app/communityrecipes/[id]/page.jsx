import RecipeDetails from '@/components/RecipeDetails';
import CommunityRecipeHeader from '@/components/CommunityRecipeHeader';
import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import convertToSerializableObject from '@/utils/convertToSerializableObject';

const CommunityRecipePage = async ({ params }) => {
  await connectDB();
  const recipesDoc = await Recipe.find({}).lean();
  const recipes = recipesDoc.map(convertToSerializableObject);
  const recipe = recipes.filter((recipe) => recipe._id === params.id)[0];

  return (
    <section className="px-4 py-6">
      <CommunityRecipeHeader recipe={recipe} />
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 w-full gap-6">
          <RecipeDetails recipe={recipe} />
        </div>
      </div>
    </section>
  );
};

export default CommunityRecipePage;
