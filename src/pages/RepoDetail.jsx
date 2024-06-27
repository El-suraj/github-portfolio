
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { GithubContext } from '../context/GithubContext';
import RepoModal from '../components/RepoModal';

const RepoDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { repos, setRepos, loading, setLoading, error, setError } = useContext(GithubContext);
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`https://api.github.com/repos/el-suraj/${name}`);
        setRepo(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepo();
  }, [name, setLoading, setError]);

  const handleDelete = async () =>{
    try{
      await axiosInstance.delete(`/repos/el-suraj/${name}`);
      setRepos(repos.filter(repo => repo.name !== name));
      navigate('/');
    }catch(error){
      console.error(error);
    }
  };

  const handleSave = (updatedRepo) =>{
    setRepo(updatedRepo);
    setRepos(repos.map(r => (r.name === name ? updatedRepo : r)));
    onClose();
  };

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
      <Button onClick={onOpen} mt={4} ml={4} colorScheme="red">Delete</Button>
      <RepoModal isOpen={isOpen} onClose={onClose} repo={repo} onSave={handleSave} />
    </Box>
  );
};

export default RepoDetail;

