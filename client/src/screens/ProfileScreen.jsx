import {
  Box,
  Button,
  FormControl,
  Heading,
  Stack,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Alert,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  updateProfile,
  resetUpdateSuccess,
} from "../redux/actions/userActions";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";

const ProfileScreen = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: "Profile saved",
        status: "success",
        isClosable: true,
      });
    }
  }, [updateSuccess, toast]);

  // create yup schema for form validation
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

  const handleSubmit = (values) => {
    dispatch(resetUpdateSuccess(false));
    dispatch(
      updateProfile(userInfo._id, values.name, values.email, values.password)
    );
  };

  return userInfo ? (
    <Formik
      initialValues={{
        email: userInfo.email,
        password: "",
        confirmPassword: "",
        name: userInfo.name,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Box
          minH="100vh"
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing="10"
          >
            <Stack flex="1.5" mb={{ base: "2xl", md: "none" }}>
              <Heading fontSize="2xl" fontWeight="extrabold">
                Profile
              </Heading>
              <Stack spacing="6">
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
                      <AlertTitle>We are sorry.</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing="5">
                    <FormControl>
                      <TextField
                        type="text"
                        name="name"
                        placeholder="Your first and last name."
                        label="Full Name"
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
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex
              direction="column"
              align="center"
              flex="1"
              _dark={{ bg: "gray.900" }}
            >
              <Card>
                <CardHeader>
                  <Heading size="md">User Report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box pt="2" fontSize="sm">
                      Registered on{" "}
                      {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default ProfileScreen;
