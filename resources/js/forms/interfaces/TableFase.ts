interface Cantidades {
    cantidad_ganadores: number;
    cantidad_max_participantes: number;
    cantidad_min_participantes: number;
}

interface Dates {
    fecha_inicio: Date;
    fecha_fin: Date;
    fecha_calificacion: Date;
}

export interface TableFase {
    tipo_fase: string | number;
    cantidades: Cantidades;
    dates: Dates;
    area: string;
    nivel: string | number;
    usuarios: (string | number)[];
}