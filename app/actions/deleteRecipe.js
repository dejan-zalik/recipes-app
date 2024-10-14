'use server';

import Recipe from '@/models/Recipe';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

const deleteRecipe = async (recipeId) => {
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
  await recipe.deleteOne();

  revalidatePath('/', 'layout');
};

export default deleteRecipe;
