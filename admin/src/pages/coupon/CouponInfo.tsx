import { Link, useParams } from "react-router-dom";
import CouponForm from "../../components/Form/CouponForm";
import { useCoupon } from "../../hooks/useCoupon";

const CouponInfo = () => {
  const { id } = useParams();
  const { data: coupon, isPending, error } = useCoupon(id);
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <div>
        <Link to='/coupon-list'>go to coupon list</Link>
        <div>Form update coupon</div>
      </div>
      <div>
        <CouponForm coupon={coupon} />
      </div>
    </div>
  );
};

export default CouponInfo;
