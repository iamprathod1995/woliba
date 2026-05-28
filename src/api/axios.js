import axios from "axios";


const api = axios.create({
  baseURL: "https://dev.api.woliba.io/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;