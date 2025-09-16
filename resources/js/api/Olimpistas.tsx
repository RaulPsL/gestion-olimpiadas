import { axiosInstance, axiosPublic } from "./api";

export const getOlimpistas = async () => {
    const response = await axiosPublic.get("/olimpistas");
    return response.data;
};

export const createOlimpista = async (data: any) => {
    const response = await axiosInstance.post("/olimpistas", data);
    return response.data;
};

export const getOlimpista = async (codsis: number) => {
    const response = await axiosPublic.get(`/olimpistas/${codsis}`);
    return response.data;
};

export const getOlimpistasByArea = async (area: string) => {
    const response = await axiosPublic.get(`/olimpistas/${area}`);
    return response.data;
}

export const getOlimpistasByFase = async (area: string, fase: string) => {
    const response = await axiosPublic.get(`/olimpistas/${area}/${fase}`);
    return response.data;
};

export const updateOlimpista = async (codsis: number, data: any) => {
    const response = await axiosInstance.put(`/olimpistas/${codsis}`, data);
    return response.data;
};

export const deleteOlimpista = async (codsis: number) => {
    const response = await axiosInstance.delete(`/olimpistas/${codsis}`);
    return response.data;
};