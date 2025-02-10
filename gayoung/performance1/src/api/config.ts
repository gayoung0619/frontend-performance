import axios from "axios";
import { DeleteStorage, GetStorage } from "../utils/storage.ts";

const axiosConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

const axiosAuthConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

const clientAPI = axios.create(axiosConfig);
const authAPI = axios.create(axiosAuthConfig);

authAPI.interceptors.request.use(
    (config) => {
      const token = GetStorage("isUser"); // 매번 요청할 때마다 최신 토큰을 가져옴
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // 헤더에 토큰을 동적으로 설정
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
);

authAPI.interceptors.response.use(
    (res) => {
      if (!(res.status === 200 || res.status === 201)) {
        throw new Error();
      }

      if (res.data.errors) {
        throw new Error(res.data.errors);
      }

      return res.data;
    },
    async (error) => {
      if (error.status === 401) {
        alert("로그인 유지기간이 만료되었습니다. 다시 로그인을 해주세요.");
        DeleteStorage("isUser");
        DeleteStorage("userRefresh");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    },
);

export { authAPI, clientAPI };
