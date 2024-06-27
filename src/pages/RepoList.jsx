
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Input, Spinner, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GithubContext } from '../context/GithubContext';

const RepoList = () => {
  const { repos, setRepos, loading, setLoading, error, setError } = useContext(GithubContext);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.github.com/users/el-suraj/repos');
        setRepos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [setRepos, setLoading, setError]);

  const filteredRepos = repos.filter(repo => repo.name.includes(search));

  return (
    <Box p={5}>
      <Input
        placeholder="Search Repositories"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <Stack spacing={4} mt={5}>
          {filteredRepos.map(repo => (
            <Box key={repo.id} p={5} shadow="md" borderWidth="1px">
              <Link to={`/repo/${repo.name}`}>
                <Button>{repo.name}</Button>
              </Link>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default RepoList;

