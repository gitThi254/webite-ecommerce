import React from "react";
import ListBrand from "../../components/layout/ListBrand";
import { Link } from "react-router-dom";

const Brands = () => {
  return (
    <section>
      <div>
        <h1 className='text-2xl text-slate-700 font-bold'>List Brands</h1>
        <Link to='/brand' className='underline'>
          New brand
        </Link>
      </div>
      <div>
        <ListBrand />
      </div>
    </section>
  );
};

export default Brands;
