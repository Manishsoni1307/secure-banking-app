import axios from "axios";

console.log("API URL =", import.meta.env.VITE_API_URL);

const API = axios.create({

 baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  },
);

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData); //  Fixed
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials); //  Fixed
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/auth/logout"); //  Fixed
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/auth/profile"); //  Fixed
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await API.put("/auth/profile", userData);
  return response.data;
};

export const getAccounts = async () => {
  const response = await API.get("/accounts");
  return response.data;
};

export const getAccountById = async (id) => {
  const response = await API.get(`/accounts/${id}`);
  return response.data;
};

export const depositMoney = async (depositData) => {
  const response = await API.post("/transactions/deposit", depositData);
  return response.data;
};

export const transferMoney = async (transferData) => {
  const response = await API.post("/transactions/transfer", transferData);
  return response.data;
};

export const getTransactions = async () => {
  const response = await API.get("/transactions");
  return response.data;
};

export default API;
