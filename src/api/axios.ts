import { AUTH_TOKEN } from '@/data/localStorage';
import axios, { InternalAxiosRequestConfig } from 'axios';
const API = import.meta.env.VITE_APP_API;
const baseURL = '/graphql';
const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.NODE_ENV === 'production' ? API : baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      const token = localStorage.getItem(AUTH_TOKEN);
      config!.headers!.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};




export default fetchClient();