export interface MassiveForm {
    nombre_grupo?: string,
    nivel?: string | number;
    tutor_academico: {
        nombres_tutor_academico: string;
        apellidos_tutor_academico: string;
        celular_tutor_academico: string;
        email_tutor_academico: string;
        ci_tutor_academico: string;
    };
    colegio: {
        nombre_colegio: string;
        telefono_colegio: string;
        provincia_id: number;
        departamento_id: number;
        area: string,
    };
    archivo: FileList;
}