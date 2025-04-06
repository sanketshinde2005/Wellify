import axios from "axios";

export const axiosInstanceml = axios.create({
    baseURL: "http://127.0.0.1:5001/api",
    withCredentials: true,
});
