import { axiosPublic, axiosInstance } from "./api";

export const getUsuarios = async () => {
    const response = await axiosPublic.get("/usuarios");
    return response.data;
};

export const getUsuario = async (uuid: string) => {
    const response = await axiosPublic.get(`/usuarios/${uuid}`);
    return response.data;
}

export const createUsuario = async (data: any) => {
    const response = await axiosInstance.post("/register", data);
    return response.data;
};

export const updateUsuario = async (codsis: number, data: any) => {
    const response = await axiosInstance.put(`/usuarios/${codsis}`, data);
    return response.data;
};

export const deleteUsuario = async (codsis: number) => {
    const response = await axiosInstance.delete(`/usuarios/${codsis}`);
    return response.data;
};

export const login = async (data: any) => {
    const response = await axiosPublic.post("/login", data);
    return response.data;
};