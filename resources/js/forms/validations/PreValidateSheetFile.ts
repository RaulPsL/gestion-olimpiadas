import z from "zod";

export const validateExcel = (grades: string[]) => {
    return z.object({
        nombres: z.string()
            .min(2)
            .max(25)
            .regex(/^\p{L}+(?: \p{L}+)*$/u),

        apellido_paterno: z.string()
            .min(2)
            .max(25)
            .regex(/^\p{L}+(?: \p{L}+)*$/u),

        apellido_materno: z.string()
            .min(2)
            .max(25)
            .regex(/^\p{L}+(?: \p{L}+)*$/u),

        ci: z.string()
            .min(7)
            .max(11)
            .regex(/^\d{7,10}(?:[- ][A-Za-z0-9]{1,3})?$/),

        celular: z.string()
            .min(8)
            .max(8)
            .regex(/^[6-7]\d{7}$/),

        email: z.email(),

        fecha_nacimiento: z.date()
            .min(new Date("2000-01-01"))
            .max(new Date("2018-01-01")),

        grado_escolar: z.string()
            .refine((value) => {
                if (!grades.find((grade) => grade.toLowerCase() === value.toLowerCase())) {
                    return false;
                }
            })
    });
};