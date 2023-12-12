import React from "react";
import ListBrand from "../../components/layout/ListBrand";
import { Link } from "react-router-dom";
import CategoryForm from "../../components/Form/CategoryForm";

const Category = () => {
  return (
    <section>
      <div>
        <h1 className='text-2xl text-slate-700 font-bold'>
          Form create category
        </h1>
        <Link to='/category-list' className='underline'>
          go to category list
        </Link>
      </div>
      <div>
        <CategoryForm />
      </div>
    </section>
  );
};

export default Category;
