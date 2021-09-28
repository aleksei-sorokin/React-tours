import axios from "axios";

const api = axios.create({
    timeout: 5 * 60 * 1000,
    baseURL: "./tours.json",
});

export default api;
