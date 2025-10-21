import { FormCierreFase } from "@/forms/interfaces/CierreFaseForm";
import { axiosPrivate } from "./api";
import { UseFormReset } from "react-hook-form";

export const getFases = async (areas: string[]) => {
    try {

        const { data } = await axiosPrivate.post("/fases", {
            areas: areas
        });
        console.log(data.data);
        return data.data;
    } catch (error: any) {
        console.error("Error al obtener las fases:", error);

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

export const createFase = async (data: any) => {
    const response = await axiosPrivate.post("/fases", data);
    return response.data;
};

export const getCierres = async (areas: string[]) => {
    const { data } = await axiosPrivate.post("/fases/cierres", { areas: areas });
    return data.data;
};

export const updateCierreFases = async (
    data: FormCierreFase,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setApiError: React.Dispatch<React.SetStateAction<string>>,
    reset: UseFormReset<FormCierreFase>,
) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setApiError("");
    setSuccess(false);
    try {
        console.log('Enviando datos...');

        const response = await axiosPrivate.put(`/fases/cierres`, {
            fases: data
        });
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (response.status === 200) {
            setSuccess(true);
            setIsLoading(false);
            reset();
            console.log('Cierres almacenados con exito');
            return;
        }
    } catch (error: any) {
        console.error("Error al almacenar los cierres de fases:", error);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSuccess(false);
        if (error.response?.status === 422) {
            const backendErrors = error.response.data.errors;
            if (backendErrors) {
                const errorMessages = Object.values(backendErrors).flat();
                setApiError(errorMessages.join(", "));
            } else {
                setApiError(error.response.data.message || "Error de validación");
            }
        } else if (error.response?.status === 500) {
            setApiError("Error interno del servidor. Intente nuevamente.");
        } else {
            setApiError(error.response?.data?.message || "Error de conexión. Verifique su internet.");
        }
    } finally {
        setIsLoading(false);
    }
};

export const getFase = async (area: string) => {
    const response = await axiosPrivate.get(`/fases/${area}`);
    return response.data;
};

// export const deleteFase = async (codsis: number) => {
//     const response = await axiosPrivate.delete(`/fases/${codsis}`);
//     return response.data;
// };