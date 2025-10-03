import { FormNotas } from "@/components/tables/ColumnsCalificaciones";
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

export const updateCalificacionesOlimpistas = async (
    data: FormNotas,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setApiError: React.Dispatch<React.SetStateAction<string>>,
    reset: () => void,
    setFileError: React.Dispatch<React.SetStateAction<string>>,
    setCalificacionesResult: React.Dispatch<React.SetStateAction<number | null>>
) => {
    const response = await axiosPublic.put(`/calificaciones/olimpistas`);
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
