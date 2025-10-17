import { axiosPublic } from "./api";

export const getClasificacionesByArea = async () => {
    const { data } = await axiosPublic.get("/clasificaciones/area");
    return data.data;
};

export const getClasificacionesByNivel = async (area: string) => {
    const { data } = await axiosPublic.get(`/clasificaciones/nivel`);
    return data.data;
};

export const getClasificacionesByFase = async (area: string, fase: string) => {
    const response = await axiosPublic.get(`/clasificaciones/${area}/${fase}`);
    return response.data;
};
