import React from "react";
import { useCustomers } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import DelCustomer from "../Btn/DelCustomer";

const ListCustomers = () => {
  const { data: customers, isLoading, error, isError } = useCustomers();
  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>{error.message}</p>;
  return (
    <div>
      <div>
        <Link to='/customer' className='underline'>
          new Customer
        </Link>
      </div>
      {customers ? (
        <>
          {customers.map((customer: Customer) => (
            <div key={customer._id} className='grid grid-cols-4 w-[700px]'>
              <div>
                <Link to={`/customer/${customer._id}`}>
                  {customer.firstname + " " + customer.lastname}
                </Link>
              </div>
              <div>{customer.email}</div>
              <div>{customer.mobile}</div>
              <div className='flex gap-10'>
                <Link to={`/customer-list/${customer._id}`}>Edit</Link>
                <DelCustomer id={customer._id} />
              </div>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default ListCustomers;
