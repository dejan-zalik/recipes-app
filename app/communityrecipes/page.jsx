import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import { getSessionUser } from '@/utils/getSessionUser';
import convertToSerializableObject from '@/utils/convertToSerializableObject';
import SearchWrapper from '@/components/SearchWrapper';

const CommunityRecipesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const recipesDoc = await Recipe.find({}).lean();
  const recipesAll = recipesDoc.map(convertToSerializableObject);
  const recipes = recipesAll.filter((recipe) => recipe.owner !== userId);

  return (
    <section className="px-4 py-6">
      <SearchWrapper recipes={recipes} />
    </section>
  );
};

export default CommunityRecipesPage;
