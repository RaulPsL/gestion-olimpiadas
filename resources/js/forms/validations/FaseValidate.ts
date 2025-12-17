export const validationRules = (
    watch: (message: string) => any
) => {
    return {
        tipo_fase: {
            required: "El tipo de fase es obligatorio"
        },
        descripcion: {
            required: "La descripción es obligatoria",
            minLength: {
                value: 10,
                message: "La descripción debe tener al menos 10 caracteres"
            }
        },
        cantidad_ganadores: {
            required: "La cantidad de ganadores es obligatoria",
            min: {
                value: 3,
                message: "Debe ser al menos 3"
            },
            validate: (value: number) => {
                const min = watch("cantidad_max_participantes");
                return value <= min || "Debe ser menor al maximo de participantes";
            }
        },
        cantidad_fases: {
            required: "La cantidad de fases es obligatoria",
            min: {
                value: 3,
                message: "Debe ser al menos 3 fases"
            },
            max: {
                value: 5,
                message: "No puede se más de 5 fases."
            }
        },
        cantidad_max_participantes: {
            required: "La cantidad máxima es obligatoria",
            min: {
                value: 1,
                message: "Debe ser al menos 1"
            },
            validate: (value: number) => {
                const min = watch("cantidad_min_participantes");
                return value >= min || "Debe ser mayor o igual al mínimo";
            }
        },
        cantidad_min_participantes: {
            required: "La cantidad mínima es obligatoria",
            min: {
                value: 1,
                message: "Debe ser al menos 1"
            }
        },
        fecha_inicio: {
            required: "La fecha de inicio es obligatoria",
            validate: (value: string) => {
                return new Date() < new Date(value) || "No puede ser menor a la fecha actual.";
            }
        },
        fecha_fin: {
            required: "La fecha de fin es obligatoria",
            validate: (value: string) => {
                const min = watch("fecha_inicio");
                if (new Date() > new Date(value)) return "No puede ser menor a la fecha actual.";
                if (new Date(value) <= new Date(min)) return "No debe ser menor o igual a la fecha inicio.";
            }
        },
        fecha_calificacion: {
            required: "La fecha de calificacion es obligatoria",
            validate: (value: string) => {
                const min = watch("fecha_inicio");
                const max = watch("fecha_fin");
                if (new Date() > new Date(value)) return "No puede ser menor a la fecha actual.";
                if (new Date(value) <= new Date(min)) return "No debe ser menor o igual a la fecha inicio.";
                if (new Date(value) >= new Date(max)) return "No debe ser mayor o igual a la fecha fin.";
            }
        },
        area: {
            required: "Debe seleccionar el area."
        },
        usuarios: {
            validate: (value: string[]) => {
                return value && value.length > 0 || "Debe seleccionar al menos un evaluador."
            }
        }
    };
}