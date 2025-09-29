export const validationRules = {
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
    }
};