import Carousel from '@/components/Carousel';
import RecipeDetails from '@/components/RecipeDetails';
import RecipeHeader from '@/components/RecipeHeader';
import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import convertToSerializableObject from '@/utils/convertToSerializableObject';
import { X } from 'lucide-react';

const RecipePage = async ({ params }) => {
  await connectDB();
  const recipesDoc = await Recipe.find({}).lean();
  const recipes = recipesDoc.map(convertToSerializableObject);
  const recipe = recipes.filter((recipe) => recipe._id === params.id)[0];

  return (
    <section className="px-4 py-6">
      <RecipeHeader recipe={recipe} />
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 w-full gap-6">
          <RecipeDetails recipe={recipe} />
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-4xl">
          <div className="modal-action mt-0 justify-center">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-ghost btn-circle text-red-500 shadow-md">
                <X />
              </button>
            </form>
          </div>
          <Carousel recipe={recipe} />
        </div>
      </dialog>
    </section>
  );
};

export default RecipePage;
