import { useDeleteCart } from "../../hooks/useAuth";

const BtnDeleteCart = ({ id }: { id: string }) => {
  const { mutate: deleteCart, isPending } = useDeleteCart();
  return (
    <button onClick={() => deleteCart(id)} disabled={isPending}>
      {isPending ? "loading..." : "Delete"}
    </button>
  );
};

export default BtnDeleteCart;
