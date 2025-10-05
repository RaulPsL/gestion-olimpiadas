export const validationRules = (
    watch: (message : string) => any
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
        validate: (value: Date) => {
            return new Date() < new Date(value) || "No puede ser menor a la fecha actual.";
        }
    },
    fecha_fin: {
        required: "La fecha de fin es obligatoria",
        validate: (value: Date) => {
            const inicio = watch("fecha_inicio");
            if (new Date(value) > new Date(inicio)) return "Debe ser posterior a la fecha de inicio";
            if (new Date() > new Date(value)) return "No puede ser menor a la fecha actual.";
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