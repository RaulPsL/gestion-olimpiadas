import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, useComboboxField } from "@/components/Combobox";
import { AlertCircle, CheckCircle, ChevronLeft } from "lucide-react";
import { createOlimpista } from "@/api/Olimpistas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { validationRules } from "./validations/OlimpistaValidate";
import { OlimpistaForm } from "./interfaces/Olimpista";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth, UserData } from "@/hooks/use-context";
import { useGetStaticDataOlimpistas } from "@/hooks/use-static-call-api-olimpistas";
import { useFilterAreasUser } from "@/hooks/use-areas-user";
import { useFilterGrades } from "@/hooks/use-filter-grades";
import { useFreeAreas } from "@/hooks/use-free-areas";
import { useLevelByArea } from "@/hooks/use-level-area";
import { useVerifiedTimeByFase } from "@/hooks/use-validate-time";
import { useFilterProvincias } from "@/hooks/use-filter-provincias";
import { useOnlyNumbers } from "@/hooks/use-input-number";
import { useOnlyLetters } from "@/hooks/use-input-text";

export default function FormOlimpista() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [siguienteForm, setSiguienteForm] = React.useState<boolean>(false);
    const [activoFormAcademico, setActivoFormAcademico] = React.useState<boolean>(false);
    const [areas, setAreas] = React.useState<any[]>([]);
    const [grados, setGrados] = React.useState<any[]>([]);
    const [departamentos, setDepartamentos] = React.useState<any[]>([]);
    const [anterioresProvincias, setAnterioresProvincias] = React.useState<any[]>([]);
    const [provincias, setProvincias] = React.useState<any[]>([]);
    const [nivelesMap, setNivelesMap] = React.useState<Record<string, any[]>>({});
    const [areasFiltradas, setAreasFiltradas] = React.useState<any[]>([]);
    const { data } = useAuth();
    const numberInput = useOnlyNumbers();
    const textInput = useOnlyLetters();

    const {
        register,
        formState: { errors },
        reset,
        setValue,
        unregister,
        trigger,
        getValues
    } = useForm<OlimpistaForm>({
        mode: "onBlur",
        reValidateMode: 'onChange',
        defaultValues: {
            nombres: "",
            apellido_paterno: "",
            apellido_materno: "",
            celular: "",
            email: "",
            ci: "",
            grado_escolar: "",
            nivel_competencia: "primaria",
            estado: "activo",
            areas: [],
            niveles_por_area: {},
            tutor_academico: {
                nombres_tutor_academico: "",
                apellidos_tutor_academico: "",
                celular_tutor_academico: "",
                email_tutor_academico: "",
                ci_tutor_academico: "",
            },
            colegio: {
                nombre_colegio: "",
                telefono_colegio: "",
                departamento_colegio: "",
            }
        }
    });

    const areaField = useComboboxField("areas", setValue, true, trigger);
    const gradoField = useComboboxField("grado_escolar", setValue, false, trigger);
    const departamentoField = useComboboxField("colegio.departamento_colegio", setValue, false, trigger);
    const provinciaField = useComboboxField("colegio.provincia_colegio", setValue, false, trigger);

    const nivelField1 = useComboboxField("nivel_area_1", setValue, false, trigger);
    const nivelField2 = useComboboxField("nivel_area_2", setValue, false, trigger);
    const nivelField3 = useComboboxField("nivel_area_3", setValue, false, trigger);

    React.useEffect(() => {
        register('colegio.departamento_colegio', validationRules.departamento_colegio);
        register('colegio.provincia_colegio', validationRules.provincia_colegio);
        register('areas', validationRules.area);
        register('grado_escolar', validationRules.grado_escolar);
    }, []);

    // Obtener los datos staticos para el formulario
    useGetStaticDataOlimpistas(setAreas, setDepartamentos, setAnterioresProvincias, setProvincias);

    // Filtrar las areas segun las areas del usuario (SOLO UNA VEZ)
    useFilterAreasUser(areas, data as UserData, areasFiltradas, setAreasFiltradas);

    // Obtener todos los grados que tengan solo las areas de usuario
    useFilterGrades(areasFiltradas, setGrados);

    // Filtrar y obtener las áreas disponibles según el grado seleccionado
    useFreeAreas(areasFiltradas, gradoField, setAreas, areaField);

    // Actualizar niveles disponibles cuando cambien las áreas seleccionadas o el grado
    useLevelByArea(areaField, gradoField, areas, grados, setNivelesMap, [nivelField1, nivelField2, nivelField3]);

    // Verificacion de los horarios por area
    useVerifiedTimeByFase(areaField, areas);

    // Filtro de provincias por departamento
    useFilterProvincias(departamentoField, anterioresProvincias, setProvincias);

    // Obtener el nombre del área por su valor
    const getNombreArea = (areaValue: string) => {
        const area = areas?.find(a => a.value === areaValue);
        return area?.label || areaValue;
    };

    // Solo deben quedar estas funciones las demas deben ser por hooks
    const handleNext = async () => {
        setActivoFormAcademico(true);
        const firstStepFields = [
            'nombres', 'apellido_paterno', 'apellido_materno', 'ci', 'celular', 'email',
            'grado_escolar', 'areas'
        ];

        const isValid = await trigger(firstStepFields as any);

        let nivelesValidos = true;
        if (areaField.value.length > 0) {
            if (areaField.value.length >= 1 && nivelField1.value.length === 0) nivelesValidos = false;
            if (areaField.value.length >= 2 && nivelField2.value.length === 0) nivelesValidos = false;
            if (areaField.value.length >= 3 && nivelField3.value.length === 0) nivelesValidos = false;
        }

        if (isValid && nivelesValidos) {
            setSiguienteForm(true);
        } else if (!nivelesValidos) {
            setApiError("Por favor seleccione el nivel para cada área");
            setTimeout(() => setApiError(""), 3000);
        }
    };

    const handleBack = () => {
        setSiguienteForm(false);
        setActivoFormAcademico(false);
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
            "colegio.provincia_colegio",
        ];

        const isValid = await trigger(secondStepFields as any);
        if (!isValid && activoFormAcademico) return;

        const data = getValues();

        // Construir el objeto niveles_por_area
        const nivelesPorArea: Record<string, string> = {};
        if (areaField.value.length >= 1 && nivelField1.value.length > 0) {
            nivelesPorArea[areaField.value[0]] = nivelField1.value[0];
        }
        if (areaField.value.length >= 2 && nivelField2.value.length > 0) {
            nivelesPorArea[areaField.value[1]] = nivelField2.value[0];
        }
        if (areaField.value.length >= 3 && nivelField3.value.length > 0) {
            nivelesPorArea[areaField.value[2]] = nivelField3.value[0];
        }

        data.niveles_por_area = nivelesPorArea;

        if (!activoFormAcademico) {
            delete data.tutor_academico;
        }

        createOlimpista(
            data,
            setIsLoading,
            setSuccess,
            setApiError,
            () => {
                areaField.reset();
                nivelField1.reset();
                nivelField2.reset();
                nivelField3.reset();
            },
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
                    className={`flex transition-transform duration-500 ease-in-out ${siguienteForm ? '-translate-x-1/2' : 'translate-x-0'
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
                                    onChange={(e) => {
                                        textInput.handleChange(e);
                                        register("nombres").onChange(e);
                                    }}
                                    onKeyDown={textInput.handleKeyDown}
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
                                    onChange={(e) => {
                                        textInput.handleChange(e);
                                        register("apellido_paterno").onChange(e);
                                    }}
                                    onKeyDown={textInput.handleKeyDown}
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
                                    onChange={(e) => {
                                        textInput.handleChange(e);
                                        register("apellido_materno").onChange(e);
                                    }}
                                    onKeyDown={textInput.handleKeyDown}
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

                            {/* Email. */}
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="example@mail.com"
                                    {...register("email", validationRules.email)}
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Celular. */}
                            <div className="space-y-2">
                                <Label htmlFor="celular">
                                    Celular <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="celular"
                                    type="text"
                                    placeholder="78947493"
                                    {...register("celular", validationRules.celular)}
                                    onChange={(e) => {
                                        numberInput.handleChange(e);
                                        register('celular').onChange(e);
                                    }}
                                    onKeyDown={numberInput.handleKeyDown}
                                    className={errors.celular ? "border-red-500" : ""}
                                />
                                {errors.celular && (
                                    <p className="text-sm text-red-500">{errors.celular.message}</p>
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
                                    searchPlaceholder="Buscar por grado..."
                                    multiple={false}
                                    className={errors.grado_escolar ? "border-red-500" : ""}
                                />
                                {errors.grado_escolar && (
                                    <p className="text-sm text-red-500">{errors.grado_escolar.message}</p>
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
                                    className={errors.areas ? "border-red-500" : ""}
                                />
                                {errors.areas && (
                                    <p className="text-sm text-red-500">{errors.areas.message}</p>
                                )}
                            </div>

                            {/* Combobox de Nivel para Área 1 */}
                            {areaField.value.length >= 1 && (
                                <div className="space-y-2">
                                    <Label htmlFor="nivel_area_1">
                                        Nivel - {getNombreArea(String(areaField.value[0]))} <span className="text-red-500">*</span>
                                    </Label>
                                    <Combobox
                                        items={nivelesMap[areaField.value[0]] || []}
                                        value={nivelField1.value}
                                        onChange={nivelField1.onChange}
                                        placeholder={
                                            (nivelesMap[areaField.value[0]]?.length === 0)
                                                ? "No hay niveles disponibles para este grado"
                                                : "Seleccionar nivel..."
                                        }
                                        searchPlaceholder=""
                                        multiple={false}
                                        disabled={
                                            (nivelesMap[areaField.value[0]]?.length === 1) ||
                                            (nivelesMap[areaField.value[0]]?.length === 0)
                                        }
                                    />
                                    {nivelesMap[areaField.value[0]]?.length === 1 && (
                                        <p className="text-xs text-muted-foreground">
                                            Nivel asignado automáticamente
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Combobox de Nivel para Área 2 */}
                            {areaField.value.length >= 2 && (
                                <div className="space-y-2">
                                    <Label htmlFor="nivel_area_2">
                                        Nivel - {getNombreArea(String(areaField.value[1]))} <span className="text-red-500">*</span>
                                    </Label>
                                    <Combobox
                                        items={nivelesMap[areaField.value[1]] || []}
                                        value={nivelField2.value}
                                        onChange={nivelField2.onChange}
                                        placeholder={
                                            (nivelesMap[areaField.value[1]]?.length === 0)
                                                ? "No hay niveles disponibles para este grado"
                                                : "Seleccionar nivel..."
                                        }
                                        searchPlaceholder=""
                                        multiple={false}
                                        disabled={
                                            (nivelesMap[areaField.value[1]]?.length === 1) ||
                                            (nivelesMap[areaField.value[1]]?.length === 0)
                                        }
                                    />
                                    {nivelesMap[areaField.value[1]]?.length === 1 && (
                                        <p className="text-xs text-muted-foreground">
                                            Nivel asignado automáticamente
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Combobox de Nivel para Área 3 */}
                            {areaField.value.length >= 3 && (
                                <div className="space-y-2">
                                    <Label htmlFor="nivel_area_3">
                                        Nivel - {getNombreArea(String(areaField.value[2]))} <span className="text-red-500">*</span>
                                    </Label>
                                    <Combobox
                                        items={nivelesMap[areaField.value[2]] || []}
                                        value={nivelField3.value}
                                        onChange={nivelField3.onChange}
                                        placeholder={
                                            (nivelesMap[areaField.value[2]]?.length === 0)
                                                ? "No hay niveles disponibles para este grado"
                                                : "Seleccionar nivel..."
                                        }
                                        searchPlaceholder=""
                                        multiple={false}
                                        disabled={
                                            (nivelesMap[areaField.value[2]]?.length === 1) ||
                                            (nivelesMap[areaField.value[2]]?.length === 0)
                                        }
                                    />
                                    {nivelesMap[areaField.value[2]]?.length === 1 && (
                                        <p className="text-xs text-muted-foreground">
                                            Nivel asignado automáticamente
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>

                    {/* Segundo paso: Datos académicos */}
                    <CardContent className="w-1/2 flex-shrink-0">
                        <div className="space-y-8">
                            {/* Sección Tutor Académico */}
                            <div className={`space-y-4 `}>
                                <div className="flex flex-row content-between">
                                    <h4 className="text-base font-semibold text-foreground border-b pb-2">
                                        Datos del Tutor Academico o Apoderado Familiar
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
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${activoFormAcademico ? '' : 'hidden'}`}>
                                    {/* Nombre Tutor */}
                                    <div className="space-y-2">
                                        <Label htmlFor="nombres_tutor">
                                            Nombre(s) <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="nombres_tutor"
                                            type="text"
                                            placeholder="Juan Carlos"
                                            {...register("tutor_academico.nombres_tutor_academico", validationRules.nombres_tutor_academico)}
                                            onChange={(e) => {
                                                textInput.handleChange(e);
                                                register("tutor_academico.nombres_tutor_academico").onChange(e);
                                            }}
                                            onKeyDown={textInput.handleKeyDown}
                                            className={errors.tutor_academico?.nombres_tutor_academico ? "border-red-500" : ""}
                                        />
                                        {errors.tutor_academico?.nombres_tutor_academico && (
                                            <p className="text-sm text-red-500">{errors.tutor_academico?.nombres_tutor_academico.message}</p>
                                        )}
                                    </div>

                                    {/* Apellidos Tutor */}
                                    <div className="space-y-2">
                                        <Label htmlFor="apellidos_tutor_academico">
                                            Apellido(s) <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="apellidos_tutor_academico"
                                            type="text"
                                            placeholder="García López"
                                            {...register("tutor_academico.apellidos_tutor_academico", validationRules.apellidos_tutor_academico)}
                                            onChange={(e) => {
                                                textInput.handleChange(e);
                                                register("tutor_academico.apellidos_tutor_academico").onChange(e);
                                            }}
                                            onKeyDown={textInput.handleKeyDown}
                                            className={errors.tutor_academico?.apellidos_tutor_academico ? "border-red-500" : ""}
                                        />
                                        {errors.tutor_academico?.apellidos_tutor_academico && (
                                            <p className="text-sm text-red-500">{errors.tutor_academico?.apellidos_tutor_academico.message}</p>
                                        )}
                                    </div>

                                    {/* Celular Tutor */}
                                    <div className="space-y-2">
                                        <Label htmlFor="celular_tutor">
                                            Celular <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="celular_tutor"
                                            type="text"
                                            placeholder="73456789"
                                            {...register("tutor_academico.celular_tutor_academico", validationRules.celular_tutor_academico)}
                                            onChange={(e) => {
                                                numberInput.handleChange(e);
                                                register('tutor_academico.celular_tutor_academico').onChange(e);
                                            }}
                                            onKeyDown={numberInput.handleKeyDown}
                                            className={errors.tutor_academico?.celular_tutor_academico ? "border-red-500" : ""}
                                        />
                                        {errors.tutor_academico?.celular_tutor_academico && (
                                            <p className="text-sm text-red-500">{errors.tutor_academico?.celular_tutor_academico.message}</p>
                                        )}
                                    </div>

                                    {/* CI Tutor */}
                                    <div className="space-y-2">
                                        <Label htmlFor="ci_tutor_academico">
                                            C.I. <span className="text-red-500">*</span>
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

                                    {/* Email Tutor */}
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="email_tutor_academico">
                                            Email <span className="text-red-500">*</span>
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
                                            Nombre <span className="italic opacity-75">(solo escribir el nombre del colégio)</span><span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="nombre_colegio"
                                            type="text"
                                            placeholder="Ej. Eduardo Villazón"
                                            {...register("colegio.nombre_colegio", validationRules.nombre_colegio)}
                                            onChange={(e) => {
                                                textInput.handleChange(e);
                                                register("colegio.nombre_colegio").onChange(e);
                                            }}
                                            onKeyDown={textInput.handleKeyDown}
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
                                            className={errors.colegio?.departamento_colegio ? "border-red-500" : ""}
                                        />
                                        {errors.colegio?.departamento_colegio && (
                                            <p className="text-sm text-red-500">{errors.colegio.departamento_colegio.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="provincia">
                                            Provincia <span className="text-red-500">*</span>
                                        </Label>
                                        <Combobox
                                            items={provincias}
                                            value={provinciaField.value}
                                            onChange={provinciaField.onChange}
                                            placeholder="Seleccionar provincia..."
                                            searchPlaceholder="Buscar provincia..."
                                            multiple={false}
                                            className={errors.colegio?.provincia_colegio ? "border-red-500" : ""}
                                        />
                                        {errors.colegio?.provincia_colegio && (
                                            <p className="text-sm text-red-500">{errors.colegio.provincia_colegio.message}</p>
                                        )}
                                    </div>

                                    {/* Teléfono del Colegio */}
                                    <div className="space-y-2">
                                        <Label htmlFor="telefono_colegio">
                                            Teléfono <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="telefono_colegio"
                                            type="text"
                                            placeholder="4456789"
                                            {...register("colegio.telefono_colegio", validationRules.telefono_colegio)} onChange={(e) => {
                                                numberInput.handleChange(e);
                                                register('colegio.telefono_colegio').onChange(e);
                                            }}
                                            onKeyDown={numberInput.handleKeyDown}
                                            className={errors.colegio?.telefono_colegio ? "border-red-500" : ""}
                                        />
                                        {errors.colegio?.telefono_colegio && (
                                            <p className="text-sm text-red-500">{errors.colegio?.telefono_colegio.message}</p>
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
                            setApiError("");
                            setSiguienteForm(false);
                            areaField.reset();
                            nivelField1.reset();
                            nivelField2.reset();
                            nivelField3.reset();
                        }}
                    >
                        Limpiar Formulario
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}