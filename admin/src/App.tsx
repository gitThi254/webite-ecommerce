import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Menu from "./components/layout/Menu";
import BasicRoute from "./routes/BasicRoute";
import ProtectRoutes from "./routes/ProtectRoutes";
import Customers from "./pages/customer/Customers";
import Customer from "./pages/customer/Customer";
import CustomerInfo from "./pages/customer/CustomerInfo";
import Brands from "./pages/brand/Brands";
import Brand from "./pages/brand/Brand";
import BrandInfo from "./pages/brand/BrandInfo";

import Colors from "./pages/color/Colors";
import ColorInfo from "./pages/color/ColorInfo";
import Color from "./pages/color/Color";
import Categories from "./pages/category/Categories";
import CategoryInfo from "./pages/category/CategoryInfo";
import Category from "./pages/category/Category";
import BlogCategories from "./pages/blogCategory/BlogCategories";
import BlogCategoryInfo from "./pages/blogCategory/BlogCategoryInfo";
import BlogCategory from "./pages/blogCategory/BlogCategory";
import Orders from "./pages/order/Orders";
import Coupons from "./pages/coupon/Coupons";
import CouponInfo from "./pages/coupon/CouponInfo";
import Coupon from "./pages/coupon/Coupon";
import Blogs from "./pages/blog/Blogs";
import Blog from "./pages/blog/Blog";
import BlogInfo from "./pages/blog/BlogInfo";
import Products from "./pages/product/Products";
import Product from "./pages/product/Product";
import ProductInfo from "./pages/product/ProductInfo";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route element={<BasicRoute />}>
              <Route path='/login' element={<Login />} />
            </Route>
            <Route element={<ProtectRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path='/customer-list' element={<Customers />} />
              <Route path='/customer-list/:id' element={<CustomerInfo />} />

              <Route path='/order-list' element={<Orders />} />

              <Route path='/brand-list' element={<Brands />} />
              <Route path='/brand-list/:id' element={<BrandInfo />} />
              <Route path='/brand' element={<Brand />} />

              <Route path='/coupon-list' element={<Coupons />} />
              <Route path='/coupon-list/:id' element={<CouponInfo />} />
              <Route path='/coupon' element={<Coupon />} />

              <Route path='/product-list' element={<Products />} />
              <Route path='/product-list/:id' element={<ProductInfo />} />
              <Route path='/product' element={<Product />} />

              <Route path='/blog-list' element={<Blogs />} />
              <Route path='/blog-list/:id' element={<BlogInfo />} />

              <Route path='/blog' element={<Blog />} />

              <Route path='/color-list' element={<Colors />} />
              <Route path='/color-list/:id' element={<ColorInfo />} />
              <Route path='/color' element={<Color />} />

              <Route path='/category-list' element={<Categories />} />
              <Route path='/category-list/:id' element={<CategoryInfo />} />
              <Route path='/category' element={<Category />} />

              <Route path='/blog-category-list' element={<BlogCategories />} />
              <Route
                path='/blog-category-list/:id'
                element={<BlogCategoryInfo />}
              />
              <Route path='/blog-category' element={<BlogCategory />} />

              <Route path='/customer' element={<Customer />} />
              <Route path='/customer/:id' element={<CustomerInfo />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
