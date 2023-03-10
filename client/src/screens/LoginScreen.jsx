import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as ReactLink, useLocation } from "react-router-dom";
import PasswordTextField from "../components/PasswordTextField";
import TextField from "../components/TextField";
import { login } from "../redux/actions/userActions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = "/products";
  const toast = useToast();

  const user = useSelector((state) => state.user);

  const { loading, error, userInfo } = user;

  // create yup schema for from validation
  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(3, "Password is too short. Must contain at least 3 characters")
      .required("Password is required."),
  });

  // handle sign in
  const handleSubmit = (values) => {
    dispatch(login(values.email, values.password));
  };

  const headingBreakpoint = useBreakpointValue({ base: "xs", md: "sm" });

  const boxBreakingPoint = useBreakpointValue({
    base: "transparent",
    md: "bg-surface",
  });

  // check if user sign is successful and handle redirect
  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({
        description: "Login successful",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, location.state, navigate, toast]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
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
                <Heading size={headingBreakpoint}>
                  Log in to your account
                </Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Don't have an account</Text>
                  <Button
                    as={ReactLink}
                    to="/register"
                    variant="link"
                    colorScheme="orange"
                  >
                    Sign up
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
                      name="email"
                      placeholder="you@example.com"
                      label="Email"
                    />
                    <PasswordTextField
                      type="password"
                      name="password"
                      placeholder="password"
                      label="Password"
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
                    Sign In
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

export default LoginScreen;
