'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { promises as fs } from 'fs';

const editRecipe = async (recipeId, formData) => {
  const ingredients = JSON.parse(formData.getAll('ingredients'));
  const instructions = JSON.parse(formData.getAll('instructions'));
  const existingId = recipeId;

  const recipeData = {
    _id: existingId,
    name: formData.get('name'),
    // slug: formData.get('name').toLowerCase().replaceAll(' ', '-'),
    description: formData.get('description'),
    ingredients,
    instructions,
  };

  const filePath = 'recipes.json';

  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const removeOldRecipe = data.filter((recipe) => recipe._id !== recipeId);

  removeOldRecipe.push(recipeData);

  const updatedJsonData = JSON.stringify(removeOldRecipe, null, 2);
  await fs.writeFile(filePath, updatedJsonData);

  revalidatePath('/', 'layout');

  redirect('/recipes');

  // redirect(`/recipes/${recipeData._id}`);
};

export default editRecipe;
