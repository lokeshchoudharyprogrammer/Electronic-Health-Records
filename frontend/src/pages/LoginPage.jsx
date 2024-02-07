import React, { useState, useMemo, memo } from 'react';
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
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const Navigation = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://alive-eel-pants.cyclic.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        email,
        password
      })

    }).then((Res) => {
      return Res.json()
    }).then((re) => {

      localStorage.setItem("accessToken", re?.accessToken);
      localStorage.setItem("User_id", re?.user?._id);
      toast({
        title: 'Login',
        description: `Login`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      Navigation("/")
      window.location.reload();
    })

  };


  const isFormValid = useMemo(() => {
    return email.trim() !== '' && password.trim() !== '';
  }, [email, password]);

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Heading mb={4}>Login</Heading>
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
          <Button isDisabled={!isFormValid} type="submit" colorScheme="teal">Login</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default memo(LoginPage);
