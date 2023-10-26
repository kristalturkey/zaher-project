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
  Checkbox,
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
});

const Reset = () => {
  const { forgetPassword  } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      forgetPassword(values.email)
      //  signInUser(values.email )
      resetForm();
    },
  });

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="grey.100">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"}>Forget your Email Password ?</Heading>
        </Stack>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                isInvalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
                id="email"
                isRequired
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  // onChange={e => setEmail(e.target.value)}
                  // value={email}

                  type="email"
                />

                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Box color={"blue.400"}>
                    <Link href={"/auth/login"}>Go to Login ?</Link>
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
                  Reset Password
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Reset;
