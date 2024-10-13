'use server';

import Recipe from '@/models/Recipe';
import { revalidatePath } from 'next/cache';

// import { promises as fs } from 'fs';

const deleteRecipe = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);

  await recipe.deleteOne();

  // const filePath = 'recipes.json';

  // const jsonData = await fs.readFile(filePath, 'utf-8');
  // const data = JSON.parse(jsonData);

  // const updatedData = data.filter((recipe) => recipe._id !== recipeId);

  // const updatedJsonData = JSON.stringify(updatedData, null, 2);
  // await fs.writeFile(filePath, updatedJsonData);

  revalidatePath('/', 'layout');
};

export default deleteRecipe;
