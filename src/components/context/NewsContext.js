

import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('general');

  return (
    <NewsContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </NewsContext.Provider>
  );
};
