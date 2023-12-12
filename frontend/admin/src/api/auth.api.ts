import axios from "./axios";

export const loginReq = (data: Login) =>
  axios.post("users/login-admin", data).then((res) => res.data.data);

export const verifyReq = async () =>
  axios.get("/users/verify").then((res) => {
    return res.data;
  });

export const registerReq = async (data: newCustomer) =>
  axios.post("/users/register", data).then((res) => res.data.data);

export const getCustomer = async (id?: string): Promise<Customer> =>
  axios.get(`/users/${id}`).then((res) => res.data.data);

export const updateCustomerReq = async ({
  id,
  data,
}: {
  id: string;
  data: newCustomer;
}): Promise<Customer> => {
  return axios
    .put(`/users/${id}`, data)
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};

export const logoutReq = async () =>
  axios.post("/users/logout").then((res) => {
    return res.data;
  });

export const getAllCustomer = async (): Promise<Customer[]> =>
  axios.get("/users/all-users").then((res) => {
    return res.data.data;
  });

export const deleteCustomerReq = async (id: string) =>
  axios.delete(`users/${id}`).then((res) => res.data.data);
