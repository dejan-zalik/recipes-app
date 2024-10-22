'use server';

import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/utils/getSessionUser';

const copyRecipe = async (recipe) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const recipeData = {
    owner: userId,
    name: recipe.name,
    // slug: formData.get('name').toLowerCase().replaceAll(' ', '-'),
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    is_copied: true,
  };

  const newRecipe = new Recipe(recipeData);

  await newRecipe.save();

  revalidatePath('/', 'layout');

  redirect(`/recipes/${newRecipe._id}`);
};

export default copyRecipe;
