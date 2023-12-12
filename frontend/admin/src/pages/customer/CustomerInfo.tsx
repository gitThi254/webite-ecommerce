import { Link, useLocation, useParams } from "react-router-dom";
import { useCustomer } from "../../hooks/useAuth";
import CreateCustomerForm from "../../components/Form/CreateCustomerForm";

const CustomerInfo = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const { id } = useParams();
  const { data: customer, isLoading, isError, error } = useCustomer(id);
  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (pathname === "customer-list") {
    return (
      <>
        <CreateCustomerForm customer={customer} />
      </>
    );
  }
  return (
    <div>
      <Link to='/customer-list'>go to list Customer</Link>

      <div>
        <h1>{customer?.firstname + " " + customer?.lastname}</h1>
        <h5>{customer?.email}</h5>
        <h4>{customer?.mobile}</h4>
      </div>
    </div>
  );
};

export default CustomerInfo;
