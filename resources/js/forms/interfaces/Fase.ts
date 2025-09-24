export interface FaseForm {
    sigla: string;
    tipo_fase: string;
    descripcion: string;
    cantidad_max_participantes: number;
    cantidad_min_participantes: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    area: string;
    usuarios: string[];
}