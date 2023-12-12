import axios from "./axios";

export const getCategoriesReq = (): Promise<Category[]> =>
  axios.get("/categories").then((res) => res.data.data);

export const createCategoryReq = (data: Category): Promise<Category> =>
  axios.post("/categories", data).then((res) => res.data.data);

export const deleteCategoryReq = (id?: string): Promise<Category> =>
  axios.delete(`/categories/${id}`).then((res) => res.data.data);

export const getCategoryReq = (id?: string): Promise<Category> =>
  axios.get(`/categories/${id}`).then((res) => res.data.data);

export const updateCategoryReq = ({
  id,
  data,
}: {
  id?: string;
  data?: Category;
}): Promise<Category> =>
  axios.put(`/categories/${id}`, data).then((res) => res.data.data);
