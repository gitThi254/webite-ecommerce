import axios from "./axios";

export const uploadImg = async (data: any) => {
  const formData = new FormData();
  for (let i = 0; i < data.length; i++) {
    formData.append("images", data[i]);
  }
  const res = await axios
    .post("upload/", formData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};

export const deleteImg = async (id: string) => {
  const res = await axios
    .delete(`upload/delete-img/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => console.log(err));

  return res;
};
