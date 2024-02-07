import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Flex, useToast, Stack, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input, ModalCloseButton } from '@chakra-ui/react';
import PatientList from '../pages/PatientList.jsx';
import api from '../utils/api.js';

const DashboardPage = () => {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    bloodType: '',
    allergies: '',
    medications: '',
    medicalHistory: '',
    UserID: localStorage.getItem('User_id')
  });
  console.log(formData)

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try {
      const response = await fetch('https://alive-eel-pants.cyclic.app/patients', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      window.location.reload();
      toast({
        title: "Patient Added",
        description: "Patient added successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding patient:', error);
      toast({
        title: "Error",
        description: "Failed to add patient",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = useCallback(async () => {
    try {
      const response = await api.get('/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg">Dashboard</Heading>
        <Button colorScheme="teal" onClick={handleModalOpen}>Add New Patient</Button>
      </Flex>
      <PatientList patients={patients} />

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Patient</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <div>

              <form className="Form-Element" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Input placeholder="First Name" value={formData.firstName} name="firstName" onChange={handleChange} />
                  <Input placeholder="Last Name" value={formData.lastName} name="lastName" onChange={handleChange} />
                  <Input type="date" placeholder="Date of Birth" value={formData.dob} name="dob" onChange={handleChange} />
                  <Input placeholder="Gender" value={formData.gender} name="gender" onChange={handleChange} />
                  <Input placeholder="Address" value={formData.address} name="address" onChange={handleChange} />
                  <Input placeholder="Phone" value={formData.phone} name="phone" onChange={handleChange} />
                  <Input type="email" placeholder="Email" value={formData.email} name="email" onChange={handleChange} />
                  <Input placeholder="Blood Type" value={formData.bloodType} name="bloodType" onChange={handleChange} />
                  <Input placeholder="Allergies" value={formData.allergies} name="allergies" onChange={handleChange} />
                  <Input placeholder="Medications" value={formData.medications} name="medications" onChange={handleChange} />
                  <Input placeholder="Medical History" value={formData.medicalHistory} name="medicalHistory" onChange={handleChange} />
                  <Button type="submit" colorScheme="teal">Add Patient</Button>
                </Stack>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>

        </ModalContent>
      </Modal>
    </Box>
  );
};

export default memo(DashboardPage);
