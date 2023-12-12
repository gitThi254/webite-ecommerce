import { Link, useParams } from "react-router-dom";
import { useBlog } from "../../hooks/useBlog";
import BlogForm from "../../components/Form/BlogForm";
import { useQueryClient } from "@tanstack/react-query";

const BlogInfo = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: blog, isPending, error } = useBlog(id);
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  if (blog) {
    queryClient.setQueryData(["images"], blog.images);
  }

  return (
    <div>
      <div>
        <Link to='/blog-list'>go to blog list</Link>
        <div>Form update blog</div>
      </div>
      <div>
        <BlogForm Blog={blog} />
      </div>
    </div>
  );
};

export default BlogInfo;
