import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  Icon,
  useColorMode,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import {
  MdLocalShipping,
  MdLogout,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GiTechnoHeart } from "react-icons/gi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

const ShoppingCartIcon = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;

  return (
    <Flex>
      <Text as="sub" fontStyle="italic" fontSize="xs">
        {cart.length}
      </Text>
      <Icon as={FiShoppingCart} h="4" w="7" ml="-1.5" alignSelf="center" />
      Cart
    </Flex>
  );
};

// create array of links
const links = [
  { linkName: "Products", path: "/products" },
  { linkName: <ShoppingCartIcon />, path: "/cart" },
];

//create NavLink component
const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    rounded="md"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHovering, setIsHovering] = useState(false);
  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = () => {
    dispatch(logout());
    toast({
      description: "You have been logged out",
      status: "success",
    });
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack>
          <Link
            as={ReactLink}
            to="/"
            style={{ textDecoration: "none" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Flex alignItems="center">
              <Icon
                as={GiTechnoHeart}
                h={6}
                w={6}
                color={isHovering ? "cyan.400" : "orange.400"}
              />
              <Text fontWeight="extrabold"> Tech Lines</Text>
            </Flex>
          </Link>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <NavLink>
            <Icon
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf="center"
              onClick={() => toggleColorMode()}
            />
          </NavLink>

          {/* if user is logged in, display log out button, else display sign in/sign out buttons */}
          {userInfo ? (
            <>
              <Menu>
                <MenuButton px="4" py="2" transition="all 0.3s" as={Button}>
                  {userInfo.name} <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={ReactLink} to="/profile">
                    <CgProfile />
                    <Text ml="2">Profile</Text>
                  </MenuItem>
                  <MenuItem as={ReactLink} to="/your-orders">
                    <MdLocalShipping />
                    <Text ml="2">Your Orders</Text>
                  </MenuItem>
                  {userInfo.isAdmin === "true" ? (
                    <>
                      <MenuDivider />
                      <MenuItem as={ReactLink} to="/admin-console">
                        <MdOutlineAdminPanelSettings />
                        <Text ml="2">Admin Console</Text>
                      </MenuItem>
                    </>
                  ) : null}
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>
                    <MdLogout />
                    <Text ml="2">Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                as={ReactLink}
                to="/login"
                p={2}
                fontSize="sm"
                fontWeight={400}
                variant="link"
              >
                Sign In
              </Button>
              <Button
                as={ReactLink}
                to="/register"
                m={2}
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={600}
                _hover={{ bg: "orange.400" }}
                bg="orange.500"
                color="white"
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key="signUp" path="/register">
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
