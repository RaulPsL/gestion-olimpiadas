import { axiosPublic, axiosInstance } from "./api";

export const getAreas = async () => {
    const response = await axiosPublic.get("/areas");
    return response.data;
};

export const createArea = async (data: any) => {
    const response = await axiosInstance.post("/areas", data);
    return response.data;
};

export const getArea = async (fase: string) => {
    const response = await axiosPublic.get(`/areas/${fase}`);
    return response.data;
};

export const updateArea = async (codsis: number, data: any) => {
    const response = await axiosInstance.put(`/areas/${codsis}`, data);
    return response.data;
};

export const deleteArea = async (codsis: number) => {
    const response = await axiosInstance.delete(`/areas/${codsis}`);
    return response.data;
};
