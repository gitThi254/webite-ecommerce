import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaCoupon } from "../../schemas/schemasForm";
import { useCreateCoupon, useUpdateCoupon } from "../../hooks/useCoupon";

const changeDateFormat = (date: Date) => {
  const newDate = new Date(date).toLocaleDateString();
  let [day, month, year] = newDate.split("/");
  day = Number(day) < 10 ? `0${day}` : day;
  month = Number(month) < 10 ? `0${month}` : month;
  return [year, day, month].join("-");
};

const CouponForm = ({ coupon }: { coupon?: Coupon }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Coupon>({
    defaultValues: coupon
      ? { ...coupon, expiry: changeDateFormat(coupon?.expiry) }
      : {
          name: "",
          expiry: undefined,
          discount: undefined,
        },
    resolver: yupResolver(schemaCoupon),
  });
  const {
    mutate: CreateColorMutation,
    isPending: penC,
    error,
  } = useCreateCoupon();
  const {
    mutate: updateColorMutation,
    isPending: penU,
    error: errorU,
  } = useUpdateCoupon();

  const onSubmit = (data: Coupon) => {
    if (coupon) {
      updateColorMutation({ id: data._id, data });
    } else {
      CreateColorMutation(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>{error?.message}</span>
      <span>{errorU?.message}</span>
      <div>
        <input type='text' placeholder='Enter a name' {...register("name")} />
        <div>{errors?.name?.message}</div>
      </div>
      <div>
        <input type='date' {...register("expiry")} />
      </div>
      <div>
        <input
          type='number'
          placeholder='Enter a discount'
          {...register("discount")}
        />
        <div>{errors?.discount?.message}</div>
      </div>
      <button disabled={!isValid || !isDirty || penC || penU}>
        {penC || penU ? "Loading..." : coupon ? "Update Coupon" : "New Coupon"}
      </button>
    </form>
  );
};

export default CouponForm;
