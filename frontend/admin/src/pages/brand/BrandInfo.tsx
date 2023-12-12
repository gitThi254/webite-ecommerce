import React from "react";
import { Link, useParams } from "react-router-dom";
import { useBrand } from "../../hooks/useBrand";
import CreateBrandForm from "../../components/Form/CreateBrandForm";

const BrandInfo = () => {
  const { id } = useParams();
  const { data: brand, isPending, error } = useBrand(id);
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <div>
        <Link to='/brand-list'>go to brand list</Link>
        <div>Form update Brand</div>
      </div>
      <div>
        <CreateBrandForm brand={brand} />
      </div>
    </div>
  );
};

export default BrandInfo;
