import {
  Box,
  Th,
  Tr,
  Table,
  Thead,
  Tbody,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Text,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetProductError,
} from "../../redux/actions/productActions";
import ProductsTabItem from "./ProductsTabItem";
import AddNewProduct from "./components/AddNewProduct";

const ProductsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const productInfo = useSelector((state) => state.products);
  const { products, isProductUpdated, isProductDeleted, isProductUploaded } =
    productInfo;
  const { error, loading } = admin;
  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());
    if (isProductUpdated) {
      toast({
        description: "Product has been updated",
        status: "success",
        isClosable: true,
      });
    }
    if (isProductDeleted) {
      toast({
        description: "Product has been removed",
        status: "success",
        isClosable: true,
      });
    }
    if (isProductUploaded) {
      toast({
        description: "Product has been uploaded",
        status: "success",
        isClosable: true,
      });
    }
  }, [isProductUpdated, dispatch, toast, isProductDeleted, isProductUploaded]);

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
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="right">
                    <Box>
                      <Text mr="8px" fontWeight="bold">
                        Add a new Product
                      </Text>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb="4">
                <Table>
                  <Tbody>
                    <AddNewProduct />
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Description</Th>
                <Th>Brand & Name</Th>
                <Th>Category & Price</Th>
                <Th>Stock & New Badge</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.length > 0 &&
                products.map((product) => (
                  <ProductsTabItem key={product._id} product={product} />
                ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ProductsTab;
