import axios from "axios";
import store from "../store/reducers/store";
import { logOutUser } from "../store/actions";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
});

api.interceptors.request.use((config) => {
    const stored = localStorage.getItem("auth");
    if (stored) {
        const { token } = JSON.parse(stored);
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config?.skipAuthRedirect) {
            store.dispatch(logOutUser());
        }
        return Promise.reject(error);
    }
);

export default api;