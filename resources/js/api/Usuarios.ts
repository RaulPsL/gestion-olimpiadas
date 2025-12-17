import { UsuarioForm } from "@/forms/interfaces/Usuario";
import { axiosPrivate, axiosPublic } from "./api";
import { Login } from "@/forms/interfaces/LoginIntefase";

export const getUsuarios = async (usuarios: string[], areas: string[]) => {
    const { data } = await axiosPrivate.post("/usuarios", {
        usuarios: usuarios,
        areas: areas
    });
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
    };
};

export const createUsuario = async (
    data: UsuarioForm,
    selectedAreas: string[],
    selectedRol: number[],
    setIsLoading: any,
    setSuccess: any,
    setApiError: any,
    reset: any,
    setSelectedAreas: any,
    setSelectedRol: any
) => {
    setIsLoading(true);
    setApiError("");
    setSuccess(false);
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
        console.log('Envio de datos del usuario', data);
        const formData = {
            ...data,
            apellido: `${data.apellido_paterno} ${data.apellido_materno}`,
            ci: Number(data.ci),
            areas: selectedAreas,
            rol: selectedRol,
        };
        
        const result = await axiosPrivate.post("/register", formData);
        
        console.log("Usuario creado:", result.data);
        setSuccess(true);
        reset();
        setSelectedAreas([]);
        setSelectedRol([]);
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
        } else if (error.response?.status === 409) {
            setApiError(`Ya existe un usuario con CI: ${data.ci} o Correo: ${data.email}`);
        } else if (error.response?.status === 500) {
            setApiError("Error interno del servidor. Intente nuevamente.");
        } else {
            setApiError("Error de conexión. Verifique su internet.");
        }
    } finally {
        setIsLoading(false);
    }
};

export const updateUsuario = async (
    ci: number,
    data: UsuarioForm,
    setIsLoading: any,
    setSuccess: any,
    setApiError: any,
) => {
    setIsLoading(true);
    setApiError("");
    setSuccess(false);
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
        await axiosPrivate.put(`/usuarios/${ci}`, data);
        console.log("Usuario modificado:", data);
        setSuccess(true);
        setIsLoading(false);
    } catch (error: any) {
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
            setApiError("Error de conexión. Verifique su internet.");
        }
    }
};

export const deleteUsuario = async (codsis: number) => {
    const response = await axiosPrivate.delete(`/usuarios/${codsis}`);
    return response.data;
};

export const getLogsCalificaciones = async (areas: string[]) => {
    try {

        const { data } = await axiosPrivate.post("/logs/calificaciones", {
            areas: areas
        });
        console.log(data.data);
        return data.data;
    } catch (error: any) {
        console.error("Error al obtener los logs:", error);

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
}

export const getLogsCierreFases = async () => {
    try {
        const { data } = await axiosPrivate.get("/logs/usuarios");
        console.log(data.data);
        return data.data;
    } catch (error: any) {
        console.error("Error al obtener los logs:", error);

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
}

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