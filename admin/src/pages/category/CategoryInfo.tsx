import React from "react";
import { Link, useParams } from "react-router-dom";
import { useBrand } from "../../hooks/useBrand";
import { useCategory } from "../../hooks/useCategory";
import CategoryForm from "../../components/Form/CategoryForm";

const CategoryInfo = () => {
  const { id } = useParams();
  const { data: category, isPending, error } = useCategory(id);
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <div>
        <Link to='/category-list'>go to category list</Link>
        <div>Form update category</div>
      </div>
      <div>
        <CategoryForm Category={category} />
      </div>
    </div>
  );
};

export default CategoryInfo;
