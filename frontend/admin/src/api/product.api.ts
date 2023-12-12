import axios from "./axios";
export const getProducts = (): Promise<Product[]> =>
  axios.get("/products").then((res) => res.data.data);

export const createProduct = (data: Product): Promise<Product> =>
  axios.post("/products", data).then((res) => res.data.data);

export const getProductReq = (id?: string): Promise<Product> =>
  axios.get(`/products/${id}`).then((res) => res.data.data);

export const updateProductReq = ({
  id,
  data,
}: {
  id?: string;
  data?: Product;
}): Promise<Product> =>
  axios.put(`/products/${id}`, data).then((res) => res.data.data);
