import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <main>{/* <Routes></Routes> */}</main>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
