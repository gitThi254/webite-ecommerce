import React from "react";
import { useBrands } from "../../hooks/useBrand";
import { Link } from "react-router-dom";
import DelBrand from "../Btn/DelBrand";

const ListBrand = () => {
  const { data, isPending, error } = useBrands();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data.map((brand) => (
        <div key={brand._id} className='grid grid-cols-2 w-[400px]'>
          <div>{brand.title}</div>
          <div className='flex gap-10'>
            <Link to={`/brand-list/${brand._id}`}>edit</Link>
            <DelBrand id={brand._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListBrand;
