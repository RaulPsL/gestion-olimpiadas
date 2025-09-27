export const validationRules = {
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
    cantidad_max_participantes: {
        required: "La cantidad máxima es obligatoria",
        min: {
            value: 1,
            message: "Debe ser al menos 1"
        },
        // validate: (value: number) => {
        //     const min = watch("cantidad_min_participantes");
        //     return value >= min || "Debe ser mayor o igual al mínimo";
        // }
    },
    cantidad_min_participantes: {
        required: "La cantidad mínima es obligatoria",
        min: {
            value: 1,
            message: "Debe ser al menos 1"
        }
    },
    fecha_inicio: {
        required: "La fecha de inicio es obligatoria"
    },
    fecha_fin: {
        required: "La fecha de fin es obligatoria",
        // validate: (value: Date) => {
        //     const inicio = watch("fecha_inicio");
        //     return new Date(value) > new Date(inicio) || "Debe ser posterior a la fecha de inicio";
        // }
    }
};