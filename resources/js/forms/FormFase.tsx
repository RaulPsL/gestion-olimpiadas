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
import { axiosPrivate } from "@/api/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth, UserData } from "@/hooks/use-context";
import { useFilterAreasUser } from "@/hooks/use-areas-user";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/tables/DataTable";
import { createColumnsCreateFase, Fase } from "@/components/tables/ColumnsCreateFase";

export default function FormFase() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [areas, setAreas] = React.useState<any[]>();
    const [niveles, setNiveles] = React.useState<any[]>();
    const [fases, setFases] = React.useState<any[]>();
    const [evaluadores, setEvaluadores] = React.useState<any[]>();
    const [areasFiltradas, setAreasFiltradas] = React.useState<any[]>([]);
    const [minutes, setMinutes] = React.useState(0);
    const [fechaFin, setFechaFin] = React.useState<string>("");
    const [fechaCalificacion, setFechaCallificacion] = React.useState<string>("");
    const [sharedDate, setSharedDate] = React.useState<Date>(new Date());
    const [faseFlash, setFaseFlash] = React.useState<boolean>(false);
    const [siguiente, setSiguiente] = React.useState<boolean>(false);
    const [cantidadFases, setCantidadFases] = React.useState<number>(3);
    const [tablaFases, setTablaFases] = React.useState<Fase[]>([]);
    const [puedeAvanzar, setPuedeAvanzar] = React.useState<boolean>(false);

    const { data } = useAuth();

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
        unregister,
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
            cantidad_ganadores: 0,
            fecha_inicio: new Date(),
            fecha_calificacion: new Date(Date.now() + 60 * 60 * 1000),
            fecha_fin: new Date(Date.now() + 120 * 60 * 1000),
            area: "",
            nivel: "",
            usuarios: [],
            flash: false,
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
        register('fecha_calificacion', newValidationRules.fecha_calificacion);
        register('fecha_fin', newValidationRules.fecha_fin);
        setValue('cantidad_ganadores', 0);
    });

    const generarTablaFases = () => {
        if (cantidadFases && cantidadFases > 0) {
            let newTabla: Fase[] = [];
            nivelesField.value.map(
                (nivel) => {
                    let i = 1;
                    let fechaCalificacion = getValues('fecha_calificacion');
                    let fechaInicio = getValues('fecha_inicio');
                    let fechaFin = getValues('fecha_fin');
                    while (i <= cantidadFases) {
                        let tipoFase = "preliminares";
                        if (i > 1) {
                            tipoFase = "clasificatorias";
                        }
                        if (i == cantidadFases) {
                            tipoFase = 'finales';
                        }
                        newTabla.push({
                            area: getValues('area'),
                            nivel: nivel,
                            descripcion: getValues('descripcion'),
                            cantidad_ganadores: 0,
                            cantidad_max_participantes: getValues('cantidad_max_participantes'),
                            cantidad_min_participantes: getValues('cantidad_min_participantes'),
                            fecha_calificacion: fechaCalificacion ?? new Date(),
                            fecha_inicio: fechaInicio ?? new Date(),
                            fecha_fin: fechaFin ?? new Date(),
                            usuarios: evaluadoresField.value,
                            tipo_fase: tipoFase,
                        });
                        fechaInicio = fechaFin;
                        fechaCalificacion = fechaInicio ? new Date(fechaInicio?.getTime() + minutes * 60 * 30000) : new Date();
                        fechaFin = fechaInicio ? new Date(fechaInicio?.getTime() + minutes * 60 * 60000) : new Date();
                        i++;
                    }
                }
            );
            setTablaFases(newTabla);
        }
    };

    // Función para manejar la edición de una fase en la tabla
    const handleEditFase = (faseEditada: Fase, index: number) => {
        setTablaFases(prevFases => {
            const nuevasFases = [...prevFases];
            nuevasFases[index] = faseEditada;
            return nuevasFases;
        });
    };

    const columnsCreateFase = createColumnsCreateFase(
        evaluadores ? evaluadores : [],
        evaluadoresField.value,
        handleEditFase
    );

    // Validar si puede avanzar al siguiente paso
    React.useEffect(() => {
        const validarCampos = async () => {
            if (faseFlash) {
                // Para fase flash, validar todos los campos del formulario
                const camposRequeridos = [
                    'area',
                    'nivel',
                    'tipo_fase',
                    'descripcion',
                    'cantidad_min_participantes',
                    'cantidad_max_participantes',
                    'fecha_inicio',
                    'fecha_calificacion',
                    'fecha_fin'
                ];

                const todosValidos = await Promise.all(
                    camposRequeridos.map(campo => trigger(campo as any))
                );

                setPuedeAvanzar(todosValidos.every(valido => valido));
            } else {
                // Para múltiples fases, validar solo los campos básicos
                const esValido =
                    areaField.value.length > 0 &&
                    nivelesField.value.length > 0 &&
                    cantidadFases > 0 &&
                    getValues('cantidad_min_participantes') > 0 &&
                    getValues('cantidad_max_participantes') > 0 &&
                    getValues('fecha_inicio') !== undefined;

                setPuedeAvanzar(esValido);
            }
        };

        validarCampos();
    }, [
        areaField.value,
        nivelesField.value,
        cantidadFases,
        faseFlash,
        watch('cantidad_min_participantes'),
        watch('cantidad_max_participantes'),
        watch('fecha_inicio'),
        watch('fecha_calificacion'),
        watch('fecha_fin'),
        watch('descripcion'),
        tipoFaseField.value
    ]);

    React.useEffect(() => {
        if (areaField.value.length > 0) {
            // Buscar en areasFiltradas primero, luego en areas como fallback
            const areasSource = areasFiltradas.length > 0 ? areasFiltradas : (areas || []);
            const areaSeleccionada = areasSource.find((area) => area.value === areaField.value[0]);
            
            if (areaSeleccionada) {
                setNiveles(areaSeleccionada.niveles || []);
                setEvaluadores(areaSeleccionada.evaluadores || []);
            } else {
                setNiveles([]);
                setEvaluadores([]);
            }
        } else {
            setNiveles([]);
            setEvaluadores([]);
        }
    }, [areaField.value, areasFiltradas, areas]);

    React.useEffect(() => {
        if (faseFlash === true) {
            const fechaInicio = new Date(Date.now() + 30 * 60 * 1000)
            setFases(prev => prev?.filter((tipoFase) => tipoFase.value === 'clasificatorias'));
            setValue('cantidad_min_participantes', 10);
            setValue('cantidad_max_participantes', 100);
            register('cantidad_ganadores');
            setValue('cantidad_ganadores', 10);
            setValue('descripcion', 'Breve descripcion de la fase');
            setValue('fecha_inicio', fechaInicio);
        }
        setValue('flash', faseFlash);
    }, [faseFlash]);

    // Filtrar las áreas según el usuario (hook SIEMPRE debe ejecutarse)
    useFilterAreasUser(areas || [], data as UserData, areasFiltradas, setAreasFiltradas);

    const formatTime = (dateTime: Date) => {
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const mins = dateTime.getMinutes().toString().padStart(2, '0');

        return `${hours}:${mins}`;
    };

    React.useEffect(() => {
        if (minutes > 0) {
            const fechaInicio = getValues('fecha_inicio');
            const fecha_calificacion = new Date(fechaInicio.getTime() + minutes * 60 * 30000);
            const fecha_fin = new Date(fechaInicio.getTime() + minutes * 60 * 60000);

            setFechaCallificacion(formatTime(fecha_calificacion));
            setFechaFin(formatTime(fecha_fin));
            setValue('fecha_calificacion', fecha_calificacion);
            setValue('fecha_fin', fecha_fin);
        }
    }, [minutes, getValues('fecha_inicio')]);

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
                <CardTitle className="flex flex-row justify-between">
                    <p>Registro de Fase</p>
                    {
                        !siguiente && (
                            <div className="flex flex-row space-x-5 items-center">
                                <Badge className="text-center font-mono text-sm bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30">
                                    {'Si quiere crear una sola fase presiona aquí ->'}
                                </Badge>
                                <Checkbox
                                    checked={faseFlash}
                                    onCheckedChange={(checked) => {
                                        setFaseFlash(checked === true);
                                        register('cantidad_ganadores');
                                    }}
                                />
                            </div>
                        )
                    }
                </CardTitle>
                <CardDescription>
                    {`Complete los datos para crear ${faseFlash ? 'una nueva fase' : 'nuevas fases'} de competencia para el área y ${faseFlash ? 'nivel' : 'niveles'}.`}
                </CardDescription>
            </CardHeader>

            {
                !siguiente && (
                    <CardContent className="space-y-4">
                        {/* Alertas */}
                        {success && (
                            <Alert className="border-green-200 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">
                                    ¡Fase(s) creada exitosamente!
                                </AlertDescription>
                            </Alert>
                        )}

                        {apiError && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{apiError}</AlertDescription>
                            </Alert>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-lg p-4 border">
                            <div className="space-y-2">
                                <Label>Área de Competencia <span className="text-red-500">*</span></Label>
                                <Combobox
                                    items={areasFiltradas}
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
                                    multiple={true}
                                />
                                {errors.area && (
                                    <p className="text-sm text-red-500">{errors.area.message}</p>
                                )}
                            </div>

                            {/* Campo Tipo de Fase */}
                            {
                                faseFlash ? (
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
                                ) : (
                                    <div className="space-y-2">
                                        <Label htmlFor="cantidad_fases">
                                            Cantidad de fases <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="cantidad_fases"
                                            type="number"
                                            placeholder="10"
                                            onChange={(e) => setCantidadFases(Number(e.target.value))}
                                        // className={errors.cantidad_fases ? "border-red-500" : ""}
                                        />
                                        {/* {errors.cantidad_fases && (
                                    <p className="text-sm text-red-500">{errors.cantidad_fases.message}</p>
                                )} */}
                                    </div>
                                )
                            }

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
                        {
                            !faseFlash && (
                                <div className="space-y-2 rounded-lg p-4 border">
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
                            )
                        }

                        {
                            !faseFlash && (
                                <div className={`grid grid-cols-1 md:grid-cols-${tipoFaseField.value[0] === 'finales' ? '3' : '2'} gap-4 rounded-lg p-4 border`}>
                                    {/* Cantidad Mínima */}
                                    <div className="space-y-2">
                                        <Label htmlFor="cantidad_min_participantes">
                                            Cantidad Mínima Participantes<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="cantidad_min_participantes"
                                            type="number"
                                            placeholder="10"
                                            disabled={!faseFlash}
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
                                            Cantidad Máxima Participantes<span className="text-red-500">*</span>
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
                                    {
                                        tipoFaseField.value[0] === 'finales' && (
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
                                        )
                                    }
                                </div>
                            )
                        }

                        {/* Fechas Sincronizadas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2 rounded-lg p-4 border">
                                <Label>Fecha y hora inicio del concurso <span className="text-red-500">*</span></Label>
                                <DateTimePicker
                                    titleDate=""
                                    titleTime=""
                                    value={getValues('fecha_inicio')}
                                    disabledCalendar={faseFlash}
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
                            {
                                faseFlash && (
                                    <div className="space-y-2 col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="space-y-2 rounded-lg p-4 border">
                                            <Label>Hora de Calificacion <span className="text-red-500">*</span></Label>
                                            <DateTimePicker
                                                titleDate=""
                                                titleTime=""
                                                disabledCalendar
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
                                        <div className="space-y-2 rounded-lg p-4 border">
                                            <Label>Hora Fin <span className="text-red-500">*</span></Label>
                                            <DateTimePicker
                                                titleDate=""
                                                titleTime=""
                                                disabledCalendar
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
                                )
                            }
                            {
                                !faseFlash && (
                                    <div className="space-y-2 col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="space-y-2 rounded-lg p-4 border">
                                            <Label className="block text-sm font-medium text-white mb-3">
                                                Tiempo de duración de la fase:
                                            </Label>
                                            <div className="grid grid-cols-4 gap-2 mt-3">
                                                {[1, 2, 3, 4].map((val) => (
                                                    <Button
                                                        key={val}
                                                        type="button"
                                                        onClick={() => {
                                                            setMinutes(val);
                                                        }}
                                                        className={`px-3 text-sm font-medium rounded-lg transition-colors ${minutes === val
                                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                                            : 'bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground'
                                                            }`}
                                                    >
                                                        {val} horas
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Preview de la hora resultante */}
                                        <div className="space-y-2 border rounded-lg p-4 flex flex-col justify-center">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-white">Hora de calificacion:</span>
                                                    <span className="text-lg font-semibold text-white">{fechaCalificacion}</span>
                                                </div>
                                                <div className="text-white text-lg font-bold"> → </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-white">Hora de premiacion:</span>
                                                    <span className="text-lg font-bold text-white">{fechaFin}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </CardContent>
                )
            }

            {
                siguiente && (
                    <CardContent>
                        <DataTable
                            data={tablaFases}
                            columns={columnsCreateFase}
                        />
                    </CardContent>
                )
            }

            <CardFooter className="flex flex-col gap-3">
                {!siguiente ? (
                    <>
                        <Button
                            type="button"
                            onClick={() => {
                                if (faseFlash) {
                                    // Si es fase flash, enviar directamente
                                    handleSubmit(
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
                                    )();
                                } else {
                                    // Si no es fase flash, generar tabla y avanzar
                                    generarTablaFases();
                                    setSiguiente(true);
                                }
                            }}
                            className="w-full"
                            disabled={isLoading || !puedeAvanzar}
                        >
                            {faseFlash
                                ? (isLoading ? "Creando Fase..." : "Crear Fase")
                                : "Siguiente"}
                        </Button>

                        {!success && (
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    tipoFaseField.reset();
                                    nivelesField.reset();
                                    areaField.reset();
                                    evaluadoresField.reset();
                                    reset();
                                    setApiError("");
                                    setSiguiente(false);
                                    setTablaFases([]);
                                }}
                            >
                                Limpiar Formulario
                            </Button>
                        )}
                    </>
                ) : (
                    <>
                        <Button
                            type="button"
                            onClick={async () => {
                                if (tablaFases.length === 0) return;
                                
                                setIsLoading(true);
                                setApiError("");
                                setSuccess(false);
                                
                                try {
                                    console.log("Enviando fases:", tablaFases);
                                    
                                    const result = await axiosPrivate.put(`/areas/${areaField.value[0]}`, {
                                        fases: tablaFases
                                    });

                                    console.log("Respuesta del servidor:", result);

                                    if (result.status === 201) {
                                        setSuccess(true);
                                        
                                        // Resetear formulario después de 2 segundos
                                        setTimeout(() => {
                                            reset();
                                            areaField.reset();
                                            evaluadoresField.reset();
                                            nivelesField.reset();
                                            tipoFaseField.reset();
                                            setSiguiente(false);
                                            setTablaFases([]);
                                            setSuccess(false);
                                        }, 2000);
                                    }
                                } catch (error: any) {
                                    console.error("Error al crear las fases:", error);
                                    
                                    if (error.response?.status === 422) {
                                        const backendErrors = error.response.data.errors;
                                        if (backendErrors) {
                                            const errorMessages = Object.values(backendErrors).flat();
                                            setApiError(errorMessages.join(", "));
                                        } else {
                                            setApiError(error.response.data.message || "Error de validación");
                                        }
                                    } else {
                                        setApiError("Error al crear las fases. Intente nuevamente.");
                                    }
                                } finally {
                                    setIsLoading(false);
                                }
                            }}
                            className="w-full"
                            disabled={isLoading || tablaFases.length === 0}
                        >
                            {isLoading ? "Creando Fases..." : "Crear Todas las Fases"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                                setSiguiente(false);
                                setTablaFases([]);
                            }}
                            disabled={isLoading}
                        >
                            Volver Atrás
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}