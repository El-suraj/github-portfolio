import React, { useContext, useState } from 'react';
import { Box, Button, Input, Spinner, Stack, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { GithubContext } from '../context/GithubContext';
import RepoModal from '../components/RepoModal';

const RepoList = () => {
  const { repos, setRepos, loading, error } = useContext(GithubContext);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleDelete = async(name) => {
    try{
      await axiosInstance.delete(`/repo/el-suraj/${name}`);
      setRepos(repos.filter(repo => repo.name !== name));
    }catch (error){
      console.error(error);
    }
  };

  const handleSave = (repo) => {
    if (selectedRepo){
      setRepos(repos.map(r => (r.name === selectedRepo.name ? repo : r)));
    }else{
      setRepos([repo, ...repos]);
    }
    setSelectedRepo(null);
  };

  return (
    <Box p={5}>
       <Button onClick={onOpen} colorScheme="teal">Create New Repo</Button>
       <RepoModal isOpen={isOpen} onClose={onClose} repo={selectedRepo} onSave={handleSave} />
      <Stack spacing={4} mt={5}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        repos.map(repo => (
          <Box key={repo.id} p={5} shadow="md" borderWidth="1px">
              <Link to={`/repo/${repo.name}`}>
                <Button>{repo.name}</Button>
              </Link>
              <Button onClick={() => { setSelectedRepo(repo); onOpen(); }} ml={4}>Edit</Button>
              <Button onClick={() => handleDelete(repo.name)} ml={4} colorScheme="red">Delete</Button>
            </Box>
          ))
        )}
        </Stack>
    </Box>
  );
};

export default RepoList;

