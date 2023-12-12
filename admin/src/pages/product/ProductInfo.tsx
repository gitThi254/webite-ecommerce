import { Link, useParams } from "react-router-dom";
import ProductForm from "../../components/Form/ProductForm";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useProduct } from "../../hooks/useProduct";

const ProductInfo = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: product, isPending, error } = useProduct(id);
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (product) {
    queryClient.setQueryData(["images"], product.images);
  }

  return (
    <div>
      <div>
        <Link to='/Product-list'>go to Product list</Link>
        <div>Form update Product</div>
      </div>
      <div>
        <ProductForm Product={product} />
      </div>
    </div>
  );
};

export default ProductInfo;
