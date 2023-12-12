import React from "react";
import CreateCustomerForm from "../../components/Form/CreateCustomerForm";

const Customer = () => {
  return (
    <div>
      <div>
        <h1 className='text-2xl text-slate-700 font-bold'>Form Customer</h1>
      </div>
      <div>
        <CreateCustomerForm />
      </div>
    </div>
  );
};

export default Customer;
