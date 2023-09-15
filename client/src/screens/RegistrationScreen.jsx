import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  useBreakpointValue,
  useColorModeValue as mode,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  useToast,
  Text,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/actions/userActions";
import { Link as ReactLink } from "react-router-dom";

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const redirect = "/products";
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  const headingBreakpoint = useBreakpointValue({ base: "xs", md: "sm" });

  const boxBreakingPoint = useBreakpointValue({
    base: "transparent",
    md: "bg-surface",
  });

  // create yup schema for from validation
  const schema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(3, "Password is too short. Must contain at least 3 characters")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .min(3, "Password is too short. Must contain at least 3 characters")
      .required("Password is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  // check if user registration is successful and handle redirect
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);

      toast({
        description: "Account created successfully",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, navigate, toast]);

  // handle sign in
  const handleSubmit = (values) => {
    dispatch(register(values.name, values.email, values.password));
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Container
          maxW="lg"
          py={{ base: "12", md: "24" }}
          px={{ base: "0", md: "8" }}
          minH="4xl"
        >
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading size={headingBreakpoint}>Create an account</Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Already have an account</Text>
                  <Button
                    as={ReactLink}
                    to="/login"
                    variant="link"
                    colorScheme="orange"
                  >
                    Sign In
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={boxBreakingPoint}
              boxShadow={{ base: "none", md: "xl" }}
            >
              <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status="error"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <AlertIcon />
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing="5">
                  <FormControl>
                    <TextField
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      label="Name"
                    />
                    <TextField
                      type="text"
                      name="email"
                      placeholder="you@example.com"
                      label="Email"
                    />
                    <PasswordTextField
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      label="Password"
                    />
                    <PasswordTextField
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      label="Confirm Password"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button
                    colorScheme="orange"
                    size="lg"
                    fontSize="md"
                    isLoading={loading}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default RegistrationScreen;
