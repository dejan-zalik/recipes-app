'use client';

import { useEffect } from 'react';

const ClearLocalStorage = () => {
  return useEffect(() => {
    localStorage.removeItem('ingredients');
    localStorage.removeItem('instructions');
  }, []);
};

export default ClearLocalStorage;
