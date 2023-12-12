import React from "react";
import { useBlogs } from "../../hooks/useBlog";
import DelBlog from "../Btn/DelBlog";
import { Link } from "react-router-dom";

const Listblog = () => {
  const { data: blogs, isPending, error } = useBlogs();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <div>
        {blogs?.map((blog) => (
          <div key={blog._id} className='grid grid-cols-4 w-[700px]'>
            <div>{blog.title}</div>
            <div>{blog.description}</div>
            <div>{blog.category}</div>
            <div className='flex gap-5'>
              <Link to={`/blog-list/${blog._id}`}>Edit</Link>
              <DelBlog id={blog._id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Listblog;
