import { axiosPublic, axiosInstance } from "./api";

export const getClasificaciones = async () => {
    const response = await axiosPublic.get("/clasificaciones");
    return response.data;
};

export const getClasificacionesByArea = async (area: string) => {
    const response = await axiosPublic.get(`/clasificaciones/${area}`);
    return response.data;
};

export const getClasificacionesByFase = async (area: string, fase: string) => {
    const response = await axiosPublic.get(`/clasificaciones/${area}/${fase}`);
    return response.data;
};
