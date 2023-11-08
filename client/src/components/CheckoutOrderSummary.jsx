import { useCallback, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Link,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { PhoneIcon, EmailIcon, ChatIcon } from "@chakra-ui/icons";
import { createOrder, resetOrder } from "../redux/actions/orderActions";
import { resetCart } from "../redux/actions/cartActions";
import CheckoutItem from "./CheckoutItem";
import PaypalButton from "./PaypalButton";

const CheckoutOrderSummary = () => {
  const colorMode = mode("gray.600", "gray.400");
  const navigate = useNavigate();
  const toast = useToast();

  // get cart
  const cartItems = useSelector((state) => state.cart);
  const { cart, subTotal, expressShipping } = cartItems;

  // get user
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  // get shipping info
  const shippingInfo = useSelector((state) => state.order);
  const { shippingAddress, error } = shippingInfo;

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  // if expressShipping or subtotal prop changes, update shipping value
  const shipping = useCallback(
    () => (expressShipping === "true" ? 14.99 : subTotal <= 1000 ? 4.99 : 0),
    [expressShipping, subTotal]
  );

  const total = useCallback(
    () =>
      Number(
        shipping() === 0 ? Number(subTotal) : Number(subTotal) + shipping()
      ).toFixed(2),
    [shipping, subTotal]
  );

  // handle disable state in Paypal Button
  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress, total, expressShipping, shipping, dispatch]);

  const onPaymentSuccess = async (data) => {
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      })
    );
    dispatch(resetOrder());
    dispatch(resetCart());
    navigate("/order-success");
  };

  const onPaymentError = () => {
    toast({
      description:
        "Something went wrong during the payment process. Please check your PayPal account and try again",
      status: "error",
      duration: "60000",
      isClosable: true,
    });
  };

  return (
    <Stack spacing="8" rounded="xl" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>
      {cart.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            {subTotal}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            Shipping
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            {shipping() === 0 ? (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Free
              </Badge>
            ) : (
              `$${shipping()}`
            )}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="medium">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold" color={colorMode}>
            ${Number(total())}
          </Text>
        </Flex>
      </Stack>
      {/* payment button */}
      <PaypalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={buttonDisabled}
      />
      <Box align="center">
        <Text fontSize="sm">
          Have questions? or need help completing your order
        </Text>
        <Flex justifyContent="center" color={mode("orange.500", "orange.100")}>
          <Flex align="center">
            <ChatIcon />
            <Text m="2">Live Chat</Text>
          </Flex>
          <Flex align="center">
            <PhoneIcon />
            <Text m="2">Phone</Text>
          </Flex>
          <Flex align="center">
            <EmailIcon />
            <Text m="2">Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode("gray.400", "gray.800")} />
      <Flex justifyContent="center" my="6" fontWeight="semibold">
        <p>or</p>
        <Link as={ReactLink} to="/products" ml="1">
          Continue Shopping
        </Link>
      </Flex>
    </Stack>
  );
};

export default CheckoutOrderSummary;
