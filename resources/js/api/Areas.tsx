import { FaseForm } from "@/forms/interfaces/Fase";
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

export const updateArea = async (
    data: FaseForm,
    reset: any,
    setIsLoading: any,
    setSuccess: any,
    setApiError: any,
    selectedArea: string,
    selectedEvaluadores: string[],
    setSelectedArea: any,
    setSelectedEvaluadores: any
) => {
    setIsLoading(true);
    setApiError("");
    setSuccess(false);

    try {
        if (!selectedArea) {
            setApiError("Debe seleccionar un área");
            setIsLoading(false);
            return;
        }

        const formData = {
            ...data,
            area: selectedArea,
            evaluadores: selectedEvaluadores
        };

        console.log("Enviando datos de fase:", formData);

        const result = await axiosInstance.put(`/areas/${selectedArea}`, {
            fases: [data]
        });
        
        console.log("Fase creada:", result);
        setSuccess(true);
        reset();
        setSelectedArea("");
        setSelectedEvaluadores([]);
        
    } catch (error: any) {
        console.error("Error al crear fase:", error);
        
        if (error.response?.status === 422) {
            const backendErrors = error.response.data.errors;
            if (backendErrors) {
                const errorMessages = Object.values(backendErrors).flat();
                setApiError(errorMessages.join(", "));
            } else {
                setApiError(error.response.data.message || "Error de validación");
            }
        } else {
            setApiError("Error al crear la fase. Intente nuevamente.");
        }
    } finally {
        setIsLoading(false);
    }
};

export const deleteArea = async (codsis: number) => {
    const response = await axiosInstance.delete(`/areas/${codsis}`);
    return response.data;
};
