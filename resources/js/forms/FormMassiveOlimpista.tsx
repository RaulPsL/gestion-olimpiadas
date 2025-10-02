import { createMassiveOlimpistas, getStaticData } from "@/api/Olimpistas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, Download, FileText, Upload } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { MassiveForm } from "./interfaces/AcademicForm";
import { validationRules } from "./validations/MassiveValidate";
import { Combobox, useComboboxField } from "@/components/Combobox";

export default function FormMassiveOlimista() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [fileError, setFileError] = React.useState<string>("");
    const [importResult, setImportResult] = React.useState<any>(null);
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

    const  {
        register,
        formState: { errors },
        reset,
        setValue,
        handleSubmit,
        watch
    } = useForm<MassiveForm>(
        {
            defaultValues: {
                tutor_academico: {
                    nombres_tutor_academico: "",
                    apellidos_tutor_academico: "",
                    celular_tutor_academico: 0,
                    email_tutor_academico: "",
                    ci_tutor_academico: "",
                },
                colegio: {
                    nombre_colegio: "",
                    direccion_colegio: "",
                    telefono_colegio: 0,
                    departamento_colegio: "",
                },
            },
        }
    );

    const archivoSeleccionado = watch("archivo");

    React.useEffect(() => {
        if (archivoSeleccionado?.length) {
            setSelectedFile(archivoSeleccionado[0]);
        } else {
            setSelectedFile(null);
        }
    }, [archivoSeleccionado]);

    const departamentoField = useComboboxField("colegio.departamento_colegio", setValue, false);

    const validateFile = (file: File): string | true => {
        // Verificar tamaño
        if (file.size > 10 * 1024 * 1024) {
            return "El archivo no puede superar los 10MB";
        }

        // Verificar tipo por extensión
        const fileName = file.name.toLowerCase();
        const validExtensions = ['.xlsx', '.xls', '.csv'];
        const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
        
        if (!hasValidExtension) {
            return "El archivo debe ser en formato xlsx, xls o csv";
        }

        // Verificar tipo MIME (opcional, como respaldo)
        const validMimeTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv'
        ];

        if (file.type && !validMimeTypes.includes(file.type)) {
            // Solo mostrar error si el tipo MIME existe pero es incorrecto
            // Algunos archivos pueden no tener tipo MIME
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

        // Validar archivo
        const validation = validateFile(file);
        if (validation !== true) {
            setFileError(validation);
            setSelectedFile(null);
            // Limpiar el input
            event.target.value = '';
            return;
        }

        // Archivo válido
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
                setIsLoading,
                setSuccess,
                setApiError,
                reset,
                selectedFile,
                setFileError,
                setImportResult,
            );
        })();
    };

    const downloadTemplate = () => {
        const csvContent = "nombres,apellido_paterno,apellido_materno,ci,celular,grado_escolar,nivel_competencia,nombre_tutor,referencia_tutor,areas\n" +
                          "Juan Carlos,García,López,8947493,73456789,primero,primaria,Juan García López,72345678,MAT\n" +
                          "María Elena,Rodríguez,Pérez,7856234,76543210,segundo,primaria,Pedro Rodríguez Gomez,71234567,\"MAT,FIS\"\n" +
                          "Carlos,Mendoza,Silva,9123456,78901234,tercero,secundaria,Ana Mendoza Torres,69876543,QUI";
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "plantilla_olimpistas.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearForm = () => {
        setSelectedFile(null);
        setFileError("");
        setApiError("");
        setSuccess(false);
        setImportResult(null);
        reset();
        
        // Limpiar input file
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Importación Masiva de Olimpistas
                </CardTitle>
                <CardDescription>
                    Suba un archivo Excel o CSV para importar múltiples olimpistas de una vez
                </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
                {/* Alertas */}
                {success && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            ¡{importResult?.message}!, Se procesaron {importResult?.total || 0} olimpistas.
                        </AlertDescription>
                    </Alert>
                )}

                {apiError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{apiError}</AlertDescription>
                    </Alert>
                )}

                {/* Sección Tutor Académico */}
                <div className="space-y-4">
                    <div className="flex flex-row content-between">
                        <h4 className="text-base font-semibold text-foreground border-b pb-2">
                            Datos del Tutor Académico
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                placeholder="Ej. U. E. Villazón"
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

                {/* Instrucciones */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Instrucciones:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• <strong>Columnas obligatorias:</strong> nombres, apellido_paterno, apellido_materno, ci, celular, grado_escolar, nivel_competencia, areas, nombre_tutor, referencia_tutor</li>
                        <li>• <strong>Areas de competencia:</strong> {areas?.map((area) => area.label).join(", ")} (separadas por comas y en una sola columna, ej: "MAT,FIS")</li>
                        <li>• <strong>Grado escolar:</strong> {grados?.map((grado) => grado.label).join(", ")} </li>
                        <li>• <strong>Nivel competencia:</strong> {niveles?.map((nivel) => nivel.label).join(", ")}</li>
                        <li>• <strong>Formatos permitidos:</strong> .xlsx, .xls, .csv</li>
                        <li>• <strong>Tamaño máximo:</strong> 10MB</li>
                    </ul>
                </div>

                {/* Botón de plantilla */}
                <div className="flex justify-center">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={downloadTemplate}
                        className="flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Descargar Plantilla
                    </Button>
                </div>

                {/* Selector de archivo */}
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

                        {/* Mostrar errores del archivo */}
                        {fileError && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">
                                    {fileError}
                                </p>
                            </div>
                        )}

                        {/* Mostrar archivo seleccionado */}
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
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
                <Button 
                    type="button"
                    onClick={handleUpload}
                    className="w-full"
                    disabled={isLoading || !selectedFile || !!fileError}
                >
                    {isLoading ? "Procesando..." : "Importar Olimpistas"}
                </Button>
                
                <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={clearForm}
                >
                    Limpiar
                </Button>
            </CardFooter>
        </Card>
    );
}