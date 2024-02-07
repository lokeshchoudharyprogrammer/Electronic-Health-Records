import React, { memo, useEffect, useState } from 'react';
import {
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ListItem,
  UnorderedList,
  VStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import axios from "axios"
const PatientList = memo(() => {
  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch(`http://localhost:5000/patients?id=${localStorage.getItem('User_id')}`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    }
    fetchPatients();
  }, []);

  const handleEdit = async (patient) => {
    setSelectedPatient(patient);

    openModal();



  };




  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    openModal();
  };

  const handleDelete = async (patientId) => {
    console.log(`Deleting patient with ID ${patientId}`);
    try {
      const response = await axios.delete(`http://localhost:5000/patients/${patientId}`);

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      // If there's an error with the delete request
      console.error('Error deleting patient:', error);

    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Updated patient data:', selectedPatient);
    try {

      const response = await fetch(`http://localhost:5000/patients/${selectedPatient._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedPatient),
      });
      const data = await response.json();
      console.log('Updated patient data:', data);
    } catch (error) {
      console.error('Error updating patient data:', error);

    }
    closeModal();
  };
  console.log(patients)

  return (
    <VStack align="stretch">
      <Heading mb={4}>Patients</Heading>
      <UnorderedList style={{ listStyleType: 'none', padding: 0, display: "flex", flexWrap: "wrap", gap: "34px", justifyContent: "center" }}>
        {patients.length > 0 ? patients.map((patient) => (
          <ListItem className='patient' key={patient.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
            <strong>{patient.firstName} {patient.lastName}</strong><br />
            <span>Date of Birth: {patient.dob}</span><br />
            <span>Gender: {patient.gender}</span><br />
            <span>Address: {patient?.address}</span><br />
            <span>Phone: {patient?.phone}</span><br />
            <span>Email: {patient?.email}</span><br />
            <span>Blood Type: {patient?.bloodType}</span><br />
            <span>Allergies: {patient?.allergies.join(', ')}</span><br />
            <span>Medications: {patient?.medications.join(', ')}</span><br />
            <span>Medical History: {patient?.medicalHistory}</span><br />

            <div className="patient-btn">
              <Button colorScheme="blue" onClick={() => handleViewDetails(patient)}>View</Button>
              <Button colorScheme="green" onClick={() => handleEdit(patient)}>Edit</Button>
              <Button colorScheme="red" onClick={() => handleDelete(patient._id)}>Delete</Button>
            </div>
          </ListItem>
        )) : <div>No Data Available</div>}
      </UnorderedList>

      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedPatient ? 'Edit Patient' : 'Patient Details'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              {selectedPatient && (
                <Stack spacing={4}>
                  <Input placeholder="First Name" value={selectedPatient.firstName} onChange={(e) => setSelectedPatient({ ...selectedPatient, firstName: e.target.value })} />
                  <Input placeholder="Last Name" value={selectedPatient.lastName} onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })} />
                  <Input placeholder="Last Name" value={selectedPatient.dob} onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })} />
                  <Input placeholder="Last Name" value={selectedPatient.gender} onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })} />
                  <Input placeholder="Last Name" value={selectedPatient.address} onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })} />
                  <Input placeholder="Last Name" value={selectedPatient.phone} onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })} />
                  <Input placeholder="Last Name" value={selectedPatient.email} onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })} />
                  <Input placeholder="Last Name" value={selectedPatient.bloodType} onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })} />
                  <Input placeholder="Last Name" value={selectedPatient.allergies} onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })} />
                  <Input placeholder="Last Name" value={selectedPatient.medications} onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })} />
                  <Input placeholder="Last Name" value={selectedPatient.medicalHistory} onChange={(e) => setSelectedPatient({ ...selectedPatient, lastName: e.target.value })} />

                </Stack>
              )}
              {!selectedPatient && (
                <div>
                  <strong>{selectedPatient?.firstName} {selectedPatient?.lastName}</strong><br />

                </div>
              )}
            </ModalBody>
            {selectedPatient && (
              <ModalFooter>
                <Button colorScheme="blue" type="submit" >Save Changes</Button>
              </ModalFooter>
            )}
          </form>
        </ModalContent>
      </Modal>
    </VStack>
  );
});

export default PatientList;
