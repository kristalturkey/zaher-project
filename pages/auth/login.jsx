import React from "react";

import {
  InputRightElement,
  Input,
  Stack,
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Radio,
  HStack,
  Button,
  FormErrorMessage,
  InputGroup,
  Checkbox
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "@/functions/context";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "password must be at least 6 characters")
    .required("Password is required"),
});

const login = () => {

  const {signInUser} = useAuth()


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      signInUser(values.email ,values.password)
      resetForm();
    },
  });

  

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg='grey.100'
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Box as="span" color={"blue.400"}>features</Box> ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg='white'
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={formik.handleSubmit}>

         
            <Stack spacing={4}>
            <FormControl
                  isInvalid={
                    formik.touched.email && formik.errors.email ? true : false
                  }
              id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.email}

                 
// onChange={e => setEmail(e.target.value)}
// value={email}
                
                type="email" />

<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                  isInvalid={
                    formik.touched.password && formik.errors.password ? true : false
                  }
              id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.password}
                  
                  // onChange={e => setPassword(e.target.value)}
                  // value={password}
                  type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              {/* <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl> */}
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {/* <Checkbox
                     id="checkbox"
                    //  checked={rememberMe}
                    //  onChange={checkHandler}
                  
                  >Remember me</Checkbox> */}

<Box  color={"blue.400"}>
                    <Link href={'/auth/register'}>
                    Create New Account?
                    </Link>
                 
                    
                    </Box>


                   <Box  color={"blue.400"}>
                    <Link href={'/auth/reset'}>
                    Forgot password?
                    </Link>
                 
                    
                    </Box>
                  {/* <Box  color={"blue.400"}>Forgot password?</Box> */}
                </Stack>
                <Button
                type="submit"
                  bg={"blue.400 !important"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500 !important",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
            </form>


          </Box>
        </Stack>
      </Flex>
  );
};

export default login;
