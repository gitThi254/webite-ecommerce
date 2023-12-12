import React from "react";
import ListBrand from "../../components/layout/ListBrand";
import { Link } from "react-router-dom";
import ColorForm from "../../components/Form/ColorForm";
import ListColor from "../../components/layout/ListColor";

const Colors = () => {
  return (
    <section>
      <div>
        <h1 className='text-2xl text-slate-700 font-bold'>List Colors</h1>
        <Link to='/color' className='underline'>
          new Color
        </Link>
      </div>
      <div>
        <ListColor />
      </div>
    </section>
  );
};

export default Colors;
