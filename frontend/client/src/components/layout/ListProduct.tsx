import React from "react";
import { useAddWishlist, useProducts } from "../../hooks/useProduct";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const { data: products, isPending, error } = useProducts();
  const { mutate: AddWishlist, isPending: penWishlist } = useAddWishlist();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error?.message}</p>;
  return (
    <section className='grid grid-cols-4 gap-2 items-center'>
      {products?.map((product) => (
        <div key={product._id} className='flex flex-col items-center'>
          <Link to={`/product/${product._id}`}>
            {product.images.map((image: any) => (
              <div
                key={image._id}
                className={
                  "w-[100px] h-[100px] flex items-center justify-center"
                }
              >
                <img src={image.url} alt='product' />
              </div>
            ))}
          </Link>
          <div className=''>{product.title}</div>
          <div className=''>{product.description}</div>
          <div className=''>{product.price}</div>
          <button onClick={() => AddWishlist(product?._id)}>Wishlist</button>
        </div>
      ))}
    </section>
  );
};

export default ListProduct;
