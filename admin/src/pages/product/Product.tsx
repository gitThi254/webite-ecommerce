import React, { useEffect } from "react";
import ProductForm from "../../components/Form/ProductForm";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const Product = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  useEffect(() => {
    if (pathname === "product") {
      queryClient.setQueryData(["images"], null);
    }
  }, [pathname]);
  return (
    <div>
      <div>
        <h1>Form create product</h1>
      </div>
      <div>
        <ProductForm />
      </div>
    </div>
  );
};

export default Product;
