'use server';

import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// import { promises as fs } from 'fs';

const addRecipe = async (formData) => {
  await connectDB();

  const ingredients = JSON.parse(formData.getAll('ingredients'));
  const instructions = JSON.parse(formData.getAll('instructions'));
  // const maxId = recipes
  //   .map((recipe) => recipe._id)
  //   .reduce((a, b) => Math.max(a, b), -Infinity);
  // const idNum = maxId + 1;

  const recipeData = {
    owner: '6348acd2e1a47ca32e79f46f',
    // _id: idNum.toString(),
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

  // const filePath = 'recipes.json';

  // const jsonData = await fs.readFile(filePath, 'utf-8');
  // const data = JSON.parse(jsonData);

  // data.push(recipeData);

  // const updatedJsonData = JSON.stringify(data, null, 2);
  // await fs.writeFile(filePath, updatedJsonData);

  const newRecipe = new Recipe(recipeData);
  await newRecipe.save();

  revalidatePath('/', 'layout');

  // redirect('/recipes');

  redirect(`/recipes/${newRecipe._id}`);
};

export default addRecipe;
