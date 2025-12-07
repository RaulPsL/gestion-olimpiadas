import { FaseForm } from "@/forms/interfaces/Fase";
import { axiosPrivate } from "./api";
import { AreaForm } from "@/forms/interfaces/Area";

export const getAreas = async (siglaAreas: string[]) => {
    try {
        console.log('Token: ', localStorage.getItem('token'));
        const { data } = await axiosPrivate.post("/areas/ver/especifico", {
            areas: siglaAreas
        });
        console.log(data.data);
        return data.data;
    } catch (error: any) {
        console.error("Error al obtener las areas:", error);

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

export const getStaticData = async (): Promise<StaticDataAreas> => {
    const { data } = await axiosPrivate.get("/areas/static");
    return {
        areas: data.data.areas,
        fases: data.data.fases,
        evaluadores: data.data.evaluadores,
        encargados: data.data.encargados,
        niveles: data.data.niveles,
        grados: data.data.grados,
    };
};

export const createArea = async (
    data: AreaForm,
    reset: any,
    setIsLoading: any,
    setSuccess: any,
    setApiError: any,
) => {
    setIsLoading(true);
    setApiError("");
    setSuccess(false);
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
        console.log("Enviando datos del área:", data);

        const result = await axiosPrivate.post(`/areas`, data);

        if (result.status === 201) {
            console.log("Área creada:", result);
            setSuccess(true);
            reset();
        }

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
    await new Promise(resolve => setTimeout(resolve, 2000));
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
        if (result.status === 201) {
            setSuccess(true);
            reset();
            setSelectedArea("");
            setSelectedEvaluadores([]);
        }

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
