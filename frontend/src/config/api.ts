import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("💀 ~ BASE_URL:", BASE_URL)

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status !== 401 ||
      originalRequest._retry ||
      error.response.data?.code !== "auth/invalid-access-token"
    ) {
      return Promise.reject(error);
    }

    if (originalRequest.url === "/auth/refresh") {
      setAccessToken(null);
      return;
    }

    originalRequest._retry = true;

    try {
      const response = await api.post("/auth/refresh");
      const newAccessToken = response.data.token;
      setAccessToken(newAccessToken);
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);
      return Promise.reject(refreshError);
    }
  }
);
export default api;
