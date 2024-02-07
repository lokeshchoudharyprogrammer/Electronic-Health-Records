import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link, useNavigation } from 'react-router-dom';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const logout = () => {
    localStorage.clear()
    window.location.reload();
  }

  return (
    <>
      <Box bg="teal.500" p={4}>
        <Flex alignItems="center">
          <Link to="/">
            <Heading size="md">EHR Dashboard </Heading>
          </Link>
          <Spacer />
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            mr={4}
          />
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="outline"
            onClick={onOpen}
          />
        </Flex>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <Link to="/">
                <Button variant="ghost" onClick={onClose}>Home</Button>
              </Link>
              <Link to="/signup">
                <Button variant="ghost" onClick={onClose}>Sign Up</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" onClick={onClose}>Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={() => { onClose(); logout(); }}>LogOut</Button>

            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
