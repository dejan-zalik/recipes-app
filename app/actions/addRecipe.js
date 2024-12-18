'use server';

import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/utils/getSessionUser';

const addRecipe = async (formData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const ingredients = JSON.parse(formData.getAll('ingredients'));
  const instructions = JSON.parse(formData.getAll('instructions'));

  const recipeData = {
    owner: userId,
    name: formData.get('name'),
    // slug: formData.get('name').toLowerCase().replaceAll(' ', '-'),
    description: formData.get('description'),
    ingredients,
    instructions,
  };

  const newRecipe = new Recipe(recipeData);
  await newRecipe.save();

  revalidatePath('/', 'layout');

  redirect(`/recipes/${newRecipe._id}`);
};

export default addRecipe;
