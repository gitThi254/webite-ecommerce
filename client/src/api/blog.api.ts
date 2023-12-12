import axios from "./axios";

export const getBlogsReq = async () =>
  await axios
    .get("blogs")
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => console.log(err));

export const getBlogReq = async (id?: string) =>
  await axios.get(`blogs/${id}`).then((res) => res.data.data);

export const likesReq = async (id?: string) =>
  await axios.put("blogs/likes", { blogId: id }).then((res) => {
    return res.data.data;
  });

export const dislikesReq = async (id?: string) =>
  await axios
    .put("blogs/dislikes", { blogId: id })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => console.log(err));
