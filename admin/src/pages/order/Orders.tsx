import React from "react";
import { Link } from "react-router-dom";
import ListOrder from "../../components/layout/ListOrder";

const Orders = () => {
  return (
    <div>
      <div>
        <h1 className='text-2xl text-slate-700 font-bold'>List Order</h1>
      </div>
      <div>
        <ListOrder />
      </div>
    </div>
  );
};

export default Orders;
