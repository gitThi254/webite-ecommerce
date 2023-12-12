import { useDelCoupon } from "../../hooks/useCoupon";

const DelCoupon = ({ id }: { id?: string }) => {
  const { mutate: deleteCouponMutation, isPending } = useDelCoupon();

  return (
    <button onClick={() => deleteCouponMutation(id)} disabled={isPending}>
      {isPending ? "Loading..." : "Delete"}
    </button>
  );
};

export default DelCoupon;
