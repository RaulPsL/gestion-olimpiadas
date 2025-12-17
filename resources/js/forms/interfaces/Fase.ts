export interface FaseForm {
    sigla: string;
    tipo_fase?: string;
    descripcion: string;
    cantidad_ganadores: number;
    cantidad_max_participantes: number;
    cantidad_min_participantes: number;
    fecha_inicio: string;
    fecha_fin: string;
    fecha_calificacion: string;
    area: string;
    nivel: string;
    usuarios: string[];
    flash?: boolean;
}