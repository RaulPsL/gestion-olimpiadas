import { axiosPublic, axiosInstance } from "./api";

export const getCalificacionesOlimpistas = async (siglaAreas: string[]) => {
    const { data } = await axiosPublic.post("/calificaciones/olimpistas", {
        areas: siglaAreas
    });
    console.log('Datos obtenidos: ', data.data);
    return data.data;
};

export const getCalificacionesGrupos = async (siglaAreas: string[]) => {
    const response = await axiosPublic.post("/calificaciones/grupos", {
        areas: siglaAreas
    });
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

export const updateCalificacion = async (codsis: number, data: any) => {
    const response = await axiosInstance.put(`/calificaciones/${codsis}`, data);
    return response.data;
};
