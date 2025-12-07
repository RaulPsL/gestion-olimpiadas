export interface Nivel {
    nombre: string;
    grados: string[]; // IDs de los grados para el backend
    gradosInfo?: { id: string; label: string }[]; // Información completa para mostrar en la tabla
}

export interface AreaForm {
    nombre: string;
    sigla: string;
    descripcion: string;
    niveles: Nivel[];
    evaluadores: string[];
    encargados: string[];
    grados?: any[];
}