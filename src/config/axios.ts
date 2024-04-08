/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLocalStorage, setStorageData } from "@/utils/storage";
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
interface MyAxiosInstance extends AxiosInstance {
  setToken: (token: string) => void;
}

function refreshToken() {
  return instance.get("/auth/refreshToken").then((res) => res.data);
}

const BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}/`,
  withCredentials: true,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
}) as MyAxiosInstance;

instance.setToken = (token: string) => {
  setStorageData("accessToken", token);
};
const ISSERVER = typeof window === "undefined";

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!ISSERVER) {
      const token = getLocalStorage("accessToken");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  },
);
let isRefreshing = false;
let requests: ((token: string) => void)[] = [];
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { statusCode, message } = response.data;
    const config = response.config || {};
    if (
      statusCode === 200 &&
      message === "token_expired" &&
      !config?.url?.includes("/auth/refreshToken")
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken()
          .then((res) => {
            const { accessToken = null } = res;
            instance.setToken(accessToken);
            if (config.headers) {
              config.headers.Authorization = `Bearer ${accessToken}`;
            }
            requests.forEach((cb: any) => cb(accessToken));
            requests = [];
            return instance(config);
          })
          .catch((_res) => {
            window.location.href = "/";
            return Promise.reject("Redirecting to login page");
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        return new Promise((resolve) => {
          requests.push((accessToken: string) => {
            config.baseURL = "";
            if (config.headers) {
              config.headers.Authorization = `Bearer ${accessToken}`;
            }
            resolve(instance(config));
          });
        });
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
