export const validationRules = {
    nombres: {
        required: "El nombre es obligatorio",
        minLength: {
            value: 2,
            message: "El nombre debe tener al menos 2 caracteres"
        },
        pattern: {
            value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
            message: "Solo se permiten letras y espacios"
        }
    },
    apellido_paterno: {
        required: "El apellido paterno es obligatorio",
        minLength: {
            value: 2,
            message: "El apellido debe tener al menos 2 caracteres"
        },
        pattern: {
            value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
            message: "Solo se permiten letras y espacios"
        }
    },
    apellido_materno: {
        required: "El apellido materno es obligatorio",
        minLength: {
            value: 2,
            message: "El apellido debe tener al menos 2 caracteres"
        },
        pattern: {
            value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
            message: "Solo se permiten letras y espacios"
        }
    },
    codigo_sis: {
        required: "El código SIS es obligatorio",
        min: {
            value: 100000,
            message: "El código SIS debe tener al menos 6 dígitos"
        },
        max: {
            value: 999999999,
            message: "El código SIS no puede tener más de 9 dígitos"
        }
    },
    semestre: {
        required: "El semestre es obligatorio",
        min: {
            value: 1,
            message: "El semestre debe ser mayor a 0"
        },
        max: {
            value: 12,
            message: "El semestre no puede ser mayor a 12"
        }
    }
};