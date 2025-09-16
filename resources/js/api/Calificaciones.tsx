import { axiosPublic, axiosInstance } from "./api";

export const getCalificaciones = async () => {
    const response = await axiosPublic.get("/calificaciones");
    return response.data;
};

export const getCalificacion = async (area: string) => {
    const response = await axiosPublic.get(`/calificaciones/${area}`);
    return response.data;
};

export const getCalificacionesByArea = async (area: string) => {
    const response = await axiosPublic.get(`/calificaciones/${area}`);
    return response.data;
}

export const getCalificacionesByFase = async (area: string, fase: string) => {
    const response = await axiosPublic.get(`/calificaciones/${area}/${fase}`);
    return response.data;
}

export const getCalificacionesByOlimpista = async (nombre: string) => {
    const response = await axiosPublic.get(`/calificaciones/${nombre}`);
    return response.data;
}

export const createCalificacion = async (data: any) => {
    const response = await axiosInstance.post("/calificaciones", data);
    return response.data;
};

export const updateCalificacion = async (codsis: number, data: any) => {
    const response = await axiosInstance.put(`/calificaciones/${codsis}`, data);
    return response.data;
};
