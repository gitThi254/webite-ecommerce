import React from "react";
import { Link, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { useQueryClient } from "@tanstack/react-query";

const BlogInfo = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: blog, isPending, error } = useBlog(id);
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (blog) {
    queryClient.setQueryData(["blogs"], (old: any) =>
      old.map((item: any) => (item._id === blog._id ? { ...blog } : item))
    );
  }
  return (
    <div>
      <Link to='/blog'>go to blog</Link>
      <div>
        {blog.images.map((image: any) => (
          <div
            className='w-[300px] h-[300px] border border-1 border-slate-800'
            key={image._id}
          >
            <img
              src={image.url}
              alt='image '
              className='flex object-contain w-full h-full'
            />
          </div>
        ))}
      </div>
      <div>{blog.title}</div>
      <div>{blog.description}</div>
      <div>{blog.category}</div>
    </div>
  );
};

export default BlogInfo;
