import { UsuarioForm } from "@/forms/interfaces/Usuario";
import { axiosPublic, axiosInstance } from "./api";

export const getUsuarios = async () => {
    const response = await axiosPublic.get("/usuarios");
    return response.data;
};

export const getUsuario = async (uuid: string) => {
    const response = await axiosPublic.get(`/usuarios/${uuid}`);
    return response.data;
}

export const createUsuario = async (
    data: UsuarioForm,
    selectedAreas: string[],
    selectedRoles: string[],
    setIsLoading: any,
    setSuccess: any,
    setApiError: any,
    reset: any,
    setSelectedAreas: any,
    setSelectedRoles: any,
) => {
    setIsLoading(true);
    setApiError("");
    setSuccess(false);

    try {
        if (selectedRoles.length === 0) {
            setApiError("Debe seleccionar al menos un rol");
            setIsLoading(false);
            return;
        }

        const { confirmPassword, ...userData } = data;
        const formData = {
            ...userData,
            ci: Number(data.ci),
            areas: selectedAreas,
            roles: selectedRoles
        };

        console.log("Enviando datos de usuario:", formData);

        const result = await axiosInstance.post("/register", data);
        
        console.log("Usuario creado:", result.data);
        setSuccess(true);
        reset();
        setSelectedAreas([]);
        setSelectedRoles([]);
        
    } catch (error: any) {
        console.error("Error al crear usuario:", error);

        if (error.response?.status === 422) {
            const backendErrors = error.response.data.errors;
            if (backendErrors) {
                const errorMessages = Object.values(backendErrors).flat();
                setApiError(errorMessages.join(", "));
            } else {
                setApiError(error.response.data.message || "Error de validación");
            }
        } else if (error.response?.status === 409 || error.response?.status === 200) {
            setApiError(`Ya existe un usuario con CI: ${data.ci}`);
        } else if (error.response?.status === 500) {
            setApiError("Error interno del servidor. Intente nuevamente.");
        } else {
            setApiError("Error de conexión. Verifique su internet.");
        }
    } finally {
        setIsLoading(false);
    }
};

export const updateUsuario = async (codsis: number, data: any) => {
    const response = await axiosInstance.put(`/usuarios/${codsis}`, data);
    return response.data;
};

export const deleteUsuario = async (codsis: number) => {
    const response = await axiosInstance.delete(`/usuarios/${codsis}`);
    return response.data;
};

export const login = async (data: any) => {
    const response = await axiosPublic.post("/login", data);
    return response.data;
};