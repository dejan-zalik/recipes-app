'use client';

import { useState, useEffect, useRef } from 'react';
import DragIngredientsWrapper from './DragIngredientsWrapper';

const AddIngredientsForm = () => {
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const fillIngredients = () => {
    let ingredients;
    if (localStorage.getItem('ingredients') === null) {
      ingredients = [];
    } else {
      ingredients = JSON.parse(localStorage.getItem('ingredients'));
    }

    if (quantity !== '' && unit !== '' && ingredient !== '') {
      ingredients.push({
        id: Date.now(),
        quantity: quantity.trim(),
        unit: unit.trim(),
        ingredient: ingredient.trim(),
      });
    } else {
      window.alert('Please fill out all ingredients');
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
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

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

      <DragIngredientsWrapper
        ingredients={ingredients}
        setQuantity={setQuantity}
        setUnit={setUnit}
        setIngredient={setIngredient}
        setIngredients={setIngredients}
        handleDeleteIngredient={handleDeleteIngredient}
      />

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

export default AddIngredientsForm;
