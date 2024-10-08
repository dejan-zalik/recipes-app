import RecipeAddForm from '@/components/RecipeAddForm';
import Link from 'next/link';

const AddRecipePage = () => {
  return (
    <section className="px-4 py-6">
      <div className="container m-auto py-4 text-center">
        <Link
          href="/recipes"
          className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
        >
          Back
        </Link>
      </div>
      <div className="container m-auto py-4 px-6 text-center">
        <RecipeAddForm />
      </div>
    </section>
  );
};

export default AddRecipePage;
