import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  HStack,
  Button,
  SimpleGrid,
  Flex,
  Badge,
  Heading,
  useToast,
  AlertTitle,
  Tooltip,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { MinusIcon, StarIcon, SmallAddIcon } from "@chakra-ui/icons";
import { BiPackage, BiCheckShield, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  getProduct,
  resetProductError,
} from "../redux/actions/productActions";
import { addItemToCart } from "../redux/actions/cartActions";
import { useEffect, useState } from "react";

const ProductScreen = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const [amount, setAmount] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);

  const productList = useSelector((state) => state.products);
  const cartList = useSelector((state) => state.cart);
  const { loading, error, product, reviewSent } = productList;
  const { cart } = cartList;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    dispatch(getProduct(id));

    // if reviewSent is true
    if (reviewSent) {
      toast({
        description: "Product review saved",
        status: "success",
        isClosable: true,
      });
      dispatch(resetProductError());
      setReviewBoxOpen(false);
    }
  }, [id, cart, dispatch, reviewSent, toast]);

  const changeAmount = (input) => {
    if (input === "plus") {
      setAmount(amount + 1);
    }
    if (input === "minus") {
      setAmount(amount - 1);
    }
  };

  // check if user has already reviewed Product
  const hasUserReviewed = () =>
    product.reviews.some((item) => item.user === userInfo._id);

  // handle Product review submit
  const handleOnSubmitReview = () => {
    dispatch(
      createProductReview(product._id, userInfo._id, comment, rating, title)
    );
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(product && product._id, amount));
    toast({
      description: "Item has been added.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing={4}>
          <Spinner
            mt={20}
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="gray.500"
            size="xl"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: "3xl", lg: "5xl" }}
            mx="auto"
            px={{ base: "4", md: "8", lg: 12 }}
            py={{ base: "6", md: "8", lg: 12 }}
          >
            <Stack
              direction={{ base: "column", lg: "row" }}
              align={{ lg: "flex-start" }}
            >
              <Stack
                pr={{ base: "0", md: "12" }}
                spacing={{ base: "8", md: "4" }}
                flex="1.5"
                mb={{ base: "12", md: "none" }}
              >
                {product.productIsNew && (
                  <Badge
                    rounded="full"
                    w="40px"
                    fontSize="0.8em"
                    colorScheme="green"
                  >
                    New
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge
                    rounded="full"
                    w="70px"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    Sold Out
                  </Badge>
                )}
                <Heading fontSize="2xl" fontWeight="extrabold">
                  {product.name}
                </Heading>
                <Stack spacing="5">
                  <Box>
                    <Text fontSize="xl">${product.price}</Text>
                    <Flex>
                      <HStack spacing="2px">
                        <StarIcon color="orange.500" />
                        <StarIcon
                          color={
                            product.rating >= 2 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 3 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 4 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 5 ? "orange.500" : "gray.200"
                          }
                        />
                      </HStack>
                      <Text fontSize="md" fontWeight="bold" ml="4px">
                        {product.numberOfReviews} Reviews
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.description}</Text>
                  <Text fontWeight="bold">Quantity</Text>
                  <Flex
                    w="170px"
                    p="5px"
                    border="1px"
                    borderColor="gray.200"
                    alignItems="center"
                  >
                    <Button
                      isDisabled={amount <= 1}
                      onClick={() => changeAmount("minus")}
                    >
                      <MinusIcon />
                    </Button>
                    <Text mx="30px">{amount}</Text>
                    <Button
                      isDisabled={amount >= product.stock}
                      onClick={() => changeAmount("plus")}
                    >
                      <SmallAddIcon w="20px" h="25px" />
                    </Button>
                  </Flex>
                  <Button
                    colorScheme="orange"
                    onClick={() => handleAddToCart()}
                    isDisabled={product.stock === 0}
                  >
                    Add to cart
                  </Button>
                  <Stack width="270px">
                    <Flex alignItems="center">
                      <BiPackage size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        Free shipping if order is above $1000
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <BiCheckShield size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        2 year extended warranty
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <BiSupport size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        We are here for you 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>

              <Flex
                direction="column"
                align="center"
                flex="1"
                _dark={{ bg: "gray.900" }}
              >
                <Image mb="30px" src={product.image} alt={product.name} />
              </Flex>
            </Stack>

            {userInfo ? (
              <>
                <Tooltip
                  label={
                    hasUserReviewed()
                      ? "You have already reviewed this product"
                      : ""
                  }
                  fontSize="md"
                >
                  <Button
                    isDisabled={hasUserReviewed()}
                    my="20px"
                    w="140px"
                    colorScheme="orange"
                    onClick={() => setReviewBoxOpen(!reviewBoxOpen)}
                  >
                    Write a review
                  </Button>
                </Tooltip>
                {reviewBoxOpen ? (
                  <Stack mb="20px">
                    <Wrap>
                      <HStack spacing="2px">
                        <Button variant="outline" onClick={() => setRating(1)}>
                          <StarIcon color="orange.500" />
                        </Button>
                        <Button variant="outline" onClick={() => setRating(2)}>
                          <StarIcon
                            color={rating >= 2 ? "orange.500" : "gray.200"}
                          />
                        </Button>
                        <Button variant="outline" onClick={() => setRating(3)}>
                          <StarIcon
                            color={rating >= 3 ? "orange.500" : "gray.200"}
                          />
                        </Button>
                        <Button variant="outline" onClick={() => setRating(4)}>
                          <StarIcon
                            color={rating >= 4 ? "orange.500" : "gray.200"}
                          />
                        </Button>
                        <Button variant="outline" onClick={() => setRating(5)}>
                          <StarIcon
                            color={rating >= 5 ? "orange.500" : "gray.200"}
                          />
                        </Button>
                      </HStack>
                    </Wrap>
                    <Input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder="Review Title (optional)"
                    />
                    <Textarea
                      placeholder={`The ${product.name} is...`}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                    <Button
                      w="140px"
                      colorScheme="orange"
                      onClick={handleOnSubmitReview}
                    >
                      Publish review
                    </Button>
                  </Stack>
                ) : null}
              </>
            ) : null}
            <Stack>
              <Text fontSize="xl" fontWeight="bold">
                Reviews
              </Text>
              <SimpleGrid minChildWidth="300px" spacingX="40px" spacingY="20px">
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing="2px" alignItems="center">
                      <StarIcon color="orange.500" />
                      <StarIcon
                        color={review.rating >= 2 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={review.rating >= 3 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={review.rating >= 4 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={review.rating >= 5 ? "orange.500" : "gray.200"}
                      />
                      <Text fontWeight="semibold" ml="4px">
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py="12px">{review.comment}</Box>
                    <Text fontSize="sm" color="gray.400">
                      by {review.name},{" "}
                      {review.createdAt
                        ? new Date(review.createdAt).toDateString()
                        : null}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default ProductScreen;
