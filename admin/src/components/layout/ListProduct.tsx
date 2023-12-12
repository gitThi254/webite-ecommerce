import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useProducts } from "../../hooks/useProduct";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const { data: products, isLoading, error } = useProducts();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {products?.map((product) => (
        <div key={product._id} className='grid grid-cols-7'>
          <div>{product.title}</div>
          <div>{product.price}</div>
          <div>{product.quantity}</div>
          <div>{product.category.title}</div>
          <div>{product.brand.title}</div>

          <div>
            {product.color?.map((color: any) => (
              <div key={color._id}>{color.title}</div>
            ))}
          </div>
          <Link to={`/product-list/${product._id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
