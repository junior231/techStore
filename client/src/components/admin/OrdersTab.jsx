import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Flex,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { TbTruckDelivery } from "react-icons/tb";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  deleteOrder,
  setDelivered,
  resetErrorandRemoval,
} from "../../redux/actions/adminActions";
import ConfirmRemovalAlert from "./modals/ConfirmRemovalAlert";

const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [orderToDelete, setOrderToDelete] = useState("");
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading, orders, isOrderRemoved, isOrderDelivered } = admin;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorandRemoval());
    if (isOrderRemoved) {
      toast({
        description: "Order has been removed",
        status: "success",
        isClosable: true,
      });
    }
    if (isOrderDelivered) {
      toast({
        description: "Order has been set to delivered",
        status: "success",
        isClosable: true,
      });
    }
  }, [isOrderRemoved, dispatch, toast, isOrderDelivered]);

  const openDeleteConfirmModal = (order) => {
    setOrderToDelete(order);
    onOpen();
  };

  const handleSetToDelivered = (order) => {
    dispatch(resetErrorandRemoval());
    dispatch(setDelivered(order._id));
  };

  return (
    <Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify="center">
          <Stack direction="row" spacing="4">
            <Spinner
              mt="20"
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <TableContainer>
            <Table variant="simple" overflowX="auto">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Shipping Info</Th>
                  <Th>Items Ordered</Th>
                  <Th>Payment Method</Th>
                  <Th>Shipping Price</Th>
                  <Th>Total</Th>
                  <Th>Delivered</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders.map((order) => (
                    <Tr key={order._id}>
                      <Td>{new Date(order.createdAt).toDateString()}</Td>
                      <Td>{order.username}</Td>
                      <Td>{order.email}</Td>
                      <Td>
                        <Text>
                          <i>Address</i> {order.shippingAddress.address}
                        </Text>
                        <Text>
                          <i>City</i> {order.shippingAddress.postalCode}{" "}
                          {order.shippingAddress.city}
                        </Text>
                        <Text>
                          <i>Country</i>
                          {order.shippingAddress.country}
                        </Text>
                      </Td>
                      <Td>
                        {order.orderItems.map((item) => (
                          <Text key={item.id}>
                            {item.qty} x {item.name}
                          </Text>
                        ))}
                      </Td>
                      <Td>{order.paymentMethod}</Td>
                      <Td>${order.shippingPrice}</Td>
                      <Td>${order.totalPrice}</Td>
                      <Td>
                        {order.isDelivered ? <CheckCircleIcon /> : "Pending"}
                      </Td>
                      <Td>
                        <Flex direction="column">
                          <Button
                            variant="outline"
                            onClick={() => openDeleteConfirmModal(order)}
                          >
                            <DeleteIcon mr="5px" />
                            Remove Order
                          </Button>
                          {!order.isDelivered && (
                            <Button
                              mt="4px"
                              variant="outline"
                              onClick={() => handleSetToDelivered(order)}
                            >
                              <TbTruckDelivery />
                              <Text ml="5px">Delivered</Text>
                            </Button>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ConfirmRemovalAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={orderToDelete}
            deleteAction={deleteOrder}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersTab;
