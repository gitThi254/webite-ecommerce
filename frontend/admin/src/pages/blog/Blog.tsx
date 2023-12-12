import React, { useEffect } from "react";
import BlogForm from "../../components/Form/BlogForm";
import { Link, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Blog = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  useEffect(() => {
    if (pathname === "blog") {
      queryClient.setQueryData(["images"], null);
    }
  }, [pathname]);
  return (
    <div>
      <div>Form Create Blog</div>
      <Link to='/blog-list'>go to blog</Link>
      <div>
        <BlogForm />
      </div>
    </div>
  );
};

export default Blog;
