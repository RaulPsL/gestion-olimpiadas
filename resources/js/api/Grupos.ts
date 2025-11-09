import { axiosPrivate, axiosPublic } from "./api";
import { MassiveForm } from "@/forms/interfaces/AcademicForm";

export const getOlimpistas = async () => {
    const { data } = await axiosPrivate.get("/olimpistas");
    console.log(`Datos obtenidos: `, data.data);
    return data.data;
};

export const getReport = async () => {
    const { data } = await axiosPrivate.get("/logs/report/olimpistas");
    console.log(`Datos obtenidos: `, data.data);
    return data.data;
};