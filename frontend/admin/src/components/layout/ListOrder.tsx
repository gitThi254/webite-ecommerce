import React from "react";
import { useOders } from "../../hooks/useOrder";

const ListOrder = () => {
  const { data: orders, isPending, error } = useOders();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {orders?.map((order: any) => (
        <div key={orders._id}>
          {order?.products?.map((i: any, j: number) => {
            return (
              <div key={j} className='grid grid-cols-7 gap-2'>
                <div>
                  {order.orderby.firstname + " " + order.orderby.lastname}
                </div>
                <div>{i.product.title}</div>
                <div>{i.color.title}</div>
                <div>{i.count}</div>
                <div>{order.paymentIntent.amount}</div>
                <div>{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ListOrder;
