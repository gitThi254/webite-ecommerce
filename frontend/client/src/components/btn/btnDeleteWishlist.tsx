import { useAddWishlist } from "../../hooks/useProduct";

const BtnDeleteWishlist = ({ id }: { id: string }) => {
  const { mutate: deleteWishlist, isPending } = useAddWishlist();
  return (
    <button onClick={() => deleteWishlist(id)} disabled={isPending}>
      {isPending ? "Loading..." : "Delete"}
    </button>
  );
};

export default BtnDeleteWishlist;
