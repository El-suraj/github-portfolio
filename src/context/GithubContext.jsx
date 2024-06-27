
// src/context/GithubContext.js
import React, { createContext, useState } from 'react';

export const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <GithubContext.Provider value={{ repos, setRepos, loading, setLoading, error, setError }}>
      {children}
    </GithubContext.Provider>
  );
};

