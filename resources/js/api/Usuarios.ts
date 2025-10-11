import { UsuarioForm } from "@/forms/interfaces/Usuario";
import { axiosPrivate, axiosInstance, axiosPublic } from "./api";
import { Login } from "@/forms/interfaces/LoginIntefase";

export const getUsuarios = async () => {
    const { data } = await axiosPrivate.get("/usuarios");
    return data.data;
};

export const getUsuario = async (uuid: string) => {
    const response = await axiosPrivate.get(`/usuarios/${uuid}`);
    return response.data;
}

export const getStaticData = async ():Promise<StaticDataUsuarios> => {
    const { data } = await axiosPrivate.get("/usuarios/static");
    return {
        areas: data.data.areas,
        roles: data.data.roles,
        tipo_fases: data.data.tipo_fases,
    };
};

export const createUsuario = async (
    data: UsuarioForm,
    selectedAreas: string[],
    selectedRoles: string[],
    selectedFases: string[],
    setIsLoading: any,
    setSuccess: any,
    setApiError: any,
    reset: any,
    setSelectedAreas: any,
    setSelectedRoles: any,
    setSelectedFases: any
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
            apellido: `${data.apellido_paterno} ${data.apellido_materno}`,
            ci: Number(data.ci),
            areas: selectedAreas,
            roles: selectedRoles,
            fases: selectedFases
        };

        console.log("Enviando datos de usuario:", formData);

        const result = await axiosPrivate.post("/register", formData);
        
        console.log("Usuario creado:", result.data);
        setSuccess(true);
        reset();
        setSelectedAreas([]);
        setSelectedRoles([]);
        setSelectedFases([]);
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
        } else if (error.response?.status === 200) {
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

export const login = async (
    data: Login,
    setApiError: any,
    setIsLoading: any,
    setSuccess: any,
    setToken: any,
    setData: any,
    reset: any,
) => {
    setApiError('');
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
        console.log("Enviando datos...");
        data = {
            ...data,
            ci: Number(data.ci)
        }
        const response = await axiosPublic.post("/login", data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (response.status === 200) {
            setToken(response.data.token);
            setData(response.data.user);
            setSuccess(true);
            setIsLoading(false);
            reset();
            console.log("Acceso al sistema existoso", response.data.data);
            return;
        }
    } catch (error: any) {
        console.error("Error al crear usuario:", error);
        if (error.response?.status === 401) {
            setApiError(error.response?.data?.message);
        } else if (error.response?.status === 500) {
            setApiError("Error interno del servidor. Intente nuevamente.");
        } else {
            setApiError("Error de conexión. Verifique su internet.");
        }
    } finally {
        setIsLoading(false);
    }
};