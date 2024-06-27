
import React, { useContext, useEffect, useState } from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GithubContext } from '../context/GithubContext';

const RepoDetail = () => {
  const { name } = useParams();
  const { loading, setLoading, error, setError } = useContext(GithubContext);
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.github.com/repos/el-suraj/${name}`);
        setRepo(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepo();
  }, [name, setLoading, setError]);

  if (loading) return <Spinner />;
  if (error) return <Box>{error}</Box>;
  if (!repo) return <Box>No Repository Found</Box>;

  return (
    <Box p={5}>
      <Text fontSize="xl">{repo.name}</Text>
      <Text>{repo.description}</Text>
      <Text>{repo.language}</Text>
      <Text>{repo.stargazers_count} Stars</Text>
      <Text>{repo.forks_count} Forks</Text>
    </Box>
  );
};

export default RepoDetail;

