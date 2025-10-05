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
        maxLength: {
            value: 15,
            message: "El apellido no debe ser mayor a 15 caracteres"
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
        maxLength: {
            value: 15,
            message: "El apellido no debe ser mayor a 15 caracteres"
        },
        pattern: {
            value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
            message: "Solo se permiten letras y espacios"
        }
    },
    celular: {
        required: "El celular del tutor academico es obligatorio",
        validate: (value: number) => {
            const strValue = value.toString();
            if (!/^[67]\d{7}$/.test(strValue)) {
                return "Debe ser un número válido (6XXXXXXX o 7XXXXXXX)";
            }
            return true;
        }
    },
    ci: {
        required: "La cedula de identidad es obligatorio",
        minLength: {
            value: 7,
            message: "La cedula de identidad debe tener al menos 7 caracteres"
        },
        maxLength: {
            value: 10,
            message: "La cedula de identidad no puede tener más de 10 caracteres"
        },
        pattern: {
            value: /^[0-9]+$/,
            message: "La cedula de identidad solo debe contener números"
        }
    },
    nombre_tutor: {
        required: "El nombre completo del tutor es obligatorio",
        minLength: {
            value: 15,
            message: "El nombre del tutor debe tener al menos 15 caracteres"
        },
        maxLength: {
            value: 45,
            message: "El nombre del tutor no puede tener más de 45 caracteres"
        },
        pattern: {
            value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
            message: "Solo se permiten letras y espacios"
        },
    },
    // CORREGIDO: Para campos numéricos, usar validate en lugar de pattern
    referencia_tutor: {
        required: "El celular del tutor es obligatorio",
        validate: (value: number) => {
            const strValue = value.toString();
            if (!/^[67]\d{7}$/.test(strValue)) {
                return "Debe ser un número válido (6XXXXXXX o 7XXXXXXX)";
            }
            return true;
        }
    },
    nombres_tutor_academico: {
        required: "El nombre del tutor academico es obligatorio",
        minLength: {
            value: 4,
            message: "El nombre del tutor academico debe tener al menos 4 caracteres"
        },
        pattern: {
            value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
            message: "Solo se permiten letras y espacios"
        }
    },
    apellidos_tutor_academico: {
        required: "Deber ingresar minimamente el apellido paterno",
        minLength: {
            value: 5,
            message: "El apellido debe tener al menos 4 caracteres"
        },
        pattern: {
            value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
            message: "Solo se permiten letras y espacios"
        }
    },
    // CORREGIDO: Campo numérico con validate
    celular_tutor_academico: {
        required: "El celular del tutor academico es obligatorio",
        validate: (value: number) => {
            const strValue = value.toString();
            if (!/^[67]\d{7}$/.test(strValue)) {
                return "Debe ser un número válido (6XXXXXXX o 7XXXXXXX)";
            }
            return true;
        }
    },
    email_tutor_academico: {
        required: "El correo del tutor academico es obligatorio",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Ingrese un email válido"
        },
    },
    ci_tutor_academico: {
        required: "La cedula de identidad es obligatorio",
        minLength: {
            value: 7,
            message: "La cedula de identidad debe tener al menos 7 caracteres"
        },
        maxLength: {
            value: 10,
            message: "La cedula de identidad no puede tener más de 10 caracteres"
        },
        pattern: {
            value: /^[0-9]+[A-S]?$/,
            message: "La cedula de identidad debe contener solo números y opcionalmente una letra al final"
        }
    },
    nombre_colegio: {
        required: "El nombre del colegio es obligatorio",
        minLength: {
            value: 5,
            message: "El nombre del colegio debe tener al menos 5 caracteres"
        },
        pattern: {
            value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s\.]+$/,
            message: "Solo se permiten letras, espacios y puntos"
        }
    },
    departamento_colegio: {
        required: "El departamento del colegio es obligatorio",
    },
    // CORREGIDO: Campo numérico con validate
    telefono_colegio: {
        required: "El telefono del colegio es obligatorio",
        validate: (value: number) => {
            const strValue = value.toString();
            if (!/^[234]\d{6}$/.test(strValue)) {
                return "Debe ser un número válido (2XXXXXX o 3XXXXXX o 4XXXXXX)";
            }
            return true;
        }
    },
    direccion_colegio: {
        required: "La dirección del colegio es obligatorio",
        minLength: {
            value: 10,
            message: "La dirección del colegio debe tener al menos 10 caracteres"
        },
        maxLength: {
            value: 50,
            message: "La dirección del colegio no puede tener más de 50 caracteres"
        },
        pattern: {
            value: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ0-9\s\.\,\-]+$/,
            message: "La dirección puede contener letras, números, espacios, puntos, comas y guiones"
        }
    },
};