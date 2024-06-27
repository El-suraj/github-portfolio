
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

export const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/user/repos');
        setRepos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <GithubContext.Provider value={{ repos, setRepos, loading, setLoading, error, setError }}>
      {children}
    </GithubContext.Provider>
  );
};


