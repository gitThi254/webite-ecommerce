import React from "react";
import CreateBrandForm from "../../components/Form/CreateBrandForm";
import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <div>
      <div>
        <h1>Form Create Brand</h1>
        <Link to='/brand-list'>go to brand-list</Link>
      </div>
      <div>
        <CreateBrandForm />
      </div>
    </div>
  );
};

export default Brand;
