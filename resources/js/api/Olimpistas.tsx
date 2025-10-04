import { OlimpistaForm } from "@/forms/interfaces/Olimpista";
import { axiosInstance, axiosPublic } from "./api";
import { MassiveForm } from "@/forms/interfaces/AcademicForm";

export const getOlimpistas = async () => {
    const { data } = await axiosPublic.get("/olimpistas");
    console.log(`Datos obtenidos: `, data.data);
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

export const createMassiveOlimpistas = async (
    data: MassiveForm,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setApiError: React.Dispatch<React.SetStateAction<string>>,
    reset: () => void,
    selectedFile: File,
    setFileError: React.Dispatch<React.SetStateAction<string>>,
    setImportResult: React.Dispatch<React.SetStateAction<number | null>>
) => {
    setIsLoading(true);
    setApiError("");
    setFileError("");
    setSuccess(false);

    try {
        if (!selectedFile) {
            setFileError("Debe seleccionar un archivo");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();

        formData.append('archivo', selectedFile);

        if (data.tutor_academico) {
            formData.append('tutor_academico[nombre_tutor_academico]', data.tutor_academico.nombres_tutor_academico);
            formData.append('tutor_academico[apellidos_tutor_academico]', data.tutor_academico.apellidos_tutor_academico);
            formData.append('tutor_academico[celular_tutor_academico]', data.tutor_academico.celular_tutor_academico.toString());
            formData.append('tutor_academico[email_tutor_academico]', data.tutor_academico.email_tutor_academico);
            formData.append('tutor_academico[ci_tutor_academico]', data.tutor_academico.ci_tutor_academico);
        }

        if (data.colegio) {
            formData.append('colegio[nombre_colegio]', data.colegio.nombre_colegio);
            formData.append('colegio[direccion_colegio]', data.colegio.direccion_colegio);
            formData.append('colegio[telefono_colegio]', data.colegio.telefono_colegio.toString());
            formData.append('colegio[departamento_colegio]', data.colegio.departamento_colegio);
        }

        console.log("Enviando FormData...");

        const result = await axiosInstance.post("/olimpistas/file", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        setImportResult(result.data);
        console.log("Respuesta del servidor:", result.data);
        
        setSuccess(true);
        reset();
        
    } catch (error: any) {
        console.error("Error al crear olimpistas masivos:", error);

        if (error.response?.status === 422) {
            const backendErrors = error.response.data.errors;
            if (backendErrors) {
                const errorMessages = Object.values(backendErrors).flat();
                setApiError(errorMessages.join(", "));
            } else {
                setApiError(error.response.data.message || "Error de validación");
            }
        } else if (error.response?.status === 400) {
            setApiError(error.response.data.message || "Datos incorrectos en el archivo");
        } else if (error.response?.status === 413) {
            setApiError("El archivo es demasiado grande");
        } else if (error.response?.status === 500) {
            setApiError("Error interno del servidor. Intente nuevamente.");
        } else if (error.code === 'ECONNABORTED') {
            setApiError("Tiempo de espera agotado. El archivo puede ser muy grande.");
        } else {
            setApiError(error.response?.data?.message || "Error de conexión. Verifique su internet.");
        }
    } finally {
        setIsLoading(false);
    }
};

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