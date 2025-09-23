import { OlimpistaForm } from "@/forms/interfaces/Olimpista";
import { axiosInstance, axiosPublic } from "./api";

export const getOlimpistas = async () => {
    const response = await axiosPublic.get("/olimpistas");
    return response.data;
};

export const createOlimpista = async (
    data: OlimpistaForm,
    setIsLoading: any,
    setSuccess: any,
    setApiError: any,
    setSelectedArea: any,
    reset: any,
    selectedArea: any
) => {
    setIsLoading(true);
    setApiError("");
    setSuccess(false);

    try {
        if (selectedArea.length === 0) {
            setApiError("Debe seleccionar al menos un área de competencia");
            setIsLoading(false);
            return;
        }

        // Agregar las áreas seleccionadas
        const formData = {
            ...data,
            area: selectedArea,
            codigo_sis: Number(data.codigo_sis)
        };

        console.log("Enviando datos:", formData);

        const result = await axiosInstance.post("/olimpistas", data);
        
        console.log("Respuesta del servidor:", result.data);
        setSuccess(true);
        reset(); // Limpiar formulario
        setSelectedArea([]); // Limpiar áreas seleccionadas
        
    } catch (error: any) {
        console.error("Error al crear olimpista:", error);
        
        // Manejar diferentes tipos de errores
        if (error.response?.status === 422) {
            // Errores de validación del backend
            const backendErrors = error.response.data.errors;
            if (backendErrors) {
                const errorMessages = Object.values(backendErrors).flat();
                setApiError(errorMessages.join(", "));
            } else {
                setApiError(error.response.data.message || "Error de validación");
            }
        } else if (error.response?.status === 409) {
            // Conflicto (olimpista ya existe)
            setApiError("El olimpista ya está registrado con ese código SIS");
        } else if (error.response?.status === 500) {
            setApiError("Error interno del servidor. Intente nuevamente.");
        } else {
            setApiError("Error de conexión. Verifique su internet.");
        }
    } finally {
        setIsLoading(false);
    }
};

export const createMassiveOlimpistas = async (data: any) => {
    const response = await axiosInstance.post("/olimpistas/file", data);
    return response.data;
}

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