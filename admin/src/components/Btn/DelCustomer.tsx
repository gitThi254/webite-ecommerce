import { useDelcustomer } from "../../hooks/useAuth";

const DelCustomer = ({ id }: { id: string }) => {
  const { mutate: delCustomerMutation, isPending } = useDelcustomer();

  return (
    <button onClick={() => delCustomerMutation(id)} disabled={isPending}>
      {isPending ? "Loading..." : "Delete"}
    </button>
  );
};

export default DelCustomer;
