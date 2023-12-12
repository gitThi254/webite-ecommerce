import { useDelBlogCategory } from "../../hooks/useBlogCategory";
import { useDelCategory } from "../../hooks/useCategory";

const DelBlogCategory = ({ id }: { id?: string }) => {
  const { mutate: deleteBlogCategoryMutation, isPending } =
    useDelBlogCategory();

  return (
    <button onClick={() => deleteBlogCategoryMutation(id)} disabled={isPending}>
      {isPending ? "Loading..." : "Delete"}
    </button>
  );
};

export default DelBlogCategory;
