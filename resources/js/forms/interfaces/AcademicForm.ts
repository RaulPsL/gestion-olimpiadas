export interface MassiveForm {
    tutor_academico: {
        nombres_tutor_academico: string;
        apellidos_tutor_academico: string;
        celular_tutor_academico: number;
        email_tutor_academico: string;
        ci_tutor_academico: string;
    };
    colegio: {
        nombre_colegio: string;
        direccion_colegio: string;
        telefono_colegio: number;
        departamento_colegio: string;
    };
    archivo: FileList;
}