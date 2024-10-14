'use server';
import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/utils/getSessionUser';

const editRecipe = async (recipeId, formData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  if (recipe.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  const ingredients = JSON.parse(formData.getAll('ingredients'));
  const instructions = JSON.parse(formData.getAll('instructions'));

  const recipeData = {
    // _id: existingId,
    owner: userId,
    name: formData.get('name'),
    // slug: formData.get('name').toLowerCase().replaceAll(' ', '-'),
    description: formData.get('description'),
    ingredients,
    instructions,
  };

  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, recipeData);

  revalidatePath('/', 'layout');

  redirect(`/recipes/${updatedRecipe._id}`);
};

export default editRecipe;
