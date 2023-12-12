import React from "react";
import { useDelBrand } from "../../hooks/useBrand";
import { useDelCategory } from "../../hooks/useCategory";

const DelCategory = ({ id }: { id?: string }) => {
  const { mutate: deleteCategoryMutation, isPending } = useDelCategory();

  return (
    <button onClick={() => deleteCategoryMutation(id)} disabled={isPending}>
      {isPending ? "Loading..." : "Delete"}
    </button>
  );
};

export default DelCategory;
