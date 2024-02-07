import React, { useState, memo } from 'react';
import { Input, Button, Heading, Stack, useToast } from '@chakra-ui/react';
import api from '../utils/api.js';

const AddPatientForm = () => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/patients', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
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

  return (
    <div className='Form'>
      <Heading mb={4}>Add New Patient</Heading>
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
  );
};

export default memo(AddPatientForm);
