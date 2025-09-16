import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://192.168.1.2:3000", // change to your backend base URL
  //timeout: 10000, // optional
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach token if exists
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle 401 (unauthorized)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Optionally: clear token or redirect to login
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("role");
      console.warn("Session expired. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default instance;
