import { axiosPublic } from "./api";

export const getClasificacionesByArea = async () => {
    const { data } = await axiosPublic.get("/clasificaciones/area");
    return data.data;
};

export const getClasificacionesGrupoByArea = async () => {
    const { data } = await axiosPublic.get("/clasificaciones/grupo/area");
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

export const getClasificacionesByAreaEspecifica = async (siglaArea: string) => {
    const { data } = await axiosPublic.get(`/clasificaciones/area/${siglaArea}`);
    return data.data;
};

export const getClasificacionesGrupoByAreaEspecifica = async (siglaArea: string) => {
    const { data } = await axiosPublic.get(`/clasificaciones/grupo/area/${siglaArea}`);
    return data.data;
};
