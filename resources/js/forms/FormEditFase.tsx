import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Combobox, useComboboxField } from "@/components/Combobox";
import { DateTimePicker } from "@/components/DateTimePicker";
import { FaseForm } from "./interfaces/Fase";
import { validationRules } from "./validations/FaseValidate";
import { getStaticData } from "@/api/Areas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { updateFase } from "@/api/Fases";

export default function FormEditFase({ 
    otherData,
    createFase = false,
    aditionalData,
    onEditFase,
} : { 
    otherData: any,
    createFase?: boolean,
    aditionalData?: any,
    onEditFase?: (faseEditada: any) => void,
}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const evaluadores = aditionalData?.evaluadores;

    // Estado para la fecha compartida
    const [sharedDate, setSharedDate] = React.useState<Date>(new Date());

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        getValues,
        watch,
        trigger,
    } = useForm<FaseForm>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            sigla: "",
            tipo_fase: "",
            descripcion: "",
            cantidad_max_participantes: 20,
            cantidad_min_participantes: 0,
            fecha_inicio: new Date(),
            fecha_calificacion: new Date(Date.now() + 60 * 60 * 1000),
            fecha_fin: new Date(Date.now() + 120 * 60 * 1000),
            area: "",
            nivel: "",
            usuarios: []
        }
    });

    const newValidationRules = validationRules(watch);
    const evaluadoresField = useComboboxField("usuarios", setValue, true, trigger);

    React.useEffect(() => {
        setValue('area', otherData.area);
        setValue('cantidad_max_participantes', otherData.cantidad_max_participantes);
        setValue('nivel', otherData.nivel);
        setValue('fecha_calificacion', new Date(otherData.fecha_calificacion));
        setValue('fecha_fin', new Date(otherData.fecha_fin));
        setValue('fecha_inicio', new Date(otherData.fecha_inicio));
        setValue('tipo_fase', otherData.tipo_fase);
        if (createFase) {
            setValue('usuarios', otherData.usuarios);
            setValue('cantidad_min_participantes', otherData.cantidad_min_participantes);
            setValue('cantidad_ganadores', otherData.cantidad_ganadores);
            // Establecer los evaluadores seleccionados en el combobox
            evaluadoresField.onChange(otherData.usuarios || []);
        }
    }, []);


    const handleDateChange = (
        newDate: Date | undefined,
        field: 'fecha_inicio' | 'fecha_calificacion' | 'fecha_fin'
    ) => {
        if (!newDate) return;

        const oldDate = getValues(field);

        // Detectar qué cambió exactamente
        const fechaCambio = oldDate.toDateString() !== newDate.toDateString();
        const horaCambio = oldDate.getHours() !== newDate.getHours() ||
            oldDate.getMinutes() !== newDate.getMinutes() ||
            oldDate.getSeconds() !== newDate.getSeconds();

        // Actualizar el campo que cambió
        setValue(field, newDate);
        trigger(field);

        // SINCRONIZACIÓN PARA FECHA_INICIO
        if (field === 'fecha_inicio') {
            if (fechaCambio) {
                // Si cambió la fecha, actualizar sharedDate y sincronizar la fecha en todos los campos
                setSharedDate(newDate);

                const fechaCalificacion = getValues('fecha_calificacion');
                const fechaFin = getValues('fecha_fin');

                // Mantener las horas pero actualizar la fecha
                const newCalif = new Date(newDate);
                newCalif.setHours(
                    fechaCalificacion.getHours(),
                    fechaCalificacion.getMinutes(),
                    fechaCalificacion.getSeconds()
                );

                const newFin = new Date(newDate);
                newFin.setHours(
                    fechaFin.getHours(),
                    fechaFin.getMinutes(),
                    fechaFin.getSeconds()
                );

                setValue('fecha_calificacion', newCalif);
                setValue('fecha_fin', newFin);
                trigger('fecha_calificacion');
                trigger('fecha_fin');
            }

            if (horaCambio) {
                // Si cambió la hora de inicio, sincronizar las horas manteniendo las diferencias
                const fechaCalificacion = getValues('fecha_calificacion');
                const fechaFin = getValues('fecha_fin');

                // Calcular diferencias de tiempo originales
                const diffCalif = fechaCalificacion.getTime() - oldDate.getTime();
                const diffFin = fechaFin.getTime() - oldDate.getTime();

                // Aplicar las mismas diferencias a la nueva hora
                const newCalif = new Date(newDate.getTime() + diffCalif);
                const newFin = new Date(newDate.getTime() + diffFin);

                setValue('fecha_calificacion', newCalif);
                setValue('fecha_fin', newFin);
                trigger('fecha_calificacion');
                trigger('fecha_fin');
            }
        }

        // SINCRONIZACIÓN PARA FECHA_CALIFICACION Y FECHA_FIN
        // Solo sincronizar la fecha si sharedDate cambió
        if (field === 'fecha_calificacion' || field === 'fecha_fin') {
            if (fechaCambio && newDate.toDateString() !== sharedDate.toDateString()) {
                // Si alguien intenta cambiar la fecha de calificación o fin,
                // sincronizarla con sharedDate pero mantener la hora elegida
                const syncedDate = new Date(sharedDate);
                syncedDate.setHours(
                    newDate.getHours(),
                    newDate.getMinutes(),
                    newDate.getSeconds()
                );
                setValue(field, syncedDate);
                trigger(field);
            }
        }
    };

    const handleClick = () => {
        if (createFase && onEditFase) {
            // Si estamos en modo creación, actualizar la lista en el padre
            handleSubmit((data) => {
                // Crear objeto con los datos editados
                const faseEditada = {
                    ...otherData,
                    cantidad_ganadores: data.cantidad_ganadores,
                    cantidad_max_participantes: data.cantidad_max_participantes,
                    cantidad_min_participantes: data.cantidad_min_participantes,
                    fecha_inicio: data.fecha_inicio,
                    fecha_calificacion: data.fecha_calificacion,
                    fecha_fin: data.fecha_fin,
                    usuarios: evaluadoresField.value,
                };
                
                // Llamar al callback para actualizar la lista
                onEditFase(faseEditada);
                
                // Mostrar mensaje de éxito
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            })();
        } else {
            // Si no estamos en modo creación, hacer el submit normal
            handleSubmit(
                (data) => updateFase(
                    otherData.fase_id,
                    data,
                    setIsLoading,
                    setSuccess,
                    setApiError,
                    reset,
                )
            )();
        }
    }
    return (
        <Card className="w-full">
            <CardContent className="space-y-4">
                {/* Alertas */}
                {success && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            ¡Fase editada exitosamente!
                        </AlertDescription>
                    </Alert>
                )}

                {apiError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{apiError}</AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-4 md:grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label>Área de Competencia</Label>
                        <Input
                            id="area"
                            disabled
                            defaultValue={otherData.area}
                        />
                    </div>

                    {/* Nivel de competencia */}
                    <div className="space-y-2">
                        <Label>Nivel de competencia</Label>
                        <Input
                            id="nivel"
                            disabled
                            defaultValue={otherData.nivel}
                        />
                    </div>

                    {/* Campo Tipo de Fase */}
                    <div className="space-y-2">
                        <Label htmlFor="tipo_fase">
                            Tipo de Fase
                        </Label>
                        <Input
                            id="tipo_fase"
                            disabled
                            defaultValue={otherData.tipo_fase}
                        />
                    </div>

                    {/* Evaluadores */}
                    <div className="space-y-2">
                        <Label>Evaluadores</Label>
                        {
                            createFase && (
                                <>
                                    <Combobox
                                        items={evaluadores}
                                        value={evaluadoresField.value}
                                        onChange={evaluadoresField.onChange}
                                        placeholder="Seleccionar evaluadores..."
                                        searchPlaceholder="Buscar evaluadores..."
                                        multiple={true}
                                    />
                                    {errors.usuarios && (
                                        <p className="text-sm text-red-500">{errors.usuarios.message}</p>
                                    )}
                                </>
                            )
                        }
                        {
                            !createFase && (
                                <Input
                                    id="evaluadores"
                                    disabled
                                />
                            )
                        }
                    </div>
                </div>

                {
                    otherData.tipo_fase === 'finales' && (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {/* cantidad de ganadores */}
                            <div className="space-y-2">
                                <Label htmlFor="cantidad_ganadores">
                                    Cantidad de medallistas <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="cantidad_ganadores"
                                    type="number"
                                    placeholder="10"
                                    defaultValue={otherData.cantidad_ganadores}
                                    {...register("cantidad_ganadores", {
                                        ...newValidationRules.cantidad_ganadores,
                                        valueAsNumber: true
                                    })}
                                    className={errors.cantidad_ganadores ? "border-red-500" : ""}
                                />
                                {errors.cantidad_ganadores && (
                                    <p className="text-sm text-red-500">{errors.cantidad_ganadores.message}</p>
                                )}
                            </div>
                        </div>
                    )
                }

                {/* Fechas Sincronizadas */}
                <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label>Fecha y hora inicio del concurso <span className="text-red-500">*</span></Label>
                        <DateTimePicker
                            titleDate=""
                            titleTime=""
                            value={new Date(otherData.fecha_inicio)}
                            disabledDate={[
                                { before: new Date() },
                                { dayOfWeek: [0] },
                            ]}
                            onChange={(date) => {
                                if (date) {
                                    handleDateChange(date, 'fecha_inicio');
                                }
                            }}
                        />
                        {errors.fecha_inicio && (
                            <p className="text-sm text-red-500">{errors.fecha_inicio.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>Hora de Calificacion <span className="text-red-500">*</span></Label>
                        <DateTimePicker
                            titleDate=""
                            titleTime=""
                            disabledCalendar  // ← Deshabilita el calendario
                            value={new Date(otherData.fecha_calificacion)}
                            onChange={(date) => {
                                if (date) {
                                    handleDateChange(date, 'fecha_calificacion');
                                }
                            }}
                        />
                        {errors.fecha_calificacion && (
                            <p className="text-sm text-red-500">{errors.fecha_calificacion.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>Hora Fin <span className="text-red-500">*</span></Label>
                        <DateTimePicker
                            titleDate=""
                            titleTime=""
                            disabledCalendar  // ← Deshabilita el calendario
                            value={new Date(otherData.fecha_fin)}
                            onChange={(date) => {
                                if (date) {
                                    handleDateChange(date, 'fecha_fin');
                                }
                            }}
                        />
                        {errors.fecha_fin && (
                            <p className="text-sm text-red-500">{errors.fecha_fin.message}</p>
                        )}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
                <Button
                    type="button"
                    onClick={handleClick}
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Editando Fase..." : "Editar Fase"}
                </Button>

                {!success && (
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            reset();
                            setApiError("");
                        }}
                    >
                        Limpiar Formulario
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}