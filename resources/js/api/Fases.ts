import { axiosPrivate } from "./api";

export const getFases = async () => {
    try {
        const datosUsuario = JSON.parse(localStorage.getItem('data') ?? "");
        if (!datosUsuario) {
            throw Error("No esta autentificado");
        }

        const { data } = await axiosPrivate.post("/fases", {
            areas: datosUsuario?.areas?.map((area: any) => area?.nombre)
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

// export const updateFase = async (codsis: number, data: any) => {
//     const response = await axiosInstance.put(`/fases/${codsis}`, data);
//     return response.data;
// };

export const getFase = async (area: string) => {
    const response = await axiosPrivate.get(`/fases/${area}`);
    return response.data;
};

// export const deleteFase = async (codsis: number) => {
//     const response = await axiosInstance.delete(`/fases/${codsis}`);
//     return response.data;
// };