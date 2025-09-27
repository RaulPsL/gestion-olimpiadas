export interface OlimpistaForm {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    ci: string;
    grado_escolar: string;
    nivel_competencia: string;
    estado: string;
    areas: string[];
    tutor: {
        nombre_tutor: string;
        referencia_tutor: number;
    },
    tutor_academico: {
        nombres_tutor_academico: string;
        apellidos_tutor_academico: string;
        celular_tutor_academico: number;
        email_tutor_academico: string;
        ci_tutor_academico: string;
    },
    colegio: {
        nombre_colegio: string;
        direccion_colegio: string;
        telefono_colegio: number;
        departamento_colegio: string;
    }
}