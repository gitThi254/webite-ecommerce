import React from "react";
import { useLogout, useVerify } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Menu = () => {
  const { data: user } = useVerify();
  const { mutate: logoutMutation } = useLogout();
  return (
    <div className='flex justify-between p-5 container mx-auto'>
      <div>
        <Link to='/'>Logo</Link>
      </div>
      <div className='flex gap-10'>
        {user && (
          <>
            <div>
              <div className='flex gap-4'>
                <Link to='/customer-list'>customers</Link>
                <Link to='/brand-list'>brands</Link>
                <Link to='/category-list'>categories</Link>
                <Link to='/blog-category-list'>blog categories</Link>
                <Link to='/order-list'>orders</Link>
                <Link to='/coupon-list'>coupons</Link>
                <Link to='/color-list'>colors</Link>
                <Link to='/blog-list'>blogs</Link>
                <Link to='/product-list'>products</Link>
              </div>
            </div>
            <div>
              <div>{user.firstname}</div>
              <div>
                <button onClick={() => logoutMutation()}>Logout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
