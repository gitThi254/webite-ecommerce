import React from "react";
import ListProduct from "../../components/layout/ListProduct";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <div>
        <h1>List Product</h1>
        <Link to='/product'>new Product</Link>
      </div>
      <div>
        <ListProduct />
      </div>
    </div>
  );
};

export default Products;
