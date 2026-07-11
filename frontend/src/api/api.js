import axios from "axios";
import store from "../store/reducers/store";
import { logOutUser } from "../store/actions";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials:true,
});

export const setupInterceptors = (navigate) => {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                store.dispatch(logOutUser(navigate));
            }

            return Promise.reject(error);
        }
    );
};


export default api;