import { axiosPublic, axiosInstance } from "./api";

export const getFases = async () => {
    const { data } = await axiosPublic.get("/fases");
    return data.data;
};

export const createFase = async (data: any) => {
    const response = await axiosInstance.post("/fases", data);
    return response.data;
};

// export const updateFase = async (codsis: number, data: any) => {
//     const response = await axiosInstance.put(`/fases/${codsis}`, data);
//     return response.data;
// };

export const getFase = async (area: string) => {
    const response = await axiosPublic.get(`/fases/${area}`);
    return response.data;
};

// export const deleteFase = async (codsis: number) => {
//     const response = await axiosInstance.delete(`/fases/${codsis}`);
//     return response.data;
// };