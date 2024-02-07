import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const Navigation = useNavigate()
  const handleSubmit = (e) => {
    console.log(email, password)
    e.preventDefault();
    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        role: "user"
      })

    }).then((Res) => {
      return Res.json()
    }).then((re) => {
      console.log(re)
      toast({
        title: 'Sign Up',
        description: `${re.message ? re.message : re.error}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      Navigation("/login")
    })

  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Heading mb={4}>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="teal">Sign Up</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignupPage;
