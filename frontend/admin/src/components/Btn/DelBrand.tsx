import React from "react";
import { useDelBrand } from "../../hooks/useBrand";

const DelBrand = ({ id }: { id?: string }) => {
  const { mutate: deleteBrandMutation, isPending } = useDelBrand();

  return (
    <button onClick={() => deleteBrandMutation(id)} disabled={isPending}>
      {isPending ? "Loading..." : "Delete"}
    </button>
  );
};

export default DelBrand;
