import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, useComboboxField } from "@/components/Combobox";
import { AlertCircle, CheckCircle, ChevronLeft } from "lucide-react";
import { createOlimpista, getStaticData } from "@/api/Olimpistas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { validationRules } from "./validations/OlimpistaValidate";
import { OlimpistaForm } from "./interfaces/Olimpista";
import { Checkbox } from "@/components/ui/checkbox";

export default function FormOlimpista() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [siguienteForm, setSiguienteForm] = React.useState<boolean>(false);
    const [activoFormAcademico, setActivoFormAcademico] = React.useState<boolean>(true);
    const [selectedArea, setSelectedArea] = React.useState<string[]>([]);
    const [areas, setAreas] = React.useState<any[]>();
    const [grados, setGrados] = React.useState<any[]>();
    const [niveles, setNiveles] = React.useState<any[]>();
    const [departamentos, setDepartamentos] = React.useState<any[]>();
    
    
    React.useEffect(() => {
        const staticData = async () => {
            const staticData = await getStaticData();
            setAreas(staticData.areas);
            setGrados(staticData.grados);
            setNiveles(staticData.niveles);
            setDepartamentos(staticData.departamentos);
        };
        staticData();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        unregister,
        trigger,
        getValues
    } = useForm<OlimpistaForm>({
        defaultValues: {
            nombres: "",
            apellido_paterno: "",
            apellido_materno: "",
            celular: 72345678,
            ci: "",
            grado_escolar: "primero",
            nivel_competencia: "primaria",
            estado: "activo",
            areas: [],
            tutor: {
                nombre_tutor: "",
                referencia_tutor: 0,
            },
            tutor_academico: {
                nombres_tutor_academico: "",
                apellidos_tutor_academico: "",
                celular_tutor_academico: 12345678,
                email_tutor_academico: "",
                ci_tutor_academico: "",
            },
            colegio: {
                nombre_colegio: "",
                direccion_colegio: "",
                telefono_colegio: 1234567,
                departamento_colegio: "",
            }
        }
    });

    const areaField = useComboboxField("areas", setValue, false);
    const gradoField = useComboboxField("grado_escolar", setValue, false);
    const nivelField = useComboboxField("nivel_competencia", setValue, false);
    const departamentoField = useComboboxField("colegio.departamento_colegio", setValue, false);

    const handleNext = async () => {
        // Validar campos del primer paso
        const firstStepFields = [
            'nombres', 'apellido_paterno', 'apellido_materno', 'ci', 
            'grado_escolar', 'nivel_competencia', 'areas', 
            'tutor.nombre_tutor', 'tutor.referencia_tutor'
        ];
        
        const isValid = await trigger(firstStepFields as any);
        if (isValid) {
            setSiguienteForm(true);
        }
    };

    const handleBack = () => {
        setSiguienteForm(false);
    };

    const handleFinalSubmit = async () => {
        const secondStepFields = [
            "tutor_academico.nombres_tutor_academico",
            "tutor_academico.apellidos_tutor_academico",
            "tutor_academico.celular_tutor_academico",
            "tutor_academico.email_tutor_academico",
            "tutor_academico.ci_tutor_academico",
            "colegio.nombre_colegio",
            "colegio.direccion_colegio",
            "colegio.telefono_colegio",
            "colegio.departamento_colegio",
        ];

        const isValid = await trigger(secondStepFields as any);
        if (!isValid && activoFormAcademico) return;

        const data = getValues();

        if (!activoFormAcademico) {
            delete data.tutor_academico;
        }
        createOlimpista(
            data,
            setIsLoading,
            setSuccess,
            setApiError,
            () => areaField.reset(),
            reset,
            areaField.value as string[],
            activoFormAcademico,
        );
    };

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>
                    Registro de {siguienteForm ? "datos académicos" : "datos personales"}
                </CardTitle>
                <CardDescription>
                    Ingrese los campos que son obligatorios para el registro
                    {success && (
                        <Alert className="border-green-200 bg-green-50 mt-4">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                ¡Olimpista registrado exitosamente!
                            </AlertDescription>
                        </Alert>
                    )}

                    {apiError && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                {apiError}
                            </AlertDescription>
                        </Alert>
                    )}
                </CardDescription>
            </CardHeader>

            {/* Contenedor con animación de deslizamiento */}
            <div className="relative overflow-hidden">
                <div 
                    className={`flex transition-transform duration-500 ease-in-out ${
                        siguienteForm ? '-translate-x-1/2' : 'translate-x-0'
                    }`}
                    style={{ width: '200%' }}
                >
                    {/* Primer paso: Datos personales */}
                    <CardContent className="w-1/2 flex-shrink-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0">
                            {/* Nombres */}
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

                            {/* Apellido Paterno */}
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

                            {/* Apellido Materno */}
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

                            {/* C.I. */}
                            <div className="space-y-2">
                                <Label htmlFor="ci">
                                    C.I. <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="ci"
                                    type="text"
                                    placeholder="8947493"
                                    {...register("ci", validationRules.ci)}
                                    className={errors.ci ? "border-red-500" : ""}
                                />
                                {errors.ci && (
                                    <p className="text-sm text-red-500">{errors.ci.message}</p>
                                )}
                            </div>
                            
                            {/* Celular. */}
                            <div className="space-y-2">
                                <Label htmlFor="celular">
                                    Celular <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="celular"
                                    type="number"
                                    placeholder="78947493"
                                    {...register("celular", {
                                        ...validationRules.celular,
                                        valueAsNumber: true
                                    })}
                                    className={errors.celular ? "border-red-500" : ""}
                                />
                                {errors.celular && (
                                    <p className="text-sm text-red-500">{errors.celular.message}</p>
                                )}
                            </div>
                            
                            {/* Área de Competencia - span completo */}
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

                            {/* Grado Escolar */}
                            <div className="space-y-2">
                                <Label htmlFor="grado_escolar">
                                    Grado escolar <span className="text-red-500">*</span>
                                </Label>
                                <Combobox
                                    items={grados}
                                    value={gradoField.value}
                                    onChange={gradoField.onChange}
                                    placeholder="Seleccionar grado..."
                                    searchPlaceholder=""
                                    multiple={false}
                                />
                                {gradoField.value === undefined && apiError.includes("grados") && (
                                    <p className="text-sm text-red-500">Debe seleccionar el grado escolar</p>
                                )}
                            </div>

                            {/* Nivel de Competencia */}
                            <div className="space-y-2">
                                <Label htmlFor="nivel_competencia">
                                    Nivel de competencia <span className="text-red-500">*</span>
                                </Label>
                                <Combobox
                                    items={niveles}
                                    value={nivelField.value}
                                    onChange={nivelField.onChange}
                                    placeholder="Seleccionar nivel..."
                                    searchPlaceholder=""
                                    multiple={false}
                                />
                                {nivelField.value === undefined && apiError.includes("niveles") && (
                                    <p className="text-sm text-red-500">Debe seleccionar el nivel de competencia</p>
                                )}
                            </div>

                            {/* Nombre del Tutor */}
                            <div className="space-y-2">
                                <Label htmlFor="tutor">
                                    Nombre del tutor/apoderado <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="tutor"
                                    type="text"
                                    placeholder="Ej: Juan Gonzales"
                                    {...register("tutor.nombre_tutor", validationRules.nombre_tutor)}
                                    className={errors.tutor?.nombre_tutor ? "border-red-500" : ""}
                                />
                                {errors.tutor?.nombre_tutor && (
                                    <p className="text-sm text-red-500">{errors.tutor?.nombre_tutor.message}</p>
                                )}
                            </div>

                            {/* Referencia Tutor */}
                            <div className="space-y-2">
                                <Label htmlFor="referencia_tutor">
                                    Referencia tutor <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="referencia_tutor"
                                    type="number"
                                    placeholder="72345678"
                                    {...register("tutor.referencia_tutor", {
                                        ...validationRules.referencia_tutor,
                                        valueAsNumber: true
                                    })}
                                    className={errors.tutor?.referencia_tutor ? "border-red-500" : ""}
                                />
                                {errors.tutor?.referencia_tutor && (
                                    <p className="text-sm text-red-500">{errors.tutor?.referencia_tutor.message}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>

                    {/* Segundo paso: Datos académicos */}
                    <CardContent className="w-1/2 flex-shrink-0">
                        <div className="space-y-8">
                            {/* Sección Tutor Académico */}
                            <div className={`space-y-4 `}>
                                <div className="flex flex-row content-between">
                                    <h4 className="text-base font-semibold text-foreground border-b pb-2">
                                        Datos del Tutor Académico
                                    </h4>
                                    <Checkbox
                                        checked={activoFormAcademico}
                                        onCheckedChange={(checked) => {
                                            setActivoFormAcademico(checked === true);
                                            if (activoFormAcademico === false) {
                                                unregister("tutor_academico");
                                            }
                                        }}
                                    />
                                </div>
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${ activoFormAcademico ? '' : 'hidden'}`}>
                                    {/* Nombre Tutor Académico */}
                                    <div className="space-y-2">
                                        <Label htmlFor="nombres_tutor">
                                            Nombre tutor académico <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="nombres_tutor"
                                            type="text"
                                            placeholder="Juan Carlos"
                                            {...register("tutor_academico.nombres_tutor_academico", validationRules.nombres_tutor_academico)}
                                            className={errors.tutor_academico?.nombres_tutor_academico ? "border-red-500" : ""}
                                        />
                                        {errors.tutor_academico?.nombres_tutor_academico && (
                                            <p className="text-sm text-red-500">{errors.tutor_academico?.nombres_tutor_academico.message}</p>
                                        )}
                                    </div>

                                    {/* Apellidos Tutor Académico */}
                                    <div className="space-y-2">
                                        <Label htmlFor="apellidos_tutor_academico">
                                            Apellidos tutor académico <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="apellidos_tutor_academico"
                                            type="text"
                                            placeholder="García López"
                                            {...register("tutor_academico.apellidos_tutor_academico", validationRules.apellidos_tutor_academico)}
                                            className={errors.tutor_academico?.apellidos_tutor_academico ? "border-red-500" : ""}
                                        />
                                        {errors.tutor_academico?.apellidos_tutor_academico && (
                                            <p className="text-sm text-red-500">{errors.tutor_academico?.apellidos_tutor_academico.message}</p>
                                        )}
                                    </div>

                                    {/* Celular Tutor Académico */}
                                    <div className="space-y-2">
                                        <Label htmlFor="celular_tutor">
                                            Celular tutor académico <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="celular_tutor"
                                            type="number"
                                            placeholder="73456789"
                                            {...register("tutor_academico.celular_tutor_academico", {
                                                ...validationRules.celular_tutor_academico,
                                                valueAsNumber: true
                                            })}
                                            className={errors.tutor_academico?.celular_tutor_academico ? "border-red-500" : ""}
                                        />
                                        {errors.tutor_academico?.celular_tutor_academico && (
                                            <p className="text-sm text-red-500">{errors.tutor_academico?.celular_tutor_academico.message}</p>
                                        )}
                                    </div>

                                    {/* CI Tutor Académico */}
                                    <div className="space-y-2">
                                        <Label htmlFor="ci_tutor_academico">
                                            C.I. tutor académico <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="ci_tutor_academico"
                                            type="text"
                                            placeholder="8947493"
                                            {...register("tutor_academico.ci_tutor_academico", validationRules.ci_tutor_academico)}
                                            className={errors.tutor_academico?.ci_tutor_academico ? "border-red-500" : ""}
                                        />
                                        {errors.tutor_academico?.ci_tutor_academico && (
                                            <p className="text-sm text-red-500">{errors.tutor_academico?.ci_tutor_academico.message}</p>
                                        )}
                                    </div>

                                    {/* Email Tutor Académico */}
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="email_tutor_academico">
                                            Email del tutor académico <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="email_tutor_academico"
                                            type="email"
                                            placeholder="tutor@ejemplo.com"
                                            {...register("tutor_academico.email_tutor_academico", validationRules.email_tutor_academico)}
                                            className={errors.tutor_academico?.email_tutor_academico ? "border-red-500" : ""}
                                        />
                                        {errors.tutor_academico?.email_tutor_academico && (
                                            <p className="text-sm text-red-500">{errors.tutor_academico?.email_tutor_academico.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sección Colegio */}
                            <div className="space-y-4">
                                <h4 className="text-base font-semibold text-foreground border-b pb-2">
                                    Datos del Colegio
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Nombre del Colegio */}
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre_colegio">
                                            Nombre del colegio <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="nombre_colegio"
                                            type="text"
                                            placeholder="Ej. U.E. Villazón"
                                            {...register("colegio.nombre_colegio", validationRules.nombre_colegio)}
                                            className={errors.colegio?.nombre_colegio ? "border-red-500" : ""}
                                        />
                                        {errors.colegio?.nombre_colegio && (
                                            <p className="text-sm text-red-500">{errors.colegio?.nombre_colegio.message}</p>
                                        )}
                                    </div>

                                    {/* Departamento */}
                                    <div className="space-y-2">
                                        <Label htmlFor="departamento">
                                            Departamento <span className="text-red-500">*</span>
                                        </Label>
                                        <Combobox
                                            items={departamentos}
                                            value={departamentoField.value}
                                            onChange={departamentoField.onChange}
                                            placeholder="Seleccionar departamento..."
                                            searchPlaceholder="Buscar departamento..."
                                            multiple={false}
                                        />
                                        {departamentoField.value === undefined && apiError.includes("departamento") && (
                                            <p className="text-sm text-red-500">Debe seleccionar un departamento</p>
                                        )}
                                    </div>

                                    {/* Teléfono del Colegio */}
                                    <div className="space-y-2">
                                        <Label htmlFor="telefono_colegio">
                                            Teléfono del colegio <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="telefono_colegio"
                                            type="number"
                                            placeholder="4456789"
                                            {...register("colegio.telefono_colegio", {
                                                ...validationRules.telefono_colegio,
                                                valueAsNumber: true
                                            })}
                                            className={errors.colegio?.telefono_colegio ? "border-red-500" : ""}
                                        />
                                        {errors.colegio?.telefono_colegio && (
                                            <p className="text-sm text-red-500">{errors.colegio?.telefono_colegio.message}</p>
                                        )}
                                    </div>

                                    {/* Dirección del Colegio */}
                                    <div className="space-y-2">
                                        <Label htmlFor="direccion_colegio">
                                            Dirección del colegio <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="direccion_colegio"
                                            type="text"
                                            placeholder="Ej. Av. Aniceto Arce"
                                            {...register("colegio.direccion_colegio", validationRules.direccion_colegio)}
                                            className={errors.colegio?.direccion_colegio ? "border-red-500" : ""}
                                        />
                                        {errors.colegio?.direccion_colegio && (
                                            <p className="text-sm text-red-500">{errors.colegio?.direccion_colegio.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </div>

            <CardFooter className="flex flex-col gap-3">
                <div className="flex w-full gap-3">
                    {siguienteForm && (
                        <Button 
                            type="button"
                            variant="outline"
                            onClick={handleBack}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Anterior
                        </Button>
                    )}
                    
                    <Button 
                        type="button"
                        onClick={siguienteForm ? handleFinalSubmit : handleNext}
                        className="flex-1"
                        disabled={isLoading}
                    >
                        {isLoading ? "Registrando..." : (siguienteForm ? "Registrar Olimpista" : "Siguiente")}
                    </Button>
                </div>
                
                {!success && (
                    <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                            reset();
                            setSelectedArea([]);
                            setApiError("");
                            setSiguienteForm(false);
                        }}
                    >
                        Limpiar Formulario
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};