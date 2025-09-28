import { OlimpistaForm } from "@/forms/interfaces/Olimpista";
import { axiosInstance, axiosPublic } from "./api";

export const getOlimpistas = async () => {
    const { data } = await axiosPublic.get("/olimpistas");
    console.log(`Datos obtenidos: ${data.data}`);
    return data.data;
};

export const getStaticData = async ():Promise<StaticDataOlimpistas> => {
    const { data } = await axiosPublic.get("/olimpistas/static");
    return {
        areas: data.data.areas,
        grados: data.data.grados,
        niveles: data.data.niveles,
        departamentos: data.data.departamentos,
    };
};

export const createOlimpista = async (
    data: OlimpistaForm,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setApiError: React.Dispatch<React.SetStateAction<string>>,
    setSelectedArea: React.Dispatch<React.SetStateAction<string[]>>,
    reset: () => void,
    selectedArea: string[],
    activoFormAcademico: boolean
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
        if (activoFormAcademico) {
            delete data.tutor_academico;
        }
        const formData = {
            ...data,
            areas: selectedArea,
        };

        console.log("Enviando datos:", formData);

        const result = await axiosInstance.post("/olimpistas", formData);
        
        console.log("Respuesta del servidor:", result.data);
        setSuccess(true);
        reset();
        setSelectedArea([]);
        
    } catch (error: any) {
        console.error("Error al crear olimpista:", error);

        if (error.response?.status === 422) {
            const backendErrors = error.response.data.errors;
            if (backendErrors) {
                const errorMessages = Object.values(backendErrors).flat();
                setApiError(errorMessages.join(", "));
            } else {
                setApiError(error.response.data.message || "Error de validación");
            }
        } else if (error.response?.status === 200) {
            setApiError("El olimpista ya está registrado con ese CI");
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
    console.log(data);
    const response = await axiosInstance.post("/olimpistas/file", 
        {
            archivo: data,
        },
        {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        },);
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