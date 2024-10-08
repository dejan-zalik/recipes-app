import recipes from '@/recipes.json';
import RecipeEditForm from '@/components/RecipeEditForm';
import Link from 'next/link';

const RecipeEditPage = ({ params }) => {
  const recipe = recipes.filter((recipe) => recipe._id === params.id)[0];
  return (
    <section className="px-4 py-6">
      <div className="container m-auto py-4 text-center">
        <Link
          href={`/recipes/${recipe._id}`}
          className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
        >
          Back
        </Link>
      </div>
      <div className="container m-auto py-4 px-6 text-center">
        <RecipeEditForm recipe={recipe} />
      </div>
    </section>
  );
};

export default RecipeEditPage;
