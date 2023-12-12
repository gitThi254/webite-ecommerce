import React from "react";
import CreateBrandForm from "../../components/Form/CreateBrandForm";
import { Link } from "react-router-dom";
import ColorForm from "../../components/Form/ColorForm";

const Color = () => {
  return (
    <div>
      <div>
        <h1>Form Create Color</h1>
        <Link to='/color-list'>go to Color-list</Link>
      </div>
      <div>
        <ColorForm />
      </div>
    </div>
  );
};

export default Color;
