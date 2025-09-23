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
    ci: {
        required: "El CI es obligatorio",
        min: {
            value: 1000000,
            message: "El CI debe tener al menos 7 dígitos"
        },
        max: {
            value: 99999999,
            message: "El CI no puede tener más de 8 dígitos"
        }
    },
    celular: {
        required: "El celular es obligatorio",
        pattern: {
            value: /^[67]\d{7}$/,
            message: "Debe ser un número válido (6XXXXXXX o 7XXXXXXX)"
        }
    },
    email: {
        required: "El email es obligatorio",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Ingrese un email válido"
        }
    },
    password: {
        required: "La contraseña es obligatoria",
        minLength: {
            value: 8,
            message: "La contraseña debe tener al menos 8 caracteres"
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            message: "Debe contener: mayúscula, minúscula, número y carácter especial"
        }
    },
};