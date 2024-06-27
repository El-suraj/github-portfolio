
import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import axiosInstance from '../api/axios';

const RepoModal = ({ isOpen, onClose, repo, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (repo) {
      setName(repo.name);
      setDescription(repo.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [repo]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let response;
      if (repo) {
        response = await axiosInstance.patch(`/repos/el-suraj/${repo.name}`, { name, description });
      } else {
        response = await axiosInstance.post('/user/repos', { name, description });
      }
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{repo ? 'Update Repository' : 'Create New Repository'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoading}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RepoModal;
