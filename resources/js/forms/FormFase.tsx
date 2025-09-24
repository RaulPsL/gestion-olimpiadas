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
import { set } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

export default function FormFase() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [areas, setAreas] = React.useState<any[]>();
    const [fases, setFases] = React.useState<any[]>();
    const [evaluadores, setEvaluadores] = React.useState<any[]>();

    useEffect(() => {
        const staticData = async () => {
            const staticData = await getStaticData();
            setAreas(staticData.areas);
            setFases(staticData.fases);
            setEvaluadores(staticData.evaluadores);
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
        watch
    } = useForm<FaseForm>({
        defaultValues: {
            sigla: "",
            tipo_fase: "",
            descripcion: "",
            cantidad_max_participantes: 20,
            cantidad_min_participantes: 10,
            fecha_inicio: new Date(),
            fecha_fin: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 semanas después
            area: "",
            usuarios: []
        }
    });

    const tipoFaseField = useComboboxField("tipo_fase", setValue, false);
    const areaField = useComboboxField("area", setValue, false);
    const evaluadoresField = useComboboxField("usuarios", setValue, true);

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                </div>

                {/* Campo Descripción */}
                <div className="space-y-2">
                    <Label htmlFor="descripcion">
                        Descripción <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="descripcion"
                        placeholder="Descripción detallada de la fase..."
                        {...register("descripcion", validationRules.descripcion)}
                        className={errors.descripcion ? "border-red-500" : ""}
                        rows={3}
                    />
                    {errors.descripcion && (
                        <p className="text-sm text-red-500">{errors.descripcion.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                ...validationRules.cantidad_min_participantes,
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
                                ...validationRules.cantidad_max_participantes,
                                valueAsNumber: true
                            })}
                            className={errors.cantidad_max_participantes ? "border-red-500" : ""}
                        />
                        {errors.cantidad_max_participantes && (
                            <p className="text-sm text-red-500">{errors.cantidad_max_participantes.message}</p>
                        )}
                    </div>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Fecha y Hora de Inicio <span className="text-red-500">*</span></Label>
                        <DateTimePicker 
                            titleDate="Fecha inicio" 
                            titleTime="Hora inicio"
                            onChange={(date) => setValue("fecha_inicio", getValues("fecha_inicio"))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Fecha y Hora de Fin <span className="text-red-500">*</span></Label>
                        <DateTimePicker 
                            titleDate="Fecha fin" 
                            titleTime="Hora Fin"
                            onChange={(date) => setValue("fecha_fin", getValues("fecha_fin"))}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Área */}
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
                            multiple={true}
                        />
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
};