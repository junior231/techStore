import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";
import Footer from "./components/Footer";
import LandingScreen from "./screens/LandingScreen";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route element={<LandingScreen />} path="/" />
            <Route element={<ProductsScreen />} path="/products" />
            <Route element={<ProductScreen />} path="/product/:id" />
            <Route element={<CartScreen />} path="/cart" />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
