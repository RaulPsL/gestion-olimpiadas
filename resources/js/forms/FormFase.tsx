import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, useComboboxField } from "@/components/Combobox";
import { DateTimePicker } from "@/components/DateTimePicker";
import { FaseForm } from "./interfaces/Fase";
import { validationRules } from "./validations/FaseValidate";
import { getStaticData, updateArea } from "@/api/Areas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function FormFase() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [areas, setAreas] = React.useState<any[]>();
    const [niveles, setNiveles] = React.useState<any[]>();
    const [fases, setFases] = React.useState<any[]>();
    const [evaluadores, setEvaluadores] = React.useState<any[]>();
    // const [nivelSelected, setNivelSelected] = React.useState<string>("");

    // Estado para la fecha compartida
    const [sharedDate, setSharedDate] = React.useState<Date>(new Date());

    useEffect(() => {
        const staticData = async () => {
            const staticData = await getStaticData();
            setAreas(staticData.areas);
            setFases(staticData.fases);
            setEvaluadores(staticData.evaluadores);
            setNiveles(staticData.niveles);
        };
        staticData();
    }, []);

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
            cantidad_min_participantes: 10,
            fecha_inicio: new Date(),
            fecha_calificacion: new Date(Date.now() + 60 * 60 * 1000),
            fecha_fin: new Date(Date.now() + 120 * 60 * 1000),
            area: "",
            nivel: "",
            usuarios: []
        }
    });

    const newValidationRules = validationRules(watch);
    const tipoFaseField = useComboboxField("tipo_fase", setValue, false, trigger);
    const areaField = useComboboxField("area", setValue, false, trigger);
    const nivelesField = useComboboxField("nivel", setValue, false, trigger);
    const evaluadoresField = useComboboxField("usuarios", setValue, true, trigger);

    React.useEffect(() => {
        register('area', newValidationRules.area);
        register('tipo_fase', newValidationRules.tipo_fase);
        register('usuarios', newValidationRules.usuarios);
        register('fecha_inicio', newValidationRules.fecha_inicio);
        register('fecha_calificacion', newValidationRules.fecha_fin);
        register('fecha_fin', newValidationRules.fecha_fin);
    });

    React.useEffect(() => {
        if (areaField.value.length > 0) {
            setNiveles(areas?.find((area) => area.value === areaField.value[0]).niveles);
            setEvaluadores(areas?.find((area) => area.value === areaField.value[0]).evaluadores);
        } else {
            setNiveles([]);
            setEvaluadores([]);
        }
    }, [areaField.value]);

    // Add filters to selected area then filter levels and evaluadores
    // Reemplaza tu función handleDateChange con esta versión corregida:

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

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Registro de Fase</CardTitle>
                <CardDescription>
                    Complete los datos para crear una nueva fase de competencia
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Alertas */}
                {success && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            ¡Fase creada exitosamente!
                        </AlertDescription>
                    </Alert>
                )}

                {apiError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{apiError}</AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label>Área de Competencia <span className="text-red-500">*</span></Label>
                        <Combobox
                            items={areas}
                            value={areaField.value}
                            onChange={areaField.onChange}
                            placeholder="Seleccionar área..."
                            searchPlaceholder="Buscar área..."
                            multiple={false}
                        />
                        {errors.area && (
                            <p className="text-sm text-red-500">{errors.area.message}</p>
                        )}
                    </div>

                    {/* Campo Tipo de Fase */}
                    <div className="space-y-2">
                        <Label htmlFor="tipo_fase">
                            Tipo de Fase <span className="text-red-500">*</span>
                        </Label>
                        <Combobox
                            items={fases}
                            value={tipoFaseField.value}
                            onChange={tipoFaseField.onChange}
                            placeholder="Seleccionar tipo de fase..."
                            searchPlaceholder="Buscar tipo de fase..."
                            multiple={false}
                        />
                        {errors.tipo_fase && (
                            <p className="text-sm text-red-500">{errors.tipo_fase.message}</p>
                        )}
                    </div>

                    {/* Nivel de competencia */}
                    <div className="space-y-2">
                        <Label>Nivel de competencia <span className="text-red-500">*</span></Label>
                        <Combobox
                            items={niveles}
                            value={nivelesField.value}
                            onChange={nivelesField.onChange}
                            placeholder="Seleccionar nivel..."
                            searchPlaceholder="Buscar nivel..."
                            disabled={areaField.value.length === 0}
                            multiple={false}
                        />
                        {errors.area && (
                            <p className="text-sm text-red-500">{errors.area.message}</p>
                        )}
                    </div>

                    {/* Evaluadores */}
                    <div className="space-y-2">
                        <Label>Evaluadores</Label>
                        <Combobox
                            items={evaluadores}
                            value={evaluadoresField.value}
                            onChange={evaluadoresField.onChange}
                            placeholder="Seleccionar evaluadores..."
                            searchPlaceholder="Buscar evaluadores..."
                            disabled={areaField.value.length === 0}
                            multiple={true}
                        />
                        {errors.usuarios && (
                            <p className="text-sm text-red-500">{errors.usuarios.message}</p>
                        )}
                    </div>
                </div>

                {/* Campo Descripción */}
                <div className="space-y-2">
                    <Label htmlFor="descripcion">
                        Descripción <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="descripcion"
                        placeholder="Descripción detallada de la fase..."
                        {...register("descripcion", newValidationRules.descripcion)}
                        className={errors.descripcion ? "border-red-500" : ""}
                        rows={3}
                    />
                    {errors.descripcion && (
                        <p className="text-sm text-red-500">{errors.descripcion.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Cantidad Mínima */}
                    <div className="space-y-2">
                        <Label htmlFor="cantidad_min_participantes">
                            Cantidad Mínima <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="cantidad_min_participantes"
                            type="number"
                            placeholder="10"
                            {...register("cantidad_min_participantes", {
                                ...newValidationRules.cantidad_min_participantes,
                                valueAsNumber: true
                            })}
                            className={errors.cantidad_min_participantes ? "border-red-500" : ""}
                        />
                        {errors.cantidad_min_participantes && (
                            <p className="text-sm text-red-500">{errors.cantidad_min_participantes.message}</p>
                        )}
                    </div>

                    {/* Cantidad Máxima */}
                    <div className="space-y-2">
                        <Label htmlFor="cantidad_max_participantes">
                            Cantidad Máxima <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="cantidad_max_participantes"
                            type="number"
                            placeholder="20"
                            {...register("cantidad_max_participantes", {
                                ...newValidationRules.cantidad_max_participantes,
                                valueAsNumber: true
                            })}
                            className={errors.cantidad_max_participantes ? "border-red-500" : ""}
                        />
                        {errors.cantidad_max_participantes && (
                            <p className="text-sm text-red-500">{errors.cantidad_max_participantes.message}</p>
                        )}
                    </div>

                    {/* cantidad de ganadores */}
                    <div className="space-y-2">
                        <Label htmlFor="cantidad_ganadores">
                            Cantidad de ganadores <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="cantidad_ganadores"
                            type="number"
                            placeholder="10"
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

                {/* Fechas Sincronizadas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>Fecha y hora inicio del concurso <span className="text-red-500">*</span></Label>
                        <DateTimePicker
                            titleDate=""
                            titleTime=""
                            value={getValues('fecha_inicio')}
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
                            value={getValues('fecha_calificacion')}
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
                            value={getValues('fecha_fin')}
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
                    onClick={handleSubmit(
                        (data) => updateArea(
                            data,
                            reset,
                            setIsLoading,
                            setSuccess,
                            setApiError,
                            areaField.value[0] as string || "",
                            evaluadoresField.value as string[],
                            () => areaField.reset(),
                            () => evaluadoresField.reset()
                        )
                    )}
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Creando Fase..." : "Crear Fase"}
                </Button>

                {!success && (
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            tipoFaseField.reset();
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