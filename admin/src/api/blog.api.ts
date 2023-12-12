import axios from "./axios";

export const getBlogsReq = (): Promise<Blog[]> =>
  axios.get("/blogs").then((res) => res.data.data);

export const createBlogReq = (data: Blog): Promise<Blog> =>
  axios.post("/blogs", data).then((res) => res.data.data);

export const deleteBlogReq = (id?: string): Promise<Blog> =>
  axios.delete(`/blogs/${id}`).then((res) => res.data.data);

export const getBlogReq = (id?: string): Promise<Blog> =>
  axios.get(`/blogs/${id}`).then((res) => res.data.data);

export const updateBlogReq = ({
  id,
  data,
}: {
  id?: string;
  data?: Blog;
}): Promise<Blog> =>
  axios.put(`/blogs/${id}`, data).then((res) => res.data.data);
