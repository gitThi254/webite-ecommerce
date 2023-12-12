import { Link } from "react-router-dom";
import { useCoupons } from "../../hooks/useCoupon";
import DelCoupon from "../Btn/DelCoupon";

const changeDateFormat = (date: any) => {
  const newDate = new Date(date).toLocaleDateString();
  let [day, month, year] = newDate.split("/");
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;
  return [year, month, day].join("-");
};

const ListCoupon = () => {
  const { data, isPending, error } = useCoupons();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data?.map((coupon) => (
        <div key={coupon._id} className='grid grid-cols-5 w-[700px]'>
          <div>{coupon.name}</div>
          <div>{coupon.name}</div>
          <div>{new Date(coupon.expiry).toLocaleDateString()}</div>
          <div>{coupon.discount}</div>

          <div className='flex gap-10'>
            <Link to={`/coupon-list/${coupon._id}`}>edit</Link>
            <DelCoupon id={coupon._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCoupon;
