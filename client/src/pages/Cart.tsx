import { useCarts } from "../hooks/useAuth";
import BtnEmptyCart from "../components/btn/btnEmptyCart";
import OrderRow from "../components/layout/OrderRow";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { data: carts, isPending, error } = useCarts();
  const [totalsum, setTotalSum] = useState<number>(0);
  useEffect(() => {
    let sum = 0;
    const sumWithInitial = carts?.reduce(
      (acc: number, curr: any) => acc + curr.price,
      sum
    );
    setTotalSum(sumWithInitial);
  }, [carts]);
  //   const [quantity, setQuantity] = useState<number>(cart.quantity);
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {carts?.map((cart: any) => (
        <OrderRow cart={cart} key={cart._id} />
      ))}
      <div>totals: {totalsum}</div>
      <Link to='/checkout'>Checkout</Link>
      <BtnEmptyCart />
    </div>
  );
};

export default Cart;
