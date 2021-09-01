import axios from "axios";

const instance = axios.create({
  // baseURL: "http://159.65.233.187/",
  baseURL: "http://159.65.233.187/api/",
  // baseURL: "http://zarbonbackend.backoffice.uz/api/",
});

export default instance;
