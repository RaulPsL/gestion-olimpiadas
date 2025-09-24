export interface UsuarioForm {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    ci: number;
    celular: string;
    email: string;
    password: string;
    confirmPassword: string;
    areas: string[];
    roles: string[];
}