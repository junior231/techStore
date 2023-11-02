import {
  Tr,
  Td,
  Button,
  VStack,
  Textarea,
  Tooltip,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Badge,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { uploadProduct } from "../../../redux/actions/adminActions";

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const productInfo = useSelector((state) => state.products);
  const { isProductUploaded } = productInfo;
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [productIsNew, setProductIsNew] = useState(true);

  useEffect(() => {
    return () => {
      setBrand("");
      setName("");
      setCategory("");
      setStock("");
      setDescription("");
      setImage("");
      setPrice("");
      setProductIsNew(true);
    };
  }, [isProductUploaded]);

  const handleCreateNewProduct = () => {
    dispatch(
      uploadProduct({
        brand,
        name,
        category,
        stock,
        price,
        productIsNew,
        description,
        image,
      })
    );
  };
  return (
    <Tr>
      <Td>
        <Text fontSize="sm" fontWeight="bold" mb="1">
          Image File Name
        </Text>
        <Tooltip label="Enter the name of the product image e.g., Iphone.jpg">
          <Input
            size="sm"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Title.jpg"
          />
        </Tooltip>
      </Td>
      <Td>
        <Text fontSize="sm" fontWeight="bold" mb="1">
          Description
        </Text>
        <Textarea
          value={description}
          w="270px"
          h="120px"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          size="sm"
        />
      </Td>
      <Td>
        <Text fontSize="sm" fontWeight="bold" mb="1">
          Brand
        </Text>
        <Input
          size="sm"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Product Brand"
        />
        <Text fontSize="sm" fontWeight="bold" mb="1">
          Name
        </Text>
        <Input
          size="sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
      </Td>
      <Td>
        <Text fontSize="sm" fontWeight="bold" mb="1">
          Category
        </Text>
        <Input
          size="sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Product Category"
        />
        <Text fontSize="sm" fontWeight="bold" mb="1">
          Price
        </Text>
        <Input
          size="sm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Product Price"
        />
      </Td>
      <Td>
        <Text fontSize="sm" fontWeight="bold" mb="1">
          Stock
        </Text>
        <Input
          size="sm"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        {/* <Text fontSize="sm">Show New badge on product?</Text> */}
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="productIsNewFlag" mb="0" fontSize="sm">
            Toggle
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
              New
            </Badge>
            bagde?
          </FormLabel>
          <Switch
            id="productIsNewFlag"
            onChange={() => setProductIsNew(!productIsNew)}
            isChecked={productIsNew}
          />
        </FormControl>
      </Td>
      <Td>
        <VStack>
          <Button
            variant="outline"
            w="160px"
            colorScheme="green"
            onClick={() => handleCreateNewProduct()}
          >
            <MdDriveFolderUpload />
            <Text ml="2">Add Product</Text>
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewProduct;
