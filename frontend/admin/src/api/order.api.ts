import axios from "./axios";

export const getOrdersReq = () =>
  axios
    .get("/users/order/get-all-orders")
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
