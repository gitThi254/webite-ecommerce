import React from "react";
import ListBrand from "../../components/layout/ListBrand";
import { Link } from "react-router-dom";
import ListCoupon from "../../components/layout/ListCoupon";

const Coupons = () => {
  return (
    <section>
      <div>
        <h1 className='text-2xl text-slate-700 font-bold'>List Coupons</h1>
        <Link to='/coupon' className='underline'>
          New Coupon
        </Link>
      </div>
      <div>
        <ListCoupon />
      </div>
    </section>
  );
};

export default Coupons;
