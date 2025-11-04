export interface OlimpistaForm {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    ci: string;
    email: string;
    celular: string;
    grado_escolar: string;
    nivel_competencia: string;
    estado: string;
    areas: string[];
    niveles_por_area?: Record<string, string>; // Nuevo campo para mapear área -> nivel
    nivel_area_1?: string | number; // Campos auxiliares para los combobox
    nivel_area_2?: string | number;
    nivel_area_3?: string | number ;
    tutor_academico?: {
        nombres_tutor_academico: string;
        apellidos_tutor_academico: string;
        celular_tutor_academico: string;
        email_tutor_academico: string;
        ci_tutor_academico: string;
    },
    colegio: {
        nombre_colegio: string;
        direccion_colegio: string;
        telefono_colegio: string;
        departamento_colegio: string;
        provincia_colegio: string;
    }
}