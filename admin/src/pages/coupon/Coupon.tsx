import React from "react";
import CreateBrandForm from "../../components/Form/CreateBrandForm";
import { Link } from "react-router-dom";
import CouponForm from "../../components/Form/CouponForm";

const Coupon = () => {
  return (
    <div>
      <div>
        <h1>Form Create Coupon</h1>
        <Link to='/coupon-list'>go to Coupon-list</Link>
      </div>
      <div>
        <CouponForm />
      </div>
    </div>
  );
};

export default Coupon;
