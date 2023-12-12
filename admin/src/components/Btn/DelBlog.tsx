import { useDelBlog } from "../../hooks/useBlog";

const DelBlog = ({ id }: { id?: string }) => {
  const { mutate: deleteBlogMutation, isPending } = useDelBlog();

  return (
    <button onClick={() => deleteBlogMutation(id)} disabled={isPending}>
      {isPending ? "Loading..." : "Delete"}
    </button>
  );
};

export default DelBlog;
