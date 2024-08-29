import axios from "axios";
import "dotenv";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
