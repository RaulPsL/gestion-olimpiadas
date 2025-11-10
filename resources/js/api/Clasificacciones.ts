import { axiosPublic } from "./api";

export const getClasificacionesByArea = async () => {
    const { data } = await axiosPublic.get("/clasificaciones/area");
    return data.data;
};

export const getGanadores = async () => {
    const { data } = await axiosPublic.get(`/clasificaciones/ganadores`);
    console.log('Datos: ', data.data)
    return data.data;
};

export const getClasificacionesByFase = async (area: string, fase: string) => {
    const response = await axiosPublic.get(`/clasificaciones/${area}/${fase}`);
    return response.data;
};
