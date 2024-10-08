'use server';

import recipes from '@/recipes.json';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { promises as fs } from 'fs';

const addRecipe = async (formData) => {
  const ingredients = JSON.parse(formData.getAll('ingredients'));
  const instructions = formData.getAll('instructions');
  const maxId = recipes
    .map((recipe) => recipe._id)
    .reduce((a, b) => Math.max(a, b), -Infinity);
  const idNum = maxId + 1;

  const recipeData = {
    _id: idNum.toString(),
    name: formData.get('name'),
    // slug: formData.get('name').toLowerCase().replaceAll(' ', '-'),
    description: formData.get('description'),
    ingredients,
    instructions,
  };

  // console.log(ingredients);

  // const recipeExists = recipes.some(
  //   (recipes) => recipes.name.toLowerCase() === recipeData.name.toLowerCase()
  // );

  // if (recipeExists) {
  //   throw new Error('Recipe exists already');
  // }

  // console.log(recipeData);

  const filePath = 'recipes.json';

  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  data.push(recipeData);

  const updatedJsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, updatedJsonData);

  revalidatePath('/', 'layout');

  redirect('/recipes');

  // redirect(`/recipes/${recipeData._id}`);
};

export default addRecipe;
