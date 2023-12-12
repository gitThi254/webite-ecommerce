import React from "react";
import ListCustomers from "../../components/layout/ListCustomers";

const Customers = () => {
  return (
    <div>
      <div>
        <h1 className='text-2xl text-slate-700 font-bold'>List Customers</h1>
      </div>
      <div>
        <ListCustomers />
      </div>
    </div>
  );
};

export default Customers;
