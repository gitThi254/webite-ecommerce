import axios from "./axios";

export const getCouponsReq = (): Promise<Coupon[]> =>
  axios.get("/coupon").then((res) => res.data.data);

export const createCouponReq = (data: Coupon): Promise<Coupon> =>
  axios.post("/coupon", data).then((res) => res.data.data);

export const deleteCouponReq = (id?: string): Promise<Coupon> =>
  axios.delete(`/coupon/${id}`).then((res) => res.data.data);

export const getCouponReq = (id?: string): Promise<Coupon> =>
  axios.get(`/coupon/${id}`).then((res) => res.data.data);

export const updateCouponReq = ({
  id,
  data,
}: {
  id?: string;
  data?: Coupon;
}): Promise<Coupon> =>
  axios.put(`/coupon/${id}`, data).then((res) => res.data.data);
