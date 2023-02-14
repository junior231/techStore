import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsScreen from "./screens/ProductsScreen";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route element={<ProductsScreen />} path="/products" />
          </Routes>
        </main>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
