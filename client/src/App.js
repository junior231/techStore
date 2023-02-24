import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartScreen from "./screens/CartScreen";
import ProductsScreen from "./screens/ProductsScreen";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route element={<ProductsScreen />} path="/products" />
            <Route element={<CartScreen />} path="/cart" />
          </Routes>
        </main>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
