import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicRoutes from "./routes/BasicRoutes";
import ProtectRoutes from "./routes/ProtectRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./components/layout/Menu";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Blog from "./pages/Blog";
import BlogInfo from "./pages/BlogInfo";
import ProductInfo from "./pages/ProductInfo";
import Cart from "./pages/Cart";
import Checkout from "./pages/checkout";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path='product' element={<Product />} />
            <Route path='product/:id' element={<ProductInfo />} />

            <Route path='blog' element={<Blog />} />
            <Route path='blog/:id' element={<BlogInfo />} />

            <Route path='/' element={<BasicRoutes />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
            <Route path='/' element={<ProtectRoutes />}>
              <Route index element={<Home />} />
              <Route path='wishlist' element={<Wishlist />} />
              <Route path='cart' element={<Cart />} />
              <Route path='checkout' element={<Checkout />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
