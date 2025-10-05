import { FormNotas } from "@/components/tables/ColumnsCalificaciones";
import { axiosPublic, axiosInstance } from "./api";
import { UseFormReset } from "react-hook-form";

export const getCalificacionesOlimpistas = async (siglaAreas: string[]) => {
    const { data } = await axiosPublic.post("/calificaciones/olimpistas", {
        areas: siglaAreas
    });
    return data.data;
};

export const getCalificacionesGrupos = async (siglaAreas: string[]) => {
    const { data } = await axiosPublic.post("/calificaciones/grupos", {
        areas: siglaAreas
    });
    return data.data;
};

export const updateCalificacionesOlimpistas = async (
    data: FormNotas,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setApiError: React.Dispatch<React.SetStateAction<string>>,
    reset: UseFormReset<FormNotas>,
) => {
    // setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setApiError("");
    setSuccess(false);
    try {
        console.log('Metodo de envio...');
        const notaEmpty = data.notas.some((nota) => String(nota.nota) === "");
        if (notaEmpty) {
            console.log('Error en las notas');
            setApiError("No se puede tener notas vacias.");
            
            setIsLoading(false);
            return;
        }

        console.log('Enviando datos...');

        const response = await axiosPublic.put(`/calificaciones/olimpistas`, data);
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (response.status === 200) {
            setSuccess(true);
            setIsLoading(false);
            reset();
            console.log('Notas actualizadas con exito');
            return;
        }
    } catch (error: any) {
        console.error("Error al editar las notas:", error);
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
}

export const getCalificacionesByFase = async (area: string, fase: string) => {
    const response = await axiosPublic.get(`/calificaciones/${area}/${fase}`);
    return response.data;
}

export const updateCalificacion = async (codsis: number, data: any) => {
    const response = await axiosInstance.put(`/calificaciones/${codsis}`, data);
    return response.data;
};
