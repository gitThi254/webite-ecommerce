import axios from "axios";
const base_url = "http://localhost:4000/api/v1/";

const instance = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

export default instance;
