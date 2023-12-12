import React, { useEffect, useState } from "react";
import { useCarts } from "../hooks/useAuth";
import ShippingAddress from "../components/form/ShippingAddress";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { data: carts, isPending, error } = useCarts();
  const [totalsum, setTotalSum] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(5);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayOrderId: "",
    razorpayPaymentId: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>({
    defaultValues: {
      firstname: "",
      lastname: "",
      city: "",
      country: "",
      address: "",
      pincode: "",
      other: "",
      zipcode: "",
      state: "",
    },
  });
  const onSubmit = (data: ShippingAddress) => {
    checkOutHanlder();
    console.log(paymentInfo);
  };

  useEffect(() => {
    let sum = 0;
    const sumWithInitial = carts?.reduce(
      (acc: number, curr: any) => acc + curr.price,
      sum
    );
    setTotalSum(sumWithInitial);
  }, [carts]);

  const loadScript = (src: any) => {
    return new Promise((resolve: any) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve: false;
      };
      document.body.appendChild(script);
    });
  };

  const checkOutHanlder = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay $DK faild to load");
    }
    const result = await axios.post(
      "http://localhost:4000/api/v1/users/order/checkout",
      {},
      { withCredentials: true }
    );
    if (!result) {
      alert("Something Went Wrong!");
      return;
    }
    const { amount, id: order_id, currency } = result.data.order;
    const options = {
      key: "rzp_test_ZQBO59H8gt0oCf", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Developer's cover",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response: any) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios
          .post(
            "http://localhost:4000/api/v1/users/order/paymentVerification",
            data
          )
          .catch((err) => console.log(err));

        setPaymentInfo({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        });
      },
      prefill: {
        name: "Dev Thi",
        email: "thinguyen01683@example.com",
        contact: "0394946906",
      },
      notes: {
        address: "Developer's Corner Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className='flex container mx-auto'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col items-start'
      >
        <select value='' {...register("country")}>
          <option value=''>--select Country--</option>
          <option value='Viet Nam'>Viet Nam</option>
        </select>
        <input
          type='text'
          placeholder='First Name'
          {...register("firstname")}
        />
        <input type='text' placeholder='Last Name' {...register("lastname")} />
        <input type='text' placeholder='Address' {...register("address")} />
        <input
          type='text'
          placeholder='Apartment, Suite, etc'
          {...register("other")}
        />
        <input type='text' placeholder='City' {...register("city")} />
        <input type='text' placeholder='Zipcode' {...register("zipcode")} />
        <select {...register("state")}>
          <option value=''>--select State--</option>
          <option value='THI'>THI</option>
        </select>
        <Link to='/cart'>return to cart</Link>
        <button>Place Order</button>
      </form>
      <div className='flex flex-col gap-4'>
        {carts?.map((cart: any) => (
          <div key={cart._id} className='flex gap-10'>
            <div className='w-[50px] h-[50px]'>
              <img
                src={cart.productId.images[0].url}
                alt='product'
                className='w-full h-full'
              />
            </div>
            <div>$ {cart.price}</div>
          </div>
        ))}
        <div>subTotal : ${totalsum}</div>
        <div>Shipping : ${shipping}</div>
        <div>Total : ${totalsum + shipping}</div>
      </div>
    </div>
  );
};

export default Checkout;
