import axios from "axios";

// export const baseURL = "http://localhost:3008";
export const baseURL = "https://api.totfd.in";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;