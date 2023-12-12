import React, { useEffect, useState } from "react";
import BtnDeleteCart from "../btn/btnDeleteCart";
import { useUpdateQuantityFromCart } from "../../hooks/useAuth";

const OrderRow = ({ cart }: { cart: any }) => {
  const [quantity, setQuantity] = useState<number>(cart.quantity);
  const { mutate: updateQuantity } = useUpdateQuantityFromCart();

  useEffect(() => {
    updateCACartProduct();
  }, [quantity]);

  const updateCACartProduct = () => {
    updateQuantity({ id: cart._id, newQuantity: quantity });
  };

  return (
    <div key={cart._id} className='flex gap-4'>
      <div>{cart.productId.title}</div>
      <div>{cart.productId.price}</div>
      <div>{cart.color.title}</div>
      <div>
        {" "}
        <input
          type='number'
          value={quantity}
          onChange={(e: any) => setQuantity(e.target.value)}
        />
      </div>

      <div>{cart.price}</div>
      <BtnDeleteCart id={cart._id} />
    </div>
  );
};

export default OrderRow;
