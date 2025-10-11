import { useAuth } from "@/hooks/use-context";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
});

export const axiosPrivate = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    withCredentials: true,
});

export const axiosPublic = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { "Content-Type": "application/json" },
});