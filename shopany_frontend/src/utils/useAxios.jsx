import axios from "axios";

const BASEURL = "http://localhost:8000/";

const axiosInstance = axios.create({
  baseURL: BASEURL,

  headers: { Accept: "application/json" },
});

export const axiosFormInstance = axios.create({
  baseURL: BASEURL,

  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});


export default axiosInstance;
