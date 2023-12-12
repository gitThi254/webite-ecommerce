import React from "react";
import { useWishlist } from "../hooks/useAuth";
import BtnDeleteWishlist from "../components/btn/btnDeleteWishlist";

const Wishlist = () => {
  const { data: wishlist, isPending } = useWishlist();

  if (isPending) return <p>Loading...</p>;
  return (
    <div>
      {wishlist?.map((item: any) => (
        <div key={item._id} className='flex gap-4'>
          <div>{item.title}</div>
          <div>{item.description}</div>
          <BtnDeleteWishlist id={item._id} />
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
