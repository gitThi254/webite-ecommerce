import axios from "./axios";
export const getProducts = (): Promise<Product[]> =>
  axios.get("/products").then((res) => res.data.data);

export const addWishlistReq = (id?: string) =>
  axios
    .put(`products/wishlist`, { productId: id })
    .then((res) => res.data.data);

export const getProduct = (id?: string): Promise<Product> => {
  console.log(id);
  return axios.get(`/products/${id}`).then((res) => res.data.data);
};
