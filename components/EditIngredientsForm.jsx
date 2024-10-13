'use client';

import { useState, useEffect } from 'react';
import { X, Pencil } from 'lucide-react';

const EditIngredientsForm = ({ recipe }) => {
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const fillIngredients = () => {
    let ingredients;
    if (localStorage.getItem('ingredients') === null) {
      ingredients = recipe.ingredients;
    } else {
      ingredients = JSON.parse(localStorage.getItem('ingredients'));
    }

    if (quantity !== '' && unit !== '' && ingredient !== '') {
      ingredients.push({
        quantity: quantity.trim(),
        unit: unit.trim(),
        ingredient: ingredient.trim(),
      });
    } else {
      window.alert('Please fill out all ingredients');
      // return;
    }

    localStorage.setItem('ingredients', JSON.stringify(ingredients));

    setIngredients(ingredients);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient !== ingredients[index]
    );
    localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
    setIngredients(updatedIngredients);
  };

  useEffect(() => {
    if (localStorage.getItem('ingredients') === null) {
      setIngredients(recipe.ingredients);
    } else {
      setIngredients(JSON.parse(localStorage.getItem('ingredients')));
    }
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-left text-gray-700 font-bold mb-2">
        Ingredients
      </label>

      <div className="flex">
        <div className="basis-4/12 md:basis-2/12 pr-2">
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="text"
            id="quantity"
            // name="quantity"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="quantity"
          />
        </div>
        <div className="basis-4/12 md:basis-2/12 pr-2">
          <input
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            type="text"
            id="unit"
            // name="unit"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="unit"
          />
        </div>
        <div className="basis-4/12 md:basis-10/12 pr-2">
          <input
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            type="text"
            id="ingredient"
            // name="ingredient"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="ingredient"
          />
        </div>
        <div
          className="hover: cursor-pointer"
          onClick={() => {
            fillIngredients();
            setQuantity('');
            setUnit('');
            setIngredient('');
          }}
        >
          <div className="shadow rounded border hover:bg-secondary py-2 px-4">
            Add
          </div>
        </div>
      </div>

      {/* This will display it, but not send data to server */}
      <div className='className="border text-left rounded w-full pt-2 px-3'>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex">
            <input
              className="bg-inherit pr-4"
              value={
                ingredient.quantity +
                ' ' +
                ingredient.unit +
                ' ' +
                ingredient.ingredient
              }
              name="ingredients"
              readOnly
              disabled
            />
            <button
              className="btn btn-xs btn-ghost btn-circle shadow-md"
              onClick={(e) => {
                e.preventDefault();
                setQuantity(ingredient.quantity);
                setUnit(ingredient.unit);
                setIngredient(ingredient.ingredient);
                handleDeleteIngredient(index);
              }}
            >
              <Pencil size={14} />
            </button>
            <button
              className="btn btn-xs btn-ghost btn-circle shadow-md text-red-500"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteIngredient(index);
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* This will not display it, but will send data to server */}
      <div>
        <input
          value={JSON.stringify(ingredients)}
          name="ingredients"
          readOnly
          hidden
        />
      </div>
    </div>
  );
};

export default EditIngredientsForm;