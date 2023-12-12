import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { addtocartSchema } from "../../schemas/formSchema";
import { useAddtoCart } from "../../hooks/useAuth";

const AddtoCart = ({ color, id }: { color: any; id?: string }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Cart>({
    defaultValues: {
      productId: id,
      color: "",
      quantity: undefined,
    },
    resolver: yupResolver(addtocartSchema),
  });
  const { mutate: addToCartMutation, isPending } = useAddtoCart();

  const onSubmit = (data: Cart) => {
    setValue("productId", id);
    addToCartMutation(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        Quantity:{" "}
        <input
          type='number'
          placeholder='Quantity'
          {...register("quantity")}
          value={color._id}
        />
        <div>{errors.quantity?.message}</div>
      </div>
      <div className='flex gap-3'>
        {color?.map((color: any) => (
          <div key={color._id}>
            <input type='radio' {...register("color")} value={color._id} />{" "}
            {color.title}
          </div>
        ))}
        <div>{errors.color?.message}</div>
      </div>
      <button disabled={isPending}>
        {isPending ? "Loading..." : "Add to cart"}
      </button>
    </form>
  );
};

export default AddtoCart;
