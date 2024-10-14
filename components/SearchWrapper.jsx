'use client';

import { useState } from 'react';
import RecipeCard from '@/components/RecipeCard';

const SearchWrapper = ({ recipes }) => {
  const [searchText, setSearchText] = useState('');

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      <div className="container m-auto py-4 px-6 text-center">
        <input
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
          type="text"
          placeholder="Search recipes"
          className="input shadow-md w-full max-w-sm"
        />
      </div>
      <div className="container m-auto py-6 px-6">
        {filteredRecipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchWrapper;
