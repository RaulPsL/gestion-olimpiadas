import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, useComboboxField } from "@/components/Combobox";
import { AlertCircle, CheckCircle } from "lucide-react";
import { createOlimpista, getStaticData } from "@/api/Olimpistas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { validationRules } from "./validations/OlimpistaValidate";
import { OlimpistaForm } from "./interfaces/Olimpista";

export default function FormOlimpista() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [selectedArea, setSelectedArea] = React.useState<string[]>([]);
    const [areas, setAreas] = React.useState<any[]>();
    
    React.useEffect(() => {
        const staticData = async () => {
            const staticData = await getStaticData();
            setAreas(staticData.areas);
        };
        staticData();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
        getValues
    } = useForm<OlimpistaForm>({
        defaultValues: {
            nombres: "",
            apellido_paterno: "",
            apellido_materno: "",
            codigo_sis: undefined,
            semestre: 1,
            estado: "activo",
            areas: []
        }
    });
    const areaField = useComboboxField("areas", setValue, false);

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Registro de olimpistas</CardTitle>
                <CardDescription>
                    Ingrese los campos que son obligatrios para el registro
                </CardDescription>
            </CardHeader>
            <CardContent>
                {success && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            ¡Olimpista registrado exitosamente!
                        </AlertDescription>
                    </Alert>
                )}

                {apiError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {apiError}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="space-y-2">
                    <Label htmlFor="nombres">
                        Nombres <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="nombres"
                        type="text"
                        placeholder="Juan Carlos"
                        {...register("nombres", validationRules.nombres)}
                        className={errors.nombres ? "border-red-500" : ""}
                    />
                    {errors.nombres && (
                        <p className="text-sm text-red-500">{errors.nombres.message}</p>
                    )}
                </div>

                {/* Campo Apellido Paterno */}
                <div className="space-y-2">
                    <Label htmlFor="apellido_paterno">
                        Apellido Paterno <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="apellido_paterno"
                        type="text"
                        placeholder="García"
                        {...register("apellido_paterno", validationRules.apellido_paterno)}
                        className={errors.apellido_paterno ? "border-red-500" : ""}
                    />
                    {errors.apellido_paterno && (
                        <p className="text-sm text-red-500">{errors.apellido_paterno.message}</p>
                    )}
                </div>

                {/* Campo Apellido Materno */}
                <div className="space-y-2">
                    <Label htmlFor="apellido_materno">
                        Apellido Materno <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="apellido_materno"
                        type="text"
                        placeholder="López"
                        {...register("apellido_materno", validationRules.apellido_materno)}
                        className={errors.apellido_materno ? "border-red-500" : ""}
                    />
                    {errors.apellido_materno && (
                        <p className="text-sm text-red-500">{errors.apellido_materno.message}</p>
                    )}
                </div>

                {/* Campo Código SIS */}
                <div className="space-y-2">
                    <Label htmlFor="codigo_sis">
                        Código SIS <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="codigo_sis"
                        type="number"
                        placeholder="201938384"
                        {...register("codigo_sis", {
                            ...validationRules.codigo_sis,
                            valueAsNumber: true
                        })}
                        className={errors.codigo_sis ? "border-red-500" : ""}
                    />
                    {errors.codigo_sis && (
                        <p className="text-sm text-red-500">{errors.codigo_sis.message}</p>
                    )}
                </div>

                {/* Campo Semestre */}
                <div className="space-y-2">
                    <Label htmlFor="semestre">
                        Semestre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="semestre"
                        type="number"
                        placeholder="1"
                        min="1"
                        max="12"
                        {...register("semestre", {
                            ...validationRules.semestre,
                            valueAsNumber: true
                        })}
                        className={errors.semestre ? "border-red-500" : ""}
                    />
                    {errors.semestre && (
                        <p className="text-sm text-red-500">{errors.semestre.message}</p>
                    )}
                </div>

                {/* Campo Área */}
                <div className="space-y-2">
                    <Label htmlFor="area">
                        Área de Competencia <span className="text-red-500">*</span>
                    </Label>
                    <Combobox
                        items={areas}
                        value={areaField.value}
                        onChange={areaField.onChange}
                        placeholder="Seleccionar área..."
                        searchPlaceholder="Buscar área..."
                        multiple={true}
                    />
                    {areas?.length === 0 && apiError.includes("área") && (
                        <p className="text-sm text-red-500">Debe seleccionar al menos un área</p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
                <Button 
                    type="button"
                    onClick={
                        handleSubmit((data) => 
                            createOlimpista(
                                data,
                                setIsLoading,
                                setSuccess,
                                setApiError,
                                () => areaField.reset(),
                                reset,
                                areaField.value as string[],
                            )
                        )} 
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Registrando..." : "Registrar Olimpista"}
                </Button>
                
                {!success && (
                    <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                            reset();
                            setSelectedArea([]);
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