'use server';
import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// import { promises as fs } from 'fs';

const editRecipe = async (recipeId, formData) => {
  await connectDB();

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  const ingredients = JSON.parse(formData.getAll('ingredients'));
  const instructions = JSON.parse(formData.getAll('instructions'));
  // const existingId = recipeId;

  const recipeData = {
    // _id: existingId,
    owner: '6348acd2e1a47ca32e79f46f',
    name: formData.get('name'),
    // slug: formData.get('name').toLowerCase().replaceAll(' ', '-'),
    description: formData.get('description'),
    ingredients,
    instructions,
  };

  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, recipeData);

  // const filePath = 'recipes.json';

  // const jsonData = await fs.readFile(filePath, 'utf-8');
  // const data = JSON.parse(jsonData);

  // const removeOldRecipe = data.filter((recipe) => recipe._id !== recipeId);

  // removeOldRecipe.push(recipeData);

  // const updatedJsonData = JSON.stringify(removeOldRecipe, null, 2);
  // await fs.writeFile(filePath, updatedJsonData);

  revalidatePath('/', 'layout');

  // redirect('/recipes');

  redirect(`/recipes/${updatedRecipe._id}`);
};

export default editRecipe;
