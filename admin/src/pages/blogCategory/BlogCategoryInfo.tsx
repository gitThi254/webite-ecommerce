import React from "react";
import { Link, useParams } from "react-router-dom";
import { useBrand } from "../../hooks/useBrand";
import { useCategory } from "../../hooks/useCategory";
import CategoryForm from "../../components/Form/CategoryForm";
import { useBlogCategory } from "../../hooks/useBlogCategory";
import BlogCategoryForm from "../../components/Form/BlogCategoryForm";

const BlogCategoryInfo = () => {
  const { id } = useParams();
  const { data: blogCategories, isPending, error } = useBlogCategory(id);
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <div>
        <Link to='/category-list'>go to category list</Link>
        <div>Form update category</div>
      </div>
      <div>
        <BlogCategoryForm BlogCategory={blogCategories} />
      </div>
    </div>
  );
};

export default BlogCategoryInfo;
