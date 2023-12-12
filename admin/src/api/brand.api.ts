import axios from "./axios";

export const getBrandsReq = (): Promise<Brand[]> =>
  axios.get("/brand").then((res) => res.data.data);

export const createBrandReq = (data: Brand): Promise<Brand> =>
  axios.post("/brand", data).then((res) => res.data.data);

export const deleteBrandReq = (id?: string): Promise<Brand> =>
  axios.delete(`/brand/${id}`).then((res) => res.data.data);

export const getBrandReq = (id?: string): Promise<Brand> =>
  axios.get(`/brand/${id}`).then((res) => res.data.data);

export const updateBrandReq = ({
  id,
  data,
}: {
  id?: string;
  data?: Brand;
}): Promise<Brand> =>
  axios.put(`/brand/${id}`, data).then((res) => res.data.data);
