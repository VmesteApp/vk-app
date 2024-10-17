import axios from "axios";
import { BASE_URL, VMESTE_ACCESS_TOKEN } from "../constants";
import { authorize, getStorageValue } from "../utils";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getStorageValue(VMESTE_ACCESS_TOKEN);
  if (!token) {
    return config;
  }

  config.headers.authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authorize();
        return api.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);

export default api;
