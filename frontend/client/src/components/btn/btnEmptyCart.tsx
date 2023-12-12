import React from "react";
import { useEmptyCart } from "../../hooks/useAuth";

const BtnEmptyCart = () => {
  const { mutate: emptyCart, isPending } = useEmptyCart();
  return (
    <button onClick={() => emptyCart()} disabled={isPending}>
      {isPending ? "Loading..." : "delete all"}
    </button>
  );
};

export default BtnEmptyCart;
