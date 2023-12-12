import React from "react";
import { useBrands } from "../../hooks/useBrand";
import { Link } from "react-router-dom";
import DelBrand from "../Btn/DelBrand";
import { useColors } from "../../hooks/useColor";
import DelColor from "../Btn/DelColor";

const ListColor = () => {
  const { data, isPending, error } = useColors();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data?.map((color) => (
        <div key={color._id} className='grid grid-cols-2 w-[400px]'>
          <div>{color.title}</div>
          <div className='flex gap-10'>
            <Link to={`/color-list/${color._id}`}>edit</Link>
            <DelColor id={color._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListColor;
