import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, Download, FileText, Upload, ChevronRight, ChevronLeft, User, School, FileUp, Users, CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { Combobox, useComboboxField } from "@/components/Combobox";
import { createMassiveOlimpistas } from "@/api/Olimpistas";
import { MassiveForm } from "./interfaces/AcademicForm";
import { validationRules } from "./validations/MassiveValidate";
import { useGetStaticDataOlimpistas } from "@/hooks/use-static-call-api-olimpistas";
import { useFilterProvincias } from "@/hooks/use-filter-provincias";
import { useAuth, UserData } from "@/hooks/use-context";
import { useFilterAreasUser } from "@/hooks/use-areas-user";
import { useOnlyNumbers } from "@/hooks/use-input-number";
import { useOnlyLetters } from "@/hooks/use-input-text";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import * as XLSX from "xlsx";

export default function FormGroup() {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [fileError, setFileError] = React.useState<string>("");
    const [importResult, setImportResult] = React.useState<any>(null);
    const [responseData, setResponseData] = React.useState<any>(null);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [areas, setAreas] = React.useState<any[]>([]);
    const [niveles, setNiveles] = React.useState<any[]>([]);
    const [departamentos, setDepartamentos] = React.useState<any[]>([]);
    const [provincias, setProvincias] = React.useState<any[]>([]);
    const [anterioresProvincias, setAnterioresProvincias] = React.useState<any[]>([]);
    const { data } = useAuth();
    const areasUsuario = data?.areas.map((area, index) => ({ id: index + 1, value: area.sigla, label: area.nombre }));
    const [areasFiltradas, setAreasFiltradas] = React.useState<any[]>([]);
    const numberInput = useOnlyNumbers();
    const textInput = useOnlyLetters();

    const {
        register,
        formState: { errors },
        reset,
        setValue,
        trigger,
        handleSubmit,
        watch
    } = useForm<MassiveForm>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            nombre_grupo: "",
            nivel: 0,
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
                area: "",
                provincia_id: 0,
                departamento_id: 0,
            },
        },
    });

    const archivoSeleccionado = watch("archivo");

    const departamentoField = useComboboxField("colegio.departamento_id", setValue, false);
    const provinciaField = useComboboxField("colegio.provincia_id", setValue, false);
    const areaField = useComboboxField("colegio.area", setValue, false, trigger);
    const nivelField = useComboboxField("nivel", setValue, false, trigger);

    useGetStaticDataOlimpistas(setAreas, setDepartamentos, setAnterioresProvincias, setProvincias);
    useFilterProvincias(departamentoField, anterioresProvincias, setProvincias);

    // Filtrar las areas segun las areas del usuario (SOLO UNA VEZ)
    useFilterAreasUser(areas, data as UserData, areasFiltradas, setAreasFiltradas);

    // Filtrar niveles según el área seleccionada
    React.useEffect(() => {
        if (areaField.value && areaField.value.length > 0 && areasFiltradas.length > 0) {
            const areaSeleccionada = areasFiltradas.find(
                (area) => area.value === areaField.value[0]
            );

            setNiveles(areaSeleccionada.niveles);
            console.log(areaSeleccionada.niveles);
        } else {
            setNiveles([]);
        }
    }, [areaField.value, areasFiltradas]);

    React.useEffect(() => {
        if (archivoSeleccionado?.length) {
            setSelectedFile(archivoSeleccionado[0]);
        } else {
            setSelectedFile(null);
        }
    }, [archivoSeleccionado]);

    React.useEffect(() => {
        // Abrir el diálogo cuando hay loading, error o éxito
        if (isLoading || apiError !== '' || success) {
            setDialogOpen(true);
        }
    }, [isLoading, apiError, success]);

    const validateFile = (file: File): string | true => {
        if (file.size > 10 * 1024 * 1024) {
            return "El archivo no puede superar los 10MB";
        }

        const fileName = file.name.toLowerCase();
        const validExtensions = ['.xlsx', '.xls', '.csv'];
        const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

        if (!hasValidExtension) {
            return "El archivo debe ser en formato xlsx, xls o csv";
        }

        const validMimeTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv'
        ];

        if (file.type && !validMimeTypes.includes(file.type)) {
            if (file.type !== '') {
                return "Tipo de archivo no válido";
            }
        }

        return true;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileError("");

        if (!file) {
            setSelectedFile(null);
            return;
        }

        const validation = validateFile(file);
        if (validation !== true) {
            setFileError(validation);
            setSelectedFile(null);
            event.target.value = '';
            return;
        }

        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setFileError("Debe seleccionar un archivo");
            return;
        }

        handleSubmit((data) => {
            createMassiveOlimpistas(
                data,
                true,
                setIsLoading,
                setSuccess,
                setApiError,
                reset,
                selectedFile,
                setFileError,
                setImportResult,
                setResponseData
            );
            setProvincias([]);
        })();
    };

    const downloadTemplateCSV = () => {
        const csvContent =
            "\uFEFF" + // BOM para Excel
            "nombres,apellido_paterno,apellido_materno,ci,celular,grado_escolar,email,fecha_nacimiento\n" +
            "Sofía,Gutiérrez,Herrera,7823109,69128403,1ro Secundaria,sofia.gutierrez@colegioperedo.edu.bo,2012-03-15\n" +
            "Nicolás,Vargas,Rojas,8492034,67820394,4to Primaria,nicolas.vargas@colegioperedo.edu.bo,2014-10-22\n" +
            "Martina,Fernández,Aguilar,7659201,68520493,2do Secundaria,martina.fernandez@colegioperedo.edu.bo,2011-07-09\n" +
            "Gabriel,Morales,López,8321049,69930284,6to Primaria,gabriel.morales@colegioperedo.edu.bo,2013-05-11";

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;"
        });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "plantilla_olimpistas.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadTemplateXLSX = () => {
        const rows = [
            [
                "nombres",
                "apellido_paterno",
                "apellido_materno",
                "ci",
                "celular",
                "grado_escolar",
                "email",
                "fecha_nacimiento"
            ],
            [
                "Sofía",
                "Gutiérrez",
                "Herrera",
                "7823109",
                "69128403",
                "1ro Secundaria",
                "sofia.gutierrez@colegioperedo.edu.bo",
                "2012-03-15"
            ],
            [
                "Nicolás",
                "Vargas",
                "Rojas",
                "8492034",
                "67820394",
                "4to Primaria",
                "nicolas.vargas@colegioperedo.edu.bo",
                "2014-10-22"
            ],
            [
                "Martina",
                "Fernández",
                "Aguilar",
                "7659201",
                "68520493",
                "2do Secundaria",
                "martina.fernandez@colegioperedo.edu.bo",
                "2011-07-09"
            ],
            [
                "Gabriel",
                "Morales",
                "López",
                "8321049",
                "69930284",
                "6to Primaria",
                "gabriel.morales@colegioperedo.edu.bo",
                "2013-05-11"
            ]
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Olimpistas");
        XLSX.writeFile(workbook, "plantilla_olimpistas.xlsx");
    };

    const clearForm = () => {
        setCurrentStep(1);
        setSelectedFile(null);
        setFileError("");
        setApiError("");
        setSuccess(false);
        setImportResult(null);
        reset();

        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setApiError('');
        setIsLoading(false);

        // Si fue exitoso, limpiar el formulario y volver al paso 1
        if (success) {
            setSuccess(false);
            setResponseData(null);
            clearForm();
        }
    };

    const handleNextStep = async () => {
        let isValid = false;

        if (currentStep === 1) {
            isValid = await trigger([
                "tutor_academico.nombres_tutor_academico",
                "tutor_academico.apellidos_tutor_academico",
                "tutor_academico.celular_tutor_academico",
                "tutor_academico.email_tutor_academico",
                "tutor_academico.ci_tutor_academico"
            ]);
        } else if (currentStep === 2) {
            isValid = await trigger([
                "colegio.nombre_colegio",
                "colegio.telefono_colegio",
                "colegio.provincia_id",
                "colegio.departamento_id"
            ]);

            if (isValid) {
                if (!departamentoField.value || !provinciaField.value || !areaField.value) {
                    setApiError("Debe completar todos los campos del colegio");
                    isValid = false;
                } else {
                    setApiError("");
                }
            }
        }

        if (isValid) {
            setCurrentStep(currentStep + 1);
            setApiError("");
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
        setApiError("");
    };

    const steps = [
        { number: 1, title: "Tutor Académico", icon: User },
        { number: 2, title: "Datos del Colegio", icon: School },
        { number: 3, title: "Importar Archivo", icon: FileUp }
    ];

    return (
        <>
            <AlertDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                defaultOpen={dialogOpen}>
                <AlertDialogTrigger asChild />

                <AlertDialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    {isLoading && (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">
                                    Registrando grupo y olimpistas...
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="flex justify-center items-center py-8">
                                <Spinner className="h-12 w-12" />
                            </div>
                            <AlertDialogDescription className="text-center text-muted-foreground">
                                Por favor espera mientras se procesan los datos del archivo.
                            </AlertDialogDescription>
                        </>
                    )}

                    {apiError !== '' && (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-red-500 text-center">
                                    Ocurrió un error
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <Alert variant="destructive">
                                <CircleAlert className="h-4 w-4" />
                                <AlertTitle>Error al procesar el archivo</AlertTitle>
                                <AlertDescription>
                                    {apiError}
                                </AlertDescription>
                            </Alert>
                            <AlertDialogFooter>
                                <AlertDialogAction onClick={handleCloseDialog}>
                                    Entendido
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </>
                    )}

                    {success && responseData && (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-green-600 text-center">
                                    ¡Importación completada!
                                </AlertDialogTitle>
                            </AlertDialogHeader>

                            <div className="space-y-4">
                                {/* Resumen de registros */}
                                <Alert className="border-green-200 bg-green-50">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <AlertTitle className="text-green-800">Resumen de importación</AlertTitle>
                                    <AlertDescription className="text-green-700">
                                        <div className="mt-2 space-y-1">
                                            <p><strong>Olimpistas registrados exitosamente:</strong> {responseData.olimpistas_registrados || 0}</p>
                                        </div>
                                    </AlertDescription>
                                </Alert>

                                {/* Olimpistas no registrados */}
                                {responseData.olimpistas_no_registrados && responseData.olimpistas_no_registrados.length > 0 && (
                                    <Alert className="border-amber-200 bg-amber-50">
                                        <CircleAlert className="h-4 w-4 text-amber-600" />
                                        <AlertTitle className="text-amber-900">Olimpistas no registrados ({responseData.olimpistas_no_registrados.length})</AlertTitle>
                                        <AlertDescription className="text-amber-800">
                                            <p className="mb-3 text-sm">Los siguientes olimpistas no pudieron ser registrados:</p>
                                            <div className="mt-2 max-h-60 overflow-y-auto">
                                                <ul className="space-y-3">
                                                    {responseData.olimpistas_no_registrados.map((olimpista: any, index: number) => (
                                                        <li key={index} className="p-3 bg-amber-100 rounded-md border border-amber-300">
                                                            <div className="flex flex-col gap-1">
                                                                <p className="font-semibold text-amber-900">
                                                                    {index + 1}. {olimpista.nombres}
                                                                </p>
                                                                <p className="text-sm text-amber-800">
                                                                    <span className="font-medium">CI:</span> {olimpista.ci}
                                                                </p>
                                                                {olimpista.grado && (
                                                                    <p className="text-sm text-amber-800">
                                                                        <span className="font-medium">Grado:</span> {olimpista.grado}
                                                                    </p>
                                                                )}
                                                                <p className="text-sm text-amber-900 mt-1 font-medium">
                                                                    <span className="font-semibold">Motivo:</span> {olimpista.motivo || 'No especificado'}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {/* Fases no existentes */}
                                {responseData.fases_no_existentes && responseData.fases_no_existentes.length > 0 && (
                                    <Alert className="border-amber-200 bg-amber-50">
                                        <CircleAlert className="h-4 w-4 text-amber-600" />
                                        <AlertTitle className="text-amber-800">Fases no existentes</AlertTitle>
                                        <AlertDescription className="text-amber-700">
                                            <p className="mb-2">Las siguientes fases no existen en el sistema:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                {responseData.fases_no_existentes.map((fase: string, index: number) => (
                                                    <li key={index} className="font-medium">{fase}</li>
                                                ))}
                                            </ul>
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogAction onClick={handleCloseDialog}>
                                    Cerrar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </>
                    )}
                </AlertDialogContent>
            </AlertDialog>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Creacion de grupo
                    </CardTitle>
                    <CardDescription>
                        Complete el formulario en 3 pasos para registrar el grupo y registrar los olimpistas
                    </CardDescription>

                    {/* Indicador de pasos */}
                    <div className="flex items-center justify-between mt-6">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === step.number
                                        ? 'bg-blue-600 text-white'
                                        : currentStep > step.number
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        {currentStep > step.number ? (
                                            <CheckCircle className="h-5 w-5" />
                                        ) : (
                                            <step.icon className="h-5 w-5" />
                                        )}
                                    </div>
                                    <span className={`text-xs mt-2 ${currentStep === step.number ? 'font-semibold text-blue-600' : 'text-gray-600'
                                        }`}>
                                        {step.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-2 ${currentStep > step.number ? 'bg-green-600' : 'bg-gray-200'
                                        }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Alertas */}
                    {success && (
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                ¡{importResult?.message}! Se procesaron {importResult?.total || 0} olimpistas.
                            </AlertDescription>
                        </Alert>
                    )}

                    {apiError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{apiError}</AlertDescription>
                        </Alert>
                    )}

                    {/* PASO 1: Tutor Académico */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-foreground border-b pb-2">
                                Datos del grupo y tutor
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nombres_tutor">
                                        Nombre del grupo <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="nombres_tutor"
                                        type="text"
                                        placeholder="Nombre Grupo"
                                        {...register("nombre_grupo", validationRules.nombre_grupo)}
                                        onChange={(e) => {
                                            textInput.handleChange(e);
                                            register("nombre_grupo").onChange(e);
                                        }}
                                        onKeyDown={textInput.handleKeyDown}
                                        className={errors.nombre_grupo ? "border-red-500" : ""}
                                    />
                                    {errors.nombre_grupo && (
                                        <p className="text-sm text-red-500">{errors.nombre_grupo.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="area">
                                        Área de competencia <span className="text-red-500">*</span>
                                    </Label>
                                    <Combobox
                                        items={areasUsuario}
                                        value={areaField.value}
                                        onChange={areaField.onChange}
                                        placeholder="Seleccionar el área..."
                                        searchPlaceholder="Buscar área..."
                                        multiple={false}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nivel">
                                        Nivel de competencia <span className="text-red-500">*</span>
                                    </Label>
                                    <Combobox
                                        items={niveles}
                                        value={nivelField.value}
                                        onChange={nivelField.onChange}
                                        placeholder="Seleccionar el nivel..."
                                        searchPlaceholder="Buscar nivel..."
                                        multiple={false}
                                    />
                                    {niveles.length === 0 && areaField.value.length > 0 && (
                                        <p className="text-sm text-amber-600">Seleccione un área primero para ver los niveles disponibles</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nombres_tutor">
                                        Nombre del tutor académico <span className="text-red-500">*</span>
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

                                <div className="space-y-2">
                                    <Label htmlFor="apellidos_tutor_academico">
                                        Apellidos tutor académico <span className="text-red-500">*</span>
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

                                <div className="space-y-2">
                                    <Label htmlFor="celular_tutor">
                                        Celular tutor académico <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="celular_tutor"
                                        type="text"
                                        placeholder="73456789"
                                        {...register("tutor_academico.celular_tutor_academico", validationRules.celular_tutor_academico)}
                                        onChange={(e) => {
                                            numberInput.handleChange(e);
                                            register("tutor_academico.celular_tutor_academico").onChange(e);
                                        }}
                                        onKeyDown={numberInput.handleKeyDown}
                                        className={errors.tutor_academico?.celular_tutor_academico ? "border-red-500" : ""}
                                    />
                                    {errors.tutor_academico?.celular_tutor_academico && (
                                        <p className="text-sm text-red-500">{errors.tutor_academico?.celular_tutor_academico.message}</p>
                                    )}
                                </div>

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

                                <div className="space-y-2 ">
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
                    )}

                    {/* PASO 2: Datos del Colegio */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-foreground border-b pb-2">
                                Datos del Colegio
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nombre_colegio">
                                        Nombre del colegio <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="nombre_colegio"
                                        type="text"
                                        placeholder="Ej. U. E. Villazón"
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
                                        onChange={(e) => {
                                            numberInput.handleChange(e);
                                            register("colegio.telefono_colegio").onChange(e);
                                        }}
                                        onKeyDown={numberInput.handleKeyDown}
                                        className={errors.colegio?.telefono_colegio ? "border-red-500" : ""}
                                    />
                                    {errors.colegio?.telefono_colegio && (
                                        <p className="text-sm text-red-500">{errors.colegio?.telefono_colegio.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="departamento">
                                        Departamento <span className="text-red-500">*</span>
                                    </Label>
                                    <Combobox
                                        items={departamentos}
                                        value={departamentoField.value}
                                        onChange={departamentoField.onChange}
                                        placeholder="Seleccionar el departamento..."
                                        searchPlaceholder="Buscar departamento..."
                                        multiple={false}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="provincia">
                                        Provincia <span className="text-red-500">*</span>
                                    </Label>
                                    <Combobox
                                        items={provincias}
                                        value={provinciaField.value}
                                        onChange={provinciaField.onChange}
                                        placeholder="Seleccionar la provincia..."
                                        searchPlaceholder="Buscar provincia..."
                                        multiple={false}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PASO 3: Importar Archivo */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold text-foreground border-b pb-2">
                                Importar Archivo de Olimpistas
                            </h4>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-medium text-blue-900 mb-2">Instrucciones:</h4>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• <strong>Columnas obligatorias:</strong> nombres, apellido_paterno, apellido_materno, ci, celular, grado_escolar, email, fecha_nacimiento</li>
                                    <li>• <strong>Grados válidos por nivel para competir:</strong> {niveles.length > 0 ? niveles?.find((n) => n.value === nivelField.value[0])?.grado : 'Seleccione un área primero'}</li>
                                    <li>• <strong>Formatos permitidos:</strong> .xlsx, .xls, .csv</li>
                                    <li>• <strong>Tamaño máximo:</strong> 10MB</li>
                                </ul>
                            </div>

                            <div className="flex justify-center">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={downloadTemplateCSV}
                                    className="flex items-center gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Descargar Plantilla Csv
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={downloadTemplateXLSX}
                                    className="flex items-center gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Descargar Plantilla Excel
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <Label htmlFor="file-upload" className="text-base font-medium">
                                    Seleccionar Archivo <span className="text-red-500">*</span>
                                </Label>

                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />

                                    <div className="space-y-2">
                                        <Label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-500">
                                            Haga clic para seleccionar un archivo
                                        </Label>
                                        <Input
                                            id="file-upload"
                                            type="file"
                                            accept=".xlsx,.xls,.csv"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <p className="text-sm text-gray-500">
                                            Formatos: .xlsx, .xls, .csv (máx. 10MB)
                                        </p>
                                    </div>

                                    {fileError && (
                                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-sm text-red-600">
                                                {fileError}
                                            </p>
                                        </div>
                                    )}

                                    {selectedFile && !fileError && (
                                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-sm font-medium text-green-900">
                                                Archivo seleccionado:
                                            </p>
                                            <p className="text-sm text-green-700">
                                                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex gap-3">
                    {currentStep > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handlePreviousStep}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Anterior
                        </Button>
                    )}

                    {currentStep < 3 ? (
                        <Button
                            type="button"
                            onClick={handleNextStep}
                            className="flex-1 flex items-center justify-center gap-2"
                        >
                            Siguiente
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <>
                            <Button
                                type="button"
                                onClick={handleUpload}
                                className="flex-1"
                                disabled={isLoading || !selectedFile || !!fileError}
                            >
                                {isLoading ? "Procesando..." : "Importar Olimpistas"}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={clearForm}
                            >
                                Limpiar
                            </Button>
                        </>
                    )}
                </CardFooter>
            </Card>
        </>
    );
}