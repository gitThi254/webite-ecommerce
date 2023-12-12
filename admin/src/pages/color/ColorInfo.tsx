import React from "react";
import { Link, useParams } from "react-router-dom";
import { useBrand } from "../../hooks/useBrand";
import CreateBrandForm from "../../components/Form/CreateBrandForm";
import { useColor } from "../../hooks/useColor";
import ColorForm from "../../components/Form/ColorForm";

const ColorInfo = () => {
  const { id } = useParams();
  const { data: color, isPending, error } = useColor(id);
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <div>
        <Link to='/color-list'>go to color list</Link>
        <div>Form update color</div>
      </div>
      <div>
        <ColorForm Color={color} />
      </div>
    </div>
  );
};

export default ColorInfo;
