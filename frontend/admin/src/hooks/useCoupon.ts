import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import {
  createCouponReq,
  deleteCouponReq,
  getCouponReq,
  getCouponsReq,
  updateCouponReq,
} from "../api/coupon.api";
import { toast } from "react-toastify";

export const useCoupons = () => {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: getCouponsReq,
  });
};

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createCouponReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Coupon[]>(["coupons"], (old) => {
        old?.push(data);
        return old;
      });
      toast.success("coupon create Successfullly!");

      navigate("/Coupon-list");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useDelCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCouponReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Coupon[]>(["coupons"], (old) => {
        return old?.filter((Coupon) => Coupon._id !== data._id);
      });
      toast.success("coupon delete Successfullly!");
    },
    onError: (error: any) => {
      error.message = error.response?.data;
    },
  });
};

export const useCoupon = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Coupons", id],
    queryFn: () => getCouponReq(id),
    initialData: () =>
      queryClient
        .getQueryData<Coupon[]>(["coupons"])
        ?.find((Coupon) => Coupon._id === id),
  });
};

export const useUpdateCoupon = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCouponReq,
    onSuccess: (data) => {
      queryClient.setQueryData<Coupon[]>(["coupons"], (old) =>
        old?.map((Coupon) => (Coupon._id === data._id ? { ...data } : Coupon))
      );
      queryClient.setQueryData(["Coupons", data._id], data);
      toast.success("coupon update Successfullly!");

      navigate("/Coupon-list");
    },
    onError: (error: any) => {
      error.message = error.response.data;
    },
  });
};
