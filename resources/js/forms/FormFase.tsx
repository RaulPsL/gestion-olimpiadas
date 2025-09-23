import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, useComboboxField } from "@/components/Combobox";
import { DateTimePicker } from "@/components/DateTimePicker";
import { FaseForm } from "./interfaces/Fase";
import { validationRules } from "./validations/FaseValidate";
import { updateArea } from "@/api/Areas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function FormFase() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);

    const mockAreas = [
    { id: 1, value: "MAT", label: "Matemáticas" },
    { id: 2, value: "FIS", label: "Física" },
    { id: 3, value: "QUI", label: "Química" },
    { id: 4, value: "BIO", label: "Biología" },
    { id: 5, value: "INFO", label: "Informática" }
    ];

    const mockTiposFase = [
    { id: 1, value: "clasificatorias", label: "Clasificatorias" },
    { id: 2, value: "semifinal", label: "Semifinal" },
    { id: 3, value: "final", label: "Final" },
    { id: 4, value: "eliminatoria", label: "Eliminatoria" }
    ];

    const mockEvaluadores = [
    { id: 1, value: "12345678", label: "Dr. Maria Lopez" },
    { id: 2, value: "87654321", label: "Ing. María García" },
    { id: 3, value: "11223344", label: "Prof. Carlos López" },
    { id: 4, value: "44332211", label: "Dra. Ana Martínez" },
    { id: 5, value: "55667788", label: "Lic. Pedro Rodríguez" }
    ];

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
            evaluadores: []
        }
    });

    const tipoFaseField = useComboboxField("tipo_fase", setValue, false);
    const areaField = useComboboxField("area", setValue, false);
    const evaluadoresField = useComboboxField("evaluadores", setValue, true);

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
                    {/* Campo Sigla */}
                    {/* <div className="space-y-2">
                        <Label htmlFor="sigla">
                            Sigla <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="sigla"
                            type="text"
                            placeholder="F1MAT"
                            {...register("sigla", validationRules.sigla)}
                            className={errors.sigla ? "border-red-500" : ""}
                        />
                        {errors.sigla && (
                            <p className="text-sm text-red-500">{errors.sigla.message}</p>
                        )}
                    </div> */}

                    {/* Campo Tipo de Fase */}
                    <div className="space-y-2">
                        <Label htmlFor="tipo_fase">
                            Tipo de Fase <span className="text-red-500">*</span>
                        </Label>
                        <Combobox
                            items={mockTiposFase}
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
                {/* <div className="space-y-2">
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
                </div> */}

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
                            items={mockAreas}
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
                            items={mockEvaluadores}
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