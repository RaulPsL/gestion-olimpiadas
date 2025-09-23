import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/Combobox";
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
    const [selectedArea, setSelectedArea] = React.useState<string>("");
    const [selectedEvaluadores, setSelectedEvaluadores] = React.useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
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
                    <div className="space-y-2">
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
                    </div>

                    {/* Campo Tipo de Fase */}
                    <div className="space-y-2">
                        <Label htmlFor="tipo_fase">
                            Tipo de Fase <span className="text-red-500">*</span>
                        </Label>
                        <Combobox />
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
                            onChange={(date) => setValue("fecha_inicio", date)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Fecha y Hora de Fin <span className="text-red-500">*</span></Label>
                        <DateTimePicker 
                            titleDate="Fecha fin" 
                            titleTime="Hora Fin"
                            onChange={(date) => setValue("fecha_fin", date)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Área */}
                    <div className="space-y-2">
                        <Label>Área de Competencia <span className="text-red-500">*</span></Label>
                        <Combobox
                            value={selectedArea ? [selectedArea] : []}
                            onChange={(areas) => {
                                setSelectedArea(areas[0] || "");
                                setValue("area", areas[0] || "");
                            }}
                            placeholder="Seleccionar área..."
                            multiple={false}
                        />
                    </div>

                    {/* Evaluadores */}
                    <div className="space-y-2">
                        <Label>Evaluadores</Label>
                        <Combobox
                            value={selectedEvaluadores}
                            onChange={setSelectedEvaluadores}
                            placeholder="Seleccionar evaluadores..."
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
                            selectedArea,
                            selectedEvaluadores,
                            setSelectedArea,
                            setSelectedEvaluadores
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
                            setSelectedArea("");
                            setSelectedEvaluadores([]);
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