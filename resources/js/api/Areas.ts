import { FaseForm } from "@/forms/interfaces/Fase";
import { axiosPrivate } from "./api";

export const getAreas = async () => {
    try {
        const datosUsuario = JSON.parse(localStorage.getItem('data') ?? "");
        if (!datosUsuario) {
            throw Error("No esta autentificado");
        }

        const { data } = await axiosPrivate.post("/areas/ver/especifico", {
            areas: datosUsuario?.areas?.map((area: any) => area?.sigla)
        });
        console.log(data.data);
        return data.data;
    } catch (error: any) {
        console.error("Error al crear usuario:", error);

        if (error.response?.status === 422) {
            const backendErrors = error.response.data.errors;
            if (backendErrors) {
                const errorMessages = Object.values(backendErrors).flat();
                console.log(errorMessages.join(", "));
            } else {
                console.log(error.response.data.message || "Error de validación");
            }
        } else if (error.response?.status === 500) {
            console.log("Error interno del servidor. Intente nuevamente.");
        } else {
            console.log("Error de conexión. Verifique su internet.");
        }
    }
};

export const getStaticData = async ():Promise<StaticDataAreas> => {
    const { data } = await axiosPrivate.get("/areas/static");
    return {
        areas: data.data.areas,
        fases: data.data.fases,
        evaluadores: data.data.evaluadores,
    };
};

export const createArea = async (data: any) => {
    const response = await axiosPrivate.post("/areas", data);
    return response.data;
};

export const getArea = async (fase: string) => {
    const response = await axiosPrivate.get(`/areas/${fase}`);
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

        console.log("Enviando datos de fase:", data);

        const result = await axiosPrivate.put(`/areas/${selectedArea}`, {
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
    const response = await axiosPrivate.delete(`/areas/${codsis}`);
    return response.data;
};
