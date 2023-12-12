import axios from "./axios";

export const getBlogCategoriesReq = (): Promise<Category[]> =>
  axios.get("/blogcategories").then((res) => res.data.data);

export const createBlogCategoryReq = (data: Category): Promise<Category> =>
  axios.post("/blogcategories", data).then((res) => res.data.data);

export const deleteBlogCategoryReq = (id?: string): Promise<Category> =>
  axios.delete(`/blogcategories/${id}`).then((res) => res.data.data);

export const getBlogCategoryReq = (id?: string): Promise<Category> =>
  axios.get(`/blogcategories/${id}`).then((res) => res.data.data);

export const updateBlogCategoryReq = ({
  id,
  data,
}: {
  id?: string;
  data?: Category;
}): Promise<Category> =>
  axios.put(`/blogcategories/${id}`, data).then((res) => res.data.data);
